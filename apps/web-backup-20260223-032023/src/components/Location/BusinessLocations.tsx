'use client';

import { LocationCard } from '@/components/Location';
import { getLocationService } from '@athlehub/shared';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BusinessLocationsProps {
  userId: string;
}

/**
 * Business Locations Component
 * Displays and manages locations owned by a business account
 */
export const BusinessLocations = ({ userId }: BusinessLocationsProps) => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationService = getLocationService();
    const ownedLocations = locationService.getLocationsByOwner(userId);
    setLocations(ownedLocations);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div className="text-gray-600">Loading locations...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Locations</h2>
        <Link href="/locations/add">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            + Add Location
          </button>
        </Link>
      </div>

      {locations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="relative">
              <LocationCard location={location} />
              {/* Edit Button Overlay */}
              <Link href={`/locations/${location.id}/edit`}>
                <button className="absolute top-4 right-4 px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded opacity-0 hover:opacity-100 transition-opacity">
                  Edit
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't created any locations yet</p>
          <Link href="/locations/add">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Create First Location
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
