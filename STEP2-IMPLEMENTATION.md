# Match Setup Wizard - Step 2: Match Configuration

## Implementation Summary

Successfully implemented **Step 2 (Match Configuration)** of the 7-step Match Setup Wizard. Users can now select match type, mode (Casual/Competitive), team size, and stat intensity based on their sport choice.

## Changes Made

### 1. **Type System Enhancements** (`match-types.ts`)

Added new data structure to support sport-aware match type configuration:

```typescript
interface MatchTypeOption {
  type: MatchType;
  label?: string;
  enabled?: boolean;  // Default true if omitted
  description?: string;
}
```

Updated `SportConfig` to use `MatchTypeOption[]` instead of plain `MatchType[]`, allowing each sport to define which match types are enabled.

**Files Updated:**
- `/apps/web/src/lib/match-types.ts`
- `/apps/mobile/src/lib/match-types.ts`

### 2. **Basketball Configuration** 

Enhanced basketball configuration with explicit match type, team size, and stat intensity definitions:

```typescript
// Basketball Match Types
BASKETBALL_MATCH_TYPES: MatchTypeOption[] = [
  { type: MatchType.Single, label: 'Single Game', enabled: true },
  { type: MatchType.SetBased, label: 'Best of...', enabled: true },
  { type: MatchType.Tournament, label: 'Tournament', enabled: false },
  { type: MatchType.Rotational, label: 'Rotational', enabled: false }
];

// Team Sizes: 5v5, 3v3, 2v2, 1v1
// Stat Intensities: Basic, Advanced
```

**Files Updated:**
- `/apps/web/src/lib/basketballConfig.ts`
- `/apps/mobile/src/lib/basketballConfig.ts`

### 3. **Sport Configuration Stubs**

Updated disabled sport stubs to use the new `MatchTypeOption` structure with sensible defaults:

```typescript
const DEFAULT_MATCH_TYPES: MatchTypeOption[] = [
  { type: 'Single' as any, enabled: true },
  { type: 'SetBased' as any, enabled: false },
  { type: 'Tournament' as any, enabled: false },
  { type: 'Rotational' as any, enabled: false },
];
```

This ensures all sports consistently have the same match type framework, making it easier to implement them later.

**Files Updated:**
- `/apps/web/src/lib/sportConfigStubs.ts`
- `/apps/mobile/src/lib/sportConfigStubs.ts`

### 4. **MatchTypePicker Component - Sport-Aware Enhancement**

Updated `MatchTypePicker` component to be sport-aware:

**New Features:**
- Accepts optional `sport: SportType` prop
- Dynamically loads enabled/disabled match types from sport config
- Disables Tournament and Rotational types for basketball (for now)
- Shows "Coming Soon" overlay for disabled types

**Key Changes:**
- Reads from `SportConfigService` to get sport-specific match types
- Properly type-checks disable state (fixed TypeScript errors)
- Displays match type options only for enabled types in the sport

**File:** `/apps/web/src/components/match/MatchTypePicker.tsx`

### 5. **New MatchConfigStep Component (Web)**

Created a comprehensive `MatchConfigStep` component that wraps Match Type and Team Size/Stat pickers:

**Features:**
- ✅ Sport-aware match type picker
- ✅ Mode restriction for visitors (forced to Casual)
- ✅ Team size selection from sport config
- ✅ Stat intensity picker
- ✅ Intelligent defaults (first enabled option per sport)
- ✅ Visitor access notice
- ✅ Integrated Back/Next navigation
- ✅ Full validation before proceeding

**Auth Integration:**
```typescript
const isVisitor = user?.accountType === AccountType.Visitor;
const effectiveMode = isVisitor ? MatchMode.Casual : localMode;
```

Shows notice to visitors: _"As a visitor, you can only create casual matches. Sign up to access competitive match creation."_

**File:** `/apps/web/src/components/match/MatchConfigStep.tsx`

### 6. **New MatchConfigStep Component (Mobile)**

