from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..db.session_sql import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Lead(Base):
    # Nota: Aunque usaremos Mongo para el contenido dinámico del Lead,
    # a veces es útil tener una referencia en SQL para reportes rápidos.
    __tablename__ = "sql_leads"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    status = Column(String, default="new")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
