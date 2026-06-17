/**
 * Comprehensive Events & Bookings Generator
 * 
 * Generates realistic events and bookings for locations:
 * - Events (Tournaments, Leagues, Open Play)
 * - Court bookings/reservations
 * - Time slot management
 * - Participant registrations
 */

import { Event, EventType, Booking as BookingType } from './location-types';
import { getAllPlayerUsers } from './mockUsersComprehensive';

const EVENT_NAMES = {
  [EventType.Tournament]: [
    'Championship Bracket',
    'Weekend Warriors Tournament',
    'Elite Skills Challenge',
    'Community Cup',
    'Spring Championship',
    'Fall Tournament',
    'Summer Series',
    'Holiday Championship',
  ],
  [EventType.League]: [
    'Competitive League',
    'Recreational League',
    'Beginner League',
    'Pro League',
    'Summer League',
    'Winter League',
    'Spring Standings',
  ],
  [EventType.OpenPlay]: [
    'Open Court',
    'Drop-in Play',
    'Open Gym',
    'Public Play',
    'Free Play Hours',
    'Community Court Hours',
  ],
};

const BOOKING_SLOT_DURATIONS = [60, 90, 120]; // minutes

/**
 * Generate event name for a sport
 */
function generateEventName(eventType: EventType, sport: string): string {
  const names = EVENT_NAMES[eventType];
  return `${names[Math.floor(Math.random() * names.length)]} - ${sport}`;
}

/**
 * Generate event description
 */
