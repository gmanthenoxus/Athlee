# Visual Guide - Location System (Discovery Hub)

**Status:** 📋 Design Reference | Created: Feb 18, 2026

---

## 📍 Overview

The **Location System** is the discovery hub for athletes to find nearby courts, fields, and events. It enables:
- **Map-based discovery** with sport and location type filtering
- **Detailed location pages** with real-time active player presence
- **Business location management** for court owners to manage venues
- **Community court registration** with auto-generated chat rooms
- **Private location creation** for personal courts
- **Check-in system** for real-time presence visibility
- **Event registration** for tournaments and open play sessions

### Key Features
- Interactive map with location markers and real-time badges
- Multi-tab location detail page (Overview, Active, Events, Bookings, Chat)
- Business dashboard for venue management
- Community moderation with democratic elections
- Privacy-respecting access controls
- Real-time active player detection

---

## 📱 Mobile UI - Map View (Discovery Hub)

```
┌─────────────────────────────────────┐
│ ← Locations      [Search] [≡ Filter]│
├─────────────────────────────────────┤
│ [🏀] [⚽] [🏸] [🏐] [🏓]           │ ← Sport filter chips
├─────────────────────────────────────┤
│                                     │
│       [Interactive Map]             │
│                                     │
│    🏢 (3 playing)    🏢 (1)        │
│           🏢              👥 (8)    │
│      🔒         🏢 (6)             │
│                 🏢                  │
│                                     │
├─────────────────────────────────────┤
│ 📂 Central Court                    │ ← Bottom Sheet
│ 🏀 Basketball • 0.3 km              │
│ 5 active now | Open until 10pm     │
│ [View Details] [Check-in] [Share]  │
│                                     │
│ 🏢 Eastside Field  (swipe for more)│
│ ⚽ Football • 1.2 km                │
│ 3 active now | Open until 9pm      │
└─────────────────────────────────────┘

Legend:
🏢 = Business court
👥 = Community court
🔒 = Private court
(N) = Players active now
```

### Mobile Map Components

| Component | Description | Interaction |
|-----------|-------------|-------------|
| **Sport Filter Chips** | Horizontal scrolling buttons (Basketball, Football, Badminton, Table Tennis, Volleyball) | Tap to filter map. Multi-select. Visual indicator for active filters. |
| **Map Area** | Full-screen interactive map centered on user location. Shows markers for all visible locations. | Drag/pan to explore. Pinch to zoom. Tap marker → highlight & expand bottom sheet. |
| **Location Marker** | Icons vary by type: 🏢 (business), 👥 (community), 🔒 (private). Badge shows active player count (e.g., "3"). Star for events today. | Tap → highlight card. Long press → show quick actions. |
| **Bottom Sheet** | Swipeable card showing location from map view. One location visible with overflow indicator. | Swipe horizontally to see more locations. Swipe up to open Location Detail. |
| **Location Card (Sheet)** | Name, sport icons, distance, active count, status (open/closed). | Primary action: tap to open Location Detail page. |
| **Filter Button (Top-right)** | Opens filter menu for location type: All, Business, Community, Private. | Tap to open filter modal. |
| **Search Button (Top-right)** | Opens search interface to find locations by name or address. | Tap to open search screen. |

---

## 🌐 Web UI - Map View (Discovery Hub)

```
┌────────────────────────────────────────────────────────────────────┐
│ Locations Discovery Hub                         [← Dashboard]      │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Sport Filter:  [🏀] [⚽] [🏸] [🏐] [🏓]  Type: [All ▼]          │
│  Search: [____________________]                                   │
│                                                                    │
├──────────────────────────────┬──────────────────────────────────┤
│                              │                                  │
│   [Interactive Map Area]     │ Locations in View:               │
│                              │ ─────────────────────────────── │
│   🏢 (3)          🏢 (1)     │ 1. 🏢 Central Court              │
│         🏢              👥   │    🏀 Basketball | 0.3 km        │
│    🔒         🏢 (6)         │    5 active now | Open 8am-10pm │
│                 🏢           │    [View] [Check-in] [Share]     │
│                              │                                  │
│                              │ 2. 🏢 Eastside Field             │
│                              │    ⚽ Football | 1.2 km           │
│                              │    3 active now | Open 8am-9pm   │
│                              │    [View] [Check-in] [Share]     │
│                              │                                  │
│                              │ 3. 👥 Community Court            │
│                              │    🏸 Badminton | 2.1 km          │
│                              │    8 active now | Always open    │
│                              │    [View] [Check-in] [Share]     │
│                              │                                  │
│                              │ [Load More ↓]                    │
│                              │                                  │
└──────────────────────────────┴──────────────────────────────────┘
```

### Web Map Components

| Component | Description | Interaction |
|-----------|-------------|-------------|
| **Sport Filter Row** | Horizontal button group for multi-select sports. Shows counts. | Click button to toggle. Ctrl+Click for multi-select. Visual active state. |
| **Type Dropdown** | Select filter for location type: All, Business, Community, Private. | Click to open dropdown. Select to filter. |
| **Search Bar** | Text input for location name/address search. Real-time suggestions. | Type to filter. Results update map and sidebar list. |
| **Map (2/3 width)** | Interactive map showing markers. Zooms to search/filter results. | Click marker → highlight in sidebar. Drag/zoom to explore. |
| **Sidebar (1/3 width)** | List of locations in current map view. Scrollable. Shows up to 10 at once. | Click location card → open Location Detail page in modal or new tab. |
| **Location Card (Sidebar)** | Compact view: name, sport, distance, active count, status. | Hover shows expanded details and actions. |
| **Action Buttons** | [View] → Detail page, [Check-in] → quick check-in, [Share] → copy link. | Click to execute. |

---

## 📍 Mobile UI - Location Detail Page

```
┌─────────────────────────────────────┐
│ ← Central Court           ⭐ (28)   │ ← Header with back, name, rating
├─────────────────────────────────────┤
│ [Image Gallery / Hero Image]        │ ← Hero image (swipeable)
│  ◄    🏀 Court view    ►            │    (3 image dots at bottom)
├─────────────────────────────────────┤
│ 🏀 Basketball, Volleyball           │ ← Sport badges
│ 🏢 Business Court                   │
│ 📍 123 Main St, Downtown City       │
│ 📏 1.2 km away                      │
│ 🕒 Open: 8am - 10pm (open now)      │
├─────────────────────────────────────┤
│ [Overview][Active][Events][Bookings]│ ← Tabs (Chat hidden for business)
├─────────────────────────────────────┤
│ OVERVIEW TAB:                       │
│                                     │
│ About:                              │
│ "Great indoor basketball court with │
│ professional lighting and parking." │
│                                     │
│ Amenities:                          │
│ 🚿 Showers  🅿️ Parking             │
│ 🪑 Seating  💧 Water               │
│                                     │
│ Contact:                            │
│ 📞 (555) 123-4567                   │
│ 📧 info@centralcourt.com            │
│                                     │
│ Active Now: 👤 👤 👤 +2 players    │ ← Quick glimpse of active players
│                                     │
│ Recent Matches:                     │
│ • John vs Mike (2h ago, final 21-19)│
│ • League A: Team X vs Y (yesterday) │
│                                     │
├─────────────────────────────────────┤
│ [Check-in] [Book Now] [Share]       │ ← CTA buttons
└─────────────────────────────────────┘
```

