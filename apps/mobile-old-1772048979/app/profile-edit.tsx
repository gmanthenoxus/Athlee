import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProfile } from '../contexts/ProfileContext';
import { SelectField } from '../components/SelectField';
import { SportType } from '@athlehub/shared';

const SPORT_OPTIONS = [
  { label: 'Basketball', value: SportType.Basketball, searchable: false },
  { label: 'Football', value: SportType.Football, searchable: false },
  { label: 'Badminton', value: SportType.Badminton, searchable: false },
  { label: 'Table Tennis', value: SportType.TableTennis, searchable: false },
  { label: 'Volleyball', value: SportType.Volleyball, searchable: false },
];

export default function ProfileEditScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    primarySport: SportType.Basketball,
    locationTag: '',
    isPublicStats: true,
    isPublicBadges: true,
    isPublicPosts: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        bio: profile.bio,
        primarySport: profile.primarySport,
        locationTag: profile.locationTag,
        isPublicStats: profile.isPublicStats,
        isPublicBadges: profile.isPublicBadges,
        isPublicPosts: profile.isPublicPosts,
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      await updateProfile(formData);
      router.back();
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>

          {/* Username */}
          <View style={styles.section}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              placeholder="Enter username"
              placeholderTextColor="#999"
            />
          </View>

          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              placeholder="Tell us about yourself"
              placeholderTextColor="#999"
              multiline
              maxLength={200}
            />
            <Text style={styles.charCount}>
              {formData.bio.length}/200
            </Text>
          </View>

          {/* Primary Sport */}
          <View style={styles.section}>
            <Text style={styles.label}>Primary Sport</Text>
            <SelectField
              options={SPORT_OPTIONS}
              value={formData.primarySport}
              onSelect={(value) => setFormData({ ...formData, primarySport: value })}
              placeholder="Select sport"
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.label}>Location (City, Country)</Text>
            <TextInput
              style={styles.input}
              value={formData.locationTag}
              onChangeText={(text) => setFormData({ ...formData, locationTag: text })}
              placeholder="e.g., San Francisco, USA"
              placeholderTextColor="#999"
            />
          </View>

          {/* Privacy Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Public Stats</Text>
              <Switch
                value={formData.isPublicStats}
                onValueChange={(value) => setFormData({ ...formData, isPublicStats: value })}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Public Badges</Text>
              <Switch
                value={formData.isPublicBadges}
                onValueChange={(value) => setFormData({ ...formData, isPublicBadges: value })}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Public Posts</Text>
              <Switch
                value={formData.isPublicPosts}
                onValueChange={(value) => setFormData({ ...formData, isPublicPosts: value })}
              />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.back()}
              disabled={isSaving}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton, isSaving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
