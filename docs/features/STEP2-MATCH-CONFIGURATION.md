# Step 2: Match Configuration Implementation Guide

**Last Updated:** March 6, 2026  
**Status:** ✅ Complete (Web) | ⏳ Ready for Mobile

---

## Overview

This document describes the complete implementation of **Step 2** of the Match Setup Wizard: **Match Configuration**. This step allows users to define the structure and parameters of their match (match type, mode, team size, stat intensity) based on the selected sport.

---

## Architecture

### Component Hierarchy

```
MatchTypeConfigurator (Orchestrator)
├── MatchTypeCard (Match Type Selection)
├── SubtypeCard (Subtype Selection - if applicable)
├── ModeToggle (Casual/Competitive)
├── TeamSizePicker (Team Size Selection - if required)
├── StatIntensityPicker (Stat Intensity Selection - if required)
├── BestOfPicker (Best of 3/5 - if applicable)
└── StepNavigation (Back/Next buttons)
```

### Data Flow

```
SportConfigService.getMatchTypes(sport)
    ↓
[MatchTypeConfig[], MatchSubtypeConfig[]]
    ↓
MatchTypeConfigurator (reads + validates)
    ↓
useMatchSetupStore.session
    ↓
(matchTypeId, subtypeId, mode, teamSize, statIntensity, bestOf)
```

---

## Type System

### Core Interfaces

#### `MatchTypeConfig`
Represents a match type (e.g., "Single Game", "Set-Based", "Tournament")

```typescript
interface MatchTypeConfig {
  id: string;                     // Unique ID: "single", "set-based", etc.
  name: string;                   // Display name
  description: string;            // User-facing description
  icon?: string;                  // Emoji icon (e.g., "🏀")
  enabled: boolean;               // Whether this type is available
  subtypes?: MatchSubtypeConfig[];// Variants of this type
  requiresTeamSize: boolean;      // Whether team size must be selected
  requiresStatIntensity: boolean; // Whether stat intensity must be selected
  defaultTeamSize?: string;       // Default team size (e.g., "5v5")
  defaultStatIntensity?: StatIntensity;
  tooltip?: string;               // Info for disabled types (e.g., "Coming soon")
}
```

#### `MatchSubtypeConfig`
Represents a variant of a match type (e.g., "H.O.R.S.E.", "Best of Series")

```typescript
interface MatchSubtypeConfig {
  id: string;                     // Unique ID: "horse", "best-of", etc.
  name: string;                   // Display name
  description: string;            // User-facing description
  enabled: boolean;               // Whether this subtype is available
  requiresTeamSize: boolean;      // Whether team size selection needed
  fixedTeamSize?: string;         // Fixed team size if not selectable (e.g., "1v1" for HORSE)
  requiresStatIntensity: boolean; // Whether stat intensity needed
  defaultStatIntensity?: StatIntensity;
  requiresBestOf?: boolean;       // Whether best-of series toggle needed
  defaultBestOf?: number;         // Default: 3 or 5
  icon?: string;                  // Emoji icon
  tooltip?: string;               // Info for disabled subtypes
}
```

#### `MatchSetupSession` (Extended)
Session state now includes:

```typescript
interface MatchSetupSession {
  // New fields for Step 2
  matchTypeId?: string;           // e.g., "single", "set-based"
  subtypeId?: string;             // e.g., "horse", "best-of"
  bestOf?: number;                // For best-of series: 3 or 5
  
  // Existing fields
  mode?: MatchMode;               // Casual or Competitive
  teamSize?: TeamSizeConfig;
  statIntensity?: StatIntensity;
  // ...
}
```

---

## Basketball Configuration

### Match Types

#### 1. **Single Game**
A standalone pickup match with a final score.

```typescript
{
  id: "single",
  name: "Single Game",
  description: "A standalone pickup game with final score",
  icon: "🏀",
  enabled: true,
  requiresTeamSize: true,           // User selects team size
  requiresStatIntensity: true,      // User selects stat intensity
  defaultTeamSize: "5v5",
  defaultStatIntensity: StatIntensity.Basic,
  subtypes: undefined               // No subtypes
}
```

**Subtypes:** None

