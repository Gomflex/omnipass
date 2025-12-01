'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t.about.title}
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">{t.about.subtitle}</p>

        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 mb-8 shadow-xl shadow-primary-500/30 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">{t.about.ourMission}</h2>
          </div>
          <p className="text-primary-50 leading-relaxed mb-4">
            {t.about.missionText1}
          </p>
          <p className="text-primary-50 leading-relaxed">
            {t.about.missionText2}
          </p>
        </div>

        {/* What is OMNI Pass Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What is OMNI Pass?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center leading-relaxed">
            Your all-in-one membership for exclusive discounts on premium medical services,
            health checkups, and wedding photography packages in Korea.
            Earn points with every purchase and enjoy seamless access with QR code verification.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-vibrant-purple-50 to-vibrant-purple-100 dark:from-vibrant-purple-900/20 dark:to-vibrant-purple-800/20 rounded-xl border border-vibrant-purple-200 dark:border-vibrant-purple-800">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-vibrant-purple-500 to-vibrant-purple-600 rounded-xl mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Automatic Discounts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Save 15-25% instantly when you show your QR code at partner facilities. No coupons needed!
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-vibrant-pink-50 to-vibrant-pink-100 dark:from-vibrant-pink-900/20 dark:to-vibrant-pink-800/20 rounded-xl border border-vibrant-pink-200 dark:border-vibrant-pink-800">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-vibrant-pink-500 to-vibrant-pink-600 rounded-xl mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Earn Rewards Points</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Collect OMNI Points with every booking and redeem them for future services and exclusive perks.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-vibrant-blue-50 to-vibrant-blue-100 dark:from-vibrant-blue-900/20 dark:to-vibrant-blue-800/20 rounded-xl border border-vibrant-blue-200 dark:border-vibrant-blue-800">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-vibrant-blue-500 to-vibrant-blue-600 rounded-xl mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Premium Partners</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Access to carefully selected top-rated hospitals, clinics, and studios across Korea.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-br from-vibrant-purple-500 via-vibrant-purple-600 to-vibrant-blue-500 rounded-2xl p-8 mb-8 shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full font-bold text-2xl mb-4 border-2 border-white/40">
                1
              </div>
              <h3 className="font-bold mb-2 text-lg">Sign Up</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Create your free OMNI Pass account in minutes
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full font-bold text-2xl mb-4 border-2 border-white/40">
                2
              </div>
              <h3 className="font-bold mb-2 text-lg">Browse Services</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Explore our partner facilities and packages
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full font-bold text-2xl mb-4 border-2 border-white/40">
                3
              </div>
              <h3 className="font-bold mb-2 text-lg">Show QR Code</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Present your unique QR code at the facility
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full font-bold text-2xl mb-4 border-2 border-white/40">
                4
              </div>
              <h3 className="font-bold mb-2 text-lg">Enjoy & Earn</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Get instant discounts and earn reward points
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.about.whatWeOffer}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-6 text-white hover:shadow-xl hover:shadow-accent-500/30 transition-all transform hover:scale-105">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.about.shoppingRewards}</h3>
              <p className="text-accent-50">{t.about.shoppingRewardsDesc}</p>
            </div>
            <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-xl p-6 text-white hover:shadow-xl hover:shadow-success-500/30 transition-all transform hover:scale-105">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.about.ecoMissions}</h3>
              <p className="text-success-50">{t.about.ecoMissionsDesc}</p>
            </div>
            <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl p-6 text-white hover:shadow-xl hover:shadow-warning-500/30 transition-all transform hover:scale-105">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.about.transportation}</h3>
              <p className="text-warning-50">{t.about.transportationDesc}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white hover:shadow-xl hover:shadow-indigo-500/30 transition-all transform hover:scale-105">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.about.culturalExperiences}</h3>
              <p className="text-indigo-50">{t.about.culturalExperiencesDesc}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.about.ourValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.about.customerFirst}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.about.customerFirstDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-success-50 dark:bg-success-900/20 rounded-xl border border-success-100 dark:border-success-800">
              <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.about.sustainability}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.about.sustainabilityDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-100 dark:border-accent-800">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.about.innovation}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.about.innovationDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-warning-50 dark:bg-warning-900/20 rounded-xl border border-warning-100 dark:border-warning-800">
              <div className="w-8 h-8 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.about.partnership}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.about.partnershipDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
