'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { mockPointBalance } from '@/lib/mockData';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

const DISPLAY_TIME = 5; // 5 seconds

export default function FloatingQRButton() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'barcode'>('qr');
  const [countdown, setCountdown] = useState(DISPLAY_TIME);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const customerId = user?.customer_id || 'OMP-USA-A1B2-123';
  const userName = user?.name || 'Guest';

  const handleOpenModal = () => {
    setShowModal(true);
    setCountdown(DISPLAY_TIME);

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowModal(false);
          return DISPLAY_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(timer);
  };

  const handleCloseModal = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setShowModal(false);
    setCountdown(DISPLAY_TIME);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-primary-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all transform flex items-center justify-center group"
        aria-label="Show QR Code"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></span>

        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Show My QR Code
        </span>
      </button>

      {/* Full Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white dark:bg-black z-[200] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-2xl text-white">OMNI Pass</h3>
              <p className="text-sm text-primary-50">{userName}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Countdown Timer */}
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-bold text-white">{countdown}s</span>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
            {/* Tab Selector */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveTab('qr')}
                className={`py-3 px-8 rounded-xl text-base font-medium transition-all ${
                  activeTab === 'qr'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                QR Code
              </button>
              <button
                onClick={() => setActiveTab('barcode')}
                className={`py-3 px-8 rounded-xl text-base font-medium transition-all ${
                  activeTab === 'barcode'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Barcode
              </button>
            </div>

            {/* Large Code Display */}
            <div className="bg-white dark:bg-black rounded-2xl border-4 border-gray-200 dark:border-gray-800 p-8 sm:p-12 flex items-center justify-center min-h-[280px] sm:min-h-[360px] mb-6">
              {activeTab === 'qr' ? (
                <div className="flex items-center justify-center">
                  <QRCode
                    value={customerId}
                    size={Math.min(typeof window !== 'undefined' ? window.innerWidth - 160 : 280, 280)}
                    level="H"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full overflow-x-auto">
                  <Barcode
                    value={customerId}
                    format="CODE128"
                    width={typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3}
                    height={typeof window !== 'undefined' && window.innerWidth < 640 ? 80 : 120}
                    displayValue={true}
                    fontSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : 16}
                    margin={10}
                  />
                </div>
              )}
            </div>

            {/* Customer ID */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Customer ID</p>
              <p className="font-mono text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{customerId}</p>
            </div>

            {/* Instructions */}
            <div className="text-center max-w-md space-y-3 pb-4">
              <p className="text-gray-700 dark:text-gray-300">
                Show this code to the cashier at partner stores to earn or redeem points
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Code will auto-close in {countdown} seconds for security</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
