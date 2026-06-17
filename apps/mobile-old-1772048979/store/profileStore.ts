import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ProfileStore, Profile, ProfileUpdateData, MockFollowerUser } from '@athlehub/shared';
import { createMobileProfileStorage, ProfileService } from '@athlehub/shared';

const storage = createMobileProfileStorage(AsyncStorage);
const profileService = new ProfileService(storage);

/**
 * Zustand Profile Store
 * Centralized profile state management for mobile
 */
export const useProfileStore = create<ProfileStore>((set, get) => ({
  // Initial state
  currentProfile: null,
  isLoading: false,
  error: null,
  followers: [],
  following: [],

  // Actions
  setProfile: (profile: Profile) => {
    set({ currentProfile: profile });
  },

  loadFollowers: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const followers = await profileService.getFollowers(userId);
      set({ followers, isLoading: false });
    } catch (error) {
      console.error('Failed to load followers:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load followers',
      });
    }
  },

  loadFollowing: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const following = await profileService.getFollowing(userId);
      set({ following, isLoading: false });
    } catch (error) {
      console.error('Failed to load following:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load following',
      });
    }
  },

  updateProfile: async (data: ProfileUpdateData) => {
    const { currentProfile } = get();
    if (!currentProfile) {
      throw new Error('No profile loaded');
    }

    try {
      set({ isLoading: true, error: null });

      const updatedProfile = await profileService.updateProfile(currentProfile.userId, data);

      set({
        currentProfile: updatedProfile,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      });
      throw error;
    }
  },

  toggleFollow: async (targetUserId: string) => {
    const { currentProfile } = get();
    if (!currentProfile) {
      throw new Error('No profile loaded');
    }

    try {
      set({ isLoading: true, error: null });

      await profileService.toggleFollow(currentProfile.userId, targetUserId);

      // Reload profile to get updated following list
      const updatedProfile = await profileService.getProfile(currentProfile.userId);
      if (updatedProfile) {
        set({ currentProfile: updatedProfile });
      }

      set({
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to toggle follow:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to toggle follow',
      });
      throw error;
    }
  },

  clearProfile: () => {
    set({
      currentProfile: null,
      isLoading: false,
      error: null,
      followers: [],
      following: [],
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

/**
 * Initialize profile state for a user
 */
export async function initializeProfile(userId: string, username: string, accountType: string = 'Player') {
  try {
    let profile = await profileService.getProfile(userId);
    if (!profile) {
      profile = await profileService.createProfile(userId, username, accountType as any);
    }
    useProfileStore.getState().setProfile(profile);
  } catch (error) {
    console.error('Failed to initialize profile:', error);
  }
}

