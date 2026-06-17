'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { LocationCard } from '@/components/LocationCard';
import { locationService } from '@/lib/locationService';
import { useLocationStore } from '@/store/locationStore';
import { Location, LocationType, SportType, SortOption } from '@/lib/location-types';
import { useAuth } from '@/hooks/useAuth';

/**
 * LocationDiscovery - Main location discovery page with filtering and sorting
 * Displays a list of locations with search, sport filters, type filters, and sorting options
 */
export default function LocationDiscoveryPage() {
  const { user } = useAuth();
  const store = useLocationStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize mock data on mount
  useEffect(() => {
    locationService.initializeMockData();
    loadLocations();
  }, []);

  // Reload locations when filters or sort change
  useEffect(() => {
    loadLocations();
  }, [store.filters, store.sort]);

  const loadLocations = () => {
    setIsLoading(true);
    try {
      const filtered = locationService.getLocations(store.filters, store.sort);
      setLocations(filtered);
    } catch (error) {
      console.error('Failed to load locations:', error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate distance for each location (mock)
  const locationsWithDistance = useMemo(() => {
    return locations.map((loc) => {
      const distance = 2 + Math.random() * 8; // Mock: 2-10 miles
      return { location: loc, distance: Math.round(distance * 10) / 10 };
    });
  }, [locations]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setFilters({
      ...store.filters,
      search: e.target.value
    });
  };

  // Handle sport filter toggle
  const handleSportFilter = (sport: SportType) => {
    const newSports = store.filters.sports.includes(sport)
      ? store.filters.sports.filter((s) => s !== sport)
      : [...store.filters.sports, sport];

    store.setFilters({
      ...store.filters,
      sports: newSports
    });
  };

  // Handle type filter toggle
  const handleTypeFilter = (type: LocationType) => {
    const newTypes = store.filters.type.includes(type)
      ? store.filters.type.filter((t) => t !== type)
      : [...store.filters.type, type];

    store.setFilters({
      ...store.filters,
      type: newTypes
    });
  };

  // Handle sort change
  const handleSort = (sortOption: SortOption) => {
    store.setSort(sortOption);
  };

  // Clear all filters
  const handleClearFilters = () => {
    store.setFilters({
      sports: [],
      type: [],
      search: ''
    });
  };

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
                <Link href="/locations" className="text-blue-600 font-medium text-sm border-b-2 border-blue-600">
                  Explore
                </Link>
                <Link href="/users" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Users
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Courts & Venues</h1>
          <p className="text-gray-600">Find and join sports courts near you</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search locations by name, address..."
              value={store.filters.search}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sport Filter Chips */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Sports</h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(SportType).map((sport) => (
                <button
                  key={sport}
                  onClick={() => handleSportFilter(sport)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    store.filters.sports.includes(sport)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Location Type</h3>
            <div className="flex gap-3">
              {Object.values(LocationType).map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-2 ${
                    store.filters.type.includes(type)
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {type === LocationType.Business && '🏢'}
                  {type === LocationType.Community && '👥'}
                  {type === LocationType.Private && '🔒'}
                  {' '}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Clear */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <select
                value={store.sort}
                onChange={(e) => handleSort(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={SortOption.Nearest}>Sort: Nearest</option>
                <option value={SortOption.MostActive}>Sort: Most Active</option>
                <option value={SortOption.Newest}>Sort: Newest</option>
                <option value={SortOption.MostBookings}>Sort: Most Bookings</option>
              </select>
            </div>

            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-gray-900">{locationsWithDistance.length}</span> locations
          </p>
        </div>

        {/* Locations Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading locations...</p>
          </div>
        ) : locationsWithDistance.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsWithDistance.map(({ location, distance }) => (
              <LocationCard key={location.id} location={location} distance={distance} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-600 mb-4">No locations found</p>
            <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Community Court Button */}
        {user && user.accountType === 'Player' && (
          <div className="fixed bottom-8 right-8">
            <Link
              href="/locations/create-community"
              className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors"
            >
              ➕ Add Community Court
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

