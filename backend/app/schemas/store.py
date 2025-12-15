"""
Store schemas
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from app.models.store import StoreCategory

class StoreResponse(BaseModel):
    """Schema for store response"""
    id: str
    name: str
    category: StoreCategory
    description: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    point_rate: float
    images: Optional[List[str]] = None
    opening_hours: Optional[str] = None
    contact: Optional[str] = None
    distance: Optional[float] = None  # Distance in km (for nearby searches)

    class Config:
        from_attributes = True

class StoreListResponse(BaseModel):
    """Schema for paginated store list response"""
    stores: List[StoreResponse]
    total: int
    page: int
    page_size: int
