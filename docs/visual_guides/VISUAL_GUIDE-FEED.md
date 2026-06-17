# Visual Guide - Feed Screen

## Overview
The feed screen is the main entry point for logged-in users. It provides quick access to primary features (Locations, Matches, Communities) and serves as a hub for activity updates and discoveries. The screen adapts based on user account type.

---

## Mobile UI - Feed Screen

### Main Feed View

```
┌─────────────────────────────────────────┐
│ Safe Area Header                        │
├─────────────────────────────────────────┤
│                                         │
│ Feed                                    │
│ Your personalized sports activity       │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📍                                  │ │
│ │ Explore Locations                   │ │
│ │ Browse sports facilities             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ⚽                                  │ │
│ │ Find Matches                        │ │
│ │ Coming soon                         │ │
│ └─────────────────────────────────────┘ │
│  (opacity: 50%)                         │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👥                                  │ │
│ │ Communities                         │ │
│ │ Coming soon                         │ │
│ └─────────────────────────────────────┘ │
│  (opacity: 50%)                         │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │ Your feed activity will appear here │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### UI Component Details

**Header Section:**
- Title: "Feed"
- Subtitle: "Your personalized sports activity"
- White background with light spacing

**Quick Action Cards:**
- 3 cards stacked vertically
- Each card contains:
  - Large emoji icon (4xl size)
  - Title text
  - Subtitle/description
  - White background
  - Rounded corners
  - Spacing between cards
- Enabled cards: Full opacity, tappable
- Coming Soon cards: 50% opacity, no interaction

**Active Card (Explore Locations):**
- Full interactivity
- Navigation to /locations tab
- Color: White background (no dimming)

**Inactive Cards (Coming Soon):**
- Dimmed appearance (opacity-50)
- Not tappable/disabled
- Visual indication of future features

**Feed Placeholder:**
- Centered text
- White background card
- Indicates empty state
- Message: "Your feed activity will appear here"

---

## Web UI - Feed Screen

### Main Feed View

```
┌────────────────────────────────────────────────┐
│ Header Section                                 │
├────────────────────────────────────────────────┤
│                                                │
│ Feed                                           │
│ Your personalized sports activity              │
│                                                │
│ ═══════════════════════════════════════════    │
│                                                │
│ QUICK ACTIONS (Grid Layout - 3 columns)        │
│                                                │
│ ┌──────────────────┐ ┌──────────────────────┐ │
│ │ 📍              │ │ ⚽                   │ │
│ │ Explore         │ │ Find Matches         │ │
│ │ Locations       │ │ Coming soon          │ │
│ │ Browse sports   │ │ (opacity: 50%)       │ │
│ │ facilities      │ └──────────────────────┘ │
│ │ in your area    │                          │
│ └──────────────────┘ ┌──────────────────────┐ │
│                     │ 👥                   │ │
│ ┌──────────────────┐ │ Communities          │ │
│ │ Coming Soon      │ │ Coming soon          │ │
│ │ Matches Card     │ │ (opacity: 50%)       │ │
│ └──────────────────┘ └──────────────────────┘ │
│                                                │
│ ───────────────────────────────────────────    │
│                                                │
│ FEED CONTENT SECTION                           │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │                                            │ │
│ │  Your feed activity will appear here      │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

### Desktop Breakpoint (1024px and above)

```
Navigation bar: Full width with padding
Max-width container: 7xl (80rem / 1280px)
Quick actions: 3-column grid
  ├─ Column 1: Explore Locations (full width)
  ├─ Column 2: Find Matches (full width)
  └─ Column 3: Communities (full width)

Gap between columns: 24px
Card padding: 24px
Card border radius: 12px
Card shadow: md (hover: lg)

Feed content area:
  Max-width: Full width in container
  Minimum height: 300px
  Background: White
```

### Tablet Breakpoint (768px - 1023px)

```
Navigation bar: Responsive, hamburger menu appears
Quick actions: 2-column grid (Locations + Matches in row 1, Communities row 2)
Max-width container: 2xl (56rem / 896px)

Card layout:
  ├─ Top row: 2 columns (50% width each)
  └─ Bottom row: 2 columns (50% width each) - Communities spans left

Gap: 16px
Card padding: 20px
```

