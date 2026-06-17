import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface NewPlayerFormProps {
  onCreatePlayer: (name: string, options?: { position?: string; jerseyNo?: string }) => void;
  onClose: () => void;
  competitiveMode?: boolean;
}

/**
 * NewPlayerForm Component (Mobile - React Native)
 * Form for creating new temporary/guest players
 */
export default function NewPlayerForm(
  props: NewPlayerFormProps
): React.ReactElement {
  const { onCreatePlayer, onClose, competitiveMode = false } = props;

  const [formData, setFormData] = useState({
    name: '',
    jerseyNo: '',
    position: '',
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    onCreatePlayer(formData.name.trim(), {
      jerseyNo: formData.jerseyNo || undefined,
      position: formData.position || undefined,
    });

    setFormData({ name: '', jerseyNo: '', position: '' });
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Player</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.form}
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Player Name */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Player Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Enter player name"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
            </View>

            {/* Jersey Number (Competitive Mode) */}
            {competitiveMode && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Jersey Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.jerseyNo}
                  onChangeText={(text) =>
                    setFormData({ ...formData, jerseyNo: text })
                  }
                  placeholder="e.g., 23"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            )}

            {/* Position (Competitive Mode) */}
            {competitiveMode && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Position</Text>
                <View style={styles.positionOptions}>
                  {['Guard', 'Forward', 'Center', 'Other'].map((pos) => (
                    <Pressable
                      key={pos}
                      style={[
                        styles.positionOption,
                        formData.position === pos && styles.positionOptionActive,
                      ]}
                      onPress={() => setFormData({ ...formData, position: pos })}
                    >
                      <Text
                        style={[
                          styles.positionOptionText,
                          formData.position === pos && styles.positionOptionTextActive,
                        ]}
                      >
                        {pos[0]}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Info Note */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ℹ This player will be added as a guest and can be claimed later.
              </Text>
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.submitButton,
                !formData.name.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!formData.name.trim()}
            >
              <Text style={styles.submitButtonText}>Add Player</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  positionOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    flex: 1,
    minWidth: '45%',
  },
  positionOptionActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  positionOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  positionOptionTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
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
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
