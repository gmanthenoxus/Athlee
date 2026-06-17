'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { matchService } from '@/lib/matchService';
import type { Match } from '@/lib/match-types';
import { StatEntryForm } from '@/components/stats/StatEntryForm';

type Params = Promise<{ id: string }>;

interface StatsEnterPageProps {
  params: Params;
}

export default function StatsEnterPage({ params }: StatsEnterPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatch();
  }, []);

  const loadMatch = () => {
    try {
      setLoading(true);
      const m = matchService.getMatch(resolvedParams.id);
      if (!m) {
        router.push('/matches');
        return;
      }

      // Only allow stat entry for completed matches
      if (m.status !== 'Completed') {
        router.push(`/matches/${m.id}`);
        return;
      }

      setMatch(m);
    } catch (err) {
      console.error('Failed to load match:', err);
      router.push('/matches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Loading match...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Match not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Record Match Stats</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <StatEntryForm
          match={match}
          onSave={(stats) => {
            // Show success message and redirect to match detail
            router.push(`/matches/${match.id}`);
          }}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
