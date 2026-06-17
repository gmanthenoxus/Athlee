import { SportType } from './location-types';
import { MatchPlayer, PlayerSuggestion, PlayerSuggestionContext } from './match-types';
import { getMockUsers, MockUserProfile } from './mockUsers';

/**
 * PlayerSuggestionService
 * Ranks and filters available players for match team composition
 * Priority: Friends > Regulars at location > Same sport players > Nearby players
 */
class PlayerSuggestionService {
  /**
   * Get ranked player suggestions based on context
   */
  public getSuggestions(context: PlayerSuggestionContext): PlayerSuggestion[] {
    const allUsers = getMockUsers();

    // Filter out current user and already excluded players
    let candidates = allUsers.filter(
      (user) =>
        user.id !== context.currentUserId &&
        !context.excludePlayerIds?.includes(user.id)
    );

    // Filter by search query if provided
    if (context.searchQuery && context.searchQuery.trim()) {
      const query = context.searchQuery.toLowerCase();
      candidates = candidates.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      );
    }

    // Convert to player suggestions and rank
    const suggestions = candidates.map((user) =>
      this.userToPlayerSuggestion(user, context)
    );

    // Sort by ranking score (descending)
    suggestions.sort((a, b) => b.rankingScore - a.rankingScore);

    // Return top suggestions (limit to 20)
    return suggestions.slice(0, 20);
  }

  /**
   * Convert mock user profile to player suggestion with ranking
   */
  private userToPlayerSuggestion(
    user: MockUserProfile,
    context: PlayerSuggestionContext
  ): PlayerSuggestion {
    let category: 'friend' | 'regular' | 'sport' | 'nearby' | 'suggested' =
      'suggested';
    let rankingScore = 0;
    let mutualFriendsCount = 0;
    let recentMatches = 0;
    let isFriend = false;
    let isRegular = false;
    let nearbyScore = 0;

    // Check if friend
    const currentUser = getMockUsers().find((u) => u.id === context.currentUserId);
    if (currentUser && currentUser.friends.includes(user.id)) {
      category = 'friend';
      isFriend = true;
      rankingScore = 1000;
      mutualFriendsCount = this.getMutualFriendsCount(currentUser, user);
      rankingScore += mutualFriendsCount * 50; // Bonus for mutual friends
    }

    // Check if regular at selected location
    if (context.locationId && user.locationCheckIns.has(context.locationId)) {
      recentMatches = user.locationCheckIns.get(context.locationId) || 0;
      if (!isFriend) {
        category = 'regular';
        rankingScore = 800 + recentMatches * 10;
      } else {
        rankingScore += recentMatches * 10; // Bonus if also friend and regular
      }
      isRegular = true;
    }

    // Check if plays same sport
    if (!isFriend && !isRegular && context.sport) {
      if (user.primarySport === context.sport) {
        category = 'sport';
        rankingScore = 500;
      }
    }

    // Check proximity (nearby players)
    if (!isFriend && !isRegular && user.coordinates && context.locationId) {
      nearbyScore = this.calculateProximityScore(
        user.coordinates,
        context.locationId
      );
      if (nearbyScore > 0) {
        if (category !== 'friend' && category !== 'regular') {
          category = 'nearby';
        }
        rankingScore = Math.max(rankingScore, 300 + nearbyScore);
      }
    }

    return {
      id: user.id,
      name: user.name,
      userId: user.id,
      avatarUrl: user.avatarUrl,
      category,
      rankingScore,
      mutualFriendsCount,
      recentMatches: isRegular ? recentMatches : undefined,
      isFriend,
      isRegular,
      nearbyScore: nearbyScore > 0 ? nearbyScore : undefined,
      claimed: !!user.id,
    };
  }

  /**
   * Count mutual friends between two users
   */
  private getMutualFriendsCount(user1: MockUserProfile, user2: MockUserProfile): number {
    const user1Friends = new Set(user1.friends);
    return user2.friends.filter((friendId) => user1Friends.has(friendId)).length;
  }

  /**
   * Calculate proximity score based on location
   * This is a simplified calculation - in real app would use actual distance
   */
  private calculateProximityScore(
    userCoordinates: { lat: number; lng: number },
    _locationId: string
  ): number {
    // Simplified: Random score between 0-200
    // In real implementation, would calculate actual distance
    return Math.floor(Math.random() * 200);
  }

  /**
   * Get location regular players
   */
  public getLocationRegulars(
    locationId: string,
    excludePlayerIds?: string[]
  ): PlayerSuggestion[] {
    const allUsers = getMockUsers();

    const regulars = allUsers
      .filter(
        (user) =>
          user.locationCheckIns.has(locationId) &&
          !excludePlayerIds?.includes(user.id)
      )
      .map((user) => {
        const checkIns = user.locationCheckIns.get(locationId) || 0;
        return {
          id: user.id,
          name: user.name,
          userId: user.id,
          avatarUrl: user.avatarUrl,
          category: 'regular' as const,
          rankingScore: 800 + checkIns * 10,
          recentMatches: checkIns,
          isRegular: true,
          claimed: true,
        };
      });

    regulars.sort((a, b) => b.rankingScore - a.rankingScore);
    return regulars;
  }

  /**
   * Get friend suggestions
   */
  public getFriendSuggestions(
    currentUserId: string,
    excludePlayerIds?: string[]
  ): PlayerSuggestion[] {
    const allUsers = getMockUsers();
    const currentUser = allUsers.find((u) => u.id === currentUserId);

    if (!currentUser) {
      return [];
    }

    const friends = allUsers
      .filter(
        (user) =>
          currentUser.friends.includes(user.id) &&
          !excludePlayerIds?.includes(user.id)
      )
      .map((user) => ({
        id: user.id,
        name: user.name,
        userId: user.id,
        avatarUrl: user.avatarUrl,
        category: 'friend' as const,
        rankingScore: 1000,
        isFriend: true,
        claimed: true,
      }));

    return friends;
  }

  /**
   * Search for players by name or username
   */
  public searchPlayers(
    query: string,
    excludePlayerIds?: string[]
  ): PlayerSuggestion[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const allUsers = getMockUsers();
    const queryLower = query.toLowerCase();

    const results = allUsers
      .filter(
        (user) =>
          (user.name.toLowerCase().includes(queryLower) ||
            user.username.toLowerCase().includes(queryLower)) &&
          !excludePlayerIds?.includes(user.id)
      )
      .map((user) => ({
        id: user.id,
        name: user.name,
        userId: user.id,
        avatarUrl: user.avatarUrl,
        category: 'suggested' as const,
        rankingScore: user.name.toLowerCase().startsWith(queryLower)
          ? 600
          : 400, // Boost if name starts with query
        claimed: true,
      }));

    results.sort((a, b) => b.rankingScore - a.rankingScore);
    return results;
  }
}

export const playerSuggestionService = new PlayerSuggestionService();
