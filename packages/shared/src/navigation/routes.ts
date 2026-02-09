/**
 * Shared navigation route definitions
 * Used across web and mobile platforms
 */

export const ROUTES = {
  HOME: '/',
  MATCHES: '/matches',
  STATS: '/stats',
  COMMUNITY: '/community',
  PROFILE: '/profile',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

/**
 * Navigation item configuration
 */
export interface NavItem {
  key: RouteKey;
  path: RoutePath;
  label: string;
  icon?: string;
  requiresAuth?: boolean;
}

/**
 * Main navigation items
 */
export const NAV_ITEMS: NavItem[] = [
  {
    key: 'HOME',
    path: ROUTES.HOME,
    label: 'Home',
    icon: 'home',
  },
  {
    key: 'MATCHES',
    path: ROUTES.MATCHES,
    label: 'Matches',
    icon: 'trophy',
  },
  {
    key: 'STATS',
    path: ROUTES.STATS,
    label: 'Stats',
    icon: 'bar-chart',
  },
  {
    key: 'COMMUNITY',
    path: ROUTES.COMMUNITY,
    label: 'Community',
    icon: 'users',
  },
  {
    key: 'PROFILE',
    path: ROUTES.PROFILE,
    label: 'Profile',
    icon: 'user',
  },
];

