'use client';

import { mockPointBalance, mockTransactions, mockMissions, mockStats } from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your activity overview</p>
        </div>

        {/* Points Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">OMNI Points Balance</p>
              <p className="text-white text-5xl font-bold mt-2">
                {mockPointBalance.balance.toLocaleString()}
              </p>
              <p className="text-blue-100 text-sm mt-2">
                Last updated: {new Date(mockPointBalance.last_updated).toLocaleDateString()}
              </p>
            </div>
            <div className="hidden md:block">
              <svg className="w-32 h-32 text-blue-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-500">
            <div>
              <p className="text-blue-100 text-xs">Total Earned</p>
              <p className="text-white text-xl font-bold">{mockStats.totalEarned.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Total Spent</p>
              <p className="text-white text-xl font-bold">{mockStats.totalSpent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Missions Done</p>
              <p className="text-white text-xl font-bold">{mockStats.missionsCompleted}</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'earn' ? (
                          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Missions */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Missions</h2>
              <div className="space-y-4">
                {mockMissions.map((mission) => (
                  <div key={mission.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{mission.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {mission.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{mission.description}</p>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{mission.progress}/{mission.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
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

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">Find Stores</p>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">Do Missions</p>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">Charge Points</p>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">View History</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
