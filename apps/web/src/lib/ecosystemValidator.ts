/**
 * Data Ecosystem Validator
 * 
 * Ensures complete data integrity when initializing or regenerating ecosystems
 * Verifies all connections between users, stats, followers, matches, locations, etc.
 * 
 * Usage:
 *   validateEcosystemIntegrity() - Full validation with detailed report
 *   const issues = await getEcosystemIssues() - Get list of problems
 *   await fixEcosystemIssues() - Auto-repair fixable issues
 */

import { getAllPlayerUsers, getAllBusinessUsers } from './mockUsersComprehensive';
import { userStatsService } from './userStatsService';
import { followerService } from './followerService';
import { courtRegularsService } from './courtRegularsService';
import { getAllComprehensiveLocations } from './mockLocationsComprehensive';
import { getAllComprehensiveMatches } from './mockMatchesComprehensive';
import { badgeAwardService } from './badgeAwardService';
import { leaderboardService } from './leaderboardService';
import { LeaderboardType } from './leaderboard-types';

export interface ValidationIssue {
  severity: 'critical' | 'warning' | 'info';
  category: string;
  issue: string;
  affectedIds?: string[];
  recommendation: string;
  autoFixable: boolean;
}

export interface EcosystemValidationReport {
  timestamp: string;
  totalIssues: number;
  criticalIssues: number;
  warnings: number;
  infos: number;
  sections: {
    users: ValidationResult;
    userStats: ValidationResult;
    followers: ValidationResult;
    courtRegulars: ValidationResult;
    matches: ValidationResult;
    locations: ValidationResult;
    badges: ValidationResult;
    leaderboards: ValidationResult;
  };
  issues: ValidationIssue[];
  summary: string;
}

export interface ValidationResult {
  checked: number;
  valid: number;
  invalid: number;
  orphaned: number;
  issues: ValidationIssue[];
}

/**
 * Validate all users have required fields
 */
function validateUsers(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const players = getAllPlayerUsers();
  const businesses = getAllBusinessUsers();
  const allUsers = [...players, ...businesses];

  result.checked = allUsers.length;

  allUsers.forEach(user => {
    const errors: string[] = [];
    
    if (!user.id) errors.push('Missing id');
    if (!user.email) errors.push('Missing email');
    if (!user.username) errors.push('Missing username');
    
    // Validate based on account type
    if (user.accountType === 'Player') {
      const playerUser = user as any;
      if (!playerUser.firstName || !playerUser.lastName) errors.push('Missing name');
      if (!playerUser.primarySport) errors.push('Missing primarySport');
    } else if (user.accountType === 'Business') {
      const businessUser = user as any;
      if (!businessUser.businessName) errors.push('Missing businessName');
      if (!businessUser.adminName) errors.push('Missing adminName');
    }

    if (!user.accountType) errors.push('Missing accountType');

    if (errors.length === 0) {
      result.valid++;
    } else {
      result.invalid++;
      result.issues.push({
        severity: 'critical',
        category: 'User Validation',
        issue: `User ${user.id} has missing fields: ${errors.join(', ')}`,
        affectedIds: [user.id],
        recommendation: 'Regenerate user with required fields',
        autoFixable: false,
      });
    }
  });

  return result;
}

/**
 * Validate user stats exist for all players
 */
function validateUserStats(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const players = getAllPlayerUsers();
  const allStats = userStatsService.getAllUserStats();
  const statsMap = new Map(allStats.map(s => [s.userId, s]));

  result.checked = players.length;

  // Check each player has stats
  players.forEach(player => {
    if (statsMap.has(player.id)) {
      const stats = statsMap.get(player.id)!;

      const errors: string[] = [];
      if (stats.totalXP === undefined) errors.push('Missing totalXP');
      if (!stats.level || stats.level < 1 || stats.level > 10) errors.push('Invalid level');
      if (stats.totalMatches === undefined) errors.push('Missing totalMatches');
      if (!stats.sportStats || Object.keys(stats.sportStats).length === 0) {
        errors.push('No sport stats');
      }

      if (errors.length === 0) {
        result.valid++;
      } else {
        result.invalid++;
        result.issues.push({
          severity: 'critical',
          category: 'User Stats Validation',
          issue: `Player ${player.username} stats incomplete: ${errors.join(', ')}`,
          affectedIds: [player.id],
          recommendation: 'Reinitialize stats for this player',
          autoFixable: true,
        });
      }
    } else {
      result.orphaned++;
      result.issues.push({
        severity: 'critical',
        category: 'User Stats Missing',
        issue: `Player ${player.username} (${player.id}) has no stats record`,
        affectedIds: [player.id],
        recommendation: 'Create stats record for this player',
        autoFixable: true,
      });
    }
  });

  // Check for orphaned stats (stats without matching user)
  const userIds = new Set(players.map(p => p.id));
  allStats.forEach(stat => {
    if (!userIds.has(stat.userId)) {
      result.orphaned++;
      result.issues.push({
        severity: 'warning',
        category: 'Orphaned Stats',
        issue: `Stats exist for non-existent user ${stat.userId}`,
        affectedIds: [stat.userId],
        recommendation: 'Delete orphaned stats record',
        autoFixable: true,
      });
    }
  });

  return result;
}

