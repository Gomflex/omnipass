'use client';

import { useState, useEffect } from 'react';
import { locales, languages, type Locale } from '@/lib/i18n';

// Flag emojis for each language
const flags: Record<Locale, string> = {
  en: '🇺🇸',
  ko: '🇰🇷',
  ja: '🇯🇵',
  zh: '🇨🇳',
  ru: '🇷🇺',
  id: '🇮🇩',
  vi: '🇻🇳',
  th: '🇹🇭',
};

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && locales.includes(saved)) {
      setCurrentLocale(saved);
    }
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
    setIsOpen(false);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('localeChange', { detail: locale }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
      >
        <span className="text-2xl">{flags[currentLocale]}</span>
        <span className="hidden md:inline text-sm font-medium">{languages[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 border border-gray-200">
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${
                    currentLocale === locale
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{flags[locale]}</span>
                  <span className="font-medium">{languages[locale]}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
