"""
Unified Chatbot Service
Supports multiple AI providers: OpenAI, Claude, Gemini
"""
from enum import Enum
from app.config import settings

class ChatbotProvider(str, Enum):
    OPENAI = "openai"
    CLAUDE = "claude"
    GEMINI = "gemini"

class ChatbotService:
    """
    Factory class to get the appropriate chatbot based on configuration
    """

    @staticmethod
    def get_chatbot():
        """
        Returns the configured chatbot instance
        """
        provider = settings.CHATBOT_PROVIDER

        if provider == ChatbotProvider.CLAUDE:
            from app.services.chatbot_claude import chatbot
            return chatbot

        elif provider == ChatbotProvider.GEMINI:
            from app.services.chatbot_gemini import chatbot
            return chatbot

        elif provider == ChatbotProvider.OPENAI:
            from app.services.chatbot_openai import chatbot
            return chatbot

        else:
            # Default to Claude
            from app.services.chatbot_claude import chatbot
            return chatbot

# Get the configured chatbot
chatbot = ChatbotService.get_chatbot()
