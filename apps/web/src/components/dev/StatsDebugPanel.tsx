import React from 'react';
import { statSchemaService } from '@/lib/statSchemaService';
import { statEntryService } from '@/lib/statEntryService';
import { SportType } from '@/lib/location-types';
import { StatIntensity } from '@/lib/match-types';
import type { MatchStats } from '@/lib/stat-types';

interface StatsInfo {
  sport: SportType;
  intensity: StatIntensity;
  schemaFound: boolean;
  statCount: number;
  categories: string[];
}

interface MatchStatsInfo {
  matchId: string;
  hasStats: boolean;
  playerCount: number;
  recordedAt?: string;
  recordedBy?: string;
  finalScore?: { teamA: number; teamB: number };
}

/**
 * Dev Stats Dashboard - allows viewing stat schemas, config, and mock data
 */
export function StatsDebugPanel({
  matches,
  onResetStats
}: {
  matches: Array<{ id: string; sport: SportType; statIntensity: StatIntensity; }>;
  onResetStats: () => void;
}) {
  const [expandedSchema, setExpandedSchema] = React.useState<string | null>(null);
  const [schemasList, setSchemasList] = React.useState<StatsInfo[]>([]);
  const [matchStatsList, setMatchStatsList] = React.useState<MatchStatsInfo[]>([]);
  const [selectedSport, setSelectedSport] = React.useState<SportType | 'all'>('all');

  React.useEffect(() => {
    loadStatsInfo();
  }, [matches]);

  const loadStatsInfo = () => {
    // Get all available schemas
    const schemas: StatsInfo[] = [];
    const sportsList = [SportType.Basketball, SportType.Soccer, SportType.Tennis, SportType.Volleyball];
    const intensities = [StatIntensity.Basic, StatIntensity.Advanced];

    sportsList.forEach((sport) => {
      intensities.forEach((intensity) => {
        const schema = statSchemaService.getSchema(sport, intensity);
        if (schema) {
          const categories = new Set<string>();
          schema.statKeys.forEach((key) => categories.add(key.category));

          schemas.push({
            sport: sport as SportType,
            intensity,
            schemaFound: !!schema,
            statCount: schema.statKeys.length,
            categories: Array.from(categories)
          });
        }
      });
    });

    setSchemasList(schemas);

    // Get all match stats
    const matchStats: MatchStatsInfo[] = matches.map((match) => {
      const stats = statEntryService.getMatchStats(match.id);
      return {
        matchId: match.id,
        hasStats: !!stats,
        playerCount: stats?.playerStats?.length || 0,
        recordedAt: stats?.recordedAt,
        recordedBy: stats?.recordedBy,
        finalScore: stats?.finalScore
      };
    });

    setMatchStatsList(matchStats);
  };

  const filteredSchemas = selectedSport === 'all'
    ? schemasList
    : schemasList.filter((s) => s.sport === selectedSport);

  const matchesWithStats = matchStatsList.filter((m) => m.hasStats).length;
  const matchesWithoutStats = matchStatsList.filter((m) => !m.hasStats).length;
  const totalPlayerStats = matchStatsList.reduce((sum, m) => sum + m.playerCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium">Total Matches</p>
          <p className="text-2xl font-bold text-blue-900">{matchStatsList.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium">With Stats</p>
          <p className="text-2xl font-bold text-green-900">{matchesWithStats}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-700 font-medium">Pending Stats</p>
          <p className="text-2xl font-bold text-orange-900">{matchesWithoutStats}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium">Player Records</p>
          <p className="text-2xl font-bold text-purple-900">{totalPlayerStats}</p>
        </div>
      </div>

      {/* Stat Schemas Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">📊 Stat Schemas</h3>
          <div className="flex gap-2">
            {(['all', SportType.Basketball, SportType.Soccer, SportType.Tennis, SportType.Volleyball] as const).map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedSport === sport
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sport === 'all' ? 'All' : sport}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredSchemas.length > 0 ? (
            filteredSchemas.map((schema) => (
              <div
                key={`${schema.sport}_${schema.intensity}`}
                className="border rounded-lg overflow-hidden bg-gray-50"
              >
                <button
                  onClick={() =>
                    setExpandedSchema(
                      expandedSchema === `${schema.sport}_${schema.intensity}`
                        ? null
                        : `${schema.sport}_${schema.intensity}`
                    )
                  }
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-lg">
                      {schema.sport === SportType.Basketball && '🏀'}
                      {schema.sport === SportType.Soccer && '⚽'}
                      {schema.sport === SportType.Tennis && '🎾'}
                      {schema.sport === SportType.Volleyball && '🏐'}
                    </span>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        {schema.sport} • {schema.intensity}
                      </p>
                      <p className="text-xs text-gray-600">
                        {schema.statCount} stats • {schema.categories.length} categories
                      </p>
                    </div>
                  </div>
                  <span className={`transition-transform ${
                    expandedSchema === `${schema.sport}_${schema.intensity}` ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>

                {expandedSchema === `${schema.sport}_${schema.intensity}` && (
                  <div className="px-4 py-3 bg-white border-t">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Categories:</p>
                      <p className="text-sm text-gray-600">
                        {schema.categories.join(', ')}
                      </p>

                      <p className="text-sm font-medium text-gray-700 mt-3">Stat Keys ({schema.statCount}):</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {statSchemaService
                          .getSchema(schema.sport, schema.intensity)
                          ?.statKeys.map((key) => (
                            <div
                              key={key.id}
                              className="bg-gray-50 border border-gray-200 rounded px-2 py-1"
                            >
                              <p className="text-xs font-mono font-bold text-gray-900">
                                {key.abbreviation}
                              </p>
                              <p className="text-xs text-gray-600">{key.name}</p>
                              <p className="text-xs text-gray-500">{key.category}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No schemas found</p>
          )}
        </div>
      </div>

      {/* Match Stats Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">⚙️ Match Stats Status</h3>
          <button
            onClick={() => {
              if (window.confirm('Clear all recorded match stats?')) {
                // Clear all match stats from localStorage
                matchStatsList.forEach((m) => {
                  statEntryService.deleteMatchStats(m.matchId);
                });
                loadStatsInfo();
                onResetStats?.();
              }
            }}
            className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium"
          >
            Clear All Stats
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {matchStatsList.length > 0 ? (
            matchStatsList.map((match) => (
              <div
                key={match.matchId}
                className={`border rounded-lg p-3 ${
                  match.hasStats
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-mono font-medium text-gray-900">
                      {match.matchId}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          match.hasStats
                            ? 'bg-green-200 text-green-900'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        {match.hasStats ? '✅ Stats Recorded' : '⏳ Pending'}
                      </span>
                      {match.hasStats && (
                        <>
                          <span className="text-xs text-gray-600">
                            {match.playerCount} players
                          </span>
                          {match.finalScore && (
                            <span className="text-xs text-gray-600">
                              {match.finalScore.teamA} - {match.finalScore.teamB}
                            </span>
                          )}
                          {match.recordedAt && (
                            <span className="text-xs text-gray-600">
                              {new Date(match.recordedAt).toLocaleDateString()}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      statEntryService.deleteMatchStats(match.matchId);
                      loadStatsInfo();
                    }}
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No matches found</p>
          )}
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-2">💾 localStorage Keys</h4>
        <div className="space-y-1 text-sm font-mono text-gray-700">
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">athlee_matchStats_*</code> - Match stat records
          </p>
          <p>
            <code className="bg-gray-200 px-2 py-1 rounded">athlee_matches</code> - All matches
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Stats are stored with keys like <code>athlee_matchStats_match_001</code>
          </p>
        </div>
      </div>
    </div>
  );
}
