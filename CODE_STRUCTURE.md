# Code Structure & Architecture Guide

## 📐 Application Architecture

```
┌─────────────────────────────────────────┐
│         Next.js Application             │
│  (pages, components, routing)           │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  AuthProvider   │
        │ (React Context) │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
  Pages      Components    Hooks
┌──────┐  ┌────────────┐  ┌──────────┐
│login │  │Protected   │  │useAuth   │
│      │  │Route       │  │          │
│regis │  │            │  │queries   │
│ter   │  │            │  │state     │
└──────┘  └────────────┘  └──────────┘
    │            │            │
    └────────────┼────────────┘
                 │
        ┌────────▼────────┐
        │  AuthContext    │
        │  (State + Fns)  │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  AuthService    │
        │ (Business Logic)│
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  localStorage   │
        │  (Data Storage) │
        └─────────────────┘
```

---

## 🔄 Authentication Flow

### Registration Flow

```
User fills form
     │
     ▼
Submit → Validation
     │
     ├─ Email unique? ✓
     ├─ Username unique? ✓
     ├─ Age > 13? ✓
     │
     ▼
registerPlayer() or registerBusiness()
     │
     ▼
Create User object + ID
     │
     ▼
Save to localStorage
     │
     ▼
Set as currentUser
     │
     ▼
Generate auth token
     │
     ▼
Update context state
     │
     ▼
Redirect to home
```

### Login Flow

```
User enters email
     │
     ▼
Submit → Validation
     │
     ├─ Valid email format? ✓
     │
     ▼
login(email)
     │
     ▼
Find user by email
     │
     ├─ User found? ✓
     │
     ▼
Generate auth token
     │
     ▼
Save token to localStorage
     │
     ▼
Set as currentUser
     │
     ▼
Update context state
     │
     ▼
Redirect to home
```

### Session Restoration

```
Page loads
     │
     ▼
useEffect in AuthProvider
     │
     ▼
Check localStorage for token
     │
     ├─ Token exists? ✓
     ├─ Token valid? ✓
     │
     ▼
Restore user session
     │
     ▼
Set isLoading = false
     │
     ▼
Components render with user state
```

---

## 📦 Core Files Explained

### 1. **Auth Types** (`src/lib/auth-types.ts`)

**Purpose:** Define all TypeScript interfaces and types

**Key Exports:**
```typescript
// Enums
AccountType        // Player | Business | Visitor
Gender             // Male | Female | Non-binary | Prefer not to say
BusinessType       // Venue | Academy | Club | Brand

// Interfaces
User               // PlayerUser | BusinessUser | VisitorUser
PlayerUser         // Full player profile
BusinessUser       // Full business profile
VisitorUser        // Session-only user
PlayerRegistrationData
BusinessRegistrationData

// Context
AuthContextValue   // Everything useAuth returns
```

**Why:** Centralized type definitions prevent duplication and ensure consistency

---

### 2. **Auth Service** (`src/lib/authService.ts`)

**Purpose:** Encapsulate all authentication business logic

**Key Methods:**
```typescript
registerPlayer()    // Create player account
registerBusiness()  // Create business account
login()             // Authenticate user
logout()            // Clear session
createVisitor()     // Anonymous session
getCurrentUser()    // Get current user
isAuthenticated()   // Check token validity
validateEmail()     // Validate email format
validateUsername()  // Validate username format
emailExists()       // Check if email registered
usernameExists()    // Check if username taken
getUserById()       // Fetch user by ID
```

**Why:** Separates business logic from UI components

**Note:** Currently uses localStorage; in production, call backend API

---

### 3. **Auth Context** (`src/contexts/AuthContext.tsx`)

**Purpose:** Manage global authentication state using React Context

**Responsibilities:**
- Initialize auth on app load
- Provide auth state to all components
- Handle async auth operations
- Update UI based on auth state
- Manage loading states
- Handle errors

**State Variables:**
```typescript
user              // Current user or null
isLoading         // Loading during operations
isAuthenticated   // Derived from user state
magicLinkState    // For passwordless flow
```

**Key Methods:**
```typescript
registerPlayer()  // Call authService + update state
registerBusiness()
login()
logout()
sendMagicLink()   // Stub for future
verifyMagicLink() // Stub for future
createVisitor()

// Helper methods
isPlayer()        // Check account type
isBusiness()
isVisitor()
isRegular()       // Not a visitor
getAvailableTabs()    // Based on account type
canAccessFeature()    // Role-based access
```

**Why:** Centralized state management prevents prop drilling

---

### 4. **useAuth Hook** (`src/hooks/useAuth.ts`)

**Purpose:** Simplified access to AuthContext

**Usage:**
```typescript
const { user, isLoading, login, logout } = useAuth();
```

**Why:** Type-safe, clear error messages, simple API

---

### 5. **ProtectedRoute Component** (`src/components/ProtectedRoute.tsx`)

**Purpose:** Enforce authentication and authorization on pages

**Usage:**
```typescript
// Basic protection
<ProtectedRoute>
  <MyPage />
</ProtectedRoute>

// Role-based
<ProtectedRoute allowedAccountTypes={['Player']}>
  <PlayerOnly />
</ProtectedRoute>
```

**Flow:**
1. Check if loading
2. Check if authenticated
3. Check if account type allowed
4. Redirect or show content

**Why:** Reusable protection for any page

---

### 6. **Login Page** (`src/app/login/page.tsx`)

**Components:**
- Email input with validation
- Error alert display
- Success message
- Submit button with loading state
- Links to register and password recovery

**State:**
```typescript
email              // Input value
isLoading          // Submission state
error              // Error message
success            // Success message
```

