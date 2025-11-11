# OMNIPASS

**Universal Points Platform for Tourists in South Korea**

OMNIPASS is a comprehensive points management system designed for foreign tourists visiting South Korea. Earn OMNI Points at duty-free shops and partner stores, complete eco-friendly missions, and spend points on shopping, transportation, cultural events, and more.

## Features

### Core Functionality
- **Multi-source Point Earning**
  - Shopping at duty-free shops and partner stores
  - Completing daily eco-friendly missions
  - Direct credit card top-ups

- **Flexible Point Usage**
  - Shopping at partner stores
  - Public transportation (Metro, Bus)
  - Cultural event tickets
  - Entertainment and dining

- **Partner Store Discovery**
  - Interactive map showing partner locations
  - Store information and details
  - Category-based filtering
  - Distance-based search

- **Eco-Missions**
  - Daily, weekly, and special missions
  - Promote sustainable tourism
  - Earn extra points

- **AI Chatbot**
  - Customer service support
  - Tourism information
  - Multi-language support

### Multi-language Support
Supported languages:
- English
- Korean (한국어)
- Japanese (日本語)
- Chinese (中文)
- Spanish (Español)
- French (Français)

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Axios
- **Internationalization**: next-intl

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT
- **AI Integration**: OpenAI API, LangChain
- **Payment**: Stripe

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Migrations**: Alembic

## Project Structure

```
Omnipass/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities and API client
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management
│   │   ├── types/          # TypeScript type definitions
│   │   └── locales/        # i18n translations
│   ├── package.json
│   └── Dockerfile
│
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/                # Database schemas and seeds
│   ├── schema.sql          # PostgreSQL schema
│   └── seed.sql            # Sample data
│
├── docker/                  # Docker configuration
│   └── docker-compose.yml
│
└── docs/                    # Project documentation
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose (recommended)
- PostgreSQL 15+ (if running without Docker)
- Redis 7+ (if running without Docker)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   cd C:\Users\leeky\Desktop\Omnipass
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env

   # Frontend
   cp frontend/.env.example frontend/.env

   # Edit the .env files with your API keys
   ```

3. **Start all services**
   ```bash
   cd docker
   docker-compose up -d
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Manual Setup (Without Docker)

#### Backend Setup

1. **Create virtual environment**
   ```bash
   cd backend
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # Linux/Mac
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb omnipass

   # Run schema
   psql -d omnipass -f ../database/schema.sql

   # (Optional) Load sample data
   psql -d omnipass -f ../database/seed.sql
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Points
- `GET /api/points/balance` - Get point balance
- `GET /api/points/transactions` - Get transaction history
- `POST /api/points/charge` - Charge points
- `POST /api/points/earn` - Earn points
- `POST /api/points/spend` - Spend points

#### Stores
- `GET /api/stores` - List partner stores
- `GET /api/stores/{store_id}` - Get store details
- `GET /api/stores/nearby` - Find nearby stores

#### Missions
- `GET /api/missions` - List available missions
- `GET /api/missions/my` - Get user missions
- `POST /api/missions/{mission_id}/start` - Start mission
- `POST /api/missions/{mission_id}/complete` - Complete mission

## Database Schema

### Main Tables
- **users** - User accounts
- **point_balances** - Current point balances
- **point_transactions** - Transaction history
- **stores** - Partner store information
- **eco_missions** - Available missions
- **user_missions** - User mission progress
- **payment_methods** - Saved payment methods

See `database/schema.sql` for complete schema definition.

## Development

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Code Formatting

```bash
# Backend (Python)
cd backend
black .
isort .

# Frontend (TypeScript)
cd frontend
npm run lint
```

## Deployment

### Production Build

```bash
# Frontend production build
cd frontend
npm run build
npm start

# Backend with Gunicorn
cd backend
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## Configuration

### Required API Keys

1. **OpenAI API Key** - For AI chatbot functionality
   - Get key from: https://platform.openai.com/

2. **Stripe API Keys** - For payment processing
   - Get keys from: https://dashboard.stripe.com/

3. **Google Maps API Key** - For store location maps
   - Get key from: https://console.cloud.google.com/

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For questions or support, please contact the development team.

## Roadmap

### Phase 1 (Current)
- [x] Basic project structure
- [x] Database schema design
- [x] Core API endpoints
- [ ] User authentication
- [ ] Point transaction system

### Phase 2
- [ ] Store management and search
- [ ] Eco-mission system
- [ ] AI chatbot integration
- [ ] Payment integration

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Multi-currency support

---

**OMNIPASS** - Making tourism in South Korea more rewarding and sustainable!
