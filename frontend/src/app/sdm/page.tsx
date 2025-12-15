'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { getAllSDMPackages, getTranslatedSDMPackages } from '@/lib/sdmData';

export default function SDMPage() {
  const { locale } = useTranslation();
  const allPackages = getAllSDMPackages();
  const packages = getTranslatedSDMPackages(allPackages, locale);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
              BE LOCAL - Korean Culture Experience
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Experience authentic Korean culture with Hanbok photos, traditional ceremonies, and K-Culture activities
          </p>

          {/* QR Code Discount Banner */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-100 dark:from-gray-800/30 dark:to-gray-800/30 px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-lg">
            <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-50">
                🎁 Up to 25% OFF with OMNI Pass QR Code
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Show your QR code and save on all packages!
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            All Packages
          </button>
          <button
            onClick={() => setSelectedCategory('basic')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === 'basic'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setSelectedCategory('premium')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === 'premium'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            Premium
          </button>
          <button
            onClick={() => setSelectedCategory('vip')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === 'vip'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            }`}
          >
            VIP
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <Link key={pkg.id} href={`/sdm/${pkg.id}`}>
              <div className="group bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105 cursor-pointer">
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2">
                    <p className="text-white text-sm font-bold text-center">⭐ MOST POPULAR</p>
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-xl shadow-lg">
                    <span className="text-lg font-bold">{pkg.discount}% OFF</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-semibold text-gray-900 dark:text-white">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({pkg.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Duration & Location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{pkg.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ₩{pkg.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                        ₩{pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        + {pkg.pointsEarned.toLocaleString()} OMNI Points
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button className="mt-4 w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg">
                    View Details →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Beautiful Memories?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Book your package today and receive exclusive OMNI Pass member benefits including up to 25% discount and bonus points!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                Sign Up Now
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/50">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
