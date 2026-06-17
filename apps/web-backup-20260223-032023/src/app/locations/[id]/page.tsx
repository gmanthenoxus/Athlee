'use client';

import { AmenitiesList, RegularPlayerRow, SportIcons } from '@/components/Location';
import { getLocationService, getTopRegularPlayers } from '@athlehub/shared';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LocationDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * Location Detail Page
 * Shows comprehensive information about a specific location
 * Includes amenities, regular players, and stats
 */
export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [regularPlayers, setRegularPlayers] = useState<any[]>([]);

  useEffect(() => {
    const locationService = getLocationService();
    const loc = locationService.getLocation(params.id);

    if (!loc) {
      notFound();
    }

    setLocation(loc);
    const regulars = locationService.getRegularPlayers(params.id, 5);
    setRegularPlayers(regulars);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading location details...</div>
      </div>
    );
  }

  if (!location) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 mb-4"
          >
            ← Back
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900">{location.name}</h1>
              <p className="mt-2 text-gray-600">
                {location.address}, {location.city}, {location.state} {location.country}
              </p>
            </div>
            {location.verified && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                ✓ Verified
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Type</p>
                  <p className="text-lg text-gray-900">{location.locationType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Capacity</p>
                  <p className="text-lg text-gray-900">{location.capacity} people</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Coordinates</p>
                  <p className="text-lg text-gray-900">
                    {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Sports Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sports Available</h2>
              <SportIcons sports={location.sports} size="md" maxDisplay={6} />
            </div>

            {/* Amenities Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <AmenitiesList amenities={location.amenities} maxDisplay={12} className="space-y-2" />
            </div>

            {/* Regular Players Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Regular Players</h2>
              <p className="text-sm text-gray-600 mb-4">Top players who frequently play here</p>

              {regularPlayers.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {regularPlayers.map((player, index) => (
                    <RegularPlayerRow key={player.playerId} player={player} index={index} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No regular players yet</p>
              )}
            </div>
          </div>

          {/* Right Column - Stats Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Total Matches</p>
                  <p className="text-3xl font-bold text-blue-600">{location.matchCount}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Regular Players</p>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(location.playerStats).length}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Sports</p>
                  <p className="text-3xl font-bold text-green-600">{location.sports.length}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Amenities</p>
                  <p className="text-3xl font-bold text-orange-600">{location.amenities.length}</p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Information</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold text-gray-700">Created</p>
                  <p>{formatDate(location.createdAt)}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Last Updated</p>
                  <p>{formatDate(location.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
