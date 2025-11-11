# OMNIPASS API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Register
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "tourist@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe",
  "country": "United States",
  "phone": "+1-555-0123",
  "preferred_language": "en"
}
```

**Response:** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "tourist@example.com",
  "name": "John Doe",
  "country": "United States",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "tourist@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### Logout
Invalidate current session.

**Endpoint:** `POST /api/auth/logout`

**Headers:** Requires authentication

**Response:** `200 OK`
```json
{
  "message": "Successfully logged out"
}
```

---

### User Management

#### Get Current User
Retrieve authenticated user's profile.

**Endpoint:** `GET /api/users/me`

**Headers:** Requires authentication

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "tourist@example.com",
  "name": "John Doe",
  "country": "United States",
  "phone": "+1-555-0123",
  "preferred_language": "en",
  "created_at": "2025-01-15T10:30:00Z"
}
```

#### Update Profile
Update user profile information.

**Endpoint:** `PUT /api/users/me`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+1-555-9999"
}
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "tourist@example.com",
  "name": "John Smith",
  "phone": "+1-555-9999",
  "updated_at": "2025-01-15T11:00:00Z"
}
```

#### Update Language
Change preferred language.

**Endpoint:** `PUT /api/users/me/language`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "language": "ko"
}
```

**Response:** `200 OK`
```json
{
  "preferred_language": "ko",
  "message": "Language updated successfully"
}
```

---

### Points Management

#### Get Balance
Retrieve current point balance.

**Endpoint:** `GET /api/points/balance`

**Headers:** Requires authentication

**Response:** `200 OK`
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "balance": 5420,
  "last_updated": "2025-01-15T14:30:00Z"
}
```

#### Get Transactions
List transaction history with pagination.

**Endpoint:** `GET /api/points/transactions`

**Headers:** Requires authentication

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `type` (optional): Filter by type (earn, spend, charge)
- `start_date` (optional): Filter from date (ISO 8601)
- `end_date` (optional): Filter to date (ISO 8601)

**Response:** `200 OK`
```json
{
  "total": 45,
  "page": 1,
  "limit": 20,
  "transactions": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "amount": 1000,
      "type": "earn",
      "source": "purchase",
      "description": "Purchase at Lotte Duty Free",
      "created_at": "2025-01-15T14:30:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440002",
      "amount": 50,
      "type": "earn",
      "source": "mission",
      "description": "Completed: Use Public Transportation",
      "created_at": "2025-01-15T12:15:00Z"
    }
  ]
}
```

#### Charge Points
Add points using credit card.

**Endpoint:** `POST /api/points/charge`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "amount": 10000,
  "payment_method_id": "pm_1234567890",
  "currency": "KRW"
}
```

**Response:** `201 Created`
```json
{
  "transaction_id": "660e8400-e29b-41d4-a716-446655440003",
  "amount": 10000,
  "new_balance": 15420,
  "payment_status": "succeeded",
  "created_at": "2025-01-15T15:00:00Z"
}
```

#### Earn Points
Record points earned from purchase.

**Endpoint:** `POST /api/points/earn`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "store_id": "770e8400-e29b-41d4-a716-446655440000",
  "purchase_amount": 50000,
  "receipt_id": "RCP-2025-0115-001"
}
```

**Response:** `201 Created`
```json
{
  "transaction_id": "660e8400-e29b-41d4-a716-446655440004",
  "points_earned": 500,
  "new_balance": 15920,
  "store_name": "Lotte Duty Free Seoul",
  "created_at": "2025-01-15T15:30:00Z"
}
```

#### Spend Points
Use points for payment.

**Endpoint:** `POST /api/points/spend`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "amount": 2000,
  "store_id": "770e8400-e29b-41d4-a716-446655440001",
  "description": "N Seoul Tower admission"
}
```

**Response:** `201 Created`
```json
{
  "transaction_id": "660e8400-e29b-41d4-a716-446655440005",
  "amount": 2000,
  "new_balance": 13920,
  "created_at": "2025-01-15T16:00:00Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "insufficient_balance",
  "message": "Insufficient points. Current balance: 1500, Required: 2000"
}
```

---

### Store Management

#### List Stores
Get list of partner stores with optional filtering.

**Endpoint:** `GET /api/stores`

**Query Parameters:**
- `category` (optional): Filter by category (duty_free, restaurant, retail, transport, culture)
- `latitude` (optional): User latitude for distance calculation
- `longitude` (optional): User longitude for distance calculation
- `radius` (optional): Search radius in km (default: 5.0)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "total": 156,
  "page": 1,
  "limit": 20,
  "stores": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "name": "Lotte Duty Free Seoul",
      "category": "duty_free",
      "description": "Premium duty-free shopping in downtown Seoul",
      "address": "30 Eulji-ro, Jung-gu, Seoul",
      "latitude": 37.5665,
      "longitude": 126.9780,
      "point_rate": 10.0,
      "distance": 0.5,
      "opening_hours": "09:30 - 21:00",
      "contact": "+82-2-759-6500"
    }
  ]
}
```

#### Get Store Details
Retrieve detailed information about a specific store.

**Endpoint:** `GET /api/stores/{store_id}`

**Response:** `200 OK`
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "name": "Lotte Duty Free Seoul",
  "category": "duty_free",
  "description": "Premium duty-free shopping experience with international and Korean brands. Located in the heart of Seoul.",
  "address": "30 Eulji-ro, Jung-gu, Seoul",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "point_rate": 10.0,
  "images": [
    "https://example.com/images/store1.jpg",
    "https://example.com/images/store2.jpg"
  ],
  "opening_hours": "Monday-Sunday: 09:30 - 21:00",
  "contact": "+82-2-759-6500",
  "amenities": ["Tax Free", "Currency Exchange", "English Speaking Staff"],
  "rating": 4.5,
  "review_count": 1234
}
```

