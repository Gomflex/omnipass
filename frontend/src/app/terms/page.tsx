'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t.terms.title}
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">{t.terms.subtitle}</p>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-lg space-y-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl p-6">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">{t.terms.lastUpdated}: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.intro}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              {t.terms.section1Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.section1Text}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              {t.terms.section2Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t.terms.section2Text}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.terms.section2Item1}</li>
              <li>{t.terms.section2Item2}</li>
              <li>{t.terms.section2Item3}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              {t.terms.section3Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t.terms.section3Text}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.terms.section3Item1}</li>
              <li>{t.terms.section3Item2}</li>
              <li>{t.terms.section3Item3}</li>
              <li>{t.terms.section3Item4}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              {t.terms.section4Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.terms.section4Text}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.terms.section4Item1}</li>
              <li>{t.terms.section4Item2}</li>
              <li>{t.terms.section4Item3}</li>
              <li>{t.terms.section4Item4}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                5
              </div>
              {t.terms.section5Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.section5Text}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                6
              </div>
              {t.terms.section6Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.section6Text}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                7
              </div>
              {t.terms.section7Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.section7Text}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                8
              </div>
              {t.terms.section8Title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.terms.section8Text}
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {t.terms.contactTitle}
            </h2>
            <p className="text-primary-50 leading-relaxed">
              {t.terms.contactText} <strong className="text-white">legal@omnipass.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
