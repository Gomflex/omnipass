// Medical Services Data
import { translations, type Locale } from './i18n';

export interface MedicalFacility {
  id: string;
  name: string;
  nameEn: string;
  category: 'plastic-surgery' | 'health-checkup';
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  services: string[];
  priceRange: string;
  imageUrl: string;
  specialties: string[];
  languages: string[];
  hasAirportPickup: boolean;
  hasInterpreter: boolean;
  pointsEarned: number; // Points earned per booking
}

export interface BookingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  category: 'plastic-surgery' | 'health-checkup';
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  options: {
    airportPickup: boolean;
    interpreter: boolean;
  };
  totalPrice: number;
  pointsEarned: number;
  createdAt: string;
}

// Booking Options
export const bookingOptions: BookingOption[] = [
  {
    id: 'airport-pickup',
    name: 'Airport Pickup Service',
    price: 50000,
    description: 'Professional driver will pick you up from Incheon Airport'
  },
  {
    id: 'interpreter',
    name: 'Medical Interpreter',
    price: 80000,
    description: 'Professional medical interpreter for your consultation'
  }
];

// Plastic Surgery Clinics
export const plasticSurgeryClinics: MedicalFacility[] = [
  {
    id: 'ps-1',
    name: '봉봉성형외과',
    nameEn: 'BongBong Plastic Surgery',
    category: 'plastic-surgery',
    description: 'Premium plastic surgery clinic specializing in facial contouring and rhinoplasty',
    location: 'Gangnam-gu, Seoul',
    rating: 4.9,
    reviewCount: 1250,
    services: [
      'Double Eyelid Surgery',
      'Rhinoplasty',
      'Facial Contouring',
      'Breast Augmentation',
      'Liposuction'
    ],
    priceRange: '₩2,000,000 - ₩15,000,000',
    imageUrl: '/images/hospitals/bongbong-plastic-surgery.jpg',
    specialties: ['Facial Surgery', 'Body Contouring', 'Non-surgical'],
    languages: ['English', 'Chinese', 'Japanese', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 50000
  },
  {
    id: 'ps-2',
    name: 'ID 성형외과',
    nameEn: 'ID Plastic Surgery',
    category: 'plastic-surgery',
    description: 'International medical center with experienced surgeons and state-of-the-art facilities',
    location: 'Apgujeong, Seoul',
    rating: 4.8,
    reviewCount: 980,
    services: [
      'V-Line Surgery',
      'Nose Surgery',
      'Eye Surgery',
      'Botox & Fillers',
      'Skin Treatment'
    ],
    priceRange: '₩1,500,000 - ₩12,000,000',
    imageUrl: '/images/hospitals/id-plastic-surgery.jpg',
    specialties: ['Facial Contouring', 'Anti-aging', 'Minimally Invasive'],
    languages: ['English', 'Chinese', 'Russian', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 45000
  },
  {
    id: 'ps-5',
    name: '드림성형외과',
    nameEn: 'Dream Plastic Surgery',
    category: 'plastic-surgery',
    description: 'State-of-the-art plastic surgery center with cutting-edge technology and experienced surgeons',
    location: '848 Nonhyeon-ro, Gangnam-gu, Seoul',
    rating: 4.9,
    reviewCount: 1580,
    services: [
      'Facial Contouring',
      'Rhinoplasty',
      'Double Eyelid Surgery',
      'Breast Augmentation',
      'Anti-aging Treatments',
      'Skin Care'
    ],
    priceRange: '₩2,000,000 - ₩18,000,000',
    imageUrl: '/images/hospitals/dream-plastic-surgery.jpg',
    specialties: ['Comprehensive Plastic Surgery', 'Advanced Facial Surgery', 'Body Contouring'],
    languages: ['English', 'Chinese', 'Japanese', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 55000
  },
  {
    id: 'ps-6',
    name: '더라인성형외과',
    nameEn: 'The Line Plastic Surgery',
    category: 'plastic-surgery',
    description: 'Premium aesthetic center specializing in natural-looking results with personalized care',
    location: 'Gangnam-gu, Seoul',
    rating: 4.8,
    reviewCount: 1340,
    services: [
      'Facial Contouring',
      'Rhinoplasty',
      'Double Eyelid Surgery',
      'Lip Surgery',
      'Facial Fillers',
      'Botox Treatments'
    ],
    priceRange: '₩1,800,000 - ₩16,000,000',
    imageUrl: '/images/hospitals/the-line-plastic-surgery.jpg',
    specialties: ['Natural Aesthetics', 'Facial Surgery', 'Non-surgical Procedures'],
    languages: ['English', 'Chinese', 'Japanese', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 50000
  }
];

// Health Checkup Hospitals
export const healthCheckupHospitals: MedicalFacility[] = [
  {
    id: 'hc-1',
    name: 'Seoul National University Hospital',
    nameEn: 'Seoul National University Hospital',
    category: 'health-checkup',
    description: 'Comprehensive health screening with advanced diagnostic equipment',
    location: 'Jongno-gu, Seoul',
    rating: 4.9,
    reviewCount: 2340,
    services: [
      'Basic Health Checkup',
      'Premium Health Checkup',
      'Cancer Screening',
      'Cardiac Health Check',
      'Women\'s Health Package'
    ],
    priceRange: '₩200,000 - ₩3,000,000',
    imageUrl: '/images/hospitals/snu-health-checkup.jpg',
    specialties: ['Comprehensive Screening', 'Cancer Detection', 'Preventive Care'],
    languages: ['English', 'Chinese', 'Japanese', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 30000
  },
  {
    id: 'hc-2',
    name: 'Gangnam Severance Hospital',
    nameEn: 'Gangnam Severance Hospital',
    category: 'health-checkup',
    description: 'International healthcare center with personalized health programs',
    location: 'Gangnam-gu, Seoul',
    rating: 4.8,
    reviewCount: 1890,
    services: [
      'Executive Health Checkup',
      'Brain Health Check',
      'Heart Disease Screening',
      'Diabetes Check',
      'Thyroid Check'
    ],
    priceRange: '₩300,000 - ₩5,000,000',
    imageUrl: '/images/hospitals/severance-health-checkup.jpg',
    specialties: ['Executive Programs', 'Cardiovascular', 'Neurological'],
    languages: ['English', 'Chinese', 'Russian', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 35000
  },
  {
    id: 'hc-3',
    name: 'Asan Medical Center',
    nameEn: 'Asan Medical Center',
    category: 'health-checkup',
    description: 'World-class medical facility with comprehensive screening programs',
    location: 'Songpa-gu, Seoul',
    rating: 5.0,
    reviewCount: 3120,
    services: [
      'VIP Health Checkup',
      'Full Body Scan',
      'Genetic Testing',
      'Advanced Cancer Screening',
      'Wellness Program'
    ],
    priceRange: '₩500,000 - ₩8,000,000',
    imageUrl: '/images/hospitals/asan-health-checkup.jpg',
    specialties: ['Advanced Diagnostics', 'Genetic Testing', 'Preventive Medicine'],
    languages: ['English', 'Chinese', 'Japanese', 'Arabic', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 50000
  },
  {
    id: 'hc-4',
    name: 'Samsung Medical Center',
    nameEn: 'Samsung Medical Center',
    category: 'health-checkup',
    description: 'Premium healthcare with cutting-edge technology and personalized service',
    location: 'Gangnam-gu, Seoul',
    rating: 4.9,
    reviewCount: 2560,
    services: [
      'Premium Checkup',
      'PET-CT Scan',
      'Heart & Lung Check',
      'Women\'s Premium Package',
      'Men\'s Health Package'
    ],
    priceRange: '₩400,000 - ₩6,000,000',
    imageUrl: '/images/hospitals/samsung-health-checkup.jpg',
    specialties: ['Premium Care', 'Advanced Imaging', 'Personalized Medicine'],
    languages: ['English', 'Chinese', 'Japanese', 'Korean'],
    hasAirportPickup: true,
    hasInterpreter: true,
    pointsEarned: 40000
  }
];

// Mock bookings for demo
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    facilityId: 'ps-1',
    facilityName: 'Seoul Beauty Clinic',
    category: 'plastic-surgery',
    service: 'Double Eyelid Surgery Consultation',
    date: '2025-12-15',
    time: '10:00 AM',
    status: 'confirmed',
    options: {
      airportPickup: true,
      interpreter: true
    },
    totalPrice: 130000,
    pointsEarned: 50000,
    createdAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'booking-2',
    facilityId: 'hc-1',
    facilityName: 'Seoul National University Hospital',
    category: 'health-checkup',
    service: 'Premium Health Checkup',
    date: '2025-12-10',
    time: '08:00 AM',
    status: 'confirmed',
    options: {
      airportPickup: false,
      interpreter: true
    },
    totalPrice: 1500000,
    pointsEarned: 30000,
    createdAt: '2025-11-10T14:30:00Z'
  }
];

// Get all medical facilities
export const getAllFacilities = (): MedicalFacility[] => {
  return [...plasticSurgeryClinics, ...healthCheckupHospitals];
};

// Get localized facility name
export const getFacilityName = (facility: MedicalFacility, locale: Locale = 'ko'): string => {
  return locale === 'ko' ? facility.name : facility.nameEn;
};

// Get facility by ID
export const getFacilityById = (id: string): MedicalFacility | undefined => {
  return getAllFacilities().find(facility => facility.id === id);
};

// Get facilities by category
export const getFacilitiesByCategory = (category: 'plastic-surgery' | 'health-checkup'): MedicalFacility[] => {
  return category === 'plastic-surgery' ? plasticSurgeryClinics : healthCheckupHospitals;
};

// Translation helper functions
export const translateFacilityName = (facilityId: string, locale: Locale): string => {
  const translation = translations[locale]?.medical?.facilities?.[facilityId as keyof typeof translations.en.medical.facilities];
  return translation?.name || facilityId;
};

export const translateFacilityDescription = (facilityId: string, locale: Locale): string => {
  const translation = translations[locale]?.medical?.facilities?.[facilityId as keyof typeof translations.en.medical.facilities];
  return translation?.description || '';
};

export const translateService = (serviceName: string, locale: Locale): string => {
  const translation = translations[locale]?.medical?.services?.[serviceName as keyof typeof translations.en.medical.services];
  return translation || serviceName;
};

// Get translated facilities
export const getTranslatedFacilities = (facilities: MedicalFacility[], locale: Locale): MedicalFacility[] => {
  return facilities.map(facility => ({
    ...facility,
    name: translateFacilityName(facility.id, locale),
    description: translateFacilityDescription(facility.id, locale),
    services: facility.services.map(service => translateService(service, locale)),
  }));
};

// Get translated facilities by category
export const getTranslatedFacilitiesByCategory = (
  category: 'plastic-surgery' | 'health-checkup',
  locale: Locale
): MedicalFacility[] => {
  const facilities = getFacilitiesByCategory(category);
  return getTranslatedFacilities(facilities, locale);
};

// Get translated facility by ID
export const getTranslatedFacilityById = (id: string, locale: Locale): MedicalFacility | undefined => {
  const facility = getFacilityById(id);
  if (!facility) return undefined;

  return {
    ...facility,
    name: translateFacilityName(facility.id, locale),
    description: translateFacilityDescription(facility.id, locale),
    services: facility.services.map(service => translateService(service, locale)),
  };
};