#### Get Nearby Stores
Find stores near a specific location.

**Endpoint:** `GET /api/stores/nearby`

**Query Parameters:**
- `latitude` (required): User latitude
- `longitude` (required): User longitude
- `radius` (optional): Search radius in km (default: 5.0)
- `category` (optional): Filter by category

**Response:** `200 OK`
```json
{
  "location": {
    "latitude": 37.5665,
    "longitude": 126.9780
  },
  "radius": 5.0,
  "stores": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "name": "Lotte Duty Free Seoul",
      "category": "duty_free",
      "distance": 0.3,
      "latitude": 37.5665,
      "longitude": 126.9780,
      "point_rate": 10.0
    }
  ]
}
```

---

### Eco-Missions

#### List Available Missions
Get list of available eco-missions.

**Endpoint:** `GET /api/missions`

**Query Parameters:**
- `type` (optional): Filter by type (daily, weekly, special)
- `active_only` (optional): Show only non-expired missions (default: true)

**Response:** `200 OK`
```json
{
  "missions": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "title": "Use Public Transportation",
      "description": "Take subway or bus 3 times today",
      "points": 50,
      "type": "daily",
      "requirements": [
        "Take 3 public transport rides"
      ],
      "expires_at": "2025-01-16T00:00:00Z",
      "status": "available"
    },
    {
      "id": "880e8400-e29b-41d4-a716-446655440001",
      "title": "Reusable Cup Challenge",
      "description": "Use your reusable cup at a cafe",
      "points": 30,
      "type": "daily",
      "requirements": [
        "Show proof of reusable cup usage"
      ],
      "expires_at": "2025-01-16T00:00:00Z",
      "status": "available"
    }
  ]
}
```

#### Get User Missions
List user's active and completed missions.

**Endpoint:** `GET /api/missions/my`

**Headers:** Requires authentication

**Query Parameters:**
- `status` (optional): Filter by status (active, completed, expired)

**Response:** `200 OK`
```json
{
  "missions": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440000",
      "mission_id": "880e8400-e29b-41d4-a716-446655440000",
      "title": "Use Public Transportation",
      "points": 50,
      "status": "active",
      "progress": 2,
      "max_progress": 3,
      "started_at": "2025-01-15T08:00:00Z",
      "expires_at": "2025-01-16T00:00:00Z"
    },
    {
      "id": "990e8400-e29b-41d4-a716-446655440001",
      "mission_id": "880e8400-e29b-41d4-a716-446655440002",
      "title": "Zero Waste Shopping",
      "points": 40,
      "status": "completed",
      "progress": 1,
      "max_progress": 1,
      "started_at": "2025-01-14T10:00:00Z",
      "completed_at": "2025-01-14T14:30:00Z"
    }
  ]
}
```

#### Start Mission
Begin a new mission.

**Endpoint:** `POST /api/missions/{mission_id}/start`

**Headers:** Requires authentication

**Response:** `201 Created`
```json
{
  "id": "990e8400-e29b-41d4-a716-446655440002",
  "mission_id": "880e8400-e29b-41d4-a716-446655440000",
  "status": "active",
  "progress": 0,
  "started_at": "2025-01-15T17:00:00Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "mission_already_started",
  "message": "You have already started this mission"
}
```

#### Complete Mission
Mark mission as complete and earn points.

**Endpoint:** `POST /api/missions/{mission_id}/complete`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "proof": "base64_encoded_image_or_receipt",
  "notes": "Took subway 3 times today"
}
```

**Response:** `200 OK`
```json
{
  "mission_id": "880e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "points_earned": 50,
  "new_balance": 14020,
  "completed_at": "2025-01-15T18:00:00Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "mission_not_complete",
  "message": "Mission requirements not met. Progress: 2/3"
}
```

#### Get Mission Progress
Check progress of a specific mission.

**Endpoint:** `GET /api/missions/{mission_id}/progress`

**Headers:** Requires authentication

**Response:** `200 OK`
```json
{
  "mission_id": "880e8400-e29b-41d4-a716-446655440000",
  "title": "Use Public Transportation",
  "status": "active",
  "progress": 2,
  "max_progress": 3,
  "percentage": 66.67,
  "started_at": "2025-01-15T08:00:00Z",
  "expires_at": "2025-01-16T00:00:00Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "validation_error",
  "message": "Invalid input data",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "not_found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "internal_error",
  "message": "An unexpected error occurred. Please try again later."
}
```

## Rate Limiting

API rate limits (to be implemented):
- **Anonymous requests**: 100 requests per 15 minutes
- **Authenticated requests**: 1000 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642262400
```

## Pagination

List endpoints support pagination with the following parameters:
- `page`: Page number (starts at 1)
- `limit`: Items per page (max: 100)

Pagination info in response:
```json
{
  "total": 250,
  "page": 2,
  "limit": 20,
  "has_next": true,
  "has_prev": true,
  "data": [...]
}
```

## Webhooks (Future)

Planned webhook events:
- `point.earned` - Points earned
- `point.spent` - Points spent
- `mission.completed` - Mission completed
- `user.registered` - New user registration
