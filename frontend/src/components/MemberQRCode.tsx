'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';

interface MemberQRCodeProps {
  size?: number;
  showCard?: boolean;
}

export default function MemberQRCode({ size = 200, showCard = true }: MemberQRCodeProps) {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  // Generate QR code data with user information
  const qrData = JSON.stringify({
    type: 'OMNIPASS_MEMBER',
    userId: user.id || 'GUEST',
    email: user.email,
    name: user.name,
    customerId: user.customer_id || 'N/A',
    timestamp: new Date().toISOString(),
  });

  if (!showCard) {
    return (
      <div className="flex justify-center">
        <QRCodeSVG
          value={qrData}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
          {t.qrCode?.title || 'Member QR Code'}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {t.qrCode?.subtitle || 'Show this code at partner stores'}
        </p>
      </div>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-xl mb-4 flex justify-center">
        <QRCodeSVG
          value={qrData}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>

      {/* Member Info */}
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {t.qrCode?.name || 'Name'}
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
            {user.name}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {t.qrCode?.customerId || 'Customer ID'}
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-50 font-mono">
            {user.customer_id || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {t.qrCode?.email || 'Email'}
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
            {user.email}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-gradient-to-r from-vibrant-purple-50 to-vibrant-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
        <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
          {t.qrCode?.instruction || 'Scan this QR code at checkout to earn points'}
        </p>
      </div>
    </div>
  );
}
