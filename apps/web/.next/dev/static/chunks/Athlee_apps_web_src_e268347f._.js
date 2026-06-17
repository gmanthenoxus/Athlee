(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Athlee/apps/web/src/lib/auth-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared Auth Types
 * 
 * For this fresh web app, we'll use these types directly
 * In production, these would come from @athlee/shared package
 */ /**
 * Account Type Enum
 */ __turbopack_context__.s([
    "AccountType",
    ()=>AccountType,
    "BusinessType",
    ()=>BusinessType,
    "Gender",
    ()=>Gender
]);
var AccountType = /*#__PURE__*/ function(AccountType) {
    AccountType["Visitor"] = "Visitor";
    AccountType["Player"] = "Player";
    AccountType["Business"] = "Business";
    return AccountType;
}({});
var Gender = /*#__PURE__*/ function(Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["NonBinary"] = "Non-binary";
    Gender["PreferNotToSay"] = "Prefer not to say";
    return Gender;
}({});
var BusinessType = /*#__PURE__*/ function(BusinessType) {
    BusinessType["Venue"] = "Venue";
    BusinessType["Academy"] = "Academy";
    BusinessType["Club"] = "Club";
    BusinessType["Brand"] = "Brand";
    return BusinessType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Auth Service - Web App Implementation
 * 
 * Handles all authentication operations locally.
 * Uses localStorage for mock data persistence.
 * 
 * In production, replace with API calls to backend.
 */ __turbopack_context__.s([
    "AuthService",
    ()=>AuthService,
    "authService",
    ()=>authService,
    "getAuthDiagnostics",
    ()=>getAuthDiagnostics,
    "initializeMockDatabase",
    ()=>initializeMockDatabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/auth-types.ts [app-client] (ecmascript)");
;
const USERS_STORAGE_KEY = 'athlee_users';
const CURRENT_USER_KEY = 'athlee_current_user';
const AUTH_TOKEN_KEY = 'athlee_auth_token';
const MOCK_DB_KEY = 'athlee_mock_database';
/**
 * Generate a JWT-like token
 */ function generateAuthToken(userId) {
    const header = btoa(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
    }));
    const payload = btoa(JSON.stringify({
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 * 7
    }));
    const signature = btoa(`${header}.${payload}`);
    return `${header}.${payload}.${signature}`;
}
/**
 * Generate unique user ID
 */ function generateUserId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Get all users
 */ function getAllUsers() {
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch  {
        return [];
    }
}
/**
 * Save users
 */ function saveUsers(users) {
    try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Failed to save users:', error);
    }
}
/**
 * Find user by email
 */ function findUserByEmail(email) {
    return getAllUsers().find((u)=>u.email.toLowerCase() === email.toLowerCase());
}
/**
 * Find user by username
 */ function findUserByUsername(username) {
    return getAllUsers().find((u)=>'username' in u && u.username.toLowerCase() === username.toLowerCase());
}
class AuthService {
    async registerPlayer(data) {
        if (findUserByEmail(data.email)) {
            throw new Error(`Email ${data.email} is already registered`);
        }
        if (findUserByUsername(data.username)) {
            throw new Error(`Username @${data.username} is already taken`);
        }
        const dob = new Date(data.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || monthDiff === 0 && today.getDate() < dob.getDate()) {
            age--;
        }
        const playerUser = {
            id: generateUserId(),
            email: data.email,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            age,
            country: data.country,
            city: data.city || '',
            gender: data.gender,
            primarySport: data.primarySport,
            isMinor: age < 18,
            accountType: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountType"].Player,
            createdAt: new Date().toISOString()
        };
        const users = getAllUsers();
        users.push(playerUser);
        saveUsers(users);
        this.setCurrentUser(playerUser);
        return playerUser;
    }
    async registerBusiness(data) {
        if (findUserByEmail(data.email)) {
            throw new Error(`Email ${data.email} is already registered`);
        }
        if (findUserByUsername(data.username)) {
            throw new Error(`Username @${data.username} is already taken`);
        }
        const businessUser = {
            id: generateUserId(),
            email: data.email,
            username: data.username,
            businessName: data.businessName,
            businessType: data.businessType,
            country: data.country,
            region: data.region,
            adminName: data.adminName,
            accountType: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountType"].Business,
            createdAt: new Date().toISOString()
        };
        const users = getAllUsers();
        users.push(businessUser);
        saveUsers(users);
        this.setCurrentUser(businessUser);
        return businessUser;
    }
    async login(email) {
        // Diagnostic logging for troubleshooting
        const allUsers = getAllUsers();
        console.log(`🔍 LOGIN ATTEMPT: Searching for "${email}"`);
        console.log(`   Total users in system: ${allUsers.length}`);
        // Show sample of users for debugging
        if (allUsers.length > 0) {
            const sampleCount = Math.min(3, allUsers.length);
            const samples = allUsers.slice(0, sampleCount).map((u)=>u.email);
            console.log(`   Sample user emails: ${samples.join(', ')}`);
        }
        const user = findUserByEmail(email);
        if (!user) {
            console.error(`❌ LOGIN FAILED: Email "${email}" not found in ${allUsers.length} users`);
            throw new Error('User not found');
        }
        console.log(`✅ LOGIN SUCCESS: Found user "${email}" (ID: ${user.id})`);
        const token = generateAuthToken(user.id);
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        this.setCurrentUser(user);
        return user;
    }
    async logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
    }
    async createVisitor() {
        const visitorUser = {
            id: generateUserId(),
            email: `visitor_${Date.now()}@athlee.local`,
            accountType: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountType"].Visitor,
            sessionId: generateUserId(),
            createdAt: new Date().toISOString()
        };
        const users = getAllUsers();
        users.push(visitorUser);
        saveUsers(users);
        this.setCurrentUser(visitorUser);
        return visitorUser;
    }
    getCurrentUser() {
        try {
            const stored = localStorage.getItem(CURRENT_USER_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch  {
            return null;
        }
    }
    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }
    isAuthenticated() {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) return false;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp > now;
        } catch  {
            return false;
        }
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validateUsername(username) {
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (username.length > 30) return 'Username must be at most 30 characters';
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            return 'Username can only contain letters, numbers, dashes, and underscores';
        }
        return '';
    }
    emailExists(email) {
        return !!findUserByEmail(email);
    }
    usernameExists(username) {
        return !!findUserByUsername(username);
    }
    async getUserById(userId) {
        return getAllUsers().find((u)=>u.id === userId);
    }
}
const authService = new AuthService();
function initializeMockDatabase() {
    try {
        const existing = localStorage.getItem(MOCK_DB_KEY);
        if (existing) return;
        const mockUsers = [
            // ===== PLAYER USERS (Basketball) =====
            {
                id: 'player_001',
                email: 'player@example.com',
                username: 'alex_player',
                accountType: 'Player',
                firstName: 'Alex',
                lastName: 'Thompson',
                dateOfBirth: '2000-05-15',
                age: 24,
                country: 'United States',
                city: 'New York',
                gender: 'Male',
                primarySport: 'Basketball',
                isMinor: false,
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_002',
                email: 'sarah@example.com',
                username: 'sarah_tennis',
                accountType: 'Player',
                firstName: 'Sarah',
                lastName: 'Johnson',
                dateOfBirth: '1998-08-22',
                age: 26,
                country: 'Canada',
                city: 'Toronto',
                gender: 'Female',
                primarySport: 'Tennis',
                isMinor: false,
                createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_003',
                email: 'michael.soccer@example.com',
                username: 'michael_soccer',
                accountType: 'Player',
                firstName: 'Michael',
                lastName: 'Chen',
                dateOfBirth: '1995-03-10',
                age: 29,
                country: 'United States',
                city: 'Los Angeles',
                gender: 'Male',
                primarySport: 'Soccer',
                isMinor: false,
                createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_004',
                email: 'emma.volleyball@example.com',
                username: 'emma_v',
                accountType: 'Player',
                firstName: 'Emma',
                lastName: 'Rodriguez',
                dateOfBirth: '2002-11-28',
                age: 22,
                country: 'Spain',
                city: 'Barcelona',
                gender: 'Female',
                primarySport: 'Volleyball',
                isMinor: false,
                createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_005',
                email: 'james.basketball@example.com',
                username: 'james_b',
                accountType: 'Player',
                firstName: 'James',
                lastName: 'Williams',
                dateOfBirth: '1997-07-14',
                age: 27,
                country: 'United States',
                city: 'Chicago',
                gender: 'Male',
                primarySport: 'Basketball',
                isMinor: false,
                createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_006',
                email: 'olivia.badminton@example.com',
                username: 'olivia_badminton',
                accountType: 'Player',
                firstName: 'Olivia',
                lastName: 'Martinez',
                dateOfBirth: '2001-02-05',
                age: 23,
                country: 'Mexico',
                city: 'Mexico City',
                gender: 'Female',
                primarySport: 'Badminton',
                isMinor: false,
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_007',
                email: 'david.soccer@example.com',
                username: 'david_striker',
                accountType: 'Player',
                firstName: 'David',
                lastName: 'Foster',
                dateOfBirth: '1999-09-20',
                age: 25,
                country: 'United Kingdom',
                city: 'Manchester',
                gender: 'Male',
                primarySport: 'Soccer',
                isMinor: false,
                createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_008',
                email: 'sophie.tennis@example.com',
                username: 'sophie_t',
                accountType: 'Player',
                firstName: 'Sophie',
                lastName: 'Bernard',
                dateOfBirth: '1996-12-11',
                age: 28,
                country: 'France',
                city: 'Paris',
                gender: 'Female',
                primarySport: 'Tennis',
                isMinor: false,
                createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_009',
                email: 'marco.volleyball@example.com',
                username: 'marco_v',
                accountType: 'Player',
                firstName: 'Marco',
                lastName: 'Rossi',
                dateOfBirth: '2000-01-25',
                age: 24,
                country: 'Italy',
                city: 'Rome',
                gender: 'Male',
                primarySport: 'Volleyball',
                isMinor: false,
                createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'player_010',
                email: 'luke.basketball@example.com',
                username: 'luke_hoops',
                accountType: 'Player',
                firstName: 'Luke',
                lastName: 'Patel',
                dateOfBirth: '1998-06-18',
                age: 26,
                country: 'United States',
                city: 'Houston',
                gender: 'Male',
                primarySport: 'Basketball',
                isMinor: false,
                createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
            },
            // ===== BUSINESS USERS =====
            {
                id: 'business_001',
                email: 'business@example.com',
                username: 'academy_sports',
                accountType: 'Business',
                businessName: 'Elite Sports Academy',
                businessType: 'Academy',
                adminName: 'James Mitchell',
                country: 'United States',
                region: 'California',
                createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'business_002',
                email: 'venue@example.com',
                username: 'central_sports_venue',
                accountType: 'Business',
                businessName: 'Central Sports Venue',
                businessType: 'Venue',
                adminName: 'Maria Garcia',
                country: 'United Kingdom',
                region: 'London',
                createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'business_003',
                email: 'court.rental@example.com',
                username: 'basketball_courts',
                accountType: 'Business',
                businessName: 'Urban Basketball Courts',
                businessType: 'Venue',
                adminName: 'Antonio Santos',
                country: 'United States',
                region: 'New York',
                createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'business_004',
                email: 'tennis.club@example.com',
                username: 'cypress_tennis',
                accountType: 'Business',
                businessName: 'Cypress Tennis Club',
                businessType: 'Club',
                adminName: 'Rebecca Chen',
                country: 'Canada',
                region: 'Ontario',
                createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'business_005',
                email: 'soccer.league@example.com',
                username: 'metro_soccer_league',
                accountType: 'Business',
                businessName: 'Metro Soccer League',
                businessType: 'League',
                adminName: 'Pedro Gonzalez',
                country: 'Mexico',
                region: 'Mexico City',
                createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'business_006',
                email: 'gym.fitness@example.com',
                username: 'power_fitness',
                accountType: 'Business',
                businessName: 'Power Fitness Gym',
                businessType: 'Gym',
                adminName: 'Klaus Mueller',
                country: 'Germany',
                region: 'Berlin',
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
        // Initialize comprehensive mock follower data for realistic social networks
        const mockFollowers = {
            // player_001 (Alex) - Active player with followers
            'followers_player_001': [
                'player_003',
                'player_005',
                'player_010',
                'business_001'
            ],
            'following_player_001': [
                'player_002',
                'player_005',
                'business_001',
                'business_003'
            ],
            // player_002 (Sarah) - Well-connected
            'followers_player_002': [
                'player_001',
                'player_004',
                'player_008',
                'business_002'
            ],
            'following_player_002': [
                'player_001',
                'business_002',
                'business_004'
            ],
            // player_003 (Michael) - Soccer player
            'followers_player_003': [
                'player_005',
                'player_007',
                'player_009',
                'business_001'
            ],
            'following_player_003': [
                'player_001',
                'player_007',
                'business_005'
            ],
            // player_004 (Emma) - Volleyball player
            'followers_player_004': [
                'player_002',
                'player_009',
                'business_001'
            ],
            'following_player_004': [
                'player_009',
                'business_002',
                'business_004'
            ],
            // player_005 (James) - Basketball player
            'followers_player_005': [
                'player_001',
                'player_003',
                'player_010',
                'business_003'
            ],
            'following_player_005': [
                'player_001',
                'player_010',
                'business_001',
                'business_003'
            ],
            // player_006 (Olivia) - Badminton player
            'followers_player_006': [
                'player_001',
                'player_002',
                'business_001'
            ],
            'following_player_006': [
                'player_001',
                'business_005',
                'business_006'
            ],
            // player_007 (David) - Soccer player
            'followers_player_007': [
                'player_003',
                'player_009',
                'business_005'
            ],
            'following_player_007': [
                'player_003',
                'business_005'
            ],
            // player_008 (Sophie) - Tennis player
            'followers_player_008': [
                'player_002',
                'player_004',
                'business_004'
            ],
            'following_player_008': [
                'player_002',
                'business_002',
                'business_004'
            ],
            // player_009 (Marco) - Volleyball player
            'followers_player_009': [
                'player_003',
                'player_004',
                'player_007',
                'business_001'
            ],
            'following_player_009': [
                'player_004',
                'player_007',
                'business_001',
                'business_002'
            ],
            // player_010 (Luke) - Basketball player
            'followers_player_010': [
                'player_005',
                'player_001',
                'business_003'
            ],
            'following_player_010': [
                'player_001',
                'player_005',
                'business_003'
            ],
            // Business accounts
            'followers_business_001': [
                'player_001',
                'player_003',
                'player_005',
                'player_009'
            ],
            'following_business_001': [
                'player_001',
                'player_005'
            ],
            'followers_business_002': [
                'player_002',
                'player_004',
                'player_008',
                'player_009'
            ],
            'following_business_002': [
                'player_002',
                'player_008'
            ],
            'followers_business_003': [
                'player_001',
                'player_005',
                'player_010'
            ],
            'following_business_003': [
                'player_001',
                'player_005'
            ],
            'followers_business_004': [
                'player_002',
                'player_004',
                'player_008'
            ],
            'following_business_004': [
                'player_002',
                'player_008'
            ],
            'followers_business_005': [
                'player_003',
                'player_006',
                'player_007'
            ],
            'following_business_005': [
                'player_003',
                'player_007'
            ],
            'followers_business_006': [
                'player_006',
                'player_001'
            ],
            'following_business_006': [
                'player_001',
                'player_006'
            ]
        };
        // Save follower data to localStorage
        Object.entries(mockFollowers).forEach(([key, value])=>{
            localStorage.setItem(key, JSON.stringify(value));
        });
        localStorage.setItem(MOCK_DB_KEY, JSON.stringify({
            initialized: true
        }));
    } catch (error) {
        console.error('Failed to initialize mock database:', error);
    }
}
function getAuthDiagnostics() {
    const allUsers = getAllUsers();
    const mockDbKey = localStorage.getItem(MOCK_DB_KEY);
    let validEmailCount = 0;
    const sampleEmails = [];
    allUsers.forEach((user)=>{
        if (user.email && typeof user.email === 'string') {
            validEmailCount++;
            if (sampleEmails.length < 5) {
                sampleEmails.push(user.email);
            }
        }
    });
    const message = allUsers.length === 0 ? '❌ No users in system' : validEmailCount === 0 ? '❌ No users have valid email' : validEmailCount < allUsers.length ? `⚠️ Only ${validEmailCount}/${allUsers.length} users have email` : `✅ All ${allUsers.length} users have valid email`;
    return {
        totalUsers: allUsers.length,
        usersWithValidEmail: validEmailCount,
        sampleEmails,
        mockDbInitialized: !!mockDbKey,
        message
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/match-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchMode",
    ()=>MatchMode,
    "MatchStatus",
    ()=>MatchStatus,
    "MatchType",
    ()=>MatchType,
    "ScoringSystem",
    ()=>ScoringSystem,
    "StatIntensity",
    ()=>StatIntensity
]);
var MatchType = /*#__PURE__*/ function(MatchType) {
    MatchType["Single"] = "Single";
    MatchType["SetBased"] = "SetBased";
    MatchType["Tournament"] = "Tournament";
    MatchType["Rotational"] = "Rotational"; // Rotating players (placeholder)
    return MatchType;
}({});
var MatchMode = /*#__PURE__*/ function(MatchMode) {
    MatchMode["Casual"] = "Casual";
    MatchMode["Competitive"] = "Competitive"; // Requires jersey numbers, strict validation
    return MatchMode;
}({});
var MatchStatus = /*#__PURE__*/ function(MatchStatus) {
    MatchStatus["Draft"] = "Draft";
    MatchStatus["Scheduled"] = "Scheduled";
    MatchStatus["InProgress"] = "InProgress";
    MatchStatus["Completed"] = "Completed";
    MatchStatus["Cancelled"] = "Cancelled"; // Match cancelled
    return MatchStatus;
}({});
var ScoringSystem = /*#__PURE__*/ function(ScoringSystem) {
    ScoringSystem["Standard"] = "Standard";
    ScoringSystem["Streetball"] = "Streetball";
    ScoringSystem["PointBased"] = "PointBased";
    ScoringSystem["SetBased"] = "SetBased"; // Sets/games
    return ScoringSystem;
}({});
var StatIntensity = /*#__PURE__*/ function(StatIntensity) {
    StatIntensity["Basic"] = "Basic";
    StatIntensity["Advanced"] = "Advanced";
    StatIntensity["Professional"] = "Professional";
    StatIntensity["Custom"] = "Custom"; // User-defined (future)
    return StatIntensity;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================================
// LOCATION SYSTEM TYPE DEFINITIONS
// ============================================================================
/**
 * Represents the different types of locations in the Athlee system
 */ __turbopack_context__.s([
    "Amenity",
    ()=>Amenity,
    "EventType",
    ()=>EventType,
    "LocationType",
    ()=>LocationType,
    "SortOption",
    ()=>SortOption,
    "SportType",
    ()=>SportType
]);
var LocationType = /*#__PURE__*/ function(LocationType) {
    LocationType["Business"] = "Business";
    LocationType["Community"] = "Community";
    LocationType["Private"] = "Private"; // Private locations accessible by invite only
    return LocationType;
}({});
var SportType = /*#__PURE__*/ function(SportType) {
    SportType["Basketball"] = "Basketball";
    SportType["Soccer"] = "Soccer";
    SportType["Badminton"] = "Badminton";
    SportType["Baseball"] = "Baseball";
    SportType["Volleyball"] = "Volleyball";
    SportType["Tennis"] = "Tennis";
    SportType["Pickleball"] = "Pickleball";
    SportType["American_Football"] = "American Football";
    return SportType;
}({});
var Amenity = /*#__PURE__*/ function(Amenity) {
    Amenity["Showers"] = "Showers";
    Amenity["Parking"] = "Parking";
    Amenity["ChangingRooms"] = "Changing Rooms";
    Amenity["Restrooms"] = "Restrooms";
    Amenity["Seating"] = "Seating";
    Amenity["Lighting"] = "Lighting";
    Amenity["Snacks"] = "Snacks";
    Amenity["WiFi"] = "WiFi";
    Amenity["Scoreboard"] = "Scoreboard";
    return Amenity;
}({});
var EventType = /*#__PURE__*/ function(EventType) {
    EventType["Tournament"] = "Tournament";
    EventType["League"] = "League";
    EventType["OpenPlay"] = "Open Play";
    return EventType;
}({});
var SortOption = /*#__PURE__*/ function(SortOption) {
    SortOption["Nearest"] = "nearest";
    SortOption["MostActive"] = "most_active";
    SortOption["Newest"] = "newest";
    SortOption["MostBookings"] = "most_bookings";
    return SortOption;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockSoccerRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Soccer Rule Presets for Match Setup
 * 
 * Defines standard rule configurations for different soccer formats:
 * - FIFA Standard: Formal soccer with international rules
 * - Youth: Adapted for younger players
 * - Indoor: Futsal-style rules
 * - Custom: User-editable template
 */ __turbopack_context__.s([
    "CUSTOM_RULES",
    ()=>CUSTOM_RULES,
    "FIFA_STANDARD_RULES",
    ()=>FIFA_STANDARD_RULES,
    "INDOOR_RULES",
    ()=>INDOOR_RULES,
    "SOCCER_PRESETS",
    ()=>SOCCER_PRESETS,
    "YOUTH_RULES",
    ()=>YOUTH_RULES
]);
const FIFA_STANDARD_RULES = {
    presetName: 'FIFA Standard',
    halfDuration: 45,
    halves: 2,
    extraTime: true,
    penalties: true,
    offside: true,
    substitutionRule: 'limited',
    maxSubstitutions: 3,
    pointsSystem: {
        win: 3,
        draw: 1,
        loss: 0
    },
    houseRules: [
        'Kick-off by designated team',
        'Throw-ins for out of bounds',
        'Corner kicks and goal kicks from designated areas'
    ],
    unwrittenRules: 'Standard FIFA rules apply. Referee\'s decision is final.'
};
const YOUTH_RULES = {
    presetName: 'Youth',
    halfDuration: 35,
    halves: 2,
    extraTime: false,
    penalties: false,
    offside: true,
    substitutionRule: 'rolling',
    maxSubstitutions: undefined,
    pointsSystem: {
        win: 3,
        draw: 1,
        loss: 0
    },
    houseRules: [
        'Lighter hand ball when called',
        'Encouragement of technical play over physical play',
        'No excessive contact'
    ],
    unwrittenRules: 'Focus on player development. Coaches may make tactical substitutions during stoppages.'
};
const INDOOR_RULES = {
    presetName: 'Indoor',
    halfDuration: 20,
    halves: 2,
    extraTime: false,
    penalties: false,
    offside: false,
    substitutionRule: 'unlimited',
    maxSubstitutions: undefined,
    pointsSystem: {
        win: 3,
        draw: 1,
        loss: 0
    },
    houseRules: [
        'Ball must stay below head in play',
        'No sliding tackles',
        'Kick-ins instead of throw-ins',
        'Goal kicks from hand'
    ],
    unwrittenRules: 'Fast-paced game. Quick play encouraged. Referee keeps time.'
};
const CUSTOM_RULES = {
    presetName: 'Custom',
    halfDuration: 40,
    halves: 2,
    extraTime: false,
    penalties: false,
    offside: true,
    substitutionRule: 'limited',
    maxSubstitutions: 5,
    pointsSystem: {
        win: 3,
        draw: 1,
        loss: 0
    },
    houseRules: [],
    unwrittenRules: 'Define your own rules here.'
};
const SOCCER_PRESETS = [
    {
        name: 'FIFA Standard',
        description: '2x45 min halves with offside, limited subs',
        rules: FIFA_STANDARD_RULES
    },
    {
        name: 'Youth',
        description: '2x35 min halves with rolling substitutions',
        rules: YOUTH_RULES
    },
    {
        name: 'Indoor',
        description: '2x20 min halves, no offside, unlimited subs (futsal)',
        rules: INDOOR_RULES
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: CUSTOM_RULES
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockTennisRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Tennis Rule Presets
 * 
 * Standard tennis rule configurations for different match formats
 * Following ITF, ATP, and WTA standards
 */ __turbopack_context__.s([
    "TENNIS_PRESETS",
    ()=>TENNIS_PRESETS,
    "TENNIS_PRESET_BEST_OF_5",
    ()=>TENNIS_PRESET_BEST_OF_5,
    "TENNIS_PRESET_CUSTOM",
    ()=>TENNIS_PRESET_CUSTOM,
    "TENNIS_PRESET_FAST4",
    ()=>TENNIS_PRESET_FAST4,
    "TENNIS_PRESET_NO_AD",
    ()=>TENNIS_PRESET_NO_AD,
    "TENNIS_PRESET_RECREATIONAL",
    ()=>TENNIS_PRESET_RECREATIONAL,
    "TENNIS_PRESET_STANDARD",
    ()=>TENNIS_PRESET_STANDARD
]);
const TENNIS_PRESET_STANDARD = {
    presetName: 'Standard ATP/WTA',
    bestOfSets: 2,
    tiebreakAt: 6,
    tiebreakFormat: 'to7',
    advantageScoring: true,
    letRule: 'playLet',
    finalSetTiebreak: 'super10',
    winByTwo: true
};
const TENNIS_PRESET_BEST_OF_5 = {
    presetName: 'Grand Slam (Best of 5)',
    bestOfSets: 3,
    tiebreakAt: 6,
    tiebreakFormat: 'to7',
    advantageScoring: true,
    letRule: 'playLet',
    finalSetTiebreak: 'super10',
    winByTwo: true
};
const TENNIS_PRESET_NO_AD = {
    presetName: 'No-Ad Scoring',
    bestOfSets: 2,
    tiebreakAt: 6,
    tiebreakFormat: 'to7',
    advantageScoring: false,
    letRule: 'playLet',
    finalSetTiebreak: 'super10',
    winByTwo: true
};
const TENNIS_PRESET_FAST4 = {
    presetName: 'Fast4',
    bestOfSets: 2,
    tiebreakAt: 3,
    tiebreakFormat: 'to7',
    advantageScoring: false,
    letRule: 'playLet',
    finalSetTiebreak: 'super10',
    winByTwo: true
};
const TENNIS_PRESET_RECREATIONAL = {
    presetName: 'Recreational',
    bestOfSets: 2,
    tiebreakAt: 6,
    tiebreakFormat: 'to7',
    advantageScoring: true,
    letRule: 'noLet',
    finalSetTiebreak: 'to7',
    winByTwo: true
};
const TENNIS_PRESET_CUSTOM = {
    presetName: 'Custom',
    bestOfSets: 2,
    tiebreakAt: 6,
    tiebreakFormat: 'to7',
    advantageScoring: true,
    letRule: 'playLet',
    finalSetTiebreak: 'super10',
    winByTwo: true
};
const TENNIS_PRESETS = [
    {
        name: 'Standard ATP/WTA',
        description: 'Best of 3 sets, advantage scoring, professional standard',
        rules: TENNIS_PRESET_STANDARD
    },
    {
        name: 'Best of 5',
        description: 'Best of 5 sets, advantage scoring, Grand Slam format',
        rules: TENNIS_PRESET_BEST_OF_5
    },
    {
        name: 'No-Ad',
        description: 'No advantage, sudden-death at deuce (7-6)',
        rules: TENNIS_PRESET_NO_AD
    },
    {
        name: 'Fast4',
        description: 'Fast format with short tiebreaks and no second serve',
        rules: TENNIS_PRESET_FAST4
    },
    {
        name: 'Recreational',
        description: 'Casual format with simplified rules',
        rules: TENNIS_PRESET_RECREATIONAL
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: TENNIS_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockBadmintonRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Badminton Rule Presets
 * 
 * Standard badminton rule configurations for different match formats
 * Following BWF (Badminton World Federation) standards
 */ __turbopack_context__.s([
    "BADMINTON_PRESETS",
    ()=>BADMINTON_PRESETS,
    "BADMINTON_PRESET_11_POINT",
    ()=>BADMINTON_PRESET_11_POINT,
    "BADMINTON_PRESET_15_POINT",
    ()=>BADMINTON_PRESET_15_POINT,
    "BADMINTON_PRESET_BWF_STANDARD",
    ()=>BADMINTON_PRESET_BWF_STANDARD,
    "BADMINTON_PRESET_CUSTOM",
    ()=>BADMINTON_PRESET_CUSTOM,
    "BADMINTON_PRESET_RECREATIONAL",
    ()=>BADMINTON_PRESET_RECREATIONAL,
    "BADMINTON_PRESET_SINGLE_GAME",
    ()=>BADMINTON_PRESET_SINGLE_GAME
]);
const BADMINTON_PRESET_BWF_STANDARD = {
    presetName: 'BWF Standard',
    gamesToWin: 2,
    pointsPerGame: 21,
    winByTwo: true,
    pointsCap: 30,
    serviceLaws: 'bwf'
};
const BADMINTON_PRESET_15_POINT = {
    presetName: '15-Point Games',
    gamesToWin: 2,
    pointsPerGame: 15,
    winByTwo: true,
    pointsCap: 20,
    serviceLaws: 'bwf'
};
const BADMINTON_PRESET_11_POINT = {
    presetName: '11-Point Games',
    gamesToWin: 2,
    pointsPerGame: 11,
    winByTwo: true,
    pointsCap: 15,
    serviceLaws: 'bwf'
};
const BADMINTON_PRESET_SINGLE_GAME = {
    presetName: 'Single Game (21)',
    gamesToWin: 1,
    pointsPerGame: 21,
    winByTwo: true,
    pointsCap: 30,
    serviceLaws: 'bwf'
};
const BADMINTON_PRESET_RECREATIONAL = {
    presetName: 'Recreational',
    gamesToWin: 2,
    pointsPerGame: 21,
    winByTwo: false,
    pointsCap: undefined,
    serviceLaws: 'custom'
};
const BADMINTON_PRESET_CUSTOM = {
    presetName: 'Custom',
    gamesToWin: 2,
    pointsPerGame: 21,
    winByTwo: true,
    pointsCap: 30,
    serviceLaws: 'bwf'
};
const BADMINTON_PRESETS = [
    {
        name: 'BWF Standard',
        description: 'Best of 3 games to 21, rally scoring, international standard',
        rules: BADMINTON_PRESET_BWF_STANDARD
    },
    {
        name: '15-Point Games',
        description: 'Best of 3 games to 15, modified for shorter matches',
        rules: BADMINTON_PRESET_15_POINT
    },
    {
        name: '11-Point Games',
        description: 'Best of 3 games to 11, simplified format',
        rules: BADMINTON_PRESET_11_POINT
    },
    {
        name: 'Single Game (21)',
        description: 'Single game to 21 points, quick format',
        rules: BADMINTON_PRESET_SINGLE_GAME
    },
    {
        name: 'Recreational',
        description: 'Casual recreation format with simplified rules',
        rules: BADMINTON_PRESET_RECREATIONAL
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: BADMINTON_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockPickleballRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pickleball Rule Presets
 * 
 * Standard pickleball rule configurations for different match formats
 * Following USAPA (USA Pickleball Association) standards
 */ __turbopack_context__.s([
    "PICKLEBALL_PRESETS",
    ()=>PICKLEBALL_PRESETS,
    "PICKLEBALL_PRESET_15_POINT",
    ()=>PICKLEBALL_PRESET_15_POINT,
    "PICKLEBALL_PRESET_21_POINT",
    ()=>PICKLEBALL_PRESET_21_POINT,
    "PICKLEBALL_PRESET_9_POINT",
    ()=>PICKLEBALL_PRESET_9_POINT,
    "PICKLEBALL_PRESET_CUSTOM",
    ()=>PICKLEBALL_PRESET_CUSTOM,
    "PICKLEBALL_PRESET_NO_AD",
    ()=>PICKLEBALL_PRESET_NO_AD,
    "PICKLEBALL_PRESET_RECREATIONAL",
    ()=>PICKLEBALL_PRESET_RECREATIONAL,
    "PICKLEBALL_PRESET_USAPA_STANDARD",
    ()=>PICKLEBALL_PRESET_USAPA_STANDARD
]);
const PICKLEBALL_PRESET_USAPA_STANDARD = {
    presetName: 'USAPA Standard (11)',
    gamesToWin: 2,
    pointsPerGame: 11,
    winByTwo: true,
    pointsCap: 15,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESET_15_POINT = {
    presetName: 'Tournament (15)',
    gamesToWin: 2,
    pointsPerGame: 15,
    winByTwo: true,
    pointsCap: 17,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESET_21_POINT = {
    presetName: 'Extended (21)',
    gamesToWin: 2,
    pointsPerGame: 21,
    winByTwo: true,
    pointsCap: 25,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESET_9_POINT = {
    presetName: 'Quick Play (9)',
    gamesToWin: 2,
    pointsPerGame: 9,
    winByTwo: true,
    pointsCap: 11,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESET_RECREATIONAL = {
    presetName: 'Recreational',
    gamesToWin: 2,
    pointsPerGame: 11,
    winByTwo: false,
    pointsCap: undefined,
    doubleBounceRule: true,
    serviceLaws: 'custom'
};
const PICKLEBALL_PRESET_NO_AD = {
    presetName: 'No-Ad (Fast)',
    gamesToWin: 2,
    pointsPerGame: 11,
    winByTwo: false,
    pointsCap: 11,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESET_CUSTOM = {
    presetName: 'Custom',
    gamesToWin: 2,
    pointsPerGame: 11,
    winByTwo: true,
    pointsCap: 15,
    doubleBounceRule: true,
    serviceLaws: 'usapa'
};
const PICKLEBALL_PRESETS = [
    {
        name: 'USAPA Standard (11)',
        description: 'Best of 3 games to 11, win by 2, USAPA standard',
        rules: PICKLEBALL_PRESET_USAPA_STANDARD
    },
    {
        name: 'Tournament (15)',
        description: 'Best of 3 games to 15, tournament format',
        rules: PICKLEBALL_PRESET_15_POINT
    },
    {
        name: 'Extended (21)',
        description: 'Best of 3 games to 21, extended competitive format',
        rules: PICKLEBALL_PRESET_21_POINT
    },
    {
        name: 'Quick Play (9)',
        description: 'Best of 3 games to 9, quick casual format',
        rules: PICKLEBALL_PRESET_9_POINT
    },
    {
        name: 'Recreational',
        description: 'Casual format with simplified rules',
        rules: PICKLEBALL_PRESET_RECREATIONAL
    },
    {
        name: 'No-Ad (Fast)',
        description: 'No-ad scoring for faster games',
        rules: PICKLEBALL_PRESET_NO_AD
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: PICKLEBALL_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockVolleyballRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Volleyball Rule Presets
 * 
 * Standard volleyball rule configurations for different match formats
 */ __turbopack_context__.s([
    "VOLLEYBALL_PRESETS",
    ()=>VOLLEYBALL_PRESETS,
    "VOLLEYBALL_PRESET_BEACH",
    ()=>VOLLEYBALL_PRESET_BEACH,
    "VOLLEYBALL_PRESET_CUSTOM",
    ()=>VOLLEYBALL_PRESET_CUSTOM,
    "VOLLEYBALL_PRESET_FIVB",
    ()=>VOLLEYBALL_PRESET_FIVB,
    "VOLLEYBALL_PRESET_HIGH_SCHOOL",
    ()=>VOLLEYBALL_PRESET_HIGH_SCHOOL,
    "VOLLEYBALL_PRESET_RECREATIONAL",
    ()=>VOLLEYBALL_PRESET_RECREATIONAL
]);
const VOLLEYBALL_PRESET_FIVB = {
    presetName: 'FIVB Indoor',
    setsToWin: 3,
    pointsPerSet: 25,
    winByTwo: true,
    pointsCap: 27,
    rallyScoring: true,
    liberoAllowed: true
};
const VOLLEYBALL_PRESET_HIGH_SCHOOL = {
    presetName: 'High School',
    setsToWin: 2,
    pointsPerSet: 25,
    winByTwo: true,
    pointsCap: 27,
    rallyScoring: true,
    liberoAllowed: true
};
const VOLLEYBALL_PRESET_BEACH = {
    presetName: 'Beach',
    setsToWin: 2,
    pointsPerSet: 21,
    winByTwo: true,
    pointsCap: undefined,
    rallyScoring: true,
    liberoAllowed: false
};
const VOLLEYBALL_PRESET_RECREATIONAL = {
    presetName: 'Recreational',
    setsToWin: 2,
    pointsPerSet: 25,
    winByTwo: false,
    pointsCap: undefined,
    rallyScoring: true,
    liberoAllowed: false
};
const VOLLEYBALL_PRESET_CUSTOM = {
    presetName: 'Custom',
    setsToWin: 2,
    pointsPerSet: 25,
    winByTwo: true,
    pointsCap: 27,
    rallyScoring: true,
    liberoAllowed: true
};
const VOLLEYBALL_PRESETS = [
    {
        name: 'FIVB Indoor',
        description: 'Best of 5 sets to 25 with win-by-2, international standard',
        rules: VOLLEYBALL_PRESET_FIVB
    },
    {
        name: 'High School',
        description: 'Best of 3 sets to 25 with win-by-2',
        rules: VOLLEYBALL_PRESET_HIGH_SCHOOL
    },
    {
        name: 'Beach',
        description: 'Best of 3 sets (21, 21, 15), no libero, win by 2',
        rules: VOLLEYBALL_PRESET_BEACH
    },
    {
        name: 'Recreational',
        description: 'Best of 3 sets to 25, simplified rules',
        rules: VOLLEYBALL_PRESET_RECREATIONAL
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: VOLLEYBALL_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockBaseballRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Baseball Rule Presets
 * 
 * Standard baseball rule configurations for different match formats
 */ __turbopack_context__.s([
    "BASEBALL_PRESETS",
    ()=>BASEBALL_PRESETS,
    "BASEBALL_PRESET_COLLEGE",
    ()=>BASEBALL_PRESET_COLLEGE,
    "BASEBALL_PRESET_CUSTOM",
    ()=>BASEBALL_PRESET_CUSTOM,
    "BASEBALL_PRESET_LITTLE_LEAGUE",
    ()=>BASEBALL_PRESET_LITTLE_LEAGUE,
    "BASEBALL_PRESET_MLB",
    ()=>BASEBALL_PRESET_MLB,
    "BASEBALL_PRESET_SOFTBALL",
    ()=>BASEBALL_PRESET_SOFTBALL
]);
const BASEBALL_PRESET_MLB = {
    presetName: 'MLB',
    innings: 9,
    designatedHitter: true,
    mercyRule: undefined,
    extraInningsFormat: 'runnerOnSecond'
};
const BASEBALL_PRESET_LITTLE_LEAGUE = {
    presetName: 'Little League',
    innings: 6,
    designatedHitter: false,
    mercyRule: {
        runDifference: 10,
        afterInning: 5
    },
    extraInningsFormat: 'standard'
};
const BASEBALL_PRESET_COLLEGE = {
    presetName: 'College',
    innings: 9,
    designatedHitter: true,
    mercyRule: undefined,
    extraInningsFormat: 'standard'
};
const BASEBALL_PRESET_SOFTBALL = {
    presetName: 'Softball',
    innings: 7,
    designatedHitter: true,
    mercyRule: {
        runDifference: 8,
        afterInning: 5
    },
    extraInningsFormat: 'standard'
};
const BASEBALL_PRESET_CUSTOM = {
    presetName: 'Custom',
    innings: 9,
    designatedHitter: true,
    mercyRule: undefined,
    extraInningsFormat: 'standard'
};
const BASEBALL_PRESETS = [
    {
        name: 'MLB',
        description: '9 innings, DH allowed, modern extra innings format',
        rules: BASEBALL_PRESET_MLB
    },
    {
        name: 'Little League',
        description: '6 innings, mercy rule at 5 innings (10+ run difference)',
        rules: BASEBALL_PRESET_LITTLE_LEAGUE
    },
    {
        name: 'College',
        description: '9 innings, DH allowed, standard extra innings',
        rules: BASEBALL_PRESET_COLLEGE
    },
    {
        name: 'Softball',
        description: '7 innings, DH allowed, mercy rule (8+ runs after 5 innings)',
        rules: BASEBALL_PRESET_SOFTBALL
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: BASEBALL_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockFootballRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * American Football Rule Presets
 * 
 * Standard American football rule configurations for different match formats
 */ __turbopack_context__.s([
    "FOOTBALL_PRESETS",
    ()=>FOOTBALL_PRESETS,
    "FOOTBALL_PRESET_7V7",
    ()=>FOOTBALL_PRESET_7V7,
    "FOOTBALL_PRESET_COLLEGE",
    ()=>FOOTBALL_PRESET_COLLEGE,
    "FOOTBALL_PRESET_CUSTOM",
    ()=>FOOTBALL_PRESET_CUSTOM,
    "FOOTBALL_PRESET_FLAG",
    ()=>FOOTBALL_PRESET_FLAG,
    "FOOTBALL_PRESET_HIGH_SCHOOL",
    ()=>FOOTBALL_PRESET_HIGH_SCHOOL,
    "FOOTBALL_PRESET_NFL",
    ()=>FOOTBALL_PRESET_NFL
]);
const FOOTBALL_PRESET_NFL = {
    presetName: 'NFL',
    quarterDuration: 15,
    quarters: 4,
    overtimeFormat: 'suddenDeath',
    twoPointConversion: true,
    timeoutsPerHalf: 3
};
const FOOTBALL_PRESET_COLLEGE = {
    presetName: 'College',
    quarterDuration: 15,
    quarters: 4,
    overtimeFormat: 'college',
    twoPointConversion: true,
    timeoutsPerHalf: 3
};
const FOOTBALL_PRESET_HIGH_SCHOOL = {
    presetName: 'High School',
    quarterDuration: 12,
    quarters: 4,
    overtimeFormat: 'suddenDeath',
    twoPointConversion: true,
    timeoutsPerHalf: 3
};
const FOOTBALL_PRESET_FLAG = {
    presetName: 'Flag Football',
    quarterDuration: 12,
    quarters: 4,
    overtimeFormat: 'none',
    twoPointConversion: true,
    timeoutsPerHalf: 2
};
const FOOTBALL_PRESET_7V7 = {
    presetName: '7-on-7',
    quarterDuration: 12,
    quarters: 4,
    overtimeFormat: 'none',
    twoPointConversion: true,
    timeoutsPerHalf: 2
};
const FOOTBALL_PRESET_CUSTOM = {
    presetName: 'Custom',
    quarterDuration: 15,
    quarters: 4,
    overtimeFormat: 'suddenDeath',
    twoPointConversion: true,
    timeoutsPerHalf: 3
};
const FOOTBALL_PRESETS = [
    {
        name: 'NFL',
        description: '4 x 15 min quarters, NFL rules, sudden death overtime',
        rules: FOOTBALL_PRESET_NFL
    },
    {
        name: 'College',
        description: '4 x 15 min quarters, college overtime rules',
        rules: FOOTBALL_PRESET_COLLEGE
    },
    {
        name: 'High School',
        description: '4 x 12 min quarters, high school rules',
        rules: FOOTBALL_PRESET_HIGH_SCHOOL
    },
    {
        name: 'Flag Football',
        description: 'Non-contact flag football, no tackles',
        rules: FOOTBALL_PRESET_FLAG
    },
    {
        name: '7v7',
        description: 'Passing league format, 7 players per side',
        rules: FOOTBALL_PRESET_7V7
    },
    {
        name: 'Custom',
        description: 'Fully customizable rules',
        rules: FOOTBALL_PRESET_CUSTOM
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockRulePresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASKETBALL_PRESETS",
    ()=>BASKETBALL_PRESETS,
    "getDefaultPreset",
    ()=>getDefaultPreset,
    "getRulePresetsBySport",
    ()=>getRulePresetsBySport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockSoccerRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockSoccerRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockTennisRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockTennisRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBadmintonRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockBadmintonRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockPickleballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockPickleballRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockVolleyballRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockBaseballRulePresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockFootballRulePresets.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Comprehensive Rule Presets for Basketball
 * Each preset defines all rule aspects from Timing through Gameplay
 * Uses flat field structure with conditional visibility based on gameFormat
 */ // ===== BASKETBALL RULE PRESETS =====
const FIBA_RULES = {
    presetName: 'FIBA',
    gameFormat: 'timed',
    periodStructure: 'quarters',
    periodDuration: 10,
    overtimeFormat: '5min',
    shotClock: '24',
    pointsInside: 2,
    pointsOutside: 3,
    freeThrowValue: 1,
    personalFoulLimit: '5',
    teamFoulLimit: '4perQtr',
    bonusAfter: '5',
    technicalFoulValue: '1ftPos',
    flagrantFoulPenalty: '2ftPos',
    backcourt: '8',
    threeSecondViolation: 'both',
    goaltendingAllowed: true,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'fiba',
    substitutions: 'unlimited',
    shotClockResetAfter: 'made',
    jumpBallRule: 'alternating',
    houseRules: []
};
const NBA_RULES = {
    presetName: 'NBA',
    gameFormat: 'timed',
    periodStructure: 'quarters',
    periodDuration: 12,
    overtimeFormat: '5min',
    shotClock: '24',
    pointsInside: 2,
    pointsOutside: 3,
    freeThrowValue: 1,
    personalFoulLimit: '6',
    teamFoulLimit: '4perQtr',
    bonusAfter: '4',
    technicalFoulValue: '1ftPos',
    flagrantFoulPenalty: 'ejection2ft',
    backcourt: '8',
    threeSecondViolation: 'defensive3',
    goaltendingAllowed: true,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'nba',
    substitutions: 'unlimited',
    shotClockResetAfter: 'made',
    jumpBallRule: 'alternating',
    houseRules: []
};
const NCAA_RULES = {
    presetName: 'NCAA',
    gameFormat: 'timed',
    periodStructure: 'halves',
    periodDuration: 20,
    overtimeFormat: '5min',
    shotClock: '30',
    pointsInside: 2,
    pointsOutside: 3,
    freeThrowValue: 1,
    personalFoulLimit: '5',
    teamFoulLimit: '7perHalf',
    bonusAfter: '7',
    technicalFoulValue: '1ftPos',
    flagrantFoulPenalty: '2ftPos',
    backcourt: '10',
    threeSecondViolation: 'both',
    goaltendingAllowed: true,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'ncaa',
    substitutions: 'unlimited',
    shotClockResetAfter: 'made',
    jumpBallRule: 'alternating',
    houseRules: []
};
const STREETBALL_RULES = {
    presetName: 'Streetball',
    gameFormat: 'firstTo',
    winningScore: 21,
    winByTwo: true,
    overtimeLimit: 0,
    shotClock: 'none',
    pointsInside: 1,
    pointsOutside: 2,
    freeThrowValue: 1,
    personalFoulLimit: 'none',
    teamFoulLimit: 'none',
    bonusAfter: 'none',
    technicalFoulValue: 'none',
    flagrantFoulPenalty: 'none',
    backcourt: 'none',
    threeSecondViolation: 'none',
    goaltendingAllowed: false,
    travelingCalled: false,
    doubleDribbleCalled: false,
    timeoutStructure: 'none',
    substitutions: 'none',
    shotClockResetAfter: 'none',
    jumpBallRule: 'tipoff',
    houseRules: [
        'Winner stays on court',
        'Losers\' ball'
    ]
};
const THREE_X_THREE_RULES = {
    presetName: '3x3 (FIBA)',
    gameFormat: 'firstTo',
    winningScore: 21,
    winByTwo: true,
    overtimeLimit: 0,
    shotClock: '12',
    pointsInside: 1,
    pointsOutside: 2,
    freeThrowValue: 1,
    personalFoulLimit: 'none',
    teamFoulLimit: 'none',
    bonusAfter: 'none',
    technicalFoulValue: 'none',
    flagrantFoulPenalty: 'none',
    backcourt: 'none',
    threeSecondViolation: 'none',
    goaltendingAllowed: true,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'custom',
    customTimeoutsPerHalf: 1,
    customTimeoutsPerOT: 1,
    customTimeoutsCanCarryOver: false,
    customTimeoutDuration: '30',
    substitutions: 'none',
    shotClockResetAfter: 'made',
    jumpBallRule: 'tipoff',
    houseRules: []
};
const BASKETBALL_PRESETS = [
    {
        name: 'FIBA',
        description: 'International FIBA rules (10min quarters)',
        rules: FIBA_RULES
    },
    {
        name: 'NBA',
        description: 'National Basketball Association (12min quarters)',
        rules: NBA_RULES
    },
    {
        name: 'NCAA',
        description: 'College basketball (20min halves)',
        rules: NCAA_RULES
    },
    {
        name: 'Streetball',
        description: 'Pickup game rules (first to 21)',
        rules: STREETBALL_RULES
    },
    {
        name: '3x3',
        description: 'FIBA 3x3 official (first to 21, 12s shot clock)',
        rules: THREE_X_THREE_RULES
    }
];
function getRulePresetsBySport(sport) {
    switch(sport){
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockSoccerRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCCER_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockTennisRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNIS_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Badminton:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBadmintonRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BADMINTON_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Pickleball:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockPickleballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PICKLEBALL_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOLLEYBALL_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Baseball:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASEBALL_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].American_Football:
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOOTBALL_PRESETS"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball:
        default:
            return BASKETBALL_PRESETS;
    }
}
function getDefaultPreset(sport) {
    const presets = getRulePresetsBySport(sport);
    return presets[0]; // Return first preset (most common)
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockMatches.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateMockMatches",
    ()=>generateMockMatches,
    "generateMockPlayerSuggestions",
    ()=>generateMockPlayerSuggestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockRulePresets.ts [app-client] (ecmascript)");
;
;
;
function generateMockMatches() {
    // Default team size for basketball (5v5)
    const defaultTeamSize = {
        label: '5v5',
        playersPerTeam: 5,
        substitutes: 3
    };
    const matches = [
        // Completed casual basketball match
        {
            id: 'match_001',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: defaultTeamSize,
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            locationId: 'loc_basketball_downtown',
            createdBy: 'user_001',
            teams: [
                {
                    id: 'team_001',
                    name: 'Team A',
                    players: [
                        {
                            id: 'p_001',
                            name: 'John',
                            userId: 'user_001'
                        },
                        {
                            id: 'p_002',
                            name: 'Michael',
                            userId: 'user_002'
                        },
                        {
                            id: 'p_003',
                            name: 'Sarah',
                            userId: 'user_003'
                        }
                    ]
                },
                {
                    id: 'team_002',
                    name: 'Team B',
                    players: [
                        {
                            id: 'p_004',
                            name: 'James',
                            userId: 'user_004'
                        },
                        {
                            id: 'p_005',
                            name: 'Emma',
                            userId: 'user_005'
                        },
                        {
                            id: 'p_006',
                            name: 'David',
                            userId: 'user_006'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball).rules,
            score: {
                teamAScore: 21,
                teamBScore: 15,
                winner: 'A'
            },
            privacy: 'public',
            notes: 'Great match! Close game throughout.',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Upcoming competitive soccer match
        {
            id: 'match_002',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Competitive,
            teamSize: {
                label: '11v11',
                playersPerTeam: 11,
                substitutes: 5
            },
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Scheduled,
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            locationId: 'loc_soccer_central',
            privacy: 'public',
            createdBy: 'user_002',
            teams: [
                {
                    id: 'team_003',
                    name: 'Dragons',
                    players: [
                        {
                            id: 'p_007',
                            name: 'Carlos',
                            userId: 'user_007',
                            jerseyNo: '1'
                        },
                        {
                            id: 'p_008',
                            name: 'Luis',
                            userId: 'user_008',
                            jerseyNo: '10'
                        },
                        {
                            id: 'p_009',
                            name: 'Miguel',
                            userId: 'user_009',
                            jerseyNo: '9'
                        },
                        {
                            id: 'p_010',
                            name: 'Diego',
                            userId: 'user_010',
                            jerseyNo: '7'
                        }
                    ]
                },
                {
                    id: 'team_004',
                    name: 'Tigers',
                    players: [
                        {
                            id: 'p_011',
                            name: 'Paulo',
                            userId: 'user_011',
                            jerseyNo: '1'
                        },
                        {
                            id: 'p_012',
                            name: 'Antonio',
                            userId: 'user_012',
                            jerseyNo: '10'
                        },
                        {
                            id: 'p_013',
                            name: 'Fernando',
                            userId: 'user_013',
                            jerseyNo: '9'
                        },
                        {
                            id: 'p_014',
                            name: 'Roberto',
                            userId: 'user_014',
                            jerseyNo: '5'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer).rules,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Completed tennis set-based match
        {
            id: 'match_003',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: {
                label: 'Singles',
                playersPerTeam: 1,
                substitutes: 0
            },
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            locationId: 'loc_tennis_park',
            privacy: 'public',
            createdBy: 'user_003',
            teams: [
                {
                    id: 'team_005',
                    name: 'Player 1',
                    players: [
                        {
                            id: 'p_015',
                            name: 'Alex',
                            userId: 'user_015'
                        }
                    ]
                },
                {
                    id: 'team_006',
                    name: 'Player 2',
                    players: [
                        {
                            id: 'p_016',
                            name: 'Jordan',
                            userId: 'user_016'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis).rules,
            score: {
                teamAScore: 2,
                teamBScore: 1,
                setScores: [
                    [
                        6,
                        4
                    ],
                    [
                        4,
                        6
                    ],
                    [
                        6,
                        3
                    ]
                ],
                winner: 'A'
            },
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Live match (in progress)
        {
            id: 'match_004',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: {
                label: '3v3',
                playersPerTeam: 3,
                substitutes: 1
            },
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].InProgress,
            date: new Date().toISOString(),
            locationId: 'loc_basketball_eastside',
            privacy: 'public',
            createdBy: 'user_001',
            teams: [
                {
                    id: 'team_007',
                    name: 'Team A',
                    players: [
                        {
                            id: 'p_017',
                            name: 'Tom',
                            userId: 'user_017'
                        },
                        {
                            id: 'p_018',
                            name: 'Jerry',
                            userId: 'user_018'
                        }
                    ]
                },
                {
                    id: 'team_008',
                    name: 'Team B',
                    players: [
                        {
                            id: 'p_019',
                            name: 'Spike',
                            userId: 'user_019'
                        },
                        {
                            id: 'p_020',
                            name: 'Tyke',
                            userId: 'user_020'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball).rules,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        // Casual volleyball with unregistered player
        {
            id: 'match_005',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: {
                label: '6v6',
                playersPerTeam: 6,
                substitutes: 2
            },
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            locationId: 'loc_volleyball_beach',
            privacy: 'public',
            createdBy: 'user_004',
            teams: [
                {
                    id: 'team_009',
                    name: 'Team A',
                    players: [
                        {
                            id: 'p_021',
                            name: 'Lisa',
                            userId: 'user_021'
                        },
                        {
                            id: 'p_022',
                            name: 'Anna',
                            userId: 'user_022'
                        },
                        {
                            id: 'p_023',
                            name: 'Chris'
                        } // No userId - unregistered
                    ]
                },
                {
                    id: 'team_010',
                    name: 'Team B',
                    players: [
                        {
                            id: 'p_024',
                            name: 'Maria',
                            userId: 'user_023'
                        },
                        {
                            id: 'p_025',
                            name: 'Sofia',
                            userId: 'user_024'
                        },
                        {
                            id: 'p_026',
                            name: 'Nina',
                            userId: 'user_025'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball).rules,
            score: {
                teamAScore: 25,
                teamBScore: 22,
                winner: 'A'
            },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        // In-progress basketball match for live match testing
        {
            id: 'match_006',
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: defaultTeamSize,
            statIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].InProgress,
            date: new Date().toISOString(),
            locationId: 'loc_basketball_downtown',
            privacy: 'public',
            createdBy: 'user_001',
            teams: [
                {
                    id: 'team_007',
                    name: 'Warriors',
                    players: [
                        {
                            id: 'p_101',
                            name: 'Stephen',
                            userId: 'user_101',
                            jerseyNo: '30'
                        },
                        {
                            id: 'p_102',
                            name: 'Klay',
                            userId: 'user_102',
                            jerseyNo: '11'
                        },
                        {
                            id: 'p_103',
                            name: 'Draymond',
                            userId: 'user_103',
                            jerseyNo: '23'
                        },
                        {
                            id: 'p_104',
                            name: 'Andrew',
                            userId: 'user_104',
                            jerseyNo: '22'
                        },
                        {
                            id: 'p_105',
                            name: 'Kevon',
                            userId: 'user_105',
                            jerseyNo: '5'
                        }
                    ]
                },
                {
                    id: 'team_008',
                    name: 'Lakers',
                    players: [
                        {
                            id: 'p_106',
                            name: 'LeBron',
                            userId: 'user_106',
                            jerseyNo: '23'
                        },
                        {
                            id: 'p_107',
                            name: 'Anthony',
                            userId: 'user_107',
                            jerseyNo: '3'
                        },
                        {
                            id: 'p_108',
                            name: 'Austin',
                            userId: 'user_108',
                            jerseyNo: '0'
                        },
                        {
                            id: 'p_109',
                            name: 'Christian',
                            userId: 'user_109',
                            jerseyNo: '8'
                        },
                        {
                            id: 'p_110',
                            name: 'Jaxson',
                            userId: 'user_110',
                            jerseyNo: '2'
                        }
                    ]
                }
            ],
            rules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPreset"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball).rules,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
    return matches;
}
function generateMockPlayerSuggestions(locationId) {
    // Mock data: these players have played at various locations
    const allPlayers = [
        {
            id: 'p_001',
            name: 'John',
            userId: 'user_001',
            recentMatches: 5
        },
        {
            id: 'p_002',
            name: 'Michael',
            userId: 'user_002',
            recentMatches: 3
        },
        {
            id: 'p_003',
            name: 'Sarah',
            userId: 'user_003',
            recentMatches: 4
        },
        {
            id: 'p_004',
            name: 'James',
            userId: 'user_004',
            recentMatches: 6
        },
        {
            id: 'p_005',
            name: 'Emma',
            userId: 'user_005',
            recentMatches: 2
        },
        {
            id: 'p_007',
            name: 'Carlos',
            userId: 'user_007',
            recentMatches: 7
        },
        {
            id: 'p_008',
            name: 'Luis',
            userId: 'user_008',
            recentMatches: 5
        },
        {
            id: 'p_015',
            name: 'Alex',
            userId: 'user_015',
            recentMatches: 3
        },
        {
            id: 'p_017',
            name: 'Tom',
            userId: 'user_017',
            recentMatches: 4
        },
        {
            id: 'p_021',
            name: 'Lisa',
            userId: 'user_021',
            recentMatches: 8
        }
    ];
    // In a real app, this would query based on location
    // For now, return all players weighted by frequency
    return allPlayers.sort((a, b)=>b.recentMatches - a.recentMatches);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/statSchemaService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statSchemaService",
    ()=>statSchemaService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-client] (ecmascript)");
;
;
/**
 * StatSchemaService - Manages stat schemas for different sports and intensities
 */ class StatSchemaService {
    schemas = new Map();
    constructor(){
        this.initializeSchemas();
    }
    /**
   * Initialize all sport schemas
   */ initializeSchemas() {
        // Basketball Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'rebounds',
                    name: 'Rebounds',
                    abbreviation: 'REB',
                    category: 'Rebounding',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'AST',
                    category: 'Playmaking',
                    type: 'counting'
                }
            ]
        });
        // Basketball Advanced Schema (includes all Basic + additional)
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'rebounds',
                    name: 'Rebounds',
                    abbreviation: 'REB',
                    category: 'Rebounding',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'AST',
                    category: 'Playmaking',
                    type: 'counting'
                },
                {
                    id: 'steals',
                    name: 'Steals',
                    abbreviation: 'STL',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'blocks',
                    name: 'Blocks',
                    abbreviation: 'BLK',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'turnovers',
                    name: 'Turnovers',
                    abbreviation: 'TO',
                    category: 'Mistakes',
                    type: 'counting'
                },
                {
                    id: 'personalFouls',
                    name: 'Personal Fouls',
                    abbreviation: 'PF',
                    category: 'Fouls',
                    type: 'counting'
                },
                {
                    id: '3pm',
                    name: '3-Pointers Made',
                    abbreviation: '3PM',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: '3pa',
                    name: '3-Pointers Attempted',
                    abbreviation: '3PA',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: 'ftm',
                    name: 'Free Throws Made',
                    abbreviation: 'FTM',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: 'fta',
                    name: 'Free Throws Attempted',
                    abbreviation: 'FTA',
                    category: 'Shooting',
                    type: 'counting'
                }
            ]
        });
        // ===== SOCCER SCHEMAS =====
        // Soccer Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                {
                    id: 'goals',
                    name: 'Goals',
                    abbreviation: 'G',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'A',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'shotsOnTarget',
                    name: 'Shots On Target',
                    abbreviation: 'SOT',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: 'shotsOffTarget',
                    name: 'Shots Off Target',
                    abbreviation: 'SOM',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: 'fouls',
                    name: 'Fouls',
                    abbreviation: 'F',
                    category: 'Discipline',
                    type: 'counting'
                },
                {
                    id: 'yellowCards',
                    name: 'Yellow Cards',
                    abbreviation: 'YC',
                    category: 'Discipline',
                    type: 'counting'
                },
                {
                    id: 'redCards',
                    name: 'Red Cards',
                    abbreviation: 'RC',
                    category: 'Discipline',
                    type: 'counting'
                }
            ]
        });
        // Soccer Advanced Schema (includes all Basic + additional)
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Scoring (from Basic)
                {
                    id: 'goals',
                    name: 'Goals',
                    abbreviation: 'G',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'A',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Shooting (from Basic)
                {
                    id: 'shotsOnTarget',
                    name: 'Shots On Target',
                    abbreviation: 'SOT',
                    category: 'Shooting',
                    type: 'counting'
                },
                {
                    id: 'shotsOffTarget',
                    name: 'Shots Off Target',
                    abbreviation: 'SOM',
                    category: 'Shooting',
                    type: 'counting'
                },
                // Passing (Advanced)
                {
                    id: 'passesCompleted',
                    name: 'Passes Completed',
                    abbreviation: 'PC',
                    category: 'Passing',
                    type: 'counting'
                },
                {
                    id: 'passesAttempted',
                    name: 'Passes Attempted',
                    abbreviation: 'PA',
                    category: 'Passing',
                    type: 'counting'
                },
                {
                    id: 'crosses',
                    name: 'Crosses',
                    abbreviation: 'CRS',
                    category: 'Passing',
                    type: 'counting'
                },
                // Defense (Advanced)
                {
                    id: 'tackles',
                    name: 'Tackles',
                    abbreviation: 'TKL',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'interceptions',
                    name: 'Interceptions',
                    abbreviation: 'INT',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'clearances',
                    name: 'Clearances',
                    abbreviation: 'CLR',
                    category: 'Defense',
                    type: 'counting'
                },
                // Goalkeeper (Advanced)
                {
                    id: 'saves',
                    name: 'Saves',
                    abbreviation: 'SAV',
                    category: 'Goalkeeping',
                    type: 'counting'
                },
                // Discipline (from Basic)
                {
                    id: 'fouls',
                    name: 'Fouls',
                    abbreviation: 'F',
                    category: 'Discipline',
                    type: 'counting'
                },
                {
                    id: 'yellowCards',
                    name: 'Yellow Cards',
                    abbreviation: 'YC',
                    category: 'Discipline',
                    type: 'counting'
                },
                {
                    id: 'redCards',
                    name: 'Red Cards',
                    abbreviation: 'RC',
                    category: 'Discipline',
                    type: 'counting'
                },
                // Misc (Advanced)
                {
                    id: 'offsides',
                    name: 'Offsides',
                    abbreviation: 'OFF',
                    category: 'Misc',
                    type: 'counting'
                }
            ]
        });
        // ===== TENNIS SCHEMAS =====
        // Tennis Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                // Serving
                {
                    id: 'aces',
                    name: 'Aces',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'doubleFaults',
                    name: 'Double Faults',
                    abbreviation: 'DF',
                    category: 'Serving',
                    type: 'counting'
                },
                // General
                {
                    id: 'winners',
                    name: 'Winners',
                    abbreviation: 'WON',
                    category: 'General',
                    type: 'counting'
                },
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                },
                // Return
                {
                    id: 'breakPointsConverted',
                    name: 'Break Points Converted',
                    abbreviation: 'BP+',
                    category: 'Return',
                    type: 'counting'
                },
                {
                    id: 'breakPointsFaced',
                    name: 'Break Points Faced',
                    abbreviation: 'BP-',
                    category: 'Return',
                    type: 'counting'
                },
                // Points
                {
                    id: 'pointsWon',
                    name: 'Points Won',
                    abbreviation: 'PW',
                    category: 'Scoring',
                    type: 'counting'
                }
            ]
        });
        // Tennis Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Serving (Basic)
                {
                    id: 'aces',
                    name: 'Aces',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'doubleFaults',
                    name: 'Double Faults',
                    abbreviation: 'DF',
                    category: 'Serving',
                    type: 'counting'
                },
                // Serving (Advanced)
                {
                    id: 'firstServesIn',
                    name: 'First Serves In',
                    abbreviation: '1SI',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'firstServesTotal',
                    name: 'First Serves Attempted',
                    abbreviation: '1SA',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'secondServesIn',
                    name: 'Second Serves In',
                    abbreviation: '2SI',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'secondServesTotal',
                    name: 'Second Serves Attempted',
                    abbreviation: '2SA',
                    category: 'Serving',
                    type: 'counting'
                },
                // General (Basic)
                {
                    id: 'winners',
                    name: 'Winners',
                    abbreviation: 'WON',
                    category: 'General',
                    type: 'counting'
                },
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                },
                // Net (Advanced)
                {
                    id: 'netPointsWon',
                    name: 'Net Points Won',
                    abbreviation: 'NPW',
                    category: 'Net',
                    type: 'counting'
                },
                {
                    id: 'netPointsTotal',
                    name: 'Net Points Played',
                    abbreviation: 'NPT',
                    category: 'Net',
                    type: 'counting'
                },
                // Return (Basic)
                {
                    id: 'breakPointsConverted',
                    name: 'Break Points Converted',
                    abbreviation: 'BP+',
                    category: 'Return',
                    type: 'counting'
                },
                {
                    id: 'breakPointsFaced',
                    name: 'Break Points Faced',
                    abbreviation: 'BP-',
                    category: 'Return',
                    type: 'counting'
                },
                // Points
                {
                    id: 'pointsWon',
                    name: 'Total Points Won',
                    abbreviation: 'PW',
                    category: 'Scoring',
                    type: 'counting'
                }
            ]
        });
        // ===== BADMINTON SCHEMAS =====
        // Badminton Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Badminton, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Badminton,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                // Scoring
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Serving
                {
                    id: 'aces',
                    name: 'Service Winners (Aces)',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                // Attack
                {
                    id: 'smashes',
                    name: 'Smashes',
                    abbreviation: 'SMH',
                    category: 'Attack',
                    type: 'counting'
                },
                // Net
                {
                    id: 'netShots',
                    name: 'Net Shot Winners',
                    abbreviation: 'NET',
                    category: 'Net',
                    type: 'counting'
                },
                // General
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                }
            ]
        });
        // Badminton Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Badminton, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Badminton,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Scoring (Basic)
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Serving (Basic)
                {
                    id: 'aces',
                    name: 'Service Winners (Aces)',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                // Attack (Basic + Advanced)
                {
                    id: 'smashes',
                    name: 'Smashes',
                    abbreviation: 'SMH',
                    category: 'Attack',
                    type: 'counting'
                },
                {
                    id: 'clears',
                    name: 'Clears',
                    abbreviation: 'CLR',
                    category: 'Attack',
                    type: 'counting'
                },
                {
                    id: 'drops',
                    name: 'Drops',
                    abbreviation: 'DRP',
                    category: 'Attack',
                    type: 'counting'
                },
                // Net (Basic + Advanced)
                {
                    id: 'netShots',
                    name: 'Net Shot Winners',
                    abbreviation: 'NET',
                    category: 'Net',
                    type: 'counting'
                },
                {
                    id: 'blocks',
                    name: 'Blocks',
                    abbreviation: 'BLK',
                    category: 'Net',
                    type: 'counting'
                },
                {
                    id: 'lifts',
                    name: 'Lifts',
                    abbreviation: 'LFT',
                    category: 'Net',
                    type: 'counting'
                },
                // Defense (Advanced)
                {
                    id: 'receipts',
                    name: 'Receipts',
                    abbreviation: 'RCP',
                    category: 'Defense',
                    type: 'counting'
                },
                // General (Basic + Advanced)
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                },
                {
                    id: 'netErrors',
                    name: 'Net Errors',
                    abbreviation: 'NE',
                    category: 'General',
                    type: 'counting'
                }
            ]
        });
        // ===== PICKLEBALL SCHEMAS =====
        // Pickleball Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Pickleball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Pickleball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                // Scoring
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Serving
                {
                    id: 'aces',
                    name: 'Service Winners (Aces)',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                // General
                {
                    id: 'winners',
                    name: 'Winners',
                    abbreviation: 'WON',
                    category: 'General',
                    type: 'counting'
                },
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                },
                // Net
                {
                    id: 'dinks',
                    name: 'Dinks',
                    abbreviation: 'DNK',
                    category: 'Net',
                    type: 'counting'
                },
                {
                    id: 'volleys',
                    name: 'Volley Winners',
                    abbreviation: 'VOL',
                    category: 'Net',
                    type: 'counting'
                }
            ]
        });
        // Pickleball Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Pickleball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Pickleball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Scoring (Basic)
                {
                    id: 'points',
                    name: 'Points',
                    abbreviation: 'PTS',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Serving (Basic)
                {
                    id: 'aces',
                    name: 'Service Winners (Aces)',
                    abbreviation: 'ACE',
                    category: 'Serving',
                    type: 'counting'
                },
                // Serving (Advanced)
                {
                    id: 'faultServes',
                    name: 'Fault Serves',
                    abbreviation: 'FS',
                    category: 'Serving',
                    type: 'counting'
                },
                // General (Basic + Advanced)
                {
                    id: 'winners',
                    name: 'Winners',
                    abbreviation: 'WON',
                    category: 'General',
                    type: 'counting'
                },
                {
                    id: 'unforcedErrors',
                    name: 'Unforced Errors',
                    abbreviation: 'UE',
                    category: 'General',
                    type: 'counting'
                },
                // Net (Basic + Advanced)
                {
                    id: 'dinks',
                    name: 'Dinks',
                    abbreviation: 'DNK',
                    category: 'Net',
                    type: 'counting'
                },
                {
                    id: 'volleys',
                    name: 'Volley Winners',
                    abbreviation: 'VOL',
                    category: 'Net',
                    type: 'counting'
                },
                // Advanced
                {
                    id: 'thirdShotDrops',
                    name: 'Third Shot Drops',
                    abbreviation: 'TSD',
                    category: 'Advanced',
                    type: 'counting'
                },
                {
                    id: 'resets',
                    name: 'Resets',
                    abbreviation: 'RST',
                    category: 'Advanced',
                    type: 'counting'
                },
                {
                    id: 'ernes',
                    name: 'Ernes',
                    abbreviation: 'ERN',
                    category: 'Advanced',
                    type: 'counting'
                },
                {
                    id: 'punchVolley',
                    name: 'Punch Volleys',
                    abbreviation: 'PV',
                    category: 'Advanced',
                    type: 'counting'
                }
            ]
        });
        // ===== VOLLEYBALL SCHEMAS =====
        // Volleyball Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                {
                    id: 'kills',
                    name: 'Kills',
                    abbreviation: 'K',
                    category: 'Scoring',
                    type: 'counting'
                },
                {
                    id: 'aces',
                    name: 'Aces',
                    abbreviation: 'A',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'blocks',
                    name: 'Blocks',
                    abbreviation: 'B',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'digs',
                    name: 'Digs',
                    abbreviation: 'D',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'AS',
                    category: 'Playmaking',
                    type: 'counting'
                },
                {
                    id: 'errors',
                    name: 'Errors',
                    abbreviation: 'E',
                    category: 'Mistakes',
                    type: 'counting'
                }
            ]
        });
        // Volleyball Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Scoring (Basic)
                {
                    id: 'kills',
                    name: 'Kills',
                    abbreviation: 'K',
                    category: 'Scoring',
                    type: 'counting'
                },
                // Serving (Basic + Advanced)
                {
                    id: 'aces',
                    name: 'Aces',
                    abbreviation: 'A',
                    category: 'Serving',
                    type: 'counting'
                },
                {
                    id: 'serviceErrors',
                    name: 'Service Errors',
                    abbreviation: 'SE',
                    category: 'Serving',
                    type: 'counting'
                },
                // Defense (Basic + Advanced)
                {
                    id: 'blocks',
                    name: 'Blocks',
                    abbreviation: 'B',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'digs',
                    name: 'Digs',
                    abbreviation: 'D',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'blockErrors',
                    name: 'Block Errors',
                    abbreviation: 'BE',
                    category: 'Defense',
                    type: 'counting'
                },
                // Playmaking (Basic + Advanced)
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'AS',
                    category: 'Playmaking',
                    type: 'counting'
                },
                {
                    id: 'receptionErrors',
                    name: 'Reception Errors',
                    abbreviation: 'RE',
                    category: 'Playmaking',
                    type: 'counting'
                },
                {
                    id: 'attackAttempts',
                    name: 'Attack Attempts',
                    abbreviation: 'AA',
                    category: 'Scoring',
                    type: 'counting'
                }
            ]
        });
        // ===== BASEBALL SCHEMAS =====
        // Baseball Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Baseball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Baseball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                // Batting
                {
                    id: 'atBats',
                    name: 'At Bats',
                    abbreviation: 'AB',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'hits',
                    name: 'Hits',
                    abbreviation: 'H',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'runs',
                    name: 'Runs',
                    abbreviation: 'R',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'rbi',
                    name: 'RBIs',
                    abbreviation: 'RBI',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'homeRuns',
                    name: 'Home Runs',
                    abbreviation: 'HR',
                    category: 'Batting',
                    type: 'counting'
                },
                // Pitching
                {
                    id: 'winsPitching',
                    name: 'Wins (Pitcher)',
                    abbreviation: 'W',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'strikeouts',
                    name: 'Strikeouts',
                    abbreviation: 'K',
                    category: 'Pitching',
                    type: 'counting'
                }
            ]
        });
        // Baseball Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Baseball, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Baseball,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Batting (Basic + Advanced)
                {
                    id: 'atBats',
                    name: 'At Bats',
                    abbreviation: 'AB',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'hits',
                    name: 'Hits',
                    abbreviation: 'H',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'runs',
                    name: 'Runs',
                    abbreviation: 'R',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'rbi',
                    name: 'RBIs',
                    abbreviation: 'RBI',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'homeRuns',
                    name: 'Home Runs',
                    abbreviation: 'HR',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'walks',
                    name: 'Walks',
                    abbreviation: 'BB',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'strikeoutsBatting',
                    name: 'Strikeouts (Batter)',
                    abbreviation: 'SO',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'doubles',
                    name: 'Doubles',
                    abbreviation: '2B',
                    category: 'Batting',
                    type: 'counting'
                },
                {
                    id: 'triples',
                    name: 'Triples',
                    abbreviation: '3B',
                    category: 'Batting',
                    type: 'counting'
                },
                // Pitching (Basic + Advanced)
                {
                    id: 'winsPitching',
                    name: 'Wins (Pitcher)',
                    abbreviation: 'W',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'losses',
                    name: 'Losses',
                    abbreviation: 'L',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'inningsPitched',
                    name: 'Innings Pitched',
                    abbreviation: 'IP',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'earnedRuns',
                    name: 'Earned Runs',
                    abbreviation: 'ER',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'strikeouts',
                    name: 'Strikeouts',
                    abbreviation: 'K',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'walks',
                    name: 'Walks (Pitcher)',
                    abbreviation: 'BB',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'hitsAllowed',
                    name: 'Hits Allowed',
                    abbreviation: 'H',
                    category: 'Pitching',
                    type: 'counting'
                },
                {
                    id: 'homeRunsAllowed',
                    name: 'Home Runs Allowed',
                    abbreviation: 'HR',
                    category: 'Pitching',
                    type: 'counting'
                },
                // Fielding
                {
                    id: 'errors',
                    name: 'Errors',
                    abbreviation: 'E',
                    category: 'Fielding',
                    type: 'counting'
                },
                {
                    id: 'putouts',
                    name: 'Putouts',
                    abbreviation: 'PO',
                    category: 'Fielding',
                    type: 'counting'
                },
                {
                    id: 'assists',
                    name: 'Assists',
                    abbreviation: 'A',
                    category: 'Fielding',
                    type: 'counting'
                }
            ]
        });
        // ===== AMERICAN FOOTBALL SCHEMAS =====
        // American Football Basic Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].American_Football, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].American_Football,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
            statKeys: [
                // Offense
                {
                    id: 'passingYards',
                    name: 'Passing Yards',
                    abbreviation: 'PASS YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'passingTouchdowns',
                    name: 'Passing Touchdowns',
                    abbreviation: 'PASS TD',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'rushingYards',
                    name: 'Rushing Yards',
                    abbreviation: 'RUSH YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'rushingTouchdowns',
                    name: 'Rushing Touchdowns',
                    abbreviation: 'RUSH TD',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'receivingYards',
                    name: 'Receiving Yards',
                    abbreviation: 'REC YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'receivingTouchdowns',
                    name: 'Receiving Touchdowns',
                    abbreviation: 'REC TD',
                    category: 'Offense',
                    type: 'counting'
                },
                // Defense
                {
                    id: 'tackles',
                    name: 'Tackles',
                    abbreviation: 'TKL',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'sacks',
                    name: 'Sacks',
                    abbreviation: 'SACK',
                    category: 'Defense',
                    type: 'counting'
                },
                // Mistakes
                {
                    id: 'interceptions',
                    name: 'Interceptions',
                    abbreviation: 'INT',
                    category: 'Mistakes',
                    type: 'counting'
                },
                {
                    id: 'fumbles',
                    name: 'Fumbles',
                    abbreviation: 'FUM',
                    category: 'Mistakes',
                    type: 'counting'
                }
            ]
        });
        // American Football Advanced Schema
        this.schemas.set(this.getSchemaKey(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].American_Football, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced), {
            sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].American_Football,
            intensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced,
            statKeys: [
                // Offense (Basic + Advanced)
                {
                    id: 'passingYards',
                    name: 'Passing Yards',
                    abbreviation: 'PASS YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'passingTouchdowns',
                    name: 'Passing Touchdowns',
                    abbreviation: 'PASS TD',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'interceptions',
                    name: 'Interceptions Thrown',
                    abbreviation: 'INT',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'rushingYards',
                    name: 'Rushing Yards',
                    abbreviation: 'RUSH YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'rushingTouchdowns',
                    name: 'Rushing Touchdowns',
                    abbreviation: 'RUSH TD',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'receptions',
                    name: 'Receptions',
                    abbreviation: 'REC',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'receivingYards',
                    name: 'Receiving Yards',
                    abbreviation: 'REC YDS',
                    category: 'Offense',
                    type: 'counting'
                },
                {
                    id: 'receivingTouchdowns',
                    name: 'Receiving Touchdowns',
                    abbreviation: 'REC TD',
                    category: 'Offense',
                    type: 'counting'
                },
                // Defense (Basic + Advanced)
                {
                    id: 'tackles',
                    name: 'Tackles',
                    abbreviation: 'TKL',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'sacks',
                    name: 'Sacks',
                    abbreviation: 'SACK',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'defensiveInterceptions',
                    name: 'Interceptions',
                    abbreviation: 'INT',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'fumblesRecovered',
                    name: 'Fumbles Recovered',
                    abbreviation: 'FR',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'passesDefended',
                    name: 'Passes Defended',
                    abbreviation: 'PD',
                    category: 'Defense',
                    type: 'counting'
                },
                {
                    id: 'forcedfumbles',
                    name: 'Forced Fumbles',
                    abbreviation: 'FF',
                    category: 'Defense',
                    type: 'counting'
                },
                // Kicking
                {
                    id: 'fieldGoalsMade',
                    name: 'Field Goals Made',
                    abbreviation: 'FG',
                    category: 'Kicking',
                    type: 'counting'
                },
                {
                    id: 'fieldGoalsAttempted',
                    name: 'Field Goals Attempted',
                    abbreviation: 'FGA',
                    category: 'Kicking',
                    type: 'counting'
                },
                {
                    id: 'extraPointsMade',
                    name: 'Extra Points Made',
                    abbreviation: 'XP',
                    category: 'Kicking',
                    type: 'counting'
                },
                // Mistakes
                {
                    id: 'fumbles',
                    name: 'Fumbles',
                    abbreviation: 'FUM',
                    category: 'Mistakes',
                    type: 'counting'
                }
            ]
        });
    }
    /**
   * Get schema for a sport and intensity
   */ getSchema(sport, intensity) {
        const key = this.getSchemaKey(sport, intensity);
        return this.schemas.get(key) || null;
    }
    /**
   * Get all stat keys for a sport (union of all intensities)
   */ getAllStatKeys(sport) {
        const allKeys = new Map();
        // Collect all keys from all intensities
        this.schemas.forEach((schema)=>{
            if (schema.sport === sport) {
                schema.statKeys.forEach((key)=>{
                    allKeys.set(key.id, key);
                });
            }
        });
        return Array.from(allKeys.values());
    }
    /**
   * Get stat keys by category
   */ getStatKeysByCategory(sport, intensity, category) {
        const schema = this.getSchema(sport, intensity);
        if (!schema) return [];
        return schema.statKeys.filter((key)=>key.category === category);
    }
    /**
   * Get all categories for a sport/intensity
   */ getCategories(sport, intensity) {
        const schema = this.getSchema(sport, intensity);
        if (!schema) return [];
        const categories = new Set();
        schema.statKeys.forEach((key)=>{
            categories.add(key.category);
        });
        return Array.from(categories);
    }
    /**
   * Generate key for schema lookup
   */ getSchemaKey(sport, intensity) {
        return `${sport}_${intensity}`;
    }
}
const statSchemaService = new StatSchemaService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/statEntryService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statEntryService",
    ()=>statEntryService
]);
/**
 * StatEntryService - Handles saving, retrieving, and validating match stats
 * Data is persisted in localStorage under "matchStats_${matchId}" keys
 */ class StatEntryService {
    STORAGE_PREFIX = 'athlee_matchStats_';
    /**
   * Save match stats to storage
   */ saveMatchStats(matchId, playerStats) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const matchStats = {
            id: `stats_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            matchId: matchId,
            playerStats: playerStats,
            teamStats: [],
            recordedAt: new Date().toISOString(),
            recordedBy: 'current-user'
        };
        try {
            const key = this.getStorageKey(matchId);
            localStorage.setItem(key, JSON.stringify(matchStats));
            return matchStats;
        } catch (error) {
            console.error('Failed to save match stats:', error);
            throw error;
        }
    }
    /**
   * Get match stats from storage
   */ getMatchStats(matchId) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const key = this.getStorageKey(matchId);
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to retrieve match stats:', error);
            return null;
        }
    }
    /**
   * Delete match stats
   */ deleteMatchStats(matchId) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const key = this.getStorageKey(matchId);
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to delete match stats:', error);
            return false;
        }
    }
    /**
   * Validate player stats against schema
   */ validateStats(playerStats, schema) {
        const errors = [];
        // Check each player
        playerStats.forEach((playerStat)=>{
            if (!playerStat.playerId) {
                errors.push(`Player stat missing playerId`);
                return;
            }
            // Check each stat value
            Object.entries(playerStat.values).forEach(([statKey, value])=>{
                // Value must be a non-negative integer
                if (typeof value !== 'number') {
                    errors.push(`Player ${playerStat.playerName}: ${statKey} must be a number`);
                } else if (value < 0) {
                    errors.push(`Player ${playerStat.playerName}: ${statKey} cannot be negative`);
                } else if (!Number.isInteger(value)) {
                    errors.push(`Player ${playerStat.playerName}: ${statKey} must be an integer`);
                }
                // Check if stat key exists in schema
                const statKeyExists = schema.statKeys.some((key)=>key.id === statKey);
                if (!statKeyExists) {
                    errors.push(`Player ${playerStat.playerName}: ${statKey} is not valid for this schema`);
                }
            });
        // Check that all required stats are present (optional - could enforce this)
        // For now, allow partial stats
        });
        return {
            valid: errors.length === 0,
            errors
        };
    }
    /**
   * Validate a single stat value
   */ validateStatValue(value) {
        return typeof value === 'number' && value >= 0 && Number.isInteger(value);
    }
    /**
   * Initialize player stats with zeros
   */ initializePlayerStats(playerIds, schema) {
        return playerIds.map((player)=>{
            const values = {};
            schema.statKeys.forEach((key)=>{
                values[key.id] = 0;
            });
            return {
                playerId: player.id,
                playerName: player.name,
                values: values
            };
        });
    }
    /**
   * Get storage key for match stats
   */ getStorageKey(matchId) {
        return `${this.STORAGE_PREFIX}${matchId}`;
    }
}
const statEntryService = new StatEntryService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/mockStatData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateMockStatsForMatch",
    ()=>generateMockStatsForMatch,
    "getMatchesNeedingStats",
    ()=>getMatchesNeedingStats,
    "getMatchesWithStats",
    ()=>getMatchesWithStats,
    "initializeMockStats",
    ()=>initializeMockStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statSchemaService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/statSchemaService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/statEntryService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)");
;
;
;
;
/**
 * Generate realistic random stat values based on sport and stat key
 */ function generateRandomStatValue(sport, statKey) {
    const ranges = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball]: {
            points: [
                8,
                25
            ],
            rebounds: [
                2,
                12
            ],
            assists: [
                1,
                8
            ],
            steals: [
                0,
                3
            ],
            blocks: [
                0,
                2
            ],
            turnovers: [
                1,
                5
            ],
            personalFouls: [
                1,
                4
            ],
            threePointsMade: [
                0,
                4
            ],
            threePointsAttempted: [
                2,
                10
            ],
            freeThrowsMade: [
                0,
                6
            ],
            freeThrowsAttempted: [
                0,
                8
            ]
        }
    };
    const sportRanges = ranges[sport] || {};
    const [min, max] = sportRanges[statKey] || [
        0,
        5
    ];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateMockStatsForMatch(match) {
    // Only generate stats for completed matches
    if (match.status !== __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed) {
        return null;
    }
    // Get the appropriate stat schema
    const schema = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statSchemaService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statSchemaService"].getSchema(match.sport, match.statIntensity);
    if (!schema) {
        console.warn(`No schema found for ${match.sport} / ${match.statIntensity}`);
        return null;
    }
    // Initialize player stats for all players in both teams
    const allPlayers = match.teams.flatMap((team)=>team.players.map((p)=>({
                id: p.id,
                name: p.name
            })));
    const playerStats = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statEntryService"].initializePlayerStats(allPlayers, schema);
    // Generate random values for each stat
    playerStats.forEach((player)=>{
        schema.statKeys.forEach((stat)=>{
            player.values[stat.id] = generateRandomStatValue(match.sport, stat.id);
        });
    });
    // Save the stats to localStorage
    const savedStats = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statEntryService"].saveMatchStats(match.id, playerStats);
    return savedStats;
}
function initializeMockStats(completedMatches) {
    completedMatches.forEach((match)=>{
        // Only generate if no stats already exist
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statEntryService"].getMatchStats(match.id)) {
            generateMockStatsForMatch(match);
        }
    });
}
function getMatchesWithStats(matches) {
    return matches.filter((m)=>m.status === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed && __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statEntryService"].getMatchStats(m.id));
}
function getMatchesNeedingStats(matches) {
    return matches.filter((m)=>m.status === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed && !__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$statEntryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statEntryService"].getMatchStats(m.id));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/lib/matchService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "matchService",
    ()=>matchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockMatches$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockMatches.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockStatData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockStatData.ts [app-client] (ecmascript)");
;
;
;
;
/**
 * MatchService - Handles all match-related operations
 * Data is persisted in localStorage under the "athlee_matches" key
 */ class MatchService {
    STORAGE_KEY = 'athlee_matches';
    initialized = false;
    /**
   * Initialize mock data if storage is empty
   */ initializeMockData() {
        if (this.initialized || ("TURBOPACK compile-time value", "object") === 'undefined') return;
        try {
            const matches = this.getAllMatches();
            // Only initialize if empty
            if (matches.length === 0) {
                const mockMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockMatches$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMockMatches"])();
                this.saveMatches(mockMatches);
            }
            // Initialize mock stats for completed matches
            const allMatches = this.getAllMatches();
            const completedMatches = allMatches.filter((m)=>m.status === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockStatData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeMockStats"])(completedMatches);
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize mock match data:', error);
        }
    }
    /**
   * Get all matches from storage
   */ getAllMatches() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch  {
            return [];
        }
    }
    /**
   * Save matches to storage
   */ saveMatches(matches) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(matches));
        } catch (error) {
            console.error('Failed to save matches:', error);
        }
    }
    /**
   * Create a new match
   */ createMatch(matchData) {
        const matches = this.getAllMatches();
        const newMatch = {
            id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sport: matchData.sport || __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            type: matchData.type || __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchType"].Single,
            mode: matchData.mode || __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
            teamSize: matchData.teamSize || {
                label: '5v5',
                playersPerTeam: 5,
                substitutes: 3
            },
            statIntensity: matchData.statIntensity || 'Basic',
            status: matchData.status || __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Scheduled,
            date: matchData.date || new Date().toISOString(),
            locationId: matchData.locationId,
            privacy: matchData.privacy || 'public',
            createdBy: matchData.createdBy || 'unknown',
            teams: matchData.teams || [],
            rules: matchData.rules || this.getDefaultRules(),
            officials: matchData.officials,
            schedule: matchData.schedule,
            score: matchData.score,
            notes: matchData.notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        matches.push(newMatch);
        this.saveMatches(matches);
        return newMatch;
    }
    /**
   * Update an existing match
   */ updateMatch(matchId, updates) {
        const matches = this.getAllMatches();
        const index = matches.findIndex((m)=>m.id === matchId);
        if (index === -1) return null;
        const updated = {
            ...matches[index],
            ...updates,
            id: matchId,
            updatedAt: new Date().toISOString()
        };
        matches[index] = updated;
        this.saveMatches(matches);
        return updated;
    }
    /**
   * Get a single match by ID
   */ getMatch(matchId) {
        const matches = this.getAllMatches();
        return matches.find((m)=>m.id === matchId) || null;
    }
    /**
   * Get matches with optional filters
   */ getMatches(filters) {
        let matches = this.getAllMatches();
        if (!filters) return matches;
        // Filter by user participation
        if (filters.userId) {
            matches = matches.filter((m)=>m.createdBy === filters.userId || m.teams.some((t)=>t.players.some((p)=>p.userId === filters.userId)));
        }
        // Filter by creator
        if (filters.createdBy) {
            matches = matches.filter((m)=>m.createdBy === filters.createdBy);
        }
        // Filter by sport
        if (filters.sport) {
            matches = matches.filter((m)=>m.sport === filters.sport);
        }
        // Filter by status
        if (filters.status) {
            matches = matches.filter((m)=>m.status === filters.status);
        }
        // Filter by location
        if (filters.locationId) {
            matches = matches.filter((m)=>m.locationId === filters.locationId);
        }
        // Filter by date range
        if (filters.from) {
            matches = matches.filter((m)=>new Date(m.date) >= new Date(filters.from));
        }
        if (filters.to) {
            matches = matches.filter((m)=>new Date(m.date) <= new Date(filters.to));
        }
        return matches;
    }
    /**
   * Delete a match (creator only - not enforced here)
   */ deleteMatch(matchId) {
        const matches = this.getAllMatches();
        const filtered = matches.filter((m)=>m.id !== matchId);
        if (filtered.length === matches.length) return false;
        this.saveMatches(filtered);
        return true;
    }
    /**
   * Log match result (complete a match with score)
   */ logMatchResult(matchId, score) {
        const match = this.getMatch(matchId);
        if (!match) return null;
        // Determine winner
        let winner;
        if (score.teamAScore > score.teamBScore) {
            winner = 'A';
        } else if (score.teamBScore > score.teamAScore) {
            winner = 'B';
        }
        return this.updateMatch(matchId, {
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].Completed,
            score: {
                ...score,
                winner
            }
        });
    }
    /**
   * Start a live match
   */ startLiveMatch(matchId) {
        return this.updateMatch(matchId, {
            status: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchStatus"].InProgress,
            date: new Date().toISOString()
        });
    }
    /**
   * Get default rules for a sport/type combination
   */ getDefaultRules(sport, type) {
        // Get default preset for the sport, or use a basic basketball preset
        const { getDefaultPreset } = __turbopack_context__.r("[project]/Athlee/apps/web/src/lib/mockRulePresets.ts [app-client] (ecmascript)");
        if (!sport) {
            // Fallback to basketball defaults
            return {
                presetName: 'Custom',
                gameFormat: 'timed',
                periodStructure: 'quarters',
                periodDuration: 10,
                overtimeFormat: 'none',
                shotClock: 'none',
                pointsInside: 2,
                pointsOutside: 3,
                freeThrowValue: 1,
                personalFoulLimit: 'none',
                teamFoulLimit: 'none',
                bonusAfter: 'none',
                technicalFoulValue: 'none',
                flagrantFoulPenalty: 'none',
                backcourt: 'none',
                threeSecondViolation: 'none',
                goaltendingAllowed: false,
                travelingCalled: false,
                doubleDribbleCalled: false,
                timeoutStructure: 'none',
                substitutions: 'unlimited',
                shotClockResetAfter: 'none',
                jumpBallRule: 'tipoff',
                houseRules: []
            };
        }
        return getDefaultPreset(sport).rules;
    }
    /**
   * Validate match data before creation
   */ validateMatch(matchData) {
        const errors = {};
        if (!matchData.sport) {
            errors.sport = 'Sport is required';
        }
        if (!matchData.type) {
            errors.type = 'Match type is required';
        }
        if (!matchData.teams || matchData.teams.length < 2) {
            errors.teams = 'At least 2 teams are required';
        }
        // Validate each team has players
        if (matchData.teams) {
            matchData.teams.forEach((team, index)=>{
                if (!team.players || team.players.length === 0) {
                    errors[`team_${index}`] = `Team ${team.name || index + 1} must have at least one player`;
                }
                // For competitive, check jersey numbers
                if (matchData.mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatchMode"].Competitive) {
                    team.players.forEach((player, pIndex)=>{
                        if (!player.jerseyNo) {
                            errors[`jersey_${index}_${pIndex}`] = `Jersey number required for ${player.name}`;
                        }
                    });
                }
            });
        }
        return errors;
    }
}
const matchService = new MatchService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Athlee/apps/web/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthContext",
    ()=>AuthContext,
    "AuthProvider",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$matchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/matchService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * AuthContext
 * 
 * React Context for managing global authentication state and providing
 * authentication methods throughout the application.
 * 
 * Features:
 * - User authentication state management
 * - Registration and login flows
 * - Token management and session validation
 * - Type-safe authentication methods
 * - Account type helpers
 * 
 * Code Reviewers: This context is the central authentication hub.
 * All authentication operations flow through here, making it a key
 * integration point for adding logging, analytics, or additional validation.
 */ 'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    // ===== STATE MANAGEMENT =====
    /** Current authenticated user, null if not authenticated */ const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /** Loading state during auth initialization and operations */ const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    /** Magic link flow state (for email-based authentication) */ const [magicLinkState, setMagicLinkState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ===== INITIALIZATION =====
    /**
   * Initialize authentication state on mount
   * 
   * - Initialize mock database with demo data
   * - Checks if user was previously authenticated
   * - Validates auth token if present
   * - Restores session if valid
   * - Sets loading to false when complete
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": ()=>{
                    try {
                        // Initialize mock database on first load
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeMockDatabase"])();
                        // Initialize mock match data and stats
                        __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$matchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchService"].initializeMockData();
                        // Try to restore user session from storage
                        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
                        if (currentUser && __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAuthenticated()) {
                            setUser(currentUser);
                        } else {
                            // Clear invalid auth data
                            __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
                            setUser(null);
                        }
                    } catch (error) {
                        console.error('Failed to initialize authentication:', error);
                        setUser(null);
                    } finally{
                        // Always set loading to false
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], []);
    // ===== AUTHENTICATION METHODS =====
    /**
   * Register a new Player account
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.registerPlayer()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * @param data - Player registration data
   * @throws Error if registration fails
   */ const registerPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[registerPlayer]": async (data)=>{
            setIsLoading(true);
            try {
                const newUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].registerPlayer(data);
                setUser(newUser);
                console.log('Player registered successfully:', newUser.username);
            } catch (error) {
                console.error('Player registration failed:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[registerPlayer]"], []);
    /**
   * Register a new Business account
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.registerBusiness()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * @param data - Business registration data
   * @throws Error if registration fails
   */ const registerBusiness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[registerBusiness]": async (data)=>{
            setIsLoading(true);
            try {
                const newUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].registerBusiness(data);
                setUser(newUser);
                console.log('Business registered successfully:', newUser.username);
            } catch (error) {
                console.error('Business registration failed:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[registerBusiness]"], []);
    /**
   * Login with email (simplified for demo)
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.login()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * In production, this would also accept password and use API call.
   * 
   * @param email - User email
   * @throws Error if login fails
   */ const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email)=>{
            setIsLoading(true);
            try {
                const authenticatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login(email);
                setUser(authenticatedUser);
                console.log('User logged in successfully:', authenticatedUser.email);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[login]"], []);
    /**
   * Send magic link for passwordless authentication
   * 
   * Code Reviewers:
   * - Currently a stub for future implementation
   * - Would send email with verification link
   * - Updates magicLinkState to track flow
   * 
   * @param email - Email to send magic link to
   */ const sendMagicLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[sendMagicLink]": async (email)=>{
            setIsLoading(true);
            try {
                // Validate email exists
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].validateEmail(email)) {
                    throw new Error('Invalid email format');
                }
                // TODO: Call backend API to send magic link
                // const response = await fetch('/api/auth/magic-link', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ email })
                // });
                // For now, just update state
                setMagicLinkState({
                    email,
                    sentAt: new Date().toISOString(),
                    verified: false
                });
                console.log('Magic link sent to:', email);
            } catch (error) {
                console.error('Failed to send magic link:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[sendMagicLink]"], []);
    /**
   * Verify magic link token
   * 
   * Code Reviewers:
   * - Currently a stub for future implementation
   * - Would validate token against backend
   * - Authenticates user on success
   * 
   * @param email - Email that received magic link
   * @param token - Token from magic link
   * @returns true if verified and authenticated
   */ const verifyMagicLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[verifyMagicLink]": async (email, token)=>{
            setIsLoading(true);
            try {
                // TODO: Call backend API to verify magic link
                // const response = await fetch('/api/auth/verify-magic-link', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ email, token })
                // });
                // For now, just clear state
                setMagicLinkState(null);
                return true;
            } catch (error) {
                console.error('Failed to verify magic link:', error);
                return false;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[verifyMagicLink]"], []);
    /**
   * Create a temporary Visitor account
   * 
   * Visitor accounts have limited access and no persistent data.
   * Used for anonymous browsing and exploration.
   */ const createVisitor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[createVisitor]": async ()=>{
            setIsLoading(true);
            try {
                const visitorUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].createVisitor();
                setUser(visitorUser);
                console.log('Visitor session created');
            } catch (error) {
                console.error('Failed to create visitor session:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[createVisitor]"], []);
    /**
   * Logout current user
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.logout()
   * 3. Clear user state
   * 4. Clear magic link state
   */ const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            setIsLoading(true);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
                setUser(null);
                setMagicLinkState(null);
                console.log('User logged out');
            } catch (error) {
                console.error('Logout failed:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[logout]"], []);
    // ===== HELPER METHODS =====
    /**
   * Check if current user is a Visitor
   * Visitors have view-only access
   */ const isVisitor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[isVisitor]": ()=>{
            return user?.accountType === 'Visitor';
        }
    }["AuthProvider.useCallback[isVisitor]"], [
        user
    ]);
    /**
   * Check if current user is a Player
   * Players are individual users (athletes, enthusiasts)
   */ const isPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[isPlayer]": ()=>{
            return user?.accountType === 'Player';
        }
    }["AuthProvider.useCallback[isPlayer]"], [
        user
    ]);
    /**
   * Check if current user is a Business
   * Businesses are venues, academies, clubs, brands
   */ const isBusiness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[isBusiness]": ()=>{
            return user?.accountType === 'Business';
        }
    }["AuthProvider.useCallback[isBusiness]"], [
        user
    ]);
    /**
   * Check if current user is authenticated (not just a visitor)
   */ const isRegular = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[isRegular]": ()=>{
            return isPlayer() || isBusiness();
        }
    }["AuthProvider.useCallback[isRegular]"], [
        isPlayer,
        isBusiness
    ]);
    /**
   * Get available tabs based on account type
   * 
   * Different account types have different available features:
   * - Player: feed, explore, messages, profile
   * - Business: dashboard, bookings, messages, settings
   * - Visitor: explore only
   */ const getAvailableTabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[getAvailableTabs]": ()=>{
            if (!user) return [];
            if (isPlayer()) {
                return [
                    'feed',
                    'explore',
                    'messages',
                    'profile'
                ];
            }
            if (isBusiness()) {
                return [
                    'dashboard',
                    'bookings',
                    'messages',
                    'profile'
                ];
            }
            // Visitor
            return [
                'explore'
            ];
        }
    }["AuthProvider.useCallback[getAvailableTabs]"], [
        user,
        isPlayer,
        isBusiness
    ]);
    /**
   * Check if user can access a specific feature
   * 
   * Feature access varies by account type:
   * - Players can: view feed, explore, message, edit profile
   * - Businesses can: manage bookings, send bookings, edit business info
   * - Visitors can: explore only
   */ const canAccessFeature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[canAccessFeature]": (feature)=>{
            if (!user) return false;
            if (isVisitor()) {
                return feature === 'explore';
            }
            if (isPlayer()) {
                return [
                    'feed',
                    'explore',
                    'messages',
                    'profile',
                    'edit-profile'
                ].includes(feature);
            }
            if (isBusiness()) {
                return [
                    'dashboard',
                    'bookings',
                    'messages',
                    'profile',
                    'edit-business'
                ].includes(feature);
            }
            return false;
        }
    }["AuthProvider.useCallback[canAccessFeature]"], [
        user,
        isVisitor,
        isPlayer,
        isBusiness
    ]);
    // ===== CONTEXT VALUE =====
    const contextValue = {
        // State
        user,
        isAuthenticated: user !== null && __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAuthenticated(),
        isLoading,
        // Auth methods
        registerPlayer,
        registerBusiness,
        login,
        logout,
        sendMagicLink,
        verifyMagicLink,
        magicLinkState,
        createVisitor,
        // Helper methods
        isVisitor,
        isPlayer,
        isBusiness,
        isRegular,
        getAvailableTabs,
        canAccessFeature
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/Athlee/apps/web/src/contexts/AuthContext.tsx",
        lineNumber: 419,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "KSwPawb2TAznlX3igSvc44oTIaM=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Athlee_apps_web_src_e268347f._.js.map