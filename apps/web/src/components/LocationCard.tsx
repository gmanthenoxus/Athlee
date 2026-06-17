'use client';

import Link from 'next/link';
import { Location, LocationType, SportType } from '@/lib/location-types';

interface LocationCardProps {
  location: Location;
  distance?: number;
}

/**
 * LocationCard - Displays a single location in the discovery list
 * Shows key information: image, name, sports, type, distance, and active player count
 */
export function LocationCard({ location, distance = 0 }: LocationCardProps) {
  // Sport icon mapping
  const getSportIcon = (sport: SportType): string => {
    const icons: Record<SportType, string> = {
      [SportType.Basketball]: '🏀',
      [SportType.Soccer]: '⚽',
      [SportType.Tennis]: '🎾',
      [SportType.Badminton]: '🏸',
      [SportType.Baseball]: '⚾',
      [SportType.Volleyball]: '🏐',
      [SportType.Pickleball]: '🏓',
      [SportType.American_Football]: '🏈'
    };
    return icons[sport] || '⭕';
  };

  // Type badge styling
  const getTypeBadgeStyle = (type: LocationType) => {
    switch (type) {
      case LocationType.Business:
        return 'bg-blue-100 text-blue-800';
      case LocationType.Community:
        return 'bg-green-100 text-green-800';
      case LocationType.Private:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/locations/${location.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Location Image */}
        <div className="relative h-40 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
          <img
            src={(location.images && location.images[0]) || 'https://via.placeholder.com/400x300?text=Location'}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          {/* Verified Badge */}
          {location.verified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Location Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{location.name}</h3>

          {/* Sports and Type */}
          <div className="flex items-center justify-between mb-3">
            {/* Sport Icons */}
            <div className="flex gap-1 flex-wrap">
              {(location.sports || []).slice(0, 3).map((sport) => (
                <span key={sport} className="text-lg" title={sport}>
                  {getSportIcon(sport)}
                </span>
              ))}
              {location.sports && location.sports.length > 3 && (
                <span className="text-sm text-gray-600">+{location.sports.length - 3}</span>
              )}
            </div>

            {/* Type Badge */}
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTypeBadgeStyle(location.type)}`}>
              {location.type}
            </span>
          </div>

          {/* Address and Distance */}
          <div className="text-sm text-gray-600 mb-3 line-clamp-2">
            📍 {location.address}
            {distance > 0 && <span className="block text-xs mt-1 text-gray-500">📏 {distance} miles away</span>}
          </div>

          {/* Active Players and Stats */}
          <div className="flex items-center justify-between">
            {/* Active Players */}
            <div className="flex items-center gap-2">
              {location.activePlayers && location.activePlayers.length > 0 ? (
                <>
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(location.activePlayers.length, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white text-xs text-white font-bold flex items-center justify-center"
                      >
                        👤
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {location.activePlayers.length} active
                  </span>
                  {location.activePlayers.length > 3 && (
                    <span className="text-xs text-gray-500">+{location.activePlayers.length - 3}</span>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-500">No one here now</span>
              )}
            </div>

            {/* Capacity */}
            {location.capacity && (
              <span className="text-xs text-gray-500 font-medium">Cap: {location.capacity}</span>
            )}
          </div>

          {/* CTA Button */}
          <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
