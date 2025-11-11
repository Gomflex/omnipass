"""
Authentication schemas
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    """Schema for user registration"""
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")
    name: str = Field(..., min_length=1, max_length=100)
    country: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = None
    preferred_language: str = Field(default="en", pattern="^(en|ko|ja|zh|es|fr)$")

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    """Schema for decoded token data"""
    user_id: Optional[str] = None

class UserResponse(BaseModel):
    """Schema for user data response"""
    id: str
    email: str
    name: str
    country: str
    phone: Optional[str] = None
    preferred_language: str
    created_at: datetime

    class Config:
        from_attributes = True
