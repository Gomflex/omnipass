from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid
from app.database import Base

def generate_customer_id():
    """Generate customer ID in format: OMP-{COUNTRY}-{4 random chars}-{3 digit number}"""
    import random
    import string
    chars = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    nums = ''.join(random.choices(string.digits, k=3))
    return f"OMP-TEMP-{chars}-{nums}"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    phone = Column(String)
    preferred_language = Column(String, default="en")
    customer_id = Column(String, unique=True, index=True, default=generate_customer_id)
    passport_number = Column(String)
    date_of_birth = Column(String)
    nationality = Column(String)
    passport_expiry = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
