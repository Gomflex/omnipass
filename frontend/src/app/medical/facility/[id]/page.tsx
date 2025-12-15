'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { getTranslatedFacilityById } from '@/lib/medicalData';
import Image from 'next/image';
import Link from 'next/link';
import ReviewSection from '@/components/ReviewSection';

export default function FacilityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useTranslation();
  const facilityId = params.id as string;

  const facility = getTranslatedFacilityById(facilityId, locale);

  if (!facility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Facility not found
          </h1>
          <Link
            href="/medical"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Back to Medical Services
          </Link>
        </div>
      </div>
    );
  }

  const isPlasticSurgery = facility.category === 'plastic-surgery';

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
          {t.medical.backToMedical}
        </button>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Header Image */}
          <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <Image
              src={facility.imageUrl}
              alt={facility.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* QR Discount Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-vibrant-pink-500 to-vibrant-pink-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-bold">15% OFF with QR Code</span>
            </div>
          </div>

          <div className="p-8">
            {/* Title and Rating */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {facility.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{facility.rating}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({facility.reviewCount} {t.medical.reviews})
                    </span>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-xl text-white font-bold ${
                  isPlasticSurgery
                    ? 'bg-gradient-to-r from-vibrant-pink-500 to-vibrant-pink-600'
                    : 'bg-gradient-to-r from-vibrant-green-500 to-vibrant-green-600'
                }`}>
                  {isPlasticSurgery ? 'Plastic Surgery' : 'Health Checkup Center'}
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {facility.description}
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
                    <span>🎁 Special OMNI Pass Discount</span>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-3">
                    <strong className="text-gray-700 dark:text-gray-400">Show your OMNI Pass QR code at the hospital and receive an automatic 15% discount on all services!</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No coupon needed - simply display your QR code from the OMNI Pass app at reception.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Location */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t.medical.location}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{facility.location}</p>
              </div>

              {/* Price Range */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t.medical.priceRange}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">{facility.priceRange}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  * 15% discount applied with QR code
                </p>
              </div>

              {/* Languages */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {t.medical.languages}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {facility.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Services */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                {t.medical.servicesOffered}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facility.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Specialties
              </h3>
              <div className="flex flex-wrap gap-3">
                {facility.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.medical.additionalServices}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facility.hasAirportPickup && (
                  <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {t.medical.airportPickup}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.medical.airportPickupDesc}
                      </p>
                    </div>
                  </div>
                )}
                {facility.hasInterpreter && (
                  <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {t.medical.medicalInterpreter}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.medical.medicalInterpreterDesc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="flex gap-4">
              <Link
                href={`/medical/booking?facilityId=${facility.id}&category=${facility.category}`}
                className="flex-1"
              >
                <button className={`w-full text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg text-lg ${
                  isPlasticSurgery
                    ? 'bg-gradient-to-r from-vibrant-pink-500 to-vibrant-pink-600 hover:from-vibrant-pink-600 hover:to-vibrant-pink-700'
                    : 'bg-gradient-to-r from-vibrant-green-500 to-vibrant-green-600 hover:from-vibrant-green-600 hover:to-vibrant-green-700'
                }`}>
                  {t.medical.bookAppointment} →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection
          entityType="medical_facility"
          entityId={facility.id}
        />
      </div>
    </div>
  );
}
