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

    // ===== SOCCER SCHEMAS =====

    // Soccer Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Soccer, StatIntensity.Basic), {
      sport: SportType.Soccer,
      intensity: StatIntensity.Basic,
      statKeys: [
        {
          id: 'goals',
          name: 'Goals',
          abbreviation: 'G',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'A',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'shotsOnTarget',
          name: 'Shots On Target',
          abbreviation: 'SOT',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: 'shotsOffTarget',
          name: 'Shots Off Target',
          abbreviation: 'SOM',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: 'fouls',
          name: 'Fouls',
          abbreviation: 'F',
          category: 'Discipline',
          type: 'counting'
        },
        {
          id: 'yellowCards',
          name: 'Yellow Cards',
          abbreviation: 'YC',
          category: 'Discipline',
          type: 'counting'
        },
        {
          id: 'redCards',
          name: 'Red Cards',
          abbreviation: 'RC',
          category: 'Discipline',
          type: 'counting'
        }
      ]
    });

    // Soccer Advanced Schema (includes all Basic + additional)
    this.schemas.set(this.getSchemaKey(SportType.Soccer, StatIntensity.Advanced), {
      sport: SportType.Soccer,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Scoring (from Basic)
        {
          id: 'goals',
          name: 'Goals',
          abbreviation: 'G',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'A',
          category: 'Scoring',
          type: 'counting'
        },
        // Shooting (from Basic)
        {
          id: 'shotsOnTarget',
          name: 'Shots On Target',
          abbreviation: 'SOT',
          category: 'Shooting',
          type: 'counting'
        },
        {
          id: 'shotsOffTarget',
          name: 'Shots Off Target',
          abbreviation: 'SOM',
          category: 'Shooting',
          type: 'counting'
        },
        // Passing (Advanced)
        {
          id: 'passesCompleted',
          name: 'Passes Completed',
          abbreviation: 'PC',
          category: 'Passing',
          type: 'counting'
        },
        {
          id: 'passesAttempted',
          name: 'Passes Attempted',
          abbreviation: 'PA',
          category: 'Passing',
          type: 'counting'
        },
        {
          id: 'crosses',
          name: 'Crosses',
          abbreviation: 'CRS',
          category: 'Passing',
          type: 'counting'
        },
        // Defense (Advanced)
        {
          id: 'tackles',
          name: 'Tackles',
          abbreviation: 'TKL',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'interceptions',
          name: 'Interceptions',
          abbreviation: 'INT',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'clearances',
          name: 'Clearances',
          abbreviation: 'CLR',
          category: 'Defense',
          type: 'counting'
        },
        // Goalkeeper (Advanced)
        {
          id: 'saves',
          name: 'Saves',
          abbreviation: 'SAV',
          category: 'Goalkeeping',
          type: 'counting'
        },
        // Discipline (from Basic)
        {
          id: 'fouls',
          name: 'Fouls',
          abbreviation: 'F',
          category: 'Discipline',
          type: 'counting'
        },
        {
          id: 'yellowCards',
          name: 'Yellow Cards',
          abbreviation: 'YC',
          category: 'Discipline',
          type: 'counting'
        },
        {
          id: 'redCards',
          name: 'Red Cards',
          abbreviation: 'RC',
          category: 'Discipline',
          type: 'counting'
        },
        // Misc (Advanced)
        {
          id: 'offsides',
          name: 'Offsides',
          abbreviation: 'OFF',
          category: 'Misc',
          type: 'counting'
        }
      ]
    });

    // ===== TENNIS SCHEMAS =====

    // Tennis Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Tennis, StatIntensity.Basic), {
      sport: SportType.Tennis,
      intensity: StatIntensity.Basic,
      statKeys: [
        // Serving
        {
          id: 'aces',
          name: 'Aces',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'doubleFaults',
          name: 'Double Faults',
          abbreviation: 'DF',
          category: 'Serving',
          type: 'counting'
        },
        // General
        {
          id: 'winners',
          name: 'Winners',
          abbreviation: 'WON',
          category: 'General',
          type: 'counting'
        },
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        },
        // Return
        {
          id: 'breakPointsConverted',
          name: 'Break Points Converted',
          abbreviation: 'BP+',
          category: 'Return',
          type: 'counting'
        },
        {
          id: 'breakPointsFaced',
          name: 'Break Points Faced',
          abbreviation: 'BP-',
          category: 'Return',
          type: 'counting'
        },
        // Points
        {
          id: 'pointsWon',
          name: 'Points Won',
          abbreviation: 'PW',
          category: 'Scoring',
          type: 'counting'
        }
      ]
    });

    // Tennis Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.Tennis, StatIntensity.Advanced), {
      sport: SportType.Tennis,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Serving (Basic)
        {
          id: 'aces',
          name: 'Aces',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'doubleFaults',
          name: 'Double Faults',
          abbreviation: 'DF',
          category: 'Serving',
          type: 'counting'
        },
        // Serving (Advanced)
        {
          id: 'firstServesIn',
          name: 'First Serves In',
          abbreviation: '1SI',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'firstServesTotal',
          name: 'First Serves Attempted',
          abbreviation: '1SA',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'secondServesIn',
          name: 'Second Serves In',
          abbreviation: '2SI',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'secondServesTotal',
          name: 'Second Serves Attempted',
          abbreviation: '2SA',
          category: 'Serving',
          type: 'counting'
        },
        // General (Basic)
        {
          id: 'winners',
          name: 'Winners',
          abbreviation: 'WON',
          category: 'General',
          type: 'counting'
        },
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        },
        // Net (Advanced)
        {
          id: 'netPointsWon',
          name: 'Net Points Won',
          abbreviation: 'NPW',
          category: 'Net',
          type: 'counting'
        },
        {
          id: 'netPointsTotal',
          name: 'Net Points Played',
          abbreviation: 'NPT',
          category: 'Net',
          type: 'counting'
        },
        // Return (Basic)
        {
          id: 'breakPointsConverted',
          name: 'Break Points Converted',
          abbreviation: 'BP+',
          category: 'Return',
          type: 'counting'
        },
        {
          id: 'breakPointsFaced',
          name: 'Break Points Faced',
          abbreviation: 'BP-',
          category: 'Return',
          type: 'counting'
        },
        // Points
        {
          id: 'pointsWon',
          name: 'Total Points Won',
          abbreviation: 'PW',
          category: 'Scoring',
          type: 'counting'
        }
      ]
    });

    // ===== BADMINTON SCHEMAS =====

    // Badminton Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Badminton, StatIntensity.Basic), {
      sport: SportType.Badminton,
      intensity: StatIntensity.Basic,
      statKeys: [
        // Scoring
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        // Serving
        {
          id: 'aces',
          name: 'Service Winners (Aces)',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        // Attack
        {
          id: 'smashes',
          name: 'Smashes',
          abbreviation: 'SMH',
          category: 'Attack',
          type: 'counting'
        },
        // Net
        {
          id: 'netShots',
          name: 'Net Shot Winners',
          abbreviation: 'NET',
          category: 'Net',
          type: 'counting'
        },
        // General
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        }
      ]
    });

    // Badminton Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.Badminton, StatIntensity.Advanced), {
      sport: SportType.Badminton,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Scoring (Basic)
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        // Serving (Basic)
        {
          id: 'aces',
          name: 'Service Winners (Aces)',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        // Attack (Basic + Advanced)
        {
          id: 'smashes',
          name: 'Smashes',
          abbreviation: 'SMH',
          category: 'Attack',
          type: 'counting'
        },
        {
          id: 'clears',
          name: 'Clears',
          abbreviation: 'CLR',
          category: 'Attack',
          type: 'counting'
        },
        {
          id: 'drops',
          name: 'Drops',
          abbreviation: 'DRP',
          category: 'Attack',
          type: 'counting'
        },
        // Net (Basic + Advanced)
        {
          id: 'netShots',
          name: 'Net Shot Winners',
          abbreviation: 'NET',
          category: 'Net',
          type: 'counting'
        },
        {
          id: 'blocks',
          name: 'Blocks',
          abbreviation: 'BLK',
          category: 'Net',
          type: 'counting'
        },
        {
          id: 'lifts',
          name: 'Lifts',
          abbreviation: 'LFT',
          category: 'Net',
          type: 'counting'
        },
        // Defense (Advanced)
        {
          id: 'receipts',
          name: 'Receipts',
          abbreviation: 'RCP',
          category: 'Defense',
          type: 'counting'
        },
        // General (Basic + Advanced)
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        },
        {
          id: 'netErrors',
          name: 'Net Errors',
          abbreviation: 'NE',
          category: 'General',
          type: 'counting'
        }
      ]
    });

    // ===== PICKLEBALL SCHEMAS =====

    // Pickleball Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Pickleball, StatIntensity.Basic), {
      sport: SportType.Pickleball,
      intensity: StatIntensity.Basic,
      statKeys: [
        // Scoring
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        // Serving
        {
          id: 'aces',
          name: 'Service Winners (Aces)',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        // General
        {
          id: 'winners',
          name: 'Winners',
          abbreviation: 'WON',
          category: 'General',
          type: 'counting'
        },
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        },
        // Net
        {
          id: 'dinks',
          name: 'Dinks',
          abbreviation: 'DNK',
          category: 'Net',
          type: 'counting'
        },
        {
          id: 'volleys',
          name: 'Volley Winners',
          abbreviation: 'VOL',
          category: 'Net',
          type: 'counting'
        }
      ]
    });

    // Pickleball Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.Pickleball, StatIntensity.Advanced), {
      sport: SportType.Pickleball,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Scoring (Basic)
        {
          id: 'points',
          name: 'Points',
          abbreviation: 'PTS',
          category: 'Scoring',
          type: 'counting'
        },
        // Serving (Basic)
        {
          id: 'aces',
          name: 'Service Winners (Aces)',
          abbreviation: 'ACE',
          category: 'Serving',
          type: 'counting'
        },
        // Serving (Advanced)
        {
          id: 'faultServes',
          name: 'Fault Serves',
          abbreviation: 'FS',
          category: 'Serving',
          type: 'counting'
        },
        // General (Basic + Advanced)
        {
          id: 'winners',
          name: 'Winners',
          abbreviation: 'WON',
          category: 'General',
          type: 'counting'
        },
        {
          id: 'unforcedErrors',
          name: 'Unforced Errors',
          abbreviation: 'UE',
          category: 'General',
          type: 'counting'
        },
        // Net (Basic + Advanced)
        {
          id: 'dinks',
          name: 'Dinks',
          abbreviation: 'DNK',
          category: 'Net',
          type: 'counting'
        },
        {
          id: 'volleys',
          name: 'Volley Winners',
          abbreviation: 'VOL',
          category: 'Net',
          type: 'counting'
        },
        // Advanced
        {
          id: 'thirdShotDrops',
          name: 'Third Shot Drops',
          abbreviation: 'TSD',
          category: 'Advanced',
          type: 'counting'
        },
        {
          id: 'resets',
          name: 'Resets',
          abbreviation: 'RST',
          category: 'Advanced',
          type: 'counting'
        },
        {
          id: 'ernes',
          name: 'Ernes',
          abbreviation: 'ERN',
          category: 'Advanced',
          type: 'counting'
        },
        {
          id: 'punchVolley',
          name: 'Punch Volleys',
          abbreviation: 'PV',
          category: 'Advanced',
          type: 'counting'
        }
      ]
    });

    // ===== VOLLEYBALL SCHEMAS =====

    // Volleyball Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Volleyball, StatIntensity.Basic), {
      sport: SportType.Volleyball,
      intensity: StatIntensity.Basic,
      statKeys: [
        {
          id: 'kills',
          name: 'Kills',
          abbreviation: 'K',
          category: 'Scoring',
          type: 'counting'
        },
        {
          id: 'aces',
          name: 'Aces',
          abbreviation: 'A',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'blocks',
          name: 'Blocks',
          abbreviation: 'B',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'digs',
          name: 'Digs',
          abbreviation: 'D',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'AS',
          category: 'Playmaking',
          type: 'counting'
        },
        {
          id: 'errors',
          name: 'Errors',
          abbreviation: 'E',
          category: 'Mistakes',
          type: 'counting'
        }
      ]
    });

    // Volleyball Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.Volleyball, StatIntensity.Advanced), {
      sport: SportType.Volleyball,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Scoring (Basic)
        {
          id: 'kills',
          name: 'Kills',
          abbreviation: 'K',
          category: 'Scoring',
          type: 'counting'
        },
        // Serving (Basic + Advanced)
        {
          id: 'aces',
          name: 'Aces',
          abbreviation: 'A',
          category: 'Serving',
          type: 'counting'
        },
        {
          id: 'serviceErrors',
          name: 'Service Errors',
          abbreviation: 'SE',
          category: 'Serving',
          type: 'counting'
        },
        // Defense (Basic + Advanced)
        {
          id: 'blocks',
          name: 'Blocks',
          abbreviation: 'B',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'digs',
          name: 'Digs',
          abbreviation: 'D',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'blockErrors',
          name: 'Block Errors',
          abbreviation: 'BE',
          category: 'Defense',
          type: 'counting'
        },
        // Playmaking (Basic + Advanced)
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'AS',
          category: 'Playmaking',
          type: 'counting'
        },
        {
          id: 'receptionErrors',
          name: 'Reception Errors',
          abbreviation: 'RE',
          category: 'Playmaking',
          type: 'counting'
        },
        {
          id: 'attackAttempts',
          name: 'Attack Attempts',
          abbreviation: 'AA',
          category: 'Scoring',
          type: 'counting'
        }
      ]
    });

    // ===== BASEBALL SCHEMAS =====

    // Baseball Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.Baseball, StatIntensity.Basic), {
      sport: SportType.Baseball,
      intensity: StatIntensity.Basic,
      statKeys: [
        // Batting
        {
          id: 'atBats',
          name: 'At Bats',
          abbreviation: 'AB',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'hits',
          name: 'Hits',
          abbreviation: 'H',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'runs',
          name: 'Runs',
          abbreviation: 'R',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'rbi',
          name: 'RBIs',
          abbreviation: 'RBI',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'homeRuns',
          name: 'Home Runs',
          abbreviation: 'HR',
          category: 'Batting',
          type: 'counting'
        },
        // Pitching
        {
          id: 'winsPitching',
          name: 'Wins (Pitcher)',
          abbreviation: 'W',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'strikeouts',
          name: 'Strikeouts',
          abbreviation: 'K',
          category: 'Pitching',
          type: 'counting'
        }
      ]
    });

    // Baseball Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.Baseball, StatIntensity.Advanced), {
      sport: SportType.Baseball,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Batting (Basic + Advanced)
        {
          id: 'atBats',
          name: 'At Bats',
          abbreviation: 'AB',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'hits',
          name: 'Hits',
          abbreviation: 'H',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'runs',
          name: 'Runs',
          abbreviation: 'R',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'rbi',
          name: 'RBIs',
          abbreviation: 'RBI',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'homeRuns',
          name: 'Home Runs',
          abbreviation: 'HR',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'walks',
          name: 'Walks',
          abbreviation: 'BB',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'strikeoutsBatting',
          name: 'Strikeouts (Batter)',
          abbreviation: 'SO',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'doubles',
          name: 'Doubles',
          abbreviation: '2B',
          category: 'Batting',
          type: 'counting'
        },
        {
          id: 'triples',
          name: 'Triples',
          abbreviation: '3B',
          category: 'Batting',
          type: 'counting'
        },
        // Pitching (Basic + Advanced)
        {
          id: 'winsPitching',
          name: 'Wins (Pitcher)',
          abbreviation: 'W',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'losses',
          name: 'Losses',
          abbreviation: 'L',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'inningsPitched',
          name: 'Innings Pitched',
          abbreviation: 'IP',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'earnedRuns',
          name: 'Earned Runs',
          abbreviation: 'ER',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'strikeouts',
          name: 'Strikeouts',
          abbreviation: 'K',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'walks',
          name: 'Walks (Pitcher)',
          abbreviation: 'BB',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'hitsAllowed',
          name: 'Hits Allowed',
          abbreviation: 'H',
          category: 'Pitching',
          type: 'counting'
        },
        {
          id: 'homeRunsAllowed',
          name: 'Home Runs Allowed',
          abbreviation: 'HR',
          category: 'Pitching',
          type: 'counting'
        },
        // Fielding
        {
          id: 'errors',
          name: 'Errors',
          abbreviation: 'E',
          category: 'Fielding',
          type: 'counting'
        },
        {
          id: 'putouts',
          name: 'Putouts',
          abbreviation: 'PO',
          category: 'Fielding',
          type: 'counting'
        },
        {
          id: 'assists',
          name: 'Assists',
          abbreviation: 'A',
          category: 'Fielding',
          type: 'counting'
        }
      ]
    });

    // ===== AMERICAN FOOTBALL SCHEMAS =====

    // American Football Basic Schema
    this.schemas.set(this.getSchemaKey(SportType.American_Football, StatIntensity.Basic), {
      sport: SportType.American_Football,
      intensity: StatIntensity.Basic,
      statKeys: [
        // Offense
        {
          id: 'passingYards',
          name: 'Passing Yards',
          abbreviation: 'PASS YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'passingTouchdowns',
          name: 'Passing Touchdowns',
          abbreviation: 'PASS TD',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'rushingYards',
          name: 'Rushing Yards',
          abbreviation: 'RUSH YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'rushingTouchdowns',
          name: 'Rushing Touchdowns',
          abbreviation: 'RUSH TD',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'receivingYards',
          name: 'Receiving Yards',
          abbreviation: 'REC YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'receivingTouchdowns',
          name: 'Receiving Touchdowns',
          abbreviation: 'REC TD',
          category: 'Offense',
          type: 'counting'
        },
        // Defense
        {
          id: 'tackles',
          name: 'Tackles',
          abbreviation: 'TKL',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'sacks',
          name: 'Sacks',
          abbreviation: 'SACK',
          category: 'Defense',
          type: 'counting'
        },
        // Mistakes
        {
          id: 'interceptions',
          name: 'Interceptions',
          abbreviation: 'INT',
          category: 'Mistakes',
          type: 'counting'
        },
        {
          id: 'fumbles',
          name: 'Fumbles',
          abbreviation: 'FUM',
          category: 'Mistakes',
          type: 'counting'
        }
      ]
    });

    // American Football Advanced Schema
    this.schemas.set(this.getSchemaKey(SportType.American_Football, StatIntensity.Advanced), {
      sport: SportType.American_Football,
      intensity: StatIntensity.Advanced,
      statKeys: [
        // Offense (Basic + Advanced)
        {
          id: 'passingYards',
          name: 'Passing Yards',
          abbreviation: 'PASS YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'passingTouchdowns',
          name: 'Passing Touchdowns',
          abbreviation: 'PASS TD',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'interceptions',
          name: 'Interceptions Thrown',
          abbreviation: 'INT',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'rushingYards',
          name: 'Rushing Yards',
          abbreviation: 'RUSH YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'rushingTouchdowns',
          name: 'Rushing Touchdowns',
          abbreviation: 'RUSH TD',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'receptions',
          name: 'Receptions',
          abbreviation: 'REC',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'receivingYards',
          name: 'Receiving Yards',
          abbreviation: 'REC YDS',
          category: 'Offense',
          type: 'counting'
        },
        {
          id: 'receivingTouchdowns',
          name: 'Receiving Touchdowns',
          abbreviation: 'REC TD',
          category: 'Offense',
          type: 'counting'
        },
        // Defense (Basic + Advanced)
        {
          id: 'tackles',
          name: 'Tackles',
          abbreviation: 'TKL',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'sacks',
          name: 'Sacks',
          abbreviation: 'SACK',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'defensiveInterceptions',
          name: 'Interceptions',
          abbreviation: 'INT',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'fumblesRecovered',
          name: 'Fumbles Recovered',
          abbreviation: 'FR',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'passesDefended',
          name: 'Passes Defended',
          abbreviation: 'PD',
          category: 'Defense',
          type: 'counting'
        },
        {
          id: 'forcedfumbles',
          name: 'Forced Fumbles',
          abbreviation: 'FF',
          category: 'Defense',
          type: 'counting'
        },
        // Kicking
        {
          id: 'fieldGoalsMade',
          name: 'Field Goals Made',
          abbreviation: 'FG',
          category: 'Kicking',
          type: 'counting'
        },
        {
          id: 'fieldGoalsAttempted',
          name: 'Field Goals Attempted',
          abbreviation: 'FGA',
          category: 'Kicking',
          type: 'counting'
        },
        {
          id: 'extraPointsMade',
          name: 'Extra Points Made',
          abbreviation: 'XP',
          category: 'Kicking',
          type: 'counting'
        },
        // Mistakes
        {
          id: 'fumbles',
          name: 'Fumbles',
          abbreviation: 'FUM',
          category: 'Mistakes',
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
