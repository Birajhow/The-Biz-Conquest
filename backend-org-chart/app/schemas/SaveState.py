from pydantic import BaseModel, Field
from typing import Dict, List

class Task(BaseModel):
    id: str
    name: str
    title: str

class Column(BaseModel):
    id: str
    title: str
    taskIds: List[str] = Field(default_factory=list)  # 🔹 Evita problemas com listas vazias

class SaveState(BaseModel):
    tasks: Dict[str, Task] = Field(default_factory=dict)  # 🔹 Evita erro com dicionários vazios
    columns: Dict[str, Column] = Field(default_factory=dict)
    columnOrder: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True  # 🔹 Permite compatibilidade com ORM do SQLAlchemy