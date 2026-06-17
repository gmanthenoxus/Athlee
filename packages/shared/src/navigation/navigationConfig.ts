import { AccountType } from '../auth/types';

/**
 * Tab Configuration
 * Defines a single navigation tab
 */
export interface TabConfig {
  name: string;
  path: string;
  icon: string;
  label: string;
}

/**
 * Navigation Configuration by Account Type
 * Based on PLAN.md specifications
 */
export const NAVIGATION_CONFIGS: Record<AccountType, TabConfig[]> = {
  [AccountType.Visitor]: [
    { name: 'home', path: '/', icon: 'home', label: 'Home' },
  ],
  [AccountType.Player]: [
    { name: 'feed', path: '/', icon: 'home', label: 'Feed' },
    { name: 'matches', path: '/matches', icon: 'trophy', label: 'Matches' },
    { name: 'locations', path: '/locations', icon: 'map-pin', label: 'Locations' },
    { name: 'profile', path: '/profile', icon: 'user', label: 'Profile' },
  ],
  [AccountType.Business]: [
    { name: 'profile', path: '/profile', icon: 'user', label: 'Profile' },
    { name: 'locations', path: '/locations', icon: 'map-pin', label: 'Locations' },
    { name: 'bookings', path: '/bookings', icon: 'calendar', label: 'Bookings' },
    { name: 'messages', path: '/messages', icon: 'message-square', label: 'Messages' },
  ],
};

/**
 * Get navigation tabs for a specific account type
 */
export function getTabsForAccountType(accountType: AccountType): TabConfig[] {
  return NAVIGATION_CONFIGS[accountType] || NAVIGATION_CONFIGS[AccountType.Player];
}

/**
 * Get account type description
 */
export function getAccountTypeDescription(accountType: AccountType): string {
  const descriptions: Record<AccountType, string> = {
    [AccountType.Visitor]: 'Browse content without creating an account',
    [AccountType.Player]: 'Play, track stats, and connect with friends',
    [AccountType.Business]: 'Manage sports facilities, bookings, and customer communications',
  };
  return descriptions[accountType];
}

/**
 * Check if account type has access to a specific feature
 */
export function hasFeatureAccess(accountType: AccountType, feature: string): boolean {
  const tabs = getTabsForAccountType(accountType);
  return tabs.some(tab => tab.name === feature);
}

