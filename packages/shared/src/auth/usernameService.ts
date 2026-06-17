/**
 * Username Service
 * Handles username validation and availability checking
 */

export interface UsernameValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate username format
 * Rules:
 * - 3-20 characters
 * - Alphanumeric, underscores, and hyphens only
 * - Must start with a letter or number
 * - Cannot end with underscore or hyphen
 * - No consecutive special characters
 */
export function validateUsername(username: string): UsernameValidationResult {
  const trimmed = username.trim();

  // Check length
  if (trimmed.length < 3) {
    return {
      valid: false,
      error: 'Username must be at least 3 characters long',
    };
  }

  if (trimmed.length > 20) {
    return {
      valid: false,
      error: 'Username must be 20 characters or less',
    };
  }

  // Check format: alphanumeric, underscores, hyphens only
  const validFormat = /^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
  if (!validFormat.test(trimmed)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, underscores, and hyphens. Must start and end with a letter or number.',
    };
  }

  // Check for consecutive special characters
  if (/[_-]{2,}/.test(trimmed)) {
    return {
      valid: false,
      error: 'Username cannot contain consecutive underscores or hyphens',
    };
  }

  // Check for reserved usernames
  const reserved = [
    'admin', 'administrator', 'athlehub', 'support', 'help', 'api', 'www',
    'root', 'system', 'moderator', 'mod', 'staff', 'official', 'verified',
    'null', 'undefined', 'true', 'false', 'test', 'demo',
  ];

  if (reserved.includes(trimmed.toLowerCase())) {
    return {
      valid: false,
      error: 'This username is reserved and cannot be used',
    };
  }

  return { valid: true };
}

/**
 * Generate username from name
 * Creates a suggested username based on first and last name
 */
export function generateUsername(firstName: string, lastName: string): string {
  const first = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const last = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Try different combinations
  const suggestions = [
    `${first}${last}`,
    `${first}_${last}`,
    `${first}${last.charAt(0)}`,
    `${first.charAt(0)}${last}`,
  ];

  // Return first valid suggestion
  for (const suggestion of suggestions) {
    const validation = validateUsername(suggestion);
    if (validation.valid) {
      return suggestion;
    }
  }

  // Fallback
  return `${first}${Math.floor(Math.random() * 1000)}`;
}

/**
 * Generate username from business name
 */
export function generateBusinessUsername(businessName: string): string {
  const cleaned = businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 20);

  const validation = validateUsername(cleaned);
  if (validation.valid) {
    return cleaned;
  }

  // Fallback: remove underscores and try again
  const noUnderscores = cleaned.replace(/_/g, '');
  const validation2 = validateUsername(noUnderscores);
  if (validation2.valid) {
    return noUnderscores;
  }

  // Final fallback
  return `business${Math.floor(Math.random() * 10000)}`;
}

/**
 * Mock username availability check
 * In production, this would check against a database
 */
const takenUsernames = new Set<string>([
  'alexmorgan',
  'jordansmith',
  'taylorjohnson',
  'elitesportsarena',
  'championsacademy',
]);

export function checkUsernameAvailability(username: string): boolean {
  return !takenUsernames.has(username.toLowerCase());
}

/**
 * Reserve a username (for mock purposes)
 */
export function reserveUsername(username: string): void {
  takenUsernames.add(username.toLowerCase());
}

