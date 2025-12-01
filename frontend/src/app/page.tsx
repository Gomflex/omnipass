'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { plasticSurgeryClinics, healthCheckupHospitals, getFacilityName, type MedicalFacility } from '@/lib/medicalData';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const { t, locale } = useTranslation();
  const [plasticSurgeryHospitals, setPlasticSurgeryHospitals] = useState<MedicalFacility[]>(plasticSurgeryClinics.slice(0, 2));
  const [healthCheckHospitals, setHealthCheckHospitals] = useState<MedicalFacility[]>(healthCheckupHospitals.slice(0, 2));

  useEffect(() => {
    // Randomly select 2 hospitals from each category
    const shuffledPlastic = [...plasticSurgeryClinics].sort(() => 0.5 - Math.random());
    const shuffledHealth = [...healthCheckupHospitals].sort(() => 0.5 - Math.random());
    setPlasticSurgeryHospitals(shuffledPlastic.slice(0, 2));
    setHealthCheckHospitals(shuffledHealth.slice(0, 2));
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Service Icons Section */}
      <div className="bg-white dark:bg-gray-950 py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-50">
              Explore Our Services
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Discover exclusive benefits and discounts with OMNI Pass
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
            {/* Plastic Surgery */}
            <Link href="/medical/plastic-surgery">
              <div className="group bg-gradient-to-br from-vibrant-pink-50 to-vibrant-pink-100 dark:from-vibrant-pink-900/20 dark:to-vibrant-pink-800/20 hover:from-vibrant-pink-100 hover:to-vibrant-pink-200 dark:hover:from-vibrant-pink-900/30 dark:hover:to-vibrant-pink-800/30 border-2 border-vibrant-pink-200 dark:border-vibrant-pink-800 hover:border-vibrant-pink-300 dark:hover:border-vibrant-pink-700 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                <div className="text-center">
                  <h3 className="text-xs md:text-lg font-bold mb-3 md:mb-4 text-gray-900 dark:text-gray-50 mt-2 md:mt-3">Plastic Surgery</h3>
                  <div className="inline-flex items-center gap-1 bg-vibrant-pink-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold text-[10px] md:text-xs">
                    15% OFF
                  </div>
                </div>
              </div>
            </Link>

            {/* Health Checkup */}
            <Link href="/medical/health-checkup">
              <div className="group bg-gradient-to-br from-vibrant-green-50 to-vibrant-green-100 dark:from-vibrant-green-900/20 dark:to-vibrant-green-800/20 hover:from-vibrant-green-100 hover:to-vibrant-green-200 dark:hover:from-vibrant-green-900/30 dark:hover:to-vibrant-green-800/30 border-2 border-vibrant-green-200 dark:border-vibrant-green-800 hover:border-vibrant-green-300 dark:hover:border-vibrant-green-700 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                <div className="text-center">
                  <h3 className="text-xs md:text-lg font-bold mb-3 md:mb-4 text-gray-900 dark:text-gray-50 mt-2 md:mt-3">Health Checkup</h3>
                  <div className="inline-flex items-center gap-1 bg-vibrant-green-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold text-[10px] md:text-xs">
                    15% OFF
                  </div>
                </div>
              </div>
            </Link>

            {/* Wedding Packages */}
            <Link href="/sdm">
              <div className="group bg-gradient-to-br from-vibrant-purple-50 to-vibrant-purple-100 dark:from-vibrant-purple-900/20 dark:to-vibrant-purple-800/20 hover:from-vibrant-purple-100 hover:to-vibrant-purple-200 dark:hover:from-vibrant-purple-900/30 dark:hover:to-vibrant-purple-800/30 border-2 border-vibrant-purple-200 dark:border-vibrant-purple-800 hover:border-vibrant-purple-300 dark:hover:border-vibrant-purple-700 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                <div className="text-center">
                  <h3 className="text-xs md:text-lg font-bold mb-3 md:mb-4 text-gray-900 dark:text-gray-50 mt-2 md:mt-3">Wedding Packages</h3>
                  <div className="inline-flex items-center gap-1 bg-vibrant-purple-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold text-[10px] md:text-xs">
                    25% OFF
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Plastic Surgery Section */}
      <div className="bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 dark:from-gray-900 dark:via-pink-950/10 dark:to-gray-900 py-6 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">
              Plastic Surgery
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              15% Automatic Discount - Show QR code at checkout
            </p>
          </div>

          {/* Plastic Surgery Hospital Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {plasticSurgeryHospitals.map((hospital) => (
              <Link key={hospital.id} href={`/medical/facility/${hospital.id}`}>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  {/* Discount Badge */}
                  <div className="absolute z-10 mt-2 ml-2 md:mt-3 md:ml-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg shadow-lg">
                      15% Discount
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-32 md:h-48 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                    <Image
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-5">
                    <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 text-gray-900 dark:text-gray-50 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
                      {getFacilityName(hospital, locale)}
                    </h3>

                    {/* View Details Button */}
                    <div className="text-right">
                      <button className="border-2 border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 text-xs md:text-sm font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-md transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Health Checkup Center Section */}
      <div className="bg-gradient-to-b from-green-50 via-green-100 to-green-50 dark:from-gray-900 dark:via-green-950/10 dark:to-gray-900 py-6 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">
              Health Checkup Center
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              15% Automatic Discount - Show QR code at checkout
            </p>
          </div>

          {/* Health Checkup Center Hospital Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {healthCheckHospitals.map((hospital) => (
              <Link key={hospital.id} href={`/medical/facility/${hospital.id}`}>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  {/* Discount Badge */}
                  <div className="absolute z-10 mt-2 ml-2 md:mt-3 md:ml-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg shadow-lg">
                      15% Discount
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-32 md:h-48 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                    <Image
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-5">
                    <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 text-gray-900 dark:text-gray-50 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
                      {getFacilityName(hospital, locale)}
                    </h3>

                    {/* View Details Button */}
                    <div className="text-right">
                      <button className="border-2 border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 text-xs md:text-sm font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-md transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
