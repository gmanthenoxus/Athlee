'use client';

import React, { useState, useMemo } from 'react';
import { courtRegularsService, CourtRegularTier, CourtRegular, CourtStats } from '@/lib/courtRegularsService';
import { getAllComprehensiveLocations } from '@/lib/mockLocationsComprehensive';

interface AdminCourtRegularsTabProps {
  users: any[];
  onUpdate: () => void;
}

type ViewMode = 'tiers' | 'locations' | 'details';

const TIER_COLORS = {
  [CourtRegularTier.Legend]: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    badge: 'bg-yellow-200 text-yellow-900',
    icon: '👑',
  },
  [CourtRegularTier.VIP]: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-200 text-purple-900',
    icon: '💎',
  },
  [CourtRegularTier.Regular]: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-200 text-blue-900',
    icon: '⭐',
  },
  [CourtRegularTier.Newbie]: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    badge: 'bg-green-200 text-green-900',
    icon: '🌱',
  },
};

const TIER_ORDER = [CourtRegularTier.Legend, CourtRegularTier.VIP, CourtRegularTier.Regular, CourtRegularTier.Newbie];

export const AdminCourtRegularsTab: React.FC<AdminCourtRegularsTabProps> = ({ users, onUpdate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('locations');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTier, setExpandedTier] = useState<CourtRegularTier | null>(CourtRegularTier.Legend);

  const locations = useMemo(() => getAllComprehensiveLocations(), []);
  const allCourtStats = useMemo(() => courtRegularsService.getAllCourtStats(), []);

  // Get regulars for the selected location
  const selectedLocationData = useMemo(() => {
    if (!selectedLocation) return null;

    const stats = allCourtStats.find(s => s.locationId === selectedLocation);
    if (!stats) return null;

    const regulars = courtRegularsService.getCourtRegulars(selectedLocation);
    return {
      stats,
      regulars,
      location: locations.find(l => l.id === selectedLocation),
    };
  }, [selectedLocation, allCourtStats, locations]);

  // Group regulars by tier
  const regularsByTier = useMemo((): Record<CourtRegularTier, CourtRegular[]> => {
    if (!selectedLocationData) return {
      [CourtRegularTier.Legend]: [],
      [CourtRegularTier.VIP]: [],
      [CourtRegularTier.Regular]: [],
      [CourtRegularTier.Newbie]: [],
    };

    const grouped: Record<CourtRegularTier, CourtRegular[]> = {
      [CourtRegularTier.Legend]: [],
      [CourtRegularTier.VIP]: [],
      [CourtRegularTier.Regular]: [],
      [CourtRegularTier.Newbie]: [],
    };

    selectedLocationData.regulars.forEach(r => {
      if (r.username.toLowerCase().includes(searchTerm.toLowerCase())) {
        grouped[r.tier].push(r);
      }
    });

    return grouped;
  }, [selectedLocationData, searchTerm]);

  // Calculate summary stats across all locations
  const summaryStats = useMemo(() => {
    return {
      totalLocations: locations.length,
      totalCourtStats: allCourtStats.filter(s => s.totalRegulars > 0).length,
      totalRegulars: allCourtStats.reduce((sum, s) => sum + s.totalRegulars, 0),
      totalLegends: allCourtStats.reduce((sum, s) => sum + s.legendCount, 0),
      totalVIPs: allCourtStats.reduce((sum, s) => sum + s.vipCount, 0),
      totalRegularTier: allCourtStats.reduce((sum, s) => sum + s.regularCount, 0),
      totalNewbies: allCourtStats.reduce((sum, s) => sum + s.newbieCount, 0),
      avgRegularsPerCourt: allCourtStats.length > 0
        ? Math.round(allCourtStats.reduce((sum, s) => sum + s.totalRegulars, 0) / allCourtStats.length * 10) / 10
        : 0,
      avgWinRate: allCourtStats.length > 0
        ? Math.round(allCourtStats.reduce((sum, s) => sum + s.avgWinRate, 0) / allCourtStats.length * 10) / 10
        : 0,
    };
  }, [locations, allCourtStats]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">👑 Court Regulars Tiers</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Manage player membership tiers across courts based on match activity and performance
        </p>

        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode('locations')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'locations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📍 Locations
          </button>
          <button
            onClick={() => setViewMode('tiers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'tiers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            🏆 Tier Breakdown
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'details'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📊 Summary Stats
          </button>
        </div>
      </div>

      {/* VIEW: Summary Stats */}
      {viewMode === 'details' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Ecosystem Summary</h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Total Courts</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{summaryStats.totalLocations}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{summaryStats.totalCourtStats} with regulars</p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Total Regulars</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{summaryStats.totalRegulars}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Avg {summaryStats.avgRegularsPerCourt} per court</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Avg Win Rate</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{summaryStats.avgWinRate.toFixed(1)}%</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 h-5">Across all regulars</p>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">Tier Distribution</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-mono">
                👑 {summaryStats.totalLegends} | 💎 {summaryStats.totalVIPs}
                <br />
                ⭐ {summaryStats.totalRegularTier} | 🌱 {summaryStats.totalNewbies}
              </p>
            </div>
          </div>

          {/* Tier Progression Overview */}
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">Tier Progression</h5>
            <div className="space-y-2">
              {TIER_ORDER.map((tier) => {
                const tierStats = [
                  summaryStats.totalLegends,
                  summaryStats.totalVIPs,
                  summaryStats.totalRegularTier,
                  summaryStats.totalNewbies,
                ];
                const tierIndex = TIER_ORDER.indexOf(tier);
                const count = tierStats[tierIndex];
                const percentage = summaryStats.totalRegulars > 0 ? (count / summaryStats.totalRegulars) * 100 : 0;

                return (
                  <div key={tier} className="flex items-center gap-3">
                    <span className="w-24 font-medium text-sm text-gray-600 dark:text-gray-400">
                      {TIER_COLORS[tier].icon} {tier}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full flex items-center justify-end pr-2 transition-all ${TIER_COLORS[tier].badge}`}
                        style={{ width: `${Math.max(5, percentage)}%` }}
                      >
                        <span className="text-xs font-bold whitespace-nowrap ml-1">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <span className="w-20 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Locations */}
      {viewMode === 'locations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourtStats.map((court) => (
              <button
                key={court.locationId}
                onClick={() => {
                  setSelectedLocation(court.locationId);
                  setViewMode('tiers');
                }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                  selectedLocation === court.locationId
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-left">{court.locationName}</h4>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Legend</p>
                    <p className="text-lg font-bold text-yellow-600">{court.legendCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">VIP</p>
                    <p className="text-lg font-bold text-purple-600">{court.vipCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Regular</p>
                    <p className="text-lg font-bold text-blue-600">{court.regularCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Newbie</p>
                    <p className="text-lg font-bold text-green-600">{court.newbieCount}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-left">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Regulars</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{court.totalRegulars}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Avg Win: {court.avgWinRate.toFixed(1)}%
                  </p>
                </div>

                {court.topRegular && (
                  <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-left">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Top Regular</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{court.topRegular.username}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {court.topRegular.tier} • {court.topRegular.matchesPlayed} matches
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {allCourtStats.length === 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-2">No court data available</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Generate the ecosystem to populate court regulars</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW: Tier Breakdown */}
      {viewMode === 'tiers' && selectedLocationData && (
        <div className="space-y-4">
          {/* Location Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedLocationData.location?.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Total Regulars: {selectedLocationData.stats.totalRegulars} | Avg Win Rate: {selectedLocationData.stats.avgWinRate.toFixed(1)}%
            </p>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search regulars by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tier Cards */}
          {TIER_ORDER.map((tier) => {
            const tierRegulars = regularsByTier[tier] || [];
            const tierColor = TIER_COLORS[tier];

            return (
              <div
                key={tier}
                className={`rounded-xl shadow-sm border ${tierColor.bg} ${tierColor.border}`}
              >
                {/* Tier Header */}
                <button
                  onClick={() => setExpandedTier(expandedTier === tier ? null : tier)}
                  className="w-full p-4 flex items-center justify-between hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tierColor.icon}</span>
                    <div className="text-left">
                      <h5 className="font-bold text-gray-900 dark:text-white">{tier}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tierRegulars.length} player{tierRegulars.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl transform transition-transform" style={{
                    transform: expandedTier === tier ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </span>
                </button>

                {/* Tier Expansion */}
                {expandedTier === tier && tierRegulars.length > 0 && (
                  <div className="px-4 pb-4 border-t border-gray-300 dark:border-gray-600 space-y-3">
                    {tierRegulars.map((regular, idx) => (
                      <div
                        key={regular.userId}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow transition-shadow"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            #{regular.rank ?? idx + 1} {regular.username}
                          </p>
                          <div className="flex gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>🏆 {regular.matchesPlayed} matches</span>
                            <span>✅ {regular.matchesWon} wins</span>
                            <span>📊 {regular.winRate.toFixed(1)}% win rate</span>
                            <span>⭐ {regular.avgRating.toFixed(1)} rating</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {expandedTier === tier && tierRegulars.length === 0 && (
                  <div className="px-4 pb-4 border-t border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 py-3">No players at this tier</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {viewMode === 'tiers' && !selectedLocationData && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Select a location to view tier breakdown</p>
          <button
            onClick={() => setViewMode('locations')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View Locations →
          </button>
        </div>
      )}
    </div>
  );
};
