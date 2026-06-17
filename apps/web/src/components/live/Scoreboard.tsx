import React from 'react';

interface ScoreboardProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  period: number;
  periodType: string;
}

/**
 * Scoreboard component showing team names and current scores
 */
export function Scoreboard({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  period,
  periodType
}: ScoreboardProps) {
  const periodLabel =
    periodType === 'quarter'
      ? `Q${period}`
      : periodType === 'half'
        ? `Half ${period}`
        : `P${period}`;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{periodLabel}</h2>
        <span className="text-sm opacity-75">LIVE</span>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Team A */}
        <div className="text-center border-r border-blue-400 pr-4">
          <p className="text-sm opacity-90 mb-1">{teamAName}</p>
          <p className="text-5xl font-bold">{teamAScore}</p>
        </div>

        {/* VS */}
        <div className="text-center">
          <p className="text-sm font-semibold opacity-75">VS</p>
        </div>

        {/* Team B */}
        <div className="text-center border-l border-blue-400 pl-4">
          <p className="text-sm opacity-90 mb-1">{teamBName}</p>
          <p className="text-5xl font-bold">{teamBScore}</p>
        </div>
      </div>
    </div>
  );
}
