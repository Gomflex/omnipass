'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { mockPointBalance } from '@/lib/mockData';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.dashboard.loginRequired || 'Please login'}</p>
          <Link
            href="/login"
            className="inline-block bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-6 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            {t.nav.login}
          </Link>
        </div>
      </div>
    );
  }

  const customerId = user?.customer_id || 'OMP-USA-A1B2-123';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight mb-1">
            {t.profile.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.profile.subtitle}</p>
        </div>

        {/* Points Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.dashboard.pointsBalance || 'Points Balance'}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                {mockPointBalance.balance.toLocaleString()}
              </p>
            </div>
            <Link
              href="/points"
              className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              {t.nav.points || 'Manage Points'}
            </Link>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4">{t.profile.profileInformation}</h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.profile.name}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{user.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.profile.email}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{user.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.profile.customerId}</p>
              <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-50">{customerId}</p>
            </div>

            {user.country && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.profile.country}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{user.country}</p>
              </div>
            )}

            {user.phone && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t.profile.phone}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4">{t.profile.quickLinks}</h2>

          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.nav.dashboard}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/missions"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.nav.missions}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/stores"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.nav.stores}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/points"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.nav.points}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Settings & Logout */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4">{t.profile.settings}</h2>

          <div className="space-y-2">
            <Link
              href="/about"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.footer.aboutUs || 'About Us'}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/faq"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.footer.faq || 'FAQ'}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 border border-error-200 dark:border-error-800 hover:border-error-400 dark:hover:border-error-600 transition-colors text-error-600 dark:text-error-400"
            >
              <span className="text-sm font-medium">{t.nav.logout}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
