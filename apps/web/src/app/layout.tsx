/**
 * Root Layout
 * 
 * Main layout component for the entire application.
 * 
 * Includes:
 * - AuthProvider for global auth context
 * - Global styles and fonts
 * - Metadata for SEO
 * 
 * Code Reviewers:
 * - AuthProvider wraps all children to ensure auth context available everywhere
 * - This is the application entry point for all pages
 */

import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Athlee - Connect with Athletes & Sports Enthusiasts',
  description: 'Match and meet sports professionals on Athlee. Find training partners, book venues, and build your sports network.',
};

/**
 * RootLayout Component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* AuthProvider makes auth context available to all components */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
