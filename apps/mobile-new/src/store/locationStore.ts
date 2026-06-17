import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location, LocationFilters, SportType } from '../lib/location-types';

interface LocationState {
  locations: Location[];
  filteredLocations: Location[];
  selectedLocation: Location | null;
  filters: LocationFilters;

  // Actions
  setLocations: (locations: Location[]) => void;
  setFilters: (filters: LocationFilters) => void;
  filterLocations: () => void;
  setSelectedLocation: (location: Location | null) => void;
  getLocationById: (id: string) => Location | null;
}

const mockLocations: Location[] = [
  {
    id: 'loc_1',
    name: 'Downtown Basketball Court',
    description: 'Professional grade indoor basketball court',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'USA',
    latitude: 37.7749,
    longitude: -122.4194,
    sports: [SportType.Basketball],
    amenities: ['Water', 'Parking', 'Lights', 'Bathroom'],
    images: [],
    rating: 4.8,
    reviews: 125,
    pricePerHour: 25,
    activePlayers: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'loc_2',
    name: 'Central Park Tennis',
    description: 'Open air tennis courts with great views',
    address: '456 Park Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    country: 'USA',
    latitude: 37.771,
    longitude: -122.486,
    sports: [SportType.Tennis, SportType.Pickleball],
    amenities: ['Water', 'Shade', 'Seating', 'Bathroom'],
    images: [],
    rating: 4.6,
    reviews: 89,
    pricePerHour: 15,
    activePlayers: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'loc_3',
    name: 'Sunset Soccer Field',
    description: 'Full size soccer field with turf',
    address: '789 Field Rd',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94607',
    country: 'USA',
    latitude: 37.8044,
    longitude: -122.2712,
    sports: [SportType.Soccer, SportType.American_Football],
    amenities: ['Parking', 'Lights', 'Dugout', 'Bathroom'],
    images: [],
    rating: 4.5,
    reviews: 156,
    pricePerHour: 30,
    activePlayers: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      locations: mockLocations,
      filteredLocations: mockLocations,
      selectedLocation: null,
      filters: {},

      setLocations: (locations: Location[]) => {
        set({ locations });
        get().filterLocations();
      },

      setFilters: (filters: LocationFilters) => {
        set({ filters });
        get().filterLocations();
      },

      filterLocations: () => {
        const { locations, filters } = get();
        let filtered = [...locations];

        if (filters.sport) {
          filtered = filtered.filter((loc) =>
            loc.sports.includes(filters.sport!)
          );
        }

        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter((loc) =>
            loc.name.toLowerCase().includes(search) ||
            loc.city.toLowerCase().includes(search)
          );
        }

        if (filters.minRating) {
          filtered = filtered.filter((loc) => loc.rating >= filters.minRating!);
        }

        set({ filteredLocations: filtered });
      },

      setSelectedLocation: (location: Location | null) => {
        set({ selectedLocation: location });
      },

      getLocationById: (id: string): Location | null => {
        return get().locations.find((loc) => loc.id === id) || null;
      },
    }),
    {
      name: 'location-store',
    }
  )
);
