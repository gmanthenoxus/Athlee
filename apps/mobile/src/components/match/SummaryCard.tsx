import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SummaryCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  onEdit?: () => void;
  isEmpty?: boolean;
}

/**
 * Reusable summary card component for displaying match details (React Native)
 */
export function SummaryCard({
  title,
  icon,
  children,
  onEdit,
  isEmpty = false
}: SummaryCardProps) {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#e5e7eb'
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {icon && <Text style={{ fontSize: 20, marginRight: 8 }}>{icon}</Text>}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
            {title}
          </Text>
        </View>
        {onEdit && !isEmpty && (
          <TouchableOpacity
            onPress={onEdit}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: '#eff6ff',
              borderRadius: 6
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#2563eb' }}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ fontSize: 14, color: '#374151' }}>
        {isEmpty ? (
          <Text style={{ fontSize: 14, color: '#9ca3af', fontStyle: 'italic' }}>
            No details added
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
