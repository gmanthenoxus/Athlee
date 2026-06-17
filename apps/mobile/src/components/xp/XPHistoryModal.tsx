/**
 * XPHistoryModal Component (Mobile/React Native)
 * Shows user's recent XP gains with sources and timestamps
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { xpService } from '@/lib/xpService';
import { XPSource } from '@/lib/xp-types';

interface XPHistoryModalProps {
  userId: string;
  onClose: () => void;
}

const SOURCE_LABELS: Record<XPSource, string> = {
  [XPSource.MatchCompletion]: 'Match Completed',
  [XPSource.MatchWin]: 'Match Won',
  [XPSource.MVP]: 'MVP Award',
  [XPSource.Badge]: 'Badge Earned',
  [XPSource.Milestone]: 'Milestone',
  [XPSource.Referral]: 'Referral'
};

const SOURCE_COLORS: Record<XPSource, string> = {
  [XPSource.MatchCompletion]: '#DBEAFE',
  [XPSource.MatchWin]: '#DCFCE7',
  [XPSource.MVP]: '#E9D5FF',
  [XPSource.Badge]: '#FEF3C7',
  [XPSource.Milestone]: '#FEDBA8',
  [XPSource.Referral]: '#FBCFE8'
};

export const XPHistoryModal: React.FC<XPHistoryModalProps> = ({ userId, onClose }) => {
  const history = useMemo(() => xpService.getXPHistory(userId, 30), [userId]);

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-4/5">
          {/* Header */}
          <View className="items-center py-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-900">XP History</Text>
          </View>

          {/* Content */}
          <ScrollView className="flex-1 p-4">
            {history.length === 0 ? (
              <View className="items-center py-8">
                <Text className="text-lg text-gray-600 font-semibold">No XP history yet</Text>
                <Text className="text-sm text-gray-500 mt-2">
                  Complete matches and earn badges to start gaining XP!
                </Text>
              </View>
            ) : (
              <View className="gap-3">
                {history.map((entry) => {
                  const sourceLabel = SOURCE_LABELS[entry.source];
                  const bgColor = SOURCE_COLORS[entry.source];

                  return (
                    <View
                      key={entry.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                      style={{ backgroundColor: bgColor }}
                    >
                      <View className="flex-row items-start gap-3">
                        {/* Content */}
                        <View className="flex-1">
                          <View className="flex-row items-center justify-between gap-2">
                            <Text className="font-semibold text-gray-900 text-sm">
                              {sourceLabel}
                            </Text>
                            <Text className="text-lg font-bold text-amber-600">
                              +{entry.amount}
                            </Text>
                          </View>
                          <Text className="text-xs text-gray-600 mt-0.5">
                            {entry.description}
                          </Text>
                          <Text className="text-xs text-gray-500 mt-1">
                            {formatDate(entry.timestamp)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View className="border-t border-gray-200 p-4 bg-gray-50">
            <TouchableOpacity
              onPress={onClose}
              className="bg-blue-600 rounded-lg py-2"
            >
              <Text className="text-white font-semibold text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
