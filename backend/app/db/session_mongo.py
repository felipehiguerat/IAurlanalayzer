import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

# Intentamos leer primero una URI completa (para Render/Producción)
MONGO_URL = os.getenv("MONGO_URI")

if not MONGO_URL:
    # Si no existe MONGO_URI, usamos la construcción por piezas (para tu Local/Docker)
    MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME", "root")
    MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD", "example")
    MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
    MONGO_PORT = os.getenv("MONGO_PORT", "27017")
    # Formato antiguo para local
    MONGO_URL = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/?authSource=admin"

MONGO_DB = os.getenv("MONGO_DB", "app")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB]

def get_mongo_db():
    return db
