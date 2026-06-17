import {
  Location,
  LocationType,
  SportType,
  Amenity,
  Event,
  EventType,
  Booking
} from './location-types';

/**
 * Mock user location (for distance calculations)
 */
export const MOCK_USER_LOCATION = { lat: 40.7128, lng: -74.006 };

/**
 * Generate mock locations for the discovery system
 * Returns 25+ diverse locations with varied attributes
 */
export function generateMockLocations(): Location[] {
  const locations: Location[] = [
    // Business Locations - Basketball
    {
      id: 'loc_basketball_downtown',
      name: 'Downtown Basketball Arena',
      sports: [SportType.Basketball],
      type: LocationType.Business,
      address: '123 Sports Ave, New York, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.006 },
      description: 'Professional-grade basketball courts with full amenities',
      amenities: [
        Amenity.Parking,
        Amenity.Showers,
        Amenity.ChangingRooms,
        Amenity.Lighting,
        Amenity.Seating,
        Amenity.Snacks
      ],
      hours: '06:00-23:00',
      images: ['https://via.placeholder.com/400x300?text=Basketball+Court'],
      capacity: 100,
      verified: true,
      ownerId: 'business_001',
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_1', 'player_2', 'player_3', 'player_4'],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_basketball_eastside',
      name: 'Eastside Hoops',
      sports: [SportType.Basketball],
      type: LocationType.Business,
      address: '456 Court Street, New York, NY 10002',
      coordinates: { lat: 40.715, lng: -73.98 },
      description: 'Indoor basketball facility with 3 courts',
      amenities: [Amenity.Parking, Amenity.Showers, Amenity.Lighting, Amenity.WiFi],
      hours: '07:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Hoops'],
      capacity: 60,
      verified: true,
      ownerId: 'business_002',
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_5', 'player_6', 'player_7'],
      upcomingEvents: [],
      bookings: []
    },
    // Community Basketball Courts
    {
      id: 'loc_basketball_harlem',
      name: 'Harlem Community Basketball',
      sports: [SportType.Basketball],
      type: LocationType.Community,
      address: '200 Harlem Ave, New York, NY 10025',
      coordinates: { lat: 40.8166, lng: -73.9397 },
      description: 'Historic community basketball court, free to play',
      amenities: [Amenity.Lighting],
      hours: '06:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Community+Basketball'],
      capacity: 40,
      verified: true,
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_10', 'player_11', 'player_12', 'player_13', 'player_14'],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_basketball_brooklyn',
      name: 'Brooklyn Basketball Court',
      sports: [SportType.Basketball],
      type: LocationType.Community,
      address: '500 Brooklyn Way, Brooklyn, NY 11201',
      coordinates: { lat: 40.6892, lng: -73.9760 },
      description: 'Public basketball court in Brooklyn',
      amenities: [Amenity.Restrooms, Amenity.Parking],
      hours: '08:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Brooklyn+Basketball'],
      capacity: 35,
      verified: true,
      createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_15', 'player_16', 'player_17'],
      upcomingEvents: [],
      bookings: []
    },

    // Business Locations - Soccer
    {
      id: 'loc_soccer_central',
      name: 'Central Soccer Complex',
      sports: [SportType.Soccer],
      type: LocationType.Business,
      address: '789 Field Road, New York, NY 10003',
      coordinates: { lat: 40.72, lng: -73.97 },
      description: 'Full-size outdoor soccer fields',
      amenities: [
        Amenity.Parking,
        Amenity.Restrooms,
        Amenity.Lighting,
        Amenity.Seating,
        Amenity.Snacks
      ],
      hours: '08:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Soccer+Field'],
      capacity: 150,
      verified: true,
      ownerId: 'business_001',
      createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_20', 'player_21'],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_soccer_westfield',
      name: 'Westfield Soccer Park',
      sports: [SportType.Soccer],
      type: LocationType.Business,
      address: '321 Park Avenue, New York, NY 10004',
      coordinates: { lat: 40.71, lng: -74.01 },
      description: 'Community soccer park with 2 fields',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Seating],
      hours: '09:00-20:00',
      images: ['https://via.placeholder.com/400x300?text=Soccer+Park'],
      capacity: 80,
      verified: true,
      ownerId: 'business_003',
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_25', 'player_26'],
      upcomingEvents: [],
      bookings: []
    },

    // Business Locations - Tennis
    {
      id: 'loc_tennis_uptown',
      name: 'Uptown Tennis Club',
      sports: [SportType.Tennis],
      type: LocationType.Business,
      address: '654 Tennis Lane, New York, NY 10005',
      coordinates: { lat: 40.73, lng: -73.96 },
      description: 'Premier tennis courts with coaching available',
      amenities: [
        Amenity.Parking,
        Amenity.Showers,
        Amenity.ChangingRooms,
        Amenity.Lighting,
        Amenity.WiFi,
        Amenity.Snacks
      ],
      hours: '07:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Tennis+Court'],
      capacity: 40,
      verified: true,
      ownerId: 'business_002',
      createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_27'],
      upcomingEvents: [],
      bookings: []
    },

    // Business Locations - Multiple Sports
    {
      id: 'loc_multiplex_downtown',
      name: 'Downtown Sports Multiplex',
      sports: [SportType.Basketball, SportType.Volleyball, SportType.Badminton],
      type: LocationType.Business,
      address: '999 Multi Street, New York, NY 10006',
      coordinates: { lat: 40.714, lng: -73.99 },
      description: 'Full-service sports multiplex with multiple court types',
      amenities: [
        Amenity.Parking,
        Amenity.Showers,
        Amenity.ChangingRooms,
        Amenity.Restrooms,
        Amenity.Lighting,
        Amenity.Seating,
        Amenity.Snacks,
        Amenity.WiFi,
        Amenity.Scoreboard
      ],
      hours: '06:00-23:00',
      images: ['https://via.placeholder.com/400x300?text=Sports+Multiplex'],
      capacity: 200,
      verified: true,
      ownerId: 'business_001',
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_28', 'player_29', 'player_30', 'player_31', 'player_32', 'player_33'],
      upcomingEvents: [],
      bookings: []
    },

    // Community Locations
    {
      id: 'loc_community_basketball_1',
      name: 'Central Park Basketball Court',
      sports: [SportType.Basketball],
      type: LocationType.Community,
      address: 'Central Park, New York, NY 10024',
      coordinates: { lat: 40.785, lng: -73.968 },
      description: 'Outdoor public basketball court, free to use',
      amenities: [Amenity.Restrooms, Amenity.Lighting],
      hours: '06:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Community+Court'],
      capacity: 50,
      verified: true,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: ['player_34', 'player_35', 'player_36'],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_community_soccer_1',
      name: 'Washington Square Soccer',
      sports: [SportType.Soccer],
      type: LocationType.Community,
      address: 'Washington Square Park, New York, NY 10012',
      coordinates: { lat: 40.7323, lng: -73.9971 },
      description: 'Community soccer pitch in Washington Square Park',
      amenities: [Amenity.Restrooms, Amenity.Seating],
      hours: '08:00-20:00',
      images: ['https://via.placeholder.com/400x300?text=Community+Soccer'],
      capacity: 60,
      verified: true,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_community_tennis_1',
      name: 'East River Tennis Courts',
      sports: [SportType.Tennis],
      type: LocationType.Community,
      address: 'East River Park, New York, NY 10009',
      coordinates: { lat: 40.7227, lng: -73.9729 },
      description: 'Public tennis courts maintained by the community',
      amenities: [Amenity.Restrooms, Amenity.Parking],
      hours: '07:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Community+Tennis'],
      capacity: 32,
      verified: true,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_community_badminton_1',
      name: 'Community Badminton Hall',
      sports: [SportType.Badminton],
      type: LocationType.Community,
      address: '888 Community Lane, New York, NY 10010',
      coordinates: { lat: 40.725, lng: -73.975 },
      description: 'Community-managed indoor badminton facility',
      amenities: [Amenity.Restrooms, Amenity.Parking, Amenity.Lighting],
      hours: '10:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Badminton+Hall'],
      capacity: 45,
      verified: true,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },

    // Private Locations
    {
      id: 'loc_private_basketball_1',
      name: 'Private Basketball Court - Downtown',
      sports: [SportType.Basketball],
      type: LocationType.Private,
      address: '111 Private Drive, New York, NY 10007',
      coordinates: { lat: 40.71, lng: -73.985 },
      description: 'Private basketball court by invitation only',
      amenities: [Amenity.Parking, Amenity.Showers, Amenity.ChangingRooms],
      hours: '08:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Private+Court'],
      capacity: 20,
      verified: true,
      ownerId: 'player_001',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_private_soccer_1',
      name: 'Private Soccer Field - Exclusive',
      sports: [SportType.Soccer],
      type: LocationType.Private,
      address: '222 Exclusive Lane, New York, NY 10008',
      coordinates: { lat: 40.72, lng: -74.0 },
      description: 'Exclusive private soccer field for members only',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Lighting],
      hours: '09:00-20:00',
      images: ['https://via.placeholder.com/400x300?text=Private+Field'],
      capacity: 30,
      verified: true,
      ownerId: 'business_004',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },

    // Additional locations for diversity
    {
      id: 'loc_volleyball_beach',
      name: 'Volleyball Beach Complex',
      sports: [SportType.Volleyball],
      type: LocationType.Business,
      address: '777 Beach Road, New York, NY 10009',
      coordinates: { lat: 40.76, lng: -73.9 },
      description: 'Indoor volleyball courts with beach courts',
      amenities: [Amenity.Parking, Amenity.Showers, Amenity.Snacks, Amenity.WiFi],
      hours: '08:00-22:00',
      images: ['https://via.placeholder.com/400x300?text=Volleyball'],
      capacity: 80,
      verified: true,
      ownerId: 'business_005',
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_pickleball_courts',
      name: 'Pickleball Paradise',
      sports: [SportType.Pickleball],
      type: LocationType.Business,
      address: '555 Pickleball Way, New York, NY 10011',
      coordinates: { lat: 40.735, lng: -73.955 },
      description: 'Dedicated pickleball courts for all levels',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Lighting, Amenity.Snacks],
      hours: '09:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Pickleball'],
      capacity: 60,
      verified: true,
      ownerId: 'business_003',
      createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_baseball_diamond',
      name: 'Baseball Diamond Park',
      sports: [SportType.Baseball],
      type: LocationType.Community,
      address: '444 Diamond Street, New York, NY 10012',
      coordinates: { lat: 40.76, lng: -73.96 },
      description: 'Community baseball field with lighting',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Seating],
      hours: '08:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Baseball'],
      capacity: 100,
      verified: true,
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_football_field',
      name: 'American Football Gridiron',
      sports: [SportType.American_Football],
      type: LocationType.Business,
      address: '333 Gridiron Ave, New York, NY 10013',
      coordinates: { lat: 40.745, lng: -73.98 },
      description: 'Full-size American football field',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Lighting, Amenity.Seating],
      hours: '07:00-20:00',
      images: ['https://via.placeholder.com/400x300?text=Football'],
      capacity: 150,
      verified: true,
      ownerId: 'business_002',
      createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },

    // Mixed sports locations
    {
      id: 'loc_multi_sports_1',
      name: 'All-Sports Recreation Center',
      sports: [
        SportType.Basketball,
        SportType.Soccer,
        SportType.Tennis,
        SportType.Volleyball,
        SportType.Badminton
      ],
      type: LocationType.Business,
      address: '222 Recreation Way, New York, NY 10014',
      coordinates: { lat: 40.755, lng: -73.945 },
      description: 'Complete sports facility with courts for all major sports',
      amenities: [
        Amenity.Parking,
        Amenity.Showers,
        Amenity.ChangingRooms,
        Amenity.Restrooms,
        Amenity.Lighting,
        Amenity.Seating,
        Amenity.Snacks,
        Amenity.WiFi,
        Amenity.Scoreboard
      ],
      hours: '06:00-23:00',
      images: ['https://via.placeholder.com/400x300?text=Recreation+Center'],
      capacity: 300,
      verified: true,
      ownerId: 'business_004',
      createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    },
    {
      id: 'loc_community_multi_1',
      name: 'Community Sports Park',
      sports: [SportType.Soccer, SportType.Basketball, SportType.Baseball],
      type: LocationType.Community,
      address: '111 Park Lane, New York, NY 10015',
      coordinates: { lat: 40.715, lng: -73.993 },
      description: 'Large community park with multiple sports facilities',
      amenities: [Amenity.Parking, Amenity.Restrooms, Amenity.Seating, Amenity.Lighting],
      hours: '07:00-21:00',
      images: ['https://via.placeholder.com/400x300?text=Community+Park'],
      capacity: 120,
      verified: true,
      createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: []
    }
  ];

  return locations;
}

