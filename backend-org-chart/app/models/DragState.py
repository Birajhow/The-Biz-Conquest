from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class DragColumn(Base):
    __tablename__ = "drag_columns"

    id = Column(String, primary_key=True, index=True)
    title = Column(String)

class DragTask(Base):
    __tablename__ = "drag_tasks"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    title = Column(String)

class DragState(Base):
    __tablename__ = "drag_state"

    id = Column(Integer, primary_key=True, autoincrement=True)
    column_id = Column(String, ForeignKey("drag_columns.id"))
    task_id = Column(String, ForeignKey("drag_tasks.id"))
    task_index = Column(Integer)
