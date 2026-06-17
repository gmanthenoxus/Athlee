// ============================================================================
// LOCATION SYSTEM TYPE DEFINITIONS
// ============================================================================

/**
 * Represents the different types of locations in the Athlee system
 */
export enum LocationType {
  Business = "Business",      // Professional venues owned by businesses
  Community = "Community",     // Courts created and managed by the community
  Private = "Private"          // Private locations accessible by invite only
}

/**
 * Supported sports across the platform (extends from PLAN.md)
 */
export enum SportType {
  Basketball = "Basketball",
  Soccer = "Soccer",
  Badminton = "Badminton",
  Baseball = "Baseball",
  Volleyball = "Volleyball",
  Tennis = "Tennis",
  Pickleball = "Pickleball",
  American_Football = "American Football"
}

/**
 * Amenities available at a location
 */
export enum Amenity {
  Showers = "Showers",
  Parking = "Parking",
  ChangingRooms = "Changing Rooms",
  Restrooms = "Restrooms",
  Seating = "Seating",
  Lighting = "Lighting",
  Snacks = "Snacks",
  WiFi = "WiFi",
  Scoreboard = "Scoreboard"
}

/**
 * Types of events that can be registered at locations
 */
export enum EventType {
  Tournament = "Tournament",
  League = "League",
  OpenPlay = "Open Play"
}

/**
 * Core Location interface representing a court or venue
 */
export interface Location {
  id: string;
  name: string;
  sports: SportType[];
  type: LocationType;
  address: string;
  city?: string; // City name for filtering
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  amenities: Amenity[];
  hours: string; // Format: "08:00-22:00"
  images: string[]; // Placeholder URLs
  capacity?: number;
  rating?: number; // Rating 1-5
  verified: boolean;
  ownerId?: string; // For Business and Private locations
  createdAt: string; // ISO datetime
  
  // Dynamic fields (populated at runtime)
  activePlayers: string[]; // Array of userIds currently checked in
  upcomingEvents?: Event[];
  bookings?: Booking[];
  chatRoomId?: string; // For Community locations
}

/**
 * Represents an event at a location
 */
export interface Event {
  id: string;
  locationId: string;
  title: string;
  type: EventType;
  date: string; // ISO datetime
  time: string; // Format: "14:00"
  maxParticipants: number;
  registeredUsers: string[]; // Array of userIds
  price?: number; // Placeholder for future payment
  description?: string;
  createdAt: string;
}

/**
 * Represents a booking at a location
 */
export interface Booking {
  id: string;
  locationId: string;
  userId: string;
  date: string; // ISO date (YYYY-MM-DD)
  startTime: string; // Format: "14:00"
  endTime: string; // Format: "15:30"
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
}

/**
 * Check-in record for tracking active players
 */
export interface CheckIn {
  userId: string;
  locationId: string;
  status: "here_to_play" | "just_watching";
  checkedInAt: string; // ISO datetime
  expiresAt: string; // ISO datetime (2 hours from check-in)
}

/**
 * Represents a chat room for community locations
 */
export interface ChatRoom {
  id: string;
  locationId: string;
  name: string;
  members: string[]; // Array of userIds
  moderators: string[]; // Array of userIds
  messages: ChatMessage[];
  createdAt: string;
  
  // Moderator election
  electionActive?: boolean;
  candidates?: string[]; // userIds of nominees
  votes?: Record<string, string>; // voterId -> candidateId
}

/**
 * Represents a single message in a chat room
 */
export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: string; // ISO datetime
}

/**
 * Invite link for private locations
 */
export interface InviteLink {
  id: string;
  locationId: string;
  createdBy: string; // userId
  expiresAt: string; // ISO datetime
  maxUses?: number;
  usedBy: string[]; // Array of userIds
  code: string; // Unique code for the link
}

/**
 * Filter options for location discovery
 */
export interface LocationFilters {
  sports: SportType[];
  type: LocationType[];
  search: string;
  distance?: number; // In miles/km from user
}

/**
 * Sort options for location discovery
 */
export enum SortOption {
  Nearest = "nearest",
  MostActive = "most_active",
  Newest = "newest",
  MostBookings = "most_bookings"
}

/**
 * Business location statistics
 */
export interface LocationStats {
  locationId: string;
  totalBookings: number;
  bookingsToday: number;
  activeNow: number;
  totalEvents: number;
  upcomingEvents: number;
  revenue?: number;
}
