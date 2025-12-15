"""
Partner stores endpoints
"""
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, List
import json
import math
from app.database import get_db
from app.models.store import Store, StoreCategory
from app.schemas.store import StoreResponse, StoreListResponse

router = APIRouter()

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate distance between two points using Haversine formula
    Returns distance in kilometers
    """
    R = 6371  # Earth's radius in kilometers

    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)

    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c

def build_store_response(store: Store, user_lat: Optional[float] = None, user_lon: Optional[float] = None) -> StoreResponse:
    """Build store response with parsed images and calculated distance"""
    # Parse images JSON string
    images = None
    if store.images:
        try:
            images = json.loads(store.images)
        except:
            images = None

    # Calculate distance if user location provided
    distance = None
    if user_lat is not None and user_lon is not None:
        distance = round(calculate_distance(user_lat, user_lon, store.latitude, store.longitude), 2)

    return StoreResponse(
        id=store.id,
        name=store.name,
        category=store.category,
        description=store.description,
        address=store.address,
        latitude=store.latitude,
        longitude=store.longitude,
        point_rate=store.point_rate,
        images=images,
        opening_hours=store.opening_hours,
        contact=store.contact,
        distance=distance
    )

@router.get("/", response_model=StoreListResponse)
async def get_stores(
    category: Optional[StoreCategory] = Query(None),
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    radius: float = Query(50.0, description="Search radius in kilometers"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of partner stores with optional filters
    - No authentication required
    - Can filter by category
    - Can filter by location and radius
    - Supports pagination
    """
    query = db.query(Store)

    # Filter by category
    if category:
        query = query.filter(Store.category == category)

    # Get all stores (we'll filter by distance in Python)
    all_stores = query.all()

    # Filter by distance if location provided
    if latitude is not None and longitude is not None:
        stores_with_distance = []
        for store in all_stores:
            distance = calculate_distance(latitude, longitude, store.latitude, store.longitude)
            if distance <= radius:
                stores_with_distance.append((store, distance))

        # Sort by distance
        stores_with_distance.sort(key=lambda x: x[1])
        all_stores = [s[0] for s in stores_with_distance]

    # Pagination
    total = len(all_stores)
    offset = (page - 1) * page_size
    stores = all_stores[offset:offset + page_size]

    # Build responses
    store_responses = [build_store_response(s, latitude, longitude) for s in stores]

    return StoreListResponse(
        stores=store_responses,
        total=total,
        page=page,
        page_size=page_size
    )

@router.get("/nearby", response_model=List[StoreResponse])
async def get_nearby_stores(
    latitude: float = Query(...),
    longitude: float = Query(...),
    radius: float = Query(5.0, description="Search radius in kilometers"),
    category: Optional[StoreCategory] = Query(None),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    Get nearby stores based on location
    - No authentication required
    - Returns stores sorted by distance
    - Optional category filter
    """
    query = db.query(Store)

    # Filter by category
    if category:
        query = query.filter(Store.category == category)

    all_stores = query.all()

    # Calculate distances and filter
    stores_with_distance = []
    for store in all_stores:
        distance = calculate_distance(latitude, longitude, store.latitude, store.longitude)
        if distance <= radius:
            stores_with_distance.append((store, distance))

    # Sort by distance and limit
    stores_with_distance.sort(key=lambda x: x[1])
    nearby_stores = [s[0] for s in stores_with_distance[:limit]]

    # Build responses
    return [build_store_response(s, latitude, longitude) for s in nearby_stores]

@router.get("/{store_id}", response_model=StoreResponse)
async def get_store_details(
    store_id: str,
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get detailed information about a specific store
    - No authentication required
    - Optionally provide location to calculate distance
    """
    store = db.query(Store).filter(Store.id == store_id).first()

    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Store not found"
        )

    return build_store_response(store, latitude, longitude)