**Configuration Flow:**
- Select: "Single Game"
- Choose Mode: Casual or Competitive
- Choose Team Size: 5v5 (default), 3v3, 2v2, 1v1
- Choose Stat Intensity: Basic (default), Advanced
- ✅ Can proceed

---

#### 2. **Set-Based Challenges**
A series of mini-games or challenge matches.

```typescript
{
  id: "set-based",
  name: "Set-Based Challenges",
  description: "A series of mini-games or challenges",
  icon: "🎪",
  enabled: true,
  requiresTeamSize: false,          // Depends on subtype
  requiresStatIntensity: false,     // Depends on subtype
  subtypes: [HORSE_SUBTYPE, BEST_OF_SUBTYPE]
}
```

**Subtypes:**

##### A. **H.O.R.S.E.**
Players replicate trick shots—first to spell the word loses.

```typescript
{
  id: "horse",
  name: "H.O.R.S.E.",
  description: "Players replicate trick shots",
  icon: "🎯",
  enabled: true,
  requiresTeamSize: false,          // Fixed to 1v1
  fixedTeamSize: "1v1",             // Shown as fixed label
  requiresStatIntensity: false,     // No stat tracking
  subtypes: undefined
}
```

**Configuration Flow:**
- Select: "Set-Based Challenges"
- Select Subtype: "H.O.R.S.E."
- Choose Mode: Casual or Competitive
- Team Size: "1v1" (fixed, display only)
- Stat Intensity: None (skipped)
- ✅ Can proceed

##### B. **Best of Series**
Best of 3 or 5 games between teams.

```typescript
{
  id: "best-of",
  name: "Best of Series",
  description: "Best of 3 or 5 games",
  icon: "🏆",
  enabled: true,
  requiresTeamSize: true,           // User selects
  requiresStatIntensity: true,      // User selects
  defaultStatIntensity: StatIntensity.Basic,
  requiresBestOf: true,             // Show best-of toggle
  defaultBestOf: 3                  // Default to best-of-3
}
```

**Configuration Flow:**
- Select: "Set-Based Challenges"
- Select Subtype: "Best of Series"
- Choose Mode: Casual or Competitive
- Choose Team Size: 5v5, 3v3, 2v2, 1v1
- Choose Stat Intensity: Basic (default), Advanced
- Choose Best Of: 3 games (default) or 5 games
- ✅ Can proceed

---

#### 3. **Tournament** (Placeholder)
Structured bracket or league play.

```typescript
{
  id: "tournament",
  name: "Tournament",
  description: "Structured bracket or league play",
  icon: "🏆",
  enabled: false,                   // Disabled - coming soon
  tooltip: "Coming soon",
  subtypes: [
    { id: "single-elim", name: "Single Elimination", ..., enabled: false },
    { id: "double-elim", name: "Double Elimination", ..., enabled: false },
    { id: "round-robin", name: "Round Robin", ..., enabled: false }
  ]
}
```

**Status:** Placeholder. Disabled card shows "Coming soon" tooltip.

---

#### 4. **Rotational** (Placeholder)
Winner stays on or rotating players.

```typescript
{
  id: "rotational",
  name: "Rotational",
  description: "Winner stays on or rotating players",
  icon: "🔄",
  enabled: false,                   // Disabled - coming soon
  tooltip: "Coming soon",
  subtypes: [
    { id: "king-court", name: "King of the Court", ..., enabled: false },
    { id: "chicago", name: "Chicago", ..., enabled: false },
    { id: "timed", name: "Timed Rotations", ..., enabled: false }
  ]
}
```

**Status:** Placeholder. Disabled card shows "Coming soon" tooltip.

---

## State Management

### Store: `useMatchSetupStore`

#### New Actions

```typescript
// Get match types for a sport
getMatchTypes(sport: SportType): MatchTypeConfig[]

// Get subtypes for a selected match type
getSubtypesForType(sport: SportType, matchTypeId: string): MatchSubtypeConfig[]

// Validate that all required fields are completed
canProceedStep2(): boolean

// Set selected match type ID
setMatchTypeId(matchTypeId: string): void

// Set selected subtype ID
setSubtypeId(subtypeId: string | undefined): void

// Set selected best-of value (3 or 5)
setBestOf(bestOf: number | undefined): void

// Set match mode (Casual or Competitive)
setMode(mode: MatchMode): void
```

