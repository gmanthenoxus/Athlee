import type { Profile, PlayerProfile } from './types';
import type { ProfileStorage } from './storage';

/**
 * Mobile Storage Implementation (AsyncStorage)
 * For React Native applications
 */

export const PROFILE_STORAGE_KEYS = {
  PROFILE_PREFIX: 'athlehub_profile_',
  USERNAME_INDEX: 'athlehub_username_index_',
  ALL_PROFILES: 'athlehub_all_profiles',
} as const;

/**
 * Create mobile profile storage using AsyncStorage
 * This is a factory function that will be called from the mobile app
 */
export function createMobileProfileStorage(AsyncStorage: any): ProfileStorage {
  const getStorageKey = (userId: string): string => {
    return `${PROFILE_STORAGE_KEYS.PROFILE_PREFIX}${userId}`;
  };

  const getUsernameIndexKey = (username: string): string => {
    return `${PROFILE_STORAGE_KEYS.USERNAME_INDEX}${username.toLowerCase()}`;
  };

  return {
    async getProfile(userId: string): Promise<Profile | null> {
      try {
        const data = await AsyncStorage.getItem(getStorageKey(userId));
        if (!data) return null;
        return JSON.parse(data) as Profile;
      } catch (error) {
        console.error('Failed to get profile from storage:', error);
        return null;
      }
    },

    async getProfileByUsername(username: string): Promise<PlayerProfile | null> {
      try {
        const userId = await AsyncStorage.getItem(getUsernameIndexKey(username));
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
    },

    async setProfile(profile: Profile): Promise<void> {
      try {
        await AsyncStorage.setItem(
          getStorageKey(profile.userId),
          JSON.stringify(profile)
        );

        // Index username if it's a player profile
        if ('username' in profile) {
          await AsyncStorage.setItem(
            getUsernameIndexKey(profile.username),
            profile.userId
          );
        }

        // Update the list of all profile IDs
        const profileIdsData = await AsyncStorage.getItem(PROFILE_STORAGE_KEYS.ALL_PROFILES);
        const profileIds = profileIdsData ? JSON.parse(profileIdsData) : [];

        if (!profileIds.includes(profile.userId)) {
          profileIds.push(profile.userId);
          await AsyncStorage.setItem(
            PROFILE_STORAGE_KEYS.ALL_PROFILES,
            JSON.stringify(profileIds)
          );
        }
      } catch (error) {
        console.error('Failed to save profile to storage:', error);
      }
    },

    async removeProfile(userId: string): Promise<void> {
      try {
        // Get profile to remove username index if needed
        const profile = await this.getProfile(userId);
        if (profile && 'username' in profile) {
          await AsyncStorage.removeItem(getUsernameIndexKey(profile.username));
        }

        await AsyncStorage.removeItem(getStorageKey(userId));

        // Update the list of all profile IDs
        const profileIdsData = await AsyncStorage.getItem(PROFILE_STORAGE_KEYS.ALL_PROFILES);
        if (profileIdsData) {
          const profileIds = JSON.parse(profileIdsData) as string[];
          const updatedIds = profileIds.filter((id) => id !== userId);
          await AsyncStorage.setItem(
            PROFILE_STORAGE_KEYS.ALL_PROFILES,
            JSON.stringify(updatedIds)
          );
        }
      } catch (error) {
        console.error('Failed to remove profile from storage:', error);
      }
    },

    async getAllProfiles(): Promise<Profile[]> {
      try {
        const profileIdsData = await AsyncStorage.getItem(PROFILE_STORAGE_KEYS.ALL_PROFILES);
        if (!profileIdsData) return [];

        const profileIds = JSON.parse(profileIdsData) as string[];
        const profiles: Profile[] = [];

        for (const userId of profileIds) {
          const data = await AsyncStorage.getItem(getStorageKey(userId));
          if (data) {
            profiles.push(JSON.parse(data) as Profile);
          }
        }

        return profiles;
      } catch (error) {
        console.error('Failed to get all profiles from storage:', error);
        return [];
      }
    },
  };
}

