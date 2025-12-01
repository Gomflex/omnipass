'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockPointBalance, mockTransactions, mockMissions, mockStats } from '@/lib/mockData';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';

const CHARGE_AMOUNTS = [1000, 3000, 5000, 10000, 20000, 50000];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<'all' | 'earn' | 'spend'>('all');
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  // For demo purposes, generate a customer ID if not present
  const customerId = user?.customer_id || 'OMP-USA-A1B2-123';

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
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue-50 via-white to-pastel-purple-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-gray-50">
            {t.dashboard.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.subtitle}</p>
        </div>

        {/* Points Balance Card - Vibrant Design */}
        <div className="mb-6">
            <div className="relative bg-gradient-to-br from-vibrant-purple-500 via-vibrant-purple-600 to-vibrant-blue-600 dark:from-vibrant-purple-600 dark:via-vibrant-purple-700 dark:to-vibrant-blue-700 rounded-2xl p-6 shadow-xl overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-2">{t.dashboard.pointsBalance}</p>
                    <p className="text-white text-4xl md:text-5xl font-bold mb-1">
                      {mockPointBalance.balance.toLocaleString()}
                    </p>
                    <p className="text-white/70 text-xs">
                      {t.dashboard.lastUpdated}: {new Date(mockPointBalance.last_updated).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowChargeModal(true)}
                      className="bg-white text-vibrant-purple-600 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all hover:scale-105 font-bold text-sm whitespace-nowrap shadow-lg"
                    >
                      + {t.points.chargePoints}
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-5 py-2.5 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all font-bold text-sm whitespace-nowrap">
                      {t.points.transferPoints}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-xs mb-1">{t.dashboard.totalEarned}</p>
                    <p className="text-vibrant-green-400 text-lg font-bold">+{mockStats.totalEarned.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-xs mb-1">{t.dashboard.totalSpent}</p>
                    <p className="text-white text-lg font-bold">-{mockStats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-xs mb-1">{t.dashboard.missionsDone}</p>
                    <p className="text-white text-lg font-bold">{mockStats.missionsCompleted}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3 sm:mb-0">{t.points.transactionHistory}</h2>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                      filterType === 'all'
                        ? 'bg-gradient-to-r from-vibrant-purple-500 to-vibrant-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {t.points.filter.all}
                  </button>
                  <button
                    onClick={() => setFilterType('earn')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                      filterType === 'earn'
                        ? 'bg-gradient-to-r from-vibrant-green-400 to-vibrant-green-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {t.points.filter.earned}
                  </button>
                  <button
                    onClick={() => setFilterType('spend')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                      filterType === 'spend'
                        ? 'bg-gradient-to-r from-vibrant-pink-400 to-vibrant-pink-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {t.points.filter.spent}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        transaction.type === 'earn'
                          ? 'bg-success-50 dark:bg-success-950/20'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {transaction.type === 'earn' ? (
                          <svg className="w-5 h-5 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-900 dark:text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-50 text-sm">{transaction.description}</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(transaction.created_at).toLocaleDateString()} {new Date(transaction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 capitalize">
                            {transaction.source.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      transaction.type === 'earn'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-gray-900 dark:text-gray-50'
                    }`}>
                      {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
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

          {/* Active Missions */}
          <div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">{t.dashboard.activeMissions}</h2>
              <div className="space-y-3">
                {mockMissions.map((mission) => (
                  <div key={mission.id} className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-vibrant-purple-300 dark:hover:border-vibrant-purple-700 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-gray-50 text-sm flex-1 pr-2">{mission.title}</h3>
                      <span className="bg-gradient-to-r from-warning-400 to-warning-600 text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                        +{mission.points}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{mission.description}</p>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-medium">{t.missions.progress}</span>
                        <span className="font-bold">{mission.progress}/{mission.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-vibrant-purple-500 to-vibrant-blue-500 h-2.5 transition-all rounded-full"
                          style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charge Points Modal - Vibrant Design */}
      {showChargeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowChargeModal(false)}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{t.points.chargePoints}</h2>
              <button
                onClick={() => setShowChargeModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preset Amounts */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-50 mb-3">{t.points.modal.selectAmount}</label>
              <div className="grid grid-cols-3 gap-2">
                {CHARGE_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-3 border-2 rounded-xl font-bold text-sm transition-all ${
                      selectedAmount === amount
                        ? 'border-vibrant-purple-500 bg-gradient-to-r from-vibrant-purple-500 to-vibrant-blue-500 text-white shadow-lg scale-105'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-vibrant-purple-300 dark:hover:border-vibrant-purple-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-5">
              <label htmlFor="customAmount" className="block text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">
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
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-purple-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-50 font-medium"
              />
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-vibrant-purple-50 to-vibrant-blue-50 dark:from-gray-800 dark:to-gray-800 border-2 border-vibrant-purple-200 dark:border-gray-700 rounded-xl p-4 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{t.points.modal.amountToCharge}:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-vibrant-purple-600 to-vibrant-blue-600 bg-clip-text text-transparent">
                  {(selectedAmount || parseInt(customAmount) || 0).toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowChargeModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-bold text-sm"
              >
                {t.points.modal.cancel}
              </button>
              <button
                onClick={handleCharge}
                disabled={!selectedAmount && !customAmount}
                className="flex-1 bg-gradient-to-r from-vibrant-purple-500 to-vibrant-blue-500 text-white py-3 px-4 rounded-xl hover:from-vibrant-purple-600 hover:to-vibrant-blue-600 transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
