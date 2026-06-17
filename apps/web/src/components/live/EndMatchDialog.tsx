import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EndMatchDialogProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * End match confirmation dialog
 */
export function EndMatchDialog({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  onConfirm,
  onCancel,
  isLoading = false
}: EndMatchDialogProps) {
  const winner = teamAScore > teamBScore ? teamAName : teamBScore > teamAScore ? teamBName : 'Tie';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">End Match?</h2>
        </div>

        {/* Final Score */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-3">Final Score</p>
          <div className="flex items-center justify-between text-center gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{teamAScore}</p>
              <p className="text-sm text-gray-600">{teamAName}</p>
            </div>
            <p className="text-gray-400">vs</p>
            <div>
              <p className="text-2xl font-bold text-gray-900">{teamBScore}</p>
              <p className="text-sm text-gray-600">{teamBName}</p>
            </div>
          </div>
          {winner !== 'Tie' && (
            <p className="text-sm text-center text-green-600 font-semibold mt-3">
              🏆 {winner} wins!
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-6">
          The match will be marked as completed and all recorded statistics will be saved.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'End Match'}
          </button>
        </div>
      </div>
    </div>
  );
}
