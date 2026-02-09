import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Athlehub</Text>
          <Text style={styles.subtitle}>
            Your professional sports management platform
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Matches</Text>
            <Text style={styles.cardDescription}>
              Create and manage your matches
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Stats</Text>
            <Text style={styles.cardDescription}>
              Track your performance
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Community</Text>
            <Text style={styles.cardDescription}>
              Connect with players
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardDescription}>
              Manage your account
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  grid: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