Created React Native version with equivalent functionality:

**Features:**
- Touch-friendly UI with proper sizing
- Grid layout for match type cards
- Mode toggle with visitor restrictions
- Team size picker
- Stat intensity selector
- Responsive styling

**File:** `/apps/mobile/src/components/match/MatchConfigStep.tsx`

### 7. **Match Create Page Integration**

Updated match create page to pass `sport` prop to `MatchTypePicker`:

```tsx
<MatchTypePicker 
  sport={selectedSport}  // ← New prop for sport-aware behavior
  selectedType={selectedMatchType}
  selectedMode={selectedMode}
  onSelectType={(type) => setMatchType(type, selectedMode || MatchMode.Casual)}
  onSelectMode={(mode) => setMatchType(selectedMatchType || MatchType.Single, mode)}
/>
```

This enables the component to dynamically show/hide match types based on sport configuration.

**File:** `/apps/web/src/app/matches/create/page.tsx`

## Architecture & Design

### Data Flow

```
Step 1 (Sport Selection)
          ↓
Step 2 (Match Configuration)
  ├─ MatchTypePicker (sport-aware)
  │  └─ Reads enabled types from SportConfigService
  ├─ ModeToggle (visitor-aware)
  │  └─ Forced Casual for visitors
  ├─ TeamSizePicker (sport-dependent)
  │  └─ Reads from sport config
  └─ StatIntensityPicker (sport-dependent)
     └─ Reads from sport config
          ↓
Step 3+ (Continue with Location, Teams, Rules...)
```

### Validation Logic

Step 2 can proceed when:
- ✅ Match type is selected
- ✅ Match mode is selected (Casual for visitors)
- ✅ Team size is selected
- ✅ Stat intensity is selected

Since defaults are provided on mount, the "Next" button is enabled after any user interaction to confirm their selections.

### Visitor Restriction Implementation

```typescript
// 1. Check user account type
const isVisitor = user?.accountType === AccountType.Visitor;

// 2. Force Casual mode
const effectiveMode = isVisitor ? MatchMode.Casual : localMode;

// 3. Disable mode toggle in UI when visitor
<ModeButton disabled={isVisitor} />

// 4. Show informational notice
{isVisitor && <VisitorNotice />}
```

## State Management

Leverages existing `MatchSetupSession` store with these actions:
- `setMatchType(type, mode)` - Set both match type and mode
- `setTeamSize(teamSize)` - Set team size configuration
- `setStatIntensity(intensity)` - Set stat tracking level

Store persists to localStorage for draft recovery via Zustand's `persist` middleware.

## Component API

### MatchConfigStep (Web & Mobile)

```typescript
interface MatchConfigStepProps {
  selectedSport?: SportType;      // From Step 1
  onNext?: () => void;            // Called when Next is pressed
  onBack?: () => void;            // Called when Back is pressed
}
```

**Exports:**
- Web: `MatchConfigStep` (React component)
- Mobile: `MatchConfigStep` (React Native component)

### MatchTypePicker Enhancement

```typescript
interface MatchTypePickerProps {
  sport?: SportType;              // NEW: Sport for enabled types lookup
  selectedType?: MatchType;
  selectedMode?: MatchMode;
  onSelectType: (type: MatchType) => void;
  onSelectMode: (mode: MatchMode) => void;
}
```

## Test Coverage

### Tested Scenarios

✅ Web app builds successfully  
✅ Mobile app type-checks without errors  
✅ Sport-specific match types load correctly  
✅ Basketball shows Single and SetBased as enabled  
✅ Basketball shows Tournament and Rotational as "Coming Soon"  
✅ Visitors see Casual mode forced and notice displayed  
✅ Team size options load from sport config  
✅ Stat intensity options load from sport config  
✅ Defaults initialize on mount  
✅ Store updates on selection changes  

### How to Test Manually

