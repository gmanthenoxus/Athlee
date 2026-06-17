# User Data Connection Architecture Diagram

**Visual Reference for Data Ecosystem**

---

## 1. Registration & Core Profile

```
┌─────────────────────────────────────────────────────────┐
│                  USER REGISTRATION                      │
│                (Base Record Creation)                   │
└─────────────────────────────────────────────────────────┘
         │
         ├─ id, email, username
         ├─ firstName, lastName (Players)
         ├─ businessName, adminName (Business)
         ├─ accountType: Player | Business
         ├─ createdAt: ISO timestamp
         └─ isActive: boolean
```

---

## 2. Complete User Data Flow Graph

```
                          ┌─────────────────┐
                          │  Base User      │
                          │  (auth-types)   │
                          └────────┬────────┘
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
         ┌────────▼────────┐  ┌────▼─────────┐  ┌──▼──────────────┐
         │   UserStats     │  │  Followers   │  │  Court Regulars │
         │  (userStats)    │  │  (follows)   │  │  (regulars)     │
         └─────┬──────────┬┘  └────┬─────────┘  └──┬──────────────┘
               │          │        │               │
        ┌──────▼─┐  ┌─────▼──┐  ┌──▼─────┐   ┌────▼──────┐
        │ XP &   │  │Sport   │  │Network │   │Tiers &    │
        │Levels  │  │Stats   │  │Density │   │Membership │
        └────────┘  └────────┘  └────────┘   └───────────┘

              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼───┐ ┌───▼────┐ ┌──▼────┐
│Badges │ │Matches │ │Events │
│(awards)│ │(history)│ │(attend)│
└───────┘ └────────┘ └───────┘
```

---

## 3. Data Dependency Map

```
User Record (id, email, username)
    │
    ├──────────────────────────────────────┐
    │                                        │
    ▼                                        ▼
UserStats*¹                            Follower Relationships*²
├─ totalXP                             ├─ followers: userId[]
├─ level (1-10)                        ├─ following: userId[]
├─ totalMatches                        └─ mutualFollows: userId[]
├─ careerWinPercentage
├─ sportStats { sport → {
│    matchesPlayed, wins, losses,     
│    points, assists, rating, mvp      
│  }}
└─ recentMatches: MatchRecord[]

    │
    ├─ TRIGGERED BY: Match completion
    ├─ UPDATES: When user participates
    └─ READS: Leaderboards, Health tab

*¹ Storage: athlee_user_stats_{userId}
*² Storage: athlee_follows_{userId}
```

---

## 4. Feature Connections Per User

