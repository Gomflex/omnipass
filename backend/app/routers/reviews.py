"""
Review system router
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database import get_db
from app.models.review import Review, ReviewReply, ReviewHelpful, EntityType
from app.models.user import User
from app.schemas.review import (
    ReviewCreate, ReviewUpdate, ReviewResponse, ReviewListResponse,
    ReplyCreate, ReplyUpdate, ReplyResponse, ReviewWithRepliesResponse
)
from app.utils.dependencies import get_current_user

router = APIRouter()

# ==================== REVIEW ENDPOINTS ====================

@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new review (authenticated users only)
    - User can only have one review per entity
    """
    # Check if user already reviewed this entity
    existing_review = db.query(Review).filter(
        Review.user_id == current_user.id,
        Review.entity_type == review_data.entity_type,
        Review.entity_id == review_data.entity_id
    ).first()

    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this item. Use update endpoint to modify your review."
        )

    # Create review
    new_review = Review(
        user_id=current_user.id,
        entity_type=review_data.entity_type,
        entity_id=review_data.entity_id,
        rating=review_data.rating,
        comment=review_data.comment
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Build response
    return _build_review_response(new_review, current_user.id, db)

@router.get("/", response_model=ReviewListResponse)
async def get_reviews(
    entity_type: EntityType = Query(...),
    entity_id: str = Query(...),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    sort_by: str = Query("recent", pattern="^(recent|helpful|rating_high|rating_low)$"),
    db: Session = Depends(get_db)
):
    """
    Get reviews for a specific entity with pagination and sorting
    - No authentication required for reading
    """
    query = db.query(Review).filter(
        Review.entity_type == entity_type,
        Review.entity_id == entity_id
    )

    # Calculate statistics
    total = query.count()
    avg_rating = db.query(func.avg(Review.rating)).filter(
        Review.entity_type == entity_type,
        Review.entity_id == entity_id
    ).scalar() or 0.0

    # Rating distribution
    rating_dist = {}
    for i in range(1, 6):
        count = db.query(Review).filter(
            Review.entity_type == entity_type,
            Review.entity_id == entity_id,
            Review.rating == i
        ).count()
        rating_dist[str(i)] = count

    # Sorting
    if sort_by == "recent":
        query = query.order_by(Review.created_at.desc())
    elif sort_by == "helpful":
        query = query.outerjoin(ReviewHelpful).group_by(Review.id).order_by(
            func.count(ReviewHelpful.id).desc(), Review.created_at.desc()
        )
    elif sort_by == "rating_high":
        query = query.order_by(Review.rating.desc(), Review.created_at.desc())
    elif sort_by == "rating_low":
        query = query.order_by(Review.rating.asc(), Review.created_at.desc())

    # Pagination
    offset = (page - 1) * page_size
    reviews = query.offset(offset).limit(page_size).all()

    # Build responses (no user authentication, so user_id is None)
    review_responses = [_build_review_response(r, None, db) for r in reviews]

    return ReviewListResponse(
        reviews=review_responses,
        total=total,
        page=page,
        page_size=page_size,
        average_rating=round(float(avg_rating), 1),
        rating_distribution=rating_dist
    )

@router.get("/{review_id}", response_model=ReviewWithRepliesResponse)
async def get_review_with_replies(
    review_id: str,
    db: Session = Depends(get_db)
):
    """Get a single review with all replies"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    review_data = _build_review_response(review, None, db)

    # Get top-level replies only
    replies = db.query(ReviewReply).filter(
        ReviewReply.review_id == review_id,
        ReviewReply.parent_reply_id.is_(None)
    ).order_by(ReviewReply.created_at.asc()).all()

    reply_responses = [_build_reply_response(r, db) for r in replies]

    return ReviewWithRepliesResponse(
        **dict(review_data),
        replies=reply_responses
    )

@router.put("/{review_id}", response_model=ReviewResponse)
async def update_review(
    review_id: str,
    review_data: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user's own review"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own reviews"
        )

    # Update fields if provided
    if review_data.rating is not None:
        review.rating = review_data.rating
    if review_data.comment is not None:
        review.comment = review_data.comment

    db.commit()
    db.refresh(review)

    return _build_review_response(review, current_user.id, db)

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete user's own review"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own reviews"
        )

    db.delete(review)
    db.commit()
    return None

# ==================== HELPFUL VOTE ENDPOINTS ====================

@router.post("/{review_id}/helpful", status_code=status.HTTP_201_CREATED)
async def mark_review_helpful(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark a review as helpful"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Check if already marked
    existing = db.query(ReviewHelpful).filter(
        ReviewHelpful.review_id == review_id,
        ReviewHelpful.user_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already marked this review as helpful"
        )

    helpful = ReviewHelpful(review_id=review_id, user_id=current_user.id)
    db.add(helpful)
    db.commit()

    return {"message": "Review marked as helpful"}

@router.delete("/{review_id}/helpful", status_code=status.HTTP_204_NO_CONTENT)
async def unmark_review_helpful(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove helpful mark from a review"""
    helpful = db.query(ReviewHelpful).filter(
        ReviewHelpful.review_id == review_id,
        ReviewHelpful.user_id == current_user.id
    ).first()

    if not helpful:
        raise HTTPException(status_code=404, detail="Helpful mark not found")

    db.delete(helpful)
    db.commit()
    return None

# ==================== REPLY ENDPOINTS ====================

@router.post("/{review_id}/replies", response_model=ReplyResponse, status_code=status.HTTP_201_CREATED)
async def create_reply(
    review_id: str,
    reply_data: ReplyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a reply to a review"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # If parent_reply_id is provided, verify it exists and belongs to this review
    if reply_data.parent_reply_id:
        parent_reply = db.query(ReviewReply).filter(
            ReviewReply.id == reply_data.parent_reply_id,
            ReviewReply.review_id == review_id
        ).first()
        if not parent_reply:
            raise HTTPException(status_code=404, detail="Parent reply not found")

    new_reply = ReviewReply(
        review_id=review_id,
        user_id=current_user.id,
        parent_reply_id=reply_data.parent_reply_id,
        comment=reply_data.comment
    )

    db.add(new_reply)
    db.commit()
    db.refresh(new_reply)

    return _build_reply_response(new_reply, db)

@router.get("/{review_id}/replies", response_model=list[ReplyResponse])
async def get_replies(
    review_id: str,
    db: Session = Depends(get_db)
):
    """Get all replies for a review"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Get top-level replies only
    replies = db.query(ReviewReply).filter(
        ReviewReply.review_id == review_id,
        ReviewReply.parent_reply_id.is_(None)
    ).order_by(ReviewReply.created_at.asc()).all()

    return [_build_reply_response(r, db) for r in replies]

@router.put("/replies/{reply_id}", response_model=ReplyResponse)
async def update_reply(
    reply_id: str,
    reply_data: ReplyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user's own reply"""
    reply = db.query(ReviewReply).filter(ReviewReply.id == reply_id).first()
    if not reply:
        raise HTTPException(status_code=404, detail="Reply not found")

    if reply.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own replies"
        )

    reply.comment = reply_data.comment
    db.commit()
    db.refresh(reply)

    return _build_reply_response(reply, db)

@router.delete("/replies/{reply_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reply(
    reply_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete user's own reply"""
    reply = db.query(ReviewReply).filter(ReviewReply.id == reply_id).first()
    if not reply:
        raise HTTPException(status_code=404, detail="Reply not found")

    if reply.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own replies"
        )

    db.delete(reply)
    db.commit()
    return None

# ==================== HELPER FUNCTIONS ====================

def _build_review_response(review: Review, user_id: Optional[str], db: Session) -> ReviewResponse:
    """Build review response with aggregated data"""
    helpful_count = db.query(func.count(ReviewHelpful.id)).filter(
        ReviewHelpful.review_id == review.id
    ).scalar() or 0

    user_has_marked_helpful = False
    if user_id:
        user_has_marked_helpful = db.query(ReviewHelpful).filter(
            ReviewHelpful.review_id == review.id,
            ReviewHelpful.user_id == user_id
        ).first() is not None

    reply_count = db.query(func.count(ReviewReply.id)).filter(
        ReviewReply.review_id == review.id
    ).scalar() or 0

    return ReviewResponse(
        id=review.id,
        user_id=review.user_id,
        user={
            "id": review.user.id,
            "name": review.user.name,
            "email": review.user.email
        },
        entity_type=review.entity_type,
        entity_id=review.entity_id,
        rating=review.rating,
        comment=review.comment,
        helpful_count=helpful_count,
        user_has_marked_helpful=user_has_marked_helpful,
        reply_count=reply_count,
        created_at=review.created_at,
        updated_at=review.updated_at
    )

def _build_reply_response(reply: ReviewReply, db: Session) -> ReplyResponse:
    """Build reply response with nested children"""
    child_replies = db.query(ReviewReply).filter(
        ReviewReply.parent_reply_id == reply.id
    ).order_by(ReviewReply.created_at.asc()).all()

    child_responses = [_build_reply_response(child, db) for child in child_replies]

    return ReplyResponse(
        id=reply.id,
        review_id=reply.review_id,
        user_id=reply.user_id,
        user={
            "id": reply.user.id,
            "name": reply.user.name,
            "email": reply.user.email
        },
        parent_reply_id=reply.parent_reply_id,
        comment=reply.comment,
        created_at=reply.created_at,
        updated_at=reply.updated_at,
        child_replies=child_responses
    )
