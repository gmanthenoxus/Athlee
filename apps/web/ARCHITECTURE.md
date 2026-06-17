# Athlee Web Application

Next.js web application for Athlee - a social platform for athletes and sports professionals.

## Architecture

### Authentication Flow

```
User → Register/Login Page
  ↓
AuthService (Register/Login)
  ↓
AuthContext (State Management)
  ↓
Protected Pages (useAuth Hook)
```

### Key Components

- **AuthService**: Handles registration, login, logout, token management
- **AuthContext**: Provides global auth state and methods via React Context
- **useAuth Hook**: Custom hook to access auth context
- **ProtectedRoute**: HOC to guard pages from unauthorized access

### File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── register/
│       └── page.tsx        # Registration page
├── components/
│   └── ProtectedRoute.tsx  # Route protection HOC
├── contexts/
│   └── AuthContext.tsx     # Auth context provider
└── hooks/
    └── useAuth.ts          # useAuth custom hook
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Authentication

### Registration

#### Player Registration
```typescript
const { registerPlayer } = useAuth();

await registerPlayer({
  email: 'user@example.com',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '2000-01-01',
  country: 'US',
  primarySport: 'Basketball',
  acceptedTerms: true,
});
```

#### Business Registration
```typescript
const { registerBusiness } = useAuth();

await registerBusiness({
  email: 'admin@business.com',
  username: 'mybusiness',
  businessName: 'Elite Sports Arena',
  businessType: 'Venue',
  country: 'US',
  region: 'New York',
  adminName: 'John Smith',
  acceptedTerms: true,
});
```

### Login

```typescript
const { login } = useAuth();

await login('user@example.com');
```

### Logout

```typescript
const { logout } = useAuth();

await logout();
```

## Protected Pages

### Using ProtectedRoute HOC

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard Content</div>
    </ProtectedRoute>
  );
}
```

### Restrict by Account Type

```typescript
<ProtectedRoute allowedAccountTypes={['Player']}>
  <PlayerDashboard />
</ProtectedRoute>
```

## Using useAuth Hook

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const {
    user,              // Current user or null
    isAuthenticated,   // true if logged in
    isLoading,         // true while checking auth
    login,             // Login function
    logout,            // Logout function
    registerPlayer,    // Register as player
    registerBusiness,  // Register as business
    isPlayer,          // Check if player
    isBusiness,        // Check if business
    canAccessFeature,  // Check feature access
  } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not logged in</div>;

  return <div>Welcome, {user?.email}</div>;
}
```

## Account Types

### Player
- Individual users (athletes, enthusiasts)
- Can: view feed, explore, messaging, edit profile
- Example: @johndoe

### Business
- Venues, academies, clubs, brands
- Can: manage bookings, send bookings, edit business info
- Example: @elitesportsarena

### Visitor
- View-only access for browsing
- Limited features, no account creation required

## Code Quality

All code includes comprehensive comments for code reviewers:

- **Components**: Explain purpose and usage
- **Functions**: Document parameters and return values
- **State Management**: Clarify flow and side effects
- **Error Handling**: Show error scenarios and recovery

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Athlee
```

## Testing

Login with existing users (from mock data):

```
Email: marcus_hoops_01@example.com
Email: sophia_tennis_02@example.com
Email: venue_001@example.com
```

## Next Steps

1. **API Integration**: Replace localStorage with backend API calls
2. **Password Management**: Add password hashing and reset flow
3. **Email Verification**: Verify emails before account activation
4. **2FA**: Add two-factor authentication
5. **Social Login**: Add Google/GitHub OAuth
6. **Profile Completion**: Guide users through profile setup

---

**Build Status**: ✅ Ready for development
