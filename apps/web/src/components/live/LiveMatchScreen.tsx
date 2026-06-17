'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { liveMatchService } from '@/lib/liveMatchService';
import { matchService } from '@/lib/matchService';
import { statEntryService } from '@/lib/statEntryService';
import type { Match } from '@/lib/match-types';
import { MatchStatus } from '@/lib/match-types';
import type { LiveMatchState } from '@/lib/live-match-types';
import { Scoreboard } from './Scoreboard';
import { MatchClock } from './MatchClock';
import { PlayerStatCard } from './PlayerStatCard';
import { EndMatchDialog } from './EndMatchDialog';

interface LiveMatchScreenProps {
  matchId: string;
}

/**
 * Live match screen for real-time stat tracking
 */
export function LiveMatchScreen({ matchId }: LiveMatchScreenProps) {
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [liveState, setLiveState] = useState<LiveMatchState | null>(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Load match on mount
  useEffect(() => {
    try {
      const m = matchService.getMatch(matchId);
      if (!m) {
        setError('Match not found');
        return;
      }
      setMatch(m);

      // Initialize live match
      const live = liveMatchService.initialize(m);
      setLiveState(live);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load match');
    }
  }, [matchId]);

  // Clock tick effect
  useEffect(() => {
    if (!liveState?.clock.isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setLiveState((prev) => (prev ? liveMatchService.tickClock(prev) : null));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [liveState?.clock.isRunning]);

  // Auto-save effect (every 10 seconds)
  useEffect(() => {
    if (!liveState) return;

    autoSaveRef.current = setInterval(() => {
      liveMatchService.saveState(liveState);
    }, 10000);

    return () => {
      if (autoSaveRef.current) {
        clearInterval(autoSaveRef.current);
        autoSaveRef.current = null;
      }
    };
  }, [liveState]);

  const handleStartClock = useCallback(() => {
    if (!liveState) return;
    const updated = liveMatchService.startClock(liveState);
    setLiveState(updated);
    liveMatchService.saveState(updated);
  }, [liveState]);

  const handlePauseClock = useCallback(() => {
    if (!liveState) return;
    const updated = liveMatchService.pauseClock(liveState);
    setLiveState(updated);
    liveMatchService.saveState(updated);
  }, [liveState]);

  const handleResetClock = useCallback(() => {
    if (!liveState || !match) return;
    const periodDuration = ((match.rules as any)?.periodDuration || 10) * 60;
    const updated = liveMatchService.resetClock(liveState, periodDuration);
    setLiveState(updated);
    liveMatchService.saveState(updated);
  }, [liveState, match]);

  const handleNextPeriod = useCallback(() => {
    if (!liveState) return;
    const updated = liveMatchService.nextPeriod(liveState);
    setLiveState(updated);
    liveMatchService.saveState(updated);
  }, [liveState]);

  const handleRecordStat = useCallback(
    (playerId: string, statKey: string, scoreValue?: number) => {
      if (!liveState) return;
      const updated = liveMatchService.recordStat(liveState, playerId, statKey, scoreValue);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    },
    [liveState]
  );

  const handleEndMatch = useCallback(async () => {
    if (!liveState || !match) return;

    setIsSaving(true);
    try {
      // Convert live state to match stats
      const matchStats = liveMatchService.convertToMatchStats(liveState);

      // Save stats
      statEntryService.saveMatchStats(matchId, matchStats.playerStats);

      // Update match status to Completed
      matchService.updateMatch(matchId, { status: MatchStatus.Completed });

      // Clear live state
      liveMatchService.clearState(matchId);

      // Navigate to match detail (shows recorded stats)
      setShowEndDialog(false);
      router.push(`/matches/${matchId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end match');
      setIsSaving(false);
    }
  }, [liveState, match, matchId, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-900">Error</h2>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!match || !liveState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4" />
          <p className="text-gray-600">Loading live match...</p>
        </div>
      </div>
    );
  }

  const statButtons = liveMatchService.getStatButtons(liveState.sport, liveState.statIntensity);
  const teamAPlayers = liveState.playerStats.slice(0, Math.ceil(liveState.playerStats.length / 2));
  const teamBPlayers = liveState.playerStats.slice(Math.ceil(liveState.playerStats.length / 2));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (liveState.scores.teamA > 0 || liveState.scores.teamB > 0) {
                if (!window.confirm('Exit without saving stats?')) {
                  return;
                }
              }
              router.back();
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Live Match</h1>
          <button
            onClick={() => setShowEndDialog(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            End Match
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Scoreboard */}
        <div className="mb-6">
          <Scoreboard
            teamAName={match.teams[0]?.name || 'Team A'}
            teamBName={match.teams[1]?.name || 'Team B'}
            teamAScore={liveState.scores.teamA}
            teamBScore={liveState.scores.teamB}
            period={liveState.clock.currentPeriod}
            periodType={liveState.clock.periodType}
          />
        </div>

        {/* Clock */}
        <div className="mb-6">
          <MatchClock
            timeRemaining={liveState.clock.timeRemaining}
            isRunning={liveState.clock.isRunning}
            onStart={handleStartClock}
            onPause={handlePauseClock}
            onReset={handleResetClock}
          />
        </div>

        {/* Period Navigation */}
        {liveState.clock.currentPeriod < liveState.clock.totalPeriods && (
          <div className="mb-6 flex gap-2 justify-center">
            <button
              onClick={handleNextPeriod}
              disabled={liveState.clock.isRunning}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Next Period →
            </button>
          </div>
        )}

        {/* Player Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Team A */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {match.teams[0]?.name || 'Team A'}
            </h2>
            <div className="space-y-4">
              {teamAPlayers.map((player) => (
                <PlayerStatCard
                  key={player.playerId}
                  player={player}
                  statButtons={statButtons}
                  onStatClick={(statKey) => {
                    const button = Object.values(statButtons).find((b) => b.statKey === statKey);
                    handleRecordStat(player.playerId, statKey, button?.scoreValue);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Team B */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {match.teams[1]?.name || 'Team B'}
            </h2>
            <div className="space-y-4">
              {teamBPlayers.map((player) => (
                <PlayerStatCard
                  key={player.playerId}
                  player={player}
                  statButtons={statButtons}
                  onStatClick={(statKey) => {
                    const button = Object.values(statButtons).find((b) => b.statKey === statKey);
                    handleRecordStat(player.playerId, statKey, button?.scoreValue);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* End Match Dialog */}
      {showEndDialog && (
        <EndMatchDialog
          teamAName={match.teams[0]?.name || 'Team A'}
          teamBName={match.teams[1]?.name || 'Team B'}
          teamAScore={liveState.scores.teamA}
          teamBScore={liveState.scores.teamB}
          onConfirm={handleEndMatch}
          onCancel={() => setShowEndDialog(false)}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
