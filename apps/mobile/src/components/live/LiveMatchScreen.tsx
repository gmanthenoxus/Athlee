/**
 * Mobile Live Match Screen Component
 * Main orchestrator for live match state management and UI rendering
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Scoreboard } from './Scoreboard';
import { MatchClock } from './MatchClock';
import { PlayerStatCard } from './PlayerStatCard';
import { EndMatchDialog } from './EndMatchDialog';
import { liveMatchService } from '../../lib/liveMatchService';
import { matchService } from '../../lib/matchService';
import { statEntryService } from '../../lib/statEntryService';
import { LiveMatchState } from '../../lib/live-match-types';

interface LiveMatchScreenProps {
  matchId: string;
}

export const LiveMatchScreen: React.FC<LiveMatchScreenProps> = ({ matchId }) => {
  const router = useRouter();
  const [match, setMatch] = useState(matchService.getMatch(matchId));
  const [liveState, setLiveState] = useState<LiveMatchState | null>(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize live match state on mount
  useEffect(() => {
    if (!match) {
      setError(`Match ${matchId} not found`);
      setLoading(false);
      return;
    }

    const initialState = liveMatchService.initialize(match);
    setLiveState(initialState);
    liveMatchService.saveState(initialState);
    setLoading(false);
  }, [match, matchId]);

  // Clock tick timer (1s interval when running)
  useEffect(() => {
    if (!liveState?.clock.isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setLiveState((prev) => (prev ? liveMatchService.tickClock(prev) : null));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [liveState?.clock.isRunning]);

  // Auto-save live state (10s interval)
  useEffect(() => {
    if (!liveState) return;

    autoSaveRef.current = setInterval(() => {
      liveMatchService.saveState(liveState);
    }, 10000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [liveState]);

  const handleStartClock = () => {
    if (liveState) {
      const updated = liveMatchService.startClock(liveState);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    }
  };

  const handlePauseClock = () => {
    if (liveState) {
      const updated = liveMatchService.pauseClock(liveState);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    }
  };

  const handleResetClock = () => {
    if (liveState) {
      const updated = liveMatchService.resetClock(liveState);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    }
  };

  const handleNextPeriod = () => {
    if (liveState) {
      const updated = liveMatchService.nextPeriod(liveState);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    }
  };

  const handleRecordStat = (playerId: string, statKey: string, scoreValue?: number) => {
    if (liveState) {
      const updated = liveMatchService.recordStat(liveState, playerId, statKey, scoreValue);
      setLiveState(updated);
      liveMatchService.saveState(updated);
    }
  };

  const handleEndMatch = async () => {
    if (!liveState || !match) return;

    setIsSaving(true);
    try {
      // Convert live state to match stats format
      const statsData = liveMatchService.convertToMatchStats(liveState);

      // Save stats using statEntryService
      statEntryService.saveMatchStats(
        matchId,
        liveState.sport,
        liveState.statIntensity,
        statsData.playerStats
      );

      // Update match status to Completed
      matchService.updateMatch(matchId, { status: 'Completed' });

      // Clear live state from storage
      liveMatchService.clearState(matchId);

      // Navigate to match detail (shows recorded stats)
      router.push(`/matches/${matchId}` as any);
    } catch (err) {
      setIsSaving(false);
      console.error('Failed to end match:', err);
      setError('Failed to save match stats. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading live match...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.errorButton} onPress={() => router.back()}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!liveState || !match) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Match data not available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const config = match.rules;
  const teamA = match.teams[0];
  const teamB = match.teams[1];
  const statButtons = liveMatchService.getStatButtons(
    match.sport,
    match.statIntensity
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Live Match</Text>

          <TouchableOpacity
            style={styles.endMatchButton}
            onPress={() => setShowEndDialog(true)}
            disabled={isSaving}
          >
            <Text style={styles.endMatchButtonText}>End Match</Text>
          </TouchableOpacity>
        </View>

        {/* Scoreboard */}
        <Scoreboard
          teamAName={teamA?.name || 'Team A'}
          teamBName={teamB?.name || 'Team B'}
          teamAScore={liveState.scores.teamA}
          teamBScore={liveState.scores.teamB}
          period={liveState.clock.currentPeriod}
          periodType={liveState.clock.periodType}
        />

        {/* Match Clock */}
        <MatchClock
          timeRemaining={liveState.clock.timeRemaining}
          isRunning={liveState.clock.isRunning}
          onStart={handleStartClock}
          onPause={handlePauseClock}
          onReset={handleResetClock}
        />

        {/* Period Navigation */}
        {liveState.clock.currentPeriod < liveState.clock.totalPeriods && (
          <TouchableOpacity
            style={[
              styles.nextPeriodButton,
              liveState.clock.isRunning && styles.nextPeriodButtonDisabled
            ]}
            onPress={handleNextPeriod}
            disabled={liveState.clock.isRunning}
          >
            <Text style={styles.nextPeriodButtonText}>Next Period</Text>
          </TouchableOpacity>
        )}

        {/* Team A Players */}
        {teamA && (
          <View style={styles.teamSection}>
            <Text style={styles.teamHeader}>{teamA.name}</Text>
            {teamA.players.map((player) => {
              const playerStats = liveState.playerStats.find(
                (ps) => ps.playerId === player.id
              );
              return playerStats ? (
                <PlayerStatCard
                  key={player.id}
                  playerStats={playerStats}
                  statButtons={statButtons}
                  onStatClick={(statKey, scoreValue) =>
                    handleRecordStat(player.id, statKey, scoreValue)
                  }
                  jerseyNo={player.jerseyNo}
                />
              ) : null;
            })}
          </View>
        )}

        {/* Team B Players */}
        {teamB && (
          <View style={styles.teamSection}>
            <Text style={styles.teamHeader}>{teamB.name}</Text>
            {teamB.players.map((player) => {
              const playerStats = liveState.playerStats.find(
                (ps) => ps.playerId === player.id
              );
              return playerStats ? (
                <PlayerStatCard
                  key={player.id}
                  playerStats={playerStats}
                  statButtons={statButtons}
                  onStatClick={(statKey, scoreValue) =>
                    handleRecordStat(player.id, statKey, scoreValue)
                  }
                  jerseyNo={player.jerseyNo}
                />
              ) : null;
            })}
          </View>
        )}
      </ScrollView>

      {/* End Match Dialog */}
      {showEndDialog && (
        <EndMatchDialog
          teamAName={teamA?.name || 'Team A'}
          teamBName={teamB?.name || 'Team B'}
          scores={liveState.scores}
          onConfirm={handleEndMatch}
          onCancel={() => setShowEndDialog(false)}
          isLoading={isSaving}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827'
  },
  container: {
    flex: 1,
    backgroundColor: '#111827'
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 12
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center'
  },
  errorButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151'
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  backButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  endMatchButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  endMatchButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },
  nextPeriodButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center'
  },
  nextPeriodButtonDisabled: {
    opacity: 0.5
  },
  nextPeriodButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },
  teamSection: {
    marginBottom: 24
  },
  teamHeader: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  }
});
