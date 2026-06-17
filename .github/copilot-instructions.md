# Athlee Codebase - AI Coding Instructions

**Last Updated:** 5 March 2026  
**Project:** Athlee (Sports Matching Platform) — Dual-platform (Web + Mobile)

---

## Quick Facts

- **Web Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS
- **Mobile Stack:** React Native (Expo), TypeScript strict, same Zustand stores as web
- **State Management:** Zustand + persist middleware (localStorage)
- **Data:** 100% mock data, no backend API integration yet
- **Build Status:** Web builds successfully ✅ | Mobile ready for testing
- **Test Coverage:** Intentionally excluded (UI-first, logic layer ready for tests)

---

## Architecture Overview

### Three-Tier Design Per Feature

```
┌─────────────────────────┐
│   UI Layer (React)      │  Pages, Screens, Components
│   (client-side)         │  (Tailwind for web, StyleSheet for mobile)
├─────────────────────────┤
│ State Management        │  Zustand stores with persist middleware
│ (localStorage)          │  (zustand/middleware)
├─────────────────────────┤
│ Service Layer           │  TypeScript service classes
│ (Business Logic)        │  (matchService, locationService, etc.)
├─────────────────────────┤
│ Domain Models           │  Enums, Interfaces, Type Definitions
│ (src/lib/*-types.ts)    │  (match-types.ts, location-types.ts, etc.)
└─────────────────────────┘
```

### Key Architectural Principles

1. **No Backend Yet** — All data flows through mock services → localStorage
2. **Service Contracts** — Each service exports a singleton instance (`matchService`, `locationService`)
3. **Interface-First** — Enums and interfaces define contracts before implementation
4. **Type Safety** — TypeScript strict mode enforced; use enums for status/mode/type values, **never** string literals
5. **Persistence** — Zustand's `persist` middleware auto-syncs state to localStorage on init

---

## Critical Patterns & Conventions

### 1. **Enum Usage (STRICT)**

**❌ NEVER use string literals:**
```typescript
// WRONG
match.status === 'Scheduled'
rules: { scoringSystem: 'Standard' }
mode || 'Casual'
```

**✅ ALWAYS use enum values:**
```typescript
// CORRECT
import { MatchStatus, ScoringSystem, MatchMode } from '@/lib/match-types';
match.status === MatchStatus.Scheduled
rules: { scoringSystem: ScoringSystem.Standard }
mode || MatchMode.Casual
```

**Why:** Type safety + IDE autocomplete + prevents runtime bugs from typos

### 2. **State Management Pattern**

All Zustand stores follow this structure:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // Data fields
  items: Item[];
  selectedId: string | null;
  
  // Actions
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
}

export const useExampleStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      selectedId: null,
      
      // Actions
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
    }),
    {
      name: 'athlee_example_storage' // localStorage key
    }
  )
);
```

**Key Points:**
- Use `set()` for state updates (returns new object)
- Use `get()` to read current state inside actions
- All stores persist to localStorage automatically via `persist` middleware
- Storage key pattern: `athlee_<feature>_storage`

### 3. **Service Pattern**

Each domain (locations, matches, users) has a singleton service:

```typescript
class LocationService {
  private readonly STORAGE_KEY = 'athlee_locations';
  
  public getLocations(): Location[] { ... }
  public createLocation(data: Partial<Location>): Location { ... }
  public updateLocation(id: string, updates: Partial<Location>): Location { ... }
  public filterLocations(filters: LocationFilters): Location[] { ... }
}

export const locationService = new LocationService();
```

**Import Pattern:**
```typescript
import { locationService } from '@/lib/locationService';

