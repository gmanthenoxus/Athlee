/**
 * User profile for display in match officials selection
 */
export interface UserProfile {
  userId: string;
  username: string;
  name: string;
  avatarUrl?: string;
  email?: string;
}

/**
 * Search result item for user search
 */
export interface UserSearchResult {
  userId: string;
  username: string;
  name: string;
  avatarUrl?: string;
}

/**
 * Mock user database for profile service
 */
const MOCK_USERS: UserProfile[] = [
  {
    userId: 'user_001',
    username: 'john_doe',
    name: 'John Doe',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    userId: 'user_002',
    username: 'sarah_smith',
    name: 'Sarah Smith',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    userId: 'user_003',
    username: 'michael_brown',
    name: 'Michael Brown',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    userId: 'user_004',
    username: 'emily_jones',
    name: 'Emily Jones',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
  },
  {
    userId: 'user_005',
    username: 'david_wilson',
    name: 'David Wilson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    userId: 'user_006',
    username: 'jessica_taylor',
    name: 'Jessica Taylor',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
  },
  {
    userId: 'user_007',
    username: 'james_anderson',
    name: 'James Anderson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    userId: 'user_008',
    username: 'lisa_martinez',
    name: 'Lisa Martinez',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
  },
  {
    userId: 'user_009',
    username: 'robert_garcia',
    name: 'Robert Garcia',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
  },
  {
    userId: 'user_010',
    username: 'amanda_lee',
    name: 'Amanda Lee',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
  },
  {
    userId: 'user_011',
    username: 'christopher_king',
    name: 'Christopher King',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
  },
  {
    userId: 'user_012',
    username: 'sophia_white',
    name: 'Sophia White',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
  },
];

/**
 * Profile Service - Handles user profile operations and search
 */
class ProfileService {
  /**
   * Search users by query string (username or name)
   * @param query Search term (case-insensitive)
   * @returns Array of matching users
   */
  public searchUsers(query: string): UserSearchResult[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return MOCK_USERS.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerQuery) ||
        user.name.toLowerCase().includes(lowerQuery)
    ).map(
      (user) => ({
        userId: user.userId,
        username: user.username,
        name: user.name,
        avatarUrl: user.avatarUrl,
      })
    );
  }

  /**
   * Get user profile by ID
   * @param userId User ID to retrieve
   * @returns User profile or undefined if not found
   */
  public getUserById(userId: string): UserProfile | undefined {
    return MOCK_USERS.find((user) => user.userId === userId);
  }

  /**
   * Get all users
   * @returns All users in the system
   */
  public getAllUsers(): UserProfile[] {
    return [...MOCK_USERS];
  }

  /**
   * Get multiple users by IDs
   * @param userIds Array of user IDs
   * @returns Array of user profiles
   */
  public getUsersByIds(userIds: string[]): UserProfile[] {
    return userIds
      .map((id) => this.getUserById(id))
      .filter((user): user is UserProfile => user !== undefined);
  }

  /**
   * Check if a user exists
   * @param userId User ID to check
   * @returns true if user exists
   */
  public userExists(userId: string): boolean {
    return MOCK_USERS.some((user) => user.userId === userId);
  }
}

/**
 * Singleton instance of ProfileService
 */
export const profileService = new ProfileService();
