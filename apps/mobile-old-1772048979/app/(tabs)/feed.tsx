import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function FeedScreen() {
  const router = useRouter();

  const handleExploreLocations = () => {
    router.push('/locations');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-4 py-4">
          <Text className="text-2xl font-bold text-gray-900">Feed</Text>
          <Text className="text-sm text-gray-600 mt-1">Your personalized sports activity</Text>
        </View>

        {/* Main Content */}
        <View className="p-4">
          {/* Quick Actions */}
          <View className="space-y-3 mb-6">
            {/* Locations Card */}
            <TouchableOpacity onPress={handleExploreLocations}>
              <View className="bg-white rounded-lg p-6">
                <Text className="text-4xl mb-2">📍</Text>
                <Text className="text-lg font-semibold text-gray-900">Explore Locations</Text>
                <Text className="text-sm text-gray-600 mt-1">Browse sports facilities</Text>
              </View>
            </TouchableOpacity>

            {/* Matches Card */}
            <View className="bg-white rounded-lg p-6 opacity-50">
              <Text className="text-4xl mb-2">⚽</Text>
              <Text className="text-lg font-semibold text-gray-900">Find Matches</Text>
              <Text className="text-sm text-gray-600 mt-1">Coming soon</Text>
            </View>

            {/* Communities Card */}
            <View className="bg-white rounded-lg p-6 opacity-50">
              <Text className="text-4xl mb-2">👥</Text>
              <Text className="text-lg font-semibold text-gray-900">Communities</Text>
              <Text className="text-sm text-gray-600 mt-1">Coming soon</Text>
            </View>
          </View>

          {/* Feed Placeholder */}
          <View className="bg-white rounded-lg p-8 items-center">
            <Text className="text-gray-600 text-base">Your feed activity will appear here</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

