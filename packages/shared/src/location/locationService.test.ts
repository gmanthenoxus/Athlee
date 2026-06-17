import { LocationService, resetLocationService, MOCK_LOCATIONS } from '../../index';
import { LocationType, SportType } from '../types';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    resetLocationService();
    const { default: LocationServiceClass } = require('../locationService');
    service = new LocationServiceClass();
    service.initialize(MOCK_LOCATIONS);
  });

  describe('CRUD Operations', () => {
    test('should initialize with mock locations', () => {
      expect(service.getAllLocations().length).toBe(MOCK_LOCATIONS.length);
    });

    test('should get a location by id', () => {
      const location = service.getLocation('loc_1');
      expect(location).toBeDefined();
      expect(location?.name).toBe('Downtown Sports Complex');
    });

    test('should return null for non-existent location', () => {
      const location = service.getLocation('non_existent');
      expect(location).toBeNull();
    });

    test('should create a new location', () => {
      const newLocation = service.createLocation(
        {
          name: 'Test Court',
          address: '123 Test St',
          city: 'Test City',
          state: 'TC',
          country: 'USA',
          sports: [SportType.Basketball],
          locationType: LocationType.Court,
          capacity: 100,
          coordinates: { lat: 40, lng: -120 },
          amenities: [],
        },
        'user_1'
      );

      expect(newLocation).toBeDefined();
      expect(newLocation.name).toBe('Test Court');
      expect(newLocation.createdBy).toBe('user_1');
    });

    test('should update a location', () => {
      const updated = service.updateLocation('loc_1', {
        name: 'Updated Complex',
      });

      expect(updated?.name).toBe('Updated Complex');
    });

    test('should delete a location (with permission)', () => {
      const deleted = service.deleteLocation('loc_1', 'business_1');
      expect(deleted).toBe(true);
      expect(service.getLocation('loc_1')).toBeNull();
    });

    test('should not delete location without permission', () => {
      const deleted = service.deleteLocation('loc_1', 'wrong_user');
      expect(deleted).toBe(false);
      expect(service.getLocation('loc_1')).toBeDefined();
    });
  });

  describe('Search and Filtering', () => {
    test('should search locations by query', () => {
      const results = service.searchLocations({ query: 'downtown' });
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name.toLowerCase()).toContain('downtown');
    });

    test('should filter locations by sport', () => {
      const results = service.searchLocations({ sport: SportType.Basketball });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((l) => l.sports.includes(SportType.Basketball))).toBe(true);
    });

    test('should filter locations by city', () => {
      const results = service.searchLocations({ city: 'San Francisco' });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((l) => l.city === 'San Francisco')).toBe(true);
    });

    test('should filter locations by type', () => {
      const results = service.searchLocations({ locationType: LocationType.Indoor });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((l) => l.locationType === LocationType.Indoor)).toBe(true);
    });

    test('should apply multiple filters', () => {
      const results = service.searchLocations({
        query: 'downtown',
        sport: SportType.Basketball,
        city: 'San Francisco',
      });

      expect(results.length).toBeGreaterThan(0);
      results.forEach((location) => {
        expect(location.name.toLowerCase()).toContain('downtown');
        expect(location.sports).toContain(SportType.Basketball);
        expect(location.city).toBe('San Francisco');
      });
    });
  });

  describe('Owner Management', () => {
    test('should get locations by owner', () => {
      const ownedLocations = service.getLocationsByOwner('business_1');
      expect(ownedLocations.length).toBeGreaterThan(0);
      expect(ownedLocations.every((l) => l.createdBy === 'business_1')).toBe(true);
    });

    test('should return empty array for owner with no locations', () => {
      const ownedLocations = service.getLocationsByOwner('non_existent_user');
      expect(ownedLocations.length).toBe(0);
    });
  });

  describe('Player Tracking', () => {
    test('should record player appearance', () => {
      const location = service.getLocation('loc_1');
      const initialMatchCount = location?.playerStats['new_player']?.matchCount ?? 0;

      service.recordPlayerAppearance('loc_1', 'new_player');

      const updated = service.getLocation('loc_1');
      expect(updated?.playerStats['new_player']).toBeDefined();
      expect(updated?.playerStats['new_player'].matchCount).toBe(initialMatchCount + 1);
    });

    test('should increment match count for repeat players', () => {
      service.recordPlayerAppearance('loc_1', 'player_1');
      const firstCount = service.getLocation('loc_1')?.playerStats['player_1'].matchCount ?? 0;

      service.recordPlayerAppearance('loc_1', 'player_1');
      const secondCount = service.getLocation('loc_1')?.playerStats['player_1'].matchCount ?? 0;

      expect(secondCount).toBe(firstCount + 1);
    });

    test('should get regular players sorted by match count', () => {
      const regulars = service.getRegularPlayers('loc_1', 5);
      expect(regulars.length).toBeGreaterThan(0);

      // Verify sorted in descending order
      for (let i = 0; i < regulars.length - 1; i++) {
        expect(regulars[i].matchCount).toBeGreaterThanOrEqual(regulars[i + 1].matchCount);
      }
    });

    test('should respect limit in getRegularPlayers', () => {
      const limit = 3;
      const regulars = service.getRegularPlayers('loc_1', limit);
      expect(regulars.length).toBeLessThanOrEqual(limit);
    });

    test('should get player location history', () => {
      const history = service.getPlayerLocationHistory('player_1');
      expect(history.length).toBeGreaterThan(0);
      expect(history.every((h) => h.playerId === undefined || h.matchCount > 0)).toBe(true);
    });
  });

  describe('Persistence', () => {
    test('should export locations for persistence', () => {
      const exported = service.export();
      expect(exported.length).toBe(MOCK_LOCATIONS.length);
      expect(exported[0]).toHaveProperty('id');
      expect(exported[0]).toHaveProperty('name');
      expect(exported[0]).toHaveProperty('playerStats');
    });

    test('should initialize from exported data', () => {
      const exported = service.export();
      resetLocationService();

      const newService = new (require('../locationService').default)();
      newService.initialize(exported);

      const locations = newService.getAllLocations();
      expect(locations.length).toBe(exported.length);
    });
  });
});
