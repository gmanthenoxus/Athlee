import { SportType } from './location-types';
import type { SportConfig, RulePreset, MatchTypeConfig } from './match-types';
import { BASKETBALL_CONFIG } from './basketballConfig';
import {
  SOCCER_CONFIG,
  TENNIS_CONFIG,
  BADMINTON_CONFIG,
  VOLLEYBALL_CONFIG,
  BASEBALL_CONFIG,
  PICKLEBALL_CONFIG,
  AMERICAN_FOOTBALL_CONFIG,
} from './sportConfigStubs';

/**
 * SportConfigService - Provides sport-specific configurations for the match setup wizard
 * Manages team sizes, rule presets, stat intensities, positions, and match types per sport
 */
class SportConfigService {
  private sportConfigs: Map<SportType, SportConfig>;

  constructor() {
    this.sportConfigs = new Map();
    // Register all sport configurations
    this.registerSportConfig(BASKETBALL_CONFIG);
    this.registerSportConfig(SOCCER_CONFIG);
    this.registerSportConfig(TENNIS_CONFIG);
    this.registerSportConfig(BADMINTON_CONFIG);
    this.registerSportConfig(VOLLEYBALL_CONFIG);
    this.registerSportConfig(BASEBALL_CONFIG);
    this.registerSportConfig(PICKLEBALL_CONFIG);
    this.registerSportConfig(AMERICAN_FOOTBALL_CONFIG);
  }

  /**
   * Register a sport configuration
   */
  private registerSportConfig(config: SportConfig): void {
    this.sportConfigs.set(config.sport, config);
  }

  /**
   * Get configuration for a specific sport
   */
  public getConfig(sport: SportType): SportConfig | null {
    return this.sportConfigs.get(sport) || null;
  }

  /**
   * Get all available sports (enabled and disabled)
   */
  public getAllSports(): SportType[] {
    return Array.from(this.sportConfigs.keys());
  }

  /**
   * Get all sport configurations
   */
  public getAllConfigs(): SportConfig[] {
    return Array.from(this.sportConfigs.values());
  }

  /**
   * Get only enabled sports (ready to use)
   */
  public getEnabledSports(): SportConfig[] {
    return this.getAllConfigs().filter((s) => s.enabled);
  }

  /**
   * Get all sports for the sport picker (both enabled and disabled, so users can see what's coming)
   */
  public getSportsForPicker(): SportConfig[] {
    return this.getAllConfigs();
  }

  /**
   * Check if a sport is supported
   */
  public isSupported(sport: SportType): boolean {
    return this.sportConfigs.has(sport);
  }

  /**
   * Check if a sport is enabled (fully implemented)
   */
  public isEnabled(sport: SportType): boolean {
    const config = this.getConfig(sport);
    return config?.enabled || false;
  }

  /**
   * Get rule presets for a sport
   */
  public getRulePresets(sport: SportType): RulePreset[] {
    const config = this.getConfig(sport);
    return config?.rulePresets || [];
  }

  /**
   * Get a specific rule preset
   */
  public getRulePreset(sport: SportType, presetName: string): RulePreset | null {
    const presets = this.getRulePresets(sport);
    return presets.find((p) => p.name === presetName) || null;
  }

  /**
   * Get match type configurations for a sport (Step 2 of wizard)
   */
  public getMatchTypes(sport: SportType): MatchTypeConfig[] {
    const config = this.getConfig(sport);
    return config?.matchTypeConfigs || [];
  }
}

// Singleton instance
export const sportConfigService = new SportConfigService();
