'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage(t.login.registrationSuccess);
    }
  }, [searchParams, t.login.registrationSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login
      const authResponse = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      // Store token first so API client can use it
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', authResponse.access_token);
      }

      // Get user data with the token
      const userData = await authAPI.getMe();

      // Store auth data in state
      setAuth(authResponse.access_token, userData);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || t.login.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue-50 via-pastel-purple-50 to-pastel-pink-50 dark:bg-gray-950 p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t.login.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.login.subtitle}</p>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-success-50 dark:bg-success-950/20 border border-success-400 dark:border-success-600 text-success-700 dark:text-success-400 rounded-md">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-error-50 dark:bg-error-950/20 border border-error-400 dark:border-error-600 text-error-700 dark:text-error-400 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
              {t.login.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-600 dark:focus:ring-accent-500 focus:border-transparent text-gray-900 dark:text-gray-50"
              placeholder={t.login.emailPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
              {t.login.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-600 dark:focus:ring-accent-500 focus:border-transparent text-gray-900 dark:text-gray-50"
              placeholder={t.login.passwordPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-600 dark:bg-accent-500 text-white py-2.5 px-4 rounded-md hover:bg-accent-700 dark:hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600 dark:focus:ring-accent-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {loading ? t.login.loggingIn : t.login.logInButton}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {t.login.noAccount}{' '}
          <Link href="/register" className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-500 font-medium">
            {t.login.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">{t.login.loading}</div>}>
      <LoginForm />
    </Suspense>
  );
}
