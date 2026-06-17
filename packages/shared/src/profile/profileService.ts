import type {
  Profile,
  PlayerProfile,
  BusinessProfile,
  ProfileUpdateData,
  PlayerProfileUpdateData,
  BusinessProfileUpdateData,
  MockFollowerUser,
} from './types';
import type { ProfileStorage } from './storage';
import type { AccountType } from '../auth/types';
import { createDefaultProfile, getRandomMockFollowers, getRandomMockFollowing } from './mockProfiles';

/**
 * Profile Service
 * Handles all profile-related business logic
 * Supports both player and business profiles
 */
export class ProfileService {
  private storage: ProfileStorage;

  constructor(storage: ProfileStorage) {
    this.storage = storage;
  }

  /**
   * Create a new profile for a user
   * @param userId - The user ID
   * @param username - The username (for player profiles)
   * @param accountType - The account type (Player or Business)
   * @param additionalData - Additional profile data specific to account type
   */
  async createProfile(
    userId: string,
    username: string,
    accountType: AccountType,
    additionalData?: Partial<Profile>
  ): Promise<Profile> {
    // Check if profile already exists
    const existing = await this.storage.getProfile(userId);
    if (existing) {
      return existing;
    }

    // Create default profile based on account type
    const profile = createDefaultProfile(userId, username, accountType, additionalData);

    // Add mock followers and following
    const mockFollowers = getRandomMockFollowers();
    const mockFollowing = getRandomMockFollowing();

    profile.followers = mockFollowers.map((f) => f.userId);
    profile.following = mockFollowing.map((f) => f.userId);

    // Save to storage
    await this.storage.setProfile(profile);

    return profile;
  }

  /**
   * Get a user's profile
   */
  async getProfile(userId: string): Promise<Profile | null> {
    return await this.storage.getProfile(userId);
  }

  /**
   * Get profile by username (player profiles only)
   */
  async getProfileByUsername(username: string): Promise<PlayerProfile | null> {
    const profile = await this.storage.getProfileByUsername?.(username);
    if (profile && 'username' in profile) {
      return profile as PlayerProfile;
    }
    return null;
  }

  /**
   * Check if username is available
   */
  async checkUsernameAvailable(username: string): Promise<boolean> {
    const existing = await this.getProfileByUsername(username);
    return !existing;
  }

  /**
   * Update a user's profile
   */
  async updateProfile(userId: string, data: ProfileUpdateData): Promise<Profile> {
    // Get existing profile
    const profile = await this.storage.getProfile(userId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    // Type-safe update based on account type
    let updatedProfile: Profile;

    if (profile.accountType === 'Player') {
      const playerData = data as PlayerProfileUpdateData;
      updatedProfile = {
        ...(profile as PlayerProfile),
        ...playerData,
        updatedAt: new Date().toISOString(),
      };
    } else {
      const businessData = data as BusinessProfileUpdateData;
      updatedProfile = {
        ...(profile as BusinessProfile),
        ...businessData,
        updatedAt: new Date().toISOString(),
      };
    }

    // Save to storage
    await this.storage.setProfile(updatedProfile);

    return updatedProfile;
  }

  /**
   * Get followers for a user
   */
  async getFollowers(userId: string): Promise<MockFollowerUser[]> {
    const profile = await this.storage.getProfile(userId);
    if (!profile) {
      return [];
    }

    // Return mock follower data
    // In a real app, this would fetch actual user profiles
    return getRandomMockFollowers();
  }

  /**
   * Get following for a user
   */
  async getFollowing(userId: string): Promise<MockFollowerUser[]> {
    const profile = await this.storage.getProfile(userId);
    if (!profile) {
      return [];
    }

    // Return mock following data
    // In a real app, this would fetch actual user profiles
    return getRandomMockFollowing();
  }

  /**
   * Toggle follow/unfollow for a target user
   */
  async toggleFollow(userId: string, targetUserId: string): Promise<boolean> {
    const profile = await this.storage.getProfile(userId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    // Check if already following
    const isFollowing = profile.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      profile.following = profile.following.filter((id) => id !== targetUserId);
    } else {
      // Follow
      profile.following.push(targetUserId);
    }

    profile.updatedAt = new Date().toISOString();
    await this.storage.setProfile(profile);

    return !isFollowing; // Return new follow state
  }

  /**
   * Delete a user's profile
   */
  async deleteProfile(userId: string): Promise<void> {
    await this.storage.removeProfile(userId);
  }
}

