/**
 * StepNavigation Component
 * 
 * Shared navigation component for match setup wizard steps.
 * Provides consistent Next/Back buttons across all steps.
 */

import React from 'react';

interface StepNavigationProps {
  onNext: () => void;
  onBack: () => void;
  canProceed?: boolean;
  nextLabel?: string;
  backLabel?: string;
  isLoading?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onNext,
  onBack,
  canProceed = true,
  nextLabel = 'Next',
  backLabel = 'Back',
  isLoading = false,
}) => {
  return (
    <div className="flex gap-3 pt-6 border-t border-gray-200">
      <button
        onClick={onBack}
        disabled={isLoading}
        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {backLabel}
      </button>
      <button
        onClick={onNext}
        disabled={!canProceed || isLoading}
        className={`
          flex-1
          px-4
          py-3
          rounded-lg
          font-medium
          transition-colors
          ${
            canProceed && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? 'Loading...' : nextLabel}
      </button>
    </div>
  );
};
