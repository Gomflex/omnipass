# OMNIPASS AI Chatbot Setup Guide

OMNIPASS supports multiple AI providers for the chatbot feature. You can choose between OpenAI GPT, Anthropic Claude, or Google Gemini.

## Supported AI Providers

### 1. **Claude (Anthropic)** - Recommended for Korean Tourism

**Why Choose Claude:**
- Excellent multilingual support (especially Korean)
- Long conversation context (200K tokens)
- Safe and accurate responses
- Great for tourism information
- Competitive pricing

**Pricing:**
- Claude 3.5 Sonnet: $3 per million input tokens, $15 per million output tokens
- Claude 3 Haiku: $0.25 per million input tokens, $1.25 per million output tokens

**How to Get API Key:**
1. Visit https://console.anthropic.com/
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

**Setup:**
```bash
# In backend/.env
CHATBOT_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-api03-...
```

---

### 2. **GPT-4 (OpenAI)**

**Why Choose OpenAI:**
- Well-known and widely used
- Strong general knowledge
- Good multilingual support
- Extensive documentation

**Pricing:**
- GPT-4o-mini: $0.15 per million input tokens, $0.60 per million output tokens
- GPT-4o: $2.50 per million input tokens, $10 per million output tokens

**How to Get API Key:**
1. Visit https://platform.openai.com/
2. Sign up for an account
3. Add payment method
4. Go to API Keys section
5. Create a new API key
6. Copy the key to your `.env` file

**Setup:**
```bash
# In backend/.env
CHATBOT_PROVIDER=openai
OPENAI_API_KEY=sk-proj-...
```

---

### 3. **Gemini (Google)**

**Why Choose Gemini:**
- **FREE tier available** (60 requests per minute)
- Multimodal capabilities (text + images)
- Good multilingual support
- Easy integration

**Pricing:**
- Gemini 1.5 Flash: FREE up to 15 requests/min, then $0.075 per million input tokens
- Gemini 1.5 Pro: $1.25 per million input tokens, $5 per million output tokens

**How to Get API Key:**
1. Visit https://aistudio.google.com/
2. Sign in with Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key to your `.env` file

**Setup:**
```bash
# In backend/.env
CHATBOT_PROVIDER=gemini
GOOGLE_API_KEY=AIza...
```

---

## Configuration

### Step 1: Choose Your Provider

Edit `backend/.env` file:

```bash
# Choose one: "openai", "claude", or "gemini"
CHATBOT_PROVIDER=claude
```

### Step 2: Add API Key

Add the corresponding API key:

```bash
# For Claude
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# For OpenAI
OPENAI_API_KEY=sk-proj-xxxxx

# For Gemini
GOOGLE_API_KEY=AIzaxxxxx
```

### Step 3: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 4: Test the Chatbot

Start the backend server:
```bash
uvicorn app.main:app --reload
```

Visit the API docs:
```
http://localhost:8000/docs
```

Test the chatbot endpoint:
```
POST /api/chatbot/chat
```

---

## API Endpoints

### Chat with Bot
```http
POST /api/chatbot/chat
Content-Type: application/json

{
  "message": "How do I earn OMNI Points?",
  "language": "en",
  "conversation_history": []
}
```

**Response:**
```json
{
  "response": "You can earn OMNI Points in three ways...",
  "conversation_history": [...]
}
```

### Get Tourism Information
```http
POST /api/chatbot/tourism-info
Content-Type: application/json

{
  "query": "What are the best places to visit in Seoul?",
  "language": "ko"
}
```

### Get Points System Info
```http
GET /api/chatbot/points-info?language=en
```

### Get Help
```http
GET /api/chatbot/help?topic=missions&language=ja
```

---

## Comparison Table

| Feature | Claude | OpenAI GPT | Gemini |
|---------|--------|------------|--------|
| **Free Tier** | No | No | Yes (60 req/min) |
| **Korean Support** | Excellent | Good | Good |
| **Context Length** | 200K tokens | 128K tokens | 1M tokens |
| **Cost (per 1M tokens)** | $3-15 | $2.5-10 | $0-5 |
| **Best For** | Tourism, Korean | General use | Budget-conscious |
| **Response Quality** | Very High | Very High | High |
| **Setup Difficulty** | Easy | Easy | Easiest |

---

## Cost Estimation

### Example Usage (per month)

Assuming 10,000 users, 3 messages per user per visit:
- **Total messages**: 30,000 per month
- **Average tokens per message**: 500 input + 800 output

**Claude Costs:**
- Input: 30,000 × 500 = 15M tokens = $45
- Output: 30,000 × 800 = 24M tokens = $360
- **Total: ~$405/month**

**OpenAI (GPT-4o-mini) Costs:**
- Input: 15M tokens = $2.25
- Output: 24M tokens = $14.40
- **Total: ~$17/month**

**Gemini (Flash) Costs:**
- **Free** (if under rate limits)
- Or ~$1-3/month if paid

---

## Switching Between Providers

You can switch providers at any time by changing the `CHATBOT_PROVIDER` variable:

```bash
# Switch to Gemini
CHATBOT_PROVIDER=gemini

# Restart the server
uvicorn app.main:app --reload
```

No code changes needed! The system automatically loads the correct chatbot.

---

## Advanced: Using Local Models (Free)

For completely free operation, you can use local open-source models:

### Option 1: Ollama (Easy)

1. Install Ollama: https://ollama.ai/
2. Pull a model:
   ```bash
   ollama pull llama3.1
   ```
3. Create `chatbot_ollama.py` (custom implementation needed)
4. Update config to use local model

### Option 2: SOLAR (Korean-optimized)

1. Use Upstage's SOLAR model (Korean company)
2. Better Korean understanding than international models
3. Available via API: https://console.upstage.ai/

---

## Troubleshooting

### "API key not found" Error
- Check that you set the correct API key in `.env`
- Make sure you're using the right key for your chosen provider
- Restart the server after changing `.env`

### "Rate limit exceeded" Error
- Free tiers have rate limits
- Consider upgrading to paid tier
- Implement rate limiting on your side

### Poor Korean Responses
- Switch to Claude (best for Korean)
- Or use Korean-specific models (SOLAR, HyperCLOVA)

### High Costs
- Switch to GPT-4o-mini or Gemini Flash
- Implement response caching
- Limit conversation history length

---

## Recommendation for OMNIPASS

**For Production:**
- **Start with Gemini (Free tier)** to test
- **Switch to Claude** when you have paying users
  - Best Korean language support
  - Excellent tourism information
  - Professional quality

**For Development:**
- Use Gemini (free)
- No billing required for testing

**For Scale:**
- Monitor costs monthly
- Consider Claude for premium users
- Use Gemini Flash for basic queries

---

## Security Best Practices

1. **Never commit API keys to git**
   ```bash
   # Already in .gitignore
   .env
   ```

2. **Use environment variables**
   - Never hardcode keys in source code

3. **Rotate keys periodically**
   - Change API keys every 90 days

4. **Monitor usage**
   - Set up billing alerts
   - Track API usage in provider dashboard

5. **Implement rate limiting**
   - Prevent abuse
   - Control costs

---

## Next Steps

1. Choose your AI provider
2. Get an API key
3. Configure `.env` file
4. Test the chatbot
5. Integrate with frontend
6. Monitor costs and usage

For more information, see the [API Documentation](./API.md).