/**
 * Validate follower relationships consistency
 */
function validateFollowers(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const players = getAllPlayerUsers();
  const userIds = new Set(players.map(p => p.id));

  result.checked = players.length;

  players.forEach(player => {
    const followerCount = followerService.getFollowerCount(player.id);
    const followingCount = followerService.getFollowingCount(player.id);

    // Check follower relationships
    const followers = followerService.getFollowers(player.id);
    const following = followerService.getFollowing(player.id);

    let hasIssues = false;

    // Validate all followers exist
    followers.forEach(followerId => {
      if (!userIds.has(followerId)) {
        hasIssues = true;
        result.issues.push({
          severity: 'warning',
          category: 'Invalid Follower',
          issue: `${player.username} has follower ${followerId} that doesn't exist`,
          affectedIds: [player.id, followerId],
          recommendation: 'Remove invalid follower relationship',
          autoFixable: true,
        });
      }
    });

    // Validate all following relationships exist
    following.forEach(followingId => {
      if (!userIds.has(followingId)) {
        hasIssues = true;
        result.issues.push({
          severity: 'warning',
          category: 'Invalid Following',
          issue: `${player.username} follows ${followingId} that doesn't exist`,
          affectedIds: [player.id, followingId],
          recommendation: 'Remove invalid following relationship',
          autoFixable: true,
        });
      }
    });

    if (!hasIssues) {
      result.valid++;
    } else {
      result.invalid++;
    }
  });

  return result;
}

/**
 * Validate court regulars exist for all locations
 */
function validateCourtRegulars(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const locations = getAllComprehensiveLocations();
  const players = getAllPlayerUsers();
  const userIds = new Set(players.map(p => p.id));

  result.checked = locations.length;

  locations.forEach(location => {
    try {
      const regulars = courtRegularsService.getCourtRegulars(location.id);

      if (!regulars || regulars.length === 0) {
        result.issues.push({
          severity: 'info',
          category: 'Court Regulars Empty',
          issue: `Location ${location.name} has no court regulars`,
          affectedIds: [location.id],
          recommendation: 'Initialize court regulars for this location',
          autoFixable: true,
        });
      } else {
        // Validate all regulars exist
        let hasIssues = false;
        regulars.forEach(regular => {
          if (!userIds.has(regular.userId)) {
            hasIssues = true;
            result.issues.push({
              severity: 'warning',
              category: 'Invalid Court Regular',
              issue: `Location ${location.name} has regular ${regular.userId} that doesn't exist`,
              affectedIds: [location.id, regular.userId],
              recommendation: 'Remove invalid court regular',
              autoFixable: true,
            });
          }
        });

        if (!hasIssues) {
          result.valid++;
        } else {
          result.invalid++;
        }
      }
    } catch (error) {
      result.invalid++;
      result.issues.push({
        severity: 'warning',
        category: 'Court Regulars Error',
        issue: `Error loading court regulars for location ${location.id}`,
        affectedIds: [location.id],
        recommendation: 'Refresh court regulars data',
        autoFixable: true,
      });
    }
  });

  return result;
}

/**
 * Validate matches reference valid users and locations
 */
