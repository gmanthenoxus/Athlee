import { MatchTypeConfig } from './match-types';
import { SportType } from './location-types';
import { BASKETBALL_CONFIG } from './basketballConfig';
import { DEFAULT_MATCH_TYPE_CONFIGS } from './sportConfigStubs';

/**
 * Service to get sport configuration including match type options
 */
class SportConfigService {
  /**
   * Get all match types available for a sport
   */
  getMatchTypes(sport: SportType): MatchTypeConfig[] {
    const config = this.getSportConfig(sport);
    return config?.matchTypeConfigs || [];
  }

  /**
   * Get individual sport configuration
   */
  private getSportConfig(sport: SportType) {
    switch (sport) {
      case SportType.Basketball:
        return BASKETBALL_CONFIG;
      // Other sports use default stubs (defined in sportConfigStubs.ts)
      default:
        return {
          id: sport,
          name: sport,
          matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
        };
    }
  }
}

export const sportConfigService = new SportConfigService();
