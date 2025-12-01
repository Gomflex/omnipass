'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { mockPointBalance } from '@/lib/mockData';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { t } = useTranslation();
  const [showQRModal, setShowQRModal] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Generate customer ID for demo
  const customerId = user?.customer_id || 'OMP-USA-A1B2-123';

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl shadow-2xl" style={{ backgroundColor: '#171b26' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 relative">
            {/* Home */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center py-1.5 transition-colors"
            >
              <div className={`w-10 h-10 flex items-center justify-center mb-0.5 rounded-xl transition-all ${
                isActive('/') ? 'bg-[#5b6b9e]' : ''
              }`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="text-xs text-white font-bold">{t.nav.home || 'Home'}</span>
            </Link>

            {/* Stores */}
            <Link
              href="/stores"
              className="flex flex-col items-center justify-center py-1.5 transition-colors"
            >
              <div className={`w-10 h-10 flex items-center justify-center mb-0.5 rounded-xl transition-all ${
                isActive('/stores') ? 'bg-[#5b6b9e]' : ''
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs text-white font-bold">{t.nav.stores}</span>
            </Link>

            {/* QR/Barcode - Center - Emphasized Circular Button */}
            <div className="flex flex-col items-center justify-end pb-1.5 relative">
              <button
                onClick={() => setShowQRModal(true)}
                className="absolute -top-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                style={{ backgroundColor: '#cf434c' }}
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>
              <span className="text-xs text-white font-bold">{t.nav.qrCode}</span>
            </div>

            {/* Missions */}
            <Link
              href="/missions"
              className="flex flex-col items-center justify-center py-1.5 transition-colors"
            >
              <div className={`w-10 h-10 flex items-center justify-center mb-0.5 rounded-xl transition-all ${
                isActive('/missions') ? 'bg-[#5b6b9e]' : ''
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-white font-bold">{t.nav.missions}</span>
            </Link>

            {/* Login / Profile */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex flex-col items-center justify-center py-1.5 transition-colors"
              >
                <div className={`w-10 h-10 flex items-center justify-center mb-0.5 rounded-xl transition-all ${
                  isActive('/profile') ? 'bg-[#5b6b9e]' : ''
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-xs text-white font-bold">{t.nav.profile || 'Profile'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center justify-center py-1.5 transition-colors"
              >
                <div className={`w-10 h-10 flex items-center justify-center mb-0.5 rounded-xl transition-all ${
                  isActive('/login') ? 'bg-[#5b6b9e]' : ''
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className="text-xs text-white font-bold">{t.nav.login}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* QR/Barcode Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowQRModal(false)}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{t.dashboard.customerCode || 'Customer Code'}</h2>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isAuthenticated ? (
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{user?.name}</p>
                  <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-50">{customerId}</p>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-white p-4 inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-gray-900 dark:border-gray-50">
                    <svg className="w-32 h-32 text-gray-900 dark:text-gray-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2zM17 13h2v2h-2v-2zM19 15h2v2h-2v-2zM17 17h2v2h-2v-2zM19 19h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

                {/* Barcode Placeholder */}
                <div className="bg-white p-4 inline-block">
                  <div className="flex gap-0.5 justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-900 dark:bg-gray-50"
                        style={{
                          width: '4px',
                          height: '60px',
                          opacity: Math.random() > 0.3 ? 1 : 0,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-mono text-center mt-2 text-gray-900">{customerId}</p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{t.dashboard.pointsBalance || 'Points'}:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-50">{mockPointBalance.balance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t.dashboard.loginRequired || 'Please login to view your customer code'}
                </p>
                <Link
                  href="/login"
                  onClick={() => setShowQRModal(false)}
                  className="inline-block bg-accent-600 dark:bg-accent-500 text-white px-6 py-2 rounded-md hover:bg-accent-700 dark:hover:bg-accent-600 transition-colors font-medium text-sm"
                >
                  {t.nav.login}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
