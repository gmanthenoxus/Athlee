# Quick Start Guide - Fresh Web App

## ⚡ Start Development in 30 Seconds

### 1. Start the Dev Server
```bash
cd apps/web
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Test the Authentication

### Try Registration

**As a Player:**
1. Go to [http://localhost:3000/register](http://localhost:3000/register)
2. Click "Player"
3. Fill in the form:
   - Email: `john@example.com`
   - Username: `johndoe`
   - First Name: `John`
   - Last Name: `Doe`
   - DOB: `1995-05-15`
   - Country: `US`
   - Sport: `Basketball`
4. Accept terms
5. Click "Create Account"

**As a Business:**
1. Go to [http://localhost:3000/register](http://localhost:3000/register)
2. Click "Business"
3. Fill in the form:
   - Email: `admin@venue.com`
   - Username: `myvenue`
   - Business Name: `Elite Sports Arena`
   - Type: `Venue`
   - Country: `US`
   - Region: `New York`
   - Admin Name: `Jane Smith`
4. Accept terms
5. Click "Create Account"

### Try Login

1. After registering, click "Sign in" or go to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter the email you registered with
3. Click "Sign in"
4. You'll be redirected to home page
5. Click "Logout" in top right

---

## 📁 Key Files to Review

### Authentication
```
src/lib/authService.ts       # Core auth logic
src/lib/auth-types.ts        # TypeScript types
```

### UI Components
```
src/contexts/AuthContext.tsx           # State management
src/hooks/useAuth.ts                   # Custom hook
src/components/ProtectedRoute.tsx      # Route protection
```

### Pages
```
src/app/page.tsx             # Home page
src/app/login/page.tsx       # Login form
src/app/register/page.tsx    # Registration form
```

---

## 🎯 Common Tasks

### Add a Protected Page

```typescript
// src/app/dashboard/page.tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.email}!</p>
      </div>
    </ProtectedRoute>
  );
}
```

### Check User Type

```typescript
const { user, isPlayer, isBusiness } = useAuth();

if (isPlayer()) {
  // Show player features
}

if (isBusiness()) {
  // Show business features
}
```

### Use Auth in Component

```typescript
'use client';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🔧 Make Changes

### Update Auth Service
Edit `src/lib/authService.ts` - handles login, registration, etc.

### Update Auth Context
Edit `src/contexts/AuthContext.tsx` - manages global state

### Update Forms
Edit `src/app/login/page.tsx` or `src/app/register/page.tsx`

### Add New Pages
Create `src/app/[route]/page.tsx` following the same pattern

---

## 🧪 Run Tests

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

---

## 📱 Browser DevTools

### Check localStorage
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for keys:
   - `athlee_users` - All registered users
   - `athlee_current_user` - Currently logged in user
   - `athlee_auth_token` - Auth token

### Console Logs
All auth operations log to console - watch for:
- "User logged in successfully"
- "Player registered successfully"
- "Login failed"
- etc.

---

## 📚 Code Review Checklist

- ✅ All functions have comments
- ✅ Error handling is comprehensive
- ✅ Form validation is thorough
- ✅ TypeScript types are strict
- ✅ No `any` types used
- ✅ Components are reusable
- ✅ State management is clear
- ✅ Build is successful

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti :3000 | xargs kill -9
```

### Clear Cache
```bash
# Remove .next folder
rm -rf .next

# Reinstall dependencies
npm install

# Start again
npm run dev
```

### TypeScript Errors
```bash
npm run type-check
```

---

## 🚀 Next: Connect to Backend

Currently using localStorage. To connect to backend:

1. Update `authService.ts` to call API instead
2. Replace `localStorage` with `sessionStorage`
3. Implement proper JWT token handling
4. Add password field to login
5. Add email verification

---

## 📞 Support

All code has extensive comments for questions about:
- How authentication works
- How state management flows
- How forms validate
- How routes are protected
- How to extend features

---

**Happy coding! 🎉**