function generateEventDescription(eventType: EventType): string {
  const descriptions: Record<EventType, string[]> = {
    [EventType.Tournament]: [
      'Single elimination tournament with bracket play',
      'Round-robin competition with final standings',
      'Seeded bracket tournament with prizes',
      'Regional competition with top seed playoff',
    ],
    [EventType.League]: [
      'Weekly matches with standings and rankings',
      'Season-long competition with playoffs',
      'Division-based league with promotion system',
      'Casual recreational league for all skill levels',
    ],
    [EventType.OpenPlay]: [
      'Drop-in play available anytime during operating hours',
      'Casual games with no registration required',
      'Public court time for all skill levels',
      'Community court for spontaneous play',
    ],
  };

  const options = descriptions[eventType];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Generate a comprehensive event
 */
function generateEvent(
  index: number,
  sport: string,
  locationId: string,
  allPlayers: any[]
): Event {
  const eventTypes = Object.values(EventType);
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  // Event date: within next 90 days
  const daysAhead = Math.floor(Math.random() * 90);
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + daysAhead);
  eventDate.setHours(Math.floor(Math.random() * 18) + 6, 0, 0, 0);

  // Participants: 10-100 for tournament/league, 0-50 for open play
  let maxParticipants = 0;
  if (eventType === EventType.Tournament) {
    maxParticipants = [16, 32, 64, 128][Math.floor(Math.random() * 4)];
  } else if (eventType === EventType.League) {
    maxParticipants = [24, 40, 60][Math.floor(Math.random() * 3)];
  } else {
    maxParticipants = Math.floor(Math.random() * 50) + 10;
  }

  // Register some participants
  const shuffledPlayers = [...allPlayers].sort(() => Math.random() - 0.5);
  const registrationCount = Math.floor(maxParticipants * (0.5 + Math.random() * 0.5));
  const registeredUsers = shuffledPlayers
    .slice(0, registrationCount)
    .map(p => p.id);

  const event: Event = {
    id: `event_${String(index).padStart(4, '0')}`,
    locationId,
    title: generateEventName(eventType, sport),
    type: eventType,
    date: eventDate.toISOString(),
    time: `${String(eventDate.getHours()).padStart(2, '0')}:00`,
    maxParticipants,
    registeredUsers,
    price: eventType === EventType.League ? Math.floor(Math.random() * 100) + 50 : 0,
    description: generateEventDescription(eventType),
    createdAt: new Date().toISOString(),
  };

  return event;
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format time as HH:MM
 */
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Generate a comprehensive booking
 */
function generateBooking(
  index: number,
  locationId: string,
  allPlayers: any[]
): BookingType {
  // Random user
  const userId = allPlayers[Math.floor(Math.random() * allPlayers.length)].id;

  // Date: within next 30 days or past 30 days
  const daysOffset = Math.floor(Math.random() * 60) - 30;
  const bookingDate = new Date();
  bookingDate.setDate(bookingDate.getDate() + daysOffset);

  // Time: during business hours
  const startHour = Math.floor(Math.random() * 18) + 6;
  const startMinutes = [0, 30][Math.floor(Math.random() * 2)];
  const durationMinutes = BOOKING_SLOT_DURATIONS[Math.floor(Math.random() * BOOKING_SLOT_DURATIONS.length)];

  bookingDate.setHours(startHour, startMinutes, 0, 0);

  const endDate = new Date(bookingDate.getTime() + durationMinutes * 60 * 1000);

  const status = (() => {
    if (bookingDate < new Date()) {
      return 'confirmed';
    }
    if (bookingDate.getTime() - new Date().getTime() < 60 * 60 * 1000) {
      return 'confirmed';
    }
    return 'confirmed';
  })() as 'confirmed' | 'cancelled' | 'pending';

  const booking: BookingType = {
    id: `booking_${String(index).padStart(5, '0')}`,
    locationId,
    userId,
    date: formatDateOnly(bookingDate),
    startTime: formatTime(bookingDate),
    endTime: formatTime(endDate),
    status,
    createdAt: new Date(bookingDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return booking;
}

/**
 * Generate comprehensive events and bookings
 */
export function generateComprehensiveEventsAndBookings(config?: {
  eventsPerLocation?: number;
  bookingsPerLocation?: number;
  locationIds?: string[];
  sports?: string[];
}): {
  events: Event[];
  bookings: BookingType[];
} {
  const {
    eventsPerLocation = 5,
    bookingsPerLocation = 15,
    locationIds = Array.from({ length: 30 }, (_, i) => `location_${String(i).padStart(3, '0')}`),
    sports = ['Basketball', 'Soccer', 'Tennis', 'Badminton', 'Volleyball'],
  } = config || {};

  const events: Event[] = [];
  const bookings: BookingType[] = [];
  const allPlayers = getAllPlayerUsers();

  if (allPlayers.length === 0) {
    console.warn('⚠️ No players found. Generate players first: initializeComprehensiveMockDataEcosystem()');
    return { events: [], bookings: [] };
  }

  console.log(`Generating events and bookings for ${locationIds.length} locations...`);

  let eventIndex = 0;
  let bookingIndex = 0;

  // Generate events and bookings per location
  locationIds.forEach(locationId => {
    // Generate events
    for (let i = 0; i < eventsPerLocation; i++) {
      const sport = sports[Math.floor(Math.random() * sports.length)];
      events.push(generateEvent(eventIndex++, sport, locationId, allPlayers));
    }

    // Generate bookings
    for (let i = 0; i < bookingsPerLocation; i++) {
      bookings.push(generateBooking(bookingIndex++, locationId, allPlayers));
    }
  });

  console.log(`✅ Generated ${events.length} events and ${bookings.length} bookings`);
  return { events, bookings };
}

/**
 * Initialize comprehensive events in localStorage
 */
export function initializeComprehensiveEvents(config?: {
  eventsPerLocation?: number;
  bookingsPerLocation?: number;
  locationIds?: string[];
  sports?: string[];
}): void {
  try {
    // Optimize: reduce events/bookings per location to save space
    const optimizedConfig = {
      eventsPerLocation: config?.eventsPerLocation || 2,
      bookingsPerLocation: config?.bookingsPerLocation || 5,
      locationIds: config?.locationIds,
      sports: config?.sports,
    };

    const { events, bookings } = generateComprehensiveEventsAndBookings(optimizedConfig);

    // Store all events
    localStorage.setItem('athlee_events', JSON.stringify(events));

    // Create location-based index (IDs only, not full objects)
    const locationEventIndex: Record<string, string[]> = {};
    events.forEach(e => {
      if (!locationEventIndex[e.locationId]) {
        locationEventIndex[e.locationId] = [];
      }
      locationEventIndex[e.locationId].push(e.id);
    });
    localStorage.setItem('athlee_events_by_location', JSON.stringify(locationEventIndex));

    // Store all bookings
    localStorage.setItem('athlee_bookings', JSON.stringify(bookings));

    // Create location-based booking index (IDs only)
    const locationBookingIndex: Record<string, string[]> = {};
    bookings.forEach(b => {
      if (!locationBookingIndex[b.locationId]) {
        locationBookingIndex[b.locationId] = [];
      }
      locationBookingIndex[b.locationId].push(b.id);
    });
    localStorage.setItem('athlee_bookings_by_location', JSON.stringify(locationBookingIndex));

    console.log(`Initialized ${events.length} events and ${bookings.length} bookings with optimized indices`);
  } catch (error) {
    console.error('Failed to initialize events and bookings:', error);
  }
}

/**
 * Get all events
 */
export function getAllComprehensiveEvents(): Event[] {
  try {
    const stored = localStorage.getItem('athlee_events');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve events:', error);
    return [];
  }
}

/**
 * Get all bookings
 */
export function getAllComprehensiveBookings(): BookingType[] {
  try {
    const stored = localStorage.getItem('athlee_bookings');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve bookings:', error);
    return [];
  }
}

/**
 * Get events by location
 */
export function getEventsByLocation(locationId: string): Event[] {
  const events = getAllComprehensiveEvents();
  return events.filter(e => e.locationId === locationId);
}

/**
 * Get bookings by location
 */
export function getBookingsByLocation(locationId: string): BookingType[] {
  const bookings = getAllComprehensiveBookings();
  return bookings.filter(b => b.locationId === locationId);
}

/**
 * Get user bookings
 */
export function getUserBookings(userId: string): BookingType[] {
  const bookings = getAllComprehensiveBookings();
  return bookings.filter(b => b.userId === userId);
}

/**
 * Clear all events and bookings
 */
export function clearComprehensiveEventsAndBookings(): void {
  localStorage.removeItem('athlee_all_events');
  localStorage.removeItem('athlee_event_index');
  localStorage.removeItem('athlee_events_by_location');
  localStorage.removeItem('athlee_all_bookings');
  localStorage.removeItem('athlee_booking_index');
  localStorage.removeItem('athlee_bookings_by_location');
  console.log('Cleared all events and bookings data');
}

/**
 * Get events and bookings statistics
 */
export function getEventsAndBookingsStats(): {
  totalEvents: number;
  totalBookings: number;
  eventsByType: Record<string, number>;
  bookingsByStatus: Record<string, number>;
} {
  const events = getAllComprehensiveEvents();
  const bookings = getAllComprehensiveBookings();

  const stats = {
    totalEvents: events.length,
    totalBookings: bookings.length,
    eventsByType: {} as Record<string, number>,
    bookingsByStatus: {} as Record<string, number>,
  };

  events.forEach(e => {
    stats.eventsByType[e.type] = (stats.eventsByType[e.type] || 0) + 1;
  });

  bookings.forEach(b => {
    stats.bookingsByStatus[b.status] = (stats.bookingsByStatus[b.status] || 0) + 1;
  });

  return stats;
}
