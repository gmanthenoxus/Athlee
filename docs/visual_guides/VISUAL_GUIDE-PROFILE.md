# Visual Guide - Profile Screen

## Overview
The profile screen displays user information, statistics, social connections, and account-specific features. The layout adapts based on account type (Player or Business). Players see stats and privacy settings, while Business accounts see location management.

---

## Mobile UI - Profile Screen

### Player Profile View

```
┌─────────────────────────────────────────┐
│ Safe Area Header                        │
├─────────────────────────────────────────┤
│                                         │
│ PROFILE HEADER                          │
│ ┌────────────────────────────────────┐  │
│ │                                    │  │
│ │    Avatar                          │  │
│ │  ┌────────────┐                    │  │
│ │  │   JD       │  John Doe          │  │
│ │  │   (100x100)│  🏀 Basketball     │  │
│ │  └────────────┘                    │  │
│ │                                    │  │
│ │  12 Followers  8 Following  450 XP │  │
│ │                                    │  │
│ │  Bio: "Basketball enthusiast..."   │  │
│ │  📍 New York, NY                   │  │
│ │                                    │  │
│ │  [Edit Profile]                    │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│                                         │
│ PRIVACY SETTINGS                        │
│ ┌────────────────────────────────────┐  │
│ │                                    │  │
│ │ Public Stats               [Toggle] │  │
│ │                                    │  │
│ │ Public Badges              [Toggle] │  │
│ │                                    │  │
│ │ Public Posts               [Toggle] │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│                                         │
│ [        Logout        ]                │
│                                         │
└─────────────────────────────────────────┘
```

### Business Profile View

```
┌─────────────────────────────────────────┐
│ Safe Area Header                        │
├─────────────────────────────────────────┤
│                                         │
│ PROFILE HEADER                          │
│ ┌────────────────────────────────────┐  │
│ │                                    │  │
│ │    Avatar                          │  │
│ │  ┌────────────┐                    │  │
│ │  │   SC       │ Sports Club Inc.   │  │
│ │  │ (100x100)  │ Academy            │  │
│ │  └────────────┘                    │  │
│ │                                    │  │
│ │  235 Followers  42 Following       │  │
│ │                                    │  │
│ │  London, England                   │  │
│ │                                    │  │
│ │  [Edit Profile]                    │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│                                         │
│ MY LOCATIONS                            │
│ ┌────────────────────────────────────┐  │
│ │ [+ Add Location]                   │  │
│ │                                    │  │
│ │ ┌──────────────────────────────┐   │  │
│ │ │ Downtown Sports Complex      │   │  │
│ │ │ 🏀 Basketball, Badminton     │   │  │
│ │ │ 📍 San Francisco, CA         │   │  │
│ │ │ 42 matches • 5 regular players│   │  │
│ │ │              ✓ Verified      │   │  │
│ │ └──────────────────────────────┘   │  │
│ │                                    │  │
│ │ ┌──────────────────────────────┐   │  │
│ │ │ Elite Badminton Academy      │   │  │
│ │ │ 🏸 Badminton, Table Tennis   │   │  │
│ │ │ 📍 Boston, MA                │   │  │
│ │ │ 35 matches • 4 regular players│   │  │
│ │ │              ✓ Verified      │   │  │
│ │ └──────────────────────────────┘   │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│                                         │
│ [        Logout        ]                │
│                                         │
└─────────────────────────────────────────┘
```

### UI Component Details

**Profile Header (All Accounts):**
- Centered layout
- Avatar: Circular gradient background
  - Initials displayed (2 characters)
  - Size: 100x100px
  - Colors based on name hash
- User name/business name (24pt, bold)
- Account type/sport badge (small, colored background)
- Bio text (optional, for players)
- Location tag (optional)
- Stats row:
  - Followers count
  - Following count
  - XP count (players only)
- Edit button (blue background)

**Privacy Settings (Players Only):**
- Section title: "Privacy Settings"
- Toggle switches for:
  - Public Stats
  - Public Badges
  - Public Posts
- Divider lines between items

**My Locations (Business Only):**
- Section title: "My Locations"
- Add Location button (+ icon, blue)
- Location cards:
  - Business name (primary)
  - Sports badges
  - Address/city
  - Match count and regular players
  - Verified badge (checkmark)
  - Can be scrollable if many locations

**Logout Button:**
- Red/danger color
- Full width
- Bottom of screen
- Danger action styling

---

## Web UI - Profile Screen

