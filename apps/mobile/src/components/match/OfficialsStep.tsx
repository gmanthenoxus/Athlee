import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { profileService, UserSearchResult } from '@/lib/profileService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

interface OfficialsStepProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

/**
 * Assigned person card for displaying officials
 */
const AssignedPersonCard: React.FC<{
  userId: string;
  userName?: string;
  userUsername?: string;
  onRemove: () => void;
  isPrimaryRecorder?: boolean;
}> = ({ userId, userName, userUsername, onRemove, isPrimaryRecorder }) => {
  return (
    <View style={styles.personCard}>
      <View style={styles.personCardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userName?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{userName}</Text>
          <Text style={styles.personUsername}>@{userUsername}</Text>
        </View>
        {isPrimaryRecorder && (
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryBadgeText}>Primary</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={onRemove}
        style={styles.removeButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="close-circle" size={24} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * User search result item
 */
const UserSearchResultItem: React.FC<{
  user: UserSearchResult;
  onSelect: (userId: string) => void;
}> = ({ user, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => onSelect(user.userId)}
    >
      <View style={styles.resultAvatar}>
        <Text style={styles.resultAvatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{user.name}</Text>
        <Text style={styles.resultUsername}>@{user.username}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
};

/**
 * Role section component for mobile
 */
const RoleSection: React.FC<{
  title: string;
  description?: string;
  icon: string;
  children: React.ReactNode;
  onAdd?: () => void;
  addButtonLabel?: string;
  showAddButton?: boolean;
}> = ({
  title,
  description,
  icon,
  children,
  onAdd,
  addButtonLabel = 'Add',
  showAddButton = false,
}) => {
  return (
    <View style={styles.roleSection}>
      <View style={styles.roleSectionHeader}>
        <View style={styles.roleSectionTitleContainer}>
          <Ionicons name={icon as any} size={24} color="#2563eb" />
          <View style={styles.roleSectionTextContainer}>
            <Text style={styles.roleSectionTitle}>{title}</Text>
            {description && (
              <Text style={styles.roleSectionDescription}>{description}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.roleSectionContent}>{children}</View>

      {showAddButton && onAdd && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAdd}
        >
          <Text style={styles.addButtonText}>+ {addButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Primary recorder selector for mobile
 */
const PrimaryRecorderSelector: React.FC<{
  primaryRecorderId: string;
  onChangeRecorder: () => void;
}> = ({ primaryRecorderId, onChangeRecorder }) => {
  const profile = profileService.getUserById(primaryRecorderId);

  return (
    <View style={styles.primaryRecorderContainer}>
      <View style={styles.primaryRecorderContent}>
        <View style={[styles.avatar, styles.primaryAvatar]}>
          <Text style={styles.avatarText}>
            {profile?.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{profile?.name}</Text>
          <Text style={styles.personUsername}>@{profile?.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.changeButton}
        onPress={onChangeRecorder}
      >
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * User search modal for mobile using bottom sheet
 */
const UserSearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (userId: string) => void;
  excludeUserIds?: string[];
  title?: string;
}> = ({ isOpen, onClose, onSelect, excludeUserIds = [], title = 'Select User' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const snapPoints = ['50%', '90%'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = profileService.searchUsers(query).filter(
        (user) => !excludeUserIds.includes(user.userId)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelect = (userId: string) => {
    onSelect(userId);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchInputContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#9ca3af"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or username..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <ScrollView
              style={styles.searchResultsContainer}
              showsVerticalScrollIndicator={true}
            >
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <UserSearchResultItem
                    key={user.userId}
                    user={user}
                    onSelect={handleSelect}
                  />
                ))
              ) : searchQuery.trim().length > 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No users found</Text>
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    Start typing to search for users
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

/**
 * OfficialsStep - Step 6 of Match Setup Wizard (Mobile)
 * Allows assignment of referees and stat recorders for competitive matches
 */
export const OfficialsStep: React.FC<OfficialsStepProps> = ({
  onNext = () => {},
  onBack = () => {},
  onSkip = () => {},
}) => {
  const {
    session,
    addReferee,
    removeReferee,
    setPrimaryRecorder,
    setOfficials,
  } = useMatchSetupStore();

  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchContext, setSearchContext] = useState<'referees' | 'recorder'>('referees');

  const officials = session.officials || {
    referees: [],
    primaryRecorder: session.userId || 'current-user',
    secondaryRecorders: [],
  };

  // Initialize officials if not set
  useEffect(() => {
    if (!session.officials) {
      setOfficials({
        referees: [],
        primaryRecorder: session.userId || 'current-user',
        secondaryRecorders: [],
      });
    }
  }, []);

  const handleAddReferee = () => {
    setSearchContext('referees');
    setIsUserSearchOpen(true);
  };

  const handleAddPrimaryRecorder = () => {
    setSearchContext('recorder');
    setIsUserSearchOpen(true);
  };

  const handleSelectUser = (userId: string) => {
    if (searchContext === 'referees') {
      addReferee(userId);
    } else if (searchContext === 'recorder') {
      setPrimaryRecorder(userId);
    }
  };

  const refereeProfiles = profileService.getUsersByIds(officials.referees);
  const primaryRecorderProfile = profileService.getUserById(officials.primaryRecorder);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Officials & Recording</Text>
          <Text style={styles.subtitle}>
            Assign referees and stat recorders for this match
          </Text>
        </View>

        {/* Referees Section */}
        <View style={styles.section}>
          <RoleSection
            title="Referees"
            description="Assign 1-3 referees for this match"
            icon="people"
            onAdd={handleAddReferee}
            addButtonLabel="Add Referee"
            showAddButton={officials.referees.length < 3}
          >
            {refereeProfiles.length > 0 ? (
              <View style={styles.personList}>
                {refereeProfiles.map((profile) => (
                  <AssignedPersonCard
                    key={profile.userId}
                    userId={profile.userId}
                    userName={profile.name}
                    userUsername={profile.username}
                    onRemove={() => removeReferee(profile.userId)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptySection}>
                <Text style={styles.emptySectionText}>
                  No referees assigned yet. Click "Add Referee" to get started.
                </Text>
              </View>
            )}
          </RoleSection>
        </View>

        {/* Stat Recorders Section */}
        <View style={styles.section}>
          <RoleSection
            title="Stat Recorder"
            description="Primary stat recorder for official match records"
            icon="person"
          >
            {primaryRecorderProfile ? (
              <PrimaryRecorderSelector
                primaryRecorderId={officials.primaryRecorder}
                onChangeRecorder={handleAddPrimaryRecorder}
              />
            ) : (
              <View style={styles.emptySection}>
                <Text style={styles.emptySectionText}>
                  No primary recorder assigned
                </Text>
              </View>
            )}
          </RoleSection>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onBack}
          >
            <Ionicons name="chevron-back" size={20} color="#374151" />
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={onNext}
          >
            <Text style={styles.primaryButtonText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* User Search Modal */}
      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        onSelect={handleSelectUser}
        excludeUserIds={[...officials.referees, officials.primaryRecorder]}
        title={searchContext === 'referees' ? 'Add Referee' : 'Change Stat Recorder'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 16,
  },
  roleSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  roleSectionHeader: {
    marginBottom: 12,
  },
  roleSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleSectionTextContainer: {
    flex: 1,
  },
  roleSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  roleSectionDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  roleSectionContent: {
    marginBottom: 12,
  },
  addButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  personList: {
    gap: 8,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  personCardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryAvatar: {
    backgroundColor: '#a855f7',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  personUsername: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  primaryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ede9fe',
    borderRadius: 12,
  },
  primaryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b21a8',
  },
  removeButton: {
    padding: 4,
  },
  primaryRecorderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#faf5ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  primaryRecorderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7e22ce',
  },
  emptySection: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptySectionText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  skipButtonText: {
    fontSize: 13,
    color: '#6b7280',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  searchResultsContainer: {
    maxHeight: 300,
    paddingHorizontal: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  resultUsername: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