const locations = locationService.getLocations();
const filtered = locationService.filterLocations(filters);
```

### 4. **Type Definitions Organization**

Locate type files at `src/lib/<feature>-types.ts`:

- `src/lib/match-types.ts` — MatchType, MatchMode, MatchStatus, Match, Team, MatchRules, MatchScore
- `src/lib/location-types.ts` — SportType, LocationType, Location, LocationFilters
- `src/lib/auth-types.ts` — User, UserRole, AuthSession (placeholder)

**Pattern for Enums:**
```typescript
export enum MatchStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}
```

### 5. **Component Composition for Web (Next.js)**

- **Page components:** `src/app/[route]/page.tsx` — Full-screen views
- **Layout components:** `src/app/[route]/layout.tsx` — Shared structure (nav, sidebars)
- **Reusable components:** `src/components/` — Buttons, cards, modals
- **Feature-specific components:** `src/components/[feature]/` — MatchTypePicker, LocationCard, TeamEntry

**Example MatchTypePicker Component:**
```typescript
interface MatchTypePickerProps {
  selectedType: MatchType | null;
  selectedMode: MatchMode | null;
  onSelectType: (type: MatchType) => void;
  onSelectMode: (mode: MatchMode) => void;
}

export const MatchTypePicker: React.FC<MatchTypePickerProps> = ({ 
  selectedType, selectedMode, onSelectType, onSelectMode 
}) => {
  return (
    <div>
      {Object.values(MatchType).map(type => (
        <button key={type} onClick={() => onSelectType(type)}>
          {type}
        </button>
      ))}
    </div>
  );
};
```

### 6. **Modal/Wizard State Management**

Multi-step wizards (e.g., match creation) use Zustand stores with session state:

```typescript
// In matchSetupStore.ts
interface MatchSetupSession {
  currentStep: number;
  selectedSport: SportType | null;
  matchType: MatchType | null;
  // ... other fields
}

export const useMatchSetupStore = create<MatchSetupState>()(
  persist(
    (set) => ({
      session: { currentStep: 0, ... },
      setStep: (step) => set((state) => ({ session: { ...state.session, currentStep: step } })),
      setSport: (sport) => set((state) => ({ session: { ...state.session, selectedSport: sport } })),
      resetSession: () => set({ session: initialSession }),
    }),
    { name: 'athlee_match_setup' }
  )
);
```

**Usage in Component:**
```typescript
const { session, setStep, setSport, resetSession } = useMatchSetupStore();

useEffect(() => {
  if (!session.selectedSport) setSport(SportType.Basketball);
}, []);
```

---

## Build & Development Commands

### Web App (Next.js)

```bash
cd apps/web

# Development
npm run dev              # Runs on http://localhost:3000

# Production build (runs type checking + compilation)
npm run build            # Turbopack build (strict TS)
npm run start            # Serves built app

# Type checking only
npm run type-check       # tsc --noEmit

# Linting
npm run lint             # ESLint + Next.js lint
```

**Common Issues:**
- `npm run build` fails? Check TypeScript errors: Import enum types, replace string literals
- Port 3000 taken? Find with `lsof -i :3000` then kill process
- Build slow? Turbopack is still optimizing; first build is slowest

### Mobile App (Expo)

```bash
cd apps/mobile-new

# Development
npm start                # Expo menu (choose iOS/Android/web)
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run web              # Web preview (experimental)

# Type checking
npm run lint             # TypeScript check
```

**Build Status:** Foundation complete, ready for feature expansion

---

## File Structure & Conventions

### Web App (`apps/web/src/`)
```
app/
  layout.tsx              # Root layout (navigation, nav bar)
  page.tsx                # Home page
  matches/
    page.tsx              # Match list + filtering
    create/page.tsx       # Match creation wizard (6 steps)
    [id]/page.tsx         # Match detail view
    [id]/live/page.tsx    # Live scoring interface
  locations/
    page.tsx              # Location discovery + list
    [id]/page.tsx         # Location detail (5 tabs)
    create-community/     # Community court creation
  business/locations/     # Business dashboard
  
components/
  match/                  # Match-specific components
    SportPicker.tsx
    MatchTypePicker.tsx
    LocationPicker.tsx
    TeamEntry.tsx
    RulesConfig.tsx
    MatchSummary.tsx
  location/
    LocationCard.tsx
    
