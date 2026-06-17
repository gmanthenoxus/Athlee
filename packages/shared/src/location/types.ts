import type { SportType } from '../profile/types';

/**
 * Location Type Enum
 * Categories for different types of sports venues
 */
export enum LocationType {
  Court = 'Court',
  Field = 'Field',
  Indoor = 'Indoor',
  Outdoor = 'Outdoor',
  Club = 'Club',
  School = 'School',
  Private = 'Private',
  Public = 'Public',
}

/**
 * Common Amenities at Sports Locations
 */
export const AMENITIES = [
  'Parking',
  'Restrooms',
  'Lighting',
  'Equipment Rental',
  'Changing Rooms',
  'Cafe',
  'Coaching Available',
  'Water Fountain',
  'Wheelchair Accessible',
  'WiFi',
  'Spectator Seating',
  'First Aid',
] as const;

export type Amenity = (typeof AMENITIES)[number];

/**
 * Player Activity Record at a Location
 * Tracks how many matches a player has played at this location
 */
export interface LocationPlayerRecord {
  playerId: string;
  matchCount: number;
  firstSeen: string; // ISO date string
  lastSeen: string; // ISO date string
}

/**
 * Location Model
 * Represents a sports venue/location where matches can be played
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  sports: SportType[]; // Array of sports available at this location
  locationType: LocationType;
  capacity: number; // Max capacity
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: Amenity[];
  matchCount: number; // Total matches played here
  verified: boolean; // Is this a verified location?
  createdBy: string; // User ID of business that created this location
  playerStats: Record<string, LocationPlayerRecord>; // Map of playerId -> statistics
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Location Creation Data
 * Data needed to create a new location (excludes derived fields)
 */
export interface LocationCreateData {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  sports: SportType[];
  locationType: LocationType;
  capacity: number;
  amenities: Amenity[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Location Update Data
 * Data that can be updated after creation
 */
export interface LocationUpdateData {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  sports?: SportType[];
  locationType?: LocationType;
  capacity?: number;
  amenities?: Amenity[];
  verified?: boolean;
}

/**
 * Search Filter Options
 */
export interface LocationSearchFilters {
  query?: string; // Name, address, city
  sport?: SportType;
  city?: string;
  locationType?: LocationType;
}

/**
 * Regular Player at a Location
 * For display purposes (includes player profile info)
 */
export interface RegularPlayer {
  playerId: string;
  username?: string;
  avatarUrl?: string;
  matchCount: number;
}

/**
 * Location Detail Response
 * Location with resolved regular players
 */
export interface LocationDetail extends Location {
  regularPlayers: RegularPlayer[];
}
