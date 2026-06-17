import type { BusinessType, AccountType } from '../auth/types';

/**
 * Sport Types
 * Enum for different sports supported in the platform
 */
export enum SportType {
  Basketball = 'Basketball',
  Football = 'Football',
  Badminton = 'Badminton',
  TableTennis = 'TableTennis',
  Volleyball = 'Volleyball',
}

/**
 * Base Profile
 * Shared profile fields for all account types
 */
export interface BaseProfile {
  userId: string;
  avatarUrl: string;
  followers: string[]; // Array of userIds
  following: string[]; // Array of userIds
  createdAt: string;
  updatedAt: string;
}

/**
 * Player Profile
 * Profile for player accounts
 */
export interface PlayerProfile extends BaseProfile {
  accountType: AccountType.Player;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  primarySport: SportType;
  locationTag: string; // "City, Country"
  isPublicStats: boolean;
  isPublicBadges: boolean;
  isPublicPosts: boolean;
  badges: string[]; // Array of badge IDs (stubbed)
  ranks: string[]; // Array of rank IDs (stubbed)
  xp: number;
  matchesPlayed: number;
  wins: number;
}

/**
 * Business Profile
 * Profile for business/venue accounts
 */
export interface BusinessProfile extends BaseProfile {
  accountType: AccountType.Business;
  businessName: string;
  businessType: BusinessType;
  description: string;
  country: string;
  city: string;
  contactEmail?: string;
  contactPhone?: string;
  isPublicStats: boolean;
}

/**
 * Union type for all profile types
 */
export type Profile = PlayerProfile | BusinessProfile;

/**
 * Mock Follower User
 * Simplified user data for followers/following lists
 */
export interface MockFollowerUser {
  userId: string;
  username: string;
  avatarUrl: string;
  primarySport?: SportType;
}

/**
 * Profile Update Data
 * Fields that can be updated by the user
 */
export interface PlayerProfileUpdateData {
  username?: string;
  bio?: string;
  primarySport?: SportType;
  locationTag?: string;
  isPublicStats?: boolean;
  isPublicBadges?: boolean;
  isPublicPosts?: boolean;
}

export interface BusinessProfileUpdateData {
  businessName?: string;
  description?: string;
  country?: string;
  city?: string;
  contactEmail?: string;
  contactPhone?: string;
  isPublicStats?: boolean;
}

export type ProfileUpdateData = PlayerProfileUpdateData | BusinessProfileUpdateData;

/**
 * Profile State
 * Represents the current profile state in the store
 */
export interface ProfileState {
  currentProfile: Profile | null;
  isLoading: boolean;
  error: string | null;
  followers: MockFollowerUser[];
  following: MockFollowerUser[];
}

/**
 * Profile Actions
 * Available profile actions
 */
export interface ProfileActions {
  setProfile: (profile: Profile) => void;
  updateProfile: (updates: ProfileUpdateData) => Promise<void>;
  loadFollowers: (userId: string) => Promise<void>;
  loadFollowing: (userId: string) => Promise<void>;
  toggleFollow: (targetUserId: string) => Promise<void>;
  clearProfile: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * Profile Store
 * Combined profile state and actions
 */
export type ProfileStore = ProfileState & ProfileActions;

/**
 * Profile Context Value
 * Value provided by ProfileProvider
 */
export interface ProfileContextValue extends ProfileState {
  updateProfile: (updates: ProfileUpdateData) => Promise<void>;
  loadFollowers: (userId: string) => Promise<void>;
  loadFollowing: (userId: string) => Promise<void>;
  toggleFollow: (targetUserId: string) => Promise<void>;
  getFollowersList: () => Promise<MockFollowerUser[]>;
  getFollowingList: () => Promise<MockFollowerUser[]>;
}