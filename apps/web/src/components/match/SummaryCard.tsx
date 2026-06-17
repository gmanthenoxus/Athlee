'use client';

import { ReactNode } from 'react';
import { Edit2 } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  onEdit?: () => void;
  isEmpty?: boolean;
}

/**
 * Reusable summary card component for displaying match details
 */
export function SummaryCard({
  title,
  icon,
  children,
  onEdit,
  isEmpty = false
}: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-1">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {onEdit && !isEmpty && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        )}
      </div>
      <div className="text-sm text-gray-700">
        {isEmpty ? (
          <p className="text-gray-500 italic">No details added</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