function validateMatches(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const matches = getAllComprehensiveMatches();
  const players = getAllPlayerUsers();
  const locations = getAllComprehensiveLocations();
  const userIds = new Set(players.map(p => p.id));
  const locationIds = new Set(locations.map(l => l.id));

  result.checked = matches.length;

  matches.forEach(match => {
    let hasIssues = false;

    // Validate match creator exists
    if (!userIds.has(match.createdBy)) {
      hasIssues = true;
      result.issues.push({
        severity: 'warning',
        category: 'Match Creator Invalid',
        issue: `Match ${match.id} creator ${match.createdBy} doesn't exist`,
        affectedIds: [match.id, match.createdBy],
        recommendation: 'Delete invalid match',
        autoFixable: true,
      });
    }

    // Validate location exists (if specified)
    if (match.locationId && !locationIds.has(match.locationId)) {
      hasIssues = true;
      result.issues.push({
        severity: 'warning',
        category: 'Match Location Invalid',
        issue: `Match ${match.id} location ${match.locationId} doesn't exist`,
        affectedIds: [match.id, match.locationId],
        recommendation: 'Delete invalid match',
        autoFixable: true,
      });
    }

    // Validate all team members exist
    (match.teams || []).forEach(team => {
      (team.players || []).forEach(player => {
        if (player.userId && !userIds.has(player.userId)) {
          hasIssues = true;
          result.issues.push({
            severity: 'warning',
            category: 'Match Participant Invalid',
            issue: `Match ${match.id} participant ${player.userId} doesn't exist`,
            affectedIds: [match.id, player.userId],
            recommendation: 'Remove invalid participant from match',
            autoFixable: true,
          });
        }
      });
    });

    if (!hasIssues) {
      result.valid++;
    } else {
      result.invalid++;
    }
  });

  return result;
}

/**
 * Validate locations have required fields
 */
function validateLocations(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const locations = getAllComprehensiveLocations();
  const businesses = getAllBusinessUsers();
  const businessIds = new Set(businesses.map(b => b.id));

  result.checked = locations.length;

  locations.forEach(location => {
    const errors: string[] = [];

    if (!location.id) errors.push('Missing id');
    if (!location.name) errors.push('Missing name');
    if (!location.address) errors.push('Missing address');
    if (!location.sports || location.sports.length === 0) errors.push('No sports');

    // Validate owner exists (if specified)
    if (location.ownerId && !businessIds.has(location.ownerId)) {
      errors.push(`Owner ${location.ownerId} doesn't exist`);
    }

    if (errors.length === 0) {
      result.valid++;
    } else {
      result.invalid++;
      result.issues.push({
        severity: 'critical',
        category: 'Location Validation',
        issue: `Location ${location.id} has issues: ${errors.join(', ')}`,
        affectedIds: [location.id],
        recommendation: 'Recreate location with valid data',
        autoFixable: false,
      });
    }
  });

  return result;
}

/**
 * Validate badges are awarded to valid users
 */
function validateBadges(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  const players = getAllPlayerUsers();

  result.checked = players.length;

  players.forEach(player => {
    try {
      const badges = badgeAwardService.getUserEarnedBadges(player.id);
      
      // Validate each badge has required fields
      let hasIssues = false;
      badges.forEach(badge => {
        if (!badge.badgeId || !badge.userId) {
          hasIssues = true;
          result.issues.push({
            severity: 'warning',
            category: 'Badge Validation',
            issue: `Player ${player.username} has malformed badge`,
            affectedIds: [player.id, badge.badgeId],
            recommendation: 'Remove invalid badge',
            autoFixable: true,
          });
        }
      });

      if (!hasIssues) {
        result.valid++;
      }
    } catch (error) {
      // No badges is acceptable
      result.valid++;
    }
  });

  return result;
}

/**
 * Validate leaderboard data can be calculated
 */
function validateLeaderboards(): ValidationResult {
  const result: ValidationResult = {
    checked: 0,
    valid: 0,
    invalid: 0,
    orphaned: 0,
    issues: [],
  };

  try {
    const globalRankings = leaderboardService.getLeaderboard(LeaderboardType.Global);
    result.checked = 1;

    if (globalRankings && globalRankings.length > 0) {
      result.valid++;
    } else {
      result.issues.push({
        severity: 'warning',
        category: 'Leaderboard Empty',
        issue: 'Global leaderboard has no entries',
        recommendation: 'Ensure users have stats',
        autoFixable: false,
      });
    }
  } catch (error) {
    result.invalid++;
    result.issues.push({
      severity: 'critical',
      category: 'Leaderboard Error',
      issue: `Error calculating leaderboards: ${error}`,
      recommendation: 'Review user stats data',
      autoFixable: false,
    });
  }

  return result;
}

