# 🚀 Quick Reference Card

## Access Points

| Feature | URL | Purpose |
|---------|-----|---------|
| Landing | `http://localhost:3000` | Home page with role-based UI |
| Login | `http://localhost:3000/login` | Email-based login |
| Register | `http://localhost:3000/register` | Multi-step registration |
| **Dev Admin** | **`http://localhost:3000/dev/admin`** | **View/edit all mock data** |

---

## Mock User Test Accounts

### Players
- **player@example.com** / alex_player - Football player
- **sarah@example.com** / sarah_tennis - Tennis player

### Businesses
- **business@example.com** / academy_sports - Elite Sports Academy
- **venue@example.com** / central_sports_venue - Sports Venue

### Test Login
Just enter any email above (no password required - demo mode)

---

## Files You Can Edit

| File | Purpose | Edit? |
|------|---------|-------|
| `/apps/web/src/lib/authService.ts` | Authentication logic | ✅ Yes (main auth) |
| `/apps/web/src/contexts/AuthContext.tsx` | Global auth state | ✅ Yes (state mgmt) |
| `/apps/web/src/app/page.tsx` | Home page UI | ✅ Yes (role-based content) |
| `/apps/web/src/components/DatePicker.tsx` | Calendar picker | ✅ Yes (reusable) |
| localStorage | Mock database | ✅ Yes (via dev/admin) |

---

## Key Components

```
src/
├── app/
│   ├── page.tsx           ← Home page (role-based)
│   ├── login/page.tsx     ← Email login
│   ├── register/page.tsx  ← Registration (multi-step)
│   └── dev/admin/page.tsx ← Mock data manager ⭐
├── components/
│   └── DatePicker.tsx     ← Calendar UI ⭐
├── contexts/
│   └── AuthContext.tsx    ← Global auth state
├── hooks/
│   └── useAuth.ts         ← Auth hook
└── lib/
    ├── authService.ts     ← Auth logic ⭐
    ├── auth-types.ts      ← Types
    └── mockDatabase.ts    ← Mock data
```

⭐ = New/Updated

---

## Build & Run

```bash
# Install dependencies
npm install

# Development
npm run dev
# Visit http://localhost:3000

# Production build
npm run build

# Start production
npm start

# Type checking
npm run type-check
```

---

## Common Tasks

### View All Mock Users
```
1. Go to http://localhost:3000/dev/admin
2. Click "👥 Users" tab
3. See all 5 pre-populated accounts
```

### Edit a User
```
1. Dev Admin → Users tab
2. Click "Edit" on any user
3. Modify fields
4. Click "Save"
```

### Create New User
```
1. Dev Admin → Users tab
2. Click "+ Add User"
3. Fill in fields
4. Save
```

### View Magic Link Tokens
```
1. Dev Admin → "🔗 Magic Links" tab
2. See all email-to-token mappings
3. Copy token for testing
```

### View Raw Data
```
1. Dev Admin → "💾 Storage" tab
2. See complete localStorage JSON
3. Copy for backup
```

---

## Magic Link Status

| Feature | Status | Notes |
|---------|--------|-------|
| Token generation | ✅ Ready | Implemented in authService |
| Token storage | ✅ Ready | Stored in localStorage |
| Token display | ✅ Ready | Visible in dev/admin |
| Email sending | ⏳ TODO | Needs email service integration |
| UI integration | ⏳ TODO | Login form needs magic link UI |

---

## Authentication States

```
┌─ Not Logged In ─────────────────┐
│ Shows landing page with signup  │
└────────────────────────────────┘
           ↓ (login/register)
┌─ Logged In: Player ─────────────┐
│ Player dashboard                │
│ - Feed                          │
│ - Messages                      │
│ - Explore                       │
│ - Profile                       │
└────────────────────────────────┘

┌─ Logged In: Business ───────────┐
│ Business dashboard              │
│ - Bookings                      │
│ - Analytics                     │
│ - Settings                      │
└────────────────────────────────┘

┌─ Logged In: Visitor ────────────┐
│ Visitor mode                    │
│ - Explore                       │
│ - Limited access                │
└────────────────────────────────┘
```

---

## Data Storage (localStorage Keys)

```javascript
// All users
localStorage.getItem('athlee_users')

// Currently logged in user
localStorage.getItem('athlee_current_user')

// Auth token
localStorage.getItem('athlee_auth_token')

// Mock database marker
localStorage.getItem('athlee_mock_database')
```

---

## Next: Magic Link Integration

To enable magic link flow:

1. **Update login form** to show token input
2. **Add token verification UI** for email confirmation
3. **Integrate sendMagicLink()** method
4. **Integrate verifyMagicLink()** method
5. **Add email service** (SendGrid, Mailgun, etc.)

All backend logic is ready - just needs UI integration!

---

## Production Checklist

- [ ] Replace localStorage with backend database
- [ ] Implement real email service for magic links
- [ ] Remove /dev/admin route
- [ ] Add password hashing (if using passwords)
- [ ] Add rate limiting
- [ ] Add logging/monitoring
- [ ] Security audit
- [ ] Performance testing
- [ ] Mobile testing
- [ ] Deploy to production

---

**Last Updated:** February 23, 2026
**Status:** ✅ Development Ready
**Build:** Passing (0 errors)
