import type { Profile, PlayerProfile, BusinessProfile, MockFollowerUser } from './types';
import { SportType } from './types';
import type { AccountType, BusinessType } from '../auth/types';
import { AccountType as AccountTypeEnum, BusinessType as BusinessTypeEnum } from '../auth/types';

/**
 * Generate avatar URL based on username or business name
 */
function generateAvatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
}

/**
 * Create a default profile for a new user
 * Supports both Player and Business account types
 */
export function createDefaultProfile(
  userId: string,
  username: string,
  accountType: AccountType,
  additionalData?: Partial<Profile>
): Profile {
  const now = new Date().toISOString();

  if (accountType === AccountTypeEnum.Player) {
    // Extract first and last name from username if possible
    const names = username.trim().split(' ');
    const firstName = names[0] || 'User';
    const lastName = names.slice(1).join(' ') || '';

    const profile: PlayerProfile = {
      accountType: AccountTypeEnum.Player,
      userId,
      username,
      firstName,
      lastName,
      avatarUrl: generateAvatar(username),
      bio: '',
      primarySport: SportType.Basketball, // Default sport
      locationTag: '',
      followers: [],
      following: [],
      isPublicStats: true,
      isPublicBadges: true,
      isPublicPosts: true,
      badges: [],
      ranks: [],
      xp: 0,
      matchesPlayed: 0,
      wins: 0,
      createdAt: now,
      updatedAt: now,
    };

    return { ...profile, ...(additionalData as Partial<PlayerProfile>) };
  } else {
    // Business profile
    const profile: BusinessProfile = {
      accountType: AccountTypeEnum.Business,
      userId,
      businessName: username,
      businessType: BusinessTypeEnum.Venue, // Default type
      avatarUrl: generateAvatar(username),
      description: '',
      country: '',
      city: '',
      followers: [],
      following: [],
      isPublicStats: true,
      createdAt: now,
      updatedAt: now,
    };

    return { ...profile, ...(additionalData as Partial<BusinessProfile>) };
  }
}

/**
 * Predefined mock follower users for testing
 */
export const MOCK_FOLLOWER_USERS: MockFollowerUser[] = [
  {
    userId: 'follower_1',
    username: 'Sarah Chen',
    avatarUrl: generateAvatar('Sarah Chen'),
    primarySport: SportType.Basketball,
  },
  {
    userId: 'follower_2',
    username: 'Mike Rodriguez',
    avatarUrl: generateAvatar('Mike Rodriguez'),
    primarySport: SportType.Football,
  },
  {
    userId: 'follower_3',
    username: 'Emma Wilson',
    avatarUrl: generateAvatar('Emma Wilson'),
    primarySport: SportType.Badminton,
  },
  {
    userId: 'follower_4',
    username: 'James Lee',
    avatarUrl: generateAvatar('James Lee'),
    primarySport: SportType.TableTennis,
  },
  {
    userId: 'follower_5',
    username: 'Olivia Brown',
    avatarUrl: generateAvatar('Olivia Brown'),
    primarySport: SportType.Volleyball,
  },
];

/**
 * Get random mock followers (3-5 users)
 */
export function getRandomMockFollowers(): MockFollowerUser[] {
  const count = Math.floor(Math.random() * 3) + 3; // 3-5 followers
  const shuffled = [...MOCK_FOLLOWER_USERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get random mock following (2-4 users)
 */
export function getRandomMockFollowing(): MockFollowerUser[] {
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 following
  const shuffled = [...MOCK_FOLLOWER_USERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Validate username (internal to profile module)
 */
function validateProfileUsername(username: string): { valid: boolean; error?: string } {
  const trimmed = username.trim();

  if (!trimmed) {
    return { valid: false, error: 'Username cannot be empty' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Username must be at least 2 characters' };
  }

  if (trimmed.length > 30) {
    return { valid: false, error: 'Username must be less than 30 characters' };
  }

  // Allow alphanumeric and underscores only
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }

  return { valid: true };
}

/**
 * Validate bio (internal to profile module)
 */
function validateProfileBio(bio: string): { valid: boolean; error?: string } {
  if (bio.length > 200) {
    return { valid: false, error: 'Bio must be less than 200 characters' };
  }

  return { valid: true };
}

/**
 * Validate location tag (internal to profile module)
 */
function validateProfileLocationTag(locationTag: string): { valid: boolean; error?: string } {
  if (locationTag.length > 50) {
    return { valid: false, error: 'Location must be less than 50 characters' };
  }

  return { valid: true };
}

/**
 * Validate business description
 */
function validateBusinessDescription(description: string): { valid: boolean; error?: string } {
  if (description.length > 500) {
    return { valid: false, error: 'Description must be less than 500 characters' };
  }

  return { valid: true };
}

