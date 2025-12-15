"""
User profile management endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserProfileResponse, UserProfileUpdate, LanguageUpdate
from app.utils.dependencies import get_current_user
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.get("/me", response_model=UserProfileResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user profile
    - Requires authentication
    """
    return current_user

@router.put("/me", response_model=UserProfileResponse)
async def update_profile(
    profile_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update user profile
    - Requires authentication
    - Updates only provided fields
    """
    # Update only provided fields
    update_data = profile_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(current_user, field, value)

    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)

    # Sync to Google Sheets
    try:
        sheets_service.sync_user({
            'id': current_user.id,
            'customer_id': current_user.customer_id,
            'name': current_user.name,
            'email': current_user.email,
            'country': current_user.country,
            'nationality': current_user.nationality,
            'phone': current_user.phone,
            'preferred_language': current_user.preferred_language,
            'passport_number': current_user.passport_number,
            'date_of_birth': current_user.date_of_birth,
            'passport_expiry': current_user.passport_expiry,
            'provider': current_user.provider,
            'provider_id': current_user.provider_id,
            'profile_picture': current_user.profile_picture,
            'last_login': str(current_user.last_login) if current_user.last_login else None,
            'created_at': str(current_user.created_at),
            'updated_at': str(current_user.updated_at) if current_user.updated_at else None
        })
    except Exception as e:
        print(f"[Google Sheets] Failed to sync user profile update: {e}")

    return current_user

@router.put("/me/language", response_model=UserProfileResponse)
async def update_language(
    language_data: LanguageUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update preferred language
    - Requires authentication
    - Supported languages: en, ko, ja, zh, es, fr, id, vi, th, ru
    """
    current_user.preferred_language = language_data.preferred_language
    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)

    # Sync to Google Sheets
    try:
        sheets_service.sync_user({
            'id': current_user.id,
            'customer_id': current_user.customer_id,
            'name': current_user.name,
            'email': current_user.email,
            'country': current_user.country,
            'nationality': current_user.nationality,
            'phone': current_user.phone,
            'preferred_language': current_user.preferred_language,
            'passport_number': current_user.passport_number,
            'date_of_birth': current_user.date_of_birth,
            'passport_expiry': current_user.passport_expiry,
            'provider': current_user.provider,
            'provider_id': current_user.provider_id,
            'profile_picture': current_user.profile_picture,
            'last_login': str(current_user.last_login) if current_user.last_login else None,
            'created_at': str(current_user.created_at),
            'updated_at': str(current_user.updated_at) if current_user.updated_at else None
        })
    except Exception as e:
        print(f"[Google Sheets] Failed to sync language update: {e}")

    return current_user
