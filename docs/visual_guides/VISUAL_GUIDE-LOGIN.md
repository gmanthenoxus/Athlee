# Visual Guide - Login Screen

## Overview
The login screen provides two authentication methods:
1. **Text Input**: Enter username manually
2. **Quick Login**: Select from mock user profiles (Player or Business accounts)

---

## Mobile UI - Login Screen

### Main Login Form

```
┌─────────────────────────────────────────┐
│ Safe Area                               │
├─────────────────────────────────────────┤
│                                         │
│           Athlehub                      │
│     Mock Authentication                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Enter your username               │  │
│  │ ┌─────────────────────────────────┐ │ │
│  │ │ John Doe                       │ │ │
│  │ └─────────────────────────────────┘ │ │
│  │                                     │ │
│  │ [      Login       ]                │ │
│  │                                     │ │
│  │ Don't have an account? Register →  │ │
│  │                                     │ │
│  ├─────────────────────────────────────┤ │
│  │                                     │ │
│  │   ──────  Or use a mock profile ─── │ │
│  │                                     │ │
│  │ ┌─────────────────────────────────┐ │ │
│  │ │  JD  John Doe                   │ │ │
│  │ │       john@player.com           │ │ │
│  │ │                        [Player] │ │ │
│  │ └─────────────────────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────────────────────────┐ │ │
│  │ │  JA  Jane Anderson              │ │ │
│  │ │       jane@business.com         │ │ │
│  │ │                       [Business]│ │ │
│  │ └─────────────────────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────────────────────────┐ │ │
│  │ │  MB  Mike Brown                 │ │ │
│  │ │       mike@player.com           │ │ │
│  │ │                        [Player] │ │ │
│  │ └─────────────────────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────────────────────────┐ │ │
│  │ │  SC  Sports Club Inc.           │ │ │
│  │ │       club@business.com         │ │ │
│  │ │                       [Business]│ │ │
│  │ └─────────────────────────────────┘ │ │
│  └───────────────────────────────────┘  │
│                                         │
│ This is mock authentication for dev     │
│              purposes only              │
│                                         │
└─────────────────────────────────────────┘
```

### UI Component Details

**Input Field:**
- Placeholder: "John Doe"
- Accepts any text input
- Disabled during loading

**Login Button:**
- Disabled when input is empty or loading
- Shows spinner during authentication
- Full width
- Blue color scheme

**Mock User Cards:**
- Displays 4 mock profiles
- Each card shows:
  - Avatar with initials (circular, gradient background)
  - User name
  - Email address
  - Account type badge (Player or Business)
- Tappable/interactive
- Disabled during loading

**Divider:**
- Horizontal line with centered text
- "Or use a mock profile"

---

## Web UI - Login Screen

### Main Login Form

```
┌──────────────────────────────────────────┐
│                                          │
│              Athlehub                    │
│         Mock Authentication              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │                                  │   │
│  │  Enter your name                 │   │
│  │  ┌────────────────────────────────┐  │
│  │  │ John Doe                      │  │
│  │  └────────────────────────────────┘  │
│  │                                  │   │
│  │                                  │   │
│  │  [        Login        ]         │   │
│  │                                  │   │
│  │ Don't have an account? Register  │   │
│  │                                  │   │
│  │  ─────  Or use a mock profile ───    │
│  │                                  │   │
│  │ ┌────────────────────────────────┐  │
│  │ │  JD  John Doe                  │  │
│  │ │      john@player.com   [Player]│  │
│  │ └────────────────────────────────┘  │
│  │                                  │   │
│  │ ┌────────────────────────────────┐  │
│  │ │  JA  Jane Anderson             │  │
│  │ │      jane@business.com    [Bus]│  │
│  │ └────────────────────────────────┘  │
│  │                                  │   │
│  │ ┌────────────────────────────────┐  │
│  │ │  MB  Mike Brown                │  │
│  │ │      mike@player.com   [Player]│  │
│  │ └────────────────────────────────┘  │
│  │                                  │   │
│  │ ┌────────────────────────────────┐  │
│  │ │  SC  Sports Club Inc.          │  │
│  │ │      club@business.com    [Bus]│  │
│  │ └────────────────────────────────┘  │
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  This is mock authentication for dev    │
│         purposes only.                   │
│                                          │
└──────────────────────────────────────────┘
```

