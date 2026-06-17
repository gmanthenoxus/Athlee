# Athlee Web Application

Modern web application for Athlee - a social platform for connecting athletes and sports enthusiasts.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
└── lib/              # Utility functions and services
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Features

- **Authentication**: Login, Registration, Token Management
- **Protected Routes**: Role-based access control
- **User Profiles**: User management and profile data
- **Responsive Design**: Mobile-first approach

## Architecture

### Authentication Flow

1. **Registration**: User creates account with email and password
2. **Login**: User authenticates with credentials
3. **Token Management**: JWT tokens stored securely
4. **Protected Routes**: Middleware validates authentication
5. **Logout**: Token invalidation and session cleanup

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Athlee
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
