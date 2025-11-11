from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum
from app.database import Base

class TransactionType(str, enum.Enum):
    EARN = "earn"
    SPEND = "spend"
    CHARGE = "charge"

class TransactionSource(str, enum.Enum):
    PURCHASE = "purchase"
    MISSION = "mission"
    CARD_CHARGE = "card_charge"
    REFUND = "refund"

class PointTransaction(Base):
    __tablename__ = "point_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    source = Column(Enum(TransactionSource), nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class PointBalance(Base):
    __tablename__ = "point_balances"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    balance = Column(Integer, default=0, nullable=False)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
