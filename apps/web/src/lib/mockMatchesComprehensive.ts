/**
 * Comprehensive Match Generator
 * 
 * Generates 2,500+ realistic matches with:
 * - Scheduled (future): ~200 matches
 * - In Progress (now): ~500 matches
 * - Completed (past): ~1,800 matches
 * - Multiple sports and formats
 * - Participant players from 100+ user ecosystem
 * - Realistic scores and timing
 * - Links to comprehensive locations
 */

import {
  Match,
  MatchType,
  MatchMode,
  MatchStatus,
  StatIntensity,
  Team,
  MatchRules,
  MatchScore,
  TeamSizeConfig,
} from './match-types';
import { SportType } from './location-types';
import { getAllPlayerUsers } from './mockUsersComprehensive';

const SPORTS = [
  SportType.Basketball,
  SportType.Soccer,
  SportType.Tennis,
  SportType.Badminton,
  SportType.Volleyball,
];

const MATCH_TYPES_BY_SPORT: Record<SportType, MatchType[]> = {
  [SportType.Basketball]: [MatchType.Single, MatchType.Rotational],
  [SportType.Soccer]: [MatchType.Single, MatchType.Rotational],
  [SportType.Tennis]: [MatchType.SetBased, MatchType.Single],
  [SportType.Badminton]: [MatchType.Single, MatchType.SetBased],
  [SportType.Volleyball]: [MatchType.SetBased],
  [SportType.Pickleball]: [MatchType.Single, MatchType.SetBased],
  [SportType.Baseball]: [MatchType.Single],
  [SportType.American_Football]: [MatchType.Single],
};

const TEAM_SIZE_CONFIGS: Record<number, TeamSizeConfig> = {
  1: { label: '1v1', playersPerTeam: 1, substitutes: 1 },
  2: { label: '2v2', playersPerTeam: 2, substitutes: 2 },
  3: { label: '3v3', playersPerTeam: 3, substitutes: 2 },
  5: { label: '5v5', playersPerTeam: 5, substitutes: 7 },
};

/**
 * Generate a random date with distribution for different states
 */
function generateDateForState(state: MatchStatus): Date {
  const now = new Date();
  let date: Date;

  if (state === MatchStatus.Scheduled) {
    // Future dates: 1-60 days from now
    const daysAhead = Math.floor(Math.random() * 60) + 1;
    date = new Date(now);
    date.setDate(date.getDate() + daysAhead);
  } else if (state === MatchStatus.InProgress) {
    // Current time (within last hour)
    const minutesAgo = Math.floor(Math.random() * 60);
    date = new Date(now);
    date.setMinutes(date.getMinutes() - minutesAgo);
  } else {
    // Completed: past dates 1-90 days ago
    const daysAgo = Math.floor(Math.random() * 90) + 1;
    date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
  }

  // Set random time of day
  date.setHours(
    Math.floor(Math.random() * 18) + 6, // 6 AM - 11 PM
    Math.floor(Math.random() * 60),
    0,
    0
  );

  return date;
}

/**
 * Generate a team with random players
 */
function generateTeam(
  teamNumber: number,
  sport: SportType,
  teamSize: number,
  allPlayers: any[],
  excludePlayers: Set<string> = new Set()
): Team {
  const availablePlayers = allPlayers.filter(p => !excludePlayers.has(p.id));
  const shuffled = [...availablePlayers].sort(() => Math.random() - 0.5);
  const teamPlayers = shuffled.slice(0, teamSize);

  return {
    id: `team_${teamNumber}_${Date.now()}`,
    name: `Team ${String.fromCharCode(65 + teamNumber)}`,
    players: teamPlayers.map(p => ({
      id: `mp_${p.id}_${Math.random()}`,
      name: p.username,
      userId: p.id,
      jerseyNo: String(Math.floor(Math.random() * 99) + 1),
    })),
  };
}

/**
 * Generate match rules based on sport and mode
 */
function generateRules(
  sport: SportType,
  mode: MatchMode
): MatchRules {
  const baseRules: MatchRules = {
    presetName: mode === MatchMode.Competitive ? 'Competitive Standard' : 'Casual Play',
    gameFormat: 'timed',
    periodStructure: 'halves',
    periodDuration: mode === MatchMode.Competitive ? 20 : 15,
    overtimeFormat: '5min',
    shotClock: '24',
    pointsInside: 2,
    pointsOutside: 3,
    freeThrowValue: 1,
    personalFoulLimit: '5',
    teamFoulLimit: '5perQtr',
    bonusAfter: '5',
    technicalFoulValue: '1ftPos',
    flagrantFoulPenalty: '2ftPos',
    backcourt: '8',
    threeSecondViolation: 'both',
    goaltendingAllowed: false,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'nba',
    substitutions: 'unlimited',
    shotClockResetAfter: 'made',
    jumpBallRule: 'tipoff',
  };

  // Sport-specific tweaks
  if (sport === SportType.Tennis) {
    baseRules.gameFormat = 'firstTo';
    baseRules.winningScore = 2;
    baseRules.winByTwo = true;
  } else if (sport === SportType.Soccer) {
    baseRules.periodDuration = mode === MatchMode.Competitive ? 45 : 30;
  } else if (sport === SportType.Volleyball) {
    baseRules.winningScore = 25;
    baseRules.winByTwo = true;
  }

  return baseRules;
}

