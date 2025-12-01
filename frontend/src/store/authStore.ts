import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  country: string;
  preferred_language: string;
  customer_id?: string;
  passport_number?: string;
  date_of_birth?: string;
  nationality?: string;
  passport_expiry?: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        // Store token in localStorage for API client
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        // Remove token from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