### Mobile Breakpoint (320px - 767px)

```
Navigation bar: Collapsed to mobile header
Quick actions: 1-column stack (full width)
Max-width: 100% with padding (16px)

Card layout:
  ├─ Explore Locations (100% width)
  ├─ Find Matches (100% width)
  └─ Communities (100% width)

Gap: 12px
Card padding: 16px
Card minimum height: 120px
```

### UI Component Details

**Header Section:**
- Full width white background
- Max-width container (7xl on desktop)
- Padding: 32px (desktop), 24px (tablet), 16px (mobile)
- Title: "Feed" (3xl font, bold)
- Subtitle: "Your personalized sports activity" (gray-600)
- Divider line between header and content

**Quick Actions Grid:**
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: 1-column stack
- Gap: 24px (desktop), 16px (tablet), 12px (mobile)
- Cards are white with shadow
- Rounded corners: 12px (lg)
- Hover effect on active cards: shadow increases

**Location Card (Active):**
- 5xl emoji (📍)
- Title: "Explore Locations"
- Description: "Browse sports facilities in your area"
- Border: none
- Background: white
- Hover: shadow-md → shadow-lg transition
- Cursor: pointer
- Link to /locations
- Min-height: 180px

**Match Card (Coming Soon):**
- 5xl emoji (⚽)
- Title: "Find Matches"
- Description: "Coming soon"
- Opacity: 50%
- No hover effect
- Cursor: default (not clickable)
- Min-height: 180px

**Community Card (Coming Soon):**
- 5xl emoji (👥)
- Title: "Communities"
- Description: "Coming soon"
- Opacity: 50%
- No hover effect
- Cursor: default (not clickable)
- Min-height: 180px

**Feed Content Section:**
- White background
- Full width within max-width container
- Min-height: 300px
- Centered placeholder text
- Indicates where feed activity will appear

---

## Key Interactions

### Mobile
| Action | Response | Navigation |
|--------|----------|------------|
| Tap Explore Locations | Navigate to locations | /locations |
| Tap Find Matches | No action (disabled) | N/A |
| Tap Communities | No action (disabled) | N/A |
| Scroll down | View more content | N/A |
| Tab bar | Navigate between screens | Other tabs |

### Web (Desktop)
| Action | Response | Navigation |
|--------|----------|---------------|
| Click Explore Locations | Navigate to locations | /locations |
| Hover Explore Card | Shadow increases, scale slight | N/A |
| Click Find Matches | No action (disabled) | N/A |
| Click Communities | No action (disabled) | N/A |
| Click navigation link | Change page | /feed, /locations, /explore, /messages |
| Scroll | Page scrolls, header sticky | N/A |
| Tab key | Keyboard focus navigation | Tab through buttons |
| Enter key on focus | Activate button | Same as click |

### Web (Mobile/Tablet)
| Action | Response | Navigation |
|--------|----------|------------|
| Click Explore Locations | Navigate to locations | /locations |
| Hover Explore Card | Increase shadow | N/A |
| Click Find Matches | No action (disabled) | N/A |
| Click Communities | No action (disabled) | N/A |
| Tap Menu (hamburger) | Show/hide nav menu | Mobile drawer |
| Swipe navigation | Gesture nav between pages | Other pages |
| Scroll | View feed content | N/A |
| Tab key | Keyboard navigation | N/A |

---

## Navigation Bar Details

### Desktop Navigation

**Layout:**
```
├─ Left Section ┬─ Center Section ┬─ Right Section ─┤
│ 🏀 Athlee      │ [Navigation Items]   │ 👤 🔔 ⚙️ Avatar │
│ Logo          │ - Feed (active)      │                  │
│               │ - Locations          │                  │
│               │ - Explore            │                  │
│               │ - Messages           │                  │
└───────────────┴──────────────────────┴──────────────────┘
```

**Features:**
- Height: 64px
- Position: Sticky (stays at top on scroll)
- Background: White with subtle shadow
- Logo: Clickable, returns to Feed
- Active link: Blue underline + bold text
- Hover state: Light blue background

