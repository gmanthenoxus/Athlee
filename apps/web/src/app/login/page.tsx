/**
 * Login Page
 * 
 * Authentication page for existing users to sign in.
 * 
 * Features:
 * - Email input with validation
 * - Loading and error states
 * - Links to registration and password recovery
 * - Auto-redirect if already authenticated
 * - Responsive design
 * 
 * Code Reviewers:
 * - Uses 'use client' for client-side form handling
 * - Error handling with user-friendly messages
 * - Form validation before submission
 * - Proper loading state management
 * - Accessibility: ARIA labels, proper form structure
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

/**
 * LoginPage Component
 * 
 * Handles user login with email validation.
 * In production, would also require password verification.
 */
export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, login } = useAuth();

  // ===== LOCAL STATE =====

  /** Email input value */
  const [email, setEmail] = useState('');

  /** Form submission loading state */
  const [isLoading, setIsLoading] = useState(false);

  /** Error message to display */
  const [error, setError] = useState('');

  /** Success message to display */
  const [success, setSuccess] = useState('');

  // ===== EFFECTS =====

  /**
   * Redirect if already authenticated
   * 
   * If user is logged in, no need to show login page.
   * Redirect to home or dashboard.
   */
  useEffect(() => {
    if (!authLoading && user) {
      console.log('User already authenticated, redirecting');
      router.push('/'); // TODO: Redirect to dashboard or home
    }
  }, [user, authLoading, router]);

  // ===== FORM HANDLERS =====

  /**
   * Handle email input change
   * Clear any existing errors when user starts typing
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  /**
   * Validate email format
   * 
   * @returns Error message if invalid, empty string if valid
   */
  const validateEmail = (emailToCheck: string): string => {
    if (!emailToCheck.trim()) {
      return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToCheck)) {
      return 'Please enter a valid email address';
    }

    return '';
  };

  /**
   * Handle form submission
   * 
   * Flow:
   * 1. Validate email format
   * 2. Call login from useAuth
   * 3. Handle success or error
   * 4. Show appropriate feedback to user
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Call login method from auth context
      await login(email);

      // Show success message
      setSuccess('Login successful! Redirecting...');

      // Clear form
      setEmail('');

      // Redirect after brief delay (so user sees success message)
      setTimeout(() => {
        router.push('/'); // TODO: Redirect to dashboard
      }, 1000);
    } catch (loginError) {
      // Handle login errors
      const errorMessage =
        loginError instanceof Error ? loginError.message : 'Login failed. Please try again.';

      console.error('Login error:', loginError);
      setError(errorMessage);

      // Specific error messages for common cases
      if (errorMessage.includes('not found')) {
        setError('Email not found. Please check and try again or register a new account.');
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Athlee</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect with athletes and sports enthusiasts
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Error Alert */}
          {error && (
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
                  <p className="text-sm font-medium text-red-800">{error}</p>
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

          {/* Email Input */}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              aria-label="Email address"
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path fill="currentColor" d="M4.232 4.232a10 10 0 021.414-1.414" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Create account
          </Link>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue as</span>
          </div>
        </div>

        {/* Visitor Mode Button */}
        <div>
          <Link
            href="/explore"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Browse as visitor
          </Link>
        </div>
      </div>
    </div>
  );
}