lib/
  match-types.ts          # Match domain models (enums, interfaces)
  location-types.ts       # Location domain models
  matchService.ts         # Match business logic (getMatches, createMatch, etc.)
  locationService.ts      # Location business logic
  mockMatches.ts          # Mock data for matches
  mockLocations.ts        # Mock data for locations
  
store/
  matchSetupStore.ts      # Zustand store for match creation wizard
  locationStore.ts        # Zustand store for location filtering/selection
```

### Mobile App (`apps/mobile-new/src/`)
```
screens/
  HomeScreen.tsx
  LocationsScreen.tsx
  MatchesScreen.tsx
  ProfileScreen.tsx
  
navigation/
  RootNavigator.tsx       # Bottom tabs + stack navigation
  
store/
  authStore.ts            # User authentication
  locationStore.ts        # Same contract as web
  matchStore.ts           # Same contract as web
  
lib/
  location-types.ts       # Shared with web
  match-types.ts          # Shared with web
  
hooks/
  useAuth.ts              # Auth context helper
```

---

## Current Implementation Status

### ✅ Complete Features

| Feature | Web | Mobile | Notes |
|---------|-----|--------|-------|
| **Auth** | Mock login | Mock login | In-memory, no persistence |
| **Location Discovery** | ✅ List + Filter | ✅ List + Filter | 15+ mock locations |
| **Location Detail** | ✅ 5 tabs | ⏳ In progress | Overview, Events, Bookings, Chat |
| **Match Creation** | ✅ 6-step wizard | ⏳ Ready | Sport → Type → Location → Teams → Rules → Summary |
| **Match List** | ✅ With filtering | ✅ Basic list | Supports Scheduled, InProgress, Completed filters |
| **Match Detail** | ✅ Full view | ⏳ In progress | Teams, scores, rules |
| **Live Match** | ✅ Placeholder | ⏳ Not started | Score tracking UI |
| **Business Dashboard** | ✅ Add/edit locations | ⏳ Not started | Multi-step forms |
| **Profile System** | ✅ User info | ✅ Basic profile | Stats, follow/followers (UI only) |

### ⏳ Next Priorities

1. **Mobile Location Detail Screen** — Reuse web component logic
2. **Mobile Match Creation Wizard** — 6-step wizard adaptation
3. **Live Match UI** — Score tracking, timer on both platforms
4. **Authentication Screens** — Login/Register with validation
5. **API Integration Prep** — Replace mock services with API calls

---

## Common AI Tasks & Patterns

### Adding a New Feature

1. **Define Types First** — Create `src/lib/feature-types.ts` with enums/interfaces
2. **Create Mock Data** — File `src/lib/mockFeature.ts` with sample data
3. **Build Service** — File `src/lib/featureService.ts` with CRUD logic
4. **Add Store** (if needed) — File `src/store/featureStore.ts` for UI state
5. **Build UI** — Components + pages (web) or screens (mobile)
6. **Connect Pieces** — Import service → use in component → persist with Zustand

**Example: Adding "Comments" Feature**
```
Step 1: src/lib/comment-types.ts (Comment interface, CommentStatus enum)
Step 2: src/lib/mockComments.ts (generateMockComments())
Step 3: src/lib/commentService.ts (getComments, createComment, deleteComment)
Step 4: src/store/commentStore.ts (useCommentStore for selection/filtering)
Step 5: src/components/CommentList.tsx + CommentForm.tsx
Step 6: Integrate into MatchDetailPage → use service → connect store
```

### Fixing TypeScript Errors

**Error:** "Type 'string' is not assignable to type 'MatchStatus'"

**Solution:**
```typescript
// ❌ Wrong
if (match.status === 'Scheduled') { ... }

// ✅ Right
import { MatchStatus } from '@/lib/match-types';
if (match.status === MatchStatus.Scheduled) { ... }
```

### Extending Filtering Logic

Filters follow a common pattern:

```typescript
// Define filters interface
interface LocationFilters {
  sports: SportType[];
  minRating?: number;
  searchTerm?: string;
}

