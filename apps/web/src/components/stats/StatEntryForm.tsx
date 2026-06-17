'use client';

import React, { useState, useEffect } from 'react';
import { Match, MatchStatus, MatchMode } from '@/lib/match-types';
import { PlayerMatchStat, SportStatSchema } from '@/lib/stat-types';
import { statSchemaService } from '@/lib/statSchemaService';
import { statEntryService } from '@/lib/statEntryService';
import { statAggregator } from '@/lib/statAggregator';
import { statsAggregationService } from '@/lib/statsAggregationService';
import { matchService } from '@/lib/matchService';
import { playerClaimService } from '@/lib/playerClaimService';
import { badgeEvaluationService } from '@/lib/badgeEvaluationService';
import { badgeAwardService } from '@/lib/badgeAwardService';
import { xpService } from '@/lib/xpService';
import { milestoneService } from '@/lib/milestoneService';
import { XP_AWARDS, XPSource } from '@/lib/xp-types';
import { useAuth } from '@/hooks/useAuth';
import { TeamStatTable } from './TeamStatTable';
import { MatchXPSummary, MatchXPBreakdown } from '@/components/xp/MatchXPSummary';
import { AlertCircle, CheckCircle, Trophy } from 'lucide-react';

interface StatEntryFormProps {
  match: Match;
  onSave?: (matchStats: any) => void;
  onCancel?: () => void;
}

/**
 * Main stat entry form for recording match stats
 */
