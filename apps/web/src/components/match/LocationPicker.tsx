'use client';

import { useState, useMemo } from 'react';
import { Location } from '@/lib/location-types';
import { locationService } from '@/lib/locationService';

interface LocationPickerProps {
  selectedLocationId?: string;
  onSelect: (locationId: string) => void;
}

/**
 * LocationPicker - Search and select from existing locations
 */
export function LocationPicker({ selectedLocationId, onSelect }: LocationPickerProps) {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Get all locations
  const allLocations = useMemo(() => {
    locationService.initializeMockData();
    return locationService.getLocations();
  }, []);

  // Filter locations by search
  const filteredLocations = useMemo(() => {
    if (!search.trim()) return allLocations;
    
    const query = search.toLowerCase();
    return allLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query)
    );
  }, [search, allLocations]);

  // Get selected location
  const selectedLocation = useMemo(
    () => allLocations.find((loc) => loc.id === selectedLocationId),
    [selectedLocationId, allLocations]
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Location</h2>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Selected location badge */}
        {selectedLocation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-bold text-gray-900">{selectedLocation.name}</p>
            <p className="text-sm text-gray-600">📍 {selectedLocation.address}</p>
            <p className="text-xs text-gray-500 mt-2">
              {selectedLocation.sports.join(', ')} • {selectedLocation.type}
            </p>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    onSelect(location.id);
                    setShowDropdown(false);
                    setSearch('');
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                    selectedLocationId === location.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="font-bold text-gray-900">{location.name}</p>
                  <p className="text-xs text-gray-600">📍 {location.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {location.sports.join(', ')} • {location.type}
                  </p>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                No locations found
              </div>
            )}
          </div>
        )}

        {/* Optional location */}
        <p className="text-xs text-gray-500 mt-4">Location is optional but recommended</p>
      </div>
    </div>
  );
}
