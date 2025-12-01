'use client';

import { useState, useEffect } from 'react';
import { getTranslation, type Locale } from '@/lib/i18n';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');
  const [t, setT] = useState(getTranslation('en'));

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('locale') as Locale;
    if (saved) {
      setLocale(saved);
      setT(getTranslation(saved));
    }

    // Listen for language changes
    const handleLocaleChange = (event: CustomEvent<Locale>) => {
      setLocale(event.detail);
      setT(getTranslation(event.detail));
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);
    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []);

  return { t, locale };
}
