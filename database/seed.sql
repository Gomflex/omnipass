-- OMNIPASS Seed Data
-- Sample data for development and testing

-- Insert sample stores
INSERT INTO stores (name, category, description, address, latitude, longitude, point_rate, opening_hours, contact) VALUES
('Lotte Duty Free Seoul', 'duty_free', 'Premium duty-free shopping in downtown Seoul', '30 Eulji-ro, Jung-gu, Seoul', 37.5665, 126.9780, 10.0, '09:30 - 21:00', '+82-2-759-6500'),
('Shilla Duty Free', 'duty_free', 'Luxury brands and Korean cosmetics', '249 Dongho-ro, Jung-gu, Seoul', 37.5547, 127.0015, 10.0, '09:30 - 21:00', '+82-2-2230-3000'),
('Myeongdong Shopping Street', 'retail', 'Famous shopping district with cosmetics and fashion', 'Myeongdong, Jung-gu, Seoul', 37.5636, 126.9844, 5.0, '10:00 - 22:00', 'N/A'),
('N Seoul Tower', 'culture', 'Iconic landmark with observation deck', '105 Namsangongwon-gil, Yongsan-gu, Seoul', 37.5512, 126.9882, 15.0, '10:00 - 23:00', '+82-2-3455-9277'),
('Korean Traditional Performance Hall', 'culture', 'Experience traditional Korean music and dance', '35-4 Jeongdong-gil, Jung-gu, Seoul', 37.5656, 126.9717, 20.0, '19:00 - 21:00', '+82-2-2270-1234'),
('Seoul Metro Card', 'transport', 'Recharge your T-money card with OMNI Points', 'Various locations', 37.5665, 126.9780, 1.0, '24/7', '+82-1577-1234');

-- Insert sample eco missions
INSERT INTO eco_missions (title, description, points, type, requirements, expires_at) VALUES
('Use Public Transportation', 'Take subway or bus 3 times today', 50, 'daily', ARRAY['Take 3 public transport rides'], CURRENT_DATE + INTERVAL '1 day'),
('Reusable Cup Challenge', 'Use your reusable cup at a cafe', 30, 'daily', ARRAY['Show proof of reusable cup usage'], CURRENT_DATE + INTERVAL '1 day'),
('Visit 3 Cultural Sites', 'Explore Korean cultural heritage sites', 100, 'weekly', ARRAY['Visit 3 different cultural locations', 'Take photos as proof'], CURRENT_DATE + INTERVAL '7 days'),
('Zero Waste Shopping', 'Shop without single-use plastic bags', 40, 'daily', ARRAY['Show receipt with no plastic bag purchase'], CURRENT_DATE + INTERVAL '1 day'),
('Green Tour Guide', 'Complete a eco-friendly walking tour', 150, 'special', ARRAY['Complete designated walking route', 'Visit all checkpoints'], CURRENT_DATE + INTERVAL '30 days');

-- Note: User data and transactions should not be seeded in production
-- The following are examples for development only

-- Sample user (password: testpassword123)
-- INSERT INTO users (email, hashed_password, name, country, phone, preferred_language) VALUES
-- ('tourist@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyE8H.oVfz8i', 'John Doe', 'United States', '+1-555-0123', 'en');
