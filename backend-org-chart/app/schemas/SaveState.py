from pydantic import BaseModel, Field
from typing import Dict, List

class Task(BaseModel):
    id: str
    name: str
    title: str

class Column(BaseModel):
    id: str
    title: str
    taskIds: List[str] = Field(default_factory=list)  

class SaveState(BaseModel):
    tasks: Dict[str, Task] = Field(default_factory=dict)  
    columns: Dict[str, Column] = Field(default_factory=dict)
    columnOrder: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True