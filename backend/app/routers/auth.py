from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
from app.utils.auth import get_password_hash, verify_password, create_access_token
from app.utils.dependencies import get_current_user
from app.config import settings
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Register a new user

    - **email**: Valid email address (must be unique)
    - **password**: Minimum 8 characters
    - **name**: User's full name
    - **country**: User's country
    - **phone**: Optional phone number
    - **preferred_language**: Language code (en, ko, ja, zh, es, fr)
    """
    print(f"[DEBUG] Registration attempt for email: {user_data.email}")

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        print(f"[DEBUG] Email already exists: {user_data.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    print(f"[DEBUG] Hashing password for new user: {user_data.email}")
    hashed_password = get_password_hash(user_data.password)
    print(f"[DEBUG] Password hashed successfully")
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        name=user_data.name,
        country=user_data.country,
        phone=user_data.phone,
        preferred_language=user_data.preferred_language,
        passport_number=user_data.passport_number,
        date_of_birth=user_data.date_of_birth,
        nationality=user_data.nationality,
        passport_expiry=user_data.passport_expiry
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Sync to Google Sheets
    try:
        sheets_service.sync_user({
            'id': new_user.id,
            'customer_id': new_user.customer_id,
            'name': new_user.name,
            'email': new_user.email,
            'country': new_user.country,
            'nationality': new_user.nationality,
            'phone': new_user.phone,
            'preferred_language': new_user.preferred_language,
            'passport_number': new_user.passport_number,
            'date_of_birth': new_user.date_of_birth,
            'passport_expiry': new_user.passport_expiry,
            'provider': new_user.provider,
            'provider_id': new_user.provider_id,
            'profile_picture': new_user.profile_picture,
            'last_login': str(new_user.last_login) if new_user.last_login else '',
            'created_at': str(new_user.created_at),
            'updated_at': str(new_user.updated_at)
        })
    except Exception as e:
        print(f"[Google Sheets] Failed to sync user on registration: {e}")

    return new_user

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    User login

    Returns JWT access token

    - **email**: User's email
    - **password**: User's password
    """
    print(f"[DEBUG] Login attempt for email: {credentials.email}")

    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        print(f"[DEBUG] User not found: {credentials.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    print(f"[DEBUG] User found: {user.email}, verifying password...")

    # Verify password
    try:
        password_valid = verify_password(credentials.password, user.hashed_password)
        print(f"[DEBUG] Password verification result: {password_valid}")

        if not password_valid:
            print(f"[DEBUG] Password verification failed for user: {credentials.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
    except Exception as e:
        print(f"[DEBUG] Password verification error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Update last login time
    user.last_login = datetime.utcnow()
    db.commit()

    # Update Google Sheets
    try:
        sheets_service.update_user(user.id, {
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
        print(f"[Google Sheets] Failed to update user on login: {e}")

    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60  # in seconds
    }

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """
    Get current user profile

    Requires authentication
    """
    return current_user

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """
    User logout

    Note: Since we're using stateless JWT, logout is handled on the client side
    by removing the token. This endpoint is here for completeness and can be
    used for logging purposes.
    """
    return {
        "message": "Successfully logged out",
        "user_id": str(current_user.id)
    }
