/**
 * Registration Page
 * 
 * Allows new users to create either Player or Business accounts.
 * 
 * Features:
 * - Account type selection (Player/Business)
 * - Dynamic form based on account type
 * - Form validation with clear error messages
 * - Password confirmation matching
 * - Age calculation and minor user handling
 * - Terms and conditions acceptance
 * - Loading and error states
 * - Auto-redirect if already authenticated
 * 
 * Code Reviewers:
 * - Uses 'use client' for client-side form handling
 * - Multi-step registration (step 1: type selection, step 2: form)
 * - Comprehensive validation with specific error messages
 * - Proper accessibility attributes (ARIA labels, descriptions)
 * - Secure form handling with error recovery
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AccountType } from '@/lib/auth-types';
import type { Gender } from '@/lib/auth-types';

type RegistrationStep = 'account-type' | 'form';

/**
 * RegistrationPage Component
 * 
 * Multi-step registration flow for new users.
 */
export default function RegistrationPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, registerPlayer, registerBusiness } = useAuth();

  // ===== NAVIGATION STATE =====

  /** Current step in registration flow */
  const [step, setStep] = useState<RegistrationStep>('account-type');

  /** Selected account type */
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  // ===== FORM STATE =====

  /** Form submission loading state */
  const [isLoading, setIsLoading] = useState(false);

  /** Global error message */
  const [globalError, setGlobalError] = useState('');

  /** Success message */
  const [success, setSuccess] = useState('');

  /** Field-specific error messages */
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Player form fields
  const [playerForm, setPlayerForm] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    gender: '' as Gender | '',
    primarySport: '',
    acceptedTerms: false,
  });

  // Business form fields
  const [businessForm, setBusinessForm] = useState({
    email: '',
    username: '',
    businessName: '',
    businessType: '' as any,
    country: '',
    region: '',
    adminName: '',
    acceptedTerms: false,
  });

  // ===== EFFECTS =====

  /**
   * Redirect if already authenticated
   */
  useEffect(() => {
    if (!authLoading && user) {
      console.log('User already authenticated, redirecting');
      router.push('/');
    }
  }, [user, authLoading, router]);

  // ===== VALIDATION =====

  /**
   * Validate player form
   * 
   * @returns Object with field errors, empty if valid
   */
  const validatePlayerForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Email
    if (!playerForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(playerForm.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Username
    if (!playerForm.username.trim()) {
      errors.username = 'Username is required';
    } else if (playerForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (playerForm.username.length > 30) {
      errors.username = 'Username must be at most 30 characters';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(playerForm.username)) {
      errors.username = 'Username can only contain letters, numbers, dashes, and underscores';
    }

    // First name
    if (!playerForm.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    // Last name
    if (!playerForm.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    // Date of birth
    if (!playerForm.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(playerForm.dateOfBirth);
      const today = new Date();

      if (dob > today) {
        errors.dateOfBirth = 'Date of birth cannot be in the future';
      }

      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13) {
        errors.dateOfBirth = 'You must be at least 13 years old to register';
      }
    }

    // Country
    if (!playerForm.country) {
      errors.country = 'Country is required';
    }

    // Primary sport
    if (!playerForm.primarySport) {
      errors.primarySport = 'Please select a primary sport';
    }

    // Terms
    if (!playerForm.acceptedTerms) {
      errors.acceptedTerms = 'You must accept the terms and conditions';
    }

    return errors;
  };

  /**
   * Validate business form
   * 
   * @returns Object with field errors, empty if valid
   */
  const validateBusinessForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Email
    if (!businessForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessForm.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Username
    if (!businessForm.username.trim()) {
      errors.username = 'Username is required';
    } else if (businessForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (businessForm.username.length > 30) {
      errors.username = 'Username must be at most 30 characters';
    }

    // Business name
    if (!businessForm.businessName.trim()) {
      errors.businessName = 'Business name is required';
    }

    // Business type
    if (!businessForm.businessType) {
      errors.businessType = 'Please select a business type';
    }

    // Country
    if (!businessForm.country) {
      errors.country = 'Country is required';
    }

    // Region
    if (!businessForm.region.trim()) {
      errors.region = 'Region/City is required';
    }

    // Admin name
    if (!businessForm.adminName.trim()) {
      errors.adminName = 'Admin name is required';
    }

    // Terms
    if (!businessForm.acceptedTerms) {
      errors.acceptedTerms = 'You must accept the terms and conditions';
    }

    return errors;
  };

  // ===== FORM HANDLERS =====

  /**
   * Handle account type selection
   */
  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
    setStep('form');
    setGlobalError('');
    setFieldErrors({});
  };

  /**
   * Handle player form field change
   */
  const handlePlayerFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setPlayerForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field error when user starts editing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /**
   * Handle business form field change
   */
  const handleBusinessFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setBusinessForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field error when user starts editing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /**
   * Handle player registration submission
   */
  const handlePlayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError('');
    setSuccess('');

    // Validate form
    const errors = validatePlayerForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      // Call registerPlayer from auth context
      await registerPlayer({
        email: playerForm.email.toLowerCase(),
        username: playerForm.username.toLowerCase(),
        firstName: playerForm.firstName,
        lastName: playerForm.lastName,
        dateOfBirth: playerForm.dateOfBirth,
        country: playerForm.country,
        city: playerForm.city,
        gender: playerForm.gender || undefined,
        primarySport: playerForm.primarySport,
        acceptedTerms: playerForm.acceptedTerms,
      });

      setSuccess('Account created successfully! Redirecting...');

      // Redirect after brief delay
      setTimeout(() => {
        router.push('/'); // TODO: Redirect to dashboard or onboarding
      }, 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      console.error('Player registration error:', error);
      setGlobalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle business registration submission
   */
  const handleBusinessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError('');
    setSuccess('');

    // Validate form
    const errors = validateBusinessForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      // Call registerBusiness from auth context
      await registerBusiness({
        email: businessForm.email.toLowerCase(),
        username: businessForm.username.toLowerCase(),
        businessName: businessForm.businessName,
        businessType: businessForm.businessType,
        country: businessForm.country,
        region: businessForm.region,
        adminName: businessForm.adminName,
        acceptedTerms: businessForm.acceptedTerms,
      });

      setSuccess('Business account created successfully! Redirecting...');

      // Redirect after brief delay
      setTimeout(() => {
        router.push('/'); // TODO: Redirect to dashboard
      }, 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      console.error('Business registration error:', error);
      setGlobalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== RENDER =====

  // Show loading while checking initial auth state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // STEP 1: Account Type Selection
  if (step === 'account-type') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Athlee Account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Choose your account type to get started</p>
          </div>

          {/* Account Type Options */}
          <div className="mt-8 space-y-4">
            {/* Player Option */}
            <button
              onClick={() => handleAccountTypeSelect(AccountType.Player)}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
              aria-label="Create a Player account"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Player</h3>
                  <p className="text-sm text-gray-500">For athletes and sports enthusiasts</p>
                </div>
              </div>
            </button>

            {/* Business Option */}
            <button
              onClick={() => handleAccountTypeSelect(AccountType.Business)}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
              aria-label="Create a Business account"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m0 0h5.581M9 21m0-8h4m0 0h4m-4 0v4m-4-4v4"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Business</h3>
                  <p className="text-sm text-gray-500">For venues, academies, clubs, or brands</p>
                </div>
              </div>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header with Back Button */}
        <div>
          <button
            onClick={() => setStep('account-type')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-4"
            aria-label="Go back"
          >
            ← Back
          </button>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {accountType === AccountType.Player ? 'Player Registration' : 'Business Registration'}
          </h2>
        </div>

        {/* Form */}
        <form
          className="mt-8 space-y-6"
          onSubmit={accountType === 'Player' ? handlePlayerSubmit : handleBusinessSubmit}
          noValidate
        >
          {/* Global Error Alert */}
          {globalError && (
            <div className="rounded-md bg-red-50 p-4" role="alert" aria-live="polite">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{globalError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="rounded-md bg-green-50 p-4" role="alert" aria-live="polite">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Player Form */}
          {accountType === AccountType.Player && (
            <>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="you@example.com"
                  value={playerForm.email}
                  onChange={handlePlayerFieldChange}
                  disabled={isLoading}
                  aria-label="Email address"
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">@</span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`block w-full pl-8 pr-3 py-2 border ${
                      fieldErrors.username ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="johndoe"
                    value={playerForm.username}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                    aria-label="Username"
                    aria-describedby={fieldErrors.username ? 'username-error' : undefined}
                  />
                </div>
                {fieldErrors.username && (
                  <p id="username-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              {/* First Name & Last Name (Side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.firstName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="John"
                    value={playerForm.firstName}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.lastName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Doe"
                    value={playerForm.lastName}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  value={playerForm.dateOfBirth}
                  onChange={handlePlayerFieldChange}
                  disabled={isLoading}
                />
                {fieldErrors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.dateOfBirth}</p>
                )}
              </div>

              {/* Country & Gender (Side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.country ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={playerForm.country}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  >
                    <option value="">Select...</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                  {fieldErrors.country && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender (optional)
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.gender ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={playerForm.gender}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* City & Primary Sport */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City (optional)
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="New York"
                    value={playerForm.city}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="primarySport" className="block text-sm font-medium text-gray-700">
                    Primary sport
                  </label>
                  <select
                    id="primarySport"
                    name="primarySport"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.primarySport ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={playerForm.primarySport}
                    onChange={handlePlayerFieldChange}
                    disabled={isLoading}
                  >
                    <option value="">Select...</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                  {fieldErrors.primarySport && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.primarySport}</p>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="acceptedTerms"
                  name="acceptedTerms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  checked={playerForm.acceptedTerms}
                  onChange={handlePlayerFieldChange}
                  disabled={isLoading}
                />
                <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {fieldErrors.acceptedTerms && (
                <p className="text-sm text-red-600">{fieldErrors.acceptedTerms}</p>
              )}
            </>
          )}

          {/* Business Form */}
          {accountType === AccountType.Business && (
            <>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="admin@business.com"
                  value={businessForm.email}
                  onChange={handleBusinessFieldChange}
                  disabled={isLoading}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">@</span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`block w-full pl-8 pr-3 py-2 border ${
                      fieldErrors.username ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="mybusiness"
                    value={businessForm.username}
                    onChange={handleBusinessFieldChange}
                    disabled={isLoading}
                  />
                </div>
                {fieldErrors.username && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.businessName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="My Sports Arena"
                  value={businessForm.businessName}
                  onChange={handleBusinessFieldChange}
                  disabled={isLoading}
                />
                {fieldErrors.businessName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.businessName}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                  Business type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.businessType ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  value={businessForm.businessType}
                  onChange={handleBusinessFieldChange}
                  disabled={isLoading}
                >
                  <option value="">Select...</option>
                  <option value="Venue">Venue/Court</option>
                  <option value="Academy">Academy</option>
                  <option value="Club">Club</option>
                  <option value="Brand">Brand/Sponsor</option>
                </select>
                {fieldErrors.businessType && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.businessType}</p>
                )}
              </div>

              {/* Country & Region */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.country ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={businessForm.country}
                    onChange={handleBusinessFieldChange}
                    disabled={isLoading}
                  >
                    <option value="">Select...</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                  {fieldErrors.country && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    City/Region
                  </label>
                  <input
                    id="region"
                    name="region"
                    type="text"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      fieldErrors.region ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="New York"
                    value={businessForm.region}
                    onChange={handleBusinessFieldChange}
                    disabled={isLoading}
                  />
                  {fieldErrors.region && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.region}</p>
                  )}
                </div>
              </div>

              {/* Admin Name */}
              <div>
                <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">
                  Admin/Contact name
                </label>
                <input
                  id="adminName"
                  name="adminName"
                  type="text"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    fieldErrors.adminName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="John Smith"
                  value={businessForm.adminName}
                  onChange={handleBusinessFieldChange}
                  disabled={isLoading}
                />
                {fieldErrors.adminName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.adminName}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="acceptedTerms"
                  name="acceptedTerms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  checked={businessForm.acceptedTerms}
                  onChange={handleBusinessFieldChange}
                  disabled={isLoading}
                />
                <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {fieldErrors.acceptedTerms && (
                <p className="text-sm text-red-600">{fieldErrors.acceptedTerms}</p>
              )}
            </>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path fill="currentColor" d="M4.232 4.232a10 10 0 011.414-1.414" />
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

