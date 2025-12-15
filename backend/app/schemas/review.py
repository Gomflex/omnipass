"""
Review system schemas
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

class EntityType(str, Enum):
    MEDICAL_FACILITY = "medical_facility"
    SDM_PACKAGE = "sdm_package"
    STORE = "store"

# Review Schemas
class ReviewCreate(BaseModel):
    """Schema for creating a review"""
    entity_type: EntityType
    entity_id: str = Field(..., min_length=1, max_length=255)
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    comment: str = Field(..., min_length=1, max_length=5000, description="Review comment")

class ReviewUpdate(BaseModel):
    """Schema for updating a review"""
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = Field(None, min_length=1, max_length=5000)

    @field_validator('rating', 'comment')
    @classmethod
    def at_least_one_field(cls, v, info):
        if v is None:
            return v
        return v

class UserInfo(BaseModel):
    """Schema for user information in review response"""
    id: str
    name: str
    email: str

    class Config:
        from_attributes = True

class ReviewResponse(BaseModel):
    """Schema for review response"""
    id: str
    user_id: str
    user: UserInfo
    entity_type: EntityType
    entity_id: str
    rating: int
    comment: str
    helpful_count: int = 0
    user_has_marked_helpful: bool = False
    reply_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ReviewListResponse(BaseModel):
    """Schema for paginated review list response"""
    reviews: List[ReviewResponse]
    total: int
    page: int
    page_size: int
    average_rating: float
    rating_distribution: dict  # {1: count, 2: count, ...}

# Reply Schemas
class ReplyCreate(BaseModel):
    """Schema for creating a reply"""
    comment: str = Field(..., min_length=1, max_length=2000)
    parent_reply_id: Optional[str] = None

class ReplyUpdate(BaseModel):
    """Schema for updating a reply"""
    comment: str = Field(..., min_length=1, max_length=2000)

class ReplyResponse(BaseModel):
    """Schema for reply response"""
    id: str
    review_id: str
    user_id: str
    user: UserInfo
    parent_reply_id: Optional[str]
    comment: str
    created_at: datetime
    updated_at: datetime
    child_replies: List['ReplyResponse'] = []

    class Config:
        from_attributes = True

# Enable forward references for recursive ReplyResponse
ReplyResponse.model_rebuild()

class ReviewWithRepliesResponse(ReviewResponse):
    """Schema for review with nested replies"""
    replies: List[ReplyResponse] = []

    class Config:
        from_attributes = True
