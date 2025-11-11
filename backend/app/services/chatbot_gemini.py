"""
Google Gemini Chatbot Service
"""
import google.generativeai as genai
from app.config import settings

class GeminiChatbot:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

        self.system_instruction = """
You are a helpful customer service assistant for OMNIPASS,
a points management platform for tourists in South Korea.

Your responsibilities:
- Answer questions about OMNI Points system
- Provide tourism information about South Korea
- Help with app navigation and features
- Recommend partner stores and cultural attractions
- Explain eco-missions

Always be friendly, helpful, and culturally sensitive.
Respond in the user's preferred language.
"""

    async def chat(self, user_message: str, language: str = "en", conversation_history: list = None):
        """
        Send a message to Gemini and get a response

        Args:
            user_message: The user's message
            language: User's preferred language
            conversation_history: Previous messages in the conversation

        Returns:
            dict: Response with message and updated history
        """
        try:
            # Start or continue chat
            if conversation_history:
                # Convert history to Gemini format
                history = []
                for msg in conversation_history:
                    history.append({
                        'role': 'user' if msg['role'] == 'user' else 'model',
                        'parts': [msg['content']]
                    })
                chat = self.model.start_chat(history=history)
            else:
                chat = self.model.start_chat(history=[])

            # Add language instruction
            prompt = f"{user_message}\n\n[Respond in {language}]"

            # Send message
            response = chat.send_message(prompt)

            return {
                "response": response.text,
                "conversation_history": conversation_history or [] + [
                    {"role": "user", "content": user_message},
                    {"role": "assistant", "content": response.text}
                ]
            }

        except Exception as e:
            return {
                "response": "I apologize, but I'm having trouble responding right now. Please try again.",
                "error": str(e)
            }

    async def get_tourism_info(self, query: str, language: str = "en"):
        """
        Get tourism information about South Korea
        """
        prompt = f"""
User query: {query}

Provide helpful tourism information about South Korea, including:
- Popular attractions
- Transportation tips
- Cultural etiquette
- Food recommendations
- Shopping locations

Response language: {language}
"""
        return await self.chat(prompt, language)

    async def explain_points_system(self, language: str = "en"):
        """
        Explain how the OMNI Points system works
        """
        prompt = f"""
Explain how the OMNI Points system works, including:
- How to earn points (purchases, missions, card charging)
- How to spend points (shopping, transport, culture)
- Partner stores
- Daily eco-missions

Response language: {language}
"""
        return await self.chat(prompt, language)


# Singleton instance
chatbot = GeminiChatbot()
