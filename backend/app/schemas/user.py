"""
User profile schemas
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserProfileResponse(BaseModel):
    """Schema for user profile response"""
    id: str
    customer_id: Optional[str] = None
    email: str
    name: str
    country: str
    nationality: Optional[str] = None
    phone: Optional[str] = None
    preferred_language: str
    passport_number: Optional[str] = None
    date_of_birth: Optional[str] = None
    passport_expiry: Optional[str] = None
    provider: Optional[str] = None
    profile_picture: Optional[str] = None
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    """Schema for updating user profile"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    country: Optional[str] = Field(None, min_length=2, max_length=100)
    nationality: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = None
    passport_number: Optional[str] = None
    date_of_birth: Optional[str] = None
    passport_expiry: Optional[str] = None

class LanguageUpdate(BaseModel):
    """Schema for updating preferred language"""
    preferred_language: str = Field(..., pattern="^(en|ko|ja|zh|es|fr|id|vi|th|ru)$")
