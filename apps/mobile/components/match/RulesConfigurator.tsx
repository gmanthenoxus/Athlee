import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { getRulePresetsBySport, getDefaultPreset } from '@/lib/mockRulePresets';
import { ruleService } from '@/lib/ruleService';
import type { MatchRules } from '@/lib/match-types';

interface RulesConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface CategoryConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  key: string;
  label: string;
  type: 'number' | 'text' | 'checkbox';
  unit?: string;
  hint?: string;
}

/**
 * RulesConfigurator Component (Mobile - React Native)
 * Improved UI with preset cards, visual categories, and clear value display
 */
export default function RulesConfigurator(props: RulesConfiguratorProps): React.ReactElement {
  const { onNext, onBack } = props;
  const { session, setRules, updateRuleField, updateRulesFromPreset } = useMatchSetupStore();

  const [availablePresets, setAvailablePresets] = useState<any[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['timing']));
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Category definitions with colors and icons
  const categories: CategoryConfig[] = [
    {
      id: 'timing',
      label: '⏱️ Timing',
      icon: '⏱️',
      color: 'blue',
      bgColor: '#e3f2fd',
      fields: [
        { key: 'gameDuration', label: 'Game Duration', type: 'number', unit: 'min' },
        { key: 'shotClock', label: 'Shot Clock', type: 'number', unit: 'sec', hint: '0 = none' },
        { key: 'periods', label: 'Periods', type: 'number' },
        { key: 'overtimeFormat', label: 'Overtime', type: 'text', hint: 'e.g., "5 min"' }
      ]
    },
    {
      id: 'scoring',
      label: '🎯 Scoring',
      icon: '🎯',
      color: 'green',
      bgColor: '#e8f5e9',
      fields: [
        { key: 'pointsPerBasket', label: 'Basket', type: 'number', unit: 'pts' },
        { key: 'pointsOutside', label: '3-Point', type: 'number', unit: 'pts' },
        { key: 'freeThrow', label: 'Free Throw', type: 'number', unit: 'pt' },
        { key: 'winByTwo', label: 'Win by 2', type: 'checkbox' },
        { key: 'cap', label: 'Win Cap', type: 'number', unit: 'pts' }
      ]
    },
    {
      id: 'fouls',
      label: '🚫 Fouls',
      icon: '🚫',
      color: 'red',
      bgColor: '#ffebee',
      fields: [
        { key: 'personalFoulLimit', label: 'Personal Limit', type: 'number' },
        { key: 'teamFoulLimit', label: 'Team Limit', type: 'text', hint: 'e.g., "4/qtr"' },
        { key: 'bonusAfter', label: 'Bonus After', type: 'number' }
      ]
    },
    {
      id: 'violations',
      label: '⚠️ Violations',
      icon: '⚠️',
      color: 'orange',
      bgColor: '#fff3e0',
      fields: [
        { key: 'backcourt', label: 'Backcourt', type: 'number', unit: 'sec', hint: '0 = none' },
        { key: 'goaltending', label: 'Goaltending', type: 'checkbox' }
      ]
    },
    {
      id: 'gameplay',
      label: '🔄 Gameplay',
      icon: '🔄',
      color: 'purple',
      bgColor: '#f3e5f5',
      fields: [
        { key: 'timeouts', label: 'Timeouts', type: 'text', hint: 'e.g., "2/3/1"' },
        { key: 'substitutions', label: 'Substitutions', type: 'text', hint: '"unlimited"' }
      ]
    }
  ];

  // Initialize rules
  useEffect(() => {
    if (!session.sport) return;

    const presets = getRulePresetsBySport(session.sport);
    setAvailablePresets(presets);

    if (!session.rules) {
      const defaultPreset = getDefaultPreset(session.sport);
      setRules(defaultPreset.rules);
    }
  }, [session.sport, session.rules, setRules]);

  // Handle preset selection
  const handlePresetChange = (presetName: string) => {
    const preset = availablePresets.find((p) => p.name === presetName);
    if (preset) {
      updateRulesFromPreset(preset.rules);
      setValidationErrors([]);
    }
  };

  // Handle field change
  const handleFieldChange = (path: string, value: any) => {
    updateRuleField(path, value);
    const validation = ruleService.validateRules(session.rules!);
    setValidationErrors(validation.errors);
  };

  // Handle unwritten rules
  const handleUnwrittenRulesChange = (value: string) => {
    updateRuleField('unwrittenRules', value);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Get field value
  const getFieldValue = (categoryId: string, fieldKey: string): any => {
    return (session.rules as any)?.[categoryId]?.[fieldKey];
  };

  if (!session.rules) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading rules...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Configure Rules</Text>
        <Text style={styles.subtitle}>Select preset or customize</Text>
      </View>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ Issues</Text>
          {validationErrors.map((error, i) => (
            <Text key={i} style={styles.errorText}>• {error}</Text>
          ))}
        </View>
      )}

      {/* Preset Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>📋 Rule Preset</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.presetScroll}
        >
          {availablePresets.map((preset) => (
            <Pressable
              key={preset.name}
              style={[
                styles.presetCard,
                session.rules.presetName === preset.name && styles.presetCardActive
              ]}
              onPress={() => handlePresetChange(preset.name)}
            >
              <Text
                style={[
                  styles.presetName,
                  session.rules.presetName === preset.name && styles.presetNameActive
                ]}
              >
                {preset.name}
              </Text>
              <Text style={styles.presetDesc}>{preset.description}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Rules Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>📊 Current Rules</Text>
        <Text style={styles.summaryText}>
          {session.rules.timing.gameDuration}min • {session.rules.timing.periods} periods
        </Text>
        <Text style={styles.summaryText}>
          {session.rules.scoring.pointsPerBasket}/{session.rules.scoring.pointsOutside}pt{session.rules.scoring.winByTwo ? ' • win by 2' : ''}
        </Text>
        {session.rules.timing.shotClock > 0 && (
          <Text style={styles.summaryText}>
            {session.rules.timing.shotClock}s shot clock
          </Text>
        )}
      </View>

      {/* Rule Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            {/* Header */}
            <Pressable
              style={[styles.categoryHeader, { backgroundColor: category.bgColor }]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text style={styles.categoryTitle}>{category.label}</Text>
              <Text
                style={[
                  styles.categoryArrow,
                  expandedCategories.has(category.id) && styles.categoryArrowExpanded
                ]}
              >
                ▼
              </Text>
            </Pressable>

            {/* Content */}
            {expandedCategories.has(category.id) && (
              <View style={styles.categoryContent}>
                {category.fields.map((field) => {
                  const value = getFieldValue(category.id, field.key);

                  if (field.type === 'checkbox') {
                    return (
                      <View key={field.key} style={styles.fieldRow}>
                        <View style={styles.fieldLabelContainer}>
                          <Text style={styles.fieldLabel}>{field.label}</Text>
                          {field.hint && (
                            <Text style={styles.fieldHint}>{field.hint}</Text>
                          )}
                        </View>
                        <Switch
                          value={value || false}
                          onValueChange={(val) =>
                            handleFieldChange(
                              `${category.id}.${field.key}`,
                              val
                            )
                          }
                          trackColor={{ false: '#ccc', true: '#81c784' }}
                        />
                      </View>
                    );
                  }

                  return (
                    <View key={field.key} style={styles.field}>
                      <View style={styles.fieldHeader}>
                        <Text style={styles.fieldLabel}>{field.label}</Text>
                        {field.unit && (
                          <Text style={styles.fieldUnit}>{field.unit}</Text>
                        )}
                      </View>
                      <TextInput
                        style={styles.fieldInput}
                        value={String(value || '')}
                        onChangeText={(text) => {
                          if (field.type === 'number') {
                            handleFieldChange(
                              `${category.id}.${field.key}`,
                              parseInt(text) || 0
                            );
                          } else {
                            handleFieldChange(
                              `${category.id}.${field.key}`,
                              text
                            );
                          }
                        }}
                        keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                        placeholderTextColor="#bbb"
                      />
                      {field.hint && (
                        <Text style={styles.fieldHint}>{field.hint}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Unwritten Rules */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>📝 Unwritten Rules</Text>
        <Text style={styles.sectionHint}>Custom rules or local conventions</Text>
        <TextInput
          style={styles.unwrittenRulesInput}
          value={session.rules.unwrittenRules || ''}
          onChangeText={handleUnwrittenRulesChange}
          multiline
          numberOfLines={3}
          placeholder="e.g., Winner stays, No traveling"
          placeholderTextColor="#bbb"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Pressable
          style={[
            styles.nextButton,
            validationErrors.length > 0 && styles.nextButtonDisabled
          ]}
          onPress={onNext}
          disabled={validationErrors.length > 0}
        >
          <Text
            style={[
              styles.nextButtonText,
              validationErrors.length > 0 && styles.nextButtonTextDisabled
            ]}
          >
            Next →
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionHint: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  presetScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  presetCard: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    minWidth: 100,
  },
  presetCardActive: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd',
  },
  presetName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  presetNameActive: {
    color: '#1976d2',
  },
  presetDesc: {
    fontSize: 11,
    color: '#888',
  },
  errorContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#c62828',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#b71c1c',
    marginBottom: 2,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff9c4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f9a825',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f57f17',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 12,
    color: '#f57f17',
    marginBottom: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  categoryArrow: {
    fontSize: 12,
    color: '#666',
  },
  categoryArrowExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  categoryContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  field: {
    gap: 4,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabelContainer: {
    flex: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  fieldUnit: {
    fontSize: 12,
    color: '#999',
  },
  fieldHint: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  fieldInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  unwrittenRulesInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  backButton: {
    flex: 0.35,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    flex: 0.65,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1976d2',
  },
  nextButtonDisabled: {
    backgroundColor: '#bbb',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  nextButtonTextDisabled: {
    color: '#ddd',
  },
});
