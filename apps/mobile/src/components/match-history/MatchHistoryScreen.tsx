import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { matchHistoryService } from '@/lib/matchHistoryService';
import { MatchHistoryEntry, MatchHistoryFilter } from '@/lib/leaderboard-types';
import { useAuthStore } from '@/store/authStore';
import { MatchHistoryCard } from './MatchHistoryCard';

/**
 * Mobile Match History Screen
 */
export function MatchHistoryScreen() {
  const { userId } = useAuthStore();
  const [matches, setMatches] = useState<MatchHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MatchHistoryFilter>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadMatches();
  }, [userId, filters]);

  const loadMatches = () => {
    if (!userId) return;
    try {
      setLoading(false);
      const userMatches = matchHistoryService.getUserMatches(userId, filters);
      setMatches(userMatches);
    } catch (err) {
      console.error('Failed to load match history:', err);
      setLoading(false);
    }
  };

  const stats = matchHistoryService.getUserMatchStats(userId || '');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827', marginHorizontal: 16 }}>
          Match History
        </Text>
        <Text style={{ fontSize: 14, color: '#6b7280', marginHorizontal: 16, marginTop: 4 }}>
          Review your past performances
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Stats Summary */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Total</Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginTop: 4 }}>
                {stats.totalMatches}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Wins</Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#16a34a', marginTop: 4 }}>
                {stats.wins}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Rate</Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#2563eb', marginTop: 4 }}>
                {(stats.winRate * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
              Filters
            </Text>
            <View style={{ gap: 8 }}>
              <View>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151', marginBottom: 4 }}>
                  Result
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', gap: 8 }}>
                  {['All', 'Win', 'Loss', 'Draw'].map((result) => (
                    <TouchableOpacity
                      key={result}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        backgroundColor: result === 'All' ? '#dbeafe' : '#f3f4f6',
                        borderWidth: 1,
                        borderColor: result === 'All' ? '#3b82f6' : '#e5e7eb'
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '500', color: result === 'All' ? '#1e40af' : '#6b7280' }}>
                        {result}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>

        {/* Match List */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ color: '#6b7280' }}>Loading...</Text>
            </View>
          ) : matches.length === 0 ? (
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 40, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '500', marginBottom: 8 }}>
                No matches found
              </Text>
              <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                Complete a match and record stats to see your history
              </Text>
            </View>
          ) : (
            <FlatList
              data={matches}
              keyExtractor={(item) => item.matchId}
              renderItem={({ item }) => <MatchHistoryCard match={item} />}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
