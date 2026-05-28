export interface EngineOpts {
  movetimeMs: number;
  /** Stockfish Skill Level 0-20. Used for sub-1320 tiers. */
  skill?: number;
  /** Stockfish UCI_Elo target. Requires UCI_LimitStrength. Min 1320. */
  uciElo?: number;
  /** Stockfish Skill Level Maximum Error in centipawns. Optional, sub-1320 only. */
  maxError?: number;
}

/**
 * A move-producing engine in UCI long-algebraic format:
 *   "e2e4" for a normal move, "e7e8q" for promotion.
 */
export interface UciEngine {
  initialize(): Promise<void>;
  bestMove(fen: string, opts: EngineOpts): Promise<string>;
  /**
   * Interrupt any in-flight `bestMove` search without disposing the engine.
   * Optional — depth-bounded fallbacks like MinimaxEngine don't implement it.
   */
  interrupt?(): void;
  dispose(): Promise<void>;
}

/**
 * Injectable abstraction over the native expo-stockfish module.
 * Allows tests to supply a fake bridge without the native module.
 */
export interface NativeStockfishBridge {
  start(): Promise<void>;
  send(command: string): void;
  stop(): Promise<void>;
  onLine(listener: (event: { line: string }) => void): { remove: () => void };
}