**Navigation Items:**
- Feed: Primary, highlighted when on feed page
- Locations: Secondary action
- Explore: Tertiary action (future feature)
- Messages: Notifications accessible from here

**Right Section:**
- Profile avatar: Clickable, opens profile menu
- Notifications bell: Shows unread count
- Settings icon: Opens settings menu
- Each is 48px touch target

### Mobile Navigation

**Collapsed Header:**
```
├─ Left ────┬─ Center ─────────────────────────┬─ Right ──┤
│ ☰ Menu    │ 🏀 Athlee                        │ 👤 ⚙️    │
└───────────┴──────────────────────────────────┴──────────┘
```

**Mobile Menu Drawer:**
```
┌────────────────────────────────────────────────┐
│ ☰ Menu                          ✕   │
├────────────────────────────────────────────────┤
│ 🏀 Dashboard                         │
│ 📍 Locations                         │
│ 🏃 Explore                           │
│ 💬 Messages (3)                      │
│ ⚙️ Settings                          │
│ 👤 Profile                           │
├────────────────────────────────────────────────┤
│ 🚪 Logout                            │
└────────────────────────────────────────────────┘
```

---

## Responsive Design Details

### Breakpoints

| Breakpoint | Width | Device | Layout |
|------------|-------|--------|--------|
| Small (sm) | 640px | Mobile phones | 1 column, hamburger nav |
| Medium (md) | 768px | Tablets | 2 columns, compact nav |
| Large (lg) | 1024px | Small laptops | 3 columns, full nav |
| Extra Large (xl) | 1280px | Desktop | 3 columns, full nav |

### Container Queries

**Small devices (< 640px):**
- Full width with 16px padding on sides
- Stack all elements vertically
- Single column grid
- Hamburger menu for navigation

**Medium devices (640px - 1023px):**
- Max-width: 100% with padding (24px)
- 2-column grid for cards
- Compact navigation bar
- Drawer menu available

**Large devices (1024px+):**
- Max-width: 80rem (1280px)
- 3-column grid for cards
- Full navigation bar
- All items visible

### Padding and Spacing

| Size | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Padding | 16px | 24px | 32px |
| Gap (cards) | 12px | 16px | 24px |
| Header padding | 12px | 16px | 24px |
| Card padding | 16px | 20px | 24px |

---

## Data Flow

```
User Lands on Feed
       ↓
Component Mounts
       ↓
Check Auth Status
       ├─ Not Authenticated → Redirect to Login
       └─ Authenticated → Render Feed
       ↓
Display Quick Actions
       ├─ Locations (Active)
       ├─ Matches (Coming Soon)
       └─ Communities (Coming Soon)
       ↓
On Locations Tap/Click
       ↓
Navigate to Locations Tab/Page
```

---

## Screen State Variations

### For Player Accounts
- Same UI as default
- Can access all features equally
- Feed shows player-specific activity (future)

### For Business Accounts
- Same UI as default
- Same quick actions available
- Feed shows business-specific activity (future)

### For Visitor Accounts
- Should redirect to login
- Not applicable to current flow

---

## Loading States

```
Initial Load:
┌──────────────────────────┐
│ Feed                     │
│ Your personalized...     │
│                          │
│ [Loading spinner...]     │
│                          │
└──────────────────────────┘
```

**Implementation:**
- Show skeleton loading on initial mount
- Use ActivityIndicator (mobile) or spinner (web)
- Disable all interactive elements
- Duration: typically 500-1000ms

---

## Empty State

```
┌──────────────────────────┐
│ Feed                     │
│ Your personalized...     │
│                          │
│ 📍 Explore Locations     │
│ ⚽ Find Matches          │
│ 👥 Communities          │
│                          │
│ No activity yet          │
│                          │
└──────────────────────────┘
```

**When displayed:**
- User is logged in
- No activity data available yet
- Show placeholder message
- Suggest primary action (Explore Locations)

---

## Error State (Rare)

```
┌──────────────────────────┐
│ Feed                     │
│ Your personalized...     │
│                          │
│ ⚠️  Error loading feed    │
│                          │
│ [Retry]                  │
│                          │
└──────────────────────────┘
```

