"""
Claude API Chatbot Service
"""
from anthropic import Anthropic
from app.config import settings

class ClaudeChatbot:
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = "claude-3-5-sonnet-20241022"

        self.system_prompt = """
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
        Send a message to Claude and get a response

        Args:
            user_message: The user's message
            language: User's preferred language
            conversation_history: Previous messages in the conversation

        Returns:
            str: Claude's response
        """
        try:
            # Build conversation history
            messages = conversation_history or []
            messages.append({
                "role": "user",
                "content": user_message
            })

            # Call Claude API
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                system=self.system_prompt + f"\n\nRespond in {language}.",
                messages=messages
            )

            # Extract response text
            assistant_message = response.content[0].text

            return {
                "response": assistant_message,
                "conversation_history": messages + [{
                    "role": "assistant",
                    "content": assistant_message
                }]
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
chatbot = ClaudeChatbot()
