// Studio-Dress-Makeup Package Data
import { translations, type Locale } from './i18n';

export interface SDMPackage {
  id: string;
  name: string;
  category: 'basic' | 'premium' | 'vip' | 'luxury';
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  duration: string; // e.g., "4 hours", "Full day"
  includes: string[];
  features: string[];
  location: string;
  rating: number;
  reviewCount: number;
  pointsEarned: number;
  popular?: boolean;
}

// SDM Packages
export const sdmPackages: SDMPackage[] = [
  {
    id: 'sdm-basic',
    name: 'Basic Wedding Package',
    category: 'basic',
    description: 'Perfect for couples looking for essential wedding photography services',
    price: 800000,
    originalPrice: 1000000,
    discount: 20,
    imageUrl: '/images/sdm/basic-package.jpg',
    duration: '4 hours',
    includes: [
      'Studio Photography Session (2 hours)',
      'Wedding Dress Rental (1 piece)',
      'Professional Makeup',
      '50 Edited Photos',
      'Online Photo Gallery'
    ],
    features: [
      'Professional Photographer',
      'Indoor Studio Shooting',
      'Basic Dress Selection',
      'Basic Makeup & Hair',
      'Digital Photo Delivery'
    ],
    location: 'Gangnam-gu, Seoul',
    rating: 4.7,
    reviewCount: 320,
    pointsEarned: 40000,
    popular: false
  },
  {
    id: 'sdm-premium',
    name: 'Premium Wedding Package',
    category: 'premium',
    description: 'Our most popular package with extended shooting time and more dress options',
    price: 1500000,
    originalPrice: 2000000,
    discount: 25,
    imageUrl: '/images/sdm/premium-package.jpg',
    duration: 'Full day (8 hours)',
    includes: [
      'Studio & Outdoor Photography (6 hours)',
      'Wedding Dress Rental (3 pieces)',
      'Tuxedo Rental',
      'Professional Makeup & Hair Styling (2 looks)',
      '100 Edited Photos + 20 Premium Retouched',
      'Photo Album (20 pages)',
      'Online Photo Gallery',
      'Free Dress Fitting Session'
    ],
    features: [
      'Award-Winning Photographer',
      'Indoor & Outdoor Locations',
      'Premium Dress Selection',
      'Professional Makeup Artist',
      'Hair Styling',
      'Premium Photo Album',
      'Same-day Preview'
    ],
    location: 'Gangnam-gu, Seoul',
    rating: 4.9,
    reviewCount: 580,
    pointsEarned: 75000,
    popular: true
  },
  {
    id: 'sdm-vip',
    name: 'VIP Luxury Package',
    category: 'vip',
    description: 'Exclusive luxury experience with top-tier services and unlimited options',
    price: 3000000,
    originalPrice: 4000000,
    discount: 25,
    imageUrl: '/images/sdm/vip-package.jpg',
    duration: '2 days',
    includes: [
      'Full Day Studio & Outdoor Photography (2 days)',
      'Unlimited Wedding Dress & Hanbok Rental',
      'Unlimited Tuxedo Rental',
      'Celebrity Makeup Artist (Multiple Looks)',
      '200 Edited Photos + 50 Premium Retouched',
      'Luxury Photo Album (40 pages)',
      'Video Highlights (5 minutes)',
      'Online Photo Gallery',
      'Private Fitting Room',
      'Transportation Service',
      'Drone Photography'
    ],
    features: [
      'Celebrity Photographer',
      'Multiple Premium Locations',
      'Designer Dress Collection',
      'Celebrity Makeup Artist',
      'Professional Hair Stylist',
      'Luxury Photo Album & Frame',
      'Video Editing',
      'Private VIP Service',
      'Chauffeur Service'
    ],
    location: 'Gangnam-gu, Seoul',
    rating: 5.0,
    reviewCount: 180,
    pointsEarned: 150000,
    popular: false
  },
  {
    id: 'sdm-hanbok',
    name: 'Traditional Hanbok Package',
    category: 'premium',
    description: 'Experience Korean traditional culture with beautiful hanbok photography',
    price: 600000,
    originalPrice: 800000,
    discount: 25,
    imageUrl: '/images/sdm/hanbok-package.jpg',
    duration: '3 hours',
    includes: [
      'Traditional Hanbok Photography (3 hours)',
      'Hanbok Rental (2 pieces)',
      'Traditional Makeup & Hair',
      '60 Edited Photos',
      'Traditional Korean Background',
      'Online Photo Gallery'
    ],
    features: [
      'Professional Photographer',
      'Traditional Korean Studio',
      'Authentic Hanbok Selection',
      'Traditional Makeup',
      'Traditional Hair Styling',
      'Cultural Experience'
    ],
    location: 'Bukchon Hanok Village, Seoul',
    rating: 4.8,
    reviewCount: 250,
    pointsEarned: 30000,
    popular: false
  }
];

// Get all SDM packages
export const getAllSDMPackages = (): SDMPackage[] => {
  return sdmPackages;
};

// Get SDM package by ID
export const getSDMPackageById = (id: string): SDMPackage | undefined => {
  return sdmPackages.find(pkg => pkg.id === id);
};

// Get packages by category
export const getSDMPackagesByCategory = (category: SDMPackage['category']): SDMPackage[] => {
  return sdmPackages.filter(pkg => pkg.category === category);
};

// Get popular packages
export const getPopularSDMPackages = (): SDMPackage[] => {
  return sdmPackages.filter(pkg => pkg.popular);
};

// Translation helper functions
export const translateSDMPackageName = (packageId: string, locale: Locale): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localeTranslation = translations[locale] as any;
  const translation = localeTranslation?.sdm?.packages?.[packageId];

  // Fallback to English if translation not available
  if (!translation?.name) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enTranslation = translations.en as any;
    return enTranslation?.sdm?.packages?.[packageId]?.name || packageId;
  }

  return translation.name;
};

export const translateSDMPackageDescription = (packageId: string, locale: Locale): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localeTranslation = translations[locale] as any;
  const translation = localeTranslation?.sdm?.packages?.[packageId];

  // Fallback to English if translation not available
  if (!translation?.description) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enTranslation = translations.en as any;
    return enTranslation?.sdm?.packages?.[packageId]?.description || '';
  }

  return translation.description;
};

// Get translated packages
export const getTranslatedSDMPackages = (packages: SDMPackage[], locale: Locale): SDMPackage[] => {
  return packages.map(pkg => ({
    ...pkg,
    name: translateSDMPackageName(pkg.id, locale),
    description: translateSDMPackageDescription(pkg.id, locale),
  }));
};

// Get translated package by ID
export const getTranslatedSDMPackageById = (id: string, locale: Locale): SDMPackage | undefined => {
  const pkg = getSDMPackageById(id);
  if (!pkg) return undefined;

  return {
    ...pkg,
    name: translateSDMPackageName(pkg.id, locale),
    description: translateSDMPackageDescription(pkg.id, locale),
  };
};
