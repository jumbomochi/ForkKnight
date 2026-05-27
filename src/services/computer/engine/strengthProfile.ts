export interface StrengthProfile {
  /** Stockfish Skill Level 0-20. Set for sub-1320 tiers. */
  skill?: number;
  /** Stockfish UCI_Elo target. Set for 1500+ tiers. */
  uciElo?: number;
  /** Stockfish Skill Level Maximum Error (centipawns). Used at Beginner only. */
  maxError?: number;
  /** Per-move thinking budget in milliseconds. */
  movetimeMs: number;
  /** Probability [0..1] of substituting a random legal move for the engine's choice. */
  blunderRate: number;
}

interface Tier {
  rating: number;
  profile: StrengthProfile;
}

const TIERS: readonly Tier[] = [
  { rating: 800,  profile: { skill: 0, maxError: 900, movetimeMs: 200, blunderRate: 0.4 } },
  { rating: 1000, profile: { skill: 3, movetimeMs: 300, blunderRate: 0.2 } },
  { rating: 1200, profile: { skill: 6, movetimeMs: 500, blunderRate: 0.08 } },
  { rating: 1500, profile: { uciElo: 1500, movetimeMs: 800, blunderRate: 0 } },
  { rating: 1900, profile: { uciElo: 1900, movetimeMs: 1200, blunderRate: 0 } },
];

/**
 * Maps an arbitrary rating to the nearest configured difficulty tier and
 * returns its engine profile. Below 800 clamps to Beginner; above 1900 clamps
 * to Advanced; values in between snap to the nearest tier rating.
 */
export function profileForRating(rating: number): StrengthProfile {
  let nearest = TIERS[0]!;
  let bestDelta = Math.abs(rating - nearest.rating);
  for (const tier of TIERS) {
    const delta = Math.abs(rating - tier.rating);
    if (delta < bestDelta) {
      bestDelta = delta;
      nearest = tier;
    }
  }
  return nearest.profile;
}

export const HINT_PROFILE: StrengthProfile = {
  uciElo: 1800,
  movetimeMs: 600,
  blunderRate: 0,
};