### Mobile Location Detail - Active Tab

```
┌─────────────────────────────────────┐
│ ← Central Court           ⭐ (28)   │
├─────────────────────────────────────┤
│ [Active][Overview][Events][Bookings]│
├─────────────────────────────────────┤
│ ACTIVE TAB:                         │
│                                     │
│ 5 players here right now            │
│                                     │
│ 👤 John Smith                       │
│ 🏀 Basketball | "Let's play!"       │
│ [Want to Play?]                     │
│                                     │
│ 👤 Sarah Chen                       │
│ ⚽ Football | "Looking for a 5v5"  │
│ [Want to Play?]                     │
│                                     │
│ 👤 Mike Johnson                     │
│ 🏸 Badminton                        │
│ [Want to Play?]                     │
│                                     │
│ 👤 + 2 more...                      │
│                                     │
│ [Check-in] (I'm here to play)       │
│ ─────────────────────────────────── │
│ [Just Watching] (Optional)          │
│                                     │
└─────────────────────────────────────┘
```

### Mobile Location Detail - Events Tab

```
┌─────────────────────────────────────┐
│ EVENTS TAB:                         │
│                                     │
│ Upcoming:                           │
│                                     │
│ 🏀 Basketball Tournament             │
│ Today • 3:00 PM - 6:00 PM           │
│ Spots left: 4 / 16                  │
│ 🏆 $50 entry fee                    │
│ [Register] or [View Details]        │
│                                     │
│ 🏀 Open Play Basketball              │
│ Tomorrow • 6:00 PM - 9:00 PM        │
│ Spots left: 8 / 20                  │
│ [Register]                          │
│                                     │
│ ⚽ Friendly League (Weekly)          │
│ Sundays • 10:00 AM                  │
│ Season: Feb 18 - Apr 30             │
│ [Register]                          │
│                                     │
│ ──────────────────────────────────── │
│ Past Events (collapse ▲)             │
│                                     │
│ 🏀 Tournament (Feb 10)               │
│ Winner: Team Blue (63-58)            │
│                                     │
└─────────────────────────────────────┘
```

### Mobile Location Detail - Bookings Tab

```
┌─────────────────────────────────────┐
│ BOOKINGS TAB:                       │
│                                     │
│ Today                   ← | → Tomorrow
│                                     │
│ Time      Status      Available     │
│ ────────────────────────────────────│
│ 8:00 AM   [Available] [Book]        │
│ 9:00 AM   [Available] [Book]        │
│ 10:00 AM  ❌ Booked                 │
│ 11:00 AM  ❌ Booked                 │
│ 12:00 PM  [Available] [Book]        │
│ ...                                 │
│ 8:00 PM   [Available] [Book]        │
│ 9:00 PM   ⏰ Closing soon           │
│                                     │
│ ──────────────────────────────────── │
│ My Bookings:                        │
│                                     │
│ ✓ Saturday, Feb 20 • 3:00-4:00 PM  │
│ Status: Confirmed                   │
│ [Check-in] [Cancel]                 │
│                                     │
│ ✓ Sunday, Feb 21 • 9:00-10:00 AM   │
│ Status: Pending                     │
│ [Check-in] [Cancel]                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 🌐 Web UI - Location Detail Page

```
┌────────────────────────────────────────────────────────────────────┐
│ ← Back   Central Court                          ⭐ (28 reviews)    │
├────────────────────────────────────────────────────────────────────┤
│                      [Hero Image Gallery]                          │
│                    (◄ Previous image ►)                            │
│                  [●] [○] [○] (3 images)                            │
├────────────────────────────────────────────────────────────────────┤
│ 🏀 Basketball, Volleyball | 🏢 Business Court                     │
│ 📍 123 Main St, Downtown City | 📏 1.2 km away                    │
│ 🕒 Open: 8am - 10pm (Currently: OPEN ✓)                           │
│ ⭐ Rating: 4.6/5.0 (28 reviews)                                    │
├────────────────────────────────────────────────────────────────────┤
│ [Overview] [Active] [Events] [Bookings] [Chat]                    │
├─────────────────────────┬──────────────────────────────────────────┤
│ OVERVIEW:               │                                          │
│                         │ Contact Information:                     │
│ About This Court:       │ 📞 (555) 123-4567                        │
│ "Great indoor basketball│ 📧 info@centralcourt.com                 │
│ court with professional │                                          │
│ lighting and parking.   │ AMENITIES:                               │
│ Perfect for matches and │ ✓ Showers     ✓ Water Fountain         │
│ training. Professional  │ ✓ Parking     ✓ Seating                 │
│ staff available."       │ ✓ WiFi        ✓ Vending Machine         │
│                         │                                          │
│ RULES:                  │ HOURS:                                   │
│ • No outside shoes      │ Mon-Fri: 8am - 10pm                      │
│ • Remove jewelry        │ Sat-Sun: 7am - 11pm                      │
│ • Max 20 people per court│ Holidays: 9am - 9pm                     │
│                         │                                          │
│ ACTIVE NOW:             │ ACTIVE PLAYERS (Click for profile):      │
│ 👤👤👤+2 (5 total)      │ 👤 John Smith (Basketball)               │
│                         │ 👤 Sarah Chen (Mixed)                    │
│ [Check-in]              │ 👤 Mike Johnson (Basketball)             │
│                         │ 👤 + 2 more...                           │
│ RECENT MATCHES:         │                                          │
│ • John vs Mike          │ EVENTS & BOOKINGS:                       │
│   (2h ago, 21-19)       │ • Tournament: Today 3-6 PM [Register]    │
│ • League Match          │ • Open Play: Tomorrow 6 PM [Register]    │
│   (Yesterday)           │ • [View all events]                      │
│                         │                                          │
│                         │ [Book a Court Slot] [Share]              │
└─────────────────────────┴──────────────────────────────────────────┘
```

### Web Location Detail - Tabs (Compact View)

**Active Tab:**
```
Active Players (5):
┌──────────────────────┬──────────────────────┐
│ 👤 John Smith        │ [Want to Play?]      │
│ 🏀 Basketball        │                      │
├──────────────────────┼──────────────────────┤
│ 👤 Sarah Chen        │ [Want to Play?]      │
│ ⚽ Mixed Sports      │                      │
├──────────────────────┼──────────────────────┤
│ 👤 Mike Johnson      │ [Want to Play?]      │
│ 🏀 Basketball        │                      │
└──────────────────────┴──────────────────────┘
```

**Events Tab:**
```
Upcoming Events:
┌────────────────────────────────────────┐
│ 🏀 Basketball Tournament                │
│ Today • 3:00 PM - 6:00 PM              │
│ $50 entry | Spots: 4/16 left           │
│ [Register]                              │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⚽ Friendly League (Weekly)              │
│ Sundays • 10:00 AM                     │
│ Spots: 8/20 left                       │
│ [Register]                              │
└────────────────────────────────────────┘
```

---

## 🏢 Mobile UI - Business Location Management

```
┌─────────────────────────────────────┐
│ My Locations          [+ Add]        │
├─────────────────────────────────────┤
│                                     │
│ 🏢 Central Court                    │
│ Basketball, Volleyball              │
│ Status: ✓ Verified                  │
│ Today: 12 bookings | 5 active now   │
│ [Edit] [Manage] [Analytics]         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 🏢 Eastside Field                   │
│ Football, Badminton                 │
│ Status: ⏳ Pending Verification      │
│ Today: 8 bookings | 2 active now    │
│ [Edit] [Manage] [Analytics]         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 🏢 Downtown Hall                    │
│ Table Tennis, Badminton             │
│ Status: ❌ Unlisted                  │
│ Today: 0 bookings | 0 active        │
│ [Edit] [Manage] [Analytics]         │
│                                     │
└─────────────────────────────────────┘
```

### Add/Edit Location Flow (Mobile - Step View)

```
Step 1: Basic Information
┌─────────────────────────────────────┐
│ Add Location (Step 1/6)              │
├─────────────────────────────────────┤
│ Location Name:                       │
│ [____________________________]        │
│                                     │
│ Primary Sport:                       │
│ [Basketball ▼]                       │
│                                     │
│ Secondary Sports: (optional)         │
│ [☐ Football] [☐ Badminton]          │
│ [☐ Table Tennis] [☐ Volleyball]      │
│                                     │
│ Court Type:                          │
│ (●) Indoor    (○) Outdoor           │
│                                     │
│ Capacity:                            │
│ [___] players                        │
│                                     │
│ [Next →]                             │
└─────────────────────────────────────┘

