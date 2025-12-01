'use client';

import { useState } from 'react';
import { mockStores } from '@/lib/mockData';
import { useTranslation } from '@/hooks/useTranslation';

export default function StoresPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    { value: 'all', label: t.stores.allStores },
    { value: 'duty_free', label: t.stores.dutyFree },
    { value: 'retail', label: t.stores.retail },
    { value: 'culture', label: t.stores.culture },
  ];

  const filteredStores = mockStores.filter((store) => {
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight mb-1">
            {t.stores.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.stores.subtitle}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                {t.stores.search}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.stores.searchPlaceholder}
                  className="w-full px-3 py-2 pl-9 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-900 dark:text-white"
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                {t.stores.category}
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-900 dark:text-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {t.stores.showing} {filteredStores.length} {filteredStores.length === 1 ? t.stores.store : t.stores.stores}
          </div>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                {/* Category Badge */}
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-900 dark:text-gray-50 text-xs font-medium capitalize">
                    {store.category.replace('_', ' ')}
                  </span>
                </div>

              <div className="p-4">
                {/* Store Name */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">{store.name}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-4 leading-relaxed">{store.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {/* Address */}
                  <div className="flex items-start text-xs">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{store.address}</span>
                  </div>

                  {/* Opening Hours */}
                  <div className="flex items-center text-xs">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{store.opening_hours}</span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center text-xs">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{store.distance} km away</span>
                  </div>
                </div>

                {/* Point Rate */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t.stores.pointRate}</span>
                    <span className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 text-xs font-medium px-2.5 py-1">
                      {store.point_rate}% {t.stores.back}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 py-2 px-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-xs">
                    {t.stores.viewDetails}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-3 text-xs font-medium text-gray-900 dark:text-white">{t.stores.noResults}</h3>
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{t.stores.noResultsDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
