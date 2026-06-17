/**
 * XP Service (Mobile)
 * Identical to web version - shared service for both platforms
 */

import {
  XPProfile,
  XPEntry,
  XPSource,
  LevelInfo,
  RankTitle,
  LEVEL_THRESHOLDS,
  getRankTitleForLevel,
  XP_AWARDS
} from './xp-types';

class XPService {
  private readonly STORAGE_PREFIX = 'athlee_xp_profile_';
  private readonly HISTORY_LIMIT = 50;

  /**
   * Award XP to a user
   */
  public awardXP(
    userId: string,
    amount: number,
    source: XPSource,
    description: string,
    relatedId?: string
  ): XPProfile {
    if (!userId || amount <= 0) {
      console.warn('Invalid XP award parameters', { userId, amount });
      return this.getXPProfile(userId);
    }

    const profile = this.getXPProfile(userId);
    const oldLevel = profile.level;

    profile.totalXP += amount;

    const levelInfo = this.getLevelFromXP(profile.totalXP);
    profile.level = levelInfo.level;
    profile.rankTitle = levelInfo.rankTitle;

    const entry: XPEntry = {
      id: `xp_${Date.now()}_${Math.random()}`,
      userId,
      source,
      amount,
      timestamp: new Date().toISOString(),
      description,
      relatedId
    };

    profile.history.unshift(entry);
    profile.history = profile.history.slice(0, this.HISTORY_LIMIT);

    profile.lastUpdated = new Date().toISOString();

    this.saveXPProfile(userId, profile);

    if (profile.level > oldLevel) {
      console.log(
        `🎉 ${userId} leveled up to ${profile.level} (${profile.rankTitle})!`
      );
    }

    return profile;
  }

  /**
   * Get XP profile for a user
   */
  public getXPProfile(userId: string): XPProfile {
    const saved = this.loadXPProfile(userId);
    if (saved) return saved;

    const profile: XPProfile = {
      userId,
      totalXP: 0,
      level: 1,
      rankTitle: RankTitle.Rookie,
      history: [],
      lastUpdated: new Date().toISOString()
    };

    return profile;
  }

  /**
   * Calculate level and rank info from total XP
   */
  public getLevelFromXP(totalXP: number): LevelInfo {
    let level = 1;

    for (let l = 10; l >= 1; l--) {
      if (totalXP >= LEVEL_THRESHOLDS[l]) {
        level = l;
        break;
      }
    }

    const rankTitle = getRankTitleForLevel(level);
    const currentLevelXP = LEVEL_THRESHOLDS[level];
    const nextLevelXP = LEVEL_THRESHOLDS[level + 1] ?? this.getMaxXPForLevel(level + 1);
    const totalForCurrentLevel = nextLevelXP - currentLevelXP;
    const xpIntoCurrentLevel = totalXP - currentLevelXP;
    const percentToNextLevel = Math.min(100, Math.round((xpIntoCurrentLevel / totalForCurrentLevel) * 100));

    return {
      level,
      rankTitle,
      totalXPRequired: currentLevelXP,
      nextLevelXP,
      xpIntoCurrentLevel,
      xpIntoNextLevel: nextLevelXP - totalXP,
      totalForCurrentLevel,
      percentToNextLevel
    };
  }

  /**
   * Check if user leveled up
   */
  public didLevelUp(oldXP: number, newXP: number): boolean {
    const oldLevel = this.getLevelFromXP(oldXP).level;
    const newLevel = this.getLevelFromXP(newXP).level;
    return newLevel > oldLevel;
  }

  /**
   * Get level up notification
   */
  public getLevelUpNotification(oldXP: number, newXP: number): string | null {
    if (!this.didLevelUp(oldXP, newXP)) return null;

    const newLevel = this.getLevelFromXP(newXP);
    return `🎉 Congratulations! You've reached Level ${newLevel.level} and earned the ${newLevel.rankTitle} rank!`;
  }

  /**
   * Get XP history for a user
   */
  public getXPHistory(userId: string, limit: number = 20): XPEntry[] {
    const profile = this.getXPProfile(userId);
    return profile.history.slice(0, limit);
  }

  /**
   * Get total XP earned from a specific source
   */
  public getXPBySource(userId: string, source: XPSource): number {
    const profile = this.getXPProfile(userId);
    return profile.history
      .filter((entry) => entry.source === source)
      .reduce((sum, entry) => sum + entry.amount, 0);
  }

  /**
   * Reset XP (for testing)
   */
  public resetXP(userId: string): void {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Failed to reset XP:', error);
    }
  }

  /**
   * Clear all XP data
   */
  public clearAllXP(): void {
    if (typeof localStorage === 'undefined') return;

    const keysToDelete: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear XP:', error);
    }
  }

  /**
   * Private: Save XP profile to storage
   */
  private saveXPProfile(userId: string, profile: XPProfile): void {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(profile));
      }
    } catch (error) {
      console.error('Failed to save XP profile:', error);
    }
  }

  /**
   * Private: Load XP profile from storage
   */
  private loadXPProfile(userId: string): XPProfile | null {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      return null;
    } catch (error) {
      console.error('Failed to load XP profile:', error);
      return null;
    }
  }

  /**
   * Private: Get max XP for a level
   */
  private getMaxXPForLevel(level: number): number {
    if (level <= 5) {
      return LEVEL_THRESHOLDS[level] ?? 0;
    }
    const level5XP = LEVEL_THRESHOLDS[5];
    const doublings = level - 5;
    return level5XP * Math.pow(2, doublings);
  }
}

export const xpService = new XPService();
