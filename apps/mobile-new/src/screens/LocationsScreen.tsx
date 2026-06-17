import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocationStore } from '../store/locationStore';
import { Location } from '../lib/location-types';

export function LocationsScreen() {
  const { filteredLocations, setSelectedLocation } = useLocationStore();

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
  };

  const renderLocationCard = ({ item }: { item: Location }) => (
    <TouchableOpacity
      onPress={() => handleSelectLocation(item)}
      style={styles.card}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>
        {item.city}, {item.state}
      </Text>
      <Text style={styles.meta}>
        ⭐ {item.rating} • {item.reviews} reviews
      </Text>
      <Text style={styles.sports}>
        {item.sports.join(', ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locations</Text>
      <FlatList
        data={filteredLocations}
        renderItem={renderLocationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  sports: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '500',
  },
});
