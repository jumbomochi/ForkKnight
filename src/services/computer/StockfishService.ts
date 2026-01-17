type StockfishMessageHandler = (message: string) => void;

export class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private messageHandler: StockfishMessageHandler | null = null;
  private pendingResolve: ((move: string | null) => void) | null = null;

  async initialize(): Promise<void> {
    if (this.worker) return;

    return new Promise((resolve, reject) => {
      try {
        // Dynamic import for the stockfish worker
        // Note: In React Native, we'll use a different approach
        const stockfish = require("stockfish");
        this.worker = new stockfish();

        this.worker!.onmessage = (event: MessageEvent) => {
          const message = typeof event === "string" ? event : event.data;
          this.handleMessage(message);
        };

        // Initialize UCI protocol
        this.worker!.postMessage("uci");

        // Wait for uciok
        const timeout = setTimeout(() => {
          reject(new Error("Stockfish initialization timeout"));
        }, 5000);

        this.messageHandler = (msg: string) => {
          if (msg === "uciok") {
            clearTimeout(timeout);
            this.isReady = true;
            this.worker?.postMessage("isready");
          } else if (msg === "readyok") {
            resolve();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: string): void {
    if (this.messageHandler) {
      this.messageHandler(message);
    }

    // Parse best move response
    if (message.startsWith("bestmove")) {
      const parts = message.split(" ");
      const move = parts[1] || null;
      if (this.pendingResolve) {
        this.pendingResolve(move);
        this.pendingResolve = null;
      }
    }
  }

  /**
   * Convert player rating to Stockfish search depth
   * Lower rating = easier opponent (lower depth)
   */
  private ratingToDepth(rating: number): number {
    if (rating < 500) return 1;
    if (rating < 700) return 2;
    if (rating < 900) return 3;
    if (rating < 1100) return 4;
    if (rating < 1300) return 5;
    if (rating < 1500) return 6;
    if (rating < 1700) return 8;
    return 10;
  }

  /**
   * Get best move for the given position
   * @param fen Current board position in FEN notation
   * @param playerRating Player's current rating (determines difficulty)
   * @returns UCI move string (e.g., "e2e4") or null if no move found
   */
  async getBestMove(fen: string, playerRating: number): Promise<string | null> {
    if (!this.worker || !this.isReady) {
      throw new Error("Stockfish not initialized");
    }

    const depth = this.ratingToDepth(playerRating);

    return new Promise((resolve) => {
      this.pendingResolve = resolve;

      // Set position and search
      this.worker!.postMessage(`position fen ${fen}`);
      this.worker!.postMessage(`go depth ${depth}`);

      // Timeout fallback
      setTimeout(() => {
        if (this.pendingResolve === resolve) {
          this.pendingResolve = null;
          resolve(null);
        }
      }, 10000);
    });
  }

  /**
   * Get a hint move for the player
   * Uses higher depth for better suggestions
   */
  async getHintMove(fen: string): Promise<string | null> {
    if (!this.worker || !this.isReady) {
      throw new Error("Stockfish not initialized");
    }

    return new Promise((resolve) => {
      this.pendingResolve = resolve;

      this.worker!.postMessage(`position fen ${fen}`);
      this.worker!.postMessage("go depth 12");

      setTimeout(() => {
        if (this.pendingResolve === resolve) {
          this.pendingResolve = null;
          resolve(null);
        }
      }, 10000);
    });
  }

  /**
   * Calculate new rating using ELO formula
   */
  calculateNewRating(
    playerRating: number,
    opponentRating: number,
    won: boolean,
    draw: boolean
  ): number {
    const K = 32;
    const expectedScore =
      1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = won ? 1 : draw ? 0.5 : 0;
    return Math.round(playerRating + K * (actualScore - expectedScore));
  }

  /**
   * Get approximate rating for computer at given depth
   */
  getComputerRating(playerRating: number): number {
    // Computer plays at roughly the player's level
    // Add some variance for interest
    return playerRating + Math.floor(Math.random() * 100) - 50;
  }

  dispose(): void {
    if (this.worker) {
      this.worker.postMessage("quit");
      this.worker.terminate();
      this.worker = null;
      this.isReady = false;
    }
  }
}

// Singleton instance
let stockfishInstance: StockfishService | null = null;

export function getStockfishService(): StockfishService {
  if (!stockfishInstance) {
    stockfishInstance = new StockfishService();
  }
  return stockfishInstance;
}
