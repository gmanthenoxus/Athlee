/**
 * Age Gating Service
 * Handles age calculation, validation, and restriction logic
 */

export interface AgeValidationResult {
  age: number;
  isMinor: boolean;
  canRegister: boolean;
  restrictions: string[] | null;
  error?: string;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
  const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  // Adjust if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Validate date of birth and apply age restrictions
 */
export function validateAge(dateOfBirth: Date | string): AgeValidationResult {
  try {
    const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
    
    // Check if valid date
    if (isNaN(dob.getTime())) {
      return {
        age: 0,
        isMinor: false,
        canRegister: false,
        restrictions: null,
        error: 'Invalid date of birth',
      };
    }
    
    // Check if date is in the future
    if (dob > new Date()) {
      return {
        age: 0,
        isMinor: false,
        canRegister: false,
        restrictions: null,
        error: 'Date of birth cannot be in the future',
      };
    }
    
    const age = calculateAge(dob);
    
    // Under 13: Cannot register (COPPA compliance)
    if (age < 13) {
      return {
        age,
        isMinor: true,
        canRegister: false,
        restrictions: null,
        error: 'You must be at least 13 years old to create an account',
      };
    }
    
    // 13-17: Can register with restrictions
    if (age < 18) {
      return {
        age,
        isMinor: true,
        canRegister: true,
        restrictions: [
          'Private profile by default',
          'No public discovery in explore',
          'Limited chat/DM features',
          'Parental controls available',
        ],
      };
    }
    
    // 18+: Full access
    return {
      age,
      isMinor: false,
      canRegister: true,
      restrictions: null,
    };
  } catch (error) {
    return {
      age: 0,
      isMinor: false,
      canRegister: false,
      restrictions: null,
      error: 'Failed to validate date of birth',
    };
  }
}

/**
 * Get minor restrictions for a user
 */
export function getMinorRestrictions(age: number): string[] | null {
  if (age >= 18) {
    return null;
  }
  
  if (age < 13) {
    return ['Account creation not allowed'];
  }
  
  return [
    'Private profile by default',
    'No public discovery in explore',
    'Limited chat/DM features',
    'Parental controls available',
  ];
}

/**
 * Check if user is a minor
 */
export function isMinor(dateOfBirth: Date | string): boolean {
  const age = calculateAge(dateOfBirth);
  return age < 18;
}

/**
 * Check if user can register
 */
export function canRegister(dateOfBirth: Date | string): boolean {
  const age = calculateAge(dateOfBirth);
  return age >= 13;
}

/**
 * Format age validation error message
 */
export function getAgeErrorMessage(age: number): string | null {
  if (age < 13) {
    return 'You must be at least 13 years old to create an account';
  }
  return null;
}