### Player Profile Page

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│ [← Profile (Title)]                                   │
│                                                        │
│ ═══════════════════════════════════════════════════    │
│ PROFILE HEADER SECTION                                │
│ ┌──────────────────────────────────────────────────┐  │
│ │                                                  │  │
│ │  Avatar (96x96)   Name: John Doe                 │  │
│ │  ┌─────────┐      Basketball (badge)            │  │
│ │  │   JD    │      Edit Profile [Button]         │  │
│ │  │ (Grad)  │                                    │  │
│ │  └─────────┘      Bio: "Basketball enthusiast"  │  │
│ │                   📍 New York, NY               │  │
│ │                                                  │  │
│ │  12 Followers  │  8 Following  │  450 XP        │  │
│ │                                                  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
│ ───────────────────────────────────────────────────   │
│                                                        │
│ PRIVACY SETTINGS SECTION                              │
│ ┌──────────────────────────────────────────────────┐  │
│ │                                                  │  │
│ │ Public Stats        [Toggle Switch]              │  │
│ │ Public Badges       [Toggle Switch]              │  │
│ │                                                  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Business Profile Page

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│ [← Profile]                                           │
│                                                        │
│ ═══════════════════════════════════════════════════    │
│ PROFILE HEADER SECTION                                │
│ ┌──────────────────────────────────────────────────┐  │
│ │                                                  │  │
│ │  Avatar (96x96)   Name: Sports Club Inc.         │  │
│ │  ┌─────────┐      Academy (type badge)          │  │
│ │  │   SC    │      Edit Profile [Button]         │  │
│ │  │ (Grad)  │                                    │  │
│ │  └─────────┘      London, England               │  │
│ │                                                  │  │
│ │  235 Followers  │  42 Following                 │  │
│ │                                                  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
│ ───────────────────────────────────────────────────   │
│                                                        │
│ MY LOCATIONS SECTION                                  │
│ ┌──────────────────────────────────────────────────┐  │
│ │                                                  │  │
│ │ My Locations                  [+ Add Location]  │  │
│ │                                                  │  │
│ │ ┌────────────────┐ ┌────────────────────────┐   │  │
│ │ │ Downtown       │ │ Elite Badminton       │   │  │
│ │ │ Sports Complex │ │ Academy               │   │  │
│ │ │ 🏀🏸           │ │ 🏸🎾                  │   │  │
│ │ │ 📍SF, CA       │ │ 📍Boston, MA           │   │  │
│ │ │ 42 matches     │ │ 35 matches            │   │  │
│ │ │ 5 regulars ✓   │ │ 4 regulars ✓          │   │  │
│ │ └────────────────┘ └────────────────────────┘   │  │
│ │                                                  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### UI Component Details

**Top Banner:**
- Back button (arrow icon)
- Profile title
- Full width separator line

**Profile Header Section:**
- Flex layout: avatar + info
- Avatar: Circular, gradient background, centered
- Information column:
  - Display name (24pt, bold)
  - Sport type (players) or business type (business)
  - Bio text (optional, players)
  - Location info
  - Stats row (flex, spaced)
  - Edit button (blue, filled)
- Card styling: white background, shadow
- Border: light gray

**Privacy Settings (Players Only):**
- Card styling: white background, shadow
- Section title (18pt, bold)
- Toggle switches aligned horizontally
- Labels on left, toggle on right

**My Locations (Business Only):**
- Card styling: white background, shadow
- Section title with "Add Location" button (right-aligned)
- Grid layout: 2-3 columns responsive
- Location cards (LocationCard component):
  - Location name
  - Sport badges
  - City
  - Match count
  - Regular players count
  - Verified badge
  - Hover effect: shadow increase
  - Click to view detail/edit

---

## Key Interactions

### Mobile - Player Account
| Action | Response | Notes |
|--------|----------|-------|
| View profile | Display player info | Auto-load on mount |
| Toggle privacy | Save to storage | Real-time update |
| Tap Edit | Navigate to edit | /(tabs)/profile/edit |
| Tap Logout | Confirm + logout | Return to login |

### Mobile - Business Account
| Action | Response | Notes |
|--------|----------|-------|
| View profile | Display business info | Auto-load on mount |
| Tap Add Location | Navigate to form | /locations/add |
| Tap location card | Show location detail | /locations/[id] |
| Tap Edit | Navigate to edit | /(tabs)/profile/edit |
| Tap Logout | Confirm + logout | Return to login |

### Web - Player Account
| Action | Response | Notes |
|--------|----------|-------|
| Load page | Display profile | Server-side render |
| Click privacy toggle | Save setting | AJAX request |
| Click Edit | Navigate | /profile/edit |
| Scroll | View all content | Natural scroll |

### Web - Business Account
| Action | Response | Notes |
|--------|----------|-------|
| Load page | Display profile | Server-side render |
| Click Add Location | Navigate | /locations/add |
| Click location card | Navigate | /locations/[id] |
| Click Edit | Navigate | /profile/edit |
| Scroll | View all content | Natural scroll |

---

## Data Flow

