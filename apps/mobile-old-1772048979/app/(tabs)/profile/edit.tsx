import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProfile } from '../../../contexts/ProfileContext';
import { SelectField } from '../../../components/SelectField';
import { SportType } from '@athlehub/shared';
import type { PlayerProfile, BusinessProfile } from '@athlehub/shared';

const SPORT_OPTIONS = [
  { label: 'Basketball', value: SportType.Basketball, searchable: false },
  { label: 'Football', value: SportType.Football, searchable: false },
  { label: 'Badminton', value: SportType.Badminton, searchable: false },
  { label: 'Table Tennis', value: SportType.TableTennis, searchable: false },
  { label: 'Volleyball', value: SportType.Volleyball, searchable: false },
];

export default function EditProfileScreen() {
  const router = useRouter();
  const { currentProfile, updateProfile } = useProfile();
  const insets = useSafeAreaInsets();
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
    if (currentProfile && currentProfile.accountType === 'Player') {
      const profile = currentProfile as PlayerProfile;
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
  }, [currentProfile]);

  const handleSave = async () => {
    if (!currentProfile) return;

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

  if (!currentProfile || currentProfile.accountType !== 'Player') {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Section Header */}
          <View style={styles.headerSection}>
            <Text style={styles.sectionLabel}>BASIC INFORMATION</Text>
          </View>

          {/* Username */}
          <View style={styles.formField}>
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
          <View style={styles.formField}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text.slice(0, 200) })}
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
          <View style={styles.formField}>
            <Text style={styles.label}>Primary Sport</Text>
            <SelectField
              options={SPORT_OPTIONS}
              value={formData.primarySport}
              onSelect={(value) => setFormData({ ...formData, primarySport: value })}
              placeholder="Select sport"
            />
          </View>

          {/* Location */}
          <View style={styles.formField}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.locationTag}
              onChangeText={(text) => setFormData({ ...formData, locationTag: text })}
              placeholder="City, Country"
              placeholderTextColor="#999"
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Privacy Section Header */}
          <View style={styles.headerSection}>
            <Text style={styles.sectionLabel}>PRIVACY SETTINGS</Text>
          </View>

          {/* Privacy Toggles */}
          <View style={styles.privacyContainer}>
            <View style={styles.privacyItem}>
              <View style={styles.privacyTextContainer}>
                <Text style={styles.privacyLabel}>Public Stats</Text>
                <Text style={styles.privacyDescription}>Others can see your match stats</Text>
              </View>
              <Switch
                value={formData.isPublicStats}
                onValueChange={(value) => setFormData({ ...formData, isPublicStats: value })}
              />
            </View>

            <View style={styles.privacyItem}>
              <View style={styles.privacyTextContainer}>
                <Text style={styles.privacyLabel}>Public Badges</Text>
                <Text style={styles.privacyDescription}>Others can see your badges</Text>
              </View>
              <Switch
                value={formData.isPublicBadges}
                onValueChange={(value) => setFormData({ ...formData, isPublicBadges: value })}
              />
            </View>

            <View style={styles.privacyItem}>
              <View style={styles.privacyTextContainer}>
                <Text style={styles.privacyLabel}>Public Posts</Text>
                <Text style={styles.privacyDescription}>Others can see your posts</Text>
              </View>
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
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
  headerSection: {
    marginBottom: 16,
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.6,
    letterSpacing: 0.5,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 6,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  privacyContainer: {
    gap: 0,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  privacyTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  privacyLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  privacyDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
