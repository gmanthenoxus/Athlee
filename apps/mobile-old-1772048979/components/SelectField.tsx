import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Animated,
  SafeAreaView,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';

interface SelectOption {
  label: string;
  value: string;
  flag?: string; // For country flags
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
  testID?: string;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onValueChange,
  placeholder = 'Select an option',
  searchable = true,
  required = false,
  disabled = false,
  helperText,
  errorText,
  testID,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    setSearchText('');

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleSelectOption = (optionValue: string) => {
    onValueChange(optionValue);
    handleClose();
  };

  const renderOptionItem = ({ item }: { item: SelectOption; index: number }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        value === item.value && styles.optionItemSelected,
      ]}
      onPress={() => handleSelectOption(item.value)}
    >
      <Text
        style={[
          styles.optionLabel,
          value === item.value && styles.optionLabelSelected,
        ]}
      >
        {item.flag ? `${item.flag} ` : ''}{item.label}
      </Text>
      {value === item.value && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  const modalHeight = Math.min(
    filteredOptions.length * ITEM_HEIGHT + 60,
    Dimensions.get('window').height * 0.7
  );

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Select Button */}
      <TouchableOpacity
        style={[
          styles.selectButton,
          errorText && styles.selectButtonError,
          disabled && styles.selectButtonDisabled,
          isOpen && styles.selectButtonActive,
        ]}
        onPress={handleOpen}
        disabled={disabled}
        testID={testID}
      >
        <Text
          style={[
            styles.selectButtonText,
            !selectedOption && styles.placeholderText,
          ]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <Text style={styles.dropdownIcon}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {/* Helper or Error Text */}
      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}

      {/* Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={handleClose}
          />

          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
                maxHeight: modalHeight,
              },
            ]}
          >
            {/* Search Input */}
            {searchable && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9ca3af"
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                />
                {searchText ? (
                  <TouchableOpacity
                    onPress={() => setSearchText('')}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}

            {/* Options List */}
            {filteredOptions.length > 0 ? (
              <View
                style={{
                  maxHeight: Math.min(
                    filteredOptions.length * ITEM_HEIGHT,
                    Dimensions.get('window').height * 0.5
                  ),
                }}
              >
                <FlatList
                  data={filteredOptions}
                  renderItem={renderOptionItem}
                  keyExtractor={(item) => item.value}
                  scrollEnabled={filteredOptions.length > VISIBLE_ITEMS}
                  nestedScrollEnabled
                />
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No options found</Text>
              </View>
            )}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  selectButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  selectButtonError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  selectButtonDisabled: {
    backgroundColor: '#f3f4f6',
    opacity: 0.6,
  },
  selectButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginRight: 8,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '70%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  clearButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: '#6b7280',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    minHeight: ITEM_HEIGHT,
  },
  optionItemSelected: {
    backgroundColor: '#eff6ff',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
  },
  optionLabelSelected: {
    fontWeight: '600',
    color: '#3b82f6',
  },
  checkmark: {
    fontSize: 18,
    color: '#3b82f6',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
