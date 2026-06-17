import { SportType } from '@athlehub/shared';
import { FC } from 'react';
import { Text, View } from 'react-native';

interface SportIconsProps {
  sports: SportType[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
}

/**
 * SportIcons component for mobile
 * Displays sport badges
 */
export const SportIcons: FC<SportIconsProps> = ({ sports, size = 'md', maxDisplay = 4 }) => {
  const displaySports = sports.slice(0, maxDisplay);
  const remaining = Math.max(0, sports.length - maxDisplay);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      {displaySports.map((sport) => (
        <View key={sport} className={`${sizeClasses[size]} bg-purple-100 rounded`}>
          <Text className="text-purple-800 font-semibold">{sport}</Text>
        </View>
      ))}
      {remaining > 0 && (
        <View className={`${sizeClasses[size]} bg-purple-100 rounded`}>
          <Text className="text-purple-800 font-semibold">+{remaining}</Text>
        </View>
      )}
    </View>
  );
};
