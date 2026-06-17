import { MatchTypeConfig } from './match-types';

/**
 * Default placeholder match type configurations for sports that don't yet have specific configs
 */
export const DEFAULT_MATCH_TYPE_CONFIGS: MatchTypeConfig[] = [
  {
    id: 'single',
    name: 'Single Game',
    description: 'Traditional one-off game',
    enabled: true,
    requiresTeamSize: false,
    requiresStatIntensity: false,
  },
  {
    id: 'set-based',
    name: 'Set-Based',
    description: 'Multiple sets or games',
    enabled: false,
    requiresTeamSize: false,
    requiresStatIntensity: false,
    tooltip: 'Coming soon',
  },
  {
    id: 'tournament',
    name: 'Tournament',
    description: 'Tournament bracket',
    enabled: false,
    requiresTeamSize: false,
    requiresStatIntensity: false,
    tooltip: 'Coming soon',
  },
  {
    id: 'rotational',
    name: 'Rotational',
    description: 'Rotating substitutes',
    enabled: false,
    requiresTeamSize: false,
    requiresStatIntensity: false,
    tooltip: 'Coming soon',
  },
];
