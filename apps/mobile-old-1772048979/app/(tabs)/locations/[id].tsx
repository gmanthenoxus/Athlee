import { AmenitiesList, RegularPlayerRow } from '@/components/Location';
import { getLocationService } from '@athlehub/shared';
import { Stack, useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

/**
 * Mobile Location Detail Screen
 * Shows comprehensive information about a location
 */
export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [regularPlayers, setRegularPlayers] = useState<any[]>([]);

  useEffect(() => {
    const locationService = getLocationService();
    const loc = locationService.getLocation(id as string);

    if (loc) {
      setLocation(loc);
      const regulars = locationService.getRegularPlayers(id as string, 5);
      setRegularPlayers(regulars);
    }
  }, [id]);

  if (!location) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-600">Loading location details...</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: location.name,
          headerBackTitle: 'Back',
        }}
      />

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header Info */}
        <View className="bg-white p-4 border-b border-gray-200">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl font-bold text-gray-900 flex-1">{location.name}</Text>
            {location.verified && (
              <View className="ml-2 px-2 py-1 bg-green-100 rounded">
                <Text className="text-xs font-semibold text-green-800">✓ Verified</Text>
              </View>
            )}
          </View>
          <Text className="text-sm text-gray-600">
            {location.address}, {location.city}, {location.state}
          </Text>
        </View>

        {/* Main Content */}
        <View className="p-4 space-y-4">
          {/* Location Details Card */}
          <View className="bg-white rounded-lg p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Details</Text>

            <View className="space-y-3">
              <View>
                <Text className="text-sm text-gray-600 font-semibold">Type</Text>
                <Text className="text-base text-gray-900">{location.locationType}</Text>
              </View>

              <View>
                <Text className="text-sm text-gray-600 font-semibold">Capacity</Text>
                <Text className="text-base text-gray-900">{location.capacity} people</Text>
              </View>

              <View>
                <Text className="text-sm text-gray-600 font-semibold">Sports</Text>
                <View className="flex-row flex-wrap gap-2 mt-1">
                  {location.sports.map((sport: string) => (
                    <View key={sport} className="px-2 py-1 bg-purple-100 rounded">
                      <Text className="text-xs font-semibold text-purple-800">{sport}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Amenities Card */}
          {location.amenities.length > 0 && (
            <View className="bg-white rounded-lg p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-3">Amenities</Text>
              <AmenitiesList amenities={location.amenities} maxDisplay={12} />
            </View>
          )}

          {/* Statistics Card */}
          <View className="bg-white rounded-lg p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Statistics</Text>

            <View className="space-y-3">
              <View className="pb-3 border-b border-gray-200 flex-row justify-between items-center">
                <Text className="text-sm text-gray-600">Total Matches</Text>
                <Text className="text-2xl font-bold text-blue-600">{location.matchCount}</Text>
              </View>

              <View className="pb-3 border-b border-gray-200 flex-row justify-between items-center">
                <Text className="text-sm text-gray-600">Regular Players</Text>
                <Text className="text-2xl font-bold text-purple-600">
                  {Object.keys(location.playerStats).length}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-600">Amenities</Text>
                <Text className="text-2xl font-bold text-orange-600">
                  {location.amenities.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Regular Players Card */}
          <View className="bg-white rounded-lg p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Regular Players</Text>
            <Text className="text-sm text-gray-600 mb-3">
              Top players who frequently play here
            </Text>

            {regularPlayers.length > 0 ? (
              <View className="divide-y divide-gray-200">
                {regularPlayers.map((player, index) => (
                  <RegularPlayerRow key={player.playerId} player={player} index={index} />
                ))}
              </View>
            ) : (
              <Text className="text-gray-600 text-sm">No regular players yet</Text>
            )}
          </View>

          {/* Info Card */}
          <View className="bg-white rounded-lg p-4 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Information</Text>
            <View className="space-y-2">
              <View>
                <Text className="text-sm font-semibold text-gray-700">Created</Text>
                <Text className="text-sm text-gray-600">{formatDate(location.createdAt)}</Text>
              </View>
              <View>
                <Text className="text-sm font-semibold text-gray-700">Last Updated</Text>
                <Text className="text-sm text-gray-600">{formatDate(location.updatedAt)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
