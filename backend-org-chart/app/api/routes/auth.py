from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm  
from app.schemas.auth import LoginRequest  
from app.schemas.auth import LoginRequest, SignupRequest 
from datetime import datetime, timedelta
import jwt
from app.db import get_db
from app.models.User import User, Base
from app.models.DragState import DragState, Base
from app.schemas.user import UserCreate, UserResponse
from app.schemas.SaveState import SaveState
from app.models.DragState import DragColumn, DragTask, DragState

router = APIRouter()
SECRET_KEY = "supersecretkey" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


pwd_context = CryptContext(schemes=["scrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/signup", response_model=UserResponse)
def register_user(user: SignupRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)  # Hash with scrypt
    db_user = User(email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == credentials.email).first()

    if not db_user or not verify_password(credentials.password, db_user.password_hash):  # Verify with scrypt
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": credentials.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/save", response_model=dict)  
def save_drag_state(data: SaveState, db: Session = Depends(get_db)):
    data_dict = data.model_dump()
    try:
        for column_id, column in data_dict["columns"].items():
            db_column = db.query(DragColumn).filter_by(id=column_id).first()
            if not db_column:
                db_column = DragColumn(id=column_id, title=column["title"])
                db.add(db_column)

        for task_id, task in data_dict["tasks"].items():
            db_task = db.query(DragTask).filter_by(id=task_id).first()
            if not db_task:
                db_task = DragTask(id=task_id, name=task["name"], title=task["title"])
                db.add(db_task)

        db.query(DragState).delete()
        
        for column_id, column in data.columns.items():
            for index, task_id in enumerate(column.taskIds):
                db_drag_state = DragState(column_id=column_id, task_id=task_id, task_index=index)
                db.add(db_drag_state)

        db.commit()
        return {"message": "State saved!"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving state: {str(e)}")
    
@router.get("/get-state", response_model=dict)
def get_drag_state(db: Session = Depends(get_db)):
    # Find columns
    columns = db.query(DragColumn).all()
    tasks = db.query(DragTask).all()
    states = db.query(DragState).all()

    # Build tasks dict
    task_dict = {task.id: {"id": task.id, "name": task.name, "title": task.title} for task in tasks}

    # Build columns and order
    column_dict = {col.id: {"id": col.id, "title": col.title, "taskIds": []} for col in columns}

    for state in states:
        if state.column_id in column_dict:
            column_dict[state.column_id]["taskIds"].append(state.task_id)

    # Columns order
    column_order = [col.id for col in columns]

    return {
        "tasks": task_dict,
        "columns": column_dict,
        "columnOrder": column_order
    }