#### Validation Logic (`canProceedStep2`)

Returns `true` only when all required fields are completed:

1. **Match Type Required:** A match type must be selected
2. **Subtype Resolution:**
   - If selected type has subtypes → require subtype selection
   - If selected type has no subtypes → skip subtype
3. **Team Size (if required):**
   - Get `requiresTeamSize` from type/subtype config
   - If true → require `teamSize` selection
4. **Stat Intensity (if required):**
   - Get `requiresStatIntensity` from type/subtype config
   - If true → require `statIntensity` selection
5. **Best Of (if required):**
   - Get `requiresBestOf` from subtype config
   - If true → require `bestOf` selection (3 or 5)

**Example:** Single Game → requires team size + stat intensity  
**Example:** H.O.R.S.E. → no team size picker (fixed) + no stat intensity  
**Example:** Best of Series → requires team size + stat intensity + best-of toggle

---

## Component Details

### 1. MatchTypeCard
Displays a match type option as an interactive card.

**Props:**
```typescript
interface MatchTypeCardProps {
  config: MatchTypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  hasSubtypes?: boolean;           // Shows "→ Subtypes" indicator
}
```

**Behavior:**
- ✅ Enabled type → clickable, highlight on selection
- ❌ Disabled type → greyed out, show tooltip, not clickable
- Subtypes indicator → shown if type has subtypes

---

### 2. SubtypeCard
Displays a match subtype option as an interactive card.

**Props:**
```typescript
interface SubtypeCardProps {
  config: MatchSubtypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
```

**Behavior:**
- Shows fixed team size if applicable (e.g., "1v1" for HORSE)
- ✅ Enabled subtype → clickable, highlight on selection
- ❌ Disabled subtype → greyed out, show tooltip

---

### 3. ModeToggle
Selects between Casual and Competitive match modes.

**Props:**
```typescript
interface ModeToggleProps {
  selectedMode: MatchMode | undefined;
  onSelectMode: (mode: MatchMode) => void;
  disabled?: boolean;
}
```

**Appearance:**
- Two buttons: "👕 Casual" and "🏆 Competitive"
- Helpful info text below explaining each mode

---

### 4. TeamSizePicker
Selects team size (5v5, 3v3, 2v2, 1v1).

**Props:**
```typescript
interface TeamSizePickerProps {
  options: TeamSizeConfig[];
  selectedTeamSize: TeamSizeConfig | undefined;
  onSelectTeamSize: (teamSize: TeamSizeConfig) => void;
  disabled?: boolean;
  fixedSize?: string;               // If specified, shows as fixed label
}
```

**Behavior:**
- If `fixedSize` provided → show fixed label with explanation
- Otherwise → show grid of buttons, one per team size
- Each button shows team size label and substitute count

---

### 5. StatIntensityPicker
Selects stat tracking intensity (Basic, Advanced, etc.).

**Props:**
```typescript
interface StatIntensityPickerProps {
  options: StatIntensity[];
  selectedIntensity: StatIntensity | undefined;
  onSelectIntensity: (intensity: StatIntensity) => void;
  disabled?: boolean;
}
```

**Appearance:**
- List of options with descriptions
- E.g., Basic = "Points only", Advanced = "Points, Rebounds, Assists, Steals, Blocks"

---

### 6. BestOfPicker
Selects best-of value (3 or 5 games).

**Props:**
```typescript
interface BestOfPickerProps {
  selectedBestOf: number | undefined;
  onSelectBestOf: (bestOf: number) => void;
  disabled?: boolean;
}
```

**Appearance:**
- Two buttons: "3 Best of 3" and "5 Best of 5"
- Shows "First to X wins" based on selection

---

### 7. MatchTypeConfigurator
Main orchestrator component for Step 2.

**Props:**
```typescript
interface MatchTypeConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}
```

**Behavior:**
- Loads match types from `SportConfigService`
- Displays match type cards
- If type has subtypes → show subtype cards
- Show mode toggle
- Conditionally show team size picker (if required + not fixed)
- Conditionally show stat intensity picker (if required)
- Conditionally show best-of toggle (if required)
- Validate all fields before enabling "Next"
- Pre-select defaults on load

