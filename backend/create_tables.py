"""
Create database tables
"""
from app.database import engine, Base
from app.models import user, point, store, mission

print("Creating database tables...")

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")
print("Tables created:")
print("  - users")
print("  - point_balances")
print("  - point_transactions")
print("  - stores")
print("  - eco_missions")
print("  - user_missions")