Step 2: Address
┌─────────────────────────────────────┐
│ Add Location (Step 2/6)              │
├─────────────────────────────────────┤
│ Street Address:                      │
│ [____________________________]        │
│                                     │
│ City:                                │
│ [____________________________]        │
│                                     │
│ [📍 Use Map Picker]                 │
│                                     │
│ Postal Code:                         │
│ [__________]                         │
│                                     │
│ [← Back] [Next →]                    │
└─────────────────────────────────────┘

Step 3: Amenities
┌─────────────────────────────────────┐
│ Add Location (Step 3/6)              │
├─────────────────────────────────────┤
│ Available Amenities:                 │
│                                     │
│ [☑] Showers                          │
│ [☐] Parking                          │
│ [☑] Seating Area                     │
│ [☑] Water Fountain                   │
│ [☐] WiFi                             │
│ [☐] Vending Machine                  │
│ [☐] Restaurant/Cafe                  │
│                                     │
│ [← Back] [Next →]                    │
└─────────────────────────────────────┘

Step 4: Pricing (Optional)
┌─────────────────────────────────────┐
│ Add Location (Step 4/6)              │
├─────────────────────────────────────┤
│ Is this a paid location?             │
│ (●) Free    (○) Paid                │
│                                     │
│ If Paid:                             │
│ Hourly Rate: [$____]                 │
│ (Pricing will be configured later)   │
│                                     │
│ [← Back] [Next →]                    │
└─────────────────────────────────────┘

Step 5: Verification
┌─────────────────────────────────────┐
│ Add Location (Step 5/6)              │
├─────────────────────────────────────┤
│ Upload Verification Document         │
│ (Ownership proof, lease, etc.)       │
│                                     │
│ [📎 Choose File]                     │
│ No file selected                     │
│                                     │
│ (Optional - can be added later)      │
│                                     │
│ [← Back] [Next →]                    │
└─────────────────────────────────────┘

Step 6: Preview
┌─────────────────────────────────────┐
│ Add Location (Step 6/6)              │
├─────────────────────────────────────┤
│ PREVIEW:                             │
│                                     │
│ 🏀 Central Court                    │
│ Basketball, Volleyball (Indoor)     │
│ Capacity: 20 players                │
│ 123 Main St, Downtown City          │
│ Amenities: Showers, Seating, Water  │
│ Free to use                          │
│                                     │
│ [← Back] [Create Location]           │
└─────────────────────────────────────┘
```

---

## 🌐 Web UI - Business Location Management

```
┌────────────────────────────────────────────────────────────────────┐
│ Business Locations Management                    [+ Add New]       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ Showing 3 of 3 locations                                           │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ 🏢 Central Court          Status: ✓ Verified                      │
│ Basketball, Volleyball | Indoor | 20 capacity                    │
│ 📍 123 Main St, Downtown City                                      │
│ Today's Stats: 12 bookings | 5 active | 4.6★ (28 reviews)         │
│ [Edit] [Manage Bookings] [Analytics] [Settings] [▼ More]          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ 🏢 Eastside Field        Status: ⏳ Pending Verification          │
│ Football, Badminton | Outdoor | 40 capacity                      │
│ 📍 456 Park Ave, East City                                         │
│ Today's Stats: 8 bookings | 2 active | 4.2★ (12 reviews)         │
│ [Edit] [Manage Bookings] [Analytics] [Settings] [▼ More]          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ 🏢 Downtown Hall         Status: ❌ Unlisted                      │
│ Table Tennis, Badminton | Indoor | 30 capacity                   │
│ 📍 789 Central Ave, Downtown City                                  │
│ Today's Stats: 0 bookings | 0 active | 3.8★ (5 reviews)           │
│ [Edit] [Manage Bookings] [Analytics] [Settings] [▼ More]          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Web - Add Location (Single Form)

```
┌────────────────────────────────────────────────────────────────────┐
│ Add New Location                                                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ Location Name:                                                    │
│ [_________________________________]                               │
│                                                                    │
│ Primary Sport:                         Secondary Sports:          │
│ [Basketball ▼]                         [☐] Football               │
│                                        [☐] Badminton              │
│                                        [☐] Table Tennis           │
│                                        [☐] Volleyball             │
│                                                                    │
│ Court Type:        Capacity:                                      │
│ (●) Indoor         [___] players                                  │
│ (○) Outdoor                                                       │
│                                                                    │
│ Address:           Street Address:                                │
│ [_________________________________] │                             │
│ City:                                                              │
│ [_________________________________]                               │
│ Postal Code:       [__________]                                   │
│                                                                    │
│ [📍 Use Map Picker]                                               │
│                                                                    │
│ Available Amenities:                                              │
│ [☑] Showers  [☐] Parking  [☑] Seating  [☑] Water  [☐] WiFi      │
│ [☐] Vending Machine  [☐] Restaurant                              │
│                                                                    │
│ Hourly Rate (Optional): [$____]                                   │
│                                                                    │
│ Upload Verification Document (Optional):                          │
│ [📎 Choose File]    No file selected                              │
│                                                                    │
│ [Cancel] [Preview] [Create Location]                             │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Web - Manage Bookings Calendar

```
┌────────────────────────────────────────────────────────────────────┐
│ Manage Bookings - Central Court                   [← Back]        │
├────────────────────────────────────────────────────────────────────┤
│ Week of Feb 18 - Feb 24                                            │
│                                                                    │
│ Time    | Mon | Tue | Wed | Thu | Fri | Sat | Sun                │
│ ─────────┼─────┼─────┼─────┼─────┼─────┼─────┼──────              │
│ 8-9 AM  │ ✓   │ ✓   │ ✓   │ ✓   │ ✓   │ ✓   │ ✓                │
│ 9-10 AM │ ✗   │ ✓   │ ✗   │ ✓   │ ✓   │ ✗   │ ✓                │
│ 10-11   │ ✓   │ ✓   │ ✓   │ ✗   │ ✓   │ ✓   │ ✓                │
│ 11-12   │ ✗   │ ✓   │ ✓   │ ✓   │ ✗   │ ✗   │ ✓                │
│ 12-1 PM │ ✓   │ ✗   │ ✓   │ ✓   │ ✓   │ ✓   │ ✗                │
│ ...                                                                │
│ 8-9 PM  │ ✗   │ ✗   │ ✓   │ ✓   │ ✓   │ ✓   │ ✓                │
│ 9-10 PM │ ✓   │ ✓   │ ✓   │ ✓   │ ✓   │ ✗   │ ✗                │
│                                                                    │
│ Legend: ✓ = Available | ✗ = Booked | ⚫ = Set Unavailable        │
│                                                                    │
│ [← Prev Week] [Set Unavailable Time] [Next Week →]               │
│                                                                    │
│ Bookings for Selected Time Slot:                                  │
│ Mon 8 AM - Central Court                                          │
│ • John Smith (Confirmed) [Approve] [Cancel]                      │
│ • Sarah Chen (Pending) [Approve] [Reject]                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Community Court & Chat System

