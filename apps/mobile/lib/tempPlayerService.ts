import { MatchPlayer } from './match-types';

/**
 * TempPlayerService
 * Creates temporary/guest players who can be added to match teams
 * Useful for adding unregistered or walk-in players
 */
class TempPlayerService {
  private tempPlayerCounter = 0;

  /**
   * Create a temporary player (guest/walk-in)
   */
  public createTempPlayer(name: string, options?: { position?: string; jerseyNo?: string }): MatchPlayer {
    const id = this.generateTempId();
    return {
      id,
      name,
      userId: undefined,
      avatarUrl: undefined,
      position: options?.position,
      jerseyNo: options?.jerseyNo,
      claimed: false, // Temporary players are unclaimed
    };
  }

  /**
   * Generate unique temporary ID
   */
  private generateTempId(): string {
    this.tempPlayerCounter += 1;
    return `temp_${Date.now()}_${this.tempPlayerCounter}`;
  }

  /**
   * Check if a player is temporary
   */
  public isTemporaryPlayer(player: MatchPlayer): boolean {
    return player.id.startsWith('temp_') && !player.claimed;
  }

  /**
   * Convert temporary player to claimed (registered) player
   */
  public claimTempPlayer(player: MatchPlayer, userId: string): MatchPlayer {
    return {
      ...player,
      userId,
      claimed: true,
    };
  }

  /**
   * Reset counter (useful for testing)
   */
  public resetCounter(): void {
    this.tempPlayerCounter = 0;
  }
}

export const tempPlayerService = new TempPlayerService();
