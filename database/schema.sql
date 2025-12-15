-- OMNIPASS Database Schema
-- PostgreSQL 14+

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),  -- Nullable for OAuth users
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    customer_id VARCHAR(50) UNIQUE,
    passport_number VARCHAR(50),
    date_of_birth VARCHAR(20),
    nationality VARCHAR(100),
    passport_expiry VARCHAR(20),
    provider VARCHAR(20) DEFAULT 'email',  -- email, google, facebook, kakao
    provider_id VARCHAR(255),  -- OAuth provider's user ID
    profile_picture TEXT,  -- Profile picture URL from OAuth
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Point balances table
CREATE TABLE IF NOT EXISTS point_balances (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER DEFAULT 0 NOT NULL CHECK (balance >= 0),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Point transactions table
CREATE TABLE IF NOT EXISTS point_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('earn', 'spend', 'charge')),
    source VARCHAR(50) NOT NULL CHECK (source IN ('purchase', 'mission', 'card_charge', 'refund')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('duty_free', 'restaurant', 'retail', 'transport', 'culture')),
    description TEXT,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    point_rate DOUBLE PRECISION DEFAULT 1.0,
    images TEXT[],
    opening_hours TEXT,
    contact VARCHAR(100)
);

-- Eco missions table
CREATE TABLE IF NOT EXISTS eco_missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    points INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('daily', 'weekly', 'special')),
    requirements TEXT[],
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User missions table
CREATE TABLE IF NOT EXISTS user_missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES eco_missions(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
    progress INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, mission_id)
);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('credit_card', 'debit_card')),
    last4 VARCHAR(4) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    expiry_month INTEGER NOT NULL,
    expiry_year INTEGER NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_point_transactions_created_at ON point_transactions(created_at DESC);
CREATE INDEX idx_stores_category ON stores(category);
CREATE INDEX idx_stores_location ON stores(latitude, longitude);
CREATE INDEX idx_user_missions_user_id ON user_missions(user_id);
CREATE INDEX idx_user_missions_status ON user_missions(status);

-- Create trigger to automatically update point balance
CREATE OR REPLACE FUNCTION update_point_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'earn' OR NEW.type = 'charge' THEN
        UPDATE point_balances
        SET balance = balance + NEW.amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE user_id = NEW.user_id;
    ELSIF NEW.type = 'spend' THEN
        UPDATE point_balances
        SET balance = balance - NEW.amount,
            last_updated = CURRENT_TIMESTAMP
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_point_balance
AFTER INSERT ON point_transactions
FOR EACH ROW
EXECUTE FUNCTION update_point_balance();

-- Create trigger to initialize point balance for new users
CREATE OR REPLACE FUNCTION init_point_balance()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO point_balances (user_id, balance)
    VALUES (NEW.id, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_init_point_balance
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION init_point_balance();

-- Reviews table - Polymorphic association pattern
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('medical_facility', 'sdm_package', 'store')),
    entity_id VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_entity UNIQUE (user_id, entity_type, entity_id)
);

-- Review replies table - For nested comments
CREATE TABLE IF NOT EXISTS review_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_reply_id UUID REFERENCES review_replies(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review helpful votes table
CREATE TABLE IF NOT EXISTS review_helpful (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_review_helpful UNIQUE (user_id, review_id)
);

-- Indexes for reviews performance
CREATE INDEX idx_reviews_entity ON reviews(entity_type, entity_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_review_replies_review_id ON review_replies(review_id);
CREATE INDEX idx_review_replies_parent ON review_replies(parent_reply_id);
CREATE INDEX idx_review_helpful_review_id ON review_helpful(review_id);

-- Trigger to update updated_at timestamp for reviews
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_review_replies_updated_at
BEFORE UPDATE ON review_replies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