### Mobile - Community Court Creation

```
┌─────────────────────────────────────┐
│ Add Community Court                 │
├─────────────────────────────────────┤
│                                     │
│ Court Name:                         │
│ [____________________________]        │
│ (e.g., "Downtown Basketball Court")│
│                                     │
│ Primary Sport:                      │
│ [Basketball ▼]                      │
│                                     │
│ Address (Optional):                 │
│ [____________________________]        │
│ [📍 Use Map Picker]                 │
│                                     │
│ Description (Optional):             │
│ [________________________            │
│  ________________________]           │
│                                     │
│ [Cancel] [Create Court]             │
│                                     │
│ ℹ️ A community chat will be         │
│ automatically created!              │
│                                     │
└─────────────────────────────────────┘
```

### Mobile - Community Room (Chat)

```
┌─────────────────────────────────────┐
│ ← Downtown Basketball Court    (8)  │ ← Members count
├─────────────────────────────────────┤
│ [Info] [Members] [Chat]             │ ← Tabs
├─────────────────────────────────────┤
│ CHAT TAB:                           │
│                                     │
│ User1 (Admin) • 2h ago              │
│ "Anyone free to play tonight?"      │
│                                     │
│ User2 • 1h ago                      │
│ "I'm in! Let's do 5v5"             │
│                                     │
│ User3 • 45m ago                     │
│ "Count me in too 🏀"                │
│                                     │
│ [Type message...]                   │
│ [🎤] [📷] [😊] [Send]               │
│                                     │
├─────────────────────────────────────┤
│ MEMBERS TAB:                        │
│                                     │
│ 👤 User1 (Admin, Founder) • Online  │
│ 👤 User2 (Member) • Online          │
│ 👤 User3 (Member) • 30m ago         │
│ 👤 User4 (Member) • 2h ago          │
│ ... +4 more                         │
│                                     │
│ [Nominate as Moderator]             │
│                                     │
├─────────────────────────────────────┤
│ INFO TAB:                           │
│                                     │
│ Court Name: Downtown Basketball     │
│ Sport: Basketball                   │
│ Location: 123 Main St               │
│ Members: 8                          │
│                                     │
│ Election Status:                    │
│ ⏳ Not ready for election           │
│ (10 members needed)                 │
│                                     │
│ [Edit Court Info] [Leave]           │
│                                     │
└─────────────────────────────────────┘
```

### Moderator Election Flow

```
┌─────────────────────────────────────┐
│ 🗳️ Elect Community Moderators      │
├─────────────────────────────────────┤
│                                     │
│ Time to elect moderators!           │
│ You have 24 hours to vote.          │
│                                     │
│ Nominees:                           │
│                                     │
│ ☐ John (12 votes)                  │
│    "I play here 3x/week!"          │
│                                     │
│ ☐ Sarah (8 votes)                   │
│    "Love the community!"            │
│                                     │
│ ☐ Mike (5 votes)                    │
│    "Organize local tournaments"     │
│                                     │
│ [Self Nominate] [View All]          │
│                                     │
│ ───────────────────────────────────│
│ Elections close in: 18:32:15       │
│                                     │
│ [Vote] [Later]                      │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔒 Private Location Creation

### Mobile - Add Private Location

```
┌─────────────────────────────────────┐
│ Add Private Location                │
├─────────────────────────────────────┤
│                                     │
│ Court Name:                         │
│ [____________________________]        │
│ (e.g., "My Backyard Court")         │
│                                     │
│ Sport(s):                           │
│ [Basketball ▼]                      │
│                                     │
│ Address (Optional):                 │
│ [____________________________]        │
│                                     │
│ Privacy Level:                      │
│ (●) Only Me (completely private)    │
│ (○) Invite Only (share with others) │
│                                     │
│ [Cancel] [Create]                   │
│                                     │
│ ℹ️ Private locations don't appear   │
│ on the public map.                  │
│                                     │
└─────────────────────────────────────┘
```

### Invite Link Generation

```
┌─────────────────────────────────────┐
│ Share Private Court                 │
├─────────────────────────────────────┤
│                                     │
│ "My Backyard Court"                 │
│                                     │
│ Generate Invite Link:               │
│                                     │
│ [Generate New Link]                 │
│                                     │
│ Active Invite:                      │
│ athlee.app/invite/abc123xyz         │
│ Expires: Mar 18, 2026 (30 days)     │
│ Uses: 0 / Unlimited                 │
│                                     │
│ [Copy] [Share] [Revoke]             │
│                                     │
│ Invited Users:                      │
│ 👤 John Smith (invited 5 days ago)  │
│ 👤 Sarah Chen (invited 2 days ago)  │
│                                     │
│ [Remove]                            │
│                                     │
│ [Generate Another Link]             │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ Check-in & Active Now System

### Mobile - Check-in Flow

```
┌─────────────────────────────────────┐
│ Check-in at Central Court           │
├─────────────────────────────────────┤
│                                     │
│ You're checking in for 2 hours      │
│ (until 5:30 PM)                     │
│                                     │
│ Status:                             │
│ (●) I'm here to play                │
│ (○) Just watching                   │
│ (○) Coaching                        │
│                                     │
│ [Check-in] [Cancel]                 │
│                                     │
│ ℹ️ You'll be visible to other       │
│ players at this location.           │
│                                     │
└─────────────────────────────────────┘
```

### Active Now Widget (On Map)

```
Current Location Card (Expanded):

┌─────────────────────────────────────┐
│ 🏢 Central Court                    │
│ 5 active now                        │
│ [👤👤👤 +2] (Avatars)              │
│                                     │
│ [Check-in] [View Details]           │
└─────────────────────────────────────┘

Active Now Carousel (Location Detail):

┌─────────────────────────────────────┐
│ Active Now:                         │
│                                     │
│ [👤] [👤] [👤] [+2 more]            │
│ John  Sarah  Mike                   │
│                                     │
│ [Want to Play with Them?]           │
│                                     │
└─────────────────────────────────────┘
```

---

## 📅 Event Registration Flow

### Mobile - Event Details & Registration

