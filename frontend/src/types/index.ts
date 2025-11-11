// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  country: string;
  phone: string;
  preferredLanguage: string;
  createdAt: string;
}

// Points Types
export interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend' | 'charge';
  source: 'purchase' | 'mission' | 'card_charge' | 'refund';
  description: string;
  createdAt: string;
}

export interface PointBalance {
  userId: string;
  balance: number;
  lastUpdated: string;
}

// Store Types
export interface Store {
  id: string;
  name: string;
  category: 'duty_free' | 'restaurant' | 'retail' | 'transport' | 'culture';
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pointRate: number; // Points earned per 1000 KRW
  images: string[];
  openingHours: string;
  contact: string;
}

// Mission Types
export interface EcoMission {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'special';
  requirements: string[];
  expiresAt: string;
}

export interface UserMission {
  id: string;
  userId: string;
  missionId: string;
  status: 'active' | 'completed' | 'expired';
  progress: number;
  completedAt?: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'credit_card' | 'debit_card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

// Language Types
export type SupportedLanguage = 'en' | 'ko' | 'ja' | 'zh' | 'es' | 'fr';