```
┌──────────────────────────────────────────────────────────────────┐
│                     COMPLETE USER ECOSYSTEM                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  USER "james_king" (id: user_123)                               │
│  ├─ Email: james.king@local                                     │
│  ├─ Account Type: Player                                        │
│  │                                                              │
│  ├═══════════════ XP & PROGRESSION ═════════════════            │
│  │ ATH Storage: athlee_user_stats_user_123                      │
│  │ • Current XP: 2,450                                          │
│  │ • Level: 6 (All-Star)                                        │
│  │ • Rank Title: "All-Star"                                     │
│  │                                                              │
│  ├═══════════════ SOCIAL NETWORK ══════════════════             │
│  │ STH Storage: athlee_follows_user_123                         │
│  │ • Followers: 47 users                                        │
│  │ • Following: 32 users                                        │
│  │ • Mutual Follows: 28 users                                   │
│  │                                                              │
│  ├═══════════════ MATCH HISTORY ═══════════════════             │
│  │ ⚽ Basketball: 45 matches, 28 wins (62%), 1,200 XP           │
│  │ ⚽ Soccer: 32 matches, 14 wins (44%), 800 XP                 │
│  │ 🎾 Tennis: 18 matches, 10 wins (56%), 450 XP                │
│  │ ──────────────────────────────────────────                  │
│  │ Total: 95 matches, 52 wins (55% WR), 8 MVPs                 │
│  │                                                              │
│  ├═══════════════ COURT REGULARS ════════════════              │
│  │ STH Storage: athlee_court_regulars_{locId}                   │
│  │ • Bradley Community Center (loc_001): VIP (21 visits)        │
│  │   └─ Skill Level: Advanced                                   │
│  │   └─ Wins/Losses at venue: 12/4                              │
│  │ • Riverside Sports Complex (loc_005): Regular (15 visits)    │
│  │   └─ Skill Level: Intermediate                               │
│  │   └─ Wins/Losses at venue: 8/3                               │
│  │                                                              │
│  ├═══════════════ BADGES & ACHIEVEMENTS ═══════════             │
│  │ STH Storage: athlee_earned_badges                            │
│  │ • "First Court Regular" (Common) - Earned: Mar 1            │
│  │ • "All-Star Champion" (Epic) - Earned: Mar 5                │
│  │ • "50 Match Legend" (Epic) - Earned: Mar 11                 │
│  │ • "Basketball Specialist" (Rare) - Earned: Mar 8            │
│  │                                                              │
│  ├═══════════════ LEADERBOARDS ═════════════════                │
│  │  (Calculated from stats)                                     │
│  │ • Global Rankings: #34 (by total wins)                       │
│  │ • Basketball Rankings: #12 (by win rate)                     │
│  │ • Soccer Rankings: #89 (by win rate)                         │
│  │ • City Leaderboard: #7 (all sports)                          │
│  │                                                              │
│  └─ SYSTEM HEALTH:                                              │
│    ✓ All user data consistent                                   │
│    ✓ Stats validated against match history                      │
│    ✓ Follower relationships bidirectional                       │
│    ✓ Court regular tiers calculated correctly                   │
│    ✓ No orphaned data records                                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Storage Keys Used Per User

```
athlee_user_stats_{userId}
├─ User's XP, level, match stats
├─ Per-sport breakdown
├─ Recent match records
└─ Career statistics

athlee_follows_{userId}
├─ List of followers (users following this user)
├─ List of following (users this user follows)
└─ Mutual follow relationships

athlee_earned_badges
├─ All badges earned by all users
├─ Keyed by badgeId + userId
└─ Earned timestamp & context

athlee_court_regulars_{locationId}
├─ Court regular tier list for location
├─ Visit counts per user
├─ Skill level assessments
└─ MVP awards at location

athlee_matches
├─ All match records
├─ Ordered by status & date
└─ Include participant references

athlee_leaderboards (calculated on-demand)
├─ Not stored, computed from user stats
├─ Filtered by sport/location/timeframe
└─ Sorted by selected metric (wins, XP, etc)
```

---

## 6. Data Update Cascade

```
When User Participates in Match:
┌─────────────────────────────────┐
│ Match Completed                 │
│  (match_123 marked Completed)   │
└────────────┬────────────────────┘
             │
             ├─→ userStatsService.recordMatch()
             │   ├─ +1 to totalMatches
             │   ├─ +1 to wins (or losses)
             │   ├─ Update sportStats[sport]
             │   ├─ Calculate XP earned
             │   ├─ Check for MVP (update mvpCount)
             │   └─ Update level if XP threshold crossed
             │
             ├─→ courtRegularsService.updateRegular()
             │   ├─ +1 to visitCount
             │   ├─ Recalculate tier (Newbie → Legend)
             │   ├─ Update skillLevel
             │   └─ Check for tier-based badges
             │
             ├─→ xpService.awardXP()
             │   ├─ Base XP: 10
             │   ├─ Win bonus: +5
             │   ├─ MVP bonus: +20 (if awarded)
             │   └─ Update level if threshold crossed
             │
             ├─→ badgeAwardService.checkBadges()
             │   ├─ "50 Matches" (if totalMatches=50)
             │   ├─ "10Win Streak" (if streak=10)
             │   ├─ MVP badges
             │   └─ Location-specific badges
             │
             └─→ leaderboardService (recalculates)
                 ├─ User rank updates
                 ├─ Global board shuffles
                 └─ Sport-specific board updates
