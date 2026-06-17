import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Location, LocationType, Amenity, SportType } from '@/lib/location-types';
import { locationService } from '@/lib/locationService';

interface LocationConfiguratorProps {
  selectedSport?: SportType;
  selectedLocationId?: string;
  onSelectLocation: (locationId: string) => void;
}

/**
 * LocationConfigurator - Step 3: Location Selection (Mobile)
 * Allows users to search and select a venue for their match
 */
export const LocationConfigurator: React.FC<LocationConfiguratorProps> = ({
  selectedSport,
  selectedLocationId,
  onSelectLocation,
}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'active' | 'name'>('distance');

  // Initialize mock data on mount
  useEffect(() => {
    locationService.initializeMockData();
  }, []);

  // Get filtered locations
  const locations = useMemo(() => {
    if (!selectedSport) return [];

    // Get locations for this sport
    let filtered = locationService.getLocations({
      sports: [selectedSport],
      search: search.trim(),
      type: [],
    });

    // Sort
    if (sortBy === 'distance') {
      filtered.sort((a, b) => {
        const distA = locationService.getDistance(a.id);
        const distB = locationService.getDistance(b.id);
        return distA - distB;
      });
    } else if (sortBy === 'active') {
      filtered.sort((a, b) => (b.activePlayers?.length || 0) - (a.activePlayers?.length || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedSport, search, sortBy]);

  // Get selected location
  const selectedLocation = useMemo(
    () => (selectedLocationId ? locations.find((l) => l.id === selectedLocationId) : undefined),
    [selectedLocationId, locations]
  );

  // Get location type color
  const getLocationTypeColor = (type: LocationType): string => {
    switch (type) {
      case LocationType.Business:
        return '#3b82f6'; // Blue
      case LocationType.Community:
        return '#10b981'; // Green
      case LocationType.Private:
        return '#a855f7'; // Purple
      default:
        return '#6b7280'; // Gray
    }
  };

  // Render location card
  const renderLocationCard = ({ item: location }: { item: Location }) => {
    const isSelected = selectedLocationId === location.id;
    const distance = locationService.getDistance(location.id);
    const activeCount = location.activePlayers?.length || 0;

    return (
      <TouchableOpacity
        style={[
          styles.locationCard,
          isSelected && styles.locationCardSelected,
        ]}
        onPress={() => onSelectLocation(location.id)}
      >
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationAddress}>{location.address}</Text>
          </View>
          {isSelected && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>

        {/* Meta Row */}
        <View style={styles.cardMeta}>
          {/* Type Badge */}
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: getLocationTypeColor(location.type) + '20' },
            ]}
          >
            <Text
              style={[
                styles.typeBadgeText,
                { color: getLocationTypeColor(location.type) },
              ]}
            >
              {location.type}
            </Text>
          </View>

          {/* Distance */}
          <Text style={styles.metaText}>📍 {distance.toFixed(1)} mi</Text>

          {/* Active Players */}
          {activeCount > 0 && (
            <Text style={styles.metaText}>👥 {activeCount}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Select a Location</Text>
      <Text style={styles.subtitle}>
        Choose a venue for your {selectedSport || 'match'}
      </Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or address..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9ca3af"
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Controls */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortContainer}
      >
        {(['distance', 'active', 'name'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortButton,
              sortBy === option && styles.sortButtonActive,
            ]}
            onPress={() => setSortBy(option)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === option && styles.sortButtonTextActive,
              ]}
            >
              {option === 'distance'
                ? 'Nearest'
                : option === 'active'
                  ? 'Most Active'
                  : 'Name'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Locations List */}
      {locations.length > 0 ? (
        <FlatList
          data={locations}
          renderItem={renderLocationCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          style={styles.locationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📍</Text>
          <Text style={styles.emptyStateTitle}>No locations found</Text>
          <Text style={styles.emptyStateSubtitle}>
            {selectedSport
              ? `No venues available for ${selectedSport} yet.`
              : 'Select a sport first.'}
          </Text>
        </View>
      )}

      {/* Selected Location Info */}
      {selectedLocation && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoText}>
            ✓ Location selected: {selectedLocation.name}
          </Text>
          <Text style={styles.selectedInfoSubtext}>{selectedLocation.address}</Text>
        </View>
      )}

      {/* Validation Message */}
      {!selectedLocationId && (
        <View style={styles.validationMessage}>
          <Text style={styles.validationMessageText}>
            ⚠ Please select a location to proceed
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    paddingLeft: 36,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 14,
    color: '#111827',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
  },
  sortContainer: {
    marginBottom: 12,
    maxHeight: 40,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  sortButtonActive: {
    backgroundColor: '#3b82f6',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  locationsList: {
    marginBottom: 12,
    maxHeight: 300,
  },
  locationCard: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  locationCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitleContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: '#6b7280',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
  selectedInfo: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
    borderRadius: 8,
  },
  selectedInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  selectedInfoSubtext: {
    fontSize: 12,
    color: '#1e40af',
    marginTop: 2,
  },
  validationMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
    borderRadius: 8,
  },
  validationMessageText: {
    fontSize: 13,
    color: '#b45309',
    fontWeight: '500',
  },
});
