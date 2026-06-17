'use client';

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface MatchClockProps {
  timeRemaining: number; // seconds
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

/**
 * Match clock component with timer and controls
 */
export function MatchClock({
  timeRemaining,
  isRunning,
  onStart,
  onPause,
  onReset
}: MatchClockProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <p className="text-sm opacity-75 mb-2">TIME REMAINING</p>
        <p className={`text-6xl font-mono font-bold tracking-wider ${
          timeRemaining <= 10 ? 'text-red-400 animate-pulse' : ''
        }`}>
          {displayTime}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition-colors"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>
    </div>
  );
}
