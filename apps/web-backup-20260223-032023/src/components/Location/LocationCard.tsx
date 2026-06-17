'use client';

import { Location, SportType } from '@athlehub/shared';
import Link from 'next/link';
import { FC } from 'react';

interface LocationCardProps {
  location: Location;
}

/**
 * LocationCard component
 * Displays location information in card format
 * Shows name, address, sports, amenities, and match count
 */
export const LocationCard: FC<LocationCardProps> = ({ location }) => {
  return (
    <Link href={`/locations/${location.id}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        {/* Header with name and verified badge */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{location.name}</h3>
          {location.verified && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
              Verified
            </span>
          )}
        </div>

        {/* Location Info */}
        <p className="text-sm text-gray-600 mb-3">
          {location.address}, {location.city}, {location.state}
        </p>

        {/* Location Type and Capacity */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {location.locationType}
          </span>
          <span className="text-gray-600">Capacity: {location.capacity}</span>
        </div>

        {/* Sports */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {location.sports.map((sport) => (
              <span key={sport} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                {sport}
              </span>
            ))}
          </div>
        </div>

        {/* Amenities (if any) */}
        {location.amenities.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 font-semibold mb-1">Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {location.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {location.amenities.length > 3 && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  +{location.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats footer */}
        <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
          {location.matchCount} matches • {Object.keys(location.playerStats).length} regular players
        </div>
      </div>
    </Link>
  );
};
