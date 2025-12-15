'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import PassportScanner from '@/components/PassportScanner';
import { useTranslation } from '@/hooks/useTranslation';
import SocialLoginButtons from '@/components/SocialLoginButtons';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    country: '',
    phone: '',
    preferred_language: 'en',
    passportNumber: '',
    dateOfBirth: '',
    nationality: '',
    passportExpiryDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassportScan = (data: {
    passportNumber: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    expiryDate: string;
  }) => {
    setFormData({
      ...formData,
      passportNumber: data.passportNumber,
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      country: data.nationality, // Set country to nationality as well
      passportExpiryDate: data.expiryDate,
    });
    setShowScanner(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email) {
      setError('Email is required');
      return;
    }

    if (!formData.name) {
      setError('Name is required');
      return;
    }

    if (!formData.passportNumber) {
      setError(t.register.errorPassportRequired || 'Passport number is required');
      return;
    }

    if (!formData.dateOfBirth) {
      setError(t.register.errorDobRequired || 'Date of birth is required');
      return;
    }

    if (!formData.nationality) {
      setError('Nationality is required');
      return;
    }

    if (!formData.country) {
      // Default to nationality if country is not provided
      formData.country = formData.nationality;
    }

    if (formData.password.length < 8) {
      setError(t.register.errorPasswordLength || 'Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.register.errorPasswordMismatch || 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Register user (backend will auto-generate customer_id)
      console.log('Attempting registration with email:', formData.email);
      await authAPI.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        country: formData.country,
        phone: formData.phone || undefined,
        preferred_language: formData.preferred_language,
        passport_number: formData.passportNumber,
        date_of_birth: formData.dateOfBirth,
        nationality: formData.nationality,
        passport_expiry: formData.passportExpiryDate,
      });
      console.log('Registration successful');

      // Auto login after registration
      console.log('Attempting auto-login with email:', formData.email);
      const authResponse = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });
      console.log('Login successful, got token');

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
      console.error('Registration/Login error:', err);
      const error = err as { response?: { data?: { detail?: string }; status?: number }; message?: string };

      let errorMessage = 'Registration failed. Please try again.';

      if (error.response?.data?.detail) {
        // Show exact error from backend
        errorMessage = error.response.data.detail;
        console.error('Backend error detail:', error.response.data.detail);
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid data. Please check all required fields.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Login failed after registration. Please try logging in manually.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Showing error to user:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t.register.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.register.subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Passport Scanner Section */}
          <div className="pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.register.passportInfo}</h3>
            {showScanner ? (
              <PassportScanner onScanComplete={handlePassportScan} />
            ) : (
              <button
                type="button"
                onClick={() => setShowScanner(true)}
                className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 py-2.5 px-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t.register.scanPassport}
              </button>
            )}
          </div>

          {/* Passport Fields */}
          <div>
            <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.passportNumber} <span className="text-red-500">{t.register.required}</span>
            </label>
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              required
              value={formData.passportNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.passportNumberPlaceholder}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                {t.register.dateOfBirth} <span className="text-red-500">{t.register.required}</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="passportExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                {t.register.passportExpiry}
              </label>
              <input
                type="date"
                id="passportExpiryDate"
                name="passportExpiryDate"
                value={formData.passportExpiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.register.personalInfo}</h3>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.fullName} <span className="text-red-500">{t.register.required}</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.fullNamePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.email} <span className="text-red-500">{t.register.required}</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.emailPlaceholder}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                {t.register.nationality} <span className="text-red-500">{t.register.required}</span>
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={t.register.nationalityPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                {t.register.country}
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={t.register.countryPlaceholder}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.phonePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="preferred_language" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.preferredLanguage}
            </label>
            <select
              id="preferred_language"
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="en">{t.register.languageEnglish}</option>
              <option value="ko">{t.register.languageKorean}</option>
              <option value="ja">{t.register.languageJapanese}</option>
              <option value="zh">{t.register.languageChinese}</option>
              <option value="ru">{t.register.languageRussian}</option>
              <option value="id">{t.register.languageIndonesian}</option>
              <option value="vi">{t.register.languageVietnamese}</option>
              <option value="th">{t.register.languageThai}</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.passwordPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              {t.register.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t.register.confirmPasswordPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 py-2.5 px-4 hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {loading ? t.register.creatingAccount : t.register.createAccountButton}
          </button>
        </form>

        <SocialLoginButtons />

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {t.register.alreadyHaveAccount}{' '}
          <Link href="/login" className="text-gray-900 dark:text-gray-50 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
            {t.register.logIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
