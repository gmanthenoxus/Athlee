import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Picker } from 'react-native';
import { leaderboardService } from '@/lib/leaderboardService';
import { LeaderboardEntry, LeaderboardType } from '@/lib/leaderboard-types';
import { SportType } from '@/lib/location-types';
import { useAuthStore } from '@/store/authStore';
import { LeaderboardTable } from './LeaderboardTable';

/**
 * Mobile Leaderboard Screen
 */
export function LeaderboardScreen() {
  const { userId } = useAuthStore();
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>(LeaderboardType.Global);
  const [selectedSport, setSelectedSport] = useState<SportType | undefined>();
  const [selectedStat, setSelectedStat] = useState('points');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableSports, setAvailableSports] = useState<SportType[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Load available sports on mount
  useEffect(() => {
    try {
      const sports = leaderboardService.getAvailableSports();
      setAvailableSports(sports);
      if (sports.length > 0 && !selectedSport) {
        setSelectedSport(sports[0]);
      }
    } catch (err) {
      console.error('Failed to load available sports:', err);
    }
  }, []);

  // Load leaderboard when filters change
  useEffect(() => {
    loadLeaderboard();
  }, [leaderboardType, selectedSport, selectedStat]);

  const loadLeaderboard = () => {
    if (!selectedSport) return;

    try {
      setLoading(true);
      const board = leaderboardService.getLeaderboard(
        leaderboardType,
        selectedSport,
        undefined,
        selectedStat,
        'allTime'
      );
      setLeaderboard(board);

      if (userId) {
        const rank = leaderboardService.getUserRank(userId, selectedSport, selectedStat);
        setUserRank(rank);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const statOptions = [
    { value: 'points', label: 'Points' },
    { value: 'rebounds', label: 'Rebounds' },
    { value: 'assists', label: 'Assists' },
    { value: 'steals', label: 'Steals' },
    { value: 'blocks', label: 'Blocks' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827', marginHorizontal: 16 }}>
          Leaderboards
        </Text>
        <Text style={{ fontSize: 14, color: '#6b7280', marginHorizontal: 16, marginTop: 4 }}>
          Compare with other players
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* User Rank Card */}
        {userId && userRank && (
          <View style={{ marginHorizontal: 16, marginVertical: 12, backgroundColor: '#dbeafe', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#93c5fd' }}>
            <Text style={{ fontSize: 12, color: '#1e40af', fontWeight: '600' }}>YOUR RANK</Text>
            <Text style={{ fontSize: 36, fontWeight: '700', color: '#1e3a8a', marginTop: 8 }}>
              #{userRank}
            </Text>
            <Text style={{ fontSize: 12, color: '#1e40af', marginTop: 4 }}>
              Out of {leaderboard.length} players
            </Text>
          </View>
        )}

        {/* Controls */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
            {/* Type Tabs */}
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
              Type
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {(Object.values(LeaderboardType) as LeaderboardType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setLeaderboardType(type)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    backgroundColor: leaderboardType === type ? '#2563eb' : '#f3f4f6',
                    borderWidth: 1,
                    borderColor: leaderboardType === type ? '#2563eb' : '#e5e7eb'
                  }}
                >
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: leaderboardType === type ? '#fff' : '#6b7280'
                  }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sport Selector */}
            {availableSports.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                  Sport
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, overflow: 'hidden' }}>
                  <Picker
                    selectedValue={selectedSport}
                    onValueChange={(value) => setSelectedSport(value as SportType)}
                    style={{ backgroundColor: '#fff', color: '#111827' }}
                  >
                    {availableSports.map((sport) => (
                      <Picker.Item key={sport} label={sport} value={sport} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* Stat Selector */}
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                Ranked By
              </Text>
              <View style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, overflow: 'hidden' }}>
                <Picker
                  selectedValue={selectedStat}
                  onValueChange={setSelectedStat}
                  style={{ backgroundColor: '#fff', color: '#111827' }}
                >
                  {statOptions.map((opt) => (
                    <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Leaderboard Table */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ color: '#6b7280' }}>Loading...</Text>
            </View>
          ) : leaderboard.length === 0 ? (
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '500', marginBottom: 4 }}>
                No data yet
              </Text>
              <Text style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                Complete matches and record stats
              </Text>
            </View>
          ) : (
            <LeaderboardTable
              entries={leaderboard}
              statKey={selectedStat}
              currentUserId={userId}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
