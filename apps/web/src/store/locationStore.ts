import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocationFilters, SortOption } from '@/lib/location-types';

/**
 * Location Store - Manages discovery filters, sorting, selections, and check-in state
 */
interface LocationStoreState {
  filters: LocationFilters;
  sort: SortOption;
  selectedLocationId: string | null;
  userCheckIns: Record<string, { locationId: string; status: string; expiresAt: string }>;

  // Actions
  setFilters: (filters: LocationFilters) => void;
  setSort: (sort: SortOption) => void;
  setSelectedLocation: (locationId: string | null) => void;
  addCheckIn: (userId: string, locationId: string, status: string, expiresAt: string) => void;
  removeCheckIn: (userId: string) => void;
  getCheckInStatus: (userId: string) => { locationId: string; status: string } | null;
}

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set, get) => ({
      filters: {
        sports: [],
        type: [],
        search: ''
      },
      sort: SortOption.Nearest,
      selectedLocationId: null,
      userCheckIns: {},

      setFilters: (filters) => set({ filters }),
      setSort: (sort) => set({ sort }),
      setSelectedLocation: (locationId) => set({ selectedLocationId: locationId }),

      addCheckIn: (userId, locationId, status, expiresAt) =>
        set((state) => ({
          userCheckIns: {
            ...state.userCheckIns,
            [userId]: { locationId, status, expiresAt }
          }
        })),

      removeCheckIn: (userId) =>
        set((state) => {
          const newCheckIns = { ...state.userCheckIns };
          delete newCheckIns[userId];
          return { userCheckIns: newCheckIns };
        }),

      getCheckInStatus: (userId) => {
        const checkIn = get().userCheckIns[userId];
        if (!checkIn) return null;

        // Check if expired
        if (new Date(checkIn.expiresAt) < new Date()) {
          get().removeCheckIn(userId);
          return null;
        }

        return {
          locationId: checkIn.locationId,
          status: checkIn.status
        };
      }
    }),
    {
      name: 'athlee-location-store'
    }
  )
);

/**
 * Business Store - Manages business-specific data like owned locations and dashboard
 */
interface BusinessStoreState {
  ownedLocationIds: string[];
  selectedLocationForManagement: string | null;
  addLocationToOwned: (locationId: string) => void;
  removeLocationFromOwned: (locationId: string) => void;
  setSelectedLocationForManagement: (locationId: string | null) => void;
  clearOwnedLocations: () => void;
}

export const useBusinessStore = create<BusinessStoreState>()(
  persist(
    (set) => ({
      ownedLocationIds: [],
      selectedLocationForManagement: null,

      addLocationToOwned: (locationId) =>
        set((state) => {
          if (!state.ownedLocationIds.includes(locationId)) {
            return {
              ownedLocationIds: [...state.ownedLocationIds, locationId]
            };
          }
          return state;
        }),

      removeLocationFromOwned: (locationId) =>
        set((state) => ({
          ownedLocationIds: state.ownedLocationIds.filter((id) => id !== locationId)
        })),

      setSelectedLocationForManagement: (locationId) =>
        set({ selectedLocationForManagement: locationId }),

      clearOwnedLocations: () =>
        set({
          ownedLocationIds: [],
          selectedLocationForManagement: null
        })
    }),
    {
      name: 'athlee-business-store'
    }
  )
);
