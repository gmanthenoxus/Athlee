import type { Location, Amenity } from './types';
import { LocationType, AMENITIES } from './types';
import { SportType } from '../profile/types';

/**
 * Mock Locations Data
 * Realistic locations for testing and development
 */
export const MOCK_LOCATIONS: Location[] = [
  {
    id: 'loc_1',
    name: 'Downtown Sports Complex',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    sports: [SportType.Basketball, SportType.Badminton],
    locationType: LocationType.Indoor,
    capacity: 200,
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    amenities: ['Parking' as Amenity, 'Restrooms' as Amenity, 'Equipment Rental' as Amenity, 'Cafe' as Amenity],
    matchCount: 42,
    verified: true,
    createdBy: 'business_1',
    playerStats: {
      player_1: { playerId: 'player_1', matchCount: 12, firstSeen: '2025-06-01T10:00:00Z', lastSeen: '2026-02-10T14:30:00Z' },
      player_2: { playerId: 'player_2', matchCount: 8, firstSeen: '2025-07-15T09:00:00Z', lastSeen: '2026-02-08T16:00:00Z' },
      player_3: { playerId: 'player_3', matchCount: 6, firstSeen: '2025-08-20T11:00:00Z', lastSeen: '2026-02-05T13:00:00Z' },
      player_4: { playerId: 'player_4', matchCount: 5, firstSeen: '2025-09-10T10:30:00Z', lastSeen: '2026-01-30T15:00:00Z' },
      player_5: { playerId: 'player_5', matchCount: 3, firstSeen: '2025-10-01T09:30:00Z', lastSeen: '2026-01-25T14:00:00Z' },
    },
    createdAt: '2025-05-15T08:00:00Z',
    updatedAt: '2026-02-10T14:30:00Z',
  },
  {
    id: 'loc_2',
    name: 'Central Park Courts',
    address: '456 Park Ave',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    sports: [SportType.Basketball, SportType.Football],
    locationType: LocationType.Outdoor,
    capacity: 150,
    coordinates: {
      lat: 40.7829,
      lng: -73.9654,
    },
    amenities: ['Lighting' as Amenity, 'Restrooms' as Amenity, 'Water Fountain' as Amenity],
    matchCount: 28,
    verified: true,
    createdBy: 'business_2',
    playerStats: {
      player_2: { playerId: 'player_2', matchCount: 7, firstSeen: '2025-07-01T08:00:00Z', lastSeen: '2026-02-09T09:00:00Z' },
      player_3: { playerId: 'player_3', matchCount: 5, firstSeen: '2025-08-10T10:00:00Z', lastSeen: '2026-02-06T10:30:00Z' },
      player_5: { playerId: 'player_5', matchCount: 4, firstSeen: '2025-09-15T09:30:00Z', lastSeen: '2026-02-01T11:00:00Z' },
      player_6: { playerId: 'player_6', matchCount: 3, firstSeen: '2025-10-20T08:30:00Z', lastSeen: '2026-01-28T09:00:00Z' },
    },
    createdAt: '2025-06-20T10:00:00Z',
    updatedAt: '2026-02-09T09:00:00Z',
  },
  {
    id: 'loc_3',
    name: 'Elite Badminton Academy',
    address: '789 Sports Lane',
    city: 'Boston',
    state: 'MA',
    country: 'USA',
    sports: [SportType.Badminton, SportType.TableTennis],
    locationType: LocationType.Indoor,
    capacity: 80,
    coordinates: {
      lat: 42.3601,
      lng: -71.0589,
    },
    amenities: ['Coaching Available' as Amenity, 'Equipment Rental' as Amenity, 'Changing Rooms' as Amenity, 'WiFi' as Amenity],
    matchCount: 35,
    verified: true,
    createdBy: 'business_3',
    playerStats: {
      player_1: { playerId: 'player_1', matchCount: 9, firstSeen: '2025-05-10T15:00:00Z', lastSeen: '2026-02-11T16:30:00Z' },
      player_4: { playerId: 'player_4', matchCount: 7, firstSeen: '2025-07-05T14:00:00Z', lastSeen: '2026-02-07T15:00:00Z' },
      player_6: { playerId: 'player_6', matchCount: 5, firstSeen: '2025-08-12T14:30:00Z', lastSeen: '2026-01-31T16:00:00Z' },
      player_7: { playerId: 'player_7', matchCount: 4, firstSeen: '2025-09-08T15:30:00Z', lastSeen: '2026-01-22T14:00:00Z' },
    },
    createdAt: '2025-04-01T14:00:00Z',
    updatedAt: '2026-02-11T16:30:00Z',
  },
  {
    id: 'loc_4',
    name: 'Riverside Sports Field',
    address: '321 River Road',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    sports: [SportType.Football, SportType.Volleyball],
    locationType: LocationType.Field,
    capacity: 300,
    coordinates: {
      lat: 47.6062,
      lng: -122.3321,
    },
    amenities: ['Parking' as Amenity, 'Lighting' as Amenity, 'Spectator Seating' as Amenity],
    matchCount: 18,
    verified: false,
    createdBy: 'business_4',
    playerStats: {
      player_3: { playerId: 'player_3', matchCount: 4, firstSeen: '2025-11-01T10:00:00Z', lastSeen: '2026-02-04T11:00:00Z' },
      player_7: { playerId: 'player_7', matchCount: 3, firstSeen: '2025-11-10T09:00:00Z', lastSeen: '2026-01-25T10:00:00Z' },
      player_8: { playerId: 'player_8', matchCount: 2, firstSeen: '2025-12-01T08:00:00Z', lastSeen: '2026-01-15T09:00:00Z' },
    },
    createdAt: '2025-10-15T11:00:00Z',
    updatedAt: '2026-02-04T11:00:00Z',
  },
  {
    id: 'loc_5',
    name: 'Metro Volleyball Center',
    address: '654 Court Street',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    sports: [SportType.Volleyball, SportType.Basketball],
    locationType: LocationType.Indoor,
    capacity: 120,
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
    amenities: ['Changing Rooms' as Amenity, 'Cafe' as Amenity, 'Wheelchair Accessible' as Amenity],
    matchCount: 22,
    verified: true,
    createdBy: 'business_5',
    playerStats: {
      player_1: { playerId: 'player_1', matchCount: 6, firstSeen: '2025-09-01T17:00:00Z', lastSeen: '2026-02-09T18:00:00Z' },
      player_2: { playerId: 'player_2', matchCount: 5, firstSeen: '2025-09-15T16:30:00Z', lastSeen: '2026-02-07T17:00:00Z' },
      player_4: { playerId: 'player_4', matchCount: 4, firstSeen: '2025-10-01T17:30:00Z', lastSeen: '2026-02-02T16:00:00Z' },
      player_8: { playerId: 'player_8', matchCount: 3, firstSeen: '2025-10-20T16:00:00Z', lastSeen: '2026-01-20T17:00:00Z' },
    },
    createdAt: '2025-08-10T16:00:00Z',
    updatedAt: '2026-02-09T18:00:00Z',
  },
];

/**
 * Get mock locations by city
 */
export function getMockLocationsByCity(city: string): Location[] {
  return MOCK_LOCATIONS.filter((loc) => loc.city.toLowerCase() === city.toLowerCase());
}

/**
 * Get mock locations by sport
 */
export function getMockLocationsBySport(sport: SportType): Location[] {
  return MOCK_LOCATIONS.filter((loc) => loc.sports.includes(sport));
}

/**
 * Get top regular players at a location
 */
export function getTopRegularPlayers(location: Location, limit: number = 5) {
  return Object.values(location.playerStats)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit);
}
