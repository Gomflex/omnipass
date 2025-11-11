from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/balance")
async def get_balance(db: Session = Depends(get_db)):
    """Get user's point balance"""
    return {"message": "Get balance endpoint"}

@router.get("/transactions")
async def get_transactions(db: Session = Depends(get_db)):
    """Get user's transaction history"""
    return {"message": "Get transactions endpoint"}

@router.post("/charge")
async def charge_points(db: Session = Depends(get_db)):
    """Charge points using credit card"""
    return {"message": "Charge points endpoint"}

@router.post("/earn")
async def earn_points(db: Session = Depends(get_db)):
    """Earn points from purchase"""
    return {"message": "Earn points endpoint"}

@router.post("/spend")
async def spend_points(db: Session = Depends(get_db)):
    """Spend points"""
    return {"message": "Spend points endpoint"}
