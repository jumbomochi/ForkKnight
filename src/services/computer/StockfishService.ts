import { Chess } from "chess.js";
import { UciEngine } from "./engine/types";
import { MinimaxEngine } from "./engine/MinimaxEngine";
import { HINT_PROFILE, profileForRating, StrengthProfile } from "./engine/strengthProfile";
import { defaultRng, Rng } from "./engine/random";

export class StockfishService {
  private engine: UciEngine;
  private rng: Rng;
  private ready = false;

  constructor(engine?: UciEngine, rng: Rng = defaultRng) {
    this.engine = engine ?? new MinimaxEngine();
    this.rng = rng;
  }

  async initialize(): Promise<void> {
    await this.engine.initialize();
    this.ready = true;
  }

  async getBestMove(fen: string, playerRating: number): Promise<string | null> {
    if (!this.ready) throw new Error("Engine not initialized");
    const profile = profileForRating(playerRating);
    try {
      const engineMove = await this.engine.bestMove(fen, {
        movetimeMs: profile.movetimeMs,
        skill: profile.skill,
        uciElo: profile.uciElo,
        maxError: profile.maxError,
      });
      return this.maybeBlunder(fen, engineMove, profile);
    } catch {
      return this.randomLegalMove(fen);
    }
  }

  async getHintMove(fen: string): Promise<string | null> {
    if (!this.ready) throw new Error("Engine not initialized");
    try {
      return await this.engine.bestMove(fen, {
        movetimeMs: HINT_PROFILE.movetimeMs,
        uciElo: HINT_PROFILE.uciElo,
      });
    } catch {
      return null;
    }
  }

  private maybeBlunder(fen: string, engineMove: string, profile: StrengthProfile): string {
    if (profile.blunderRate === 0) return engineMove;
    if (this.rng() >= profile.blunderRate) return engineMove;
    return this.randomLegalMove(fen) ?? engineMove;
  }

  private randomLegalMove(fen: string): string | null {
    const chess = new Chess(fen);
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return null;
    const pick = moves[Math.floor(this.rng() * moves.length)]!;
    return pick.from + pick.to + (pick.promotion ?? "");
  }

  calculateNewRating(
    playerRating: number,
    opponentRating: number,
    won: boolean,
    draw: boolean,
  ): number {
    const K = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = won ? 1 : draw ? 0.5 : 0;
    return Math.round(playerRating + K * (actualScore - expectedScore));
  }

  getComputerRating(playerRating: number): number {
    return playerRating + Math.floor(this.rng() * 100) - 50;
  }

  async dispose(): Promise<void> {
    await this.engine.dispose();
    this.ready = false;
  }
}

let instance: StockfishService | null = null;

export function getStockfishService(): StockfishService {
  if (!instance) instance = new StockfishService();
  return instance;
}

/** Test-only — resets the singleton. */
export function _resetStockfishServiceForTests(): void {
  instance = null;
}
