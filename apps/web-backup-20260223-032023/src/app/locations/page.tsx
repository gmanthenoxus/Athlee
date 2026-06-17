'use client';

import { LocationCard } from '@/components/Location';
import { MOCK_LOCATIONS, LocationSearchFilters, LocationType, SportType, getLocationService } from '@athlehub/shared';
import { useEffect, useState } from 'react';

/**
 * Locations Explorer Page
 * Browse and search all locations
 * Supports filtering by search query, sport, city, and location type
 */
export default function LocationsPage() {
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [filters, setFilters] = useState<LocationSearchFilters>({
    query: '',
  });
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Get unique cities and sports for filter dropdowns
  const cities = Array.from(new Set(MOCK_LOCATIONS.map((l) => l.city))).sort();
  const sports = Array.from(new Set(MOCK_LOCATIONS.flatMap((l) => l.sports))).sort();
  const locationTypes = Object.values(LocationType);

  // Apply filters
  useEffect(() => {
    const locationService = getLocationService();
    const filtered = locationService.searchLocations(filters);
    setLocations(filtered);
  }, [filters]);

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  const handleSportFilter = (sport: SportType | '') => {
    setFilters((prev) => ({
      ...prev,
      sport: sport || undefined,
    }));
  };

  const handleCityFilter = (city: string | '') => {
    setFilters((prev) => ({
      ...prev,
      city: city || undefined,
    }));
  };

  const handleTypeFilter = (type: LocationType | '') => {
    setFilters((prev) => ({
      ...prev,
      locationType: (type as LocationType) || undefined,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ query: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Locations</h1>
          <p className="mt-2 text-gray-600">Find courts, fields, and sports facilities in your area</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search locations by name..."
              value={filters.query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setExpandedFilters(!expandedFilters)}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            {expandedFilters ? '▼' : '▶'} Advanced Filters
          </button>

          {/* Expanded Filters */}
          {expandedFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              {/* Sport Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Sport</label>
                <select
                  value={filters.sport || ''}
                  onChange={(e) => handleSportFilter(e.target.value as SportType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sports</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                <select
                  value={filters.city || ''}
                  onChange={(e) => handleCityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location Type</label>
                <select
                  value={filters.locationType || ''}
                  onChange={(e) => handleTypeFilter(e.target.value as LocationType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {locationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Active Filters Display */}
          {(filters.sport || filters.city || filters.locationType) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filters.sport && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {filters.sport}
                    <button
                      onClick={() => handleSportFilter('')}
                      className="font-bold hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.city && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {filters.city}
                    <button onClick={() => handleCityFilter('')} className="font-bold hover:text-blue-600">
                      ×
                    </button>
                  </span>
                )}
                {filters.locationType && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {filters.locationType}
                    <button onClick={() => handleTypeFilter('')} className="font-bold hover:text-blue-600">
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {locations.length > 0 ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">{locations.length} locations found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No locations found matching your filters.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

