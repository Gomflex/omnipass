'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { getTranslatedSDMPackageById } from '@/lib/sdmData';
import Image from 'next/image';
import Link from 'next/link';
import ReviewSection from '@/components/ReviewSection';

export default function SDMDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useTranslation();
  const packageId = params.id as string;

  const pkg = getTranslatedSDMPackageById(packageId, locale);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Package not found
          </h1>
          <Link
            href="/sdm"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            ← Back to SDM Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to SDM Packages
        </button>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Header Image */}
          <div className="relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <Image
              src={pkg.imageUrl}
              alt={pkg.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Discount Badge */}
            {pkg.discount > 0 && (
              <div className="absolute top-4 right-4 bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl font-bold">{pkg.discount}% OFF</span>
              </div>
            )}
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg font-bold">
                ⭐ MOST POPULAR
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Title and Price */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {pkg.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.rating}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({pkg.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                    ₩{pkg.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-1">
                    ₩{pkg.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    + {pkg.pointsEarned.toLocaleString()} Points
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* QR Code Discount Information */}
            <div className="mb-8 bg-gradient-to-r from-gray-100 to-gray-100 dark:from-gray-800/20 dark:to-gray-800/20 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border-2 border-gray-300 dark:border-gray-700">
                    <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span>🎁 OMNI Pass Member Exclusive</span>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-3">
                    <strong className="text-gray-700 dark:text-gray-400">Show your OMNI Pass QR code when booking and the discount is automatically applied!</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This special {pkg.discount}% discount is already included in the price above. Plus, earn {pkg.pointsEarned.toLocaleString()} OMNI Points for this booking!
                  </p>
                </div>
              </div>
            </div>

            {/* Package Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-100 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">{pkg.duration}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Location
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{pkg.location}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                </h3>
                <p className="text-gray-700 dark:text-gray-300 capitalize font-semibold">{pkg.category}</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                What&apos;s Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                  >
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Premium Features
              </h3>
              <div className="flex flex-wrap gap-3">
                {pkg.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="flex gap-4">
              <Link href={`/sdm/booking?packageId=${pkg.id}`} className="flex-1">
                <button className="w-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg text-lg">
                  Book This Package →
                </button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                📋 Important Information
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Booking must be made at least 2 weeks in advance</li>
                <li>• Dress fitting session can be scheduled separately</li>
                <li>• All packages include professional retouching and editing</li>
                <li>• Weather-dependent outdoor sessions will be rescheduled if necessary</li>
                <li>• Additional hours and services available upon request</li>
                <li>• Cancellation policy: Full refund if cancelled 7+ days before the session</li>
              </ul>
            </div>

            {/* Reviews Section */}
            <ReviewSection
              entityType="sdm_package"
              entityId={pkg.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