```
┌─────────────────────────────────────┐
│ ← Basketball Tournament              │
├─────────────────────────────────────┤
│ [Tournament Image/Hero]             │
├─────────────────────────────────────┤
│ 🏀 Basketball Tournament             │
│ 📍 Central Court                    │
│ 📅 Today • 3:00 PM - 6:00 PM        │
│ 👥 4 spots left / 16 total          │
│ 💰 $50 entry fee                    │
│                                     │
│ ───────────────────────────────────│
│ ABOUT:                              │
│ "Competitive tournament open to     │
│  all skill levels. Winners get      │
│  merchandise!"                      │
│                                     │
│ FORMAT:                             │
│ Single elimination (4 games max)    │
│                                     │
│ REGISTERED PARTICIPANTS:            │
│ 👤 John Smith                       │
│ 👤 Sarah Chen                       │
│ 👤 Mike Johnson                     │
│ ... +9 more                         │
│                                     │
│ [Register Now] [Share]              │
│                                     │
└─────────────────────────────────────┘
```

### Registration Confirmation

```
┌─────────────────────────────────────┐
│ Registration Confirmation           │
├─────────────────────────────────────┤
│                                     │
│ ✓ Successfully Registered!          │
│                                     │
│ Event: Basketball Tournament         │
│ Time: Today 3:00 PM                 │
│ Location: Central Court             │
│ Spot: #13 of 16                     │
│ Fee: $50 (Due on arrival)           │
│                                     │
│ Confirmation # ABC123XYZ            │
│ (Save for check-in)                 │
│                                     │
│ [Add to Calendar] [Done]            │
│                                     │
│ See you at the tournament! 🏆       │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Component Details

| Component | Mobile | Web | Purpose |
|-----------|--------|-----|---------|
| **Map Marker** | Tap to highlight/expand | Hover to show tooltip | Show location on map with type icon & active count |
| **Sport Filter Chip** | Horizontal scroll buttons | Horizontal button group | Multi-select sports to filter map |
| **Type Filter** | Bottom-sheet modal | Dropdown menu | Filter locations by type (Business, Community, Private) |
| **Bottom Sheet** | Swipeable from bottom | Fixed sidebar | Show locations in current map view |
| **Location Card** | Compact (name, sport, distance, active) | Compact or expanded | Primary action: navigate to Location Detail |
| **Image Gallery** | Swipe horizontally | Previous/Next arrows | Browse location photos |
| **Tab Navigation** | Scrollable tabs below header | Horizontal tab bar | Switch between Overview/Active/Events/Bookings/Chat |
| **Amenities Grid** | Icon + label grid | Checkbox list | Display available amenities |
| **Active Players List** | Vertical scrolling list | Table/grid view | Show currently present players with "Want to Play?" |
| **Events List** | Scrolling card stack | Sortable table/grid | Show upcoming tournaments, leagues, open play |
| **Bookings Calendar** | Week or day view | Month or week calendar | Show available/booked time slots |
| **Chat Interface** | Message list + input | Message thread + sidebar | Community court communication |
| **Invite Link Generator** | Modal or dedicated page | Form + display section | Generate/manage invite links for private courts |
| **Check-in Button** | CTA at bottom or floating | CTA in detail/active sections | Quick check-in action |
| **Event Registration Form** | Modal or bottom sheet | Inline or modal form | Confirm registration with optional payment |

---

## 🔄 Key Interactions

### Mobile Interactions

| Action | Result | Navigation |
|--------|--------|-----------|
| Tap map marker | Highlight marker, expand bottom sheet | Stay on Map View |
| Drag/pan map | Update visible locations in list | Map recenters, list updates |
| Tap location card | Open Location Detail page | Map → Location Detail |
| Swipe left on card | Show share/bookmark actions | Card shifts to reveal buttons |
| Tap "Active" tab | Scroll to active players list | Location Detail → Active Tab |
| Tap avatar in Active tab | Open player profile | Location Detail → Player Profile (external) |
| Tap "Check-in" | Show check-in modal with status options | Location Detail → Check-in Modal |
| Tap sport filter | Toggle sport, update map | Map View (filter chips updated) |
| Tap "+" in My Locations | Open Add Location flow (step 1) | Profile → Business Management → Add Location |
| Tap "Register" on event | Show registration confirmation | Location Detail → Registration Confirmation |
| Long press location card | Show quick actions menu | Card → Action menu |
| Pull to refresh active list | Reload players from server | Active tab refreshes |

### Web Interactions

| Action | Result | Navigation |
|--------|--------|-----------|
| Click map marker | Highlight marker, highlight in sidebar | Map + sidebar update |
| Drag/pan map | Update visible locations in sidebar | Map recenters, sidebar list updates |
| Click location card (sidebar) | Open Location Detail in modal or new tab | Map/Sidebar → Location Detail |
| Click sport filter button | Toggle sport, update map | Map View (filter updated) |
| Click type filter dropdown | Show filter options, update map | Map View (filter updated) |
| Type in search bar | Real-time filter results on map & sidebar | Map + sidebar update live |
| Click "Active" tab | Scroll to active players section | Location Detail → Active section |
| Click player avatar | Open player profile in new tab | Location Detail → Player Profile |
| Click "Check-in" button | Show check-in modal | Location Detail → Check-in Modal |
| Click "Book Now" | Open bookings calendar | Location Detail → Bookings Tab |
| Click time slot | Show booking confirmation | Bookings → Booking Confirmation |
| Click "Register" (event) | Show registration confirmation | Event Details → Registration Confirmation |
| Click "Add Location" button | Open add location form (single page) | Business Management → Add Location Form |
| Click "Manage Bookings" | Open calendar grid for bookings | Business Management → Bookings Calendar |
| Hover location card | Show expanded details & action buttons | Card expands with info |
| Right-click map | Show context menu ("Add location here") | Map → Context menu |

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Map View Screen                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Location (GPS)  Sport Filter  Type Filter  Search    │
│         │                 │              │          │      │
│         └─────────────────┴──────────────┴──────────┘      │
│                        │                                   │
│                  LocationService                           │
│                  .searchNearby()                            │
│                  .filter()                                  │
│                        │                                   │
│                        ▼                                   │
│    ┌──────────────────────────────┐                       │
│    │ Location Objects with:        │                       │
│    │ - id, name, sport[], type     │                       │
│    │ - coordinates, distance        │                       │
│    │ - activePlayerCount, status    │                       │
│    └──────────────────────────────┘                       │
│                        │                                   │
│            Tap Marker / Tap Card                           │
│                        │                                   │
│                        ▼                                   │
│     ┌──────────────────────────────┐                      │
│     │  Location Detail Page         │                      │
│     │  Load Full Location Data:     │                      │
│     │  - Images, amenities, rules   │                      │
│     │  - Active players list        │                      │
│     │  - Upcoming events            │                      │
│     │  - Bookings calendar          │                      │
│     └──────────────────────────────┘                      │
│                        │                                   │
│         ┌──────────────┼──────────────┐                    │
│         │              │              │                    │
│    Check-in       Register Event   Book Now               │
│         │              │              │                    │
│         ▼              ▼              ▼                    │
│   CheckInService  EventService   BookingService           │
│   .checkIn()      .register()     .createBooking()         │
│         │              │              │                    │
│         └──────────────┴──────────────┘                    │
│                        │                                   │
│                  Update User State                         │
│              (Active Presence, Events, Bookings)           │
│                        │                                   │
│                  Notify Other Users                        │
│              (Socket/Push Notifications)                   │
│                                                            │
└─────────────────────────────────────────────────────────────┘

Business Management Flow:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Business Profile → Locations Tab                           │
│         │                                                  │
│         ▼                                                  │
│  LocationService.getBusinessLocations(userId)              │
│         │                                                  │
│         ▼                                                  │
│  Display Business Locations List                           │
│         │                                                  │
│    ┌────┴────┬─────────────┐                              │
│    │          │             │                              │
│  [Edit] [Manage] [Analytics]                              │
│    │          │             │                              │
│    ▼          ▼             ▼                              │
│ Edit Form  Calendar    Dashboard                           │
│ Update     Manage      View Stats                          │
│ Location   Bookings    Analytics                           │
│    │          │             │                              │
│    └────┬─────┴─────────────┘                              │
│         │                                                  │
│    LocationService.update()                                │
│    BookingService.manage()                                 │
│         │                                                  │
│         ▼                                                  │
│    Database Update                                         │
│    Notify Users of Changes                                 │
│                                                            │
└─────────────────────────────────────────────────────────────┘

Community Court Flow:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Player Creates Community Court                             │
│         │                                                  │
│         ▼                                                  │
│  LocationService.createCommunityLocation()                 │
│         │                                                  │
│         ├──────────────────────────┐                       │
│         │                          │                       │
│    Create Location             Create Chat Room            │
│         │                          │                       │
│         └──────────────┬───────────┘                       │
│                        │                                   │
│                  Link Location → Chat                      │
│                        │                                   │
│                        ▼                                   │
│              CommunityRoom Created                         │
│              (Auto-add creator as admin)                   │
│                        │                                   │
│          Players Join → Chat Messages                      │
│                        │                                   │
│          Member Count >= Threshold                         │
│                        │                                   │
│                        ▼                                   │
│          Trigger Moderator Election                        │
│          (Nominate, Vote, Elect Top 2)                     │
│                        │                                   │
│                Moderators Can:                             │
│                - Pin messages                              │
│                - Remove spam                               │
│                - Edit court info                           │
│                                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Account Type Variations

### Player Account - Location System

**Capabilities:**
- View all Business and Community locations on map
- Check-in at any public location
- Join Community courts (with chat access)
- Create private personal courts
- Register for events
- Book time slots (if available)
- See active players and "want to play?" messaging

**Restrictions:**
- Cannot manage/edit Business locations
- Cannot verify locations
- Cannot set booking prices
- Community court founder role automatic (can't assign)

### Business Account - Location System

**Capabilities:**
- Create Business locations (venue management)
- Upload verification documents
- Set venue amenities and details
- Create events and tournaments
- Manage bookings calendar
- View analytics/statistics
- Set pricing (if monetized)
- Manage bookings (approve/deny)

**Restrictions:**
- Cannot create Community courts (player feature)
- Cannot create private personal courts (player feature)
- Locations appear publicly unless "Unlisted"

---

## ⚡ States & Edge Cases

### Loading States
- **Map loading**: Show skeleton markers and placeholder bottom sheet
- **Location detail loading**: Show skeleton for images, amenities, players
- **Active players loading**: Skeleton avatars with shimmer animation
- **Events loading**: Event card skeletons

### Empty States
- **No locations found**: "No courts found in your area. Try expanding your search."
- **No active players**: "Be the first to check-in! 🚀"
- **No events**: "No upcoming events. Check back soon!"
- **No bookings**: "Available times shown. Select a time to book."
- **No private locations**: "Create your first private location to get started."

### Error States
- **Map unavailable**: "Map couldn't load. Check your connection."
- **Location permission denied**: "Enable location to see nearby courts."
- **Booking failed**: "Couldn't complete booking. Please try again."
- **Check-in failed**: "Check-in failed. You may already be checked in."
- **Network error**: "Connection error. Please try again."

### Special States
- **Location closed**: Show "Closed now" badge. Available times greyed out.
- **Location at capacity**: Show "Full" badge. Booking disabled.
- **Unverified location**: Show "Pending Verification" badge (Business only).
- **Private location (no access)**: "You don't have access to this location" with invite option.

---

## 🎨 Color Scheme

### Primary Colors
| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Active Badge** | Green-500 (#10B981) | Green-400 (#34D399) |
| **Closed Badge** | Red-500 (#EF4444) | Red-400 (#F87171) |
| **Pending Badge** | Yellow-500 (#EABD3A) | Yellow-400 (#FBBF24) |
| **Map Marker (Business)** | Blue-600 (#2563EB) | Blue-400 (#60A5FA) |
| **Map Marker (Community)** | Purple-600 (#7C3AED) | Purple-400 (#A78BFA) |
| **Map Marker (Private)** | Gray-600 (#4B5563) | Gray-400 (#9CA3AF) |
| **Sport Filter (Active)** | Blue-600 (#2563EB) | Blue-400 (#60A5FA) |
| **Sport Filter (Inactive)** | Gray-300 (#D1D5DB) | Gray-600 (#4B5563) |
| **Amenity Icon** | Green-600 (#059669) | Green-400 (#34D399) |
| **Active Player Avatar** | Green-500 (#10B981) | Green-400 (#34D399) |
| **Booking Available** | Green-500 (#10B981) | Green-400 (#34D399) |
| **Booking Booked** | Gray-400 (#A1A1AA) | Gray-600 (#4B5563) |

### Text Colors
| Usage | Light Mode | Dark Mode |
|-------|-----------|-----------|
| **Primary Text** | Gray-900 (#111827) | White (#FFFFFF) |
| **Secondary Text** | Gray-600 (#4B5563) | Gray-300 (#D1D5DB) |
| **Disabled Text** | Gray-400 (#A1A1AA) | Gray-500 (#6B7280) |
| **Success Text** | Green-600 (#059669) | Green-400 (#34D399) |
| **Error Text** | Red-600 (#DC2626) | Red-400 (#F87171) |

---

## 📱 Responsive Design

### Mobile Breakpoints (React Native + Responsive Web)
- **Extra Small** (320px): iPhone SE, older devices
- **Small** (375px): iPhone, common mobile
- **Medium** (414px): Larger phones (iPhone Plus)
- **Large** (480px): Small tablets, landscape phone

**Layout Adjustments:**
- **320px**: Single column, compact spacing, full-width bottom sheet
- **375px+**: Comfortable spacing, full-width components
- **414px+**: Increased padding for thumb accessibility
- **480px+**: Split view option (map + list side-by-side)

### Web Breakpoints (Responsive Web)
- **Mobile** (< 640px): Full-width map, bottom sheet list
- **Tablet** (640px - 1024px): Map + sidebar (1/3 width list)
- **Desktop** (1024px+): Map + sidebar, expanded details panel
- **Large Desktop** (1440px+): Map + sidebar + detail panel (3-column)

**Layout Adjustments:**
- **< 640px**: Stacked layout, full-width map, overlay bottom sheet
- **640px - 1024px**: Side-by-side map and list (sidebar)
- **1024px+**: 2-column with detail expansion
- **1440px+**: 3-column with expanded information

---

## ♿ Accessibility Features

### Keyboard Navigation
- Tab through filters, buttons, and location cards
- Enter/Space to activate buttons and filters
- Arrow keys to navigate map markers (web)
- Escape to close modals and bottom sheets

### Screen Reader Support
- All markers announce type and active player count
- Sport filter chips labeled and grouped
- Location cards have descriptive titles and stats
- Button labels clear and descriptive
- Form fields labeled with visible labels
- Error messages announced to screen readers

### Visual Accessibility
- Color used not as sole indicator (icons + color)
- Amenity icons accompanied by text labels
- High contrast between text and backgrounds
- At least 44x44px touch targets (mobile)
- Font sizes: 16px+ for body text
- Line height: 1.5 minimum for readability

### Motion & Animations
- Smooth transitions (200-300ms duration)
- No auto-playing animations on page load
- Reduce motion: Respect `prefers-reduced-motion`
- Map movements animated smoothly, not instant

---

## 🧭 Navigation Paths

### From Map View
```
Map View
├── [Tap Marker] → Location Detail
├── [Tap Card] → Location Detail
├── [Long Press] → Quick Actions Menu
│   ├── [View Details] → Location Detail
│   ├── [Check-in] → Check-in Modal
│   └── [Share] → Share Sheet
├── [Sport Filter] → Apply Filter
├── [Type Filter] → Apply Filter
├── [Search] → Search Results (filtered map)
└── [+ Add Location] → Add Location Flow (Business only)