**When displayed:**
- Network error occurs
- Data fetch fails
- Show error message
- Provide retry button

---

## Color Scheme

| Element | Light Mode | Dark Mode | Notes |
|---------|-----------|-----------|-------|
| Background | Gray-50 (#F9FAFB) | Gray-900 (#111827) | Full screen |
| Card Background | White (#FFFFFF) | Gray-800 (#1F2937) | Quick action cards |
| Card Border | Gray-200 (#E5E7EB) | Gray-700 (#374151) | Subtle border |
| Title | Gray-900 (#111827) | White (#FFFFFF) | Bold text |
| Subtitle | Gray-600 (#4B5563) | Gray-400 (#9CA3AF) | Muted text |
| Icon | Black | White | Emoji rendering |
| Active Hover | Shadow-md | Shadow-md | On interactive cards |
| Disabled Text | Gray-600 | Gray-500 | Coming soon text |
| Coming Soon | Opacity 50% | Opacity 50% | Grayed out |

---

## Responsive Design

### Mobile (320px+)
- Single column layout
- Full width cards with padding
- Stacked vertically
- Safe area respected
- Touch-friendly spacing (48px min height)

### Tablet (640px+)
- Cards may remain single column
- Or transition to 2-column grid
- Increased padding
- Balanced proportions

### Desktop (1024px+)
- 3-column grid
- Max-width container (1280px/7xl)
- Increased gap between cards
- Hover effects visible
- Comfortable reading distance

---

## Accessibility Features

### Mobile
- Large touch targets (48px minimum)
- High contrast colors
- Semantic button usage
- Focus indicators
- Screen reader support

### Web
- Keyboard navigation support
- Focus ring visible on Tab
- Semantic HTML (buttons, not divs)
- ARIA labels where needed
- Color contrast meets WCAG AA

---

## Navigation Paths

```
Login → Feed (Tab 1)
         ├─→ Tap Locations → Locations Screen
         ├─→ Tab Feed → Current Screen
         ├─→ Tab Explore → Explore Screen
         ├─→ Tab Messages → Messages Screen
         └─→ Tab Profile → Profile Screen
```

---

## Component Hierarchy

```
FeedScreen
├── Header Section
│   ├── Title
│   └── Subtitle
├── Quick Actions Container
│   ├── LocationCard (Active)
│   │   ├── Icon
│   │   ├── Title
│   │   └── Description
│   ├── MatchCard (Disabled)
│   │   ├── Icon
│   │   ├── Title
│   │   └── Description
│   └── CommunityCard (Disabled)
│       ├── Icon
│       ├── Title
│       └── Description
└── Feed Content Section
    └── Placeholder Message
```

---

## Future Enhancements

- [ ] Real feed with activity posts
- [ ] Match creation quick action (enable)
- [ ] Communities feature (enable)
- [ ] Recent matches section
- [ ] Follower activity feed
- [ ] Notifications feed
- [ ] Filters for feed content
- [ ] Like/comment on posts
- [ ] Share functionality
- [ ] Pull-to-refresh
- [ ] Infinite scroll pagination
- [ ] Location recommendations based on profile
- [ ] Trending communities/matches
- [ ] User suggestions based on sports
- [ ] Analytics/insights for business accounts

---

## Notes for Development

### Mobile Considerations:
- Use SafeAreaView for header padding
- Implement ScrollView for feed content
- Handle keyboard overlay on inputs
- Optimize for landscape orientation
- Test with different notch styles

### Web Considerations:
- SEO metadata
- Open Graph tags for sharing
- CSS Grid for layout
- Media queries for responsiveness
- Dark mode CSS variables
- Print-friendly styles

---

## Testing Checklist

- [ ] Feed loads correctly for Player accounts
- [ ] Feed loads correctly for Business accounts
- [ ] Locations card navigates correctly
- [ ] Disabled cards show correct opacity
- [ ] Mobile responsive at 320px+
- [ ] Desktop responsive at 1024px+
- [ ] Dark mode colors correct
- [ ] Touch targets 48px minimum (mobile)
- [ ] Keyboard navigation works (web)
- [ ] Loading state displays
- [ ] Error state displays
- [ ] Empty state displays

