# 🛠️ Development Guide

## Accessing Mock User Data

### Option 1: Dev Admin Panel (Recommended)
Visit: **http://localhost:3000/dev/admin**

Features:
- 👥 View all mock users
- 🔗 View magic link tokens
- 💾 View raw localStorage data
- ✏️ Edit user data directly
- 🗑️ Delete users
- ➕ Create new users

### Option 2: Browser Console
```javascript
// View all mock data
const db = JSON.parse(localStorage.getItem('athlee_mock_database'));
console.log(db.users);      // View all users
console.log(db.magicLinks); // View magic link tokens

// Add a new user
const db = JSON.parse(localStorage.getItem('athlee_mock_database'));
db.users.push({
  id: 'custom_user_1',
  email: 'custom@example.com',
  accountType: 'Player',
  // ... more fields
});
localStorage.setItem('athlee_mock_database', JSON.stringify(db));
```

### Option 3: Direct Editing
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Find key: `athlee_mock_database`
4. Edit JSON directly

---

## Mock User Accounts (Pre-populated)

### Players:
| Email | Username | Sport | Country |
|-------|----------|-------|---------|
| player@example.com | alex_player | Football | United States |
| sarah@example.com | sarah_tennis | Tennis | Canada |

### Businesses:
| Email | Business | Type | Country |
|-------|----------|------|---------|
| business@example.com | Elite Sports Academy | Academy | United States |
| venue@example.com | Central Sports Venue | Venue | United Kingdom |

### Visitor:
| Email | Type |
|-------|------|
| visitor_session_001@example.com | Visitor |

---

## Authentication Flows

### Magic Link Flow
1. User enters email at `/login`
2. App generates magic link token
3. Token stored in `db.magicLinks[email]`
4. User can click "Verify" or manually visit:
   ```
   /login?email=user@example.com&token=TOKEN_HERE
   ```
5. Token validated and user logged in

### Registration Flow
1. User selects account type (Player/Business)
2. Fills in form with email, username, profile data
3. Validation checks for email/username uniqueness
4. User created in database
5. Auto-logged in with session token

---

## Key Files

### Authentication System
- `/packages/shared/src/auth/authService.ts` - Main auth logic
- `/packages/shared/src/auth/mockDatabase.ts` - Mock data storage
- `/packages/shared/src/auth/types.ts` - Type definitions

### Web App
- `/apps/web/src/contexts/AuthContext.tsx` - Global auth state
- `/apps/web/src/hooks/useAuth.ts` - Auth hook
- `/apps/web/src/app/dev/admin/page.tsx` - Admin panel
- `/apps/web/src/components/DatePicker.tsx` - Calendar UI

---

## Data Storage

All mock data stored in **localStorage** under key: `athlee_mock_database`

Structure:
```json
{
  "users": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "accountType": "Player",
      "createdAt": "2026-02-23T...",
      // ...more fields
    }
  ],
  "magicLinks": {
    "user@example.com": {
      "token": "base64token",
      "expiresAt": "2026-02-23T...",
      "createdAt": "2026-02-23T..."
    }
  },
  "lastUpdated": "2026-02-23T..."
}
```

---

## Testing Workflows

### Test Player Registration
1. Go to `/register`
2. Select "Player"
3. Fill in form with:
   - Email: `newplayer@test.com`
   - Username: `testplayer123`
   - Name: Any name
   - DOB: Pick using calendar widget
   - Sport: Any sport
4. Submit → Logged in automatically

### Test Magic Link
1. Go to `/login`
2. Enter: `player@example.com`
3. Copy token from dev console or `/dev/admin`
4. Paste in prompt or visit:
   ```
   /login?email=player@example.com&token=TOKEN
   ```
5. Should be logged in

### Test Business Account
1. Go to `/register`
2. Select "Business"
3. Fill in business form
4. Submit → Logged in as business

---

## Important Notes

- ⚠️ `/dev/admin` only exists in dev mode
- 💾 All data is localStorage only (no backend)
- 🔓 No password system - uses magic links
- 🧪 Mock data resets if localStorage is cleared
- 📱 Mobile friendly - all components responsive

---

## Next Steps for Production

Replace `/packages/shared/src/auth/mockDatabase.ts` with:
- [ ] Backend API calls
- [ ] Real database (PostgreSQL, MongoDB, etc.)
- [ ] Email service for magic links
- [ ] Password hashing (bcrypt)
- [ ] JWT token management on backend
- [ ] Rate limiting and security headers
