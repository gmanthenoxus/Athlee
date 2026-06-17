'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { locationService } from '@/lib/locationService';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessStore } from '@/store/locationStore';
import { Location, LocationType } from '@/lib/location-types';

/**
 * BusinessDashboard - Business owner location management
 * Shows owned locations with bookings, active players, and management options
 */
export default function BusinessDashboard() {
  const { user } = useAuth();
  const store = useBusinessStore();
  const [ownedLocations, setOwnedLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    locationService.initializeMockData();
    loadOwnedLocations();
  }, []);

  const loadOwnedLocations = () => {
    setIsLoading(true);
    try {
      if (user) {
        const locations = locationService.getLocationsByOwner(user.id);
        setOwnedLocations(locations);

        // Update business store with owned location IDs
        locations.forEach((loc) => {
          store.addLocationToOwned(loc.id);
        });
      }
    } catch (error) {
      console.error('Failed to load owned locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.accountType !== 'Business') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">🔒 Business Only</p>
          <p className="text-gray-600 mb-6">This page is only accessible to business accounts</p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Athlee
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Home
                </Link>
                <Link href="/locations" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Explore
                </Link>
                <Link href="/business/locations" className="text-blue-600 font-medium text-sm border-b-2 border-blue-600">
                  My Locations
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <Link href={`/profile/${user.id}`} className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Profile
                </Link>
              )}
              <Link href="/logout" className="text-red-600 hover:text-red-700 font-medium text-sm">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Locations</h1>
            <p className="text-gray-600">Manage your courts and venues</p>
          </div>
          <Link
            href="/business/locations/add"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            ➕ Add Location
          </Link>
        </div>

        {/* Locations List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading your locations...</p>
          </div>
        ) : ownedLocations.length > 0 ? (
          <div className="space-y-6">
            {ownedLocations.map((location) => (
              <LocationManagementCard key={location.id} location={location} onUpdate={loadOwnedLocations} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-600 mb-4">📍 No locations yet</p>
            <p className="text-sm text-gray-500 mb-6">Create your first location to get started</p>
            <Link
              href="/business/locations/add"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              ➕ Add Your First Location
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * LocationManagementCard - Displays a single location with management options
 */
function LocationManagementCard({
  location,
  onUpdate
}: {
  location: Location;
  onUpdate: () => void;
}) {
  const stats = locationService.getLocationStats(location.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Location Image */}
        <div className="md:w-48 h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0">
          <img
            src={location.images[0] || 'https://via.placeholder.com/300x300?text=Location'}
            alt={location.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Location Info */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{location.name}</h2>
              <p className="text-sm text-gray-600">📍 {location.address}</p>
            </div>
            {location.verified && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.bookingsToday}</p>
              <p className="text-xs text-gray-600 mt-1">Today's Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.activeNow}</p>
              <p className="text-xs text-gray-600 mt-1">Active Now</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.totalBookings}</p>
              <p className="text-xs text-gray-600 mt-1">Total Bookings</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div>
              <p className="text-xs text-gray-500 font-bold">SPORTS</p>
              <div className="flex gap-1 mt-1">
                {location.sports.map((sport) => (
                  <span key={sport} className="text-lg" title={sport}>
                    {getSportIcon(sport)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">CAPACITY</p>
              <p className="font-medium text-gray-900">{location.capacity || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">HOURS</p>
              <p className="font-medium text-gray-900">{location.hours}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">TYPE</p>
              <p className="font-medium text-gray-900">{location.type}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/business/locations/${location.id}/edit`}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
            >
              ✏️ Edit
            </Link>
            <Link
              href={`/business/locations/${location.id}/bookings`}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
            >
              📅 Manage Bookings
            </Link>
            <Link
              href={`/locations/${location.id}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              👁️ View Public
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function
function getSportIcon(sport: string): string {
  const icons: Record<string, string> = {
    Basketball: '🏀',
    Soccer: '⚽',
    Tennis: '🎾',
    Badminton: '🏸',
    Baseball: '⚾',
    Volleyball: '🏐',
    Pickleball: '🏓',
    'American Football': '🏈'
  };
  return icons[sport] || '⭕';
}
