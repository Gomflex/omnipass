from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.services.chatbot import chatbot

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"
    conversation_history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    response: str
    conversation_history: List[dict]

class TourismRequest(BaseModel):
    query: str
    language: Optional[str] = "en"

@router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest, db: Session = Depends(get_db)):
    """
    General chat with the AI assistant
    """
    try:
        result = await chatbot.chat(
            user_message=request.message,
            language=request.language,
            conversation_history=request.conversation_history
        )

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return ChatResponse(
            response=result["response"],
            conversation_history=result["conversation_history"]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tourism-info")
async def get_tourism_information(request: TourismRequest, db: Session = Depends(get_db)):
    """
    Get tourism information about South Korea
    """
    try:
        result = await chatbot.get_tourism_info(
            query=request.query,
            language=request.language
        )

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "response": result["response"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/points-info")
async def get_points_information(language: str = "en", db: Session = Depends(get_db)):
    """
    Get information about the OMNI Points system
    """
    try:
        result = await chatbot.explain_points_system(language=language)

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "response": result["response"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/help")
async def get_help(topic: Optional[str] = None, language: str = "en", db: Session = Depends(get_db)):
    """
    Get help on various topics
    """
    try:
        if topic:
            prompt = f"Help me with: {topic}"
        else:
            prompt = "What features does OMNIPASS offer?"

        result = await chatbot.chat(
            user_message=prompt,
            language=language
        )

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "response": result["response"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