/**
 * Generate realistic score for completed match
 */
function generateScore(sport: SportType, team1: Team, team2: Team): MatchScore {
  let team1Score = 0;
  let team2Score = 0;

  switch (sport) {
    case SportType.Basketball:
      team1Score = Math.floor(Math.random() * 40) + 60;
      team2Score = Math.floor(Math.random() * 40) + 60;
      break;
    case SportType.Soccer:
      team1Score = Math.floor(Math.random() * 3);
      team2Score = Math.floor(Math.random() * 3);
      if (team1Score === team2Score && Math.random() > 0.5) {
        team1Score++;
      }
      break;
    case SportType.Tennis:
      team1Score = Math.floor(Math.random() * 2) + 1;
      team2Score = Math.floor(Math.random() * 2) + 1;
      break;
    case SportType.Volleyball:
      team1Score = Math.floor(Math.random() * 5) + 20;
      team2Score = Math.floor(Math.random() * 5) + 20;
      break;
    case SportType.Badminton:
      team1Score = Math.floor(Math.random() * 10) + 15;
      team2Score = Math.floor(Math.random() * 10) + 15;
      break;
    default:
      team1Score = Math.floor(Math.random() * 5);
      team2Score = Math.floor(Math.random() * 5);
  }

  return {
    teamAScore: team1Score,
    teamBScore: team2Score,
    winner: team1Score > team2Score ? 'A' : team2Score > team1Score ? 'B' : undefined,
  };
}

/**
 * Generate a single comprehensive match
 */
function generateMatch(
  index: number,
  state: MatchStatus,
  allPlayers: any[],
  locationId: string
): Match {
  const sport = SPORTS[Math.floor(Math.random() * SPORTS.length)];
  const matchTypes = MATCH_TYPES_BY_SPORT[sport] || [MatchType.Single];
  const matchType = matchTypes[Math.floor(Math.random() * matchTypes.length)];
  const mode = Math.random() > 0.4 ? MatchMode.Casual : MatchMode.Competitive;
  const teamSizeOptions = [1, 2, 3, 5];
  const teamSize = teamSizeOptions[Math.floor(Math.random() * teamSizeOptions.length)];

  // Randomize team structure
  const createdBy = allPlayers[Math.floor(Math.random() * allPlayers.length)].id;

  const team1Players = new Set<string>();
  const team1 = generateTeam(1, sport, teamSize, allPlayers);
  team1.players.forEach(p => team1Players.add(p.userId!));

  const team2 = generateTeam(2, sport, teamSize, allPlayers, team1Players);

  const date = generateDateForState(state);
  const match: Match = {
    id: `match_${String(index).padStart(5, '0')}`,
    sport,
    type: matchType,
    mode,
    teamSize: TEAM_SIZE_CONFIGS[teamSize as keyof typeof TEAM_SIZE_CONFIGS] || {
      min: teamSize,
      max: teamSize,
    },
    statIntensity: mode === MatchMode.Competitive ? StatIntensity.Advanced : StatIntensity.Basic,
    status: state,
    date: date.toISOString(),
    locationId,
    createdBy,
    teams: [team1, team2],
    rules: generateRules(sport, mode),
    privacy: 'public',
    createdAt: new Date(date.getTime() - Math.random() * 60 * 60 * 1000).toISOString(),
    updatedAt: date.toISOString(),
  };

  // Add score if completed
  if (state === MatchStatus.Completed) {
    match.score = generateScore(sport, team1, team2);
  }

  return match;
}

/**
 * Generate comprehensive set of matches
 */
export function generateComprehensiveMatches(config?: {
  scheduledCount?: number;
  inProgressCount?: number;
  completedCount?: number;
  locationIds?: string[];
}): Match[] {
  const {
    scheduledCount = 200,
    inProgressCount = 500,
    completedCount = 1800,
    locationIds = Array.from({ length: 30 }, (_, i) => `location_${String(i).padStart(3, '0')}`),
  } = config || {};

  const matches: Match[] = [];
  const allPlayers = getAllPlayerUsers();

  if (allPlayers.length === 0) {
    console.warn('⚠️ No players found. Generate players first: initializeComprehensiveMockDataEcosystem()');
    return [];
  }

  let index = 0;

  // Generate scheduled matches
  console.log(`Generating ${scheduledCount} scheduled matches...`);
  for (let i = 0; i < scheduledCount; i++) {
    const locationId = locationIds[Math.floor(Math.random() * locationIds.length)];
    matches.push(generateMatch(index++, MatchStatus.Scheduled, allPlayers, locationId));
  }

  // Generate in-progress matches
  console.log(`Generating ${inProgressCount} in-progress matches...`);
  for (let i = 0; i < inProgressCount; i++) {
    const locationId = locationIds[Math.floor(Math.random() * locationIds.length)];
    matches.push(generateMatch(index++, MatchStatus.InProgress, allPlayers, locationId));
  }

  // Generate completed matches
  console.log(`Generating ${completedCount} completed matches...`);
  for (let i = 0; i < completedCount; i++) {
    const locationId = locationIds[Math.floor(Math.random() * locationIds.length)];
    matches.push(generateMatch(index++, MatchStatus.Completed, allPlayers, locationId));
  }

  console.log(`✅ Generated ${matches.length} total matches`);
  return matches;
}

