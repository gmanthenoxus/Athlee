import { Amenity } from '@athlehub/shared';
import { FC } from 'react';
import { Text, View } from 'react-native';

interface AmenitiesListProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

/**
 * AmenitiesList component for mobile
 * Displays amenities in a formatted list
 */
export const AmenitiesList: FC<AmenitiesListProps> = ({ amenities, maxDisplay = 6 }) => {
  if (amenities.length === 0) {
    return <Text className="text-gray-500 text-sm">No amenities listed</Text>;
  }

  const displayAmenities = amenities.slice(0, maxDisplay);
  const remaining = Math.max(0, amenities.length - maxDisplay);

  return (
    <View className="space-y-2">
      {displayAmenities.map((amenity) => (
        <View key={amenity} className="flex-row items-center">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
          <Text className="text-sm text-gray-700">{amenity}</Text>
        </View>
      ))}
      {remaining > 0 && (
        <Text className="text-sm text-gray-600">
          <Text className="font-semibold">+{remaining}</Text> more amenities
        </Text>
      )}
    </View>
  );
};
