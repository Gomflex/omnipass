#!/usr/bin/env bash
# Build script for Render.com

set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

# Run database migrations
python -c "from app.database import engine, Base; from app.models.user import User; Base.metadata.create_all(bind=engine)"
