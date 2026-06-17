import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useMatchStore } from '../store/matchStore';
import { Match, MatchStatus } from '../lib/match-types';

export function MatchesScreen() {
  const { filteredMatches, setSelectedMatch } = useMatchStore();

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
  };

  const renderMatchCard = ({ item }: { item: Match }) => (
    <TouchableOpacity
      onPress={() => handleSelectMatch(item)}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{item.sport} Match</Text>
        <Text
          style={[
            styles.status,
            item.status === MatchStatus.Scheduled && styles.statusScheduled,
            item.status === MatchStatus.InProgress && styles.statusLive,
            item.status === MatchStatus.Completed && styles.statusCompleted,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.subtitle}>{item.type} • {item.mode}</Text>
      <View style={styles.teamsContainer}>
        {item.teams.map((team, idx) => (
          <Text key={idx} style={styles.team}>
            {team.name} ({team.players.length} players)
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Matches</Text>
      <FlatList
        data={filteredMatches}
        renderItem={renderMatchCard}
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
  pageTitle: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusScheduled: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
  },
  statusLive: {
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
  },
  statusCompleted: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  teamsContainer: {
    gap: 8,
  },
  team: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
});
