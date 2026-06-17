import { LocationCard } from '@/components/Location';
import { MOCK_LOCATIONS, LocationSearchFilters, LocationType, SportType, getLocationService } from '@athlehub/shared';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

/**
 * Mobile Locations Explorer Screen
 * Browse and search all locations with filters
 */
export default function LocationsScreen() {
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [filters, setFilters] = useState<LocationSearchFilters>({
    query: '',
  });
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Get unique cities and sports for filter dropdowns
  const cities = Array.from(new Set(MOCK_LOCATIONS.map((l) => l.city))).sort();
  const sports = Array.from(new Set(MOCK_LOCATIONS.flatMap((l) => l.sports))).sort();
  const locationTypes = Object.values(LocationType);

  // Apply filters
  useEffect(() => {
    const locationService = getLocationService();
    const filtered = locationService.searchLocations(filters);
    setLocations(filtered);
  }, [filters]);

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  const handleSportFilter = (sport: SportType | '') => {
    setFilters((prev) => ({
      ...prev,
      sport: sport || undefined,
    }));
  };

  const handleCityFilter = (city: string | '') => {
    setFilters((prev) => ({
      ...prev,
      city: city || undefined,
    }));
  };

  const handleTypeFilter = (type: LocationType | '') => {
    setFilters((prev) => ({
      ...prev,
      locationType: (type as LocationType) || undefined,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ query: '' });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <Text className="text-2xl font-bold text-gray-900">Explore Locations</Text>
        <Text className="text-sm text-gray-600 mt-1">Find sports facilities near you</Text>
      </View>

      {/* Main Content */}
      <View className="px-4 py-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search locations..."
          value={filters.query}
          onChangeText={handleSearchChange}
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-900"
          placeholderTextColor="#9CA3AF"
        />

        {/* Filter Toggle */}
        <TouchableOpacity onPress={() => setExpandedFilters(!expandedFilters)} className="mb-4">
          <Text className="text-blue-600 font-semibold text-sm">
            {expandedFilters ? '▼' : '▶'} Advanced Filters
          </Text>
        </TouchableOpacity>

        {/* Expanded Filters */}
        {expandedFilters && (
          <View className="bg-white rounded-lg p-4 mb-4 space-y-4">
            {/* Sport Filter */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">Sport</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                <TouchableOpacity
                  onPress={() => handleSportFilter('')}
                  className={`mr-2 px-3 py-2 rounded-lg ${
                    !filters.sport ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      !filters.sport ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {sports.map((sport) => (
                  <TouchableOpacity
                    key={sport}
                    onPress={() => handleSportFilter(sport)}
                    className={`mr-2 px-3 py-2 rounded-lg ${
                      filters.sport === sport ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        filters.sport === sport ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {sport}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* City Filter */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">City</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                <TouchableOpacity
                  onPress={() => handleCityFilter('')}
                  className={`mr-2 px-3 py-2 rounded-lg ${
                    !filters.city ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      !filters.city ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    onPress={() => handleCityFilter(city)}
                    className={`mr-2 px-3 py-2 rounded-lg ${
                      filters.city === city ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        filters.city === city ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Clear Filters Button */}
            <TouchableOpacity
              onPress={handleClearFilters}
              className="bg-gray-200 rounded-lg py-2 px-4"
            >
              <Text className="text-gray-700 font-semibold text-sm text-center">
                Clear All Filters
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results */}
        {locations.length > 0 ? (
          <View>
            <Text className="text-sm text-gray-600 mb-4">
              {locations.length} location{locations.length !== 1 ? 's' : ''} found
            </Text>
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </View>
        ) : (
          <View className="py-8 items-center">
            <Text className="text-gray-600 text-base">No locations found</Text>
            <TouchableOpacity onPress={handleClearFilters} className="mt-4">
              <Text className="text-blue-600 font-semibold">Clear filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