### UI Component Details

**Container:**
- Centered on screen
- Max width: 448px
- Light gray background
- White card with shadow

**Input Field:**
- Placeholder: "John Doe"
- Full width
- Focus ring: Blue (focus:ring-blue-500)
- Dark mode support

**Login Button:**
- Full width
- Blue background (hover effect to darker blue)
- Disabled state: reduced opacity
- Disabled when input is empty or loading
- Smooth color transition

**Link:**
- "Don't have an account? Register here"
- Blue text, underline on hover
- Dark mode support

**Mock User Buttons:**
- Grid layout (one per row on mobile, could be stacked on web)
- Each shows:
  - Gradient avatar with initials
  - Name (left-aligned)
  - Email (left-aligned, smaller text)
  - Account type badge (right-aligned)
- Hover effect: light gray background
- Border: light gray
- Disabled during loading

**Divider:**
- Horizontal line with centered text
- "Or use a mock profile"
- Clean design with proper spacing

---

## Key Interactions

### Mobile
| Action | Response | Notes |
|--------|----------|-------|
| Enter name | Enable Login button | Real-time validation |
| Tap Login | Show spinner, disable button | Loading state |
| Tap mock user | Auto-fill & login | Quick access |
| Tap Register | Navigate to register | Stack navigation |
| Keyboard | Persist on focus | Keyboard avoiding view |

### Web
| Action | Response | Notes |
|--------|----------|-------|
| Type name | Enable Login button | Real-time validation |
| Click Login | Show "Logging in..." text | Loading state |
| Click mock user | Navigate to home | Quick access |
| Click Register link | Navigate to register | Standard link |
| Tab navigation | Full keyboard support | Accessible |

---

## Data Flow

```
User Enters Name
       ↓
   Validate Input
       ↓
   Call login() with name
       ↓
   AuthContext processes
       ↓
   Success → Navigate to Home
   Error   → Show error message
```

---

## Account Types Displayed

### Player Account
- Example: "John Doe"
- Email: john@player.com
- Type Badge: "Player"
- Use Case: Individual athletes

### Business Account
- Example: "Sports Club Inc."
- Email: club@business.com
- Type Badge: "Business"
- Use Case: Facilities, academies, clubs

---

## Mock Users Available

| # | Name | Type | Email | Initials |
|---|------|------|-------|----------|
| 1 | John Doe | Player | john@player.com | JD |
| 2 | Jane Anderson | Business | jane@business.com | JA |
| 3 | Mike Brown | Player | mike@player.com | MB |
| 4 | Sports Club Inc. | Business | club@business.com | SC |

---

## Navigation Paths

```
Login Screen
    ├─→ Manual Login → Home (Tabs)
    ├─→ Quick Login → Home (Tabs)
    └─→ Register Link → Registration Flow
```

---

## Color Scheme

| Element | Color | Dark Mode |
|---------|-------|-----------|
| Primary | Blue-600 (#2563EB) | Blue-400 |
| Background | Gray-50 (#F9FAFB) | Gray-900 |
| Card | White | Gray-800 |
| Text | Gray-900 | White |
| Muted | Gray-600 | Gray-400 |
| Border | Gray-300 | Gray-600 |
| Success | Green | Green |
| Error | Red-600 | Red-400 |

---

## States

### Loading State
- Input disabled
- Buttons disabled
- Show spinner/loading text
- Prevent navigation away

### Error State
- Error message displayed below input
- Text color: Red-600
- Message persists until user corrects
- Clear on input change (optional)

### Disabled State
- Reduced opacity (opacity-50)
- Cursor not-allowed
- No interaction possible

---

## Responsive Design

### Mobile (320px+)
- Full width with padding
- Single column
- Optimized touch targets
- SafeArea respected

### Desktop (640px+)
- Centered card (max-width: 448px)
- Extra spacing
- Comfortable reading/interaction
- Dark mode support

---

## Future Enhancements

- [ ] Social login (Google, Apple)
- [ ] Email/password authentication
- [ ] Remember me option
- [ ] Two-factor authentication
- [ ] Password reset flow
- [ ] Session timeout handling
- [ ] Biometric authentication (mobile)
