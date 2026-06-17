# User Data Structure & System Connections

**Last Updated:** 11 March 2026  
**Purpose:** Complete mapping of how a registered user connects throughout the Athlee ecosystem

---

## Core User Model

### Base User Structure (mockUsersComprehensive.ts)

```typescript
interface User {
  id: string;                    // Unique identifier
  email: string;                 // Unique email
  firstName: string;             // First name
  lastName: string;              // Last name
  username: string;              // Display name (unique)
  accountType: 'Player' | 'Business';
  profileImage: string;          // Optional profile image URL
  bio: string;                   // User bio
  city: string;                  // City of residence
  state: string;                 // State (US only currently)
  phone: string;                 // Contact phone
  joinDate: string;              // ISO date when user registered
  isActive: boolean;             // Account status
  preferredSports: string[];     // Array of sports user plays
}
```

---

## Data Ecosystem - User Connections

### 1️⃣ **User Stats Service** (`athlee_user_stats_{userId}`)
**Storage Key:** `athlee_user_stats_{userId}`  
**Service:** `userStatsService.ts`

```typescript
interface UserStatsProfile {
  userId: string;
  username: string;
  totalXP: number;                          // Career XP total
  level: number;                            // 1-10 (Rookie → Legend)
  rankTitle: string;                        // Rookie | Contender | All-Star | Elite | Legend
  totalMatches: number;                     // Total matches played across all sports
  totalWins: number;                        // Total wins across all sports
  totalLosses: number;                      // Total losses
  careerWinPercentage: number;              // Win rate as percentage
  mvpCount: number;                         // Total MVP awards
  currentStreak: number;                    // Current win streak
  longestStreak: number;                    // Best streak
  followerCount: number;                    // Number of followers
  followingCount: number;                   // Number of people following
  sportStats: Record<string, SportStats>;   // Per-sport breakdown ↓
  recentMatches: UserMatchRecord[];         // Last 20 matches played
  createdAt: string;                        // Stats creation timestamp
  lastActive: string;                       // Last activity timestamp
}

interface SportStats {
  sport: string;                 // Basketball, Soccer, Tennis, etc.
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  draws: number;
  points: number;                // Cumulative stat (varies by sport)
  assists: number;               // Cumulative assists
  rebounds: number;              // Basketball-specific
  goals: number;                 // Soccer-specific
  aces: number;                  // Volleyball/Tennis-specific
  mvpAwards: number;             // MVPs in this sport
  avgPointsPerGame: number;
  avgAssistsPerGame: number;
  winPercentage: number;
  rating: number;                // 0-5 star rating
}

interface UserMatchRecord {
  matchId: string;
  date: string;
  sport: string;
  opponent: string;
  result: 'win' | 'loss';
  points?: number;
  assists: number;
  rebounds: number;
  mvp: boolean;
  xpEarned: number;
}
```

**Connection Points:**
- ✅ Created when user initializes ecosystem
- ✅ Updated when user participates in matches
- ✅ Used by Leaderboards tab
- ✅ Used by Health & Stats tab
- ✅ Updated by Admin dashboard edits

---

### 2️⃣ **Follower Relationships** (`athlee_follows_{userId}`)
**Storage Key:** `athlee_follows_{userId}`  
**Service:** `followerService.ts`

```typescript
interface FollowerRelationship {
  userId: string;                // User who has followers
  followers: string[];           // Array of user IDs following this user
  following: string[];           // Array of user IDs this user follows
  mutualFollows: string[];       // Bidirectional follows (both follow each other)
  lastUpdated: string;           // ISO timestamp
}

interface UserFollowsProfile {
  userId: string;
  followers: number;
  following: number;
  mutualFollows: number;
}
```

**Connection Points:**
- ✅ Generated during ecosystem initialization (5-30% network density)
- ✅ Managed through Followers Network tab
- ✅ Referenced by Health & Stats (follower counts)
- ✅ Integrated into leaderboard rankings

---

### 3️⃣ **Court Regulars (Location-Based Tiers)** (`athlee_court_regulars_{locationId}`)
**Storage Key:** `athlee_court_regulars_{locationId}`  
**Service:** `courtRegularsService.ts`

```typescript
interface CourtRegular {
  userId: string;
  username: string;
  visitCount: number;            // Total visits to this location
  tier: 'Newbie' | 'Regular' | 'VIP' | 'Legend';
  firstVisit: string;
  lastVisit: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  matchesAtLocation: number;
  winsAtLocation: number;
  xpEarnedAtLocation: number;
  badges: string[];              // Location-specific achievements
}

interface LocationCourtRegulars {
  locationId: string;
  regulars: CourtRegular[];      // Sorted by tier & visit count
  totalLegends: number;
  totalVIPs: number;
  totalRegulars: number;
  totalNewbies: number;
}
```

