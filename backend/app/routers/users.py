from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/me")
async def get_current_user(db: Session = Depends(get_db)):
    """Get current user profile"""
    return {"message": "Get current user endpoint"}

@router.put("/me")
async def update_profile(db: Session = Depends(get_db)):
    """Update user profile"""
    return {"message": "Update profile endpoint"}

@router.put("/me/language")
async def update_language(db: Session = Depends(get_db)):
    """Update preferred language"""
    return {"message": "Update language endpoint"}