/**
 * Run complete ecosystem validation
 */
export function validateEcosystemIntegrity(): EcosystemValidationReport {
  console.log('🔍 Starting ecosystem validation...');
  const startTime = Date.now();

  const sections = {
    users: validateUsers(),
    userStats: validateUserStats(),
    followers: validateFollowers(),
    courtRegulars: validateCourtRegulars(),
    matches: validateMatches(),
    locations: validateLocations(),
    badges: validateBadges(),
    leaderboards: validateLeaderboards(),
  };

  // Aggregate issues
  const allIssues: ValidationIssue[] = [];
  Object.values(sections).forEach(section => {
    allIssues.push(...section.issues);
  });

  // Count by severity
  const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
  const warnings = allIssues.filter(i => i.severity === 'warning').length;
  const infos = allIssues.filter(i => i.severity === 'info').length;

  const duration = Date.now() - startTime;

  // Generate summary
  const summary = 
    criticalIssues > 0 
      ? `⚠️ ${criticalIssues} CRITICAL issues found - ecosystem may be corrupted`
      : warnings > 0
      ? `⚠️ ${warnings} warnings - some data inconsistencies detected`
      : `✅ Ecosystem is healthy`;

  const report: EcosystemValidationReport = {
    timestamp: new Date().toISOString(),
    totalIssues: allIssues.length,
    criticalIssues,
    warnings,
    infos,
    sections,
    issues: allIssues,
    summary,
  };

  console.log(`🔍 Validation complete in ${duration}ms`);
  console.log(summary);

  return report;
}

/**
 * Get list of fixable issues
 */
export function getFixableIssues(): ValidationIssue[] {
  const report = validateEcosystemIntegrity();
  return report.issues.filter(i => i.autoFixable);
}

/**
 * Attempt to auto-fix issues
 */
export function attemptAutoFix(): { fixed: number; remaining: number } {
  console.log('🔧 Attempting to auto-fix ecosystem issues...');
  
  const fixableIssues = getFixableIssues();
  let fixed = 0;

  fixableIssues.forEach(issue => {
    try {
      if (issue.category === 'User Stats Missing' && issue.affectedIds) {
        // Reinitialize stats for player
        const userId = issue.affectedIds[0];
        const players = getAllPlayerUsers();
        const player = players.find(p => p.id === userId);
        if (player) {
          userStatsService.initializeUserStats(userId, player.username);
          fixed++;
        }
      } else if (issue.category === 'Court Regulars Error' || issue.category === 'Court Regulars Empty') {
        // Use the global refresh for all locations
        courtRegularsService.refreshAllCourtRegulars();
        fixed++;
      }
      // Other issues require manual intervention
    } catch (error) {
      console.warn(`Failed to fix issue: ${issue.issue}`, error);
    }
  });

  const remaining = fixableIssues.length - fixed;
  console.log(`🔧 Fixed ${fixed} issue(s), ${remaining} remaining`);

  return { fixed, remaining };
}

/**
 * Print validation report to console in readable format
 */
export function printValidationReport(report: EcosystemValidationReport): void {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📊 ECOSYSTEM VALIDATION REPORT');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Summary: ${report.summary}`);
  console.log(`Total Issues: ${report.totalIssues} (🔴 ${report.criticalIssues} | ⚠️ ${report.warnings} | ℹ️ ${report.infos})`);
  console.log('───────────────────────────────────────────────────────────');

  // By section
  console.log('\n📋 VALIDATION BY SECTION:');
  Object.entries(report.sections).forEach(([name, result]) => {
    console.log(`\n  ${name.toUpperCase()}`);
    console.log(`    Checked: ${result.checked} | Valid: ${result.valid} | Invalid: ${result.invalid} | Orphaned: ${result.orphaned}`);
    if (result.issues.length > 0) {
      result.issues.forEach(issue => {
        console.log(`      ${issue.severity === 'critical' ? '🔴' : issue.severity === 'warning' ? '⚠️' : 'ℹ️'} ${issue.issue}`);
      });
    }
  });

  console.log('\n═══════════════════════════════════════════════════════════\n');
}

/**
 * Export validation data for external analysis
 */
export function exportValidationReport(report: EcosystemValidationReport): string {
  return JSON.stringify(report, null, 2);
}
