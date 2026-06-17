import { SportType } from './location-types';
import { StatIntensity } from './match-types';
import { SportStatSchema, StatKey } from './stat-types';

/**
 * StatSchemaService - Manages stat schemas for different sports and intensities
 */
class StatSchemaService {
  private schemas: Map<string, SportStatSchema> = new Map();

  constructor() {
    this.initializeSchemas();
  }

  /**
   * Initialize all sport schemas
   */
  private initializeSchemas(): void {
    // Basketball Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Basketball, StatIntensity.Basic), {
      sport: SportType.Basketball,
      intensity: StatIntensity.Basic,
      statKeys: [
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'rebounds',
          name: 'Rebounds',
          abbreviation: 'REB',
          category: 'Rebounding',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'AST',
          category: 'Playmaking',
          type: 'counting'
        }
      ]
    });

    // Basketball Advanced Schema (includes all Basic + additional)
    this.schemas.set(this.getSchemaKey(SportType.Basketball, StatIntensity.Advanced), {
      sport: SportType.Basketball,
      intensity: StatIntensity.Advanced,
      statKeys: [
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'rebounds',
          name: 'Rebounds',
          abbreviation: 'REB',
          category: 'Rebounding',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'AST',
          category: 'Playmaking',
          type: 'counting'
        },
        {
          id: 'steals',
          name: 'Steals',
          abbreviation: 'STL',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'blocks',
          name: 'Blocks',
          abbreviation: 'BLK',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'turnovers',
          name: 'Turnovers',
          abbreviation: 'TO',
          category: 'Mistakes',
          type: 'counting'
        },
        {
          id: 'personalFouls',
          name: 'Personal Fouls',
          abbreviation: 'PF',
          category: 'Fouls',
          type: 'counting'
        },
        {
          id: '3pm',
          name: '3-Pointers Made',
          abbreviation: '3PM',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: '3pa',
          name: '3-Pointers Attempted',
          abbreviation: '3PA',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: 'ftm',
          name: 'Free Throws Made',
          abbreviation: 'FTM',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: 'fta',
          name: 'Free Throws Attempted',
          abbreviation: 'FTA',
          category: 'Shooting',
          type: 'counting'
        }
      ]
    });
  }

  /**
   * Get schema for a sport and intensity
   */
  public getSchema(sport: SportType, intensity: StatIntensity): SportStatSchema | null {
    const key = this.getSchemaKey(sport, intensity);
    return this.schemas.get(key) || null;
  }

  /**
   * Get all stat keys for a sport (union of all intensities)
   */
  public getAllStatKeys(sport: SportType): StatKey[] {
    const allKeys = new Map<string, StatKey>();

    // Collect all keys from all intensities
    this.schemas.forEach((schema) => {
      if (schema.sport === sport) {
        schema.statKeys.forEach((key) => {
          allKeys.set(key.id, key);
        });
      }
    });

    return Array.from(allKeys.values());
  }

  /**
   * Get stat keys by category
   */
  public getStatKeysByCategory(sport: SportType, intensity: StatIntensity, category: string): StatKey[] {
    const schema = this.getSchema(sport, intensity);
    if (!schema) return [];
    return schema.statKeys.filter((key) => key.category === category);
  }

  /**
   * Get all categories for a sport/intensity
   */
  public getCategories(sport: SportType, intensity: StatIntensity): string[] {
    const schema = this.getSchema(sport, intensity);
    if (!schema) return [];

    const categories = new Set<string>();
    schema.statKeys.forEach((key) => {
      categories.add(key.category);
    });

    return Array.from(categories);
  }

  /**
   * Generate key for schema lookup
   */
  private getSchemaKey(sport: SportType, intensity: StatIntensity): string {
    return `${sport}_${intensity}`;
  }
}

export const statSchemaService = new StatSchemaService();
