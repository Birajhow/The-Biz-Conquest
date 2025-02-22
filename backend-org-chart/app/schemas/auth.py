# app/schemas/auth.py
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel): 
    email: str
    password: str