**Flow:**
1. Validate email
2. Call login()
3. Show success
4. Redirect after delay

**Why:** Clear, focused component for single purpose

---

### 7. **Register Page** (`src/app/register/page.tsx`)

**Features:**
- Multi-step flow (type selection → form)
- Dynamic form based on account type
- Comprehensive validation
- Player & Business registration

**State:**
```typescript
step               // 'account-type' | 'form'
accountType        // Selected type
isLoading          // Submission state
globalError        // Form-level error
fieldErrors        // Field-specific errors
playerForm         // Player form data
businessForm       // Business form data
```

**Flow:**
1. Select account type
2. Fill appropriate form
3. Validate all fields
4. Submit to auth service
5. Show success
6. Redirect

**Why:** Multi-step form improves UX

---

### 8. **Home Page** (`src/app/page.tsx`)

**Purpose:** Landing page with navigation

**Shows:**
- Authenticated: Dashboard links
- Unauthenticated: Sign up CTA
- Features overview

**Why:** Entry point to application

---

### 9. **Root Layout** (`src/app/layout.tsx`)

**Purpose:** Wrap entire app with AuthProvider

```typescript
<html>
  <body>
    <AuthProvider>
      {children}
    </AuthProvider>
  </body>
</html>
```

**Why:** Makes auth context available everywhere

---

## 🔀 Data Flow Examples

### User Registration

```
User → Register Page
     → Fill Form (playerForm state)
     → Validate (validatePlayerForm)
     → Submit
     → registerPlayer() from useAuth
     → AuthContext calls registerPlayer()
     → registerPlayer() calls authService.registerPlayer()
     → authService creates user + token
     → Saves to localStorage
     → Returns PlayerUser
     → AuthContext updates user state
     → Components re-render
     → Redirect to home
```

### Accessing User Data

```
Component → useAuth()
        → Gets AuthContextValue
        → Accesses user property
        → Displays user data
        → On logout: user becomes null
        → Components re-render
```

### Protecting a Page

```
Page component
     → Wrapped in ProtectedRoute
     → useAuth inside
     → Check isAuthenticated
     → If false: redirect to /login
     → If true: show page
     → On logout: redirect happens
```

---

## 🧩 Component Dependencies

```
App Root
  └─ AuthProvider
       ├─ Home Page
       ├─ Login Page
       │   └─ useAuth
       ├─ Register Page
       │   └─ useAuth
       └─ Protected Page
            ├─ ProtectedRoute
            │   └─ useAuth
            └─ useAuth
```

---

## 🔐 Security Considerations

### Current Implementation (Demo)
- ✅ Client-side validation
- ✅ Email & username uniqueness
- ✅ Token generation
- ⚠️ localStorage for tokens (not production-safe)
- ⚠️ No password field

### For Production
- [ ] Password hashing (bcrypt)
- [ ] Secure httpOnly cookies
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Email verification
- [ ] 2FA support
- [ ] Audit logging
- [ ] Session timeout

---

## 🎯 Extension Points

### Add a New Auth Method

In `authService.ts`:
```typescript
async authenticateWithGoogle(googleToken: string): Promise<User> {
  // Verify token with Google
  // Find or create user
  // Return user + set session
}
```

In `AuthContext.tsx`:
```typescript
const authenticateWithGoogle = useCallback(async (token: string) => {
  setIsLoading(true);
  try {
    const user = await authService.authenticateWithGoogle(token);
    setUser(user);
  } finally {
    setIsLoading(false);
  }
}, []);
```

Then use in component:
```typescript
const { authenticateWithGoogle } = useAuth();
<button onClick={() => authenticateWithGoogle(googleToken)}>
  Sign in with Google
</button>
```

### Add Feature Authorization

In `auth-types.ts`:
```typescript
interface AuthContextValue {
  canAccessFeature(feature: string): boolean;
}
```

In `AuthContext.tsx`:
```typescript
const canAccessFeature = useCallback((feature: string): boolean => {
  // Check user type + permissions
  return user?.accountType === 'Player' && feature === 'messaging';
}, [user]);
```

In component:
```typescript
if (!canAccessFeature('messaging')) {
  return <UpgradePrompt />;
}
```

---

## 📊 Data Models

### PlayerUser
```
- id: string
- email: string
- username: string
- firstName: string
- lastName: string
- dateOfBirth: string
- age: number (calculated)
- isMinor: boolean (age < 18)
- country: string
- city?: string
- gender?: Gender
- primarySport: string
- accountType: 'Player'
- createdAt: string
- avatar?: string
- bio?: string
- locations?: string[]
```

### BusinessUser
```
- id: string
- email: string
- username: string
- businessName: string
- businessType: BusinessType
- country: string
- region: string
- adminName: string
- accountType: 'Business'
- createdAt: string
- avatar?: string
```

### VisitorUser
```
- id: string
- email: ''
- sessionId: string
- accountType: 'Visitor'
- createdAt: string
```

---

## 🔄 State Management Pattern

### Context + Service Pattern

```
Component
    ↓
useAuth() → AuthContext
    ↓
authService.method()
    ↓
Business Logic
    ↓
localStorage
    ↓
Return Result
    ↓
Update Context State
    ↓
Component Re-renders
```

**Benefits:**
- Clear separation of concerns
- Testable business logic
- Reusable service
- Scalable architecture
- Easy to replace service with API

---

## 🚀 Ready to Extend!

This architecture makes it easy to:
- Add new auth methods
- Implement new features
- Scale to teams
- Add backend API
- Implement caching
- Add analytics
- Extend user permissions

All code is well-documented for developers joining the team.
