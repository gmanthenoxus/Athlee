# Location System - Quick Start Guide

## 🚀 Getting Started

### 1. Start the Dev Server
```bash
cd /Users/noxus/Documents/Athlee/apps/web
npm run dev
```

The app will be available at `http://localhost:3000`

### 2. Navigate to Locations
- Click "Explore" in the home navigation
- Or visit: `http://localhost:3000/locations`

---

## 🧪 Testing Workflows

### Workflow 1: Discover Locations
1. **Homepage** → Click "Explore" or navigate to `/locations`
2. **Discovery Page**:
   - See all 15+ pre-loaded locations
   - Try searching (e.g., "Downtown", "Basketball")
   - Click sport filter chips (🏀 ⚽ 🎾)
   - Select location type (🏢 Business | 👥 Community | 🔒 Private)
   - Change sort: Nearest → Most Active → Newest → Most Bookings
   - Click "Clear Filters" to reset
3. **Results**:
   - Each card shows: image, name, sports, type badge, distance, active players
   - Click any card to see details

### Workflow 2: View Location Details & Tabs
1. **From Discovery Page** → Click "View Details" on any location card
2. **Location Detail** (`/locations/[id]`):

   **📋 Overview Tab** (default):
   - Description/About section
   - Amenities grid with icons
   - Hours of operation

   **👥 Active Tab**:
   - See active players (checked-in users)
   - If not checked in: "Here to Play" and "Just Watching" buttons
   - If checked in: "Check Out" button
   - Empty state if no one active

   **🎯 Events Tab**:
   - List of upcoming events (next 30 days)
   - Each event shows: type, date, time, spots available
   - "Register Now" button (non-functional in Phase 1)

   **📅 Bookings Tab**:
   - If you're the business owner: see today's bookings
   - If you're a player: see "Book a Court" CTA
   - Empty state if no bookings

   **💬 Chat Tab**:
   - **Community locations only** (visible for 👥 type)
   - Send a test message
   - Messages persist in localStorage
   - Hidden for Business and Private locations

### Workflow 3: Check-In System
1. **Go to any location detail page**
2. **Active Tab** → Click "Here to Play" or "Just Watching"
3. **Observe**:
   - Button changes to "✓ Check Out"
   - Your user ID appears in active players list
   - Active count increases in info bar
   - Check-in expires after 2 hours (simulated)
4. **Click "Check Out"** to remove yourself from active

### Workflow 4: Filter & Sort Combinations
1. **Discovery Page** → Try these combinations:
   - Sports: 🏀 Basketball + ⚽ Soccer, Sort: Most Active
   - Type: 👥 Community, Sort: Nearest
   - Type: 🏢 Business, Sport: 🎾 Tennis
   - Search: "Park", Sort: Newest
   - All types filtered, search "Downtown"
2. **Verify results** update correctly for each combination

### Workflow 5: Browse Different Location Types

**Business Locations** 🏢:
- Example: "Downtown Basketball Arena", "Uptown Tennis Club"
- Features: Bookings tab, amenities, hours
- No chat tab

**Community Locations** 👥:
- Example: "Central Park Basketball Court", "Washington Square Soccer"
- Features: Chat tab, free to use
- More flexible hours

**Private Locations** 🔒:
- Example: "Private Basketball Court - Downtown"
- Features: Owner-only (in Phase 2: invite links)
- Limited visibility

---

## 🔍 Testing Details

### Test Accounts
Use any account from the auth system:
- **Player** (account_type: "Player") - can check-in, register events, join chats
- **Business** (account_type: "Business") - can manage locations (Phase 2)

### Mock Data Overview
- **15+ Locations**: All types, all sports, diverse amenities
- **45+ Events**: Spread across locations, various types (Tournament, League, OpenPlay)
- **150+ Bookings**: Distributed next 7 days, mix of confirmed/cancelled
- **Auto-generated Chat Rooms**: One per community location

### Data Persistence
- All data in localStorage under `athlee_*` keys
- Clear in DevTools → Storage → localStorage to reset
- Data regenerates automatically on next page load

---

## 🐛 Common Issues & Solutions

### Issue: No locations showing
**Solution**: 
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing localStorage and refreshing

### Issue: Check-in button doesn't work
**Solution**:
- Make sure you're logged in (see current user in nav)
- Check "Active" tab specifically
- Try a different location

### Issue: Tab content not loading
**Solution**:
- Refresh the page
- Try clicking another tab first, then back
- Check browser console for JavaScript errors

### Issue: Chat not visible
**Solution**:
- Make sure location type is "👥 Community"
- For Business/Private locations, chat is intentionally hidden
- Reload the page if messages don't appear

---

## 📊 Data Structures

