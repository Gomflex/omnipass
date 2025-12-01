'use client';

import Link from 'next/link';
import { mockBookings } from '@/lib/medicalData';
import { QRCodeSVG } from 'qrcode.react';

export default function MyBookingsPage() {
  const handleAddToCalendar = (booking: typeof mockBookings[0]) => {
    const startDateTime = new Date(`${booking.date}T${booking.time.replace(/\s*(AM|PM)/, (match, period) => {
      const hour = parseInt(booking.time);
      if (period === 'PM' && hour !== 12) return `:00`;
      if (period === 'AM' && hour === 12) return `:00`;
      return `:00`;
    })}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(`Medical Appointment: ${booking.service}`)}` +
      `&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z` +
      `&details=${encodeURIComponent(`Appointment at ${booking.facilityName}\nService: ${booking.service}\n\n15% OMNI Pass discount available - Show your QR code!\n\nBooking ID: ${booking.id}`)}` +
      `&location=${encodeURIComponent(booking.facilityName)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 border-success-200 dark:border-success-800';
      case 'pending':
        return 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-800';
      case 'completed':
        return 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-800';
      case 'cancelled':
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    return category === 'plastic-surgery' ? 'accent' : 'success';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/medical" className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
            ← Back to Medical Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              My Bookings
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            View and manage your medical appointments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-100">Total Bookings</span>
              <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-4xl font-bold">{mockBookings.length}</p>
          </div>

          <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-success-100">Confirmed</span>
              <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold">{mockBookings.filter(b => b.status === 'confirmed').length}</p>
          </div>

          <div className="bg-gradient-to-br from-vibrant-green-500 to-vibrant-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90">Active Discount</span>
              <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-4xl font-bold">15% OFF</p>
            <p className="text-xs text-white/80 mt-1">All bookings</p>
          </div>
        </div>

        {/* Bookings List */}
        {mockBookings.length > 0 ? (
          <div className="space-y-4">
            {mockBookings.map((booking) => {
              const colorClass = getCategoryColor(booking.category);
              return (
                <div key={booking.id} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className={`bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          {booking.category === 'plastic-surgery' ? (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="text-white">
                          <h3 className="text-xl font-bold">{booking.facilityName}</h3>
                          <p className="text-sm opacity-90">{booking.service}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full border ${getStatusColor(booking.status)}`}>
                        <span className="capitalize font-medium text-sm">{booking.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Date & Time */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Appointment</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-semibold text-gray-900 dark:text-white">{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-gray-900 dark:text-white">{booking.time}</span>
                        </div>
                      </div>

                      {/* Additional Services */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Services</h4>
                        <div className="space-y-1">
                          {booking.options.airportPickup && (
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 dark:text-gray-300">Airport Pickup</span>
                            </div>
                          )}
                          {booking.options.interpreter && (
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 dark:text-gray-300">Interpreter</span>
                            </div>
                          )}
                          {!booking.options.airportPickup && !booking.options.interpreter && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 italic">No additional services</span>
                          )}
                        </div>
                      </div>

                      {/* Discount & QR Code */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your Discount</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-vibrant-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="font-bold text-vibrant-green-600">15% OFF</span>
                          </div>
                          {booking.status === 'confirmed' && (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border-2 border-vibrant-green-500 inline-block">
                              <QRCodeSVG
                                value={`OMNIPASS-${booking.id}-${booking.facilityId}`}
                                size={80}
                                level="H"
                                includeMargin={false}
                              />
                              <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">Show at hospital</p>
                            </div>
                          )}
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            Service Fees: <span className="font-semibold">₩{booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking ID and Actions */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Booking ID: <span className="font-mono font-medium text-gray-900 dark:text-white">{booking.id}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Booked: {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleAddToCalendar(booking)}
                          className="w-full bg-gradient-to-r from-vibrant-blue-500 to-vibrant-blue-600 hover:from-vibrant-blue-600 hover:to-vibrant-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Google Calendar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-12 text-center shadow-lg">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start booking medical services to see them here</p>
            <Link href="/medical">
              <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-8 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:scale-105 transform">
                Browse Medical Services
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
