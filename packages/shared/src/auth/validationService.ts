/**
 * Comprehensive Validation Service
 * Centralizes all field validation for Player and Business registration
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// ==================== PLAYER FIELD VALIDATORS ====================

/**
 * Validate first name
 * Rules:
 * - 1-50 characters
 * - Can contain letters, spaces, hyphens, apostrophes
 * - No leading/trailing spaces
 */
export function validateFirstName(firstName: string): ValidationResult {
  const trimmed = firstName.trim();

  if (!trimmed) {
    return { valid: false, error: 'First name cannot be empty' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'First name must be 50 characters or less' };
  }

  // Allow letters, spaces, hyphens, apostrophes
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, error: 'First name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
}

/**
 * Validate last name
 * Rules:
 * - 1-50 characters
 * - Can contain letters, spaces, hyphens, apostrophes
 * - No leading/trailing spaces
 */
export function validateLastName(lastName: string): ValidationResult {
  const trimmed = lastName.trim();

  if (!trimmed) {
    return { valid: false, error: 'Last name cannot be empty' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Last name must be 50 characters or less' };
  }

  // Allow letters, spaces, hyphens, apostrophes
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, error: 'Last name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
}

/**
 * Validate city
 * Rules:
 * - Optional but if provided must be 2-50 characters
 * - Can contain letters, spaces, hyphens
 */
export function validateCity(city: string | undefined): ValidationResult {
  if (!city) {
    return { valid: true }; // Optional field
  }

  const trimmed = city.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'City must be at least 2 characters' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'City must be 50 characters or less' };
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, error: 'City can only contain letters, spaces, and hyphens' };
  }

  return { valid: true };
}

/**
 * Validate country code
 * Rules:
 * - Must be valid ISO 3166-1 alpha-2 code (2 characters)
 * - Common country codes: US, UK, CA, AU, etc.
 */
export function validateCountry(countryCode: string): ValidationResult {
  if (!countryCode) {
    return { valid: false, error: 'Country is required' };
  }

  // Basic validation: 2-letter code
  if (!/^[A-Z]{2}$/.test(countryCode.trim())) {
    return { valid: false, error: 'Please select a valid country' };
  }

  return { valid: true };
}

/**
 * Validate primary sport
 * Rules:
 * - Must be non-empty
 * - Must match one of valid SportType values
 */
export function validatePrimarySport(sport: string, validSports?: string[]): ValidationResult {
  if (!sport) {
    return { valid: false, error: 'Primary sport is required' };
  }

  // Default valid sports (from PLAN.md)
  const defaultValidSports = [
    'Basketball',
    'Football',
    'TableTennis',
    'Volleyball',
    'Badminton',
    'Tennis',
    'Cricket',
    'Baseball',
  ];

  const sports = validSports || defaultValidSports;
  if (!sports.includes(sport)) {
    return { valid: false, error: 'Please select a valid sport' };
  }

  return { valid: true };
}

// ==================== BUSINESS FIELD VALIDATORS ====================

/**
 * Validate business name
 * Rules:
 * - 2-100 characters
 * - Can contain letters, numbers, spaces, hyphens, apostrophes, ampersands
 */
export function validateBusinessName(businessName: string): ValidationResult {
  const trimmed = businessName.trim();

  if (!trimmed) {
    return { valid: false, error: 'Business name cannot be empty' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Business name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Business name must be 100 characters or less' };
  }

  // Allow letters, numbers, spaces, hyphens, apostrophes, ampersands
  if (!/^[a-zA-Z0-9\s\-'&]+$/.test(trimmed)) {
    return { valid: false, error: 'Business name contains invalid characters' };
  }

  return { valid: true };
}

/**
 * Validate admin name (personal name of business contact)
 * Rules:
 * - Same as first/last name validation
 * - 1-50 characters
 * - Can contain letters, spaces, hyphens, apostrophes
 */
export function validateAdminName(adminName: string): ValidationResult {
  const trimmed = adminName.trim();

  if (!trimmed) {
    return { valid: false, error: 'Admin name cannot be empty' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Admin name must be 50 characters or less' };
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, error: 'Admin name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
}

/**
 * Validate region (city/region for business)
 * Rules:
 * - 2-50 characters
 * - Can contain letters, spaces, hyphens
 */
export function validateRegion(region: string): ValidationResult {
  const trimmed = region.trim();

  if (!trimmed) {
    return { valid: false, error: 'Region is required' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Region must be at least 2 characters' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Region must be 50 characters or less' };
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, error: 'Region can only contain letters, spaces, and hyphens' };
  }

  return { valid: true };
}

/**
 * Validate business type
 * Rules:
 * - Must be one of: Venue, Academy, Club, Brand
 */
export function validateBusinessType(businessType: string): ValidationResult {
  const validTypes = ['Venue', 'Academy', 'Club', 'Brand'];

  if (!businessType) {
    return { valid: false, error: 'Business type is required' };
  }

  if (!validTypes.includes(businessType)) {
    return { valid: false, error: 'Please select a valid business type' };
  }

  return { valid: true };
}

// ==================== COMBINED VALIDATORS ====================

/**
 * Validate full player registration data
 */
export function validatePlayerRegistration(data: {
  firstName: string;
  lastName: string;
  city?: string;
  country: string;
  primarySport: string;
  email: string;
  dateOfBirth: string;
}): ValidationResult {
  // Validate first name
  const firstNameValidation = validateFirstName(data.firstName);
  if (!firstNameValidation.valid) return firstNameValidation;

  // Validate last name
  const lastNameValidation = validateLastName(data.lastName);
  if (!lastNameValidation.valid) return lastNameValidation;

  // Validate city (optional)
  const cityValidation = validateCity(data.city);
  if (!cityValidation.valid) return cityValidation;

  // Validate country
  const countryValidation = validateCountry(data.country);
  if (!countryValidation.valid) return countryValidation;

  // Validate primary sport
  const sportValidation = validatePrimarySport(data.primarySport);
  if (!sportValidation.valid) return sportValidation;

  return { valid: true };
}

/**
 * Validate full business registration data
 */
export function validateBusinessRegistration(data: {
  businessName: string;
  businessType: string;
  adminName: string;
  country: string;
  region: string;
  email: string;
}): ValidationResult {
  // Validate business name
  const businessNameValidation = validateBusinessName(data.businessName);
  if (!businessNameValidation.valid) return businessNameValidation;

  // Validate business type
  const businessTypeValidation = validateBusinessType(data.businessType);
  if (!businessTypeValidation.valid) return businessTypeValidation;

  // Validate admin name
  const adminNameValidation = validateAdminName(data.adminName);
  if (!adminNameValidation.valid) return adminNameValidation;

  // Validate country
  const countryValidation = validateCountry(data.country);
  if (!countryValidation.valid) return countryValidation;

  // Validate region
  const regionValidation = validateRegion(data.region);
  if (!regionValidation.valid) return regionValidation;

  return { valid: true };
}
