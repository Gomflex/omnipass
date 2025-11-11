from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/")
async def get_available_missions(db: Session = Depends(get_db)):
    """Get list of available eco-missions"""
    return {"message": "Get missions endpoint"}

@router.get("/my")
async def get_user_missions(db: Session = Depends(get_db)):
    """Get user's active and completed missions"""
    return {"message": "Get user missions endpoint"}

@router.post("/{mission_id}/start")
async def start_mission(mission_id: str, db: Session = Depends(get_db)):
    """Start a new mission"""
    return {"message": f"Start mission {mission_id} endpoint"}

@router.post("/{mission_id}/complete")
async def complete_mission(mission_id: str, db: Session = Depends(get_db)):
    """Complete a mission and earn points"""
    return {"message": f"Complete mission {mission_id} endpoint"}

@router.get("/{mission_id}/progress")
async def get_mission_progress(mission_id: str, db: Session = Depends(get_db)):
    """Get progress of a specific mission"""
    return {"message": f"Get mission {mission_id} progress endpoint"}
