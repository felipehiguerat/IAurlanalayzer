from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.responses import StreamingResponse
from app.services.scraper_service import ScraperService
from app.db.session_mongo import get_mongo_db
from app.models.mongo_models import MongoLead
from app.constants.sample_leads import SAMPLE_LEADS
from datetime import datetime
from bson import ObjectId
from typing import List, Optional
import csv
import io
import asyncio

from app.services.ml_service import MLService
from app.schemas.leads import BulkURLExtractRequest, BulkExtractResponse
# Importamos la seguridad para obtener el usuario real
from app.api.auth import get_current_user

router = APIRouter()
ml_service = MLService()

@router.post("/extract")
async def extract_lead(
    url: str = Body(..., embed=True), 
    db = Depends(get_mongo_db),
    current_user = Depends(get_current_user)
):
    """
    Scrapea una URL, la clasifica con NLP y la guarda en MongoDB.
    """
    async with ScraperService() as scraper:
        result = await scraper.scrape_url(url)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        # Clasificación con ML (Bag of Words)
        title = result.get("title", "")
        description = result.get("description", "")
        classification = ml_service.classify_lead(title, description)
        
        # Crear objeto para Mongo
        lead_data = {
            "url": url,
            "title": title,
            "description": description,
            "owner_id": current_user.id, # ID Real de Postgres
            "content": {
                "h1s": result.get("h1s")
            },
            # --- CORRECCIÓN AQUÍ ---
            "status": classification["status"],
            "ml_score": classification["ml_score"],      # Antes era ["score"]
            "ml_analysis": classification["ml_analysis"],# Antes era ["analysis"]
            # -----------------------
            "created_at": datetime.utcnow()
        }
        
        # Guardar en la colección 'leads'
        new_lead = await db.leads.insert_one(lead_data)
        
        # Convertir ObjectId a string para la respuesta
        lead_data["_id"] = str(new_lead.inserted_id)
        
        return lead_data

@router.get("/")
async def list_leads(
    db = Depends(get_mongo_db), 
    current_user = Depends(get_current_user)
):
    """
    Lista todos los leads guardados en MongoDB que pertenecen al usuario.
    """
    leads = []
    # Filtramos por owner_id
    cursor = db.leads.find({"owner_id": current_user.id}).sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        leads.append(document)
    return leads + SAMPLE_LEADS

@router.get("/{lead_id}")
async def get_lead(
    lead_id: str, 
    db = Depends(get_mongo_db),
    current_user = Depends(get_current_user)
):
    """
    Obtiene el detalle de un lead (real o de ejemplo).
    """
    # 1. Verificar si es un ID de ejemplo
    if lead_id.startswith("sample-"):
        sample = next((item for item in SAMPLE_LEADS if item["_id"] == lead_id), None)
        if not sample:
            raise HTTPException(status_code=404, detail="Sample lead not found")
        return sample

    # 2. Si no es ejemplo, procedemos con la lógica normal
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid Lead ID format")
    
    # Buscamos asegurando que pertenezca al usuario
    lead = await db.leads.find_one({
        "_id": ObjectId(lead_id),
        "owner_id": current_user.id
    })
    
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead["_id"] = str(lead["_id"])
    return lead

    
@router.delete("/{lead_id}")
async def delete_lead(
    lead_id: str, 
    db = Depends(get_mongo_db),
    current_user = Depends(get_current_user)
):
    """
    Elimina un lead de MongoDB.
    """
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid Lead ID format")
    
    # Solo borramos si pertenece al usuario
    result = await db.leads.delete_one({
        "_id": ObjectId(lead_id),
        "owner_id": current_user.id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return {"message": "Lead deleted successfully"}

@router.post("/bulk-import")
async def bulk_import_leads(
    request: BulkURLExtractRequest, 
    db = Depends(get_mongo_db),
    current_user = Depends(get_current_user)
):
    """
    Importa múltiples URLs desde CSV de forma optimizada.
    """
    results = []
    errors = []
    successful = 0
    failed = 0
    
    batch_size = 5
    
    async def process_url(url: str, owner_id: int):
        try:
            async with ScraperService() as scraper:
                result = await scraper.scrape_url(url)
                
                if "error" in result:
                    return {"success": False, "url": url, "error": result["error"]}
                
                title = result.get("title", "")
                description = result.get("description", "")
                classification = ml_service.classify_lead(title, description)
                
                lead_data = {
                    "url": url,
                    "title": title,
                    "description": description,
                    "owner_id": owner_id,
                    "content": {
                        "h1s": result.get("h1s")
                    },
                    # --- CORRECCIÓN TAMBIÉN AQUÍ ---
                    "status": classification["status"],
                    "ml_score": classification["ml_score"],      # Corregido
                    "ml_analysis": classification["ml_analysis"],# Corregido
                    # -------------------------------
                    "created_at": datetime.utcnow()
                }
                
                new_lead = await db.leads.insert_one(lead_data)
                lead_data["_id"] = str(new_lead.inserted_id)
                
                return {"success": True, "url": url, "data": lead_data}
        except Exception as e:
            return {"success": False, "url": url, "error": str(e)}
    
    # Procesar URLs en lotes usando el ID del usuario actual
    for i in range(0, len(request.urls), batch_size):
        batch = request.urls[i:i + batch_size]
        tasks = [process_url(url, current_user.id) for url in batch]
        batch_results = await asyncio.gather(*tasks)
        
        for result in batch_results:
            if result["success"]:
                successful += 1
                results.append(result["data"])
            else:
                failed += 1
                errors.append({"url": result["url"], "error": result.get("error", "Unknown error")})
    
    return BulkExtractResponse(
        total=len(request.urls),
        successful=successful,
        failed=failed,
        results=results,
        errors=errors
    )

@router.get("/export/csv")
async def export_leads_csv(
    db = Depends(get_mongo_db),
    current_user = Depends(get_current_user)
):
    """
    Exporta todos los leads del usuario a formato CSV.
    """
    leads = []
    # Filtramos por usuario
    cursor = db.leads.find({"owner_id": current_user.id}).sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        leads.append(document)
    
    if not leads:
        raise HTTPException(status_code=404, detail="No leads found to export")
    
    output = io.StringIO()
    
    fieldnames = [
        "_id",
        "url",
        "title",
        "description",
        "status",
        "ml_score",
        "owner_id",
        "created_at"
    ]
    
    writer = csv.DictWriter(output, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()
    
    for lead in leads:
        if isinstance(lead.get("created_at"), datetime):
            lead["created_at"] = lead["created_at"].isoformat()
        writer.writerow(lead)
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=leads_export_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
        }
    )