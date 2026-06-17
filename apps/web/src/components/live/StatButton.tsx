import React from 'react';

interface StatButtonProps {
  label: string;
  shortLabel?: string;
  value: number;
  onClick: () => void;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Stat button for recording a single stat increment
 */
export function StatButton({
  label,
  shortLabel,
  value,
  onClick,
  color = 'bg-blue-500',
  size = 'md',
  disabled = false
}: StatButtonProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color} hover:opacity-90 disabled:opacity-50 text-white rounded font-bold transition-all active:scale-95 flex flex-col items-center gap-1 ${sizeClasses[size]} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <span className="whitespace-nowrap">{shortLabel || label}</span>
      {value > 0 && (
        <span className="text-xs font-mono bg-black bg-opacity-30 rounded px-1">
          {value}
        </span>
      )}
    </button>
  );
}