### Location Object
```javascript
{
  id: "loc_basketball_downtown",
  name: "Downtown Basketball Arena",
  sports: ["Basketball"],
  type: "Business",
  address: "123 Sports Ave, New York, NY 10001",
  coordinates: { lat: 40.7128, lng: -74.006 },
  description: "Professional-grade courts...",
  amenities: ["Parking", "Showers", "Lighting"],
  hours: "06:00-23:00",
  images: ["https://via.placeholder.com/..."],
  capacity: 100,
  verified: true,
  ownerId: "business_001",
  activePlayers: [] // Updated in real-time
}
```

### Check-In Record
```javascript
{
  userId: "player_001",
  locationId: "loc_basketball_downtown",
  status: "here_to_play", // or "just_watching"
  checkedInAt: "2026-02-24T10:00:00Z",
  expiresAt: "2026-02-24T12:00:00Z" // 2 hours later
}
```

### Event Object
```javascript
{
  id: "event_loc_basketball_downtown_0",
  locationId: "loc_basketball_downtown",
  title: "League - Basketball",
  type: "League", // or "Tournament", "Open Play"
  date: "2026-03-05T14:00:00Z",
  time: "14:00",
  maxParticipants: 16,
  registeredUsers: [],
  description: "Join us for...",
  price: 25 // or null
}
```

### Booking Object
```javascript
{
  id: "booking_loc_basketball_downtown_0",
  locationId: "loc_basketball_downtown",
  userId: "player_001",
  date: "2026-02-24", // YYYY-MM-DD
  startTime: "14:00",
  endTime: "15:30",
  status: "confirmed" // or "cancelled"
}
```

---

## 🎯 Feature Checklist

### ✅ Already Working
- [x] Discovery page with search
- [x] Sport filter chips
- [x] Location type filter
- [x] Sort options (Nearest, Most Active, Newest, Most Bookings)
- [x] Location cards with images and info
- [x] Location detail page
- [x] Overview tab with description and amenities
- [x] Active tab with check-in/out
- [x] Active players list
- [x] Events tab with upcoming events
- [x] Bookings tab (view-only in Phase 1)
- [x] Chat tab for community locations
- [x] Send/receive messages in chat
- [x] Mock data initialization
- [x] localStorage persistence

### ⏳ Coming in Phase 2
- [ ] Business dashboard (/business/locations)
- [ ] Add new location form (6 steps)
- [ ] Edit location form
- [ ] Community court creation (/locations/create-community)
- [ ] Private location invite links
- [ ] Event registration (full flow)
- [ ] Booking creation (full flow)
- [ ] Moderator election UI
- [ ] Profile integration (My Events, My Check-ins)
- [ ] Navigation integration (Explore tab)
- [ ] Unit and UI tests
- [ ] Analytics and real maps

---

## 🔧 Development Notes

### Adding Test Locations
Edit `/Users/noxus/Documents/Athlee/apps/web/src/lib/mockLocations.ts`:
```typescript
// Add to generateMockLocations() array
{
  id: 'loc_new_court',
  name: 'Your New Court',
  sports: [SportType.Basketball],
  type: LocationType.Community,
  // ... rest of location object
}
```

### Adding Test Events
Events are auto-generated. To customize, edit `generateMockEvents()` in mockLocations.ts

### Adding Test Bookings
Bookings are auto-generated. To customize, edit `generateMockBookings()` in mockLocations.ts

### Debugging Check-Ins
Open browser DevTools → Application → localStorage:
- `athlee_checkins`: Array of active check-in records
- `athlee-location-store`: Zustand persistence

### Inspecting Services
In browser console:
```javascript
// Import services (if in React component)
import { locationService } from '@/lib/locationService'

// Get all locations
console.log(locationService.getLocations())

// Get specific location with active players
console.log(locationService.getLocationById('loc_basketball_downtown'))

// Check a user in
locationService.checkIn('player_001', 'loc_basketball_downtown', 'here_to_play')
```

---

## 📱 Mobile Testing

The location system is fully responsive:
- **Discover Page**: Single column on mobile, cards stack
- **Location Detail**: All tabs accessible, scroll through content
- **Check-in**: Buttons sized for touch
- **Chat**: Full-height message list, message input always visible

Test on mobile by:
1. DevTools → Toggle Device Toolbar (Cmd+Shift+M)
2. Select device: iPhone 12, iPhone 14, iPad, etc.
3. Test all workflows on different screen sizes

---

## 🚢 Deployment Notes

All data is **client-side only** (localStorage). To persist across devices:
1. Export localStorage before moving computers
2. Or implement backend API in Phase 2

No environment variables needed for Phase 1.

---

## 📞 Questions?

Refer to:
- Feature doc: `docs/features/02-location-system.md`
- Type definitions: `src/lib/location-types.ts`
- Services: `src/lib/*Service.ts`
- Components: `src/app/locations/*` and `src/components/LocationCard.tsx`

---

**Version**: 1.0.0 (Phase 1 Complete)
**Last Updated**: 2026-02-24
