import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface StatInputProps {
  value: number;
  onChange: (value: number) => void;
  statAbbreviation: string;
}

/**
 * Mobile stat input with increment/decrement buttons (React Native)
 */
export function StatInput({
  value,
  onChange,
  statAbbreviation
}: StatInputProps) {
  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => onChange(Math.max(0, value - 1));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <TouchableOpacity
        onPress={handleDecrement}
        style={{
          width: 28,
          height: 28,
          borderRadius: 4,
          backgroundColor: '#f3f4f6',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6b7280' }}>−</Text>
      </TouchableOpacity>

      <TextInput
        value={String(value)}
        onChangeText={(text) => onChange(parseInt(text) || 0)}
        keyboardType="numeric"
        style={{
          width: 35,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '600',
          color: '#111827',
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 4,
          paddingVertical: 4
        }}
      />

      <TouchableOpacity
        onPress={handleIncrement}
        style={{
          width: 28,
          height: 28,
          borderRadius: 4,
          backgroundColor: '#f3f4f6',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6b7280' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
