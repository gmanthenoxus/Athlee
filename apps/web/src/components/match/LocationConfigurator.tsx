'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Users, Zap, ParkingMeter, ShowerHead, Plus, AlertCircle } from 'lucide-react';
import { Location, LocationType, Amenity, SportType } from '@/lib/location-types';
import { locationService } from '@/lib/locationService';

interface LocationConfiguratorProps {
  selectedSport?: SportType;
  selectedLocationId?: string;
  onSelectLocation: (locationId: string) => void;
}

/**
 * LocationConfigurator - Step 3: Location Selection
 * Allows users to search and select a venue for their match
 */
export const LocationConfigurator: React.FC<LocationConfiguratorProps> = ({
  selectedSport,
  selectedLocationId,
  onSelectLocation,
}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'active' | 'name'>('distance');
  const [showAddLocation, setShowAddLocation] = useState(false);

  // Initialize mock data on mount
  useEffect(() => {
    locationService.initializeMockData();
  }, []);

  // Get filtered locations
  const locations = useMemo(() => {
    if (!selectedSport) return [];

    // Get locations for this sport
    let filtered = locationService.getLocations({
      sports: [selectedSport],
      search: search.trim(),
      type: [],
    });

    // Sort
    if (sortBy === 'distance') {
      filtered.sort((a, b) => {
        const distA = locationService.getDistance(a.id);
        const distB = locationService.getDistance(b.id);
        return distA - distB;
      });
    } else if (sortBy === 'active') {
      filtered.sort((a, b) => (b.activePlayers?.length || 0) - (a.activePlayers?.length || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedSport, search, sortBy]);

  // Get selected location
  const selectedLocation = useMemo(
    () => (selectedLocationId ? locations.find((l) => l.id === selectedLocationId) : undefined),
    [selectedLocationId, locations]
  );

  // Get amenity icon
  const getAmenityIcon = (amenity: Amenity) => {
    switch (amenity) {
      case Amenity.Parking:
        return <ParkingMeter className="w-4 h-4" />;
      case Amenity.Showers:
        return <ShowerHead className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  // Get location type badge color
  const getLocationTypeColor = (type: LocationType) => {
    switch (type) {
      case LocationType.Business:
        return 'bg-blue-100 text-blue-700';
      case LocationType.Community:
        return 'bg-green-100 text-green-700';
      case LocationType.Private:
        return 'bg-purple-100 text-purple-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Select a Location</h2>
        <p className="text-gray-600 text-sm mt-1">
          Choose a venue for your {selectedSport || 'match'}
        </p>
      </div>

      {/* Search and Sort */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('distance')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              sortBy === 'distance'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Nearest
          </button>
          <button
            onClick={() => setSortBy('active')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              sortBy === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Most Active
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              sortBy === 'name'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Name
          </button>
        </div>
      </div>

      {/* Results */}
      {locations.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {locations.map((location) => {
            const isSelected = selectedLocationId === location.id;
            const distance = locationService.getDistance(location.id);
            const activeCount = location.activePlayers?.length || 0;

            return (
              <button
                key={location.id}
                onClick={() => onSelectLocation(location.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{location.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{location.address}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                      ✓
                    </div>
                  )}
                </div>

                {/* Meta Row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  {/* Location Type Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getLocationTypeColor(location.type)}`}>
                    {location.type}
                  </span>

                  {/* Distance */}
                  <div className="text-xs text-gray-600">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {distance.toFixed(1)} mi
                  </div>

                  {/* Active Players */}
                  {activeCount > 0 && (
                    <div className="text-xs text-gray-600">
                      <Users className="w-3 h-3 inline mr-1" />
                      {activeCount} players
                    </div>
                  )}

                  {/* Amenities (show a few key ones) */}
                  <div className="flex gap-1">
                    {location.amenities?.slice(0, 2).map((amenity) => (
                      <div key={amenity} className="text-gray-400 w-4 h-4">
                        {getAmenityIcon(amenity as Amenity)}
                      </div>
                    ))}
                    {location.amenities && location.amenities.length > 2 && (
                      <span className="text-xs text-gray-500">+{location.amenities.length - 2}</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">No locations found</p>
          <p className="text-sm text-gray-500 mt-1">
            {selectedSport ? `No venues available for ${selectedSport} yet.` : 'Select a sport first.'}
          </p>
        </div>
      )}

      {/* Add New Location Button */}
      <button
        onClick={() => setShowAddLocation(true)}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Location
      </button>

      {/* Selected Location Details (if any) */}
      {selectedLocation && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900">✓ Location selected: {selectedLocation.name}</p>
          <p className="text-xs text-blue-700 mt-1">{selectedLocation.address}</p>
        </div>
      )}

      {/* Validation Message */}
      {!selectedLocationId && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">Please select a location to proceed</p>
        </div>
      )}

      {/* Add Location Modal Placeholder */}
      {showAddLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Location</h3>
            <p className="text-sm text-gray-600 mb-4">
              Location creation will be implemented in a future step. For now, you can explore existing locations.
            </p>
            <button
              onClick={() => setShowAddLocation(false)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
