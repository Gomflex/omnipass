'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface SavedPromotion {
  id: string;
  type: 'plastic-surgery' | 'health-checkup' | 'wedding' | 'duty-free';
  name: string;
  nameKo: string;
  discount: string;
  description: string;
  imageUrl: string;
  href: string;
  savedAt: string;
}

export default function SavedPage() {
  const { t, locale } = useTranslation();

  // Mock saved promotions - replace with real data from backend/localStorage
  const [savedPromotions, setSavedPromotions] = useState<SavedPromotion[]>([
    {
      id: '1',
      type: 'plastic-surgery',
      name: 'BK Plastic Surgery Hospital',
      nameKo: 'BK성형외과',
      discount: '15% OFF',
      description: 'Premium facial contouring and rhinoplasty specialist',
      imageUrl: '/images/medical/bk-plastic-surgery.jpg',
      href: '/medical/facility/1',
      savedAt: new Date().toISOString()
    },
    {
      id: '2',
      type: 'health-checkup',
      name: 'Samsung Medical Center',
      nameKo: '삼성의료원',
      discount: '15% OFF',
      description: 'Comprehensive health screening packages',
      imageUrl: '/images/medical/samsung-medical.jpg',
      href: '/medical/facility/6',
      savedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      type: 'duty-free',
      name: 'Duty-Free Gold Tier',
      nameKo: '듀티프리 골드',
      discount: '₩100K Reward',
      description: 'Purchase ₩1M+ and earn ₩100,000 in gift cards',
      imageUrl: '/images/duty-free/rewards.jpg',
      href: '/duty-free',
      savedAt: new Date(Date.now() - 172800000).toISOString()
    }
  ]);

  const removeSaved = (id: string) => {
    setSavedPromotions(savedPromotions.filter(p => p.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plastic-surgery':
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20';
      case 'health-checkup':
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20';
      case 'wedding':
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20';
      case 'duty-free':
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'plastic-surgery':
        return 'Plastic Surgery';
      case 'health-checkup':
        return 'Health Checkup';
      case 'wedding':
        return 'Wedding';
      case 'duty-free':
        return 'Duty-Free';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      <div className="px-4 py-4 md:py-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-1">
            {t.saved.title}
          </h1>
          <p className="text-sm text-sm text-gray-600 dark:text-gray-400">
            {savedPromotions.length} {t.saved.savedCount} {savedPromotions.length === 1 ? t.saved.promotion : t.saved.promotions}
          </p>
        </div>

        {/* Saved Promotions List */}
        {savedPromotions.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 p-8">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                {t.saved.noSavedTitle}
              </h3>
              <p className="text-sm text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t.saved.noSavedDesc}
              </p>
              <Link
                href="/categories"
                className="inline-block px-6 py-2.5 bg-accent-600 dark:bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-700 dark:hover:bg-accent-600 transition-colors"
              >
                {t.saved.exploreCategories}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {savedPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className={`relative bg-gradient-to-br ${getTypeColor(promotion.type)} border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all`}
              >
                <Link href={promotion.href}>
                  <div className="flex gap-3 md:gap-4 p-3 md:p-4">
                    {/* Image */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                      <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl">
                        {promotion.type === 'plastic-surgery' && '💉'}
                        {promotion.type === 'health-checkup' && '🏥'}
                        {promotion.type === 'wedding' && '💒'}
                        {promotion.type === 'duty-free' && '🎁'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-8">
                      {/* Type Badge */}
                      <div className="mb-1">
                        <span className="inline-block px-2 py-0.5 bg-white/50 dark:bg-gray-900/50 rounded text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {getTypeLabel(promotion.type)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">
                        {locale === 'ko' ? promotion.nameKo : promotion.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                        {promotion.description}
                      </p>

                      {/* Discount Badge */}
                      <div className="inline-flex items-center gap-1.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs md:text-sm font-bold px-2.5 py-1 rounded-md shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{promotion.discount}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeSaved(promotion.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 rounded-lg transition-colors shadow-sm"
                  aria-label={t.saved.removeFromSaved}
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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
