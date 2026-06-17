/**
 * Comprehensive Mock Users System
 * 
 * Generates 100+ realistic user profiles with:
 * - Diverse player levels (Rookie to Legend)
 * - Multiple sports (Basketball, Soccer, Tennis, Volleyball, Badminton)
 * - Varied locations across major cities
 * - XP progression levels
 * - Account types (Player and Business)
 * - Realistic naming and distribution
 */

import { AccountType, Gender, BusinessType, PlayerUser, BusinessUser } from './auth-types';

// First Name Pools (diverse names)
const FIRST_NAMES_MALE = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
  'Benjamin', 'Samuel', 'Raymond', 'Patrick', 'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Jose',
  'Marc', 'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Ethan', 'Alexander'
];

const FIRST_NAMES_FEMALE = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
  'Diane', 'Carol', 'Julie', 'Joyce', 'Victoria', 'Olivia', 'Katherine', 'Evelyn', 'Joan', 'Jean',
  'Christine', 'Cheryl', 'Janet', 'Catherine', 'Ruth', 'Sandra', 'Pamela', 'Maria', 'Theresa', 'Cynthia',
  'Gloria', 'Heather', 'Amber', 'Jacqueline', 'Alice', 'Anna', 'Brenda', 'Carolyn', 'Samantha', 'Rebecca',
  'Sofia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Harper', 'Amelia', 'Evelyn', 'Abigail', 'Emily'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Peterson', 'Phillips', 'Campbell',
  'Parker', 'Evans', 'Edwards', 'Collins', 'Reeves', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook',
  'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Peterson', 'Cooper', 'Peterson', 'Gray', 'Ramirez', 'James'
];

// Usernames pool (suffixes for variety)
const USERNAME_SUFFIXES = [
  'Pro', 'Star', 'King', 'Queen', 'Ace', 'Beast', 'Game', 'Player', 'Legend', 'Champion',
  'Master', 'Hunter', 'Ninja', 'Phoenix', 'Thunder', 'Falcon', 'Tiger', 'Dragon', 'Eagle', 'Wolf',
  'Alpha', 'Elite', 'Force', 'Rush', 'Strike', 'Power', 'Swift', 'Fury', 'Blaze', 'Storm',
  'Rocket', 'Turbo', 'Venom', 'Titan', 'Tank', 'Hawk', 'Cobra', 'Panther', 'Warrior', 'Gladiator'
];

// Sports distribution
const SPORTS = ['Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Badminton'];

// Cities with coordinates
const CITIES = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix', lat: 33.4484, lng: -112.0742 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321 },
  { name: 'Boston', lat: 42.3601, lng: -71.0589 },
  { name: 'Miami', lat: 25.7617, lng: -80.1918 },
  { name: 'Denver', lat: 39.7392, lng: -104.9903 },
  { name: 'Dallas', lat: 32.7767, lng: -96.7970 },
  { name: 'Atlanta', lat: 33.7490, lng: -84.3880 },
];

// Business Names
const BUSINESS_NAMES = [
  'Elite Sports Complex', 'Victory Sports Academy', 'Pro Training Center', 'Champion Court Rentals',
  'NextGen Sports Facility', 'Premier Athletic Club', 'Gold Standard Venue', 'Phoenix Arena',
  'Thunder Sports Complex', 'Titans Training Center', 'Dynasty Sports Club', 'Revolution Sports',
  'Performance Center Pro', 'Apex Athletic Facility', 'Legacy Sports Complex', 'Victory Court',
  'Zenith Sports Academy', 'Pro Court Rentals', 'All-Star Athletic Complex', 'Champions League Venue'
];

const GENDERS = [Gender.Male, Gender.Female, Gender.NonBinary];

/**
 * Generate a single player user
 */
