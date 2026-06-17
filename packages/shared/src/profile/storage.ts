import type { Profile, PlayerProfile } from './types';

/**
 * Storage Interface
 * Abstract storage for profile persistence
 * Supports both PlayerProfile and BusinessProfile
 */
export interface ProfileStorage {
  getProfile(userId: string): Promise<Profile | null>;
  setProfile(profile: Profile): Promise<void>;
  removeProfile(userId: string): Promise<void>;
  getAllProfiles(): Promise<Profile[]>;
  getProfileByUsername?(username: string): Promise<PlayerProfile | null>;
}

/**
 * Storage Keys
 */
export const PROFILE_STORAGE_KEYS = {
  PROFILE_PREFIX: 'athlehub_profile_',
  USERNAME_INDEX: 'athlehub_username_index_',
  ALL_PROFILES: 'athlehub_all_profiles',
} as const;

/**
 * Web Storage Implementation (localStorage)
 */
export class WebProfileStorage implements ProfileStorage {
  private getStorageKey(userId: string): string {
    return `${PROFILE_STORAGE_KEYS.PROFILE_PREFIX}${userId}`;
  }

  private getUsernameIndexKey(username: string): string {
    return `${PROFILE_STORAGE_KEYS.USERNAME_INDEX}${username.toLowerCase()}`;
  }

  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const data = localStorage.getItem(this.getStorageKey(userId));
      if (!data) return null;
      return JSON.parse(data) as Profile;
    } catch (error) {
      console.error('Failed to get profile from storage:', error);
      return null;
    }
  }

  async getProfileByUsername(username: string): Promise<PlayerProfile | null> {
    try {
      const userId = localStorage.getItem(this.getUsernameIndexKey(username));
      if (!userId) return null;
      const profile = await this.getProfile(userId);
      if (profile && 'username' in profile) {
        return profile as PlayerProfile;
      }
      return null;
    } catch (error) {
      console.error('Failed to get profile by username:', error);
      return null;
    }
  }

  async setProfile(profile: Profile): Promise<void> {
    try {
      localStorage.setItem(this.getStorageKey(profile.userId), JSON.stringify(profile));

      // Index username if it's a player profile
      if ('username' in profile) {
        localStorage.setItem(
          this.getUsernameIndexKey(profile.username),
          profile.userId
        );
      }

      // Update the list of all profile IDs
      const allProfiles = await this.getAllProfiles();
      const profileIds = allProfiles.map((p) => p.userId);
      if (!profileIds.includes(profile.userId)) {
        profileIds.push(profile.userId);
        localStorage.setItem(
          PROFILE_STORAGE_KEYS.ALL_PROFILES,
          JSON.stringify(profileIds)
        );
      }
    } catch (error) {
      console.error('Failed to save profile to storage:', error);
    }
  }

  async removeProfile(userId: string): Promise<void> {
    try {
      // Get profile to remove username index if needed
      const profile = await this.getProfile(userId);
      if (profile && 'username' in profile) {
        localStorage.removeItem(this.getUsernameIndexKey(profile.username));
      }

      localStorage.removeItem(this.getStorageKey(userId));

      // Update the list of all profile IDs
      const profileIdsData = localStorage.getItem(PROFILE_STORAGE_KEYS.ALL_PROFILES);
      if (profileIdsData) {
        const profileIds = JSON.parse(profileIdsData) as string[];
        const updatedIds = profileIds.filter((id) => id !== userId);
        localStorage.setItem(
          PROFILE_STORAGE_KEYS.ALL_PROFILES,
          JSON.stringify(updatedIds)
        );
      }
    } catch (error) {
      console.error('Failed to remove profile from storage:', error);
    }
  }

  async getAllProfiles(): Promise<Profile[]> {
    try {
      const profileIdsData = localStorage.getItem(PROFILE_STORAGE_KEYS.ALL_PROFILES);
      if (!profileIdsData) return [];

      const profileIds = JSON.parse(profileIdsData) as string[];
      const profiles: Profile[] = [];

      for (const userId of profileIds) {
        const profile = await this.getProfile(userId);
        if (profile) {
          profiles.push(profile);
        }
      }

      return profiles;
    } catch (error) {
      console.error('Failed to get all profiles from storage:', error);
      return [];
    }
  }
}

/**
 * Memory Storage Implementation (fallback)
 * Used when localStorage is not available or for testing
 */
export class MemoryProfileStorage implements ProfileStorage {
  private profiles: Map<string, Profile> = new Map();
  private usernameIndex: Map<string, string> = new Map(); // username -> userId

  async getProfile(userId: string): Promise<Profile | null> {
    return this.profiles.get(userId) || null;
  }

  async getProfileByUsername(username: string): Promise<PlayerProfile | null> {
    const userId = this.usernameIndex.get(username.toLowerCase());
    if (!userId) return null;
    const profile = await this.getProfile(userId);
    if (profile && 'username' in profile) {
      return profile as PlayerProfile;
    }
    return null;
  }

  async setProfile(profile: Profile): Promise<void> {
    this.profiles.set(profile.userId, profile);
    // Index username if it's a player profile
    if ('username' in profile) {
      this.usernameIndex.set(profile.username.toLowerCase(), profile.userId);
    }
  }

  async removeProfile(userId: string): Promise<void> {
    const profile = this.profiles.get(userId);
    if (profile && 'username' in profile) {
      this.usernameIndex.delete(profile.username.toLowerCase());
    }
    this.profiles.delete(userId);
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }
}

/**
 * Create appropriate storage instance based on environment
 */
export function createProfileStorage(): ProfileStorage {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    return new WebProfileStorage();
  }

  // Fallback to memory storage
  return new MemoryProfileStorage();
}

