'use client';

import { useState, useEffect } from 'react';
import { NotificationSkeleton } from '@/components/Skeleton';

interface Notification {
  id: string;
  type: 'announcement' | 'update' | 'promotion' | 'alert';
  title: string;
  message: string;
  created_at: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
      id: '1',
      type: 'announcement',
      title: 'Welcome to OMNIPASS!',
      message: 'Thank you for joining OMNIPASS. Enjoy 15% discount at partner medical facilities and earn rewards at duty-free stores.',
      created_at: new Date().toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'promotion',
      title: 'New Partner Added: Premium Beauty Clinic',
      message: 'We have partnered with Premium Beauty Clinic in Gangnam. Book now and get an exclusive 15% discount on all procedures.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      isRead: false
    },
    {
      id: '3',
      type: 'update',
      title: 'Duty-Free Rewards Program Launch',
      message: 'Shop at participating duty-free stores and earn up to ₩100,000 in gift cards and tickets based on your purchase amount.',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      isRead: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Important: Verify Your Passport Information',
      message: 'Please ensure your passport information is up to date to avoid issues when using your benefits.',
      created_at: new Date(Date.now() - 259200000).toISOString(),
      isRead: true
    }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setIsLoading(false);
    }, 600);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return '📢';
      case 'update':
        return '🔄';
      case 'promotion':
        return '🎉';
      case 'alert':
        return '⚠️';
      default:
        return '📬';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'from-gray-100 to-gray-200 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200 dark:border-gray-800';
      case 'update':
        return 'from-gray-100 to-gray-200 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200 dark:border-gray-800';
      case 'promotion':
        return 'from-gray-100 to-gray-200 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200 dark:border-gray-800';
      case 'alert':
        return 'from-gray-100 to-gray-200 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200 dark:border-gray-800';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
            {notifications.length > 0 && unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-vibrant-purple-600 dark:text-vibrant-purple-400 hover:text-vibrant-purple-700 dark:hover:text-vibrant-purple-300 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="space-y-2">
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-3"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                No notifications yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We will notify you when there are updates, promotions, or important announcements
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
                className={`relative bg-gradient-to-br ${getNotificationColor(notification.type)} border-2 rounded-xl p-3 transition-all cursor-pointer hover:shadow-md ${
                  !notification.isRead ? 'shadow-sm' : 'opacity-75'
                }`}
              >
                {/* Unread indicator */}
                {!notification.isRead && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  {/* Icon */}
                  <div className="text-2xl md:text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm md:text-base font-bold text-gray-900 dark:text-gray-50 ${
                        !notification.isRead ? '' : 'font-semibold'
                      }`}>
                        {notification.title}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <span className="inline-block px-2 py-0.5 bg-white/50 dark:bg-gray-900/50 rounded text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {notification.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-900/50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