Location Detail
├── [Check-in] → Check-in Modal → Active Now Widget
├── [Active Tab] → Active Players List
│   └── [Tap Player] → Player Profile
├── [Events Tab] → Events List
│   └── [Register] → Registration Confirmation
├── [Bookings Tab] → Calendar
│   └── [Book Slot] → Booking Confirmation
├── [Chat Tab] → Community Chat (community courts only)
│   └── [Members] → Members List
├── [Share] → Share Sheet
└── [← Back] → Map View

Business Management
├── [+ Add Location] → Add Location Flow
│   ├── Step 1: Basic Info
│   ├── Step 2: Address
│   ├── Step 3: Amenities
│   ├── Step 4: Pricing
│   ├── Step 5: Verification
│   └── Step 6: Preview → Create
├── [Edit] → Edit Location Form
├── [Manage Bookings] → Bookings Calendar
└── [Analytics] → Location Analytics

Private Court Management
├── [Add Private Location] → Private Location Form
├── [Invite Others] → Invite Link Generator
└── [Revoke Invite] → Confirm & Revoke
```

---

## 🏗️ Component Hierarchy

```
Location System
├── MapView Screen
│   ├── Header (Search, Filter buttons)
│   ├── SportFilterChips
│   ├── InteractiveMap
│   │   └── MapMarkers (varied by type)
│   ├── BottomSheet (Mobile) / Sidebar (Web)
│   │   └── LocationCardList
│   │       └── LocationCard (repeating)
│   └── FloatingActionButton [+ Add]
│
├── LocationDetailPage
│   ├── DetailHeader
│   │   ├── BackButton
│   │   ├── LocationName
│   │   └── RatingBadge
│   ├── HeroImageGallery
│   ├── QuickInfo (Sport, Type, Address, Status)
│   ├── TabNavigation
│   │   ├── OverviewTab
│   │   │   ├── AboutDescription
│   │   │   ├── AmenitiesGrid
│   │   │   ├── RulesList
│   │   │   ├── ContactInfo
│   │   │   ├── ActiveNowCarousel
│   │   │   └── RecentMatchesList
│   │   ├── ActiveTab
│   │   │   ├── ActivePlayersList
│   │   │   │   └── PlayerCard (repeating)
│   │   │   └── CheckInButton
│   │   ├── EventsTab
│   │   │   └── EventsList
│   │   │       └── EventCard (repeating)
│   │   ├── BookingsTab
│   │   │   ├── CalendarGrid
│   │   │   └── TimeSlotsList
│   │   └── ChatTab
│   │       ├── MessageList
│   │       └── InputField
│   └── CTAButtons
│
├── BusinessManagement Screen
│   ├── Header [+ Add Location]
│   ├── LocationsList
│   │   └── LocationManagementCard
│   │       ├── LocationInfo
│   │       ├── TodayStats
│   │       └── ActionButtons [Edit] [Manage] [Analytics]
│   │
│   ├── AddLocationForm / Modal
│   │   ├── StepIndicator (Mobile) or SingleForm (Web)
│   │   ├── BasicInfoStep
│   │   │   ├── NameInput
│   │   │   ├── SportSelect
│   │   │   ├── TypeRadio
│   │   │   └── CapacityInput
│   │   ├── AddressStep
│   │   │   ├── AddressInput
│   │   │   └── MapPicker
│   │   ├── AmenitiesStep
│   │   │   └── AmenityCheckboxes
│   │   ├── PricingStep
│   │   │   └── RateInput
│   │   ├── VerificationStep
│   │   │   └── DocumentUpload
│   │   └── PreviewStep
│   │
│   ├── ManageBookingsScreen
│   │   ├── CalendarHeader
│   │   ├── BookingsCalendarGrid
│   │   └── BookingActionsList
│   │
│   └── AnalyticsScreen
│       ├── StatsCards
│       └── Charts
│
├── CommunityCourtSystem
│   ├── CreateCommunityFlow
│   │   └── CommunityForm
│   │
│   ├── CommunityRoomScreen
│   │   ├── Header (Members count)
│   │   ├── TabNavigation
│   │   │   ├── ChatTab
│   │   │   │   ├── MessageList
│   │   │   │   └── MessageInput
│   │   │   ├── MembersTab
│   │   │   │   └── MembersList
│   │   │   └── InfoTab
│   │   │       └── CourtInfo
│   │   └── ElectionPrompt (when threshold met)
│   │       ├── NomineesList
│   │       └── VoteButtons
│   │
│   └── ModeratorElectionFlow
│       ├── NominationForm
│       └── VotingInterface
│
├── PrivateLocationSystem
│   ├── CreatePrivateFlow
│   │   └── PrivateLocationForm
│   │
│   └── InviteLinkManager
│       ├── LinkGenerator
│       ├── LinkDisplay
│       └── InvitedUsersList
│
└── CheckInSystem
    ├── CheckInModal
    │   ├── StatusRadio
    │   └── ConfirmButton
    │
    └── ActiveNowWidget
        ├── AvatarCarousel
        └── ActiveCount Badge
