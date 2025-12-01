from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, points, stores, missions, chatbot

app = FastAPI(
    title="OMNIPASS API",
    description="Universal Points Platform for Tourists in South Korea",
    version="1.0.0"
)

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
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(points.router, prefix="/api/points", tags=["Points"])
app.include_router(stores.router, prefix="/api/stores", tags=["Stores"])
app.include_router(missions.router, prefix="/api/missions", tags=["Missions"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])

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
