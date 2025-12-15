'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { plasticSurgeryClinics, healthCheckupHospitals, getFacilityName, type MedicalFacility } from '@/lib/medicalData';
import { getAllSDMPackages, getTranslatedSDMPackages, type SDMPackage } from '@/lib/sdmData';
import HeroCarousel from '@/components/HeroCarousel';
import { CardSkeleton } from '@/components/Skeleton';

export default function Home() {
  const { t, locale } = useTranslation();
  const [plasticSurgeryHospitals, setPlasticSurgeryHospitals] = useState<MedicalFacility[]>(plasticSurgeryClinics.slice(0, 2));
  const [healthCheckHospitals, setHealthCheckHospitals] = useState<MedicalFacility[]>(healthCheckupHospitals.slice(0, 2));
  const [sdmPackages, setSdmPackages] = useState<SDMPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);

    setTimeout(() => {
      // Randomly select 2 hospitals from each category
      const shuffledPlastic = [...plasticSurgeryClinics].sort(() => 0.5 - Math.random());
      const shuffledHealth = [...healthCheckupHospitals].sort(() => 0.5 - Math.random());
      setPlasticSurgeryHospitals(shuffledPlastic.slice(0, 2));
      setHealthCheckHospitals(shuffledHealth.slice(0, 2));

      // Get 2 SDM packages (prioritize popular ones)
      const allPackages = getAllSDMPackages();
      const shuffledSDM = [...allPackages].sort(() => 0.5 - Math.random());
      const translatedPackages = getTranslatedSDMPackages(shuffledSDM.slice(0, 2), locale);
      setSdmPackages(translatedPackages);

      setIsLoading(false);
    }, 800);
  }, [locale]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Duty-Free Rewards Section */}
      <div className="bg-gray-50 dark:from-gray-900 dark:to-gray-950 py-4">
        <div className="px-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1 text-gray-700 dark:text-gray-50">
              {t.home.dutyFreeRewardsTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.home.dutyFreeRewardsSubtitle}
            </p>
          </div>

          {/* Rewards Tier Cards */}
          <div className="grid grid-cols-3 gap-2">
            {/* Bronze Tier */}
            <Link href="/duty-free">
              <div className="bg-white dark:from-gray-800/30 dark:to-gray-700/30 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:shadow-xl transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎁</div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">
                    ₩30K
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    ₩300K+ Purchase
                  </div>
                </div>
              </div>
            </Link>

            {/* Silver Tier */}
            <Link href="/duty-free">
              <div className="bg-white dark:from-gray-700/30 dark:to-gray-600/30 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:shadow-xl transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎉</div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">
                    ₩50K
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    ₩500K+ Purchase
                  </div>
                </div>
              </div>
            </Link>

            {/* Gold Tier */}
            <Link href="/duty-free">
              <div className="bg-white dark:from-gray-700/30 dark:to-gray-600/30 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:shadow-xl transition-all cursor-pointer">
                <div className="text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">
                    ₩100K
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    ₩1M+ Purchase
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Plastic Surgery Section */}
      <div className="bg-gray-50 dark:from-gray-900 dark:to-gray-950 py-4">
        <div className="px-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1 text-gray-700 dark:text-gray-50">
              {t.home.plasticSurgeryTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.home.plasticSurgerySubtitle}
            </p>
          </div>

          {/* Plastic Surgery Hospital Cards */}
          <div className="grid grid-cols-2 gap-3">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              plasticSurgeryHospitals.map((hospital) => (
                <Link key={hospital.id} href={`/medical/facility/${hospital.id}`}>
                  <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    {/* Discount Badge - Arrow Down Style */}
                    <div className="absolute z-20 top-0 left-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 text-sm font-extrabold px-4 py-2 shadow-lg">
                          15%
                        </div>
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-yellow-400 dark:border-t-yellow-500"></div>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="w-full h-32 bg-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                      <Image
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2">
                      <h3 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-50 line-clamp-2 min-h-[2.5rem]">
                        {getFacilityName(hospital, locale)}
                      </h3>

                      {/* View Details Button */}
                      <div className="text-right">
                        <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold px-3 py-1 rounded-md transition-all">
                          {t.home.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Health Checkup Center Section */}
      <div className="bg-gray-50 dark:bg-gray-950 py-4">
        <div className="px-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1 text-gray-700 dark:text-gray-50">
              {t.home.healthCheckupTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.home.healthCheckupSubtitle}
            </p>
          </div>

          {/* Health Checkup Center Hospital Cards */}
          <div className="grid grid-cols-2 gap-3">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              healthCheckHospitals.map((hospital) => (
                <Link key={hospital.id} href={`/medical/facility/${hospital.id}`}>
                  <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    {/* Discount Badge - Arrow Down Style */}
                    <div className="absolute z-20 top-0 left-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 text-sm font-extrabold px-4 py-2 shadow-lg">
                          15%
                        </div>
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-yellow-400 dark:border-t-yellow-500"></div>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="w-full h-32 bg-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                      <Image
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2">
                      <h3 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-50 line-clamp-2 min-h-[2.5rem]">
                        {getFacilityName(hospital, locale)}
                      </h3>

                      {/* View Details Button */}
                      <div className="text-right">
                        <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold px-3 py-1 rounded-md transition-all">
                          {t.home.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* BE LOCAL - Korean Culture Experience Section */}
      <div className="bg-gray-50 dark:from-gray-900 dark:to-gray-950 py-4">
        <div className="px-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1 text-gray-700 dark:text-gray-50">
              BE LOCAL - Korean Culture
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Experience authentic Korean culture with Hanbok, traditional tea, and K-Culture
            </p>
          </div>

          {/* BE LOCAL Package Cards */}
          <div className="grid grid-cols-2 gap-3">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              sdmPackages.map((pkg) => (
                <Link key={pkg.id} href={`/sdm/${pkg.id}`}>
                  <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    {/* Discount Badge - Arrow Down Style */}
                    <div className="absolute z-20 top-0 left-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 text-sm font-extrabold px-4 py-2 shadow-lg">
                          {pkg.discount}%
                        </div>
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-yellow-400 dark:border-t-yellow-500"></div>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="w-full h-32 bg-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                      <Image
                        src={pkg.imageUrl}
                        alt={pkg.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2">
                      <h3 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-50 line-clamp-2 min-h-[2.5rem]">
                        {pkg.name}
                      </h3>

                      {/* View Details Button */}
                      <div className="text-right">
                        <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold px-3 py-1 rounded-md transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

    </main>
  );
}
