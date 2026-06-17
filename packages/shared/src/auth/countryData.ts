/**
 * Country Data Service
 * Provides country list with flags and legal age variations
 */

export interface Country {
  code: string;
  name: string;
  flag: string;
  legalAge: number;  // Age of majority (usually 18, some countries 21)
}

/**
 * List of countries with flags and legal age
 */
export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', legalAge: 18 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', legalAge: 18 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', legalAge: 18 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', legalAge: 18 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', legalAge: 18 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', legalAge: 18 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', legalAge: 21 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', legalAge: 18 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', legalAge: 18 },
  { code: 'IN', name: 'India', flag: '🇮🇳', legalAge: 18 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', legalAge: 18 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', legalAge: 18 },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', legalAge: 18 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', legalAge: 20 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', legalAge: 18 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', legalAge: 17 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', legalAge: 20 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', legalAge: 19 },
  { code: 'CN', name: 'China', flag: '🇨🇳', legalAge: 18 },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', legalAge: 18 },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', legalAge: 20 },
  { code: 'FR', name: 'France', flag: '🇫🇷', legalAge: 18 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', legalAge: 18 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', legalAge: 18 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', legalAge: 18 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', legalAge: 18 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', legalAge: 18 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', legalAge: 18 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', legalAge: 18 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', legalAge: 18 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', legalAge: 18 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', legalAge: 18 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', legalAge: 18 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', legalAge: 18 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', legalAge: 18 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', legalAge: 18 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', legalAge: 18 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', legalAge: 18 },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', legalAge: 18 },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', legalAge: 18 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', legalAge: 18 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', legalAge: 21 },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', legalAge: 18 },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', legalAge: 18 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', legalAge: 18 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', legalAge: 18 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', legalAge: 18 },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', legalAge: 18 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', legalAge: 18 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', legalAge: 18 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', legalAge: 21 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', legalAge: 18 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', legalAge: 18 },
];

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

/**
 * Get legal age for a country
 */
export function getLegalAge(countryCode: string): number {
  const country = getCountryByCode(countryCode);
  return country?.legalAge || 18; // Default to 18
}

/**
 * Detect user's country from browser (web only)
 */
export function detectUserCountry(): string {
  if (typeof window === 'undefined') {
    return 'US'; // Default for server-side
  }
  
  // Try to get from browser locale
  const locale = navigator.language || 'en-US';
  const countryCode = locale.split('-')[1];
  
  // Check if we support this country
  const country = getCountryByCode(countryCode);
  return country ? countryCode : 'US';
}

/**
 * Sort countries alphabetically
 */
export function getSortedCountries(): Country[] {
  return [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get popular countries (for quick selection)
 */
export function getPopularCountries(): Country[] {
  const popularCodes = ['US', 'GB', 'CA', 'AU', 'IN', 'SG', 'MY', 'PH'];
  return COUNTRIES.filter(c => popularCodes.includes(c.code));
}

