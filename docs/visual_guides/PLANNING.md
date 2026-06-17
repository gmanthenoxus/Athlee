# Visual Guides - Planning & Progress Tracker

## Project Overview
Creating comprehensive visual guides for all screens in Athlee (both mobile and web platforms). These guides document the UI/UX, interactions, data flows, and design patterns.

---

## Progress Tracker

### Phase 1: Authentication ✅
- [x] **VISUAL_GUIDE-REGISTRATION.md** - Registration flow (Player & Business)
- [x] **VISUAL_GUIDE-LOGIN.md** - Login screen (completed)

### Phase 2: Core Navigation & Feed (IN PROGRESS)
- [x] **VISUAL_GUIDE-FEED.md** - Feed screen with quick actions (completed)
  
- [x] **VISUAL_GUIDE-PROFILE.md** - Profile screens for players and business (completed)
  - Mobile: Profile screen with privacy settings + business locations tab
  - Web: Profile page with stats, followers, following
  - Business variant: Locations management section
  - Status: ✅ Completed
  
- [ ] **VISUAL_GUIDE-PROFILE-EDIT.md**
  - Mobile: Profile edit form
  - Web: Profile edit page
  - Status: Ready to document

### Phase 3: Locations Feature (IN PROGRESS)
- [ ] **VISUAL_GUIDE-LOCATIONS-EXPLORER.md**
  - Mobile: Locations tab with search & filter
  - Web: Locations page with grid view
  - Features: Search, sport filter, city filter, location type filter
  - Status: Ready to document
  
- [ ] **VISUAL_GUIDE-LOCATIONS-DETAIL.md**
  - Mobile: Location detail screen
  - Web: Location detail page
  - Features: Amenities, regulars, stats
  - Status: Ready to document

- [ ] **VISUAL_GUIDE-BUSINESS-LOCATIONS.md**
  - Business profile locations tab
  - Add/Edit location forms
  - Status: Ready to document

### Phase 4: Explore & Discovery (PLANNED)
- [ ] **VISUAL_GUIDE-EXPLORE.md**
  - Mobile: Explore screen
  - Web: Explore page
  
### Phase 5: Messages & Communication (PLANNED)
- [ ] **VISUAL_GUIDE-MESSAGES.md**
  - Mobile: Messages tab
  - Web: Messages section

### Phase 6: Additional Features (PLANNED)
- [ ] **VISUAL_GUIDE-MATCHES.md** - Match creation/detail
- [ ] **VISUAL_GUIDE-COMMUNITIES.md** - Community pages
- [ ] **VISUAL_GUIDE-NAVIGATION.md** - Global navigation patterns
- [ ] **VISUAL_GUIDE-COMPONENTS.md** - Reusable components library

---

## Documentation Standards

### Each Guide Should Include:
1. **Overview** - What the screen is and its purpose
2. **Mobile UI ASCII Art** - Visual representation with labeled elements
3. **Web UI ASCII Art** - Visual representation with labeled elements
4. **Component Details** - Description of interactive elements
5. **Key Interactions** - Table of user actions and responses
6. **Data Flow** - Diagram showing data movement
7. **Account Variations** - Different views for Player/Business
8. **States** - Loading, error, empty, disabled states
9. **Color Scheme** - Colors used and dark mode variants
10. **Responsive Design** - Breakpoints and adaptations
11. **Navigation Paths** - How to reach and leave the screen
12. **Future Enhancements** - Planned improvements

### ASCII Art Conventions:
- Use box drawing characters: ┌─┐│└┘
- Show actual UI elements: buttons, inputs, cards
- Include labels and annotations
- Keep readable at normal text size
- Indicate interactive elements with brackets: [Button]
- Show optional elements with parentheses
- Indicate scrollable areas with arrows or indicators

### Color Documentation:
- Show hex codes
- Include dark mode variants
- Document hover/active states
- Note accessibility considerations

---

## Completed Documents

### 1. VISUAL_GUIDE-REGISTRATION.md
- Player Details screen with multiple input types
- Business Details screen with form validation
- SelectField components (Country, Gender, Sport, Business Type)
- Multi-step form flow

### 2. VISUAL_GUIDE-LOGIN.md ✅
- Manual login with text input
- Mock user quick login
- Both Player and Business account examples
- Loading and error states
- Mobile-optimized keyboard handling
- Web accessibility features

### 3. VISUAL_GUIDE-FEED.md ✅
- Mobile: Feed screen with quick action cards
- Web: Feed page with 3-column grid layout
- Explore Locations (active) + Matches & Communities (coming soon)
- Loading, error, and empty states
- Responsive design

### 4. VISUAL_GUIDE-PROFILE.md ✅
- Mobile: Player profile with privacy settings + Business profile with locations
- Web: Profile page for both account types
- Followers/Following stats
- Avatar with initials and gradient
- Business location management section
- Edit profile navigation

---

## Next Up: Profile Edit Screen

### Profile Edit Screen Scope:
**Mobile View:**
- Input fields for player info (First Name, Last Name, Bio, Location, etc.)
- Dropdown selectors for Sport, Gender, Country
- Save and Cancel buttons
- Form validation

**Web View:**
- Similar layout to mobile
- Desktop-optimized form layout
- Responsive inputs
- Clear form controls

**Key Elements:**
- Text inputs
- Dropdown selects
- Toggle switches
- Save/Cancel buttons
- Form validation messages
- Error handling

---

## Related Files & Contexts

### Mobile Screens:
- `/apps/mobile/app/(tabs)/feed.tsx`
- `/apps/mobile/app/(tabs)/profile/index.tsx`
- `/apps/mobile/app/(tabs)/profile/edit.tsx`
- `/apps/mobile/app/(tabs)/locations/index.tsx`
- `/apps/mobile/app/(tabs)/locations/[id].tsx`
- `/apps/mobile/app/login.tsx`
- `/apps/mobile/app/register.tsx`

### Web Screens:
- `/apps/web/src/app/feed/page.tsx`
- `/apps/web/src/app/profile/page.tsx`
- `/apps/web/src/app/profile/edit/page.tsx`
- `/apps/web/src/app/locations/page.tsx`
- `/apps/web/src/app/locations/[id]/page.tsx`
- `/apps/web/src/app/login/page.tsx`
- `/apps/web/src/app/register/page.tsx`

---

## Team Notes

### Common Patterns Across Screens:
1. **Dark Mode Support** - All screens support dark mode
2. **Responsive Design** - Mobile-first, scales to desktop
3. **Loading States** - Spinners and disabled states
4. **Error Handling** - Error messages with helpful text
5. **Navigation** - Consistent navigation patterns
6. **Account Types** - Different layouts for Player/Business

### Component Library Used:
- React Native (Mobile)
- React & Tailwind CSS (Web)
- Custom components library (@athlehub/shared)
- Expo Router (Mobile navigation)
- Next.js (Web routing)

### Design System:
- Primary Color: Blue
- Secondary: Purple
- Accent: Green
- Background: Gray-50 (Light), Gray-900 (Dark)
- Focus: Blue ring with 2px width

---

## Collaboration Guidelines

When adding new screens:
1. Follow the documentation standards above
2. Test both mobile and web implementations
3. Verify all interactive states
4. Document dark mode support
5. Include accessibility notes
6. Add to this tracker
7. Link to relevant code files

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 15, 2026 | Initial tracker + Login guide |
| 1.1 | Feb 15, 2026 | Added Feed, Profile guides + progress update |
| TBD | TBD | Profile Edit guide |
| TBD | TBD | Locations Explorer guide |
| TBD | TBD | Locations Detail guide |

