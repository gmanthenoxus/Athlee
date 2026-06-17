/**
 * BadgeAwardService
 * Handles awarding badges to users and managing earned badge storage
 */

import { EarnedBadge, BadgeNotification } from './badge-types';
import { getBadgeById } from './badgeCatalog';

class BadgeAwardService {
  private readonly EARNED_BADGES_KEY = 'athlee_earned_badges';
  private readonly BADGE_NOTIFICATIONS_KEY = 'athlee_badge_notifications';
  private readonly PINNED_BADGES_KEY = 'athlee_pinned_badges';

  /**
   * Award a badge to a user
   */
  public awardBadge(userId: string, badgeId: string, context?: any): boolean {
    try {
      // Check if badge already earned
      if (this.hasEarnedBadge(userId, badgeId)) {
        return false;
      }

      const badge = getBadgeById(badgeId);
      if (!badge) return false;

      // Create earned badge record
      const earnedBadge: EarnedBadge = {
        badgeId,
        userId,
        earnedAt: new Date(),
        context,
      };

      // Save to storage
      const allBadges = this.getAllEarnedBadges();
      allBadges.push(earnedBadge);
      localStorage.setItem(this.EARNED_BADGES_KEY, JSON.stringify(allBadges));

      // Create notification
      this.createNotification(userId, badgeId, badge.name);

      return true;
    } catch (err) {
      console.error('Failed to award badge:', err);
      return false;
    }
  }

  /**
   * Check if user has earned a badge
   */
  public hasEarnedBadge(userId: string, badgeId: string): boolean {
    const userBadges = this.getUserEarnedBadges(userId);
    return userBadges.some((b) => b.badgeId === badgeId);
  }

  /**
   * Get all earned badge IDs for a user
   */
  public getUserEarnedBadgeIds(userId: string): string[] {
    return this.getUserEarnedBadges(userId).map((b) => b.badgeId);
  }

  /**
   * Get all earned badges for a user
   */
  public getUserEarnedBadges(userId: string): EarnedBadge[] {
    const allBadges = this.getAllEarnedBadges();
    return allBadges.filter((b) => b.userId === userId);
  }

  /**
   * Get all earned badges (across all users)
   */
  private getAllEarnedBadges(): EarnedBadge[] {
    try {
      const data = localStorage.getItem(this.EARNED_BADGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to parse earned badges:', err);
      return [];
    }
  }

  /**
   * Create a notification for earning a badge
   */
  private createNotification(userId: string, badgeId: string, badgeName: string): void {
    try {
      const notification: BadgeNotification = {
        id: `notif_${badgeId}_${Date.now()}`,
        userId,
        badgeId,
        message: `🏆 You earned the "${badgeName}" badge!`,
        timestamp: new Date(),
        read: false,
      };

      const notifications = this.getAllNotifications();
      notifications.push(notification);
      localStorage.setItem(this.BADGE_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    } catch (err) {
      console.error('Failed to create notification:', err);
    }
  }

  /**
   * Get unread notifications for a user
   */
  public getUserNotifications(userId: string, unreadOnly: boolean = true): BadgeNotification[] {
    const allNotifications = this.getAllNotifications();
    return allNotifications.filter((n) => n.userId === userId && (!unreadOnly || !n.read));
  }

  /**
   * Mark notification as read
   */
  public markNotificationAsRead(notificationId: string): void {
    try {
      const notifications = this.getAllNotifications();
      const notif = notifications.find((n) => n.id === notificationId);
      if (notif) {
        notif.read = true;
        localStorage.setItem(this.BADGE_NOTIFICATIONS_KEY, JSON.stringify(notifications));
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }

  /**
   * Get all notifications
   */
  private getAllNotifications(): BadgeNotification[] {
    try {
      const data = localStorage.getItem(this.BADGE_NOTIFICATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to parse notifications:', err);
      return [];
    }
  }

  /**
   * Pin a badge (max 3)
   */
  public pinBadges(userId: string, badgeIds: string[]): boolean {
    try {
      if (badgeIds.length > 3) {
        console.warn('Cannot pin more than 3 badges');
        return false;
      }

      // Verify all badges are earned
      const earnedBadgeIds = this.getUserEarnedBadgeIds(userId);
      const validBadgeIds = badgeIds.filter((id) => earnedBadgeIds.includes(id));

      if (validBadgeIds.length !== badgeIds.length) {
        console.warn('Some badges have not been earned');
        return false;
      }

      const pinned = this.getAllPinnedBadges();
      const userPinned = pinned.find((p) => p.userId === userId);

      if (userPinned) {
        userPinned.badgeIds = validBadgeIds;
      } else {
        pinned.push({ userId, badgeIds: validBadgeIds });
      }

      localStorage.setItem(this.PINNED_BADGES_KEY, JSON.stringify(pinned));
      return true;
    } catch (err) {
      console.error('Failed to pin badges:', err);
      return false;
    }
  }

  /**
   * Get pinned badges for a user
   */
  public getPinnedBadges(userId: string): string[] {
    try {
      const pinned = this.getAllPinnedBadges();
      const userPinned = pinned.find((p) => p.userId === userId);
      return userPinned?.badgeIds || [];
    } catch (err) {
      console.error('Failed to get pinned badges:', err);
      return [];
    }
  }

  /**
   * Get all pinned badges
   */
  private getAllPinnedBadges(): any[] {
    try {
      const data = localStorage.getItem(this.PINNED_BADGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to parse pinned badges:', err);
      return [];
    }
  }

  /**
   * Clear all earned badges for a user (for testing)
   */
  public clearUserBadges(userId: string): void {
    try {
      const allBadges = this.getAllEarnedBadges();
      const filtered = allBadges.filter((b) => b.userId !== userId);
      localStorage.setItem(this.EARNED_BADGES_KEY, JSON.stringify(filtered));
    } catch (err) {
      console.error('Failed to clear badges:', err);
    }
  }
}

export const badgeAwardService = new BadgeAwardService();
