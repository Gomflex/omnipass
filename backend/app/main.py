from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, points, stores, chatbot, reviews, oauth
from app.database import engine, Base
from app.models.user import User  # Import all models here
from app.models.review import Review, ReviewReply, ReviewHelpful  # Import review models

app = FastAPI(
    title="OMNIPASS API",
    description="Universal Points Platform for Tourists in South Korea",
    version="1.0.0"
)

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

# CORS middleware - Allow all origins in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=False,  # Must be False when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(oauth.router, prefix="/api/oauth", tags=["OAuth Social Login"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(points.router, prefix="/api/points", tags=["Points"])
app.include_router(stores.router, prefix="/api/stores", tags=["Stores"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["Reviews"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to OMNIPASS API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
