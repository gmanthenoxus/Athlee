/**
 * Data Check Debug Helper
 * Run in browser console to verify all data exists for a user
 */

export function checkUserProfileData(userId: string) {
  console.log(`\n📋 Checking all profile data for user: ${userId}\n`);

  // 1. Check basic user record
  const users = JSON.parse(localStorage.getItem('athlee_users') || '[]');
  const user = users.find((u: any) => u.id === userId);
  console.log(
    user
      ? `✅ USER RECORD: Found in athlee_users`
      : `❌ USER RECORD: NOT FOUND in athlee_users`
  );
  if (user) console.log(`   ${user.firstName} ${user.lastName || user.businessName}`);

  // 2. Check stats record
  const statsKey = `athlee_user_stats_${userId}`;
  const stats = JSON.parse(localStorage.getItem(statsKey) || 'null');
  console.log(
    stats
      ? `✅ STATS RECORD: Found in ${statsKey}`
      : `❌ STATS RECORD: NOT FOUND in ${statsKey}`
  );
  if (stats) {
    console.log(`   XP: ${stats.totalXP}, Level: ${stats.level}, Matches: ${stats.totalMatches}`);
  }

  // 3. Check XP profile (for XPBar component)
  const xpKey = `athlee_xp_profile_${userId}`;
  const xpProfile = JSON.parse(localStorage.getItem(xpKey) || 'null');
  console.log(
    xpProfile
      ? `✅ XP PROFILE: Found in ${xpKey}`
      : `❌ XP PROFILE: NOT FOUND in ${xpKey}`
  );
  if (xpProfile) {
    console.log(`   Total XP: ${xpProfile.totalXP}, entries: ${xpProfile.entries?.length || 0}`);
  }

  // 4. Check followers
  const followsKey = `athlee_follows_${userId}`;
  const follows = JSON.parse(localStorage.getItem(followsKey) || 'null');
  console.log(
    follows
      ? `✅ FOLLOWS PROFILE: Found in ${followsKey}`
      : `❌ FOLLOWS PROFILE: NOT FOUND in ${followsKey}`
  );
  if (follows) {
    console.log(`   Followers: ${follows.followers?.length || 0}, Following: ${follows.following?.length || 0}`);
  }

  // 5. Check badges
  const allBadges = JSON.parse(localStorage.getItem('athlee_earned_badges') || '[]');
  const userBadges = allBadges.filter((b: any) => b.userId === userId);
  console.log(
    userBadges.length > 0
      ? `✅ BADGES: Found ${userBadges.length} badges in athlee_earned_badges`
      : `❌ BADGES: NO badges found for this user in athlee_earned_badges`
  );
  if (userBadges.length > 0) {
    console.log(`   Badge IDs: ${userBadges.map((b: any) => b.badgeId).join(', ')}`);
  }

  // 6. Summary
  console.log(`\n📊 SUMMARY:`);
  const hasAll = user && stats && follows && userBadges.length > 0;
  console.log(
    hasAll
      ? `✅ ALL DATA PRESENT - Profile should display fully`
      : `⚠️  MISSING DATA - Some profile sections may not display`
  );

  if (!stats) {
    console.log(`\n🔴 CRITICAL: Stats record is missing. This is why XP/Level/Badges don't show.`);
  }
  if (userBadges.length === 0) {
    console.log(`\n🔴 CRITICAL: No badges found. Badge tab will be empty.`);
  }
  if (!xpProfile) {
    console.log(`\n🟡 NOTE: XP profile not found - XPBar will initialize empty profile`);
  }

  return { user, stats, xpProfile, follows, userBadges };
}

// Make globally available for browser console
if (typeof window !== 'undefined') {
  (window as any).checkUserProfileData = checkUserProfileData;
}