**Defaults:**
- Match Mode: Casual
- Team Size: First option (usually "5v5")
- Stat Intensity: Basic
- Best Of: 3

---

## SportConfigService

### API

```typescript
class SportConfigService {
  // Get all match types for a sport
  getMatchTypes(sport: SportType): MatchTypeConfig[]
  
  // Get all other config (team sizes, stat intensities, rule presets)
  getConfig(sport: SportType): SportConfig | null
  
  // ... existing methods ...
}
```

### Implementation

For each sport, `SportConfig` now includes:

```typescript
interface SportConfig {
  sport: SportType;
  enabled: boolean;
  icon: string;
  displayName: string;
  description?: string;
  
  // Existing fields
  matchTypes: MatchTypeOption[];
  teamSizeOptions: TeamSizeConfig[];
  statIntensities: StatIntensity[];
  rulePresets: RulePreset[];
  positions?: string[];
  
  // New field
  matchTypeConfigs?: MatchTypeConfig[];  // Step 2 configuration
}
```

---

## Adding New Sports

To add a new sport with full Step 2 support:

1. **Create Sport Type** (in `location-types.ts`):
   ```typescript
   export enum SportType {
     // ...
     NewSport = 'NewSport',
   }
   ```

2. **Create Sport Config** (e.g., `newSportConfig.ts`):
   ```typescript
   import { MatchTypeConfig, SportConfig } from '@/lib/match-types';
   
   export const NEWSPORT_MATCH_TYPES: MatchTypeConfig[] = [
     {
       id: 'single',
       name: 'Single Game',
       // ... config
     },
     // ... other types
   ];
   
   export const NEWSPORT_CONFIG: SportConfig = {
     sport: SportType.NewSport,
     enabled: true,
     icon: '⚽', // or appropriate emoji
     displayName: 'New Sport',
     description: 'Description',
     matchTypes: NEWSPORT_MATCH_TYPES.map(mt => ({
       type: MatchType.Single, // map types
       label: mt.name,
       enabled: mt.enabled,
       description: mt.description,
     })),
     teamSizeOptions: [...],
     statIntensities: [...],
     rulePresets: [...],
     matchTypeConfigs: NEWSPORT_MATCH_TYPES,
   };
   ```

3. **Register in SportConfigService**:
   ```typescript
   constructor() {
     this.registerSportConfig(NEWSPORT_CONFIG);
     // ...
   }
   ```

---

## Adding New Match Types/Subtypes to Basketball

To add a new match type to basketball:

1. **Create MatchTypeConfig** (in `basketballConfig.ts`):
   ```typescript
   export const NEW_TYPE: MatchTypeConfig = {
     id: 'new-type',
     name: 'New Type',
     description: '...',
     icon: '🎯',
     enabled: true,  // or false if placeholder
     requiresTeamSize: true,
     requiresStatIntensity: true,
     subtypes: [
       // Optional subtypes
     ],
   };
   ```

2. **Add to BASKETBALL_MATCH_TYPES_CONFIG**:
   ```typescript
   export const BASKETBALL_MATCH_TYPES_CONFIG: MatchTypeConfig[] = [
     SINGLE_GAME_TYPE,
     SET_BASED_TYPE,
     TOURNAMENT_TYPE,
     ROTATIONAL_TYPE,
     NEW_TYPE,  // Add here
   ];
   ```

3. **Update BASKETBALL_CONFIG**:
   ```typescript
   export const BASKETBALL_CONFIG: SportConfig = {
     // ... existing fields
     matchTypeConfigs: BASKETBALL_MATCH_TYPES_CONFIG,  // Auto-includes new type
   };
   ```

---

## File Structure

### Web Application

