/**
 * Mobile Match Clock Component
 * Displays timer and clock controls (start, pause, reset)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MatchClockProps {
  timeRemaining: number; // seconds
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const MatchClock: React.FC<MatchClockProps> = ({
  timeRemaining,
  isRunning,
  onStart,
  onPause,
  onReset
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining <= 10;

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <View style={[styles.timerContainer, isLowTime && styles.lowTimeContainer]}>
        <Text style={styles.timeLabel}>Time</Text>
        <Text style={[styles.timer, isLowTime && styles.lowTimer]}>
          {formatTime(timeRemaining)}
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={onStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.pauseButton]}
          onPress={onPause}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center'
  },
  timerContainer: {
    marginBottom: 16,
    alignItems: 'center'
  },
  lowTimeContainer: {
    backgroundColor: '#991B1B'
  },
  timeLabel: {
    color: '#D1D5DB',
    fontSize: 12,
    marginBottom: 4
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  lowTimer: {
    color: '#FCA5A5'
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%'
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButton: {
    backgroundColor: '#10B981'
  },
  pauseButton: {
    backgroundColor: '#F59E0B'
  },
  resetButton: {
    backgroundColor: '#6B7280'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  }
});
