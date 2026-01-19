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

router = APIRouter()
ml_service = MLService()

@router.post("/extract")
async def extract_lead(url: str = Body(..., embed=True), owner_id: int = Body(1), db = Depends(get_mongo_db)):
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
            "owner_id": owner_id,
            "content": {
                "h1s": result.get("h1s")
            },
            "status": classification["status"],  # "Hot", "Cold" o "Neutral"
            "ml_score": classification["score"],
            "ml_analysis": classification["analysis"],
            "created_at": datetime.utcnow()
        }
        
        # Guardar en la colección 'leads'
        new_lead = await db.leads.insert_one(lead_data)
        
        # Convertir ObjectId a string para la respuesta
        lead_data["_id"] = str(new_lead.inserted_id)
        
        return lead_data

@router.get("/")
async def list_leads(db = Depends(get_mongo_db)):
    """
    Lista todos los leads guardados en MongoDB.
    """
    leads = []
    cursor = db.leads.find().sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        leads.append(document)
    return leads + SAMPLE_LEADS

@router.get("/{lead_id}")
async def get_lead(lead_id: str, db = Depends(get_mongo_db)):
    """
    Obtiene el detalle de un lead (real o de ejemplo).
    """
    # 1. Verificar si es un ID de ejemplo
    if lead_id.startswith("sample-"):
        # Buscamos el objeto en nuestra lista de constantes
        sample = next((item for item in SAMPLE_LEADS if item["_id"] == lead_id), None)
        if not sample:
            raise HTTPException(status_code=404, detail="Sample lead not found")
        return sample

    # 2. Si no es ejemplo, procedemos con la lógica normal de MongoDB
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid Lead ID format")
    
    lead = await db.leads.find_one({"_id": ObjectId(lead_id)})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead["_id"] = str(lead["_id"])
    return lead

    
@router.delete("/{lead_id}")
async def delete_lead(lead_id: str, db = Depends(get_mongo_db)):
    """
    Elimina un lead de MongoDB.
    """
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid Lead ID format")
    
    result = await db.leads.delete_one({"_id": ObjectId(lead_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return {"message": "Lead deleted successfully"}

@router.post("/bulk-import")
async def bulk_import_leads(request: BulkURLExtractRequest, db = Depends(get_mongo_db)):
    """
    Importa múltiples URLs desde CSV de forma optimizada.
    Procesa las URLs en lotes para mejor rendimiento.
    """
    results = []
    errors = []
    successful = 0
    failed = 0
    
    # Procesar URLs en lotes de 5 para evitar sobrecarga
    batch_size = 5
    
    async def process_url(url: str, owner_id: int):
        """Procesa una URL individual"""
        try:
            async with ScraperService() as scraper:
                result = await scraper.scrape_url(url)
                
                if "error" in result:
                    return {"success": False, "url": url, "error": result["error"]}
                
                # Clasificación con ML
                title = result.get("title", "")
                description = result.get("description", "")
                classification = ml_service.classify_lead(title, description)
                
                # Crear objeto para Mongo
                lead_data = {
                    "url": url,
                    "title": title,
                    "description": description,
                    "owner_id": owner_id,
                    "content": {
                        "h1s": result.get("h1s")
                    },
                    "status": classification["status"],
                    "ml_score": classification["score"],
                    "ml_analysis": classification["analysis"],
                    "created_at": datetime.utcnow()
                }
                
                # Guardar en MongoDB
                new_lead = await db.leads.insert_one(lead_data)
                lead_data["_id"] = str(new_lead.inserted_id)
                
                return {"success": True, "url": url, "data": lead_data}
        except Exception as e:
            return {"success": False, "url": url, "error": str(e)}
    
    # Procesar URLs en lotes
    for i in range(0, len(request.urls), batch_size):
        batch = request.urls[i:i + batch_size]
        tasks = [process_url(url, request.owner_id) for url in batch]
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
async def export_leads_csv(db = Depends(get_mongo_db)):
    """
    Exporta todos los leads a formato CSV.
    """
    # Obtener todos los leads
    leads = []
    cursor = db.leads.find().sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        leads.append(document)
    
    if not leads:
        raise HTTPException(status_code=404, detail="No leads found to export")
    
    # Crear CSV en memoria
    output = io.StringIO()
    
    # Definir columnas del CSV
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
        # Formatear fecha para CSV
        if isinstance(lead.get("created_at"), datetime):
            lead["created_at"] = lead["created_at"].isoformat()
        writer.writerow(lead)
    
    # Preparar respuesta
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=leads_export_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
        }
    )