```
apps/web/src/
├── lib/
│   ├── match-types.ts              // Type definitions
│   ├── basketballConfig.ts         // Basketball match types & subtypes
│   ├── sportConfigStubs.ts         // Stub configs for disabled sports
│   └── sportConfigService.ts       // Service with getMatchTypes()
│
├── store/
│   └── matchSetupStore.ts          // Store with new actions & validation
│
└── components/match/
    ├── MatchTypeCard.tsx           // Match type display
    ├── SubtypeCard.tsx             // Subtype display
    ├── ModeToggle.tsx              // Mode selection
    ├── TeamSizePicker.tsx          // Team size selection
    ├── StatIntensityPicker.tsx     // Stat intensity selection
    ├── BestOfPicker.tsx            // Best-of series selection
    └── MatchTypeConfigurator.tsx   // Main Step 2 component
```

### Mobile Application (Mirror Structure)

```
apps/mobile/src/
├── lib/
│   ├── match-types.ts
│   ├── basketballConfig.ts
│   └── sportConfigService.ts
│
├── store/
│   └── matchSetupStore.ts
│
└── components/match/
    ├── MatchTypeCard.tsx (React Native version)
    ├── SubtypeCard.tsx (React Native version)
    ├── ModeToggle.tsx (React Native version)
    ├── TeamSizePicker.tsx (React Native version)
    ├── StatIntensityPicker.tsx (React Native version)
    ├── BestOfPicker.tsx (React Native version)
    └── MatchTypeConfigurator.tsx (React Native version)
```

---

## Testing Checklist

- [ ] Web build compiles without errors (`npm run build`)
- [ ] Basketball match types load correctly
- [ ] Single Game type shows team size + stat intensity pickers
- [ ] H.O.R.S.E. subtype shows fixed team size (1v1) and no stat picker
- [ ] Best of Series subtype shows team size + stat intensity + best-of toggle
- [ ] Disabled types (Tournament, Rotational) show "Coming soon" tooltip
- [ ] Default values pre-select on mount
- [ ] "Next" button only enabled when all required fields completed
- [ ] Back button returns to Step 1
- [ ] Mode toggle switches between Casual and Competitive
- [ ] Validation error message shows when incomplete

---

## Future Enhancements

1. **Tournament Implementation**
   - Bracket generation logic
   - Seeding algorithms
   - Real-time bracket updates

2. **Rotational Modes**
   - King of the Court logic
   - Chicago variant rules
   - Timed rotation management

3. **Additional Sports**
   - Soccer/Football
   - Tennis
   - Volleyball
   - Pickleball
   - Baseball
   - American Football

4. **Advanced Customization**
   - Custom stat intensities
   - Custom rule presets per match type
   - Dynamic team size limits based on match type

5. **Mobile Optimization**
   - Swipeable card carousel for match types
   - Bottom sheet for option selection
   - Haptic feedback on selection

---

## Integration Notes

### Match Creation Flow

1. **Step 0:** User selects sport → `setSport(sport)`
2. **Step 1:** User selects match type & mode → `setMatchTypeId(id)`, `setMode(mode)`
   - Pre-selects defaults: Casual mode, first team size, Basic stats
3. **Step 2:** UI guides through configuration
   - Call `canProceedStep2()` to validate
   - Once valid, "Next" is enabled
4. **Step 3+:** Location, Teams, Rules, Officials, Finalization

### Session Persistence

- `MatchSetupSession` is stored in Zustand store
- Can be persisted to localStorage for draft recovery
- All Step 2 selections preserved when navigating back/forward

---

## Support for Multiple Match Modes

**Casual Matches:**
- Simplified rules
- No jersey numbers required
- Basic stat tracking
- Welcoming to all skill levels

**Competitive Matches:**
- Strict validation
- Jersey numbers required
- Advanced stat tracking
- May include officials (Step 6)

---

## Summary

**Step 2** provides a flexible, sport-aware configuration system for match setup. Users can:

✅ Select match type (Single Game, Set-Based, Tournament, Rotational)  
✅ Choose subtypes if applicable (HORSE, Best of, etc.)  
✅ Select match mode (Casual or Competitive)  
✅ Configure team size based on sport/type  
✅ Choose stat tracking intensity  
✅ See helpful descriptions and guidance

The system is fully extensible to support new sports and match types as they're implemented.

---

**Delivery Date:** March 6, 2026  
**Web Status:** ✅ Complete | Mobile Ready for adaptation  
**Build Status:** ✅ Compiles successfully
