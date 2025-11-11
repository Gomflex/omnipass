# OMNIPASS Architecture

## System Overview

OMNIPASS is a full-stack web application built with a modern, scalable architecture designed to handle tourist point management efficiently.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (React + TypeScript)        │  │
│  │  - Server-side Rendering (SSR)                       │  │
│  │  - Static Site Generation (SSG)                      │  │
│  │  - Client-side Rendering (CSR)                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             FastAPI Backend (Python)                 │  │
│  │  ┌──────────────┐  ┌──────────────┐                 │  │
│  │  │   Routers    │  │   Services   │                 │  │
│  │  │  - Auth      │  │  - Business  │                 │  │
│  │  │  - Points    │  │    Logic     │                 │  │
│  │  │  - Stores    │  │  - AI        │                 │  │
│  │  │  - Missions  │  │  - Payments  │                 │  │
│  │  └──────────────┘  └──────────────┘                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
┌────────────────────────────┐  ┌──────────────────┐
│      Data Layer            │  │   Cache Layer    │
│  ┌──────────────────────┐  │  │  ┌────────────┐ │
│  │   PostgreSQL 15      │  │  │  │  Redis 7   │ │
│  │  - Users             │  │  │  │  - Session │ │
│  │  - Points            │  │  │  │  - Cache   │ │
│  │  - Transactions      │  │  │  └────────────┘ │
│  │  - Stores            │  │  └──────────────────┘
│  │  - Missions          │  │
│  └──────────────────────┘  │
└────────────────────────────┘
                    │
                    │
                    ▼
┌────────────────────────────────────────┐
│         External Services              │
│  - OpenAI API (Chatbot)                │
│  - Stripe (Payments)                   │
│  - Google Maps API (Store Locations)   │
└────────────────────────────────────────┘
```

## Component Details

### Frontend (Next.js)

**Technology Stack:**
- Next.js 15 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)

**Key Features:**
- Server-side rendering for SEO optimization
- Static generation for performance
- Internationalization (i18n) support
- Responsive design
- Progressive Web App (PWA) capabilities

**Directory Structure:**
```
src/
├── app/              # Pages and layouts (App Router)
├── components/       # Reusable React components
│   ├── layout/      # Layout components
│   ├── common/      # Common UI components
│   └── features/    # Feature-specific components
├── lib/             # Utilities and configurations
│   ├── api/         # API client setup
│   └── utils/       # Helper functions
├── hooks/           # Custom React hooks
├── store/           # Zustand state stores
├── types/           # TypeScript definitions
└── locales/         # Translation files
```

### Backend (FastAPI)

**Technology Stack:**
- FastAPI (Python 3.11+)
- SQLAlchemy (ORM)
- Pydantic (Validation)
- Alembic (Migrations)

**Key Features:**
- Automatic API documentation (Swagger/OpenAPI)
- Async request handling
- JWT authentication
- CORS middleware
- Request validation
- Error handling

**Directory Structure:**
```
app/
├── models/          # Database models (SQLAlchemy)
├── schemas/         # API schemas (Pydantic)
├── routers/         # API route handlers
│   ├── auth.py     # Authentication endpoints
│   ├── users.py    # User management
│   ├── points.py   # Point transactions
│   ├── stores.py   # Store information
│   └── missions.py # Mission management
├── services/        # Business logic layer
├── utils/           # Helper functions
├── config.py        # Configuration management
├── database.py      # Database connection
└── main.py          # Application entry point
```

## Data Flow

### Point Transaction Flow

1. **User Action**
   - User makes a purchase at partner store
   - User completes an eco-mission
   - User charges points via credit card

2. **API Request**
   - Frontend sends POST request to `/api/points/earn` or `/api/points/charge`
   - Request includes authentication token and transaction details

3. **Backend Processing**
   - Validate user authentication (JWT)
   - Validate transaction data (Pydantic)
   - Create transaction record in database
   - Update point balance (via database trigger)
   - Return updated balance to client

4. **Database Operations**
   ```sql
   INSERT INTO point_transactions (user_id, amount, type, source)
   VALUES (uuid, 1000, 'earn', 'purchase');
   -- Trigger automatically updates point_balances
   ```

5. **Response**
   - Frontend receives updated balance
   - UI updates to reflect new point total
   - Transaction appears in history

### Store Discovery Flow

1. **User Opens Map**
   - Frontend requests user location (if permitted)
   - Sends GET request to `/api/stores/nearby`

2. **Backend Query**
   - Executes geospatial query in PostgreSQL
   - Filters stores by category (optional)
   - Calculates distance from user location
   - Returns sorted list of nearby stores

3. **Frontend Display**
   - Renders stores on map (Google Maps API)
   - Displays store cards with details
   - Allows filtering and sorting

## Authentication Flow

### Registration
```
User → Frontend → POST /api/auth/register → Backend
                                               ↓
                                      Validate data
                                               ↓
                                      Hash password
                                               ↓
                                      Create user record
                                               ↓
                                      Initialize point balance
                                               ↓
                                      Generate JWT token
                                               ↓
