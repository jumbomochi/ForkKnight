import { UciEngine } from "./engine/types";
import { MinimaxEngine } from "./engine/MinimaxEngine";
import { HINT_PROFILE, profileForRating } from "./engine/strengthProfile";

export class StockfishService {
  private engine: UciEngine;
  private ready = false;

  constructor(engine?: UciEngine) {
    this.engine = engine ?? new MinimaxEngine();
  }

  async initialize(): Promise<void> {
    await this.engine.initialize();
    this.ready = true;
  }

  async getBestMove(fen: string, playerRating: number): Promise<string | null> {
    if (!this.ready) throw new Error("Engine not initialized");
    const profile = profileForRating(playerRating);
    try {
      return await this.engine.bestMove(fen, {
        movetimeMs: profile.movetimeMs,
        skill: profile.skill,
        uciElo: profile.uciElo,
        maxError: profile.maxError,
      });
    } catch {
      return null;
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
    return playerRating + Math.floor(Math.random() * 100) - 50;
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