```

---

## 🔐 Privacy & Permissions

### Location Permission Handling
```
App Start
├── Request Location Permission
│   ├── [Allow] → Use GPS, show accurate distance
│   └── [Deny] → Show map centered on city, distance unavailable
│
Map View
├── User Enabled Location → Update map center in real-time
├── User Disabled Location → Show message, offer alternatives
└── Location Accuracy Low → Show warning, update map less frequently
```

### Private Location Access
```
Private Location Created by User A
├── User A (Creator)
│   └── Full access: View, Edit, Share, Delete
│
├── Invited Users (with valid invite link)
│   └── Limited access: View only, No edit, Can't invite others
│
├── Uninvited Users
│   └── No access: Location hidden from map
│       (If they have invite link → show access granted)
│
└── Public Invites
    └── Invite link shared → Anyone with link can access
        (Link can be revoked anytime)
```

---

## ✅ Testing Checklist

### Map View Testing
- [ ] Map loads with user location
- [ ] Markers display with correct icons (Business/Community/Private)
- [ ] Active player badge shows correctly
- [ ] Sport filter toggles update map markers
- [ ] Type filter updates visible locations
- [ ] Search bar filters results in real-time
- [ ] Tap marker highlights and expands bottom sheet
- [ ] Bottom sheet location card is swipeable (mobile)
- [ ] Location list in sidebar updates when dragging map (web)
- [ ] Permission denied shows appropriate message
- [ ] Map works in landscape and portrait (mobile)
- [ ] Responsive layout works at all breakpoints

### Location Detail Testing
- [ ] Page loads with all location data
- [ ] Hero image gallery is swipeable/scrollable
- [ ] All tabs are accessible (Overview, Active, Events, Bookings, Chat)
- [ ] Overview tab shows amenities, rules, contact info
- [ ] Active tab shows current players with avatars
- [ ] Active count matches real-time badge on map
- [ ] Events tab shows upcoming events with registration button
- [ ] Bookings calendar shows available/booked times
- [ ] Chat tab only shows for community courts
- [ ] Check-in modal works and updates active status
- [ ] Rating displays correctly
- [ ] Share button works
- [ ] Loading skeleton shows during data fetch
- [ ] Error states show appropriate messages

### Business Management Testing
- [ ] Business user can see their locations
- [ ] Add Location flow works for all 6 steps
- [ ] Map picker works for address selection
- [ ] Form validation prevents incomplete submissions
- [ ] Location appears on map after creation
- [ ] Edit location updates data correctly
- [ ] Manage Bookings calendar displays correctly
- [ ] Calendar shows correct available/booked slots
- [ ] Can approve/reject pending bookings
- [ ] Can set unavailable times
- [ ] Analytics screen displays stats
- [ ] Loading states show during form submission

### Community Court Testing
- [ ] Player can create community court
- [ ] Chat room auto-created with location
- [ ] Founder set as admin automatically
- [ ] Other players can join and chat
- [ ] Members list shows all joined players
- [ ] Moderator election triggers at threshold (10 members)
- [ ] Nomination and voting work correctly
- [ ] Top 2 nominees become moderators
- [ ] Moderators can pin messages
- [ ] Moderators can remove inappropriate messages

### Private Location Testing
- [ ] Player can create private location
- [ ] Private location hidden from public map
- [ ] Owner can generate invite links
- [ ] Invite link grants access to invited users
- [ ] Link can be revoked
- [ ] Revoked link denies access
- [ ] Invite link has expiration option
- [ ] Invited users can see private location on their map
- [ ] Uninvited users cannot see it

### Check-In Testing
- [ ] Check-in button opens modal with options
- [ ] Check-in status options work (Playing, Watching, Coaching)
- [ ] Check-in updates active players count
- [ ] Checked-in player appears in Active tab
- [ ] Auto check-out after 2 hours
- [ ] Manual check-out works
- [ ] Active badge updates on map in real-time

### Event Registration Testing
- [ ] Event details display correctly
- [ ] Registration button appears
- [ ] Registration confirmation shows details
- [ ] Registered user appears in participants list
- [ ] Event appears in user's profile/calendar
- [ ] Unregistration works
- [ ] Payment flow works (if applicable)

### Cross-Platform Testing
- [ ] Mobile UI works on iPhone SE (320px)
- [ ] Mobile UI works on iPhone 12 (390px)
- [ ] Mobile UI works on iPad (768px)
- [ ] Web UI works on 640px breakpoint
- [ ] Web UI works on 1024px breakpoint
- [ ] Web UI works on 1440px+ desktop
- [ ] All gestures work (tap, swipe, long-press)
- [ ] Keyboard navigation works on web
- [ ] Screen reader announces all content
- [ ] Dark mode colors display correctly

### Performance Testing
- [ ] Map loads within 2 seconds
- [ ] Location detail loads within 1.5 seconds
- [ ] Images load progressively
- [ ] Chat messages load smoothly with 100+ messages
- [ ] Smooth scrolling on lists with 50+ items
- [ ] No lag when filtering/searching
- [ ] Responsive to user interactions (< 100ms)

---

## 🚀 Future Enhancements

1. **Advanced Booking System**
   - Payment integration for paid courts
   - Refund policies and cancellation windows
   - Group booking (multiple courts simultaneously)
   - Subscription plans for unlimited bookings

2. **Court Analytics & Insights**
   - Heatmaps showing peak usage times
   - Popular time slots analysis
   - Revenue tracking (business accounts)
   - User engagement metrics

3. **Social Features**
   - Match replay/statistics
   - Player vs player history
   - Rating and review system
   - Skill level verification badges

4. **Enhanced Community Features**
   - League creation and management
   - Tournament brackets and scoring
   - Stats leaderboards
   - Player skill-based matchmaking

5. **Monetization**
   - In-app booking payments
   - Court owner commission system
   - Premium features for business accounts
   - Sponsored event placement

6. **Mobile-Specific**
   - Apple/Google Maps integration
   - Siri shortcuts for check-in
   - Home screen widgets
   - Push notifications for active players

7. **Web-Specific**
   - Admin dashboard for platform management
   - Dispute resolution interface
   - Bulk operations for business owners
   - Advanced analytics/reporting

8. **AI & Recommendations**
   - Personalized court recommendations
   - Smart event suggestions
   - Automatic moderator recommendations for community courts
   - Pricing optimization for business courts

9. **International Expansion**
   - Multi-language support
   - Multi-currency support
   - Regional sports support
   - Local time zone handling

10. **Accessibility Enhancements**
    - Voice control for check-in
    - Haptic feedback for actions
    - High contrast mode
    - Text-to-speech for chat messages

---

## 📞 Related Components & Services

### Services Required
- **LocationService**: CRUD operations, search, filtering, real-time updates
- **BookingService**: Create, manage, cancel bookings
- **EventService**: Create, register, manage events
- **CheckInService**: Check-in/out, active presence tracking
- **ChatService**: Community chat messaging, notifications
- **CommunityService**: Community court creation, moderation
- **NotificationService**: Real-time updates for active players, bookings

### External APIs
- **Google Maps / Mapbox**: Map rendering, geocoding, distance calculation
- **Push Notification Service**: FCM (Android), APNs (iOS), Web Push
- **Payment Gateway**: Stripe, PayPal (for bookings & events)
- **Image Upload**: AWS S3, Cloudinary (for location photos)

### Related Features
- **User Profiles**: Integration for avatar, rating display
- **Notifications**: Event reminders, booking confirmations, chat messages
- **Matching System**: Recommends courts based on user preferences
- **Analytics**: Tracks usage patterns and trending locations

---

## 📄 File References

### Related Code Files
- `/packages/shared/src/locations/location.types.ts` - Types (Location, Amenity, Event, Booking, etc.)
- `/apps/mobile/app/(tabs)/locations/` - Mobile screens (index, [id], create, etc.)
- `/apps/web/src/app/locations/` - Web pages (map, detail, manage, etc.)
- `/apps/api/src/locations/` - Backend API (controllers, services, repositories)
- `/apps/api/src/bookings/` - Booking management backend
- `/apps/api/src/communities/` - Community management backend
- `/apps/api/src/events/` - Event management backend

---

**Last Updated:** Feb 18, 2026  
**Status:** 📋 Design Reference - Ready for Feature Prompt  
**Next:** Execute implementation based on this specification
