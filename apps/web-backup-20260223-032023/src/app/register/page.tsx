'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
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
  type PlayerRegistrationData,
  type BusinessRegistrationData,
} from '@athlehub/shared';

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

export default function RegisterPage() {
  const router = useRouter();
  const { registerPlayer, registerBusiness, sendMagicLink, isLoading } = useAuth();

  const [step, setStep] = useState<RegistrationStep>('account-type');
  const [error, setError] = useState('');
  const [ageWarning, setAgeWarning] = useState<string[]>([]);
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType.Player | AccountType.Business>(AccountType.Player);

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
    // Reset form data based on selected account type
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
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
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

  // Step 3: Bypass magic link (development)
  const handleBypassMagicLink = async () => {
    try {
      await bypassMagicLink(formData.email);
      // Go to appropriate details form based on account type
      if (formData.accountType === AccountType.Player) {
        setStep('player-details');
      } else {
        setStep('business-details');
      }
    } catch (err) {
      setError('Failed to bypass magic link.');
    }
  };

  // Step 4: Player details submission
  const handlePlayerDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setAgeWarning([]);

    if (formData.accountType !== AccountType.Player) return;

    // Validate inputs
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
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

    if (!formData.primarySport) {
      setError('Primary sport is required');
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
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    }
  };

  // Step 5: Business details submission
  const handleBusinessDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.accountType !== AccountType.Business) return;

    // Validate inputs
    if (!formData.businessName.trim()) {
      setError('Business name is required');
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

    if (!formData.adminName.trim()) {
      setError('Admin name is required');
      return;
    }

    if (!formData.region.trim()) {
      setError('Region is required');
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
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    }
  };

  // Render different UI based on step
  const renderStepContent = () => {
    switch (step) {
      case 'account-type':
        const accountTypes = [
          { type: AccountType.Player, icon: '👤', description: 'For individual players and athletes' },
          { type: AccountType.Business, icon: '🏢', description: 'For venues, academies, clubs, and brands' },
        ];

        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Select Account Type
              </label>
              <div className="space-y-3">
                {accountTypes.map(({ type, icon, description }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedAccountType(type as AccountType.Player | AccountType.Business)}
                    className={`w-full p-4 border rounded-md text-left transition-colors flex items-center gap-3 ${
                      selectedAccountType === type
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{type}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                    {selectedAccountType === type && (
                      <div className="text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAccountTypeSubmit}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Continue
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Already have an account? Login here
              </Link>
            </div>
          </div>
        );

      case 'email':
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Creating a <strong>{formData.accountType}</strong> account
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.email.trim()}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('account-type')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to account type
              </button>
            </div>
          </form>
        );

      case 'magic-link-sent':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Check Your Email
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We sent a magic link to <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Click the link in the email to continue registration.
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
                Development Mode: Skip email verification
              </p>
              <button
                onClick={handleBypassMagicLink}
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
              >
                Continue Anyway
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Use a different email
              </button>
            </div>
          </div>
        );

      case 'player-details':
        if (formData.accountType !== AccountType.Player) return null;

        return (
          <form onSubmit={handlePlayerDetailsSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  autoFocus
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                    setFormData({ ...formData, username: value });
                  }}
                  onBlur={() => {
                    // Auto-generate if empty
                    if (!formData.username && formData.firstName && formData.lastName) {
                      const suggested = generateUsername(formData.firstName, formData.lastName);
                      setFormData({ ...formData, username: suggested });
                    }
                  }}
                  placeholder="johndoe"
                  disabled={isLoading}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3-20 characters, letters, numbers, underscores, and hyphens only
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                disabled={isLoading}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You must be at least 13 years old to register
              </p>
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Country *
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City (Optional) */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                City (Optional)
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
            </div>

            {/* Gender (Optional) */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Gender (Optional)
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender | '' })}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">Select Gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
                <option value={Gender.NonBinary}>Non-binary</option>
                <option value={Gender.PreferNotToSay}>Prefer not to say</option>
              </select>
            </div>

            {/* Primary Sport */}
            <div>
              <label
                htmlFor="primarySport"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Primary Sport *
              </label>
              <select
                id="primarySport"
                value={formData.primarySport}
                onChange={(e) => setFormData({ ...formData, primarySport: e.target.value })}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                {SPORTS.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="acceptedTerms"
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                disabled={isLoading}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I accept the <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Age Warning */}
            {ageWarning.length > 0 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Age Restrictions Apply:
                </p>
                <ul className="text-xs text-yellow-700 dark:text-yellow-300 list-disc list-inside space-y-1">
                  {ageWarning.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.firstName.trim() || !formData.lastName.trim() || !formData.dateOfBirth || !formData.acceptedTerms}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        );

      case 'business-details':
        if (formData.accountType !== AccountType.Business) return null;

        return (
          <form onSubmit={handleBusinessDetailsSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Business Name *
              </label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Elite Sports Arena"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                autoFocus
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                    setFormData({ ...formData, username: value });
                  }}
                  onBlur={() => {
                    // Auto-generate if empty
                    if (!formData.username && formData.businessName) {
                      const suggested = generateBusinessUsername(formData.businessName);
                      setFormData({ ...formData, username: suggested });
                    }
                  }}
                  placeholder="elitesportsarena"
                  disabled={isLoading}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3-20 characters, letters, numbers, underscores, and hyphens only
              </p>
            </div>

            {/* Business Type */}
            <div>
              <label
                htmlFor="businessType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Business Type *
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value={BusinessType.Venue}>Venue</option>
                <option value={BusinessType.Academy}>Academy</option>
                <option value={BusinessType.Club}>Club</option>
                <option value={BusinessType.Brand}>Brand</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Country *
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Region/State *
              </label>
              <input
                id="region"
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="California"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
            </div>

            {/* Admin Name */}
            <div>
              <label
                htmlFor="adminName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Admin Name *
              </label>
              <input
                id="adminName"
                type="text"
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                placeholder="John Doe"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="acceptedTerms"
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                disabled={isLoading}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I accept the <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.businessName.trim() || !formData.adminName.trim() || !formData.region.trim() || !formData.acceptedTerms}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        );

      case 'complete':
        return (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Account Created!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirecting you to the app...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Athlehub
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {step === 'account-type' && 'Select Account Type'}
            {step === 'email' && 'Create Account'}
            {step === 'magic-link-sent' && 'Verify Email'}
            {step === 'player-details' && 'Player Details'}
            {step === 'business-details' && 'Business Details'}
            {step === 'complete' && 'Welcome!'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          {renderStepContent()}
        </div>

        {step === 'email' && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            This is a mock authentication system for development purposes only.
          </p>
        )}
      </div>
    </div>
  );
}

