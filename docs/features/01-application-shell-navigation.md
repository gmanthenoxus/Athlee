# Feature: Application Shell & Navigation

## Status
✅ **COMPLETE**

## Purpose
Create the foundational application shell for Athlehub that works on both web (Next.js) and mobile (React Native + Expo) platforms. This includes layout, navigation, and placeholders for future features.

## User Flow
1. User opens the application (web or mobile)
2. Sees the home/dashboard placeholder screen
3. Can navigate between tabs/screens using:
   - **Web**: Header navigation (desktop) or bottom navigation (mobile)
   - **Mobile**: Bottom tab navigation
4. Sees empty-state placeholders for future features

## In Scope
- ✅ Shared navigation structure definition
- ✅ Web root layout with header and navigation
- ✅ Web placeholder pages (Home, Matches, Stats, Community, Profile)
- ✅ Mobile tab navigation
- ✅ Mobile placeholder screens (matching web pages)
- ✅ Responsive navigation (desktop/mobile)
- ✅ Route naming consistency across platforms

## Out of Scope
- ❌ Authentication
- ❌ Database integration
- ❌ API calls
- ❌ Business logic
- ❌ Styling polish
- ❌ Feature-specific screens (beyond placeholders)

## Architecture

### Navigation Structure
All navigation routes are defined in the shared package (`packages/shared/src/navigation/routes.ts`):

```typescript
export const ROUTES = {
  HOME: '/',
  MATCHES: '/matches',
  STATS: '/stats',
  COMMUNITY: '/community',
  PROFILE: '/profile',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { key: 'HOME', path: '/', label: 'Home', icon: 'home' },
  { key: 'MATCHES', path: '/matches', label: 'Matches', icon: 'trophy' },
  { key: 'STATS', path: '/stats', label: 'Stats', icon: 'bar-chart' },
  { key: 'COMMUNITY', path: '/community', label: 'Community', icon: 'users' },
  { key: 'PROFILE', path: '/profile', label: 'Profile', icon: 'user' },
];
```

### Web Implementation (Next.js)

**Layout Structure:**
- Root layout (`apps/web/src/app/layout.tsx`)
  - Header component (sticky, with logo)
  - Desktop navigation (horizontal, hidden on mobile)
  - Main content area
  - Mobile navigation (bottom bar, hidden on desktop)

**Components:**
- `Header.tsx` - Top header with logo and user menu placeholder
- `Navigation.tsx` - Desktop horizontal navigation
- `MobileNav.tsx` - Mobile bottom navigation bar

**Pages:**
- `/` - Home page
- `/matches` - Matches placeholder
- `/stats` - Stats placeholder
- `/community` - Community placeholder
- `/profile` - Profile placeholder

### Mobile Implementation (React Native + Expo)

**Navigation Structure:**
- Root layout with Stack navigator
- Tab layout with bottom tabs
- 5 tab screens matching web pages

**Screens:**
- `(tabs)/index.tsx` - Home screen
- `(tabs)/matches.tsx` - Matches screen
- `(tabs)/stats.tsx` - Stats screen
- `(tabs)/community.tsx` - Community screen
- `(tabs)/profile.tsx` - Profile screen

## Folder Structure

```
packages/shared/
  src/navigation/
    routes.ts          # Shared route definitions
    index.ts           # Export barrel

apps/web/
  src/
    app/
      layout.tsx       # Root layout with navigation
      page.tsx         # Home page
      matches/page.tsx
      stats/page.tsx
      community/page.tsx
      profile/page.tsx
    components/
      Header.tsx       # Top header
      Navigation.tsx   # Desktop nav
      MobileNav.tsx    # Mobile bottom nav

apps/mobile/
  app/
    _layout.tsx        # Root stack layout
    (tabs)/
      _layout.tsx      # Tab navigation layout
      index.tsx        # Home screen
      matches.tsx
      stats.tsx
      community.tsx
      profile.tsx
```

## Integration Contract

### For Future Features

**Route Registration:**
- All new routes must be added to `packages/shared/src/navigation/routes.ts`
- Use the `ROUTES` constant for route paths
- Add to `NAV_ITEMS` array if the route should appear in navigation

**Web Pages:**
- Create page in `apps/web/src/app/[route]/page.tsx`
- Use Next.js App Router conventions
- Import shared route constants

**Mobile Screens:**
- Create screen in `apps/mobile/app/(tabs)/[route].tsx`
- Use Expo Router file-based routing
- Match web page naming

**Navigation Items:**
```typescript
interface NavItem {
  key: RouteKey;
  path: RoutePath;
  label: string;
  icon?: string;
  requiresAuth?: boolean;  // For future auth integration
}
```

## Testing Checklist

- [x] Web app starts without errors
- [x] All web routes load correctly (/, /matches, /stats, /community, /profile)
- [x] Desktop navigation displays and highlights active route
- [x] Mobile bottom navigation displays on small screens
- [x] Desktop navigation hides on mobile
- [x] Mobile navigation hides on desktop
- [x] Navigation links work and update active state
- [x] Shared package imports work in web app
- [x] TypeScript compilation succeeds
- [x] Mobile app starts without errors (tested on iOS Simulator)
- [x] Mobile tab navigation works (all 5 tabs load successfully)
- [x] Mobile app bundles successfully (1434 modules)

## Known Limitations

1. **Icons**: Web uses placeholder icons (●), mobile uses FontAwesome icons. Need consistent icon library.
2. **Styling**: Basic styling only - needs design system integration.
3. **Accessibility**: No ARIA labels or keyboard navigation implemented yet.
4. **Authentication**: No auth guards or protected routes.
5. **Android Testing**: Only tested on iOS Simulator, not tested on Android.

## Dependencies

**Shared Package:**
- TypeScript

**Web:**
- Next.js 16.1.6
- React 19.2.3
- Tailwind CSS 4

**Mobile:**
- Expo ~54.0.33
- React Native 0.81.5
- Expo Router ~6.0.23
- React Navigation 7.1.8

## Next Steps

Future features should:
1. Import navigation constants from `shared` package
2. Add new routes to the shared navigation config
3. Create corresponding pages/screens in both web and mobile
4. Integrate with authentication when implemented
5. Replace placeholder content with actual feature UI

