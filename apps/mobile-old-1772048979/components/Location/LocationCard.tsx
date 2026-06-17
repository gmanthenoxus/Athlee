import { Location, SportType } from '@athlehub/shared';
import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

interface LocationCardProps {
  location: Location;
}

/**
 * LocationCard component for mobile
 * Displays location information in card format
 */
export const LocationCard: FC<LocationCardProps> = ({ location }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/locations/${location.id}`);
  };

  return (
    <Pressable onPress={handlePress} className="mb-3">
      <View className="border border-gray-200 rounded-lg p-4 bg-white">
        {/* Header with name and verified badge */}
        <View className="flex-row items-start justify-between mb-3">
          <Text className="text-lg font-semibold text-gray-900 flex-1">{location.name}</Text>
          {location.verified && (
            <View className="ml-2 px-2 py-1 bg-green-100 rounded">
              <Text className="text-xs font-semibold text-green-800">Verified</Text>
            </View>
          )}
        </View>

        {/* Location Info */}
        <Text className="text-sm text-gray-600 mb-3">
          {location.address}, {location.city}, {location.state}
        </Text>

        {/* Location Type and Capacity */}
        <View className="flex-row items-center gap-3 mb-3">
          <View className="px-2 py-1 bg-blue-100 rounded">
            <Text className="text-xs font-semibold text-blue-800">{location.locationType}</Text>
          </View>
          <Text className="text-sm text-gray-600">Capacity: {location.capacity}</Text>
        </View>

        {/* Sports */}
        <View className="mb-3 flex-row flex-wrap gap-2">
          {location.sports.map((sport) => (
            <View key={sport} className="px-2 py-1 bg-purple-100 rounded">
              <Text className="text-xs font-semibold text-purple-800">{sport}</Text>
            </View>
          ))}
        </View>

        {/* Amenities (if any) */}
        {location.amenities.length > 0 && (
          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-600 mb-1">Amenities:</Text>
            <View className="flex-row flex-wrap gap-1">
              {location.amenities.slice(0, 3).map((amenity) => (
                <View key={amenity} className="bg-gray-100 px-2 py-1 rounded">
                  <Text className="text-xs text-gray-600">{amenity}</Text>
                </View>
              ))}
              {location.amenities.length > 3 && (
                <View className="bg-gray-100 px-2 py-1 rounded">
                  <Text className="text-xs text-gray-600">+{location.amenities.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Stats footer */}
        <View className="pt-3 border-t border-gray-200 flex-row justify-between">
          <Text className="text-sm text-gray-600">{location.matchCount} matches</Text>
          <Text className="text-sm text-gray-600">{Object.keys(location.playerStats).length} regulars</Text>
        </View>
      </View>
    </Pressable>
  );
};
