from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, Text
from datetime import datetime
import uuid
import enum
from app.database import Base

class MissionType(str, enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    SPECIAL = "special"

class MissionStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    EXPIRED = "expired"

class EcoMission(Base):
    __tablename__ = "eco_missions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    points = Column(Integer, nullable=False)
    type = Column(Enum(MissionType), nullable=False)
    requirements = Column(Text)  # JSON string for SQLite compatibility
    expires_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserMission(Base):
    __tablename__ = "user_missions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    mission_id = Column(String, ForeignKey("eco_missions.id"), nullable=False)
    status = Column(Enum(MissionStatus), default=MissionStatus.ACTIVE)
    progress = Column(Integer, default=0)
    completed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