1. **Web:**
   ```bash
   cd apps/web && npm run dev
   # Navigate to /matches/create
   # Select Sport (Step 1) → Basketball
   # Observe Step 2 with match types, mode toggle, team sizes, stat intensities
   ```

2. **Mobile:**
   ```bash
   cd apps/mobile && npm start
   # Navigate to match creation flow
   # Verify same functionality with touch-friendly UI
   ```

3. **Test Visitor Mode:**
   - Login as Visitor account
   - Navigate to match creation
   - Verify Competitive mode is disabled
   - See visitor notice

## Future Extensions

### Adding a New Sport (e.g., Tennis)

1. Create match type options:
   ```typescript
   export const TENNIS_MATCH_TYPES: MatchTypeOption[] = [
     { type: MatchType.Single, label: 'Singles', enabled: true },
     { type: MatchType.SetBased, label: 'Sets', enabled: true },
     // ... others
   ];
   ```

2. Create team sizes:
   ```typescript
   export const TENNIS_TEAM_SIZES: TeamSizeConfig[] = [
     { label: '1v1', playersPerTeam: 1, substitutes: 0 },
     { label: '2v2', playersPerTeam: 2, substitutes: 1 },
   ];
   ```

3. Create stat intensities:
   ```typescript
   export const TENNIS_STAT_INTENSITIES: StatIntensity[] = [
     StatIntensity.Basic,
     StatIntensity.Advanced,
   ];
   ```

4. Update sport config:
   ```typescript
   export const TENNIS_CONFIG: SportConfig = {
     sport: SportType.Tennis,
     enabled: true,  // Set to true when ready
     icon: '🎾',
     displayName: 'Tennis',
     matchTypes: TENNIS_MATCH_TYPES,
     teamSizeOptions: TENNIS_TEAM_SIZES,
     statIntensities: TENNIS_STAT_INTENSITIES,
     // ...
   };
   ```

5. Register in `SportConfigService`:
   ```typescript
   this.registerSportConfig(TENNIS_CONFIG);
   ```

The UI will automatically adapt - no component changes needed!

## Known Limitations & TODOs

- ⏳ Tournament and Rotational match types are disabled (placeholders) - implement in future phases
- ⏳ Professional and Custom stat intensities not yet available - marked for future
- ⏳ Custom team sizes not supported - only predefined options
- ⏳ No sport-specific position mapping in Step 2 (handled in team building)

## Files Modified

### New Files Created:
- `/apps/web/src/components/match/MatchConfigStep.tsx`
- `/apps/mobile/src/components/match/MatchConfigStep.tsx`

### Modified Files:
- `/apps/web/src/lib/match-types.ts` - Added MatchTypeOption interface
- `/apps/web/src/lib/basketballConfig.ts` - Added explicit match type/stats arrays
- `/apps/web/src/lib/sportConfigStubs.ts` - Updated all stubs with MatchTypeOption
- `/apps/web/src/components/match/MatchTypePicker.tsx` - Made sport-aware
- `/apps/web/src/app/matches/create/page.tsx` - Pass sport prop to MatchTypePicker
- `/apps/mobile/src/lib/match-types.ts` - Added MatchTypeOption interface
- `/apps/mobile/src/lib/basketballConfig.ts` - Added explicit match type/stats arrays
- `/apps/mobile/src/lib/sportConfigStubs.ts` - Updated all stubs with MatchTypeOption

## Build Status

✅ **Web App:** Compiles successfully with Turbopack  
✅ **Mobile App:** Type-checks without errors  
✅ **All Components:** Properly typed and integrated  

## Next Steps

1. **Step 3 Implementation** - Location Selection
2. **Step 4 Implementation** - Team Assembly/Entry
3. **Step 5 Implementation** - Rules Configuration
4. **Step 6 Implementation** - Officials (Competitive only)
5. **Step 7 Implementation** - Finalization & Review
6. **E2E Testing** - Full wizard flow validation
7. **Mobile Screens Integration** - Connect mobile components to navigation

