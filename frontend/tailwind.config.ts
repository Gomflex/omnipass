import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral gray scale - primary UI colors
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#f0f0f0',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          850: '#1a1a1a',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Muted blue-gray for subtle accents
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Minimal accent color for important actions only
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Functional colors - minimal usage
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Pastel colors for section backgrounds
        pastel: {
          blue: {
            50: '#f0f7ff',
            100: '#e6f2ff',
            200: '#d9ebff',
          },
          pink: {
            50: '#fff5f7',
            100: '#ffe8f0',
            200: '#ffd6e7',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
          },
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
          },
        },
        // Vibrant colors for bold design elements
        vibrant: {
          purple: {
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          blue: {
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          pink: {
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
          },
          green: {
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
          },
        },
        // Gradient colors for hero sections
        hero: {
          from: '#6366f1',  // indigo-500
          via: '#8b5cf6',   // purple-500
          to: '#3b82f6',    // blue-500
        },
      },
      backgroundColor: {
        DEFAULT: '#fafafa',
      },
      borderRadius: {
        sm: '0.125rem',  // 2px - very subtle
        DEFAULT: '0.25rem',  // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 2px 4px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        none: 'none',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['0.9375rem', { lineHeight: '1.5rem' }],
        lg: ['1.0625rem', { lineHeight: '1.625rem' }],
        xl: ['1.1875rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.4375rem', { lineHeight: '2rem' }],
        '3xl': ['1.8125rem', { lineHeight: '2.25rem' }],
      },
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
      },
    },
  },
  plugins: [],
};

export default config;
