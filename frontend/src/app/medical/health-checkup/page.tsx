'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { getTranslatedFacilitiesByCategory } from '@/lib/medicalData';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

export default function HealthCheckupPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [locale, setLocale] = useState<string>('en');

  // Get current locale from localStorage and listen for changes
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);

    const handleLocaleChange = (e: CustomEvent) => {
      setLocale(e.detail);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);
    return () => window.removeEventListener('localeChange', handleLocaleChange as EventListener);
  }, []);

  // Get translated hospitals based on current locale
  const healthCheckupHospitals = useMemo(() => {
    return getTranslatedFacilitiesByCategory('health-checkup', locale as Locale);
  }, [locale]);

  const filteredHospitals = healthCheckupHospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || hospital.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  const locations = ['all', 'Gangnam-gu', 'Jongno-gu', 'Songpa-gu'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/medical" className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
            ← {t.medical.backToMedical}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            {t.medical.healthCheckupHospitals}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {t.medical.healthCheckupSubtitle}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.medical.searchHospitals}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.medical.searchHospitalsPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.medical.location}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? t.medical.allLocations : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all">
              {/* Hospital Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                <Image
                  src={hospital.imageUrl}
                  alt={hospital.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Hospital Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{hospital.name}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-1 font-semibold text-gray-900 dark:text-white">{hospital.rating}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">({hospital.reviewCount} {t.medical.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {hospital.location}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-3 py-1 rounded-lg text-sm font-bold text-white flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    15% OFF
                  </div>
                </div>
              </div>

              {/* Hospital Body */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{hospital.description}</p>

                {/* Programs */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.medical.programs}</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.services.slice(0, 4).map((service, idx) => (
                      <span key={idx} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm">
                        {service}
                      </span>
                    ))}
                    {hospital.services.length > 4 && (
                      <span className="text-gray-600 dark:text-gray-400 px-3 py-1 text-sm font-medium">
                        +{hospital.services.length - 4} {t.medical.more}
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.medical.languages}</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.languages.map((lang, idx) => (
                      <span key={idx} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Features */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {hospital.hasAirportPickup && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.medical.airportPickup}
                    </div>
                  )}
                  {hospital.hasInterpreter && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.medical.interpreter}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.medical.priceRange} </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{hospital.priceRange}</span>
                </div>

                {/* Book Button */}
                <Link href={`/medical/booking?facilityId=${hospital.id}&category=health-checkup`}>
                  <button className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                    {t.medical.bookCheckup}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">{t.medical.noHospitalResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}
