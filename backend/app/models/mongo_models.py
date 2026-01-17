from datetime import datetime
from typing import Optional, List, Dict, Any

class MongoLead:
    """
    Representación lógica de un Lead en MongoDB.
    Como Mongo es schemaless, definimos aquí la estructura esperada 
    para el Scraper y el procesamiento.
    """
    def __init__(
        self, 
        name: str, 
        company: str, 
        owner_id: int,
        email: Optional[str] = None, 
        raw_data: Dict[str, Any] = None,
        tags: List[str] = None
    ):
        self.name = name
        self.company = company
        self.owner_id = owner_id
        self.email = email
        self.raw_data = raw_data or {}
        self.tags = tags or []
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "name": self.name,
            "company": self.company,
            "owner_id": self.owner_id,
            "email": self.email,
            "raw_data": self.raw_data,
            "tags": self.tags,
            "created_at": self.created_at
        }
