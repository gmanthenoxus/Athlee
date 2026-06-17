import { SportType } from './location-types';
import { MatchPlayer, PlayerSuggestion, PlayerSuggestionContext } from './match-types';

/**
 * Mock user profile for player suggestions
 */
export interface MockUserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  primarySport: SportType;
  city?: string;
  coordinates?: { lat: number; lng: number };
  friends: string[];              // Array of friend user IDs
  followers: string[];
  locationCheckIns: Map<string, number>; // locationId -> check-in count
  createdAt: string;
}

/**
 * Generate mock user profiles for player suggestions
 */
export function generateMockUsers(): MockUserProfile[] {
  const cities = [
    { lat: 40.7128, lng: -74.006 },   // NYC
    { lat: 40.715, lng: -73.98 },     // NYC East
    { lat: 40.785, lng: -73.968 },    // Harlem
    { lat: 40.72, lng: -73.97 },      // Midtown
  ];

  const users: MockUserProfile[] = [
    // Basketball enthusiasts
    {
      id: 'user_hooper_1',
      name: 'Alex Johnson',
      username: 'hooper_alex',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[0],
      friends: ['user_hooper_2', 'user_hooper_3', 'user_soccer_1'],
      followers: [],
      locationCheckIns: new Map([
        ['loc_basketball_downtown', 15],
        ['loc_basketball_eastside', 8],
      ]),
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_hooper_2',
      name: 'Marcus Lee',
      username: 'ball_marcus',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[1],
      friends: ['user_hooper_1', 'user_hooper_4'],
      followers: ['user_hooper_1'],
      locationCheckIns: new Map([
        ['loc_basketball_downtown', 12],
        ['loc_community_basketball_1', 5],
      ]),
      createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_hooper_3',
      name: 'Jamal Williams',
      username: 'buckets_jam',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[0],
      friends: ['user_hooper_1', 'user_hooper_5'],
      followers: [],
      locationCheckIns: new Map([
        ['loc_basketball_harlem', 20],
        ['loc_basketball_downtown', 4],
      ]),
      createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_hooper_4',
      name: 'Chris Thompson',
      username: 'clutch_chris',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[2],
      friends: ['user_hooper_2'],
      followers: [],
      locationCheckIns: new Map([
        ['loc_basketball_eastside', 10],
        ['loc_basketball_brooklyn', 7],
      ]),
      createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_hooper_5',
      name: 'DeShawn Brown',
      username: 'prime_time',
      primarySport: SportType.Basketball,
      city: 'Brooklyn',
      coordinates: cities[3],
      friends: ['user_hooper_3'],
      followers: ['user_hooper_3', 'user_hooper_1'],
      locationCheckIns: new Map([
        ['loc_basketball_brooklyn', 18],
        ['loc_community_basketball_1', 3],
      ]),
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Soccer players
    {
      id: 'user_soccer_1',
      name: 'David Martinez',
      username: 'striker_dave',
      primarySport: SportType.Soccer,
      city: 'New York',
      coordinates: cities[0],
      friends: ['user_hooper_1', 'user_soccer_2'],
      followers: [],
      locationCheckIns: new Map([['loc_soccer_central', 9]]),
      createdAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_soccer_2',
      name: 'Ricardo Santos',
      username: 'goal_keeper_r',
      primarySport: SportType.Soccer,
      city: 'New York',
      coordinates: cities[1],
      friends: ['user_soccer_1', 'user_soccer_3'],
      followers: [],
      locationCheckIns: new Map([
        ['loc_soccer_central', 12],
        ['loc_soccer_westfield', 6],
      ]),
      createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_soccer_3',
      name: 'João Silva',
      username: 'midfield_jo',
      primarySport: SportType.Soccer,
      city: 'New York',
      coordinates: cities[0],
      friends: ['user_soccer_2'],
      followers: [],
      locationCheckIns: new Map([['loc_soccer_westfield', 8]]),
      createdAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Tennis players
    {
      id: 'user_tennis_1',
      name: 'Emma Wilson',
      username: 'serve_and_volley',
      primarySport: SportType.Tennis,
      city: 'New York',
      coordinates: cities[2],
      friends: ['user_tennis_2'],
      followers: [],
      locationCheckIns: new Map([['loc_tennis_uptown', 14]]),
      createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_tennis_2',
      name: 'Sophie Chen',
      username: 'court_master',
      primarySport: SportType.Tennis,
      city: 'New York',
      coordinates: cities[1],
      friends: ['user_tennis_1', 'user_tennis_3'],
      followers: [],
      locationCheckIns: new Map([['loc_tennis_uptown', 11]]),
      createdAt: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_tennis_3',
      name: 'Isabella Garcia',
      username: 'ace_master',
      primarySport: SportType.Tennis,
      city: 'New York',
      coordinates: cities[3],
      friends: ['user_tennis_2'],
      followers: [],
      locationCheckIns: new Map([['loc_tennis_uptown', 7]]),
      createdAt: new Date(Date.now() - 170 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Multi-sport players
    {
      id: 'user_multi_1',
      name: 'Jordan Park',
      username: 'all_around',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[0],
      friends: ['user_hooper_1', 'user_tennis_1', 'user_soccer_1'],
      followers: ['user_hooper_2'],
      locationCheckIns: new Map([
        ['loc_basketball_downtown', 6],
        ['loc_multiplex_downtown', 10],
      ]),
      createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_multi_2',
      name: 'Casey Morgan',
      username: 'active_casey',
      primarySport: SportType.Volleyball,
      city: 'New York',
      coordinates: cities[1],
      friends: [],
      followers: [],
      locationCheckIns: new Map([['loc_volleyball_beach', 8]]),
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_multi_3',
      name: 'Taylor Brooks',
      username: 'sports_fan',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[3],
      friends: [],
      followers: [],
      locationCheckIns: new Map([
        ['loc_basketball_downtown', 4],
        ['loc_community_basketball_1', 6],
      ]),
      createdAt: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // Additional players
    {
      id: 'user_casual_1',
      name: 'Michael Brown',
      username: 'weekend_warrior',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[0],
      friends: [],
      followers: [],
      locationCheckIns: new Map([['loc_basketball_downtown', 2]]),
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_casual_2',
      name: 'Sarah Johnson',
      username: 'hoops_sarah',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[1],
      friends: ['user_casual_1'],
      followers: [],
      locationCheckIns: new Map([['loc_basketball_harlem', 5]]),
      createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_casual_3',
      name: 'Kevin Anderson',
      username: 'ballin_kev',
      primarySport: SportType.Basketball,
      city: 'Brooklyn',
      coordinates: cities[3],
      friends: [],
      followers: [],
      locationCheckIns: new Map([['loc_basketball_brooklyn', 4]]),
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'user_casual_4',
      name: 'Nicole Davis',
      username: 'court_baller',
      primarySport: SportType.Basketball,
      city: 'New York',
      coordinates: cities[2],
      friends: ['user_hooper_3'],
      followers: [],
      locationCheckIns: new Map([['loc_community_basketball_1', 7]]),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return users;
}

/**
 * Get avatar URL or initials for a player
 */
export function getPlayerAvatar(player: MatchPlayer | PlayerSuggestion): string {
  if (player.avatarUrl) {
    return player.avatarUrl;
  }
  // Generate initials avatar (e.g., "AJ" from "Alex Johnson")
  const names = player.name.split(' ');
  const initials = names
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return initials;
}

/**
 * Mock user store for testing
 */
let mockUsersCache: MockUserProfile[] | null = null;

export function getMockUsers(): MockUserProfile[] {
  if (!mockUsersCache) {
    mockUsersCache = generateMockUsers();
  }
  return mockUsersCache;
}

export function resetMockUsers(): void {
  mockUsersCache = null;
}
