import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useRouter } from 'expo-router';
import type { MockFollowerUser } from '@athlehub/shared';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { profile, isLoading, updateProfile, getFollowers, getFollowing } = useProfile();
  const router = useRouter();
  const [followers, setFollowers] = useState<MockFollowerUser[]>([]);
  const [following, setFollowing] = useState<MockFollowerUser[]>([]);

  useEffect(() => {
    const loadSocialData = async () => {
      const [followersData, followingData] = await Promise.all([
        getFollowers(),
        getFollowing(),
      ]);
      setFollowers(followersData);
      setFollowing(followingData);
    };

    if (profile) {
      loadSocialData();
    }
  }, [profile]);

  const handlePrivacyToggle = async (field: 'isPublicStats' | 'isPublicBadges' | 'isPublicPosts') => {
    if (!profile) return;

    try {
      await updateProfile({
        [field]: !profile[field],
      });
    } catch (error) {
      console.error('Failed to update privacy setting:', error);
    }
  };

  if (isLoading || !profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Generate initials from user name
  const firstName = profile.firstName || '';
  const lastName = profile.lastName || '';
  const initials = (firstName + ' ' + lastName)
    .split(' ')
    .filter((n) => n)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  // Generate a color based on the user name
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  const colorIndex = (firstName || 'U').charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          {/* Avatar */}
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          {/* Username and Sport */}
          <Text style={styles.username}>{profile.username}</Text>
          <View style={styles.sportBadge}>
            <Text style={styles.sportBadgeText}>{profile.primarySport}</Text>
          </View>

          {/* Bio */}
          {profile.bio && (
            <Text style={styles.bio}>{profile.bio}</Text>
          )}

          {/* Location */}
          {profile.locationTag && (
            <Text style={styles.location}>📍 {profile.locationTag}</Text>
          )}

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{followers.length}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{following.length}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/profile-edit')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Public Stats</Text>
            <Switch
              value={profile.isPublicStats}
              onValueChange={() => handlePrivacyToggle('isPublicStats')}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Public Badges</Text>
            <Switch
              value={profile.isPublicBadges}
              onValueChange={() => handlePrivacyToggle('isPublicBadges')}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Public Posts</Text>
            <Switch
              value={profile.isPublicPosts}
              onValueChange={() => handlePrivacyToggle('isPublicPosts')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sportBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  sportBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
