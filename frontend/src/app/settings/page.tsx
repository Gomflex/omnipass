'use client';

import { useTranslation } from '@/hooks/useTranslation';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-green-50 via-white to-pastel-blue-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight mb-1 text-gray-900 dark:text-gray-50">
            {t.settings.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.settings.subtitle}</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Appearance Section */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {t.settings.appearance}
              </h2>
            </div>
            <div className="p-5">
              {/* Dark Mode */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.settings.darkMode}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t.settings.darkModeDesc}</p>
                </div>
                <ThemeToggle />
              </div>

              {/* Language */}
              <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{t.settings.language}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t.settings.languageDesc}</p>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