/**
 * Initialize comprehensive matches in localStorage
 */
export function initializeComprehensiveMatches(config?: {
  scheduledCount?: number;
  inProgressCount?: number;
  completedCount?: number;
  locationIds?: string[];
}): void {
  try {
    // Optimize: reduce default match count to prevent localStorage quota exceeded
    const optimizedConfig = {
      scheduledCount: config?.scheduledCount || 100,
      inProgressCount: config?.inProgressCount || 200,
      completedCount: config?.completedCount || 500,
      locationIds: config?.locationIds,
    };

    const matches = generateComprehensiveMatches(optimizedConfig);

    // Store all matches (compressed)
    localStorage.setItem('athlee_matches', JSON.stringify(matches));

    // Create ID-only indices (not full objects) to save space
    const matchIds = matches.map(m => m.id);
    localStorage.setItem('athlee_match_ids', JSON.stringify(matchIds));

    // Create sport-based index (IDs only)
    const sportIndex: Record<string, string[]> = {};
    matches.forEach(m => {
      if (!sportIndex[m.sport]) {
        sportIndex[m.sport] = [];
      }
      sportIndex[m.sport].push(m.id);
    });
    localStorage.setItem('athlee_matches_by_sport', JSON.stringify(sportIndex));

    // Create status-based index (IDs only)
    const statusIndex: Record<string, string[]> = {};
    matches.forEach(m => {
      if (!statusIndex[m.status]) {
        statusIndex[m.status] = [];
      }
      statusIndex[m.status].push(m.id);
    });
    localStorage.setItem('athlee_matches_by_status', JSON.stringify(statusIndex));

    console.log(`Initialized ${matches.length} matches with optimized indices`);
  } catch (error) {
    console.error('Failed to initialize comprehensive matches:', error);
  }
}

/**
 * Get all matches
 */
export function getAllComprehensiveMatches(): Match[] {
  try {
    const stored = localStorage.getItem('athlee_matches');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve matches:', error);
    return [];
  }
}

/**
 * Get match by ID
 */
export function getMatchById(matchId: string): Match | null {
  try {
    const allMatches = getAllComprehensiveMatches();
    return allMatches.find(m => m.id === matchId) || null;
  } catch (error) {
    console.error('Failed to retrieve match:', error);
    return null;
  }
}

/**
 * Get matches by sport
 */
export function getMatchesBySport(sport: SportType): Match[] {
  const matches = getAllComprehensiveMatches();
  return matches.filter(m => m.sport === sport);
}

/**
 * Get matches by status
 */
export function getMatchesByStatus(status: MatchStatus): Match[] {
  const matches = getAllComprehensiveMatches();
  return matches.filter(m => m.status === status);
}

/**
 * Get matches by location
 */
export function getMatchesByLocation(locationId: string): Match[] {
  const matches = getAllComprehensiveMatches();
  return matches.filter(m => m.locationId === locationId);
}

/**
 * Get matches for a specific player
 */
export function getMatchesForPlayer(playerId: string): Match[] {
  const matches = getAllComprehensiveMatches();
  return matches.filter(m =>
    m.teams.some(t =>
      t.players.some(p => p.userId === playerId)
    )
  );
}

/**
 * Clear all match data
 */
export function clearComprehensiveMatches(): void {
  localStorage.removeItem('athlee_all_matches');
  localStorage.removeItem('athlee_match_index');
  localStorage.removeItem('athlee_matches_by_sport');
  localStorage.removeItem('athlee_matches_by_status');
  console.log('Cleared all match data');
}

/**
 * Get match statistics
 */
export function getComprehensiveMatchStats(): {
  total: number;
  byStatus: Record<string, number>;
  bySport: Record<string, number>;
  byTeamSize: Record<string, number>;
} {
  const matches = getAllComprehensiveMatches();

  const stats = {
    total: matches.length,
    byStatus: {} as Record<string, number>,
    bySport: {} as Record<string, number>,
    byTeamSize: {} as Record<string, number>,
  };

  matches.forEach(m => {
    // Status count
    stats.byStatus[m.status] = (stats.byStatus[m.status] || 0) + 1;

    // Sport count
    stats.bySport[m.sport] = (stats.bySport[m.sport] || 0) + 1;

    // Team size count
    const sizeKey = m.teamSize.label;
    stats.byTeamSize[sizeKey] = (stats.byTeamSize[sizeKey] || 0) + 1;
  });

  return stats;
}
