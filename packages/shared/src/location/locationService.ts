import type {
  Location,
  LocationCreateData,
  LocationUpdateData,
  LocationSearchFilters,
  LocationPlayerRecord,
  RegularPlayer,
} from './types';
import type { SportType } from '../profile/types';

/**
 * Location Service
 * Handles all location-related business logic
 */
export class LocationService {
  private locations: Map<string, Location> = new Map();
  private locationsByOwner: Map<string, string[]> = new Map(); // userId -> locationIds
  private nextId = 1;

  /**
   * Generate a unique location ID
   */
  private generateId(): string {
    return `loc_${this.nextId++}`;
  }

  /**
   * Initialize service with existing locations
   */
  initialize(locations: Location[]): void {
    locations.forEach((loc) => {
      this.locations.set(loc.id, loc);

      // Index by owner
      if (!this.locationsByOwner.has(loc.createdBy)) {
        this.locationsByOwner.set(loc.createdBy, []);
      }
      this.locationsByOwner.get(loc.createdBy)!.push(loc.id);

      // Update next ID
      const id = parseInt(loc.id.split('_')[1], 10);
      if (id >= this.nextId) {
        this.nextId = id + 1;
      }
    });
  }

  /**
   * Get all locations
   */
  getAllLocations(): Location[] {
    return Array.from(this.locations.values());
  }

  /**
   * Search locations by various criteria
   */
  searchLocations(filters: LocationSearchFilters): Location[] {
    return this.getAllLocations().filter((location) => {
      // Search by query (name, address, city)
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery =
          location.name.toLowerCase().includes(query) ||
          location.address.toLowerCase().includes(query) ||
          location.city.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Filter by sport
      if (filters.sport) {
        if (!location.sports.includes(filters.sport)) return false;
      }

      // Filter by city
      if (filters.city) {
        if (location.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      }

      // Filter by location type
      if (filters.locationType) {
        if (location.locationType !== filters.locationType) return false;
      }

      return true;
    });
  }

  /**
   * Get a single location by ID
   */
  getLocation(id: string): Location | undefined {
    return this.locations.get(id);
  }

  /**
   * Create a new location
   */
  createLocation(data: LocationCreateData, userId: string): Location {
    const now = new Date().toISOString();
    const id = this.generateId();

    const location: Location = {
      id,
      ...data,
      coordinates: data.coordinates || { lat: 0, lng: 0 },
      matchCount: 0,
      verified: false,
      createdBy: userId,
      playerStats: {},
      createdAt: now,
      updatedAt: now,
    };

    this.locations.set(id, location);

    // Add to owner index
    if (!this.locationsByOwner.has(userId)) {
      this.locationsByOwner.set(userId, []);
    }
    this.locationsByOwner.get(userId)!.push(id);

    return location;
  }

  /**
   * Update an existing location
   */
  updateLocation(id: string, updates: LocationUpdateData): Location {
    const location = this.getLocation(id);
    if (!location) {
      throw new Error(`Location not found: ${id}`);
    }

    const updated: Location = {
      ...location,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.locations.set(id, updated);
    return updated;
  }

  /**
   * Delete a location (for business users)
   */
  deleteLocation(id: string, userId: string): boolean {
    const location = this.getLocation(id);
    if (!location) {
      throw new Error(`Location not found: ${id}`);
    }

    if (location.createdBy !== userId) {
      throw new Error('Permission denied: cannot delete location you do not own');
    }

    this.locations.delete(id);

    // Remove from owner index
    const ownerLocations = this.locationsByOwner.get(userId);
    if (ownerLocations) {
      const index = ownerLocations.indexOf(id);
      if (index > -1) {
        ownerLocations.splice(index, 1);
      }
    }

    return true;
  }

  /**
   * Get locations owned by a user
   */
  getLocationsByOwner(userId: string): Location[] {
    const locationIds = this.locationsByOwner.get(userId) || [];
    return locationIds
      .map((id) => this.getLocation(id))
      .filter((loc): loc is Location => loc !== undefined);
  }

  /**
   * Record a player's appearance at a location
   * Called when a match is logged at this location
   */
  recordPlayerAppearance(locationId: string, playerId: string): void {
    const location = this.getLocation(locationId);
    if (!location) {
      throw new Error(`Location not found: ${locationId}`);
    }

    const now = new Date().toISOString();

    if (!location.playerStats[playerId]) {
      // First appearance
      location.playerStats[playerId] = {
        playerId,
        matchCount: 1,
        firstSeen: now,
        lastSeen: now,
      };
    } else {
      // Increment appearance
      location.playerStats[playerId].matchCount++;
      location.playerStats[playerId].lastSeen = now;
    }

    // Increment total match count for location
    location.matchCount++;
    location.updatedAt = now;

    this.locations.set(locationId, location);
  }

  /**
   * Get the most active (regular) players at a location
   */
  getRegularPlayers(locationId: string, limit: number = 5): LocationPlayerRecord[] {
    const location = this.getLocation(locationId);
    if (!location) {
      throw new Error(`Location not found: ${locationId}`);
    }

    return Object.values(location.playerStats)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, limit);
  }

  /**
   * Get player's location history
   */
  getPlayerLocationHistory(playerId: string): Array<{
    locationId: string;
    matchCount: number;
    lastSeen: string;
  }> {
    const history: Array<{
      locationId: string;
      matchCount: number;
      lastSeen: string;
    }> = [];

    this.locations.forEach((location) => {
      if (location.playerStats[playerId]) {
        const record = location.playerStats[playerId];
        history.push({
          locationId: location.id,
          matchCount: record.matchCount,
          lastSeen: record.lastSeen,
        });
      }
    });

    // Sort by most recent first
    return history.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
  }

  /**
   * Export locations for persistence
   */
  export(): Location[] {
    return Array.from(this.locations.values());
  }
}

/**
 * Singleton instance
 */
let instance: LocationService | null = null;

export function getLocationService(): LocationService {
  if (!instance) {
    instance = new LocationService();
  }
  return instance;
}

export function resetLocationService(): void {
  instance = new LocationService();
}
