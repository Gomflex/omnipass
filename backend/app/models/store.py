from sqlalchemy import Column, String, Float, Text, Enum
import uuid
import enum
from app.database import Base

class StoreCategory(str, enum.Enum):
    DUTY_FREE = "duty_free"
    RESTAURANT = "restaurant"
    RETAIL = "retail"
    TRANSPORT = "transport"
    CULTURE = "culture"

class Store(Base):
    __tablename__ = "stores"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    category = Column(Enum(StoreCategory), nullable=False)
    description = Column(String)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    point_rate = Column(Float, default=1.0)  # Points per 1000 KRW
    images = Column(Text)  # JSON string for SQLite compatibility
    opening_hours = Column(String)
    contact = Column(String)
