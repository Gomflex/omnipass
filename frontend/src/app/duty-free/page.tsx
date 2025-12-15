'use client';

import { useState } from 'react';
import Link from 'next/link';

// Purchase history interface
interface Purchase {
  id: string;
  date: string;
  store: string;
  amount: number;
  items: string;
}

// Reward tiers based on purchase amount
const REWARD_TIERS = [
  {
    minAmount: 300000,
    reward: 30000,
    badge: 'Bronze',
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    icon: '🎁'
  },
  {
    minAmount: 500000,
    reward: 50000,
    badge: 'Silver',
    color: 'from-gray-400 to-gray-500',
    bgColor: 'from-gray-100 to-gray-200',
    icon: '🎉'
  },
  {
    minAmount: 1000000,
    reward: 100000,
    badge: 'Gold',
    color: 'from-gray-600 to-gray-700',
    bgColor: 'from-gray-100 to-gray-200',
    icon: '⭐'
  }
];

// Available reward options
const REWARD_OPTIONS = [
  {
    id: 1,
    name: 'Korean Culture Gift Card',
    nameKo: '관광문화상품권',
    image: '/images/rewards/culture-card.jpg',
    description: 'Use at tourist attractions, cultural sites, and more',
    category: 'culture'
  },
  {
    id: 2,
    name: 'Olive Young Gift Card',
    nameKo: '올리브영 상품권',
    image: '/images/rewards/oliveyoung.jpg',
    description: 'Popular Korean beauty and health products',
    category: 'beauty'
  },
  {
    id: 3,
    name: 'Concert & Performance Tickets',
    nameKo: '공연티켓',
    image: '/images/rewards/concert.jpg',
    description: 'K-pop concerts, musicals, and shows',
    category: 'entertainment'
  },
  {
    id: 4,
    name: 'Cafe Gift Cards',
    nameKo: '카페 상품권',
    image: '/images/rewards/cafe.jpg',
    description: 'Popular Korean cafe chains',
    category: 'food'
  }
];

