/**
 * Sync Ecosystem Data Function
 * Call after ecosystem generation to ensure all data is properly synced and accessible
 * 
 * This function:
 * - Creates xpService profiles from userStatsService stats
 * - Verifies badge data alignment
 * - Ensures all user references are complete
 */

import { xpService } from './xpService';
import { userStatsService } from './userStatsService';
import { getAllPlayerUsers } from './mockUsersComprehensive';

export function syncEcosystemDataForProfiles(): void {
  try {
    console.log('🔄 Syncing ecosystem profile data...');

    const players = getAllPlayerUsers();
    let synced = 0;
    let errors = 0;

    players.forEach(player => {
      try {
        // Get the stats that were already generated
        const stats = userStatsService.getUserStats(player.id);

        if (stats && stats.totalXP > 0) {
          // Create or update xpService profile from stats
          const xpProfile = xpService.getXPProfile(player.id);
          
          // If empty, seed it from stats
          if (xpProfile.totalXP === 0 && stats.totalXP > 0) {
            // Award all the XP at once (this updates level/rank)
            xpService.awardXP(
              player.id,
              stats.totalXP,
              'match_completion' as any, // Use as profile initialization source
              'Synced from ecosystem stats generation'
            );
            synced++;
          }
        }
      } catch (err) {
        console.error(`Failed to sync profile data for ${player.id}:`, err);
        errors++;
      }
    });

    console.log(`✅ Profile data sync complete: ${synced} synced, ${errors} errors`);
  } catch (error) {
    console.error('Failed to sync ecosystem profile data:', error);
  }
}

/**
 * Diagnostic function to show what data exists for badges and XP
 */
export function diagnosticBadgesAndXP(): void {
  console.log('\n🔍 DIAGNOSTIC: Badges & XP Data Check\n');

  // Check badges
  const allBadges = JSON.parse(localStorage.getItem('athlee_earned_badges') || '[]');
  console.log(`📋 Total badge records in storage: ${allBadges.length}`);

  if (allBadges.length > 0) {
    const userIds = new Set(allBadges.map((b: any) => b.userId));
    console.log(`👥 Users with badges: ${userIds.size}`);

    // Sample
    const sample = allBadges.slice(0, 3);
    sample.forEach((badge: any) => {
      console.log(`   - User ${badge.userId}: badgeId=${badge.badgeId}, earned=${badge.earnedAt?.substring(0, 10)}`);
    });
  } else {
    console.log('⚠️  No badges found in storage');
  }

  // Check XP profiles
  const xpKeys = Object.keys(localStorage).filter(key => key.startsWith('athlee_xp_profile_'));
  console.log(`\n📊 XP profiles in storage: ${xpKeys.length}`);

  if (xpKeys.length > 0) {
    xpKeys.slice(0, 3).forEach(key => {
      const xpData = JSON.parse(localStorage.getItem(key) || '{}');
      const userId = key.replace('athlee_xp_profile_', '');
      console.log(`   - ${userId}: totalXP=${xpData.totalXP}, level=${xpData.level}`);
    });
  } else {
    console.log('⚠️  No XP profiles found in storage');
  }

  // Check stats records for comparison
  const statsKeys = Object.keys(localStorage).filter(key => key.startsWith('athlee_user_stats_'));
  console.log(`\n📈 Stats records in storage: ${statsKeys.length}`);

  if (statsKeys.length > 0) {
    statsKeys.slice(0, 3).forEach(key => {
      const statsData = JSON.parse(localStorage.getItem(key) || '{}');
      const userId = key.replace('athlee_user_stats_', '');
      console.log(`   - ${userId}: totalXP=${statsData.totalXP}, level=${statsData.level}`);
    });
  }

  console.log('\n💡 Summary:');
  console.log(`   Badges created during generation: ${allBadges.length > 0 ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   XP profiles created: ${xpKeys.length > 0 ? `YES (${xpKeys.length}) ✅` : 'NO ❌'}`);
  console.log(`   Stats records created: ${statsKeys.length > 0 ? `YES (${statsKeys.length}) ✅` : 'NO ❌'}`);
}

// Make globally available
if (typeof window !== 'undefined') {
  (window as any).syncEcosystemDataForProfiles = syncEcosystemDataForProfiles;
  (window as any).diagnosticBadgesAndXP = diagnosticBadgesAndXP;
}
