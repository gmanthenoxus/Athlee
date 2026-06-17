/**
 * Profile Module
 * Exports all profile-related types, services, and utilities
 */

// Types
export type {
  BaseProfile,
  PlayerProfile,
  BusinessProfile,
  Profile,
  ProfileUpdateData,
  PlayerProfileUpdateData,
  BusinessProfileUpdateData,
  ProfileState,
  ProfileActions,
  ProfileStore,
  ProfileContextValue,
  MockFollowerUser,
} from './types';

export { SportType } from './types';

// Storage
export type { ProfileStorage } from './storage';
export {
  WebProfileStorage,
  MemoryProfileStorage,
  createProfileStorage,
  PROFILE_STORAGE_KEYS,
} from './storage';

export { createMobileProfileStorage } from './mobileStorage';

// Service
export { ProfileService } from './profileService';

// Mock Data & Utilities
export {
  createDefaultProfile,
  getRandomMockFollowers,
  getRandomMockFollowing,
  MOCK_FOLLOWER_USERS,
} from './mockProfiles';