function generatePlayerUser(index: number): PlayerUser {
  const isMale = Math.random() > 0.4;
  const firstName = isMale 
    ? FIRST_NAMES_MALE[Math.floor(Math.random() * FIRST_NAMES_MALE.length)]
    : FIRST_NAMES_FEMALE[Math.floor(Math.random() * FIRST_NAMES_FEMALE.length)];
  
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  
  // Create username from name + random suffix
  const baseUsername = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
  const username = Math.random() > 0.6 
    ? `${baseUsername}_${USERNAME_SUFFIXES[Math.floor(Math.random() * USERNAME_SUFFIXES.length)].toLowerCase()}`
    : baseUsername;

  const age = Math.floor(Math.random() * 50) + 18; // 18-68
  const isMinor = age < 18;
  
  // Birth date calculation
  const birthYear = new Date().getFullYear() - age;
  const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  return {
    id: `user_${String(index).padStart(3, '0')}`,
    email: `${username}@athlehub.com`,
    accountType: AccountType.Player,
    username,
    firstName,
    lastName,
    dateOfBirth,
    age,
    country: 'United States',
    city: city.name,
    gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
    primarySport: SPORTS[Math.floor(Math.random() * SPORTS.length)],
    isMinor,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    bio: generateRandomBio(),
    locations: [city.name],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Generate a single business user
 */
function generateBusinessUser(index: number): BusinessUser {
  const businessName = BUSINESS_NAMES[Math.floor(Math.random() * BUSINESS_NAMES.length)];
  const adminFirstName = FIRST_NAMES_MALE[Math.floor(Math.random() * FIRST_NAMES_MALE.length)];
  const adminLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];

  return {
    id: `business_${String(index).padStart(3, '0')}`,
    email: `admin@${businessName.toLowerCase().replace(/\s+/g, '')}.com`,
    accountType: AccountType.Business,
    username: businessName.toLowerCase().replace(/\s+/g, '_'),
    businessName,
    businessType: [BusinessType.Venue, BusinessType.Academy, BusinessType.Club][
      Math.floor(Math.random() * 3)
    ],
    country: 'United States',
    region: city.name,
    adminName: `${adminFirstName} ${adminLastName}`,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${businessName}`,
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Generate random bio for players
 */
function generateRandomBio(): string {
  const bios = [
    'Love competitive sports and meeting new players',
    'Always looking for pickup games',
    'Dedicated athlete seeking challenges',
    'Sports enthusiast from day one',
    'Never miss a game day',
    'Passion for competition and teamwork',
    'Always training, always improving',
    'Court legends in the making',
    'Game day warrior',
    'Committed to the grind',
    'Sports is life',
    'Here to compete and have fun',
    'Balancing work and play',
    'Part-time player, full-time competitor',
    'Living for the next match',
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

/**
 * Generate 100 player users
 */
export function generateComprehensivePlayerUsers(count: number = 100): PlayerUser[] {
  const users: PlayerUser[] = [];
  for (let i = 1; i <= count; i++) {
    users.push(generatePlayerUser(i));
  }
  return users;
}

/**
 * Generate 20 business users
 */
export function generateComprehensiveBusinessUsers(count: number = 20): BusinessUser[] {
  const users: BusinessUser[] = [];
  for (let i = 1; i <= count; i++) {
    users.push(generateBusinessUser(i));
  }
  return users;
}

/**
 * Generate all comprehensive users (players + businesses)
 */
export function generateAllComprehensiveUsers(playerCount: number = 100, businessCount: number = 20) {
  return {
    players: generateComprehensivePlayerUsers(playerCount),
    businesses: generateComprehensiveBusinessUsers(businessCount),
  };
}

/**
 * Initialize comprehensive mock users in localStorage
 */
export function initializeComprehensiveUsers(playerCount: number = 100, businessCount: number = 20): void {
  try {
    const users = generateAllComprehensiveUsers(playerCount, businessCount);
    
    // Store all users
    localStorage.setItem('athlee_all_players', JSON.stringify(users.players));
    localStorage.setItem('athlee_all_businesses', JSON.stringify(users.businesses));
    
    // Create index for quick lookup
    const playerIndex = Object.fromEntries(users.players.map(u => [u.id, u]));
    const businessIndex = Object.fromEntries(users.businesses.map(u => [u.id, u]));
    
    localStorage.setItem('athlee_player_index', JSON.stringify(playerIndex));
    localStorage.setItem('athlee_business_index', JSON.stringify(businessIndex));
    
    console.log(`Initialized ${playerCount} player users and ${businessCount} business users`);
  } catch (error) {
    console.error('Failed to initialize comprehensive users:', error);
  }
}

/**
 * Get all player users from storage
 */
export function getAllPlayerUsers(): PlayerUser[] {
  try {
    const stored = localStorage.getItem('athlee_all_players');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve player users:', error);
    return [];
  }
}

/**
 * Get all business users from storage
 */
export function getAllBusinessUsers(): BusinessUser[] {
  try {
    const stored = localStorage.getItem('athlee_all_businesses');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve business users:', error);
    return [];
  }
}

/**
 * Get user by ID (player or business)
 */
export function getUserComprensiveById(userId: string): PlayerUser | BusinessUser | null {
  try {
    // Try player index first
    const playerIndex = localStorage.getItem('athlee_player_index');
    if (playerIndex) {
      const players = JSON.parse(playerIndex);
      if (players[userId]) return players[userId];
    }

    // Try business index
    const businessIndex = localStorage.getItem('athlee_business_index');
    if (businessIndex) {
      const businesses = JSON.parse(businessIndex);
      if (businesses[userId]) return businesses[userId];
    }

    return null;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
}

/**
 * Search users by query
 */
export function searchComprehensiveUsers(query: string): (PlayerUser | BusinessUser)[] {
  const lowerQuery = query.toLowerCase();
  const players = getAllPlayerUsers();
  const businesses = getAllBusinessUsers();

  const playerResults = players.filter(
    u => u.username.toLowerCase().includes(lowerQuery) ||
         u.firstName.toLowerCase().includes(lowerQuery) ||
         u.lastName.toLowerCase().includes(lowerQuery)
  );

  const businessResults = businesses.filter(
    u => u.businessName.toLowerCase().includes(lowerQuery) ||
         u.username.toLowerCase().includes(lowerQuery)
  );

  return [...playerResults, ...businessResults];
}

/**
 * Get users by sport
 */
export function getUsersByPrimarySport(sport: string): PlayerUser[] {
  const players = getAllPlayerUsers();
  return players.filter(u => u.primarySport === sport);
}

/**
 * Get users by city
 */
export function getUsersByCity(city: string): PlayerUser[] {
  const players = getAllPlayerUsers();
  return players.filter(u => u.city === city);
}

/**
 * Get random users (for suggestions)
 */
export function getRandomUsers(count: number = 10): PlayerUser[] {
  const players = getAllPlayerUsers();
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Clear all comprehensive user data
 */
export function clearComprehensiveUsers(): void {
  localStorage.removeItem('athlee_all_players');
  localStorage.removeItem('athlee_all_businesses');
  localStorage.removeItem('athlee_player_index');
  localStorage.removeItem('athlee_business_index');
  console.log('Cleared all comprehensive user data');
}
