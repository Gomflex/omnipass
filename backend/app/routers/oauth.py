"""
OAuth social login endpoints
Supports Google, Facebook, Kakao
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
import requests
import os
from app.database import get_db
from app.models.user import User
from app.schemas.auth import Token
from app.utils.auth import create_access_token
from app.config import settings
from app.services.google_sheets import sheets_service

router = APIRouter()

# OAuth Configuration
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET', '')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:3000/auth/callback/google')

FACEBOOK_APP_ID = os.getenv('FACEBOOK_APP_ID', '')
FACEBOOK_APP_SECRET = os.getenv('FACEBOOK_APP_SECRET', '')
FACEBOOK_REDIRECT_URI = os.getenv('FACEBOOK_REDIRECT_URI', 'http://localhost:3000/auth/callback/facebook')

KAKAO_CLIENT_ID = os.getenv('KAKAO_CLIENT_ID', '')
KAKAO_CLIENT_SECRET = os.getenv('KAKAO_CLIENT_SECRET', '')
KAKAO_REDIRECT_URI = os.getenv('KAKAO_REDIRECT_URI', 'http://localhost:3000/auth/callback/kakao')

@router.post("/google", response_model=Token)
async def google_login(access_token: str, db: Session = Depends(get_db)):
    """
    Google OAuth login
    Frontend sends the access token from Google
    """
    try:
        # Verify Google token and get user info
        response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google access token"
            )

        google_user = response.json()
        email = google_user.get('email')
        name = google_user.get('name', '')
        google_id = google_user.get('sub')
        picture = google_user.get('picture', '')

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not provided by Google"
            )

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if user:
            # Update existing user
            user.provider = 'google'
            user.provider_id = google_id
            user.profile_picture = picture
            user.last_login = datetime.utcnow()
            db.commit()
        else:
            # Create new user
            user = User(
                email=email,
                name=name,
                country='Unknown',  # Can be updated later in profile
                provider='google',
                provider_id=google_id,
                profile_picture=picture,
                last_login=datetime.utcnow()
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            # Sync to Google Sheets
            try:
                sheets_service.sync_user({
                    'id': user.id,
                    'customer_id': user.customer_id,
                    'name': user.name,
                    'email': user.email,
                    'country': user.country,
                    'nationality': user.nationality,
                    'phone': user.phone,
                    'preferred_language': user.preferred_language,
                    'passport_number': user.passport_number,
                    'date_of_birth': user.date_of_birth,
                    'passport_expiry': user.passport_expiry,
                    'provider': user.provider,
                    'provider_id': user.provider_id,
                    'profile_picture': user.profile_picture,
                    'last_login': str(user.last_login),
                    'created_at': str(user.created_at),
                    'updated_at': str(user.updated_at)
                })
            except Exception as e:
                print(f"[Google Sheets] Failed to sync Google OAuth user: {e}")

        # Create JWT token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": str(user.id)},
            expires_delta=access_token_expires
        )

        return {
            "access_token": jwt_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to communicate with Google: {str(e)}"
        )

@router.post("/facebook", response_model=Token)
async def facebook_login(access_token: str, db: Session = Depends(get_db)):
    """
    Facebook OAuth login
    Frontend sends the access token from Facebook
    """
    try:
        # Verify Facebook token and get user info
        response = requests.get(
            f'https://graph.facebook.com/me?fields=id,name,email,picture&access_token={access_token}'
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Facebook access token"
            )

        fb_user = response.json()
        email = fb_user.get('email')
        name = fb_user.get('name', '')
        fb_id = fb_user.get('id')
        picture = fb_user.get('picture', {}).get('data', {}).get('url', '')

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not provided by Facebook"
            )

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if user:
            # Update existing user
            user.provider = 'facebook'
            user.provider_id = fb_id
            user.profile_picture = picture
            user.last_login = datetime.utcnow()
            db.commit()
        else:
            # Create new user
            user = User(
                email=email,
                name=name,
                country='Unknown',
                provider='facebook',
                provider_id=fb_id,
                profile_picture=picture,
                last_login=datetime.utcnow()
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            # Sync to Google Sheets
            try:
                sheets_service.sync_user({
                    'id': user.id,
                    'customer_id': user.customer_id,
                    'name': user.name,
                    'email': user.email,
                    'country': user.country,
                    'nationality': user.nationality,
                    'phone': user.phone,
                    'preferred_language': user.preferred_language,
                    'passport_number': user.passport_number,
                    'date_of_birth': user.date_of_birth,
                    'passport_expiry': user.passport_expiry,
                    'provider': user.provider,
                    'provider_id': user.provider_id,
                    'profile_picture': user.profile_picture,
                    'last_login': str(user.last_login),
                    'created_at': str(user.created_at),
                    'updated_at': str(user.updated_at)
                })
            except Exception as e:
                print(f"[Google Sheets] Failed to sync Facebook OAuth user: {e}")

        # Create JWT token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": str(user.id)},
            expires_delta=access_token_expires
        )

        return {
            "access_token": jwt_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to communicate with Facebook: {str(e)}"
        )

@router.post("/kakao", response_model=Token)
async def kakao_login(access_token: str, db: Session = Depends(get_db)):
    """
    Kakao OAuth login
    Frontend sends the access token from Kakao
    """
    try:
        # Verify Kakao token and get user info
        response = requests.get(
            'https://kapi.kakao.com/v2/user/me',
            headers={'Authorization': f'Bearer {access_token}'}
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Kakao access token"
            )

        kakao_user = response.json()
        kakao_id = str(kakao_user.get('id'))
        kakao_account = kakao_user.get('kakao_account', {})
        email = kakao_account.get('email')
        profile = kakao_account.get('profile', {})
        name = profile.get('nickname', '')
        picture = profile.get('profile_image_url', '')

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not provided by Kakao. Please allow email access."
            )

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if user:
            # Update existing user
            user.provider = 'kakao'
            user.provider_id = kakao_id
            user.profile_picture = picture
            user.last_login = datetime.utcnow()
            db.commit()
        else:
            # Create new user
            user = User(
                email=email,
                name=name,
                country='Unknown',
                provider='kakao',
                provider_id=kakao_id,
                profile_picture=picture,
                last_login=datetime.utcnow()
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            # Sync to Google Sheets
            try:
                sheets_service.sync_user({
                    'id': user.id,
                    'customer_id': user.customer_id,
                    'name': user.name,
                    'email': user.email,
                    'country': user.country,
                    'nationality': user.nationality,
                    'phone': user.phone,
                    'preferred_language': user.preferred_language,
                    'passport_number': user.passport_number,
                    'date_of_birth': user.date_of_birth,
                    'passport_expiry': user.passport_expiry,
                    'provider': user.provider,
                    'provider_id': user.provider_id,
                    'profile_picture': user.profile_picture,
                    'last_login': str(user.last_login),
                    'created_at': str(user.created_at),
                    'updated_at': str(user.updated_at)
                })
            except Exception as e:
                print(f"[Google Sheets] Failed to sync Kakao OAuth user: {e}")

        # Create JWT token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": str(user.id)},
            expires_delta=access_token_expires
        )

        return {
            "access_token": jwt_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to communicate with Kakao: {str(e)}"
        )
