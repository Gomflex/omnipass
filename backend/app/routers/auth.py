from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
from app.utils.auth import get_password_hash, verify_password, create_access_token
from app.utils.dependencies import get_current_user
from app.config import settings

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
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        name=user_data.name,
        country=user_data.country,
        phone=user_data.phone,
        preferred_language=user_data.preferred_language
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    User login

    Returns JWT access token

    - **email**: User's email
    - **password**: User's password
    """
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Verify password
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

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
