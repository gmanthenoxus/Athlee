import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { SelectField } from '../components/SelectField';
import {
  AccountType,
  Gender,
  BusinessType,
  validateEmail,
  bypassMagicLink,
  validateAge,
  getSortedCountries,
  detectUserCountry,
  validateUsername,
  checkUsernameAvailability,
  generateUsername,
  generateBusinessUsername,
  validateFirstName,
  validateLastName,
  validateCountry,
  validatePrimarySport,
  validateCity,
  validateBusinessName,
  validateBusinessType,
  validateRegion,
  validateAdminName,
  type PlayerRegistrationData,
  type BusinessRegistrationData,
} from '@athlehub/shared';
import DateTimePicker from '@react-native-community/datetimepicker';

type RegistrationStep = 'account-type' | 'email' | 'magic-link-sent' | 'player-details' | 'business-details' | 'complete';

interface PlayerFormData {
  accountType: AccountType.Player;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  gender: Gender | '';
  primarySport: string;
  acceptedTerms: boolean;
}

interface BusinessFormData {
  accountType: AccountType.Business;
  email: string;
  username: string;
  businessName: string;
  businessType: BusinessType;
  country: string;
  region: string;
  adminName: string;
  acceptedTerms: boolean;
}

type FormData = PlayerFormData | BusinessFormData;

const SPORTS = ['Basketball', 'Football', 'Soccer', 'Tennis', 'Badminton', 'Table Tennis', 'Volleyball', 'Baseball', 'Cricket', 'Rugby'];
const COUNTRIES = getSortedCountries();

// Convert countries and sports to SelectField options format
const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  label: country.name,
  value: country.code,
  flag: country.flag,
}));

const SPORT_OPTIONS = SPORTS.map((sport) => ({
  label: sport,
  value: sport,
}));

const GENDER_OPTIONS = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
  { label: 'Non-binary', value: Gender.NonBinary },
  { label: 'Prefer not to say', value: Gender.PreferNotToSay },
];

const BUSINESS_TYPE_OPTIONS = [
  { label: 'Venue', value: BusinessType.Venue },
  { label: 'Academy', value: BusinessType.Academy },
  { label: 'Club', value: BusinessType.Club },
  { label: 'Brand', value: BusinessType.Brand },
];