Frontend ← Response with token ← Backend
```

### Login
```
User → Frontend → POST /api/auth/login → Backend
                                            ↓
                                   Verify credentials
                                            ↓
                                   Generate JWT token
                                            ↓
                                   Store in Redis (optional)
                                            ↓
Frontend ← Response with token ← Backend
```

### Protected Routes
```
User → Frontend → API Request + JWT → Backend
                                         ↓
                                    Verify JWT
                                         ↓
                                    Extract user_id
                                         ↓
                                    Process request
                                         ↓
Frontend ← Response ← Backend
```

## Database Design

### Key Design Decisions

1. **UUID as Primary Keys**
   - Better for distributed systems
   - No sequential ID exposure
   - Improved security

2. **Point Balance Triggers**
   - Automatic balance updates
   - Maintains data consistency
   - Reduces application logic

3. **Indexes**
   - Email for fast user lookup
   - User ID for transaction queries
   - Location for geospatial searches

4. **Constraints**
   - Point balance cannot be negative
   - Transaction types are enumerated
   - Foreign keys maintain referential integrity

## Scalability Considerations

### Current Architecture
- Single server deployment
- Suitable for initial launch
- Expected load: < 10,000 users

### Future Scaling Options

1. **Horizontal Scaling**
   - Multiple backend instances
   - Load balancer (Nginx/HAProxy)
   - Session storage in Redis

2. **Database Scaling**
   - Read replicas for queries
   - Connection pooling
   - Database partitioning by date

3. **Caching Strategy**
   - Redis for session data
   - API response caching
   - CDN for static assets

4. **Microservices Migration**
   - Separate services for:
     - User management
     - Point transactions
     - Store information
     - Mission system
     - AI chatbot

## Security Measures

### Application Security
- JWT token authentication
- Password hashing (bcrypt)
- Input validation (Pydantic)
- SQL injection prevention (SQLAlchemy ORM)
- CORS configuration
- Rate limiting (future)

### Data Security
- Environment variable management
- API key protection
- HTTPS enforcement (production)
- Database connection encryption

### Payment Security
- PCI DSS compliance via Stripe
- No credit card storage
- Tokenized payments

## Monitoring and Logging

### Planned Monitoring
- Application performance monitoring (APM)
- Database query performance
- API endpoint metrics
- Error tracking (Sentry)

### Logging Strategy
- Structured logging (JSON format)
- Log levels (DEBUG, INFO, WARNING, ERROR)
- Request/response logging
- Audit trail for point transactions

## Deployment Architecture

### Development
- Docker Compose for local development
- Hot reload for both frontend and backend
- Local PostgreSQL and Redis instances

### Production (Planned)
- Cloud hosting (AWS/GCP/Azure)
- Containerized deployment (Docker)
- Managed database service
- CDN for frontend assets
- CI/CD pipeline

## Technology Choices Rationale

### Why Next.js?
- Built-in SSR and SSG
- Excellent SEO support
- File-based routing
- API routes capability
- Strong TypeScript support

### Why FastAPI?
- High performance (async)
- Automatic API documentation
- Built-in validation
- Easy to integrate AI services
- Modern Python features

### Why PostgreSQL?
- ACID compliance (critical for point transactions)
- Rich data types (UUID, ARRAY)
- Geospatial support (PostGIS ready)
- Mature and stable

### Why Redis?
- Fast session storage
- Cache frequently accessed data
- Simple key-value operations

## Future Enhancements

1. **Real-time Features**
   - WebSocket support for live updates
   - Push notifications for mission completion

2. **Advanced Analytics**
   - User behavior tracking
   - Point earning/spending patterns
   - Store popularity metrics

3. **Mobile App**
   - React Native implementation
   - Share codebase with web frontend
   - Native features (camera, GPS)

4. **AI Enhancements**
   - Personalized mission recommendations
   - Predictive analytics
   - Natural language processing for chatbot
