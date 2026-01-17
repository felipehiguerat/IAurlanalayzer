import sys
from pathlib import Path

# Configurar el path
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))

# Importar la app principal
from app.main import app

# Vercel usará esta variable automáticamente