import {
  Location,
  LocationType,
  SportType,
  LocationFilters,
  SortOption,
  CheckIn,
  Amenity
} from './location-types';
import { generateMockLocations, generateMockEvents, generateMockBookings } from './mockLocations';
import { eventService } from './eventService';
import { bookingService } from './bookingService';
import { chatService } from './chatService';

/**
 * Mock user location for distance calculations
 */
const MOCK_USER_LOCATION = { lat: 40.7128, lng: -74.0060 }; // NYC

/**
 * LocationService handles all location-related operations
 * Data is persisted in localStorage under the "athlee_locations" key
 */
class LocationService {
  private readonly STORAGE_KEY = 'athlee_locations';
  private readonly CHECKIN_KEY = 'athlee_checkins';
  private initialized = false;

  /**
   * Initialize mock data if storage is empty
   */
  public initializeMockData(): void {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      const locations = this.getAllLocations();

      // Only initialize if empty
      if (locations.length === 0) {
        const mockLocations = generateMockLocations();
        const mockEvents = generateMockEvents(mockLocations);
        const mockBookings = generateMockBookings(mockLocations);

        this.saveLocations(mockLocations);

        // Save events via eventService
        if (typeof window !== 'undefined') {
          localStorage.setItem('athlee_events', JSON.stringify(mockEvents));
          localStorage.setItem('athlee_bookings', JSON.stringify(mockBookings));

          // Create chat rooms for community locations
          mockLocations.forEach((location) => {
            if (location.type === LocationType.Community) {
              chatService.getOrCreateChatRoom(location.id, location.name);
            }
          });
        }
      }

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize mock data:', error);
    }
  }

  /**
   * Calculate distance in miles between two coordinates (simple approximation)
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal
  }

  /**
   * Get distance from user location to a specific location (public method)
   */
  public getDistance(locationId: string): number {
    const location = this.getLocationById(locationId);
    if (!location) return 0;
    return this.calculateDistance(
      MOCK_USER_LOCATION.lat,
      MOCK_USER_LOCATION.lng,
      location.coordinates.lat,
      location.coordinates.lng
    );
  }

  /**
   * Get all locations from storage
   */
  private getAllLocations(): Location[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const locations = data ? JSON.parse(data) : [];
      
      // Normalize locations to ensure required properties exist
      return locations.map((loc: any) => ({
        ...loc,
        sports: loc.sports || [],
        amenities: loc.amenities || [],
        images: loc.images || ['https://via.placeholder.com/400x300?text=Location'],
        activePlayers: loc.activePlayers || [],
        upcomingEvents: loc.upcomingEvents || [],
        bookings: loc.bookings || []
      }));
    } catch {
      return [];
    }
  }

  /**
   * Save locations to storage
   */
  private saveLocations(locations: Location[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(locations));
    } catch (error) {
      console.error('Failed to save locations:', error);
    }
  }

  /**
   * Get all check-ins from storage
   */
  private getAllCheckIns(): CheckIn[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.CHECKIN_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save check-ins to storage
   */
  private saveCheckIns(checkIns: CheckIn[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.CHECKIN_KEY, JSON.stringify(checkIns));
    } catch (error) {
      console.error('Failed to save check-ins:', error);
    }
  }

  /**
   * Clean up expired check-ins
   */
  private cleanupExpiredCheckIns(): void {
    const checkIns = this.getAllCheckIns();
    const now = new Date();
    const active = checkIns.filter((ci) => new Date(ci.expiresAt) > now);
    this.saveCheckIns(active);
  }

  /**
   * Get filtered and sorted locations
   */
  public getLocations(filters?: LocationFilters, sort?: SortOption): Location[] {
    this.cleanupExpiredCheckIns();
    let locations = this.getAllLocations();

    // Apply filters
    if (filters) {
      // Filter by sports (OR logic: match if location has ANY of the selected sports)
      if (filters.sports && filters.sports.length > 0) {
        locations = locations.filter((loc) => {
          const locSports = loc.sports || [];
          return locSports.some((sport) => filters.sports.includes(sport));
        });
      }

      // Filter by type (OR logic: match if location type is in selected types)
      if (filters.type && filters.type.length > 0) {
        locations = locations.filter((loc) => filters.type.includes(loc.type));
      }

      // Filter by search text (searches name, address, description)
      if (filters.search && filters.search.trim()) {
        const search = filters.search.toLowerCase();
        locations = locations.filter(
          (loc) =>
            loc.name.toLowerCase().includes(search) ||
            loc.address.toLowerCase().includes(search) ||
            (loc.description || '').toLowerCase().includes(search)
        );
      }

      // Filter by distance from user
      if (filters.distance !== undefined && filters.distance > 0) {
        const maxDistance = filters.distance;
        locations = locations.filter(
          (loc) =>
            this.calculateDistance(
              MOCK_USER_LOCATION.lat,
              MOCK_USER_LOCATION.lng,
              loc.coordinates.lat,
              loc.coordinates.lng
            ) <= maxDistance
        );
      }
    }

    // Apply sorting
    if (sort === SortOption.Nearest) {
      locations.sort(
        (a, b) =>
          this.calculateDistance(
            MOCK_USER_LOCATION.lat,
            MOCK_USER_LOCATION.lng,
            a.coordinates.lat,
            a.coordinates.lng
          ) -
          this.calculateDistance(
            MOCK_USER_LOCATION.lat,
            MOCK_USER_LOCATION.lng,
            b.coordinates.lat,
            b.coordinates.lng
          )
      );
    } else if (sort === SortOption.MostActive) {
      locations.sort((a, b) => (b.activePlayers?.length || 0) - (a.activePlayers?.length || 0));
    } else if (sort === SortOption.Newest) {
      locations.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === SortOption.MostBookings) {
      locations.sort((a, b) => (b.bookings?.length || 0) - (a.bookings?.length || 0));
    }

    return locations;
  }

  /**
   * Get a single location by ID with all related data
   */
  public getLocationById(locationId: string): Location | null {
    this.cleanupExpiredCheckIns();
    const location = this.getAllLocations().find((loc) => loc.id === locationId);
    if (!location) return null;

    // Enrich with active players
    const checkIns = this.getAllCheckIns();
    location.activePlayers = checkIns
      .filter((ci) => ci.locationId === locationId)
      .map((ci) => ci.userId);

    return location;
  }

  /**
   * Create a new location
   */
  public createLocation(locationData: Partial<Location>): Location {
    const locations = this.getAllLocations();

    const newLocation: Location = {
      id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: locationData.name || 'New Location',
      sports: locationData.sports || [],
      type: locationData.type || LocationType.Community,
      address: locationData.address || '',
      coordinates: locationData.coordinates || { lat: 0, lng: 0 },
      description: locationData.description || '',
      amenities: locationData.amenities || [],
      hours: locationData.hours || '08:00-22:00',
      images: locationData.images || ['https://via.placeholder.com/400x300?text=Location'],
      capacity: locationData.capacity,
      verified: locationData.verified || (locationData.type === LocationType.Business ? true : false),
      ownerId: locationData.ownerId,
      createdAt: new Date().toISOString(),
      activePlayers: [],
      upcomingEvents: [],
      bookings: [],
      chatRoomId: locationData.chatRoomId
    };

    locations.push(newLocation);
    this.saveLocations(locations);

    return newLocation;
  }

  /**
   * Update an existing location
   */
  public updateLocation(locationId: string, updates: Partial<Location>): Location | null {
    const locations = this.getAllLocations();
    const index = locations.findIndex((loc) => loc.id === locationId);

    if (index === -1) return null;

    locations[index] = { ...locations[index], ...updates, id: locationId };
    this.saveLocations(locations);

    return locations[index];
  }

  /**
   * Delete a location
   */
  public deleteLocation(locationId: string): boolean {
    const locations = this.getAllLocations();
    const filtered = locations.filter((loc) => loc.id !== locationId);

    if (filtered.length === locations.length) return false;

    this.saveLocations(filtered);
    return true;
  }

  /**
   * Check in a user to a location
   */
  public checkIn(
    userId: string,
    locationId: string,
    status: 'here_to_play' | 'just_watching'
  ): CheckIn {
    const checkIns = this.getAllCheckIns();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    // Remove existing check-in for this user at this location
    const filtered = checkIns.filter(
      (ci) => !(ci.userId === userId && ci.locationId === locationId)
    );

    const checkIn: CheckIn = {
      userId,
      locationId,
      status,
      checkedInAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    filtered.push(checkIn);
    this.saveCheckIns(filtered);

    return checkIn;
  }

  /**
   * Check out a user from a location
   */
  public checkOut(userId: string, locationId: string): boolean {
    const checkIns = this.getAllCheckIns();
    const filtered = checkIns.filter(
      (ci) => !(ci.userId === userId && ci.locationId === locationId)
    );

    if (filtered.length === checkIns.length) return false;

    this.saveCheckIns(filtered);
    return true;
  }

  /**
   * Get active player details for a location
   */
  public getActivePlayers(locationId: string): Array<{ userId: string; status: string }> {
    this.cleanupExpiredCheckIns();
    const checkIns = this.getAllCheckIns();
    return checkIns
      .filter((ci) => ci.locationId === locationId)
      .map((ci) => ({
        userId: ci.userId,
        status: ci.status
      }));
  }

  /**
   * Get check-in status for a user at a location
   */
  public getCheckInStatus(userId: string, locationId: string): CheckIn | null {
    this.cleanupExpiredCheckIns();
    const checkIns = this.getAllCheckIns();
    return (
      checkIns.find((ci) => ci.userId === userId && ci.locationId === locationId) || null
    );
  }

  /**
   * Get all locations owned by a user (for business dashboard)
   */
  public getLocationsByOwner(ownerId: string): Location[] {
    return this.getAllLocations().filter((loc) => loc.ownerId === ownerId);
  }

  /**
   * Get statistics for a location
   */
  public getLocationStats(locationId: string): {
    totalBookings: number;
    bookingsToday: number;
    activeNow: number;
  } {
    const location = this.getLocationById(locationId);
    if (!location) {
      return { totalBookings: 0, bookingsToday: 0, activeNow: 0 };
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    return {
      totalBookings: location.bookings?.length || 0,
      bookingsToday:
        location.bookings?.filter((b) => b.date === today && b.status !== 'cancelled').length || 0,
      activeNow: location.activePlayers?.length || 0
    };
  }
}

export const locationService = new LocationService();
