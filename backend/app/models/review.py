from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, CheckConstraint, UniqueConstraint, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from app.database import Base

class EntityType(str, enum.Enum):
    MEDICAL_FACILITY = "medical_facility"
    SDM_PACKAGE = "sdm_package"
    STORE = "store"

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    entity_type = Column(Enum(EntityType), nullable=False)
    entity_id = Column(String, nullable=False, index=True)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="reviews")
    replies = relationship("ReviewReply", back_populates="review", cascade="all, delete-orphan")
    helpful_votes = relationship("ReviewHelpful", back_populates="review", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
        UniqueConstraint('user_id', 'entity_type', 'entity_id', name='unique_user_entity_review'),
    )

class ReviewReply(Base):
    __tablename__ = "review_replies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    review_id = Column(String, ForeignKey("reviews.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    parent_reply_id = Column(String, ForeignKey("review_replies.id", ondelete="CASCADE"), nullable=True)
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    review = relationship("Review", back_populates="replies")
    user = relationship("User", backref="review_replies")
    parent = relationship("ReviewReply", remote_side=[id], backref="child_replies")

class ReviewHelpful(Base):
    __tablename__ = "review_helpful"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    review_id = Column(String, ForeignKey("reviews.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    review = relationship("Review", back_populates="helpful_votes")
    user = relationship("User", backref="helpful_votes")

    __table_args__ = (
        UniqueConstraint('user_id', 'review_id', name='unique_user_review_helpful'),
    )
