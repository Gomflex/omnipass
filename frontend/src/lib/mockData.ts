// Mock data for development without backend

export const mockUser = {
  id: '1',
  email: 'tourist@example.com',
  name: 'John Doe',
  country: 'United States',
  preferred_language: 'en',
  created_at: '2025-01-01T00:00:00Z',
};

export const mockPointBalance = {
  balance: 5420,
  last_updated: '2025-01-10T08:00:00Z',
};

export const mockTransactions = [
  {
    id: '1',
    amount: 1000,
    type: 'earn',
    source: 'purchase',
    description: 'Purchase at Lotte Duty Free',
    created_at: '2025-01-10T14:30:00Z',
  },
  {
    id: '2',
    amount: 50,
    type: 'earn',
    source: 'mission',
    description: 'Completed: Use Public Transportation',
    created_at: '2025-01-10T12:15:00Z',
  },
  {
    id: '3',
    amount: 300,
    type: 'spend',
    source: 'purchase',
    description: 'N Seoul Tower admission',
    created_at: '2025-01-09T16:00:00Z',
  },
  {
    id: '4',
    amount: 30,
    type: 'earn',
    source: 'mission',
    description: 'Completed: Reusable Cup Challenge',
    created_at: '2025-01-09T10:00:00Z',
  },
  {
    id: '5',
    amount: 2000,
    type: 'earn',
    source: 'card_charge',
    description: 'Card charge',
    created_at: '2025-01-08T18:00:00Z',
  },
];

export const mockMissions = [
  {
    id: '1',
    title: 'Use Public Transportation',
    description: 'Take subway or bus 3 times today',
    points: 50,
    type: 'daily',
    progress: 2,
    maxProgress: 3,
    status: 'active',
    expires_at: '2025-01-11T00:00:00Z',
  },
  {
    id: '2',
    title: 'Reusable Cup Challenge',
    description: 'Use your reusable cup at a cafe',
    points: 30,
    type: 'daily',
    progress: 0,
    maxProgress: 1,
    status: 'active',
    expires_at: '2025-01-11T00:00:00Z',
  },
  {
    id: '3',
    title: 'Visit 3 Cultural Sites',
    description: 'Explore Korean cultural heritage sites',
    points: 100,
    type: 'weekly',
    progress: 1,
    maxProgress: 3,
    status: 'active',
    expires_at: '2025-01-15T00:00:00Z',
  },
];

export const mockStores = [
  {
    id: '1',
    name: 'Lotte Duty Free Seoul',
    category: 'duty_free',
    description: 'Premium duty-free shopping in downtown Seoul',
    address: '30 Eulji-ro, Jung-gu, Seoul',
    latitude: 37.5665,
    longitude: 126.9780,
    point_rate: 10.0,
    opening_hours: '09:30 - 21:00',
    contact: '+82-2-759-6500',
    distance: 0.5,
  },
  {
    id: '2',
    name: 'Shilla Duty Free',
    category: 'duty_free',
    description: 'Luxury brands and Korean cosmetics',
    address: '249 Dongho-ro, Jung-gu, Seoul',
    latitude: 37.5547,
    longitude: 127.0015,
    point_rate: 10.0,
    opening_hours: '09:30 - 21:00',
    contact: '+82-2-2230-3000',
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Myeongdong Shopping Street',
    category: 'retail',
    description: 'Famous shopping district with cosmetics and fashion',
    address: 'Myeongdong, Jung-gu, Seoul',
    latitude: 37.5636,
    longitude: 126.9844,
    point_rate: 5.0,
    opening_hours: '10:00 - 22:00',
    contact: 'N/A',
    distance: 0.8,
  },
  {
    id: '4',
    name: 'N Seoul Tower',
    category: 'culture',
    description: 'Iconic landmark with observation deck',
    address: '105 Namsangongwon-gil, Yongsan-gu, Seoul',
    latitude: 37.5512,
    longitude: 126.9882,
    point_rate: 15.0,
    opening_hours: '10:00 - 23:00',
    contact: '+82-2-3455-9277',
    distance: 2.1,
  },
];

export const mockStats = {
  totalEarned: 12580,
  totalSpent: 7160,
  missionsCompleted: 15,
  storesVisited: 8,
};
