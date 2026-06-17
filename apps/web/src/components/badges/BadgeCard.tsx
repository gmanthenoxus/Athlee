'use client';

import React from 'react';
import { Badge, BadgeProgress } from '@/lib/badge-types';
import { Lock } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  progress?: BadgeProgress;
  onClick?: () => void;
  selected?: boolean;
}

export function BadgeCard({ badge, progress, onClick, selected }: BadgeCardProps) {
  const earned = progress?.earned || false;
  const percentage = progress?.percentage || 0;

  return (
    <button
      onClick={onClick}
      className={`group relative p-4 rounded-lg border-2 transition-all ${
        earned
          ? `border-yellow-400 ${selected ? 'bg-yellow-50 ring-2 ring-yellow-400' : 'bg-white'}`
          : `border-gray-200 ${selected ? 'bg-gray-100 ring-2 ring-gray-400' : 'bg-gray-50'}`
      } hover:shadow-lg hover:border-yellow-300`}
    >
      {/* Lock Overlay (if not earned) */}
      {!earned && (
        <div className="absolute inset-0 rounded-lg bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-2 text-center text-gray-700">{badge.icon}</div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
        {badge.name}
      </h3>

      {/* Badge Category Tag */}
      <div className="mt-2 inline-block px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">
        {badge.category}
      </div>

      {/* Progress Bar (if not earned) */}
      {!earned && percentage > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">
              {progress?.currentProgress}/{progress?.threshold}
            </span>
            <span className="text-xs font-semibold text-gray-600">{percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Earned Indicator */}
      {earned && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-yellow-600">✓ Earned</span>
        </div>
      )}

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