**Tier Calculation:**
- **Newbie**: 1-5 visits
- **Regular**: 6-20 visits
- **VIP**: 21-50 visits
- **Legend**: 50+ visits

**Connection Points:**
- ✅ Refreshed when ecosystem initializes
- ✅ Updated when user participates in match at location
- ✅ Displayed in Court Regulars tab
- ✅ Used in location detail views (shows top regulars)
- ✅ Awards badges based on tier achievements

---

### 4️⃣ **XP & Levels** (In UserStatsProfile)
**Storage Key:** Part of `athlee_user_stats_{userId}`  
**Service:** `xpService.ts`

```typescript
XP Thresholds:
Level 1: 0-99 XP (Rookie)
Level 2: 100-249 XP (Rookie)
Level 3: 250-499 XP (Contender)
Level 4: 500-999 XP (Contender)
Level 5: 1000-1999 XP (All-Star)
Level 6: 2000-3999 XP (All-Star)
Level 7: 4000-7999 XP (Elite)
Level 8: 8000-15999 XP (Elite)
Level 9: 16000-31999 XP (Legend)
Level 10: 32000+ XP (Legend)

XP Earning Sources:
- Match participation: 10 XP (base)
- Match win: +5 XP bonus
- MVP award: +20 XP bonus
- Badge earned: +15-50 XP depending on difficulty
```

**Connection Points:**
- ✅ Displayed in XP & Levels tab
- ✅ Used in leaderboard ranking (secondary sort key)
- ✅ Affects Court Regulars tier advancement
- ✅ Part of Health & Stats (level/XP tracking)

---

### 5️⃣ **Badges & Achievements** (`athlee_badge_awards_{userId}`)
**Storage Key:** `athlee_badge_awards_{userId}`  
**Service:** `badgeAwardService.ts`

```typescript
interface BadgeAward {
  badgeId: string;
  userId: string;
  awardedDate: string;
  category: BadgeCategory;
  title: string;                 // e.g., "First Blood", "Dominator"
  description: string;
  xpReward: number;
  iconUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  conditions: BadgeCondition[];
  
  // Achievement tracking
  progress: number;              // Current progress toward badge
  maxProgress: number;           // Completion threshold
  isLocked: boolean;
}

enum BadgeCategory {
  Milestone = 'Milestone',       // 100 matches, 1000 XP, etc.
  Achievement = 'Achievement',   // First MVP, Win Streak, etc.
  Sport = 'Sport',               // 50 Basketball matches, etc.
  Social = 'Social',             // 100 followers, etc.
  Location = 'Location',         // Legend at 5 locations, etc.
  Challenge = 'Challenge',       // Limited-time challenges
}
```

**Badge Types:**
1. **Milestone Badges**: Threshold-based (match count, XP totals)
2. **Achievement Badges**: Event-based (first MVP, 10-win streak)
3. **Sport Badges**: Per-sport specialization
4. **Social Badges**: Follower milestones
5. **Location Badges**: Court Regular progression
6. **Challenge Badges**: Seasonal/limited-time

**Connection Points:**
- ✅ Displayed in Badges tab
- ✅ Show in player profiles
- ✅ Contribute to overall ranking (visual distinction)
- ✅ Trigger from match completions
- ✅ Part of Health & Stats (badge count)

---

### 6️⃣ **Leaderboards** (Calculated from Stats)
**Storage Key:** Calculated in-memory from `athlee_user_stats_*` keys  
**Service:** `leaderboardService.ts`

```typescript
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  value: number;                 // The ranked metric
  statKey: string;               // winPercentage, totalXP, mvpCount, etc.
  sport?: string;                // Optional: sport-specific ranking
  timeFrame: TimeFrame;          // allTime, weekly, monthly
  change: number;                // Rank change from previous period
  medal?: '🥇' | '🥈' | '🥉';     // Top 3 only
}

type TimeFrame = 'allTime' | 'weekly' | 'monthly';

enum LeaderboardType {
  Global = 'global',             // All players
  PerSport = 'perSport',         // Sport-specific
  ByLocation = 'byLocation',     // By venue
}
```

**Ranking Keys:**
1. **Wins** - Total wins across all sports
2. **Win Rate** - Win percentage (min 20 matches)
3. **XP** - Total experience points
4. **MVP Count** - Total MVP awards
5. **Matches Played** - Total games participated
6. **Followers** - Social influence

**Connection Points:**
- ✅ Displayed in Leaderboards tab
- ✅ Sport-specific filtering
- ✅ Time-frame filtering (all-time, weekly, monthly)
- ✅ Used in player profiles
- ✅ Part of Health & Stats Performance view
- ✅ Affects match recommendations

---

### 7️⃣ **Match Participation**
**Storage Key:** `athlee_matches` (global) + individual matches  
**Service:** `matchService.ts`

