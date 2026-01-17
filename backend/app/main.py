from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.sql import text

# Imports corregidos para la estructura interna de /app
from app.api.v1 import auth, leads, users
from app.core.config import settings
from app.db.session_sql import get_db, engine # Importamos engine directamente de aquí
from app.db.session_mongo import get_mongo_db
from app.models import sql_models

# 1. Definir la aplicación
app = FastAPI(title=settings.PROJECT_NAME)

# 2. Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Rutas principales
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Backend"}

@app.get("/setup")
async def setup_database():
    try:
        # Esto crea las tablas en Neon usando el engine importado
        sql_models.Base.metadata.create_all(bind=engine)
        return {"status": "success", "message": "Tablas creadas correctamente en Neon"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/health")
async def health_check(db = Depends(get_db)):
    # Test SQL
    try:
        db.execute(text("SELECT 1"))
        sql_status = "OK"
    except Exception as e:
        sql_status = f"Error: {str(e)}"
    
    # Test Mongo
    try:
        mongo_db = get_mongo_db()
        await mongo_db.command("ping")
        mongo_status = "OK"
    except Exception as e:
        mongo_status = f"Error: {str(e)}"
    
    return {
        "status": "active",
        "database_sql": sql_status,
        "database_mongo": mongo_status
    }

# 4. Incluir Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(leads.router, prefix="/api/v1/leads", tags=["leads"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])