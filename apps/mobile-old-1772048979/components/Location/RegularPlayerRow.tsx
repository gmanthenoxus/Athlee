import { LocationPlayerRecord } from '@athlehub/shared';
import { FC } from 'react';
import { Text, View } from 'react-native';

interface RegularPlayerRowProps {
  player: LocationPlayerRecord;
  index: number;
}

/**
 * RegularPlayerRow component for mobile
 * Displays a regular player at a location
 */
export const RegularPlayerRow: FC<RegularPlayerRowProps> = ({ player, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View className="py-3 border-b border-gray-200 flex-row items-center justify-between">
      {/* Rank and Player Info */}
      <View className="flex-row items-center gap-3 flex-1">
        <Text className="text-sm font-bold text-gray-900 w-6 text-center">{index + 1}</Text>
        <View>
          <Text className="text-sm font-semibold text-gray-900">Player {player.playerId}</Text>
          <Text className="text-xs text-gray-600">First: {formatDate(player.firstSeen)}</Text>
        </View>
      </View>

      {/* Stats */}
      <View className="text-right">
        <Text className="text-sm font-bold text-gray-900">{player.matchCount}</Text>
        <Text className="text-xs text-gray-600">matches</Text>
      </View>
    </View>
  );
};
