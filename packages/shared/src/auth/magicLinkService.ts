import type { MagicLinkState } from './types';

/**
 * Magic Link Service
 * Mock implementation of magic link authentication
 * For development: provides bypass mechanism
 */

const MAGIC_LINK_STORAGE_KEY = 'athlehub_magic_link_state';

/**
 * Send magic link to email (mock implementation)
 * In production, this would send an actual email
 */
export async function sendMagicLink(email: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Store magic link state in session storage
  const state: MagicLinkState = {
    email,
    sentAt: new Date().toISOString(),
    verified: false,
  };
  
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.setItem(MAGIC_LINK_STORAGE_KEY, JSON.stringify(state));
  }
  
  // In production, this would call an API to send the email
  console.log(`[MOCK] Magic link sent to ${email}`);
  console.log(`[MOCK] In production, user would receive an email with a verification link`);
}

/**
 * Verify magic link token (mock implementation)
 * In production, this would verify the token with the backend
 */
export async function verifyMagicLink(email: string, token: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // For development, accept any token
  // In production, this would verify the token with the backend
  const isValid = token.length > 0;
  
  if (isValid && typeof window !== 'undefined' && window.sessionStorage) {
    const stateStr = sessionStorage.getItem(MAGIC_LINK_STORAGE_KEY);
    if (stateStr) {
      const state: MagicLinkState = JSON.parse(stateStr);
      if (state.email === email) {
        state.verified = true;
        sessionStorage.setItem(MAGIC_LINK_STORAGE_KEY, JSON.stringify(state));
      }
    }
  }
  
  console.log(`[MOCK] Magic link verified for ${email}: ${isValid}`);
  return isValid;
}

/**
 * Get current magic link state
 */
export function getMagicLinkState(): MagicLinkState | null {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }
  
  const stateStr = sessionStorage.getItem(MAGIC_LINK_STORAGE_KEY);
  if (!stateStr) {
    return null;
  }
  
  try {
    return JSON.parse(stateStr);
  } catch {
    return null;
  }
}

/**
 * Clear magic link state
 */
export function clearMagicLinkState(): void {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.removeItem(MAGIC_LINK_STORAGE_KEY);
  }
}

/**
 * Bypass magic link verification for development
 * This allows developers to skip the email verification step
 */
export async function bypassMagicLink(email: string): Promise<void> {
  const state: MagicLinkState = {
    email,
    sentAt: new Date().toISOString(),
    verified: true,
  };
  
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.setItem(MAGIC_LINK_STORAGE_KEY, JSON.stringify(state));
  }
  
  console.log(`[MOCK] Magic link bypassed for ${email} (development mode)`);
}

