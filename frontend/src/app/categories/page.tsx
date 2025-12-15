'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  discount: string;
  href: string;
  color: string;
}

export default function CategoriesPage() {
  const { t } = useTranslation();

  const categories: Category[] = [
    {
      id: 'plastic-surgery',
      name: t.categories.plasticSurgery,
      icon: '💉',
      description: t.categories.plasticSurgeryDesc,
      discount: '15% OFF',
      href: '/medical/plastic-surgery',
      color: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700'
    },
    {
      id: 'health-checkup',
      name: t.categories.healthCheckup,
      icon: '🏥',
      description: t.categories.healthCheckupDesc,
      discount: '15% OFF',
      href: '/medical/health-checkup',
      color: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700'
    },
    {
      id: 'be-local',
      name: t.categories.beLocal || 'BE LOCAL',
      icon: '🎎',
      description: t.categories.beLocalDesc || 'Experience authentic Korean culture - Hanbok, Traditional Tea, K-Culture',
      discount: '15% OFF',
      href: '/sdm',
      color: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700'
    },
    {
      id: 'duty-free',
      name: t.categories.dutyFreeRewards,
      icon: '🎁',
      description: t.categories.dutyFreeRewardsDesc,
      discount: 'Up to ₩100K',
      href: '/duty-free',
      color: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      <div className="px-4 py-4 md:py-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-1">
            {t.categories.title}
          </h1>
          <p className="text-sm text-sm text-gray-600 dark:text-gray-400">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div className={`bg-gradient-to-br ${category.color} border-2 rounded-2xl p-4 p-4 hover:shadow-xl transition-all cursor-pointer group`}>
                {/* Discount Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl md:text-5xl">
                    {category.icon}
                  </div>
                  <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                    {category.discount}
                  </div>
                </div>

                {/* Category Info */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {category.description}
                  </p>

                  {/* View Button */}
                  <div className="flex items-center text-sm text-sm font-semibold text-gray-900 dark:text-gray-50 group-hover:gap-2 transition-all">
                    <span>{t.categories.viewPromotions}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 md:mt-8 bg-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl text-2xl flex-shrink-0">ℹ️</div>
            <div>
              <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                {t.categories.howToGetDiscounts}
              </h4>
              <p className="text-sm text-sm text-gray-700 dark:text-gray-300">
                {t.categories.howToGetDiscountsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