```
User Navigates to Profile
       ↓
Check Authentication
       ├─ Not authenticated → Redirect to login
       └─ Authenticated → Continue
       ↓
Fetch User Profile
       ├─ ProfileContext (cached)
       └─ Update with latest data
       ↓
Load Additional Data
       ├─ Followers list (if cached)
       ├─ Following list (if cached)
       └─ Locations (for business)
       ↓
Render Based on Account Type
       ├─ Player → Show privacy settings
       └─ Business → Show locations
       ↓
User Interaction
       ├─ Toggle privacy → Save to store
       ├─ Add location → Navigate
       └─ Edit profile → Navigate
```

---

## Account Type Variations

### Player Account View
- Shows: Name, Sport, Bio, Location, XP
- Privacy section visible
- Locations section hidden
- Can edit personal stats
- Followers/Following displayed

### Business Account View
- Shows: Business name, Type, Admin info, Region
- Privacy section hidden
- Locations section visible
- Can manage locations
- Followers/Following displayed

---

## States

### Loading State
```
┌──────────────────────────┐
│ Profile                  │
│                          │
│ [Skeleton Avatar]        │
│ [Skeleton Name]          │
│ [Skeleton Stats]         │
│                          │
└──────────────────────────┘
```

### Error State
```
┌──────────────────────────┐
│ Profile                  │
│                          │
│ ⚠️ Unable to load profile │
│ [Retry]                  │
│                          │
└──────────────────────────┘
```

### Empty Locations (Business)
```
My Locations
[+ Add Location]

You haven't created any
locations yet.

[Create First Location]
```

---

## Color Scheme

| Element | Light Mode | Dark Mode | Notes |
|---------|-----------|-----------|-------|
| Background | Gray-50 | Gray-900 | Full screen |
| Card | White | Gray-800 | Sections |
| Text | Gray-900 | White | Primary |
| Muted | Gray-600 | Gray-400 | Secondary |
| Border | Gray-200 | Gray-700 | Dividers |
| Avatar Bg | Gradient | Gradient | Based on hash |
| Badge | Blue-100/Blue-800 | Blue-900/Blue-200 | Sport/type |
| Toggle Active | Green | Green | Privacy |
| Button | Blue-600 | Blue-500 | Primary action |
| Logout | Red-600 | Red-500 | Danger |

---

## Responsive Design

### Mobile (320px+)
- Vertical stack layout
- Full width cards with padding
- Avatar: 100px
- Touch-friendly toggles (44px min)
- Single column for locations

### Desktop (1024px+)
- Proper spacing and proportions
- Avatar: 96px
- Card padding: 32px
- Locations: 2-3 column grid
- Side-by-side layouts possible
- Hover effects on cards

---

## Accessibility Features

- Semantic HTML (buttons, switches)
- ARIA labels on toggles
- Keyboard navigation support
- High contrast colors
- Focus indicators
- Screen reader friendly
- Touch targets 44px+ (mobile)

---

## Navigation Paths

```
Profile Screen
├─→ Edit Button → Profile Edit Page
├─→ Location Card → Location Detail Page
├─→ Add Location → Location Add Form
├─→ Logout → Login Page
└─→ Tabs → Other Screens
```

---

## Component Structure

```
ProfileScreen
├── Header Section
│   ├── Avatar
│   ├── User Info
│   │   ├── Name
│   │   ├── Account Type/Sport
│   │   ├── Bio (optional)
│   │   └── Location
│   ├── Stats Row
│   └── Edit Button
├── Privacy Settings (Players)
│   ├── Section Title
│   ├── Toggle Item (Public Stats)
│   ├── Toggle Item (Public Badges)
│   └── Toggle Item (Public Posts)
├── My Locations (Business)
│   ├── Section Title
│   ├── Add Location Button
│   └── Location Card Grid
│       └── LocationCard (reusable)
└── Logout Button
```

---

## Future Enhancements

- [ ] Edit profile functionality (separate page)
- [ ] Followers list modal
- [ ] Following list modal
- [ ] Block/unblock users
- [ ] Social sharing
- [ ] Achievement badges display
- [ ] Leaderboard position
- [ ] Recent matches history
- [ ] Skill verification badges
- [ ] Two-factor authentication settings
- [ ] Account deletion option
- [ ] Privacy policy link
- [ ] Support/help contact
- [ ] Account switching (for multi-account users)
- [ ] Profile analytics (for business accounts)

---

## Testing Checklist

- [ ] Player profile loads correctly
- [ ] Business profile loads correctly
- [ ] Privacy toggles save state (mobile)
- [ ] Edit button navigates correctly
- [ ] Location cards display (business)
- [ ] Add location button navigates (business)
- [ ] Logout works correctly
- [ ] Mobile responsive (320px+)
- [ ] Desktop responsive (1024px+)
- [ ] Dark mode colors correct
- [ ] Avatar displays correct initials
- [ ] Stats count correct
- [ ] Follower/following counts accurate
- [ ] Skeleton loading visible
- [ ] Error state displays
- [ ] Touch targets adequate (mobile)
- [ ] Keyboard navigation works (web)
- [ ] Screen reader friendly

