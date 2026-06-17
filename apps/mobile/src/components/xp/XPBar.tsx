/**
 * XPBar Component (Mobile/React Native)
 * Displays user's XP progress with level, rank, and numeric values
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { xpService } from '@/lib/xpService';
import { XPHistoryModal } from './XPHistoryModal';

interface XPBarProps {
  userId: string;
  compact?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ userId, compact = false }) => {
  const xpProfile = xpService.getXPProfile(userId);
  const levelInfo = xpService.getLevelFromXP(xpProfile.totalXP);
  const [showHistory, setShowHistory] = useState(false);

  const progressPercent = levelInfo.percentToNextLevel;

  if (compact) {
    return (
      <View className="bg-amber-50 rounded-lg p-3 border border-amber-200">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-amber-600 text-base font-semibold">
              🏆 {xpProfile.rankTitle}
            </Text>
            <Text className="text-gray-600 text-sm">Level {xpProfile.level}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View className="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
          <View
            className="bg-yellow-400 h-full"
            style={{ width: `${progressPercent}%` }}
          />
        </View>

        <Text className="text-gray-600 text-xs">
          {levelInfo.xpIntoCurrentLevel} / {levelInfo.totalForCurrentLevel} XP
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="bg-gradient-to-b from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
        {/* Header with rank and level */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full p-3 w-16 h-16 items-center justify-center">
              <Text className="text-2xl">🏆</Text>
            </View>
            <View>
              <Text className="text-2xl font-bold text-gray-900">
                {xpProfile.rankTitle}
              </Text>
              <Text className="text-sm text-gray-600">Level {xpProfile.level}</Text>
            </View>
          </View>
        </View>

        {/* History button */}
        <TouchableOpacity
          onPress={() => setShowHistory(true)}
          className="bg-white border border-amber-200 rounded-lg px-3 py-1 mb-4"
        >
          <Text className="text-amber-700 text-sm font-medium">History</Text>
        </TouchableOpacity>

        {/* Progress bar */}
        <View className="mb-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-semibold text-gray-700">
              Progress to Level {xpProfile.level + 1}
            </Text>
            <Text className="text-xs font-semibold text-gray-600">
              {progressPercent}%
            </Text>
          </View>
          <View className="bg-gray-300 rounded-full h-4 overflow-hidden">
            <View
              className="bg-gradient-to-r from-amber-400 to-orange-400 h-full"
              style={{ width: `${progressPercent}%` }}
            />
          </View>
        </View>

        {/* XP numbers */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-700 font-medium text-sm">
            {levelInfo.xpIntoCurrentLevel.toLocaleString()} /{' '}
            {levelInfo.totalForCurrentLevel.toLocaleString()} XP
          </Text>
          <Text className="text-gray-600 text-sm">
            Total: {xpProfile.totalXP.toLocaleString()} XP
          </Text>
        </View>

        {/* Next level info */}
        <View className="bg-white/50 rounded-lg border border-amber-100 p-2">
          <Text className="text-xs text-gray-600">
            <Text className="font-semibold text-amber-700">
              {levelInfo.xpIntoNextLevel.toLocaleString()} XP
            </Text>{' '}
            until Level {xpProfile.level + 1}
          </Text>
        </View>
      </View>

      {/* History modal */}
      {showHistory && (
        <XPHistoryModal
          userId={userId}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  );
};
