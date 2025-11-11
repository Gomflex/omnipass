'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">OMNIPASS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/stores"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/stores')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Stores
                </Link>
                <Link
                  href="/missions"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/missions')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Missions
                </Link>
                <Link
                  href="/points"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/points')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Points
                </Link>
              </div>

              {/* User Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
