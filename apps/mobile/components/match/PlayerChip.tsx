import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { MatchPlayer } from '@/lib/match-types';
import { getPlayerAvatar } from '@/lib/mockUsers';

const getPositionInitial = (position?: string): string => {
  const initials: Record<string, string> = {
    'Guard': 'G',
    'Forward': 'F',
    'Center': 'C',
    'Other': 'O',
  };
  return position ? initials[position] || 'O' : '';
};

interface PlayerChipProps {
  player: MatchPlayer;
  onRemove: () => void;
  onUpdate: (updates: Partial<MatchPlayer>) => void;
  isSubstitute?: boolean;
  competitiveMode?: boolean;
}

/**
 * PlayerChip Component (Mobile - React Native)
 * Displays a player with options to edit/remove
 */
export default function PlayerChip(props: PlayerChipProps): React.ReactElement {
  const {
    player,
    onRemove,
    onUpdate,
    isSubstitute = false,
    competitiveMode = false,
  } = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    jerseyNo: player.jerseyNo || '',
    position: player.position || '',
    isCaptain: player.isCaptain || false,
  });

  const handleSaveEdit = () => {
    onUpdate({
      jerseyNo: editData.jerseyNo || undefined,
      position: editData.position || undefined,
      isCaptain: editData.isCaptain,
    });
    setShowEditModal(false);
  };

  const avatarInitials = getPlayerAvatar(player);

  return (
    <>
      <View
        style={[
          styles.container,
          isSubstitute && styles.substituteContainer,
        ]}
      >
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </View>

        {/* Player Info */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {player.name}
            </Text>
          {competitiveMode && player.jerseyNo && (
            <View style={styles.jerseyBadge}>
              <Text style={styles.jerseyBadgeText}>#{player.jerseyNo}</Text>
            </View>
          )}
          {competitiveMode && player.position && (
            <View style={styles.positionBadge}>
              <Text style={styles.positionBadgeText}>{getPositionInitial(player.position)}</Text>
            </View>
          )}
          {player.isCaptain && (
            <View style={styles.captainBadge}>
              <Text style={styles.captainBadgeText}>C</Text>
            </View>
          )}
        </View>

        {!player.claimed && (
          <Text style={styles.guestBadge}>Guest Player</Text>
        )}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <Text style={styles.actionButtonText}>✎</Text>
          </Pressable>
          <Pressable
            onPress={onRemove}
            style={({ pressed }) => [
              styles.actionButton,
              styles.deleteButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </Pressable>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Player</Text>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              {/* Jersey Number */}
              {competitiveMode && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Jersey Number</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.jerseyNo}
                    onChangeText={(text) =>
                      setEditData({ ...editData, jerseyNo: text })
                    }
                    placeholder="e.g., 23"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}

              {/* Position */}
              {competitiveMode && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Position</Text>
                  <View style={styles.pickerContainer}>
                    {['Guard', 'Forward', 'Center', 'Other'].map((pos) => (
                      <Pressable
                        key={pos}
                        style={[
                          styles.pickerOption,
                          editData.position === pos && styles.pickerOptionSelected,
                        ]}
                        onPress={() => setEditData({ ...editData, position: pos })}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            editData.position === pos && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {pos[0]}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              {/* Captain Toggle */}
              <View style={styles.formGroup}>
                <View style={styles.toggleRow}>
                  <Text style={styles.label}>Make Captain</Text>
                  <Switch
                    value={editData.isCaptain}
                    onValueChange={(val) =>
                      setEditData({ ...editData, isCaptain: val })
                    }
                    trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                    thumbColor={editData.isCaptain ? '#2563EB' : '#6B7280'}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  substituteContainer: {
    opacity: 0.75,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  jerseyBadge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    flexShrink: 0,
  },
  jerseyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E40AF',
  },
  positionBadge: {
    backgroundColor: '#E9D5FF',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    flexShrink: 0,
  },
  positionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B21A8',
  },
  captainBadge: {
    backgroundColor: '#FCD34D',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    flexShrink: 0,
  },
  captainBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350F',
  },
  guestBadge: {
    fontSize: 11,
    color: '#B45309',
    fontWeight: '600',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 8,
    flexShrink: 0,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  actionButtonPressed: {
    opacity: 0.7,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  pickerOptionSelected: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  pickerOptionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