```typescript
interface Match {
  id: string;
  sportType: string;             // Basketball, Soccer, etc.
  matchType: string;             // Casual, Competitive, League
  matchMode: string;             // 1v1, 2v2, 3v3, 5v5, etc.
  status: 'Draft' | 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled';
  
  location: {
    id: string;
    name: string;
    address: string;
  };
  
  dateTime: string;
  duration: number;              // Minutes
  
  teams: Team[];                 // 2-4 teams typically
  
  creator: {
    id: string;
    username: string;
  };
  
  participants: {
    userId: string;
    teamId: string;
    skillLevel: string;
    joinedAt: string;
  }[];
  
  score?: {
    teamId: string;
    points: number;
  }[];
  
  mvp?: {
    userId: string;
    username: string;
  };
  
  stats?: Record<string, PlayerMatchStat>;
  completedAt?: string;
  xpAwards?: Record<string, number>;
}

interface Team {
  id: string;
  name: string;
  captain: string;
  members: string[];
  score: number;
}
```

**User Connection Points:**
- ✅ User is creator or participant
- ✅ Adds to totalMatches in UserStatsProfile
- ✅ Contributes to sport-specific stats
- ✅ May award MVP (adds mvpCount)
- ✅ Generates XP
- ✅ Updates Court Regulars visit count
- ✅ May trigger badge awards
- ✅ Affects leaderboard rankings

---

### 8️⃣ **Locations & Venues** (`athlee_locations`)
**Storage Key:** `athlee_locations` (global array)  
**Service:** `locationService.ts`

```typescript
interface Location {
  id: string;
  name: string;
  description: string;
  sports: string[];              // Sports available at location
  
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    googleMapsUrl: string;
  };
  
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  
  facilities: {
    courts: number;
    amenities: string[];         // Parking, Wifi, Showers, etc.
    capacity: number;
  };
  
  hours: {
    weekday: string;             // e.g., "6am-10pm"
    weekend: string;
  };
  
  pricing: {
    reservationFee: number;
    hourlyRate: number;
  };
  
  owner: {
    id: string;
    username: string;
    accountType: 'Business';
  };
  
  ratingStats: {
    averageRating: number;
    reviewCount: number;
    favoriteCount: number;
  };
  
  courtRegulars: string[];       // User IDs of regulars
  upcomingMatches: string[];     // Match IDs
  createdAt: string;
}
```

**User Connection Points:**
- ✅ User can be venue owner (Business account)
- ✅ User participates in matches at locations
- ✅ User becomes Court Regular (tracked per location)
- ✅ User views location details, facility info
- ✅ User books time slots at location
- ✅ User leaves reviews (future feature)

---

### 9️⃣ **Events & Bookings** (`athlee_events_*`, `athlee_bookings_*`)
**Storage Key:** `athlee_events`, `athlee_bookings`  
**Service:** `eventsService.ts`

```typescript
interface Event {
  id: string;
  locationId: string;
  creatorId: string;
  title: string;
  description: string;
  sport: string;
  eventType: 'Tournament' | 'League' | 'Casual' | 'Training';
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  participants: string[];        // User IDs
  status: 'Draft' | 'Published' | 'InProgress' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface Booking {
  id: string;
  userId: string;
  locationId: string;
  courtId: string;               // Specific court number
  sportType: string;
  startTime: string;
  endTime: string;
  participants: string[];
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  totalCost: number;
  createdAt: string;
}
```

**User Connection Points:**
- ✅ User creates or joins events
- ✅ User books time slots
- ✅ User is participant in event
- ✅ Events and bookings affect location visitor stats
- ✅ Bookings generate revenue tracking data

---

## Complete Data Flow - Ecosystem Initialization

### Step 1: User Creation
```
User Registration
    ↓
Base User Record (mockUsersComprehensive)
    ↓
Stored in: localStorage['athlee_users']
Type: Player or Business
```

### Step 2: User Stats Initialization
```
User created
    ↓
userStatsService.initializeUserStats(userId, username)
    ↓
Stored in: localStorage['athlee_user_stats_{userId}']
Contains: Level, XP, W/L, Stats per sport
    ↓
Updates: courtRegularsService, leaderboardService
```

### Step 3: Follower Network
```
User Stats created
    ↓
followerService.createFollowerNetwork()
    ↓
Each user follows 5-30% of other users
    ↓
Stored in: localStorage['athlee_follows_{userId}']
```

### Step 4: Court Regulars
```
Location created + User visits location
    ↓
courtRegularsService.updateRegularAtLocation(userId, locationId)
    ✓ Increments visit count
    ✓ Updates tier (Newbie → Regular → VIP → Legend)
    ✓ Stores in: localStorage['athlee_court_regulars_{locationId}']
```

