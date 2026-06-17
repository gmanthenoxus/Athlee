'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import type { ProfileContextValue, MockFollowerUser, Profile, PlayerProfile } from '@athlehub/shared';
import { ProfileService, createProfileStorage } from '@athlehub/shared';
import { useProfileStore, initializeProfile } from '@/store/profileStore';
import { useAuth } from './AuthContext';
import type { PlayerUser, BusinessUser } from '@athlehub/shared';

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

const storage = createProfileStorage();
const profileService = new ProfileService(storage);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { currentProfile, followers, following, isLoading, error, loadFollowers, loadFollowing, updateProfile, toggleFollow } = useProfileStore();
  const { user, isAuthenticated } = useAuth();

  // Initialize profile when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Load or create profile with user's name and account type
      const loadOrCreateProfile = async () => {
        let profile = await profileService.getProfile(user.id);
        if (!profile) {
          // Get display name based on user type
          let displayName = 'User';
          let additionalData: Partial<Profile> = {};

          if (user.accountType === 'Player') {
            const playerUser = user as PlayerUser;
            displayName = playerUser.username || `${playerUser.firstName} ${playerUser.lastName}`;
            
            // Pass player-specific data
            additionalData = {
              firstName: playerUser.firstName,
              lastName: playerUser.lastName,
              bio: playerUser.bio || '',
              primarySport: playerUser.primarySport as any, // Already correct type
              locationTag: playerUser.city ? `${playerUser.city}, ${playerUser.country}` : '',
            };
          } else if (user.accountType === 'Business') {
            const businessUser = user as BusinessUser;
            displayName = businessUser.businessName || businessUser.username;
            
            // Pass business-specific data
            additionalData = {
              businessName: businessUser.businessName,
              businessType: businessUser.businessType,
              description: businessUser.businessType,
              country: businessUser.country,
              city: businessUser.region,
            };
          }

          profile = await profileService.createProfile(
            user.id,
            displayName,
            user.accountType || 'Player',
            additionalData
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
    followers,
    following,
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