export default function RegisterScreen() {
  const router = useRouter();
  const { registerPlayer, registerBusiness, sendMagicLink, isLoading } = useAuth();

  const [step, setStep] = useState<RegistrationStep>('account-type');
  const [error, setError] = useState('');
  const [ageWarning, setAgeWarning] = useState<string[]>([]);
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType.Player | AccountType.Business>(AccountType.Player);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    accountType: AccountType.Player,
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: detectUserCountry(),
    city: '',
    gender: '',
    primarySport: 'Basketball',
    acceptedTerms: false,
  });

  // Step 1: Account type selection
  const handleAccountTypeSubmit = () => {
    if (selectedAccountType === AccountType.Player) {
      setFormData({
        accountType: AccountType.Player,
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        country: detectUserCountry(),
        city: '',
        gender: '',
        primarySport: 'Basketball',
        acceptedTerms: false,
      });
    } else {
      setFormData({
        accountType: AccountType.Business,
        email: '',
        username: '',
        businessName: '',
        businessType: BusinessType.Venue,
        country: detectUserCountry(),
        region: '',
        adminName: '',
        acceptedTerms: false,
      });
    }
    setStep('email');
  };

  // Step 2: Email input and magic link
  const handleEmailSubmit = async () => {
    setError('');

    const validation = validateEmail(formData.email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    try {
      await sendMagicLink(formData.email);
      setStep('magic-link-sent');
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
    }
  };

  // Step 3: Bypass magic link (development mode)
  const handleBypassMagicLink = () => {
    bypassMagicLink(formData.email);
    if (formData.accountType === AccountType.Player) {
      setStep('player-details');
    } else {
      setStep('business-details');
    }
  };

  // Step 4: Player details submit
  const handlePlayerDetailsSubmit = async () => {
    setError('');
    setAgeWarning([]);

    if (formData.accountType !== AccountType.Player) return;

    // Validate first name
    const firstNameValidation = validateFirstName(formData.firstName);
    if (!firstNameValidation.valid) {
      setError(firstNameValidation.error || 'Invalid first name');
      return;
    }

    // Validate last name
    const lastNameValidation = validateLastName(formData.lastName);
    if (!lastNameValidation.valid) {
      setError(lastNameValidation.error || 'Invalid last name');
      return;
    }

    // Validate city (optional)
    const cityValidation = validateCity(formData.city.trim() || undefined);
    if (!cityValidation.valid) {
      setError(cityValidation.error || 'Invalid city');
      return;
    }

    // Validate country
    const countryValidation = validateCountry(formData.country);
    if (!countryValidation.valid) {
      setError(countryValidation.error || 'Invalid country');
      return;
    }

    // Validate primary sport
    const sportValidation = validatePrimarySport(formData.primarySport);
    if (!sportValidation.valid) {
      setError(sportValidation.error || 'Invalid primary sport');
      return;
    }

    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }

    // Validate username format
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.valid) {
      setError(usernameValidation.error || 'Invalid username');
      return;
    }

    // Check username availability
    if (!checkUsernameAvailability(formData.username)) {
      setError('This username is already taken');
      return;
    }

    if (!formData.dateOfBirth) {
      setError('Date of birth is required');
      return;
    }

    if (!formData.acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    // Validate age
    const ageValidation = validateAge(formData.dateOfBirth);
    if (!ageValidation.canRegister) {
      setError(ageValidation.error || 'Cannot register with this age');
      return;
    }

    // Show age restrictions warning if minor
    if (ageValidation.isMinor && ageValidation.restrictions) {
      setAgeWarning(ageValidation.restrictions);
    }

    try {
      const registrationData: PlayerRegistrationData = {
        email: formData.email,
        username: formData.username.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
        city: formData.city.trim() || undefined,
        gender: formData.gender || undefined,
        primarySport: formData.primarySport,
        acceptedTerms: formData.acceptedTerms,
      };

      await registerPlayer(registrationData);
      setStep('complete');

      // Redirect after a short delay
      setTimeout(() => {
        router.replace('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    }
  };

  // Step 5: Business details submit
  const handleBusinessDetailsSubmit = async () => {
    setError('');

    if (formData.accountType !== AccountType.Business) return;

    // Validate business name
    const businessNameValidation = validateBusinessName(formData.businessName);
    if (!businessNameValidation.valid) {
      setError(businessNameValidation.error || 'Invalid business name');
      return;
    }

    // Validate business type
    const businessTypeValidation = validateBusinessType(formData.businessType);
    if (!businessTypeValidation.valid) {
      setError(businessTypeValidation.error || 'Invalid business type');
      return;
    }

    // Validate admin name
    const adminNameValidation = validateAdminName(formData.adminName);
    if (!adminNameValidation.valid) {
      setError(adminNameValidation.error || 'Invalid admin name');
      return;
    }

    // Validate country
    const countryValidation = validateCountry(formData.country);
    if (!countryValidation.valid) {
      setError(countryValidation.error || 'Invalid country');
      return;
    }

    // Validate region
    const regionValidation = validateRegion(formData.region);
    if (!regionValidation.valid) {
      setError(regionValidation.error || 'Invalid region');
      return;
    }

    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }

    // Validate username format
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.valid) {
      setError(usernameValidation.error || 'Invalid username');
      return;
    }

    // Check username availability
    if (!checkUsernameAvailability(formData.username)) {
      setError('This username is already taken');
      return;
    }

    if (!formData.acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      const registrationData: BusinessRegistrationData = {
        email: formData.email,
        username: formData.username.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType,
        country: formData.country,
        region: formData.region.trim(),
        adminName: formData.adminName.trim(),
        acceptedTerms: formData.acceptedTerms,
      };

      await registerBusiness(registrationData);
      setStep('complete');

      // Redirect after a short delay
      setTimeout(() => {
        router.replace('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    }
  };

  // Date picker handler
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate && formData.accountType === AccountType.Player) {
      const dateString = selectedDate.toISOString().split('T')[0];
      setFormData({ ...formData, dateOfBirth: dateString });
    }
  };

  // Render different UI based on step
  const renderStepContent = () => {
    switch (step) {
      case 'account-type':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Choose Account Type</Text>
            <Text style={styles.subtitle}>Select the type of account you want to create</Text>

            <TouchableOpacity
              style={[styles.accountTypeCard, selectedAccountType === AccountType.Player && styles.accountTypeCardSelected]}
              onPress={() => setSelectedAccountType(AccountType.Player)}
            >
              <Text style={styles.accountTypeTitle}>🏃 Player Account</Text>
              <Text style={styles.accountTypeDescription}>
                For individual athletes and sports enthusiasts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.accountTypeCard, selectedAccountType === AccountType.Business && styles.accountTypeCardSelected]}
              onPress={() => setSelectedAccountType(AccountType.Business)}
            >
              <Text style={styles.accountTypeTitle}>🏢 Business Account</Text>
              <Text style={styles.accountTypeDescription}>
                For venues, academies, clubs, and brands
              </Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleAccountTypeSubmit}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        );

      case 'email':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Enter Your Email</Text>
            <Text style={styles.subtitle}>We'll send you a magic link to verify your email</Text>

            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleEmailSubmit}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Sending...' : 'Send Magic Link'}
              </Text>
            </TouchableOpacity>

          </View>
        );

      case 'magic-link-sent':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>✉️ Check Your Email</Text>
            <Text style={styles.subtitle}>
              We've sent a magic link to {formData.email}. Click the link to continue registration.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 For development purposes, you can skip email verification
              </Text>
            </View>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleBypassMagicLink}
            >
              <Text style={styles.secondaryButtonText}>Continue Anyway (Dev Mode)</Text>
            </TouchableOpacity>
          </View>
        );

      case 'player-details':
        if (formData.accountType !== AccountType.Player) return null;

        return (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.stepContainer}>
              <Text style={styles.title}>Player Details</Text>
              <Text style={styles.subtitle}>Tell us about yourself</Text>

              {/* First Name */}
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                editable={!isLoading}
              />

              {/* Last Name */}
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                editable={!isLoading}
              />

              {/* Username */}
              <Text style={styles.label}>Username *</Text>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernamePrefix}>@</Text>
                <TextInput
                  style={styles.usernameInput}
                  placeholder="johndoe"
                  value={formData.username}
                  onChangeText={(text) => {
                    const value = text.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                    setFormData({ ...formData, username: value });
                  }}
                  onBlur={() => {
                    // Auto-generate if empty
                    if (!formData.username && formData.firstName && formData.lastName) {
                      const suggested = generateUsername(formData.firstName, formData.lastName);
                      setFormData({ ...formData, username: suggested });
                    }
                  }}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              <Text style={styles.helperText}>
                3-20 characters, letters, numbers, underscores, and hyphens only
              </Text>

              {/* Date of Birth */}
              <Text style={styles.label}>Date of Birth *</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={formData.dateOfBirth ? styles.inputText : styles.placeholderText}>
                  {formData.dateOfBirth || 'Select date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              <Text style={styles.helperText}>You must be at least 13 years old to register</Text>

              {/* Country */}
              <SelectField
                label="Country"
                value={formData.country}
                options={COUNTRY_OPTIONS}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
                required
                searchable
                disabled={isLoading}
              />

              {/* City (Optional) */}
              <Text style={styles.label}>City (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="New York"
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
                editable={!isLoading}
              />

              {/* Gender (Optional) */}
              <SelectField
                label="Gender"
                value={formData.gender}
                options={GENDER_OPTIONS}
                onValueChange={(value) => setFormData({ ...formData, gender: value as Gender | '' })}
                placeholder="Prefer not to say"
                searchable={false}
                disabled={isLoading}
              />

              {/* Primary Sport */}
              <SelectField
                label="Primary Sport"
                value={formData.primarySport}
                options={SPORT_OPTIONS}
                onValueChange={(value) => setFormData({ ...formData, primarySport: value })}
                required
                searchable
                disabled={isLoading}
              />

              {/* Age Warning */}
              {ageWarning.length > 0 && (
                <View style={styles.warningBox}>
                  <Text style={styles.warningTitle}>⚠️ Age Restrictions</Text>
                  {ageWarning.map((warning, index) => (
                    <Text key={index} style={styles.warningText}>• {warning}</Text>
                  ))}
                </View>
              )}

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setFormData({ ...formData, acceptedTerms: !formData.acceptedTerms })}
              >
                <View style={[styles.checkbox, formData.acceptedTerms && styles.checkboxChecked]}>
                  {formData.acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>
                  I accept the Terms and Conditions
                </Text>
              </TouchableOpacity>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handlePlayerDetailsSubmit}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );

      case 'business-details':
        if (formData.accountType !== AccountType.Business) return null;

        return (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.stepContainer}>
              <Text style={styles.title}>Business Details</Text>
              <Text style={styles.subtitle}>Tell us about your business</Text>

              {/* Business Name */}
              <Text style={styles.label}>Business Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Elite Sports Arena"
                value={formData.businessName}
                onChangeText={(text) => setFormData({ ...formData, businessName: text })}
                editable={!isLoading}
              />

              {/* Username */}
              <Text style={styles.label}>Username *</Text>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernamePrefix}>@</Text>
                <TextInput
                  style={styles.usernameInput}
                  placeholder="elitesportsarena"
                  value={formData.username}
                  onChangeText={(text) => {
                    const value = text.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                    setFormData({ ...formData, username: value });
                  }}
                  onBlur={() => {
                    // Auto-generate if empty
                    if (!formData.username && formData.businessName) {
                      const suggested = generateBusinessUsername(formData.businessName);
                      setFormData({ ...formData, username: suggested });
                    }
                  }}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              <Text style={styles.helperText}>
                3-20 characters, letters, numbers, underscores, and hyphens only
              </Text>

              {/* Business Type */}
              <SelectField
                label="Business Type"
                value={formData.businessType}
                options={BUSINESS_TYPE_OPTIONS}
                onValueChange={(value) => setFormData({ ...formData, businessType: value as BusinessType })}
                required
                searchable={false}
                disabled={isLoading}
              />

              {/* Country */}
              <SelectField
                label="Country"
                value={formData.country}
                options={COUNTRY_OPTIONS}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
                required
                searchable
                disabled={isLoading}
              />

              {/* Region */}
              <Text style={styles.label}>Region/State *</Text>
              <TextInput
                style={styles.input}
                placeholder="New York"
                value={formData.region}
                onChangeText={(text) => setFormData({ ...formData, region: text })}
                editable={!isLoading}
              />

              {/* Admin Name */}
              <Text style={styles.label}>Admin Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={formData.adminName}
                onChangeText={(text) => setFormData({ ...formData, adminName: text })}
                editable={!isLoading}
              />

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setFormData({ ...formData, acceptedTerms: !formData.acceptedTerms })}
              >
                <View style={[styles.checkbox, formData.acceptedTerms && styles.checkboxChecked]}>
                  {formData.acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>
                  I accept the Terms and Conditions
                </Text>
              </TouchableOpacity>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleBusinessDetailsSubmit}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );

      case 'complete':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.title}>Registration Complete!</Text>
            <Text style={styles.subtitle}>
              Your account has been created successfully. Redirecting to home...
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  // Determine if back button should show
  const showBackButton = step !== 'account-type' && step !== 'complete';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back navigation */}
      {showBackButton && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              switch (step) {
                case 'email':
                  setStep('account-type');
                  break;
                case 'magic-link-sent':
                  setStep('email');
                  break;
                case 'player-details':
                  setStep('magic-link-sent');
                  break;
                case 'business-details':
                  setStep('magic-link-sent');
                  break;
              }
            }}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        {renderStepContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#1f2937',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  usernamePrefix: {
    paddingLeft: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  usernameInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  accountTypeCard: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  accountTypeCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  accountTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  accountTypeDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  infoText: {
    color: '#1e40af',
    fontSize: 14,
  },
  warningBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400e',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  successIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
});