```

---

## 7. Validation Order (During Ecosystem Init)

```
Step 1: Validate Users
  └─ All required fields present
  └─ No duplicate IDs/emails

Step 2: Validate User Stats
  ├─ Every player has stats
  ├─ No orphaned stats (stats for non-existent users)
  └─ Stats data is complete (XP, level, matches, etc)

Step 3: Validate Followers
  ├─ All user IDs in follower lists exist
  ├─ No orphaned follow records
  └─ Relationships are bidirectional where expected

Step 4: Validate Court Regulars
  ├─ Every location has regulars list
  ├─ All regular user IDs exist
  └─ Tiers calculated correctly

Step 5: Validate Matches
  ├─ Creator exists & is valid user
  ├─ Location exists (if specified)
  └─ All participants exist

Step 6: Validate Locations
  ├─ Required fields present
  ├─ Owner exists (for business locations)
  └─ At least one sport available

Step 7: Validate Badges
  ├─ All badge awards reference real users
  └─ Badge data is consistent

Step 8: Validate Leaderboards
  └─ Can successfully calculate rankings from stats

  RESULT: ✅ All connections verified
          📊 Health score calculated
          💾 Validation report saved
```

---

## 8. Real-Time Connection Monitoring

During ecosystem operation, monitor:

```
For Each User:
  ├─ Stats file exists: athlee_user_stats_{userId} ✓
  ├─ Followers file exists: athlee_follows_{userId} ✓
  ├─ Has participated in ≥1 match ✓
  ├─ Last active timestamp < 30 days ✓
  ├─ XP consistent with match count ✓
  ├─ Win rate between 0-100% ✓
  ├─ Level matches XP thresholds ✓
  └─ Followers/following counts consistent ✓

For Each Location:
  ├─ Court regulars list exists ✓
  ├─ ≥1 regular assigned ✓
  └─ All regulars reference valid users ✓

For Each Match:
  ├─ Creator exists ✓
  ├─ Location exists (if specified) ✓
  ├─ All team members exist ✓
  └─ Result updates user stats ✓

Overall:
  ├─ No orphaned records ✓
  ├─ All foreign keys valid ✓
  ├─ Data consistency score: X/100 ✓
  └─ Auto-fixable issues: N ✓
```

---

## 9. Usage Examples

### Check if user data is properly connected:
```typescript
getUserConnectionMap("user_123")
// Returns: All stats, followers, court positions, badges, matches
```

### Monitor ecosystem health:
```typescript
getEcosystemHealthSummary()
// Returns: Health score (0-100), issues, recommendations
```

### Run full validation:
```typescript
validateEcosystemIntegrity()
// Returns: Detailed report with all issues organized by category
```

### Auto-fix common issues:
```typescript
attemptAutoFix()
// Returns: { fixed: 3, remaining: 2 }
```

---

## 10. Summary Table

| Component | Storage | Update Trigger | Access | Linked To |
|-----------|---------|-----------------|--------|-----------|
| **User Stats** | `athlee_user_stats_*` | Match completion | Direct | Leaderboards, Health tab, Badges |
| **Followers** | `athlee_follows_*` | Follow/unfollow | Direct | Leaderboards, Health tab, Profiles |
| **Court Regulars** | `athlee_court_regulars_*` | Location visit | Recalculated | Admin dashboard, Badges, Tiers |
| **Badges** | `athlee_earned_badges` | Criteria met | Direct | Profile, Health tab, XP bonus |
| **Matches** | `athlee_matches` | Create/complete | Direct | User stats, Court regulars, Badges |
| **Leaderboards** | Calculated | User stats change | On-demand | Rankings page, Profiles |
| **Locations** | `athlee_locations` | Create | Direct | Court regulars, Matches |

---

**This system ensures:** Every user's data is **connected**, **consistent**, **complete**, and **correct** across the entire application ecosystem.
