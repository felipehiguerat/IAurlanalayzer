from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import auth, leads, users
from app.core.config import settings
from app.db.session_sql import get_db
from app.db.session_mongo import get_mongo_db
from sqlalchemy.sql import text

from .db.session_sql import engine, Base
from .models import sql_models

# Crear tablas en PostgreSQL al iniciar
sql_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, usa una lista de dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(leads.router, prefix="/api/v1/leads", tags=["leads"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Backend"}

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