// Implement filter function in service
filterLocations(filters: LocationFilters): Location[] {
  return this.getLocations().filter(loc => {
    if (filters.sports.length && !filters.sports.includes(loc.sports[0])) return false;
    if (filters.minRating && loc.rating < filters.minRating) return false;
    if (filters.searchTerm && !loc.name.includes(filters.searchTerm)) return false;
    return true;
  });
}

// Use in store + component
const filtered = locationService.filterLocations(filters);
```

---

## Key Files to Reference

- **Main Planning Doc:** [docs/plan/PLAN.md](../docs/plan/PLAN.md) — Feature specs, class diagrams, sequence flows
- **Web Build Config:** [apps/web/next.config.ts](apps/web/next.config.ts)
- **Mobile Config:** [apps/mobile-new/app.json](apps/mobile-new/app.json)
- **Root README:** [README.md](../README.md) — AI prompts for feature kickoff
- **Phase 1 Summary:** [docs/MOBILE-APP-PHASE1.md](../docs/MOBILE-APP-PHASE1.md)

---

## Integration Testing Checklist (Before Feature Completion)

- [ ] All TypeScript compiles (no `string` literals for enums)
- [ ] Mock data initializes on first run
- [ ] Zustand stores persist to localStorage (check DevTools)
- [ ] Components render without errors (React DevTools profiler)
- [ ] Navigation flows work (no dead routes)
- [ ] Filtering logic tested manually (web: /locations with sport filter)
- [ ] Services are contract-based (can swap to API later)
- [ ] No console errors (check browser DevTools)

---

## Questions to Ask Before Implementing

❓ **Most questions should be answerable from existing code.** Only ask if truly ambiguous:

- "Should new feature follow existing service/store pattern?" → **Yes, always**
- "Should I test this?" → **Not required for UI, but service logic should be testable**
- "Can I use string literals?" → **No, use enums from types file**
- "Where do I put mock data?" → **`src/lib/mock<Feature>.ts`**
- "How do I persist state?" → **Zustand store with `persist` middleware**

---

## Rapid Reference

| Need | Location | Example |
|------|----------|---------|
| Match status values | `src/lib/match-types.ts` | `MatchStatus.Scheduled` |
| Create mock matches | `src/lib/mockMatches.ts` | `generateMockMatches()` |
| Match service | `src/lib/matchService.ts` | `matchService.createMatch(data)` |
| Match setup wizard | `src/store/matchSetupStore.ts` | `useMatchSetupStore()` |
| Location list page | `apps/web/src/app/locations/page.tsx` | Full implementation |
| Mobile screens | `apps/mobile-new/src/screens/` | HomeScreen.tsx, MatchesScreen.tsx |
| Navigation (web) | `apps/web/src/app/layout.tsx` | Next.js routing |
| Navigation (mobile) | `apps/mobile-new/src/navigation/RootNavigator.tsx` | React Navigation tabs + stacks |

---

## Notes for Future Developers

1. **Enum Definition:** Always capitalize enum values (e.g., `MatchStatus.Scheduled` not `MatchStatus.scheduled`)
2. **Service Initialization:** Mock data loads on first access; subsequent loads from localStorage
3. **Web vs Mobile:** Both share the same type definitions and Zustand logic, but UI differs (Tailwind vs StyleSheet)
4. **Build Strictness:** `npm run build` uses Turbopack + TypeScript strict mode; it will catch all type errors—fix them
5. **localStorage Keys:** Always prefix with `athlee_` to avoid conflicts
6. **Component Props:** Pass callbacks from store actions, not useState setters
7. **Performance:** Zustand is lightweight; no need for Redux/Context API complexity
8. **Future API Integration:** Replace service methods with `fetch`/`axios` calls; Zustand selectors handle caching

---

**Created:** 5 March 2026  
**For Questions:** Refer to [README.md](../README.md) "MASTER AI PROMPT" section