export default function DutyFreePage() {
  const [selectedTier, setSelectedTier] = useState(0);

  // Mock purchase history - replace with real data from backend
  const [purchases] = useState<Purchase[]>([
    {
      id: '1',
      date: '2025-12-03',
      store: 'Lotte Duty Free',
      amount: 450000,
      items: 'Cosmetics, Perfume'
    },
    {
      id: '2',
      date: '2025-12-02',
      store: 'Shilla Duty Free',
      amount: 280000,
      items: 'Luxury Bag'
    },
    {
      id: '3',
      date: '2025-12-01',
      store: 'Lotte Duty Free',
      amount: 120000,
      items: 'Chocolates, Snacks'
    }
  ]);

  // Calculate total accumulated amount
  const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  // Determine current tier and progress
  const getCurrentTier = () => {
    for (let i = REWARD_TIERS.length - 1; i >= 0; i--) {
      if (totalAmount >= REWARD_TIERS[i].minAmount) {
        return { tier: REWARD_TIERS[i], index: i, achieved: true };
      }
    }
    return { tier: REWARD_TIERS[0], index: 0, achieved: false };
  };

  const currentTierInfo = getCurrentTier();
  const nextTier = currentTierInfo.index < REWARD_TIERS.length - 1
    ? REWARD_TIERS[currentTierInfo.index + 1]
    : null;

  const progressPercentage = nextTier
    ? ((totalAmount - currentTierInfo.tier.minAmount) / (nextTier.minAmount - currentTierInfo.tier.minAmount)) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:bg-gray-950 pb-20">
      <div className="px-4 py-4 md:py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-3xl font-bold tracking-tight mb-3 text-gray-900 dark:text-gray-50">
            Duty-Free Rewards Program
          </h1>
          <p className="text-base text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Shop at duty-free stores and earn exclusive rewards based on your purchase amount
          </p>
        </div>

        {/* Purchase Summary & Progress */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 p-4 mb-4 md:mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-xl font-bold text-gray-900 dark:text-gray-50">
              Your Purchase Summary
            </h2>
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Accumulated</div>
              <div className="text-2xl text-2xl font-bold text-vibrant-purple-600 dark:text-vibrant-purple-400">
                ₩{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentTierInfo.achieved ? `Current: ${currentTierInfo.tier.badge} Tier` : 'Progress to Bronze'}
              </span>
              {nextTier && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Next: {nextTier.badge} (₩{nextTier.minAmount.toLocaleString()})
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${currentTierInfo.tier.color} transition-all duration-500 flex items-center justify-end pr-2`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                {progressPercentage > 15 && (
                  <span className="text-xs font-bold text-white">
                    {Math.min(Math.round(progressPercentage), 100)}%
                  </span>
                )}
              </div>
            </div>
            {nextTier && (
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
                ₩{(nextTier.minAmount - totalAmount).toLocaleString()} more to unlock {nextTier.badge} tier
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg text-xl font-bold text-gray-900 dark:text-gray-200">
                {purchases.length}
              </div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">
                Purchases
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg text-xl font-bold text-gray-900 dark:text-gray-200">
                ₩{(totalAmount / purchases.length).toLocaleString('ko-KR', {maximumFractionDigits: 0})}
              </div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">
                Avg Purchase
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg text-xl font-bold text-gray-900 dark:text-gray-200">
                {currentTierInfo.achieved ? currentTierInfo.tier.icon : '🔒'}
              </div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">
                Current Tier
              </div>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 p-4 mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-50 mb-3 md:mb-4">
            Purchase History
          </h3>
          <div className="space-y-2">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-50">
                      {purchase.store}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(purchase.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {purchase.items}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-base text-base font-bold text-vibrant-purple-600 dark:text-vibrant-purple-400">
                    ₩{purchase.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-4 p-4 mb-4 md:mb-6 text-white shadow-xl">
          <h2 className="text-xl text-xl font-bold mb-3 md:mb-4">How It Works</h2>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl text-2xl mb-1 md:mb-2">🛍️</div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">1. Shop</h3>
              <p className="text-xs md:text-sm text-white/90">Make purchases at participating duty-free stores</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl text-2xl mb-1 md:mb-2">📱</div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">2. Show Code</h3>
              <p className="text-xs md:text-sm text-white/90">Present your OMNIPASS QR code at checkout</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl text-2xl mb-1 md:mb-2">🎁</div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">3. Get Rewards</h3>
              <p className="text-xs md:text-sm text-white/90">Receive gift cards or tickets based on your purchase</p>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-8">
          <h2 className="text-2xl text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50 text-center">
            Reward Tiers
          </h2>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {REWARD_TIERS.map((tier, index) => (
              <button
                key={index}
                onClick={() => setSelectedTier(index)}
                className={`relative bg-gradient-to-br ${tier.bgColor} dark:from-gray-900 dark:to-gray-800 border-2 ${
                  selectedTier === index
                    ? 'border-vibrant-purple-500 dark:border-vibrant-purple-400 shadow-xl scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } rounded-2xl p-6 transition-all cursor-pointer`}
              >
                {/* Badge */}
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${tier.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {tier.badge}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-3">{tier.icon}</div>

                {/* Purchase Amount */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Purchase Amount</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                    ₩{tier.minAmount.toLocaleString()}+
                  </p>
                </div>

                {/* Reward Amount */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">You Receive</p>
                  <p className={`text-xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                    ₩{tier.reward.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">in gift cards or tickets</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tier Rewards */}
        {selectedTier !== null && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    Available Rewards for {REWARD_TIERS[selectedTier].badge} Tier
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Choose from ₩{REWARD_TIERS[selectedTier].reward.toLocaleString()} worth of rewards
                  </p>
                </div>
                <div className={`bg-gradient-to-r ${REWARD_TIERS[selectedTier].color} text-white px-4 py-2 rounded-lg font-bold`}>
                  {REWARD_TIERS[selectedTier].badge}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {REWARD_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    {/* Image Placeholder */}
                    <div className="bg-gradient-to-br from-vibrant-blue-100 to-vibrant-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg aspect-square mb-3 flex items-center justify-center overflow-hidden">
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {option.category === 'culture' && '🎭'}
                        {option.category === 'beauty' && '💄'}
                        {option.category === 'entertainment' && '🎵'}
                        {option.category === 'food' && '☕'}
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-50 mb-1 line-clamp-2 min-h-[2.5rem]">
                      {option.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{option.nameKo}</p>

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Participating Stores */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-50 dark:from-gray-900 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Participating Duty-Free Stores</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Lotte Duty Free', 'Shilla Duty Free', 'Shinsegae Duty Free', 'Hyundai Duty Free'].map((store, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">{store}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Ready to Start Shopping?</h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Show your OMNIPASS QR code at any participating duty-free store to start earning rewards today!
          </p>
          <Link
            href="/profile"
            className="inline-block bg-white text-vibrant-purple-600 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all hover:scale-105 font-bold shadow-lg"
          >
            View My QR Code
          </Link>
        </div>

        {/* Terms */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            * Rewards are issued based on single purchase amounts. Terms and conditions apply. Available while supplies last.
          </p>
        </div>
      </div>
    </div>
  );
}
