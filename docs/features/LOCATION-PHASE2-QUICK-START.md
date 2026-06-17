# Location System Phase 2: Quick Start Guide

## Overview

Phase 2 adds business management features and community court creation to the Location System. Users can now create and manage their own locations, and create community courts for shared sports spaces.

## Feature Access

### For Business Users

1. **Dashboard** → `/business/locations`
   - View all locations you own
   - See stats (today's bookings, active players, total bookings)
   - Quick action buttons (Edit, Manage Bookings, View Public)

2. **Create Location** → `/business/locations/add`
   - 6-step form to add a new location
   - Set sports, amenities, hours, pricing
   - Auto-creates chat room for Community type

3. **Edit Location** → `/business/locations/[id]/edit`
   - Same 6-step form with pre-populated data
   - Update all location details
   - Owners only

### For All Users

1. **Create Community Court** → `/locations/create-community`
   - Simple 4-field form
   - Auto-creates Community-type location
   - Auto-creates chat room with you as moderator
   - Community can vote on moderators after 10+ members join

---

## Step-by-Step Usage

### Adding a Business Location

1. Navigate to `/business/locations`
2. Click **"Add Location"** button
3. Fill out 6-step form:
   - **Step 1:** Name, sports, type, description
   - **Step 2:** Address, capacity
   - **Step 3:** Select amenities
   - **Step 4:** Operating hours
   - **Step 5:** Pricing (optional)
   - **Step 6:** Review and create

**Tips:**
- All "required fields" marked with *
- Sports: Multi-select (Ctrl/Cmd+Click)
- Hours format: `08:00-22:00` (24-hour)
- Each step validates before allowing next

### Editing a Location

1. Dashboard → Click **"Edit"** on location card
2. Modify any details (except type)
3. Click **"Save Changes"** on final step
4. Redirects to dashboard

**Note:** Location type cannot be changed after creation

### Creating a Community Court

1. Navigate to `/locations/create-community`
2. Fill simple form:
   - Court name (e.g., "Central Park Basketball")
   - Address
   - Select sports (multi-select)
   - Description (optional)
3. Click **"Create Community Court"**
4. Redirects to location detail page

**What happens automatically:**
- Location created with Community type
- Private chat room created
- You added as moderator
- Ready for other users to discover and join

---

## From Home Page

### For Players
- **Home** → Look for **"Locations"** card in Quick Actions
- **Home** → Look for **"Create Community"** card

### For Business
- **Home** → Look for **"My Locations"** card in Management Cards
- Click to go to business dashboard

---

## Routing Map

```
/
├── /business/locations
│   ├── /add (Create new location - 6 steps)
│   └── /[id]/edit (Edit location - 6 steps)
├── /locations
│   ├── / (Discovery list with filters)
│   ├── /[id] (Detail page with 5 tabs)
│   └── /create-community (Create community court - 4 fields)
└── /home (Dashboard navigation)
```

---

## Form Specifications

### Add Location Form (6 Steps)

**Step 1: Basic Information**
- Location Name (required)
- Location Type (Business/Community/Private)
- Sports (multi-select, required)
- Description (optional)

**Step 2: Address**
- Address (required)
- Capacity (number, required)

**Step 3: Amenities**
- Checkboxes: Parking, Showers, Changing Rooms, Restrooms, Seating, Lighting, Snacks, WiFi, Scoreboard
- All optional

**Step 4: Hours**
- Format: `HH:MM-HH:MM` (e.g., `08:00-22:00`)
- 24-hour format required

**Step 5: Pricing**
- Price per hour (optional, future use)

**Step 6: Review**
- Summary of all entries
- Confirm and create

### Community Court Form (4 Fields)

- Court Name (required)
- Address (required)
- Sports (multi-select, required)
- Description (optional)

---

## Business Rules

### Location Creation
- Only Business accounts can create Business-type locations
- Any authenticated user can create Community-type locations
- Locations auto-verified when created by owner

### Community Courts
- Automatically create a private chat room
- Creator becomes initial moderator
- When 10+ members join, community votes on moderators
- Other members can check-in and join chat

### Check-ins
- 2-hour duration per check-in
- Auto-cleanup after expiry
- Shows active players list on location detail

### Chat
- Persistent message storage (localStorage)
- Accessible from location detail page
- Community moderators can manage messages

---

## Navigation Integration

**Top Navigation (Business Account)**
- Athlee (logo) → home
- Dashboard
- Bookings
- Analytics
- Users
- My Profile (dropdown)

**Home Dashboard Cards (Business)**
- My Locations (new!)
- Bookings
- Analytics
- Settings

**Home Dashboard Cards (Player)**
- Activity Feed
- Messages
- Explore
- Locations (new!)
- Create Community (new!)

---

## Data Persistence

All data stored in localStorage with auto-sync:
- Locations and metadata
- Check-ins (2-hour expiry)
- Chat messages
- Bookings
- Events

Changes persist across browser refreshes.

---

## Troubleshooting

**Location form won't submit**
- Check all required fields (marked with *)
- Verify hours format: `08:00-22:00`
- Select at least one sport

**Can't find "My Locations"**
- Ensure logged in as Business account
- Check home page dashboard

**Can't edit location**
- Must be the location owner
- Go to `/business/locations` dashboard

**Chat room not created**
- Verify location type is Community
- Check browser console for errors
- Refresh page and try again

---

## Examples

### Business Creating Indoor Basketball Arena

1. → `/business/locations/add`
2. Step 1: Name "Downtown Basketball Arena", Type "Business", Sports: Basketball
3. Step 2: Address "123 Main St, NYC", Capacity 500
4. Step 3: Select Parking, Showers, Restrooms, Lighting, Scoreboard
5. Step 4: Hours 08:00-22:00
6. Step 5: Price 25 per hour
7. Step 6: Confirm → Creates location

### Player Creating Community Soccer Court

1. → `/locations/create-community`
2. Name "Riverside Soccer Community"
3. Address "Central Park West, NYC"
4. Sports: Soccer
5. Description "Casual pick-up games, all skill levels"
6. Submit → Creates location with chat room

---

## Feature Flags & Limits

- Max 50 amenities per location (current: 9)
- Max 100 capacity per location (currently unlimited)
- Chat message history stored in browser (localStorage limit ~5MB)
- Pricing feature: placeholder only (future payment integration)

---

## Next Steps (Phase 3)

Planned features for future releases:
- Private location invite links
- Moderator election system
- Payment processing
- Advanced booking management
- Analytics dashboard
- Location verification documents
- Review/rating system

---

**Last Updated:** 2026-02-15  
**Status:** Phase 2 Complete ✅
