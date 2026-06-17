/**
 * User Follower Relationship System
 * 
 * Manages follow/unfollow relationships between users:
 * - User follows tracking
 * - Follower lists
 * - Following lists
 * - Follower suggestions
 * - Mutual follows detection
 */

/**
 * Follower Relationship Record
 */
export interface FollowerRelationship {
  followerId: string;
  followingId: string;
  followedAt: string;
  isPinned?: boolean;
}

/**
 * User Follows Profile
 */
export interface UserFollowsProfile {
  userId: string;
  followers: FollowerRelationship[];
  following: FollowerRelationship[];
}

/**
 * Follower Service
 */
class FollowerService {
  private readonly STORAGE_KEY_PREFIX = 'athlee_follows_';
  private readonly STORAGE_KEY_INDEX = 'athlee_follows_index';

  /**
   * Initialize follows profile for user
   */
  public initializeFollows(userId: string): UserFollowsProfile {
    const profile: UserFollowsProfile = {
      userId,
      followers: [],
      following: [],
    };
    this.saveFollows(userId, profile);
    return profile;
  }

  /**
   * Get follows profile
   */
  public getFollows(userId: string): UserFollowsProfile {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${userId}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        return JSON.parse(stored);
      }
      
      return this.initializeFollows(userId);
    } catch (error) {
      console.error('Failed to get follows:', error);
      return this.initializeFollows(userId);
    }
  }

  /**
   * User follows another user
   */
  public followUser(followerId: string, followingId: string): boolean {
    if (followerId === followingId) return false;

    // Get both profiles
    const followerProfile = this.getFollows(followerId);
    const followingProfile = this.getFollows(followingId);

    // Check if already following
    if (followerProfile.following.some(f => f.followingId === followingId)) {
      return false;
    }

    // Add to follower's following list
    followerProfile.following.push({
      followerId,
      followingId,
      followedAt: new Date().toISOString(),
    });

    // Add to following user's followers list
    followingProfile.followers.push({
      followerId,
      followingId,
      followedAt: new Date().toISOString(),
    });

    this.saveFollows(followerId, followerProfile);
    this.saveFollows(followingId, followingProfile);

    return true;
  }

  /**
   * User unfollows another user
   */
  public unfollowUser(followerId: string, followingId: string): boolean {
    const followerProfile = this.getFollows(followerId);
    const followingProfile = this.getFollows(followingId);

    // Remove from follower's following list
    followerProfile.following = followerProfile.following.filter(
      f => f.followingId !== followingId
    );

    // Remove from following user's followers list
    followingProfile.followers = followingProfile.followers.filter(
      f => f.followerId !== followerId
    );

    this.saveFollows(followerId, followerProfile);
    this.saveFollows(followingId, followingProfile);

    return true;
  }

  /**
   * Get followers for a user
   */
  public getFollowers(userId: string): string[] {
    const profile = this.getFollows(userId);
    return profile.followers.map(f => f.followerId);
  }

  /**
   * Get following list for user
   */
  public getFollowing(userId: string): string[] {
    const profile = this.getFollows(userId);
    return profile.following.map(f => f.followingId);
  }

  /**
   * Get follower count
   */
  public getFollowerCount(userId: string): number {
    return this.getFollowers(userId).length;
  }

  /**
   * Get following count
   */
  public getFollowingCount(userId: string): number {
    return this.getFollowing(userId).length;
  }

  /**
   * Check if user follows another user
   */
  public isFollowing(followerId: string, followingId: string): boolean {
    const profile = this.getFollows(followerId);
    return profile.following.some(f => f.followingId === followingId);
  }

  /**
   * Get mutual follows
   */
  public getMutualFollows(userId: string): string[] {
    const followers = new Set(this.getFollowers(userId));
    const following = this.getFollowing(userId);
    return following.filter(f => followers.has(f));
  }

  /**
   * Get follower suggestions (users with most followers or mutual follows)
   */
  public getFollowSuggestions(userId: string, limit: number = 10): string[] {
    try {
      const keys = Object.keys(localStorage);
      const followsKeys = keys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX));

      // Get all users' stats
      const stats: Record<string, { userId: string; followerCount: number; mutualFollows: number }> = {};

      for (const key of followsKeys) {
        const targetUserId = key.replace(this.STORAGE_KEY_PREFIX, '');
        if (targetUserId === userId) continue; // Skip self

        const profile = this.getFollows(targetUserId);
        const mutuals = this.getMutualFollows(userId).includes(targetUserId) ? 1 : 0;

        stats[targetUserId] = {
          userId: targetUserId,
          followerCount: profile.followers.length,
          mutualFollows: mutuals,
        };
      }

      // Sort by mutual follows, then by follower count
      const sorted = Object.values(stats)
        .filter(s => !this.isFollowing(userId, s.userId)) // Exclude already following
        .sort((a, b) => {
          if (b.mutualFollows !== a.mutualFollows) {
            return b.mutualFollows - a.mutualFollows;
          }
          return b.followerCount - a.followerCount;
        });

      return sorted.slice(0, limit).map(s => s.userId);
    } catch (error) {
      console.error('Failed to get follow suggestions:', error);
      return [];
    }
  }

  /**
   * Reset all follows data
   */
  public resetAllFollows(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX)).forEach(key => {
        localStorage.removeItem(key);
      });
      localStorage.removeItem(this.STORAGE_KEY_INDEX);
    } catch (error) {
      console.error('Failed to reset follows:', error);
    }
  }

  /**
   * Save follows profile
   */
  private saveFollows(userId: string, profile: UserFollowsProfile): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${userId}`;
      localStorage.setItem(key, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save follows:', error);
    }
  }
}

export const followerService = new FollowerService();
