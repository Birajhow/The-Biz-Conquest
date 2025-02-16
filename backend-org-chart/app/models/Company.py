# app/models/company.py
from sqlalchemy import Column, Integer, String
from app.db import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
