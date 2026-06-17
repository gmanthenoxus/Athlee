/**
 * Mobile Stat Button Component
 * Individual stat increment button (e.g., "+2PT", "+REB")
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface StatButtonProps {
  label: string;
  shortLabel: string;
  value: number;
  onClick: () => void;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const StatButton: React.FC<StatButtonProps> = ({
  label,
  shortLabel,
  value,
  onClick,
  color,
  size = 'md',
  disabled = false
}) => {
  const sizeStyles = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg
  };

  const sizeTextStyles = {
    sm: styles.sizeSmText,
    md: styles.sizeMdText,
    lg: styles.sizeLgText
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        { backgroundColor: color },
        disabled && styles.disabled
      ]}
      onPress={onClick}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, sizeTextStyles[size]]}>
        {size === 'sm' ? shortLabel : label}
      </Text>

      {value > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{value}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  sizeSm: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  sizeSmText: {
    fontSize: 10,
    fontWeight: '600'
  },
  sizeMdText: {
    fontSize: 12,
    fontWeight: '600'
  },
  sizeLgText: {
    fontSize: 14,
    fontWeight: '600'
  },
  label: {
    color: '#FFFFFF'
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  badge: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold'
  },
  disabled: {
    opacity: 0.5
  }
});
