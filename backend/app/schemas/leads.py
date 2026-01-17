from pydantic import BaseModel, ConfigDict, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime

class LeadBase(BaseModel):
    model_config = ConfigDict(extra='ignore')

    name: str
    company: str

class LeadCreate(LeadBase):
    pass

class Lead(LeadBase):
    id: str
    owner_id: int

    model_config = ConfigDict(from_attributes=True)

class URLExtractRequest(BaseModel):
    """Request model for extracting a single URL"""
    url: str

class BulkURLExtractRequest(BaseModel):
    """Request model for bulk URL extraction from CSV"""
    urls: List[str]
    owner_id: int = 1

class BulkExtractResponse(BaseModel):
    """Response model for bulk extraction"""
    total: int
    successful: int
    failed: int
    results: List[Dict[str, Any]]
    errors: List[Dict[str, str]]

class CSVExportResponse(BaseModel):
    """Response model for CSV export"""
    csv_data: str
    total_records: int