### Step 5: Matches & Participation
```
Match created at location
    ↓
User participates in match
    ↓
Match completion triggers:
    ✓ userStatsService.recordMatch(userId, matchData)
    ✓ Updates: totalMatches, wins/losses, per-sport stats
    ✓ Calculates XP earned
    ✓ Awards MVP if applicable
    ✓ Updates court regulars visit count
    ✓ Triggers badge checks
```

### Step 6: Leaderboards (On-Demand Calculation)
```
Admin/User requests leaderboard
    ↓
leaderboardService.getLeaderboard(sport?, stat?, timeFrame?)
    ↓
Queries: All userStats from localStorage
    ↓
Ranks users by selected metric
    ↓
Returns sorted LeaderboardEntry[]
```

### Step 7: Health & Stats Dashboard
```
Admin opens Health & Stats tab
    ↓
AdminHealthStatsTab mounts
    ↓
Queries:
    ✓ userStatsService.getAllUserStats() → Active players
    ✓ followerService.getFollowerCount() → Social metrics
    ✓ Calculate health scores based on activity
    ✓ Identify at-risk players (inactive 7+ days)
```

---

## Data Update Triggers

| Action | Services Updated | Storage Keys Updated |
|--------|------------------|----------------------|
| Match completed | userStats, leaderboard, courtRegulars, badges | `athlee_user_stats_*` |
| MVP awarded | userStats | `athlee_user_stats_*` + XP +20 |
| Badge earned | userStats, profile | `athlee_badge_awards_*`, `athlee_user_stats_*` |
| User follows another | followerService | `athlee_follows_*` (both users) |
| XP threshold crossed | userStats, leveling | `athlee_user_stats_*` |
| Level up | userStats, badges | `athlee_user_stats_*` |
| Location visited | courtRegulars | `athlee_court_regulars_{locationId}` |
| Tier upgrade at location | courtRegulars | `athlee_court_regulars_{locationId}` |
| Event created/joined | events, bookings | `athlee_events`, `athlee_bookings` |

---

## Ecosystem Integrity Checks

**When initializing new ecosystem, verify:**

```typescript
✅ All players have base User records
✅ All players have UserStatsProfile initialized
✅ All players have follower relationships created
✅ All locations have ≥1 Court Regulars record
✅ All matches reference valid players & locations
✅ All events reference valid locations
✅ All bookings reference valid locations & users
✅ Leaderboard data derivable from user stats
✅ Badge awards stored for qualifed players
✅ XP totals consistent with match history
```

---

## Admin Dashboard Data Verification

### Overview Tab
- **Displays**: Total counts for all entity types
- **Calls**: `getEcosystemStats()`
- **Uses**: All localStorage keys

### Player Health Tab (NEW 🏥)
- **Displays**: Player status, activity, win rates
- **Calls**: `userStatsService.getUserStats()`, `followerService.getFollowerCount()`
- **Uses**: `athlee_user_stats_*`, `athlee_follows_*`
- **Calculations**: Days since last active, health status (Active/Inactive/AtRisk/Suspended)

### Court Regulars Tab
- **Displays**: Tiers by location, member progression
- **Calls**: `courtRegularsService.getCourtRegulars(locationId)`
- **Uses**: `athlee_court_regulars_*`

### Followers Network Tab
- **Displays**: Follow relationships, network stats
- **Calls**: `followerService.getFollowerCount()`, `getMutualFollows()`
- **Uses**: `athlee_follows_*`

### Leaderboards Tab
- **Displays**: Rankings by sport, stat, timeframe
- **Calls**: `leaderboardService.getLeaderboard()`
- **Uses**: `athlee_user_stats_*` (calculated in-memory)

### XP & Levels Tab
- **Displays**: User progression, level distribution
- **Calls**: `xpService.getUserLevel()`, `getUserXP()`
- **Uses**: `athlee_user_stats_*`

### Badges Tab
- **Displays**: Badge awards, rarity, progress
- **Calls**: `badgeAwardService.getUserBadges()`, `getBadgeProgress()`
- **Uses**: `athlee_badge_awards_*`, `athlee_user_stats_*`

---

## Recommendations for Future Enhancement

### Current Data Flow Strengths
✅ Centralized localStorage for easy inspection  
✅ Service layer abstraction (can swap to API)  
✅ Linked user IDs maintain referential integrity  
✅ Ecosystem initialization comprehensive  

### Potential Improvements
📋 **Add foreign key validation**: Check all user IDs exist  
📋 **Add data consistency checks**: Verify stat totals match match records  
📋 **Add audit trails**: Track when/how data changes  
📋 **Add data repair functions**: Auto-fix orphaned records  
📋 **Add migration system**: Handle data schema changes  
📋 **Add backup/restore**: Preserve ecosystem snapshots  

---

**Created:** 11 March 2026  
**Version:** 1.0 - Complete User Data Structure Mapping
