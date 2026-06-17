# Visual Guides - Quick Index

## 📚 Complete Visual Guide Library

A comprehensive collection of visual guides for all screens in the Athlee application, covering both mobile (React Native/Expo) and web (Next.js) platforms.

---

## 🔐 Authentication

### [Login Screen](./VISUAL_GUIDE-LOGIN.md)
- **Status:** ✅ Complete
- **Mobile:** Manual login + Mock user quick access
- **Web:** Form-based login with user cards
- **Features:** Username validation, loading states, mock profiles
- **Key Components:** TextInput, Button, UserCard, Divider
- **Last Updated:** Feb 15, 2026

### [Registration Flow](./VISUAL_GUIDE-REGISTRATION.md)
- **Status:** ✅ Complete
- **Mobile:** Multi-step form for Player and Business
- **Web:** Not yet added (in progress)
- **Features:** SelectField components, form validation, account type selection
- **Key Components:** TextInput, SelectField, DatePicker, Toggle
- **Last Updated:** Initial

---

## 🏠 Home & Navigation

### [Feed Screen](./VISUAL_GUIDE-FEED.md)
- **Status:** ✅ Complete
- **Mobile:** Stacked quick action cards
- **Web:** 3-column grid layout
- **Features:** Locations (active), Matches (coming soon), Communities (coming soon)
- **Key Components:** ActionCard, Divider, Placeholder
- **Last Updated:** Feb 15, 2026

---

## 👤 User Profile

### [Profile Screen](./VISUAL_GUIDE-PROFILE.md)
- **Status:** ✅ Complete
- **Mobile:** Player + Business variants
- **Web:** Desktop profile pages
- **Features:** 
  - Player: Stats, privacy settings, bio, location
  - Business: Locations management, location cards
- **Key Components:** Avatar, Stats, ToggleSwitch, LocationCard, UserHeader
- **Last Updated:** Feb 15, 2026

### [Profile Edit Screen](./VISUAL_GUIDE-PROFILE-EDIT.md)
- **Status:** 🔄 In Progress
- **Mobile:** Edit form for player details
- **Web:** Edit page for profile information
- **Features:** Input fields, select dropdowns, form validation
- **Key Components:** TextInput, SelectField, FormButton
- **Last Updated:** Not started

---

## 📍 Locations & Venues

### [Locations Explorer](./VISUAL_GUIDE-LOCATIONS-EXPLORER.md)
- **Status:** 🔄 In Progress
- **Mobile:** Searchable location list with filters
- **Web:** Grid view with advanced filters
- **Features:** Search, sport filter, city filter, location type filter
- **Key Components:** SearchBar, FilterDropdown, LocationCard, Grid
- **Last Updated:** Not started

### [Location Detail](./VISUAL_GUIDE-LOCATIONS-DETAIL.md)
- **Status:** 🔄 In Progress
- **Mobile:** Detailed location information screen
- **Web:** Location detail page
- **Features:** Amenities, regular players, statistics, map
- **Key Components:** LocationHeader, AmenitiesList, RegularPlayerRow, StatCard
- **Last Updated:** Not started

### [Business Locations Manager](./VISUAL_GUIDE-BUSINESS-LOCATIONS.md)
- **Status:** 🔄 In Progress
- **Mobile:** Business profile locations tab
- **Web:** Locations management section
- **Features:** Add/edit location forms, owned locations list
- **Key Components:** LocationForm, LocationCard, ActionButton
- **Last Updated:** Not started

---

## 🔄 Coming Soon

### Core Features
- [ ] Explore Screen
- [ ] Messages Screen
- [ ] Matches Creation & Management
- [ ] Communities
- [ ] Leaderboards

### Supporting Documentation
- [ ] Component Library
- [ ] Navigation Patterns
- [ ] Color & Typography System
- [ ] Responsive Design Patterns
- [ ] Animation & Micro-interactions

---

## 📊 Statistics

| Category | Total | Completed | In Progress |
|----------|-------|-----------|-------------|
| Authentication | 2 | 2 | 0 |
| Core Navigation | 1 | 1 | 0 |
| Profile | 3 | 1 | 2 |
| Locations | 3 | 0 | 3 |
| **Total** | **9** | **4** | **5** |

