from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/")
async def get_stores(
    category: str = Query(None),
    latitude: float = Query(None),
    longitude: float = Query(None),
    radius: float = Query(5.0),
    db: Session = Depends(get_db)
):
    """Get list of partner stores with optional filters"""
    return {"message": "Get stores endpoint"}

@router.get("/{store_id}")
async def get_store_details(store_id: str, db: Session = Depends(get_db)):
    """Get detailed information about a specific store"""
    return {"message": f"Get store {store_id} details endpoint"}

@router.get("/nearby")
async def get_nearby_stores(
    latitude: float = Query(...),
    longitude: float = Query(...),
    radius: float = Query(5.0),
    db: Session = Depends(get_db)
):
    """Get nearby stores based on location"""
    return {"message": "Get nearby stores endpoint"}
