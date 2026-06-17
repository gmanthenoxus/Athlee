import { Match, MatchStatus } from './match-types';
import { MatchStats, PlayerMatchStat } from './stat-types';
import { statSchemaService } from './statSchemaService';
import { statEntryService } from './statEntryService';
import { SportType } from './location-types';

/**
 * Generate realistic random stat values based on sport and stat key
 */
function generateRandomStatValue(sport: SportType, statKey: string): number {
  const ranges: Record<string, Record<string, [number, number]>> = {
    [SportType.Basketball]: {
      points: [8, 25],
      rebounds: [2, 12],
      assists: [1, 8],
      steals: [0, 3],
      blocks: [0, 2],
      turnovers: [1, 5],
      personalFouls: [1, 4],
      threePointsMade: [0, 4],
      threePointsAttempted: [2, 10],
      freeThrowsMade: [0, 6],
      freeThrowsAttempted: [0, 8]
    }
  };

  const sportRanges = ranges[sport] || {};
  const [min, max] = sportRanges[statKey] || [0, 5];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate mock stats for a completed match
 */
export function generateMockStatsForMatch(match: Match): MatchStats | null {
  // Only generate stats for completed matches
  if (match.status !== MatchStatus.Completed) {
    return null;
  }

  // Get the appropriate stat schema
  const schema = statSchemaService.getSchema(match.sport, match.statIntensity);
  if (!schema) {
    console.warn(`No schema found for ${match.sport} / ${match.statIntensity}`);
    return null;
  }

  // Initialize player stats for all players in both teams
  const allPlayers = match.teams.flatMap((team) =>
    team.players.map((p) => ({
      id: p.id,
      name: p.name
    }))
  );

  const playerStats = statEntryService.initializePlayerStats(allPlayers, schema);

  // Generate random values for each stat
  playerStats.forEach((player) => {
    schema.statKeys.forEach((stat) => {
      player.values[stat.id] = generateRandomStatValue(match.sport, stat.id);
    });
  });

  // Save the stats to localStorage
  const savedStats = statEntryService.saveMatchStats(match.id, playerStats);
  return savedStats;
}

/**
 * Generate mock stats for all completed matches
 * This should be called on app initialization
 */
export function initializeMockStats(completedMatches: Match[]): void {
  completedMatches.forEach((match) => {
    // Only generate if no stats already exist
    if (!statEntryService.getMatchStats(match.id)) {
      generateMockStatsForMatch(match);
    }
  });
}

/**
 * Get all matches that have stats recorded
 */
export function getMatchesWithStats(matches: Match[]): Match[] {
  return matches.filter(
    (m) => m.status === MatchStatus.Completed && statEntryService.getMatchStats(m.id)
  );
}

/**
 * Get all matches that need stats entered
 */
export function getMatchesNeedingStats(matches: Match[]): Match[] {
  return matches.filter(
    (m) => m.status === MatchStatus.Completed && !statEntryService.getMatchStats(m.id)
  );
}
