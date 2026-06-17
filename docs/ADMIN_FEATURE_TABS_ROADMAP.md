# Admin Dashboard Feature Tabs - Implementation Roadmap

**Status:** Planning Phase  
**Priority:** High Value for dev workflow

## Phase 2: Additional Feature Tabs (Ready to Build)

### 1. **Badges Tab** 🏅
View, create, and assign achievement badges to users

**Features:**
- Display all available badges (system badges + custom)
- Assign/revoke badges from players
- Badge categories: Performance, Social, Community, Time-based
- Track which players have each badge

**Components needed:**
- `BadgeManagementTab` - Main UI
- Badge service functions (already exist in codebase)
- Badge card display component

---

### 2. **XP & Levels Tab** ⚡
Manage player experience points and progression

**Features:**
- View current XP, level, and progress to next level
- Adjust XP for testing
- See XP breakdown by sport
- XP history (optional log view)
- Level requirements visualization

**Components needed:**
- `XPManagementTab` - Main UI
- XP service integration (xpService exists)
- Level progression chart

---

### 3. **Player Stats Tab** 📊
Deep dive into individual player performance metrics

**Features:**
- View sport-specific statistics (win %, KDA, matches played, etc.)
- Edit stats for testing scenarios
- Performance trends by sport
- Comparison tools (vs average player)
- Test data generators

**Components needed:**
- `PlayerStatsTab` - Main UI
- Stats detail view (userStatsService exists)
- Chart components for trends

---

### 4. **Followers Network Tab** 🤝
Visualize and manage social relationships

**Features:**
- Network graph (followers/following visualization)
- Add/remove followers
- Search and filter users
- List view with follow status
- Batch follow/unfollow for testing

**Components needed:**
- `FollowersNetworkTab` - Main UI
- Network graph component (optional - can use list view)
- Follower service integration

---

### 5. **Court Regulars Tiers Tab** 🏟️
Fine-tune membership tier assignments by location

**Features:**
- View tier distribution by location  
- Manually assign/change tiers (Newbie → Regular → VIP → Legend)
- See tier requirements and thresholds
- Reset all tiers, recalculate stats
- Tier progression visualization

**Components needed:**
- `CourtRegularsTiersTab` - Main UI
- Tier badge/card display
- Court regulars service integration (already functional)

---

### 6. **Leaderboards Tab** 🏆
Admin view of competitive rankings

**Features:**
- Global XP leaderboard
- Sport-specific leaderboards
- Filter by city/location
- Reset leaderboards
- Generate challenge scenarios

**Components needed:**
- `LeaderboardsTab` - Main UI
- Leaderboard table component (reusable)
- Filter controls

---

### 7. **Ecosystem Health Tab** 💊
System-wide diagnostics and data integrity

**Features:**
- Data consistency checks
- Orphaned records (matches with missing locations, users with invalid stats)
- Storage size breakdown
- Performance metrics
- Auto-fix utilities

**Components needed:**
- `HealthCheckTab` - Main UI
- Diagnostic service functions
- Repair/cleanup utilities

---

## Implementation Priority

**High Priority (Max ROI):**
1. XP & Levels (essential for testing progression)
2. Badges (important for completeness)
3. Court Regulars Tiers (already working, just needs UI)

**Medium Priority (Nice to have):**
4. Player Stats (testing specific scenarios)
5. Followers Network (social features)

**Lower Priority (Polish):**
6. Leaderboards (displays read-only info)
7. Ecosystem Health (diagnostic tool)

---

## Tab Integration Pattern

Each new tab follows this pattern:

```tsx
{activeTab === 'badges' && (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      🏅 Badge Management
    </h2>
    {/* Tab content here */}
  </div>
)}
```

Add to tab list (line ~310):
```tsx
<button onClick={() => setActiveTab('badges')}>
  🏅 Badges ({badgeCount})
</button>
```

---

## Type Definitions Needed

```typescript
type AdminTabType = 
  | 'overview' 
  | 'court-regulars' 
  | 'users' 
  | 'locations' 
  | 'matches' 
  | 'events' 
  | 'badges'        // NEW
  | 'xp'            // NEW
  | 'stats'         // NEW
  | 'followers'     // NEW
  | 'leaderboards'  // NEW
  | 'health'        // NEW
  | 'storage';
```

---

## Existing Services to Leverage

- ✅ `userStatsService` - Player stats
- ✅ `xpService` - XP management
- ✅ `courtRegularsService` - Tier management
- ✅ `followerService` - Social network
- ✅ `badgeService` - Badge system

All services are already implemented! Tabs just need UI wrappers.

---

## Next Steps

1. **User Editor → ✅ DONE**
2. **Location Editor → ✅ DONE**
3. **Pick first feature tab** (recommend: XP & Levels)
4. Create component and integrate
5. Test with real data
6. Repeat for remaining tabs

Would you like to start with any specific tab?
