/**
 * Home Page
 * 
 * Landing page for the application.
 * 
 * Shows:
 * - Authenticated Player: Dashboard with matches and feed
 * - Authenticated Business: Dashboard with bookings and management
 * - Authenticated Visitor: Explore page
 * - Unauthenticated users: Marketing content + sign up CTA
 * 
 * Code Reviewers:
 * - Different UI based on user account type
 * - Loading state while auth initializes
 * - Responsive navigation with user context
 */

'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user, isLoading, isAuthenticated, isPlayer, isBusiness, isVisitor } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Authenticated Player Dashboard
  if (isAuthenticated && isPlayer()) {
    const playerUser = user as any;
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold text-blue-600">Athlee</h1>
                <div className="hidden md:flex gap-4">
                  <Link href="/feed" className="text-gray-700 hover:text-gray-900 font-medium">
                    Feed
                  </Link>
                  <Link href="/messages" className="text-gray-700 hover:text-gray-900 font-medium">
                    Messages
                  </Link>
                  <Link href="/explore" className="text-gray-700 hover:text-gray-900 font-medium">
                    Explore
                  </Link>
                  <Link href="/users" className="text-gray-700 hover:text-gray-900 font-medium">
                    Users
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {playerUser.username ? `@${playerUser.username}` : playerUser.firstName}</span>
                <Link href={`/profile/${playerUser.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Profile
                </Link>
                <Link href="/logout" className="text-red-600 hover:text-red-800 font-medium">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {playerUser.firstName} {playerUser.lastName}!</h2>
            <p className="text-gray-600 mb-4">
              Primary sport: <strong>{playerUser.primarySport}</strong> • Location: <strong>{playerUser.city}, {playerUser.country}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Profile created: {new Date(playerUser.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/feed"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">📰</div>
              <h3 className="font-semibold text-gray-900">Activity Feed</h3>
              <p className="text-sm text-gray-600 mt-2">See matches and events near you</p>
            </Link>

            <Link
              href="/messages"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600 mt-2">Chat with other players</p>
            </Link>

            <Link
              href="/explore"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold text-gray-900">Explore</h3>
              <p className="text-sm text-gray-600 mt-2">Discover venues and events</p>
            </Link>

            <Link
              href="/locations"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">🏀</div>
              <h3 className="font-semibold text-gray-900">Locations</h3>
              <p className="text-sm text-gray-600 mt-2">Find and check in to courts</p>
            </Link>

            <Link
              href="/locations/create-community"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Create Community</h3>
              <p className="text-sm text-gray-600 mt-2">Start a community court</p>
            </Link>

            <Link
              href="/matches"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900">Matches</h3>
              <p className="text-sm text-gray-600 mt-2">Organize and track matches</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Business Dashboard
  if (isAuthenticated && isBusiness()) {
    const businessUser = user as any;
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold text-blue-600">Athlee</h1>
                <div className="hidden md:flex gap-4">
                  <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/bookings" className="text-gray-700 hover:text-gray-900 font-medium">
                    Bookings
                  </Link>
                  <Link href="/analytics" className="text-gray-700 hover:text-gray-900 font-medium">
                    Analytics
                  </Link>
                  <Link href="/users" className="text-gray-700 hover:text-gray-900 font-medium">
                    Users
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{businessUser.username ? `@${businessUser.username}` : businessUser.businessName}</span>
                <Link href={`/profile/${businessUser.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Profile
                </Link>
                <Link href="/logout" className="text-red-600 hover:text-red-800 font-medium">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {businessUser.businessName}! 🏢</h2>
            <p className="text-gray-600 mb-4">
              Type: <strong>{businessUser.businessType}</strong> • Admin: <strong>{businessUser.adminName}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Account created: {new Date(businessUser.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/business/locations"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900">My Locations</h3>
              <p className="text-sm text-gray-600 mt-2">Manage your courts</p>
            </Link>

            <Link
              href="/bookings"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">📅</div>
              <h3 className="font-semibold text-gray-900">Bookings</h3>
              <p className="text-sm text-gray-600 mt-2">Manage reservations</p>
            </Link>

            <Link
              href="/analytics"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600 mt-2">View statistics</p>
            </Link>

            <Link
              href="/settings"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-900">Settings</h3>
              <p className="text-sm text-gray-600 mt-2">Manage your business</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Visitor Dashboard
  if (isAuthenticated && isVisitor()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">Athlee</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/logout" className="text-red-600 hover:text-red-800 font-medium">
                  Exit Visitor Mode
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browsing as Visitor</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore venues and events without creating an account
          </p>
          <Link
            href="/explore"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    );
  }

  // Unauthenticated Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Athlee</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
            Connect. Play. Grow.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Match with athletes and sports professionals. Book venues, find training partners, and build your sports network.
          </p>

          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/explore?visitor=true"
              className="inline-block px-6 py-2 text-gray-600 hover:text-gray-900 underline"
            >
              Or browse as a visitor →
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">For Players</h3>
            <p className="text-gray-600">Find training partners, join matches, and connect with the sports community</p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m0 0h5.581M9 21m0-8h4m0 0h4m-4 0v4m-4-4v4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">For Venues</h3>
            <p className="text-gray-600">Manage bookings, attract athletes, and grow your business</p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">For Everyone</h3>
            <p className="text-gray-600">Browse events, discover opportunities, and join the community</p>
          </div>
        </div>
      </div>
    </div>
  );
}