---

## 🎨 Design System

### Colors
- **Primary:** Blue-600 (#2563EB)
- **Secondary:** Purple
- **Accent:** Green
- **Background Light:** Gray-50 (#F9FAFB)
- **Background Dark:** Gray-900 (#111827)
- **Text:** Gray-900 / White
- **Error:** Red-600
- **Success:** Green-600

### Typography
- **Display:** 24pt+ (titles)
- **Heading:** 18pt (section titles)
- **Body:** 16pt (main text)
- **Label:** 14pt (secondary text)
- **Small:** 12pt (help text)

### Spacing
- **Base unit:** 4px
- **Common multiples:** 4, 8, 12, 16, 20, 24, 32, 40, 48px

### Touch Targets
- **Minimum:** 44px (recommended)
- **Optimal:** 48px
- **Desktop hover area:** 40px

---

## 📱 Platform Specifics

### Mobile (React Native + Expo Router)
- SafeAreaView for notch/status bar
- KeyboardAvoidingView for inputs
- Platform-specific styling (iOS vs Android)
- Touch-friendly spacing
- Bottom tab navigation

### Web (Next.js + Tailwind CSS)
- Semantic HTML
- CSS-in-JS or Tailwind classes
- Dark mode support
- Keyboard navigation
- Responsive breakpoints (mobile-first)
- Open Graph tags for sharing

---

## 🚀 How to Use These Guides

### For Designers
1. Review the visual guide for your screen
2. Check the ASCII art representations
3. Verify color scheme and typography
4. Note responsive breakpoints
5. Review component hierarchy

### For Developers
1. Read the component details section
2. Check the data flow diagram
3. Review interactions table
4. Test all states (loading, error, empty)
5. Verify accessibility features
6. Cross-reference with code files

### For Product Managers
1. Overview section describes screen purpose
2. Navigation paths show user flows
3. Key interactions table shows expected behavior
4. Future enhancements list planned features

---

## ✅ Quality Checklist

Each guide includes:
- [x] Overview describing screen purpose
- [x] Mobile UI ASCII art with labeled elements
- [x] Web UI ASCII art with labeled elements
- [x] Component details describing all interactive elements
- [x] Key interactions table for both mobile and web
- [x] Data flow diagram showing data movement
- [x] Account type variations (where applicable)
- [x] States (loading, error, empty, disabled)
- [x] Color scheme with dark mode variants
- [x] Responsive design information
- [x] Navigation paths and flows
- [x] Accessibility features
- [x] Future enhancements list
- [x] Testing checklist

---

## 📝 Contributing

When adding new visual guides:

1. **Create new file:** `VISUAL_GUIDE-[FEATURE].md`
2. **Follow template:** Use existing guides as reference
3. **Include all sections:** Overview, mobile, web, interactions, etc.
4. **Test thoroughly:** Verify on actual devices/browsers
5. **Update this index:** Add link and description
6. **Update PLANNING.md:** Mark as completed
7. **Add testing checklist:** Enable QA validation

---

## 🔗 Related Documentation

- **PLANNING.md** - Project tracking and progress
- **Code Files:**
  - `/apps/mobile/app/(tabs)/` - Mobile screens
  - `/apps/web/src/app/` - Web pages
  - `/packages/shared/` - Shared types and utilities

---

## 📞 Questions?

Refer to:
- **How do I see the exact layout?** → Check the ASCII art diagrams
- **What colors should I use?** → See Color Scheme sections
- **Which components are needed?** → Check Component Details
- **How does navigation work?** → Review Navigation Paths
- **What about mobile/web differences?** → Compare both sections
- **Is this feature released?** → Check Status indicator

---

## 🎯 Project Goals

These visual guides serve to:
1. ✅ Provide clear reference for all screens
2. ✅ Ensure consistency across mobile and web
3. ✅ Document design decisions and rationale
4. ✅ Enable efficient handoff between team members
5. ✅ Facilitate quick onboarding of new developers
6. ✅ Maintain design system coherence
7. ✅ Support quality assurance testing

---

**Last Updated:** Feb 15, 2026  
**Guides Status:** 4 Complete | 5 In Progress | 3 Planned  
**Coverage:** 57% of core features documented
