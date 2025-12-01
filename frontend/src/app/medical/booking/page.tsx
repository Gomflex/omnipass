'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFacilityById, bookingOptions } from '@/lib/medicalData';
import { useAuthStore } from '@/store/authStore';

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();

  const facilityId = searchParams.get('facilityId');
  const category = searchParams.get('category');

  const facility = facilityId ? getFacilityById(facilityId) : null;

  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [airportPickup, setAirportPickup] = useState(false);
  const [interpreter, setInterpreter] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const airportPickupOption = bookingOptions.find(opt => opt.id === 'airport-pickup');
  const interpreterOption = bookingOptions.find(opt => opt.id === 'interpreter');

  const calculateTotal = () => {
    let total = 0;
    if (airportPickup && airportPickupOption) total += airportPickupOption.price;
    if (interpreter && interpreterOption) total += interpreterOption.price;
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create Google Calendar event URL
    if (facility && selectedDate && selectedTime && selectedService) {
      const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(`Medical Appointment: ${selectedService}`)}` +
        `&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z` +
        `&details=${encodeURIComponent(`Appointment at ${facility.name}\nService: ${selectedService}\n\n15% OMNI Pass discount will be applied when you show your QR code.\n\nLocation: ${facility.location}`)}` +
        `&location=${encodeURIComponent(facility.location)}`;

      // Open Google Calendar in new tab
      window.open(googleCalendarUrl, '_blank');
    }

    // Show success message with QR code instruction and redirect
    alert(`Booking confirmed!\n\nYou will receive a QR code to show at ${facility?.name} for 15% discount.\n\nYour appointment has been added to Google Calendar!`);

    setIsSubmitting(false);
    router.push('/medical/my-bookings');
  };

  if (!facility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Facility not found</p>
          <Link href="/medical" className="text-primary-600 dark:text-primary-400 hover:underline">
            Go back to Medical Services
          </Link>
        </div>
      </div>
    );
  }

  const colorClass = category === 'plastic-surgery' ? 'accent' : 'success';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={category === 'plastic-surgery' ? '/medical/plastic-surgery' : '/medical/health-checkup'} className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
            ← Back to {category === 'plastic-surgery' ? 'Plastic Surgery' : 'Health Checkup'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className={`bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 bg-clip-text text-transparent`}>
              Book Appointment
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Complete your booking at {facility.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
              {/* Facility Info */}
              <div className={`bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 rounded-xl p-6 text-white mb-6`}>
                <h2 className="text-2xl font-bold mb-2">{facility.name}</h2>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {facility.location}
                </div>
              </div>

              {/* Service Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Service / Program *
                </label>
                <select
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Choose a service...</option>
                  {facility.services.map((service, idx) => (
                    <option key={idx} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Time *
                </label>
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Choose a time...</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              {/* Additional Services */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Services</h3>

                {/* Airport Pickup */}
                <div className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={airportPickup}
                      onChange={(e) => setAirportPickup(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{airportPickupOption?.name}</span>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          +₩{airportPickupOption?.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{airportPickupOption?.description}</p>
                    </div>
                  </label>
                </div>

                {/* Interpreter */}
                <div className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={interpreter}
                      onChange={(e) => setInterpreter(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{interpreterOption?.name}</span>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          +₩{interpreterOption?.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{interpreterOption?.description}</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Special Requests or Questions (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={4}
                  placeholder="Any special requirements, dietary restrictions, or questions..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white py-4 px-6 rounded-xl hover:from-${colorClass}-600 hover:to-${colorClass}-700 transition-all font-semibold shadow-lg shadow-${colorClass}-500/30 hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Summary</h3>

              {/* Discount Info */}
              <div className="bg-gradient-to-r from-vibrant-green-500 to-vibrant-green-600 rounded-xl p-4 text-white mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Your Discount</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-2xl font-bold">15% OFF</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="font-medium">Show QR code at hospital to get discount</span>
                  </div>
                </div>
              </div>

              {/* Service Fees */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                {airportPickup && airportPickupOption && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{airportPickupOption.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">₩{airportPickupOption.price.toLocaleString()}</span>
                  </div>
                )}
                {interpreter && interpreterOption && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{interpreterOption.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">₩{interpreterOption.price.toLocaleString()}</span>
                  </div>
                )}
                {!airportPickup && !interpreter && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 italic">No additional services selected</div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Service Fees Total</span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">₩{calculateTotal().toLocaleString()}</span>
              </div>

              {/* Info */}
              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3">
                <p className="text-xs text-primary-700 dark:text-primary-400">
                  <strong>Note:</strong> Medical procedure costs are quoted separately by the facility and paid directly to them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
