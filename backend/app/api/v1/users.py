from fastapi import APIRouter, Depends, HTTPException
from app.db.session_mongo import get_mongo_db
from typing import List

router = APIRouter()

@router.get("/{id}/leads")
async def get_user_leads(id: int, db = Depends(get_mongo_db)):
    """
    Busca en MongoDB todos los leads donde el owner_id coincida con el {id} de la URL.
    """
    leads = []
    cursor = db.leads.find({"owner_id": id}).sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        leads.append(document)
    return leads

@router.get("/{id}/stats")
async def get_user_stats(id: int, db = Depends(get_mongo_db)):
    """
    Devuelve un resumen (ej: "Tienes 5 leads Hot y 10 Cold").
    """
    # Contar leads por estado para un usuario específico
    pipeline = [
        {"$match": {"owner_id": id}},
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]
    
    stats_cursor = db.leads.aggregate(pipeline)
    stats = {}
    async for item in stats_cursor:
        status_name = item["_id"] or "Unknown"
        stats[status_name] = item["count"]
    
    # Asegurar que tenemos al menos Hot y Cold aunque sean 0 (si queremos ser específicos)
    return {
        "user_id": id,
        "stats": stats,
        "summary": f"User {id} has {sum(stats.values())} leads in total."
    }
