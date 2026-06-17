/**
 * PlayerClaimService
 * Manages player claim tokens for unregistered players to register and claim their stats
 */

interface PlayerClaim {
  claimToken: string;
  playerId: string;
  playerName: string;
  matchId: string;
  sport: string;
  createdAt: Date;
  expiresAt: Date;
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: Date;
}

class PlayerClaimService {
  private readonly STORAGE_KEY = 'athlee_player_claims';
  private readonly CLAIM_EXPIRY_DAYS = 30;

  /**
   * Generate a claim token for an unregistered player
   */
  public generateClaimToken(
    playerId: string,
    playerName: string,
    matchId: string,
    sport: string
  ): string {
    const token = this.generateRandomToken();
    const now = new Date();
    const expiryDate = new Date(now.getTime() + this.CLAIM_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    const claim: PlayerClaim = {
      claimToken: token,
      playerId,
      playerName,
      matchId,
      sport,
      createdAt: now,
      expiresAt: expiryDate,
      claimed: false,
    };

    const claims = this.getAllClaims();
    claims.push(claim);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(claims));

    return token;
  }

  /**
   * Get a claim by token
   */
  public getClaimByToken(token: string): PlayerClaim | null {
    const claims = this.getAllClaims();
    const claim = claims.find((c) => c.claimToken === token && !c.claimed);

    if (claim && new Date() > claim.expiresAt) {
      return null; // Token expired
    }

    return claim || null;
  }

  /**
   * Claim a player's stats with a token
   */
  public claimPlayerStats(token: string, userId: string): boolean {
    const claims = this.getAllClaims();
    const claimIndex = claims.findIndex((c) => c.claimToken === token);

    if (claimIndex === -1) return false;

    const claim = claims[claimIndex];
    if (claim.claimed || new Date() > claim.expiresAt) return false;

    claim.claimed = true;
    claim.claimedBy = userId;
    claim.claimedAt = new Date();

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(claims));
    return true;
  }

  /**
   * Get all claims for a user
   */
  public getClaimsForUser(userId: string): PlayerClaim[] {
    const claims = this.getAllClaims();
    return claims.filter((c) => c.claimedBy === userId);
  }

  /**
   * Get all claims
   */
  private getAllClaims(): PlayerClaim[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to parse player claims:', err);
      return [];
    }
  }

  /**
   * Generate a random token
   */
  private generateRandomToken(): string {
    return `CLAIM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate a shareable claim link
   */
  public generateClaimLink(claimToken: string): string {
    const baseURL =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `${baseURL}/register?claim=${claimToken}`;
  }

  /**
   * Clear expired claims
   */
  public clearExpiredClaims(): void {
    const claims = this.getAllClaims();
    const now = new Date();
    const valid = claims.filter((c) => new Date(c.expiresAt) > now);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(valid));
  }
}

export const playerClaimService = new PlayerClaimService();
