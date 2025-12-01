'use client';

import { useState } from 'react';
import { mockPointBalance, mockTransactions, mockStats } from '@/lib/mockData';
import { useTranslation } from '@/hooks/useTranslation';

const CHARGE_AMOUNTS = [1000, 3000, 5000, 10000, 20000, 50000];

export default function PointsPage() {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'earn' | 'spend'>('all');
  const [showChargeModal, setShowChargeModal] = useState(false);

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  // Handle charge
  const handleCharge = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount && amount > 0) {
      alert(`Charging ${amount} points! (This will work with backend)`);
      setShowChargeModal(false);
      setSelectedAmount(null);
      setCustomAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight mb-1">{t.points.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.points.subtitle}</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">{t.points.currentBalance}</p>
              <p className="text-gray-900 dark:text-gray-50 text-3xl md:text-4xl font-bold mb-1">
                {mockPointBalance.balance.toLocaleString()}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                {t.points.lastUpdated}: {new Date(mockPointBalance.last_updated).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowChargeModal(true)}
                className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-6 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                + {t.points.chargePoints}
              </button>
              <button className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 border border-gray-300 dark:border-gray-700 px-6 py-2 hover:border-gray-400 dark:hover:border-gray-600 transition-colors font-medium text-sm">
                {t.points.transferPoints}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 dark:text-gray-400 text-xs font-medium">{t.points.totalEarned}</h3>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">{mockStats.totalEarned.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.points.allTime}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 dark:text-gray-400 text-xs font-medium">{t.points.totalSpent}</h3>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">{mockStats.totalSpent.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.points.allTime}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 dark:text-gray-400 text-xs font-medium">{t.points.netBalance}</h3>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              {(mockStats.totalEarned - mockStats.totalSpent).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.points.lifetimeEarnings}</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">{t.points.transactionHistory}</h2>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
                  filterType === 'all'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t.points.filter.all}
              </button>
              <button
                onClick={() => setFilterType('earn')}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
                  filterType === 'earn'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t.points.filter.earned}
              </button>
              <button
                onClick={() => setFilterType('spend')}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
                  filterType === 'spend'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t.points.filter.spent}
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                    {transaction.type === 'earn' ? (
                      <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white mb-0.5">{transaction.description}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.created_at).toLocaleDateString()} {new Date(transaction.created_at).toLocaleTimeString()}
                      </p>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white capitalize">
                        {transaction.source.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {transaction.type === 'earn' ? '+' : '-'}{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 dark:text-gray-400">
              {t.points.noTransactions}
            </div>
          )}
        </div>
      </div>

      {/* Charge Points Modal */}
      {showChargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-md w-full p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.points.chargePoints}</h2>
              <button
                onClick={() => setShowChargeModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preset Amounts */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-900 dark:text-white mb-2">{t.points.modal.selectAmount}</label>
              <div className="grid grid-cols-3 gap-2">
                {CHARGE_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-2 px-3 rounded-lg border font-medium text-xs transition-colors ${
                      selectedAmount === amount
                        ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900'
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-4">
              <label htmlFor="customAmount" className="block text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                {t.points.modal.customAmount}
              </label>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder={t.points.modal.enterAmount}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-sm text-gray-900 dark:text-white"
              />
            </div>

            {/* Total */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">{t.points.modal.amountToCharge}:</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {(selectedAmount || parseInt(customAmount) || 0).toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowChargeModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
              >
                {t.points.modal.cancel}
              </button>
              <button
                onClick={handleCharge}
                disabled={!selectedAmount && !customAmount}
                className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.points.modal.chargeNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
