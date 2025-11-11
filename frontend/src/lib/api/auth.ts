import apiClient from './client';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  country: string;
  phone?: string;
  preferred_language?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  country: string;
  phone?: string;
  preferred_language: string;
  created_at: string;
}

export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<UserResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
