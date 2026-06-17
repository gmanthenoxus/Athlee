import { LocationCard } from '@/components/Location';
import { getLocationService } from '@athlehub/shared';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface BusinessLocationsProps {
  userId: string;
}

/**
 * Business Locations Component for Mobile
 * Displays and manages locations owned by a business account
 */
export const BusinessLocations = ({ userId }: BusinessLocationsProps) => {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationService = getLocationService();
    const ownedLocations = locationService.getLocationsByOwner(userId);
    setLocations(ownedLocations);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <Text className="text-gray-600">Loading locations...</Text>;
  }

  return (
    <View className="mt-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">My Locations</Text>
        <TouchableOpacity onPress={() => router.push('/locations/add')} className="px-3 py-1 bg-blue-600 rounded">
          <Text className="text-white font-semibold text-sm">+ Add</Text>
        </TouchableOpacity>
      </View>

      {locations.length > 0 ? (
        <View>
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </View>
      ) : (
        <View className="bg-white rounded-lg p-6 items-center">
          <Text className="text-gray-600 mb-4">No locations yet</Text>
          <TouchableOpacity onPress={() => router.push('/locations/add')} className="px-4 py-2 bg-blue-600 rounded">
            <Text className="text-white font-semibold text-sm">Create First Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
