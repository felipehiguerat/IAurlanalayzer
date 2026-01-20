import os
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session

# Importa tus modelos y dependencias
from app.db.session_sql import get_db 
from app.db.session_mongo import get_mongo_db
from app.models.sql_models import User  
router = APIRouter(prefix="/admin", tags=["Maintenance"])

ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")

@router.post("/cleanup")
async def cleanup_old_data(
    x_admin_token: str = Header(None), 
    db: Session = Depends(get_db),
    mongo_db = Depends(get_mongo_db)
):
    # 1. Verificación de Seguridad
    if x_admin_token != ADMIN_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de administrador inválido"
        )

    # 2. Definir ventana de tiempo (Ejemplo: 24 horas)
    # Cualquier usuario creado antes de esto será borrado
    threshold = datetime.utcnow() - timedelta(hours=24)

    try:
        # 3. Obtener usuarios viejos de Neon
        # SQLAlchemy usará la tabla 'users' vinculada a la clase 'User'
        old_users = db.query(User).filter(User.created_at < threshold).all()
        
        if not old_users:
            return {"message": "Nada que limpiar", "usuarios_borrados": 0}

        # Extraemos los IDs
        user_ids = [user.id for user in old_users]

        # 4. Limpiar MongoDB
        # Importante: Si en Mongo guardaste el owner_id como String, 
        # convertimos los IDs a string aquí.
        user_ids_str = [str(uid) for uid in user_ids]
        
        mongo_result = await mongo_db.leads.delete_many({
            "owner_id": {"$in": user_ids} # Probamos con el tipo original (int)
            # Si no borra, prueba cambiando a user_ids_str
        })

        # 5. Limpiar Neon (Postgres)
        db.query(User).filter(User.id.in_(user_ids)).delete(synchronize_session=False)
        db.commit()

        return {
            "status": "success",
            "usuarios_eliminados": len(user_ids),
            "leads_mongo_eliminados": mongo_result.deleted_count,
            "limite_tiempo": threshold.isoformat()
        }

    except Exception as e:
        db.rollback()
        print(f"Error en limpieza: {e}")
        raise HTTPException(status_code=500, detail=str(e))