export function StatEntryForm({
  match,
  onSave,
  onCancel
}: StatEntryFormProps) {
  const { user } = useAuth();
  const [schema, setSchema] = useState<SportStatSchema | null>(null);
  const [teamAStats, setTeamAStats] = useState<PlayerMatchStat[]>([]);
  const [teamBStats, setTeamBStats] = useState<PlayerMatchStat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [claimLinks, setClaimLinks] = useState<Map<string, string>>(new Map());
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [xpBreakdown, setXpBreakdown] = useState<MatchXPBreakdown | null>(null);

  // Initialize schema and stats
  useEffect(() => {
    if (match.sport && match.statIntensity) {
      const loadedSchema = statSchemaService.getSchema(match.sport, match.statIntensity);
      if (loadedSchema) {
        setSchema(loadedSchema);

        // Initialize player stats
        const teamA = match.teams[0] || { id: 'team_a', name: 'Team A', players: [] };
        const teamB = match.teams[1] || { id: 'team_b', name: 'Team B', players: [] };

        setTeamAStats(
          statEntryService.initializePlayerStats(
            teamA.players.map((p) => ({ id: p.id, name: p.name })),
            loadedSchema
          )
        );
        setTeamBStats(
          statEntryService.initializePlayerStats(
            teamB.players.map((p) => ({ id: p.id, name: p.name })),
            loadedSchema
          )
        );
      }
    }
  }, [match]);

  const handleSave = async () => {
    try {
      setError('');
      setLoading(true);

      if (!schema) {
        throw new Error('Schema not loaded');
      }

      // Validate stats
      const allStats = [...teamAStats, ...teamBStats];
      const validation = statEntryService.validateStats(allStats, schema);
      if (!validation.valid) {
        setError(validation.errors.join('; '));
        setLoading(false);
        return;
      }

      // Save stats
      const matchStats = statEntryService.saveMatchStats(match.id, allStats);

      // Calculate team stats and final score
      if (match.teams[0] && match.teams[1] && match.rules) {
        const teamATotal = statAggregator.calculateTeamStats(teamAStats, match.teams[0].id);
        const teamBTotal = statAggregator.calculateTeamStats(teamBStats, match.teams[1].id);
        const scores = statAggregator.calculateTeamScores(teamAStats, teamBStats, match.rules);

        matchStats.teamStats = [teamATotal, teamBTotal];
        matchStats.finalScore = { teamA: scores.teamA, teamB: scores.teamB };

        // Save updated match stats
        statEntryService.saveMatchStats(match.id, allStats);
      }

      // Mark match as completed
      matchService.updateMatch(match.id, { status: MatchStatus.Completed });

      // NEW: Aggregate player stats for leaderboards
      statsAggregationService.updateUserStatsFromMatch(match.id);

      // NEW: Evaluate badges for the current user
      const userEarnedBadgesBefore = user?.id 
        ? badgeAwardService.getUserEarnedBadgeIds(user.id)
        : [];
      
      badgeEvaluationService.evaluateUserBadges(user?.id || '', {
        type: 'match',
        userId: user?.id || '',
        matchId: match.id,
        sport: match.sport,
      });

      // Get newly earned badges
      const userEarnedBadgesAfter = user?.id
        ? badgeAwardService.getUserEarnedBadgeIds(user.id)
        : [];
      const newlyEarned = userEarnedBadgesAfter.filter((id) => !userEarnedBadgesBefore.includes(id));
      setNewBadges(newlyEarned);

      // NEW: Calculate and award XP
      if (user?.id) {
        const xpBeforeMatch = xpService.getXPProfile(user.id).totalXP;

        let totalXP = 0;
        let matchXP = 0;
        let winXP = 0;
        let mvpXP = 0;

        // 1. Base XP for match completion
        matchXP = match.mode === MatchMode.Competitive ? XP_AWARDS.COMPETITIVE_MATCH : XP_AWARDS.CASUAL_MATCH;
        xpService.awardXP(user.id, matchXP, XPSource.MatchCompletion, 'Completed match');
        totalXP += matchXP;

        // 2. Win bonus
        // Find current player in match
        const playerTeam = [...(match.teams[0]?.players || []), ...(match.teams[1]?.players || [])]
          .findIndex((p) => p.userId === user.id);
        
        if (playerTeam >= 0) {
          const teamIndex = playerTeam < (match.teams[0]?.players || []).length ? 0 : 1;
          const playerStats = (teamIndex === 0 ? teamAStats : teamBStats).find((s) => {
            const teamPlayers = teamIndex === 0 ? match.teams[0]?.players : match.teams[1]?.players;
            return teamPlayers?.some((p) => p.userId === user.id);
          });

          if (playerStats && match.rules) {
            // Determine winning team
            const scores = statAggregator.calculateTeamScores(teamAStats, teamBStats, match.rules);
            const winningTeamIndex = scores.teamA > scores.teamB ? 0 : scores.teamB > scores.teamA ? 1 : -1;

            if (winningTeamIndex !== -1 && winningTeamIndex === teamIndex) {
              winXP = XP_AWARDS.MATCH_WIN;
              xpService.awardXP(user.id, winXP, XPSource.MatchWin, 'Won match');
              totalXP += winXP;
            }

            // 3. MVP bonus (player with most points on winning team)
            if (winningTeamIndex !== -1) {
              const winningTeamStats = winningTeamIndex === 0 ? teamAStats : teamBStats;
              const mvpPlayer = winningTeamStats.reduce((prev, current) => {
                const prevPoints = (prev.values.points || prev.values.PTS || 0);
                const currentPoints = (current.values.points || current.values.PTS || 0);
                return currentPoints > prevPoints ? current : prev;
              });

              const playerIsNotMVP = mvpPlayer.playerId !== playerStats.playerId;
              if (!playerIsNotMVP) {
                mvpXP = XP_AWARDS.MVP;
                xpService.awardXP(user.id, mvpXP, XPSource.MVP, 'Awarded MVP');
                totalXP += mvpXP;
              }
            }
          }
        }

        // 4. Badge XP
        const badgeXP = newlyEarned.length * XP_AWARDS.BADGE_EARNED;
        if (badgeXP > 0) {
          xpService.awardXP(user.id, badgeXP, XPSource.Badge, `Earned ${newlyEarned.length} new badge${newlyEarned.length > 1 ? 's' : ''}`);
          totalXP += badgeXP;
        }

        // 5. Milestone XP
        const milestoneXP = milestoneService.checkAndAwardMilestones(user.id);
        totalXP += milestoneXP;

        // Check if leveled up
        const xpAfterMatch = xpService.getXPProfile(user.id).totalXP;
        const leveledUp = xpService.didLevelUp(xpBeforeMatch, xpAfterMatch);
        const newLevelInfo = leveledUp ? xpService.getLevelFromXP(xpAfterMatch) : null;

        setXpBreakdown({
          matchXP,
          winXP,
          mvpXP,
          totalXP,
          leveledUp,
          newLevel: newLevelInfo?.level,
          newRank: newLevelInfo?.rankTitle
        });
      }

      // Generate claim tokens for unregistered players
      const newClaimLinks = new Map<string, string>();
      const allPlayers = [...match.teams[0]?.players || [], ...match.teams[1]?.players || []];
      
      allPlayers.forEach((player) => {
        if (!player.userId) {
          // Player is unregistered - generate claim token
          const token = playerClaimService.generateClaimToken(
            player.id,
            player.name,
            match.id,
            match.sport
          );
          const claimLink = playerClaimService.generateClaimLink(token);
          newClaimLinks.set(player.id, claimLink);
        }
      });

      if (newClaimLinks.size > 0) {
        setClaimLinks(newClaimLinks);
      }

      setSuccess(true);
      setTimeout(() => {
        onSave?.(matchStats);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save stats');
      setLoading(false);
    }
  };

  if (!schema) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading schema...</p>
      </div>
    );
  }

  const teamA = match.teams[0] || { id: 'team_a', name: 'Team A', players: [] };
  const teamB = match.teams[1] || { id: 'team_b', name: 'Team B', players: [] };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Record Match Stats</h2>
        <p className="text-gray-600 mt-1">
          Enter stats for {match.sport} match ({match.statIntensity} stats)
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Error</p>
            <p className="text-sm text-red-800 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Success Alert with XP, Badges & Claim Links */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Stats Saved</p>
              <p className="text-sm text-green-800 mt-1">Match stats have been recorded successfully</p>
            </div>
          </div>

          {/* XP Summary */}
          {xpBreakdown && (
            <div className="border-t border-green-200 pt-4">
              <MatchXPSummary breakdown={xpBreakdown} />
            </div>
          )}

          {/* New Badges Alert */}
          {newBadges.length > 0 && (
            <div className="pt-4 border-t border-green-200 bg-yellow-50 rounded p-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-semibold text-yellow-900">
                  🏆 You earned {newBadges.length} new badge{newBadges.length > 1 ? 's' : ''}!
                </p>
              </div>
              <p className="text-xs text-yellow-800 mt-2">
                Check your profile to see your new achievements!
              </p>
            </div>
          )}

          {/* Claim Links for Unregistered Players */}
          {claimLinks.size > 0 && (
            <div className="mt-3 pt-4 border-t border-green-200 space-y-2">
              <p className="text-sm font-medium text-green-900">Share sign-up links with players:</p>
              {Array.from(claimLinks.entries()).map(([playerId, link]) => {
                const player = [...(match.teams[0]?.players || []), ...(match.teams[1]?.players || [])].find(
                  (p) => p.id === playerId
                );
                return (
                  <div key={playerId} className="flex items-center justify-between gap-2 bg-white p-2 rounded">
                    <span className="text-sm text-gray-700">{player?.name}:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(link);
                        // Show toast notification would go here
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                    >
                      Copy Link
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team A */}
        <TeamStatTable
          teamName={teamA.name}
          players={teamAStats}
          statKeys={schema.statKeys}
          onChange={setTeamAStats}
        />

        {/* Team B */}
        <TeamStatTable
          teamName={teamB.name}
          players={teamBStats}
          statKeys={schema.statKeys}
          onChange={setTeamBStats}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-between sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6 px-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading || success}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Saving...' : success ? 'Saved!' : 'Save Stats'}
        </button>
      </div>
    </div>
  );
}