/**
 * Generate mock events for locations
 */
export function generateMockEvents(locations: Location[]): Event[] {
  const events: Event[] = [];

  locations.forEach((location) => {
    // Generate 3-5 events per location
    const eventCount = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < eventCount; i++) {
      const daysOffset = Math.floor(Math.random() * 20) + 1; // Next 20 days
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + daysOffset);

      const sport = location.sports[Math.floor(Math.random() * location.sports.length)];
      const eventTypes = Object.values(EventType);
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      events.push({
        id: `event_${location.id}_${i}`,
        locationId: location.id,
        title: `${eventType} - ${sport}`,
        type: eventType,
        date: eventDate.toISOString(),
        time: `${String(Math.floor(Math.random() * 15) + 8).padStart(2, '0')}:00`,
        maxParticipants: Math.floor(Math.random() * 12) + 4,
        registeredUsers: [],
        description: `Join us for an exciting ${eventType.toLowerCase()} event in ${sport}!`,
        createdAt: new Date().toISOString()
      });
    }
  });

  return events;
}

/**
 * Generate mock bookings for locations
 */
export function generateMockBookings(locations: Location[]): Booking[] {
  const bookings: Booking[] = [];

  locations.forEach((location) => {
    if (location.type !== LocationType.Business) return; // Only business locations have bookings

    // Generate 10-15 bookings for next 7 days
    const bookingCount = Math.floor(Math.random() * 6) + 10;

    for (let i = 0; i < bookingCount; i++) {
      const daysOffset = Math.floor(Math.random() * 7);
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() + daysOffset);

      const startHour = Math.floor(Math.random() * 14) + 8; // 8:00 to 22:00
      const startTime = `${String(startHour).padStart(2, '0')}:00`;
      const endHour = startHour + Math.floor(Math.random() * 3) + 1;
      const endTime = `${String(Math.min(endHour, 22)).padStart(2, '0')}:00`;

      bookings.push({
        id: `booking_${location.id}_${i}`,
        locationId: location.id,
        userId: `player_${Math.floor(Math.random() * 10) + 1}`,
        date: bookingDate.toISOString().split('T')[0],
        startTime,
        endTime,
        status: Math.random() > 0.1 ? 'confirmed' : 'cancelled',
        createdAt: new Date().toISOString()
      });
    }
  });

  return bookings;
}
