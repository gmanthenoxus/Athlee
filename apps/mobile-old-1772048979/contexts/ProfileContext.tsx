import { createContext, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ProfileContextValue, MockFollowerUser, ProfileState } from '@athlehub/shared';
import { ProfileService, createMobileProfileStorage } from '@athlehub/shared';
import { useProfileStore, initializeProfile } from '../store/profileStore';
import { useAuth } from './AuthContext';

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

const storage = createMobileProfileStorage(AsyncStorage);
const profileService = new ProfileService(storage);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { currentProfile, isLoading, error, loadFollowers, loadFollowing, updateProfile, toggleFollow } = useProfileStore();
  const { user, isAuthenticated, accountType } = useAuth();

  // Initialize profile when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Load or create profile with user's name and account type
      const loadOrCreateProfile = async () => {
        let profile = await profileService.getProfile(user.id);
        if (!profile) {
          profile = await profileService.createProfile(
            user.id,
            user.name,
            user.accountType || 'Player'
          );
        }
        useProfileStore.getState().setProfile(profile);
      };
      loadOrCreateProfile();
    } else {
      // Clear profile when user logs out
      useProfileStore.getState().clearProfile();
    }
  }, [isAuthenticated, user]);

  // Helper functions that use the service
  const getFollowersList = async (): Promise<MockFollowerUser[]> => {
    if (!currentProfile) return [];
    return await profileService.getFollowers(currentProfile.userId);
  };

  const getFollowingList = async (): Promise<MockFollowerUser[]> => {
    if (!currentProfile) return [];
    return await profileService.getFollowing(currentProfile.userId);
  };

  const value: ProfileContextValue = {
    currentProfile,
    isLoading,
    error,
    followers: [],
    following: [],
    updateProfile,
    loadFollowers,
    loadFollowing,
    toggleFollow,
    getFollowersList,
    getFollowingList,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

/**
 * useProfile Hook
 * Access profile state and actions
 */
export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
}

