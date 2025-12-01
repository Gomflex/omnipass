'use client';

import { useTranslation } from '@/hooks/useTranslation';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

export default function NotificationsPage() {
  const { t } = useTranslation();

  // Mock notifications data - replace with real data later
  const notifications: Notification[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-yellow-50 via-white to-pastel-pink-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight mb-1 text-gray-900 dark:text-gray-50">
            {t.notifications.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.notifications.subtitle}</p>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-50 mb-1">
                {t.notifications.noNotifications}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.notifications.noNotificationsDesc}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-4 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
