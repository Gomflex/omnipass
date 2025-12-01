'use client';

import Link from 'next/link';
import { plasticSurgeryClinics, healthCheckupHospitals } from '@/lib/medicalData';
import { useTranslation } from '@/hooks/useTranslation';

export default function MedicalServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            {t.medical.title}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {t.medical.subtitle}
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Plastic Surgery */}
          <Link href="/medical/plastic-surgery">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t.medical.plasticSurgery}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {t.medical.plasticSurgeryDesc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{plasticSurgeryClinics.length} {t.medical.clinicsAvailable}</span>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                  {t.medical.explore} →
                </span>
              </div>
            </div>
          </Link>

          {/* Health Checkup */}
          <Link href="/medical/health-checkup">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t.medical.healthCheckup}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {t.medical.healthCheckupDesc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{healthCheckupHospitals.length} {t.medical.hospitalsAvailable}</span>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                  {t.medical.explore} →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.medical.whyChoose}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t.medical.verifiedPartners}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.medical.verifiedPartnersDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t.medical.support247}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.medical.support247Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t.medical.easyBooking}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.medical.easyBookingDesc}</p>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-primary-900 rounded-xl p-8 shadow-lg text-white">
          <h2 className="text-xl font-bold mb-6">{t.medical.additionalServices}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t.medical.airportPickup}</h3>
                <p className="text-primary-100">{t.medical.airportPickupDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t.medical.medicalInterpreter}</h3>
                <p className="text-primary-100">{t.medical.medicalInterpreterDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
