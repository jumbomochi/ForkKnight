import { Chess } from "chess.js";

// Piece values for position evaluation
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-square tables for positional scoring (from white's perspective)
const PAWN_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const KNIGHT_TABLE = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];

const BISHOP_TABLE = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 0, 5, 5, 5, 5, 0, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20,
];

const PST: Record<string, number[]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
};

function getPositionBonus(piece: string, color: string, index: number): number {
  const table = PST[piece];
  if (!table) return 0;
  // Mirror table for black
  const i = color === "w" ? index : 63 - index;
  return table[i];
}

function evaluate(chess: Chess): number {
  let score = 0;
  const board = chess.board();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = board[row][col];
      if (!sq) continue;
      const index = row * 8 + col;
      const value = PIECE_VALUES[sq.type] + getPositionBonus(sq.type, sq.color, index);
      score += sq.color === "w" ? value : -value;
    }
  }

  return chess.turn() === "w" ? score : -score;
}

function minimax(chess: Chess, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  if (depth === 0) return evaluate(chess);

  if (chess.isGameOver()) {
    if (chess.isCheckmate()) return maximizing ? -99999 : 99999;
    return 0; // draw
  }

  const moves = chess.moves();

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const eval_ = minimax(chess, depth - 1, alpha, beta, false);
      chess.undo();
      maxEval = Math.max(maxEval, eval_);
      alpha = Math.max(alpha, eval_);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const eval_ = minimax(chess, depth - 1, alpha, beta, true);
      chess.undo();
      minEval = Math.min(minEval, eval_);
      beta = Math.min(beta, eval_);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export class StockfishService {
  private ready = false;

  async initialize(): Promise<void> {
    this.ready = true;
  }

  private ratingToDepth(rating: number): number {
    if (rating < 500) return 1;
    if (rating < 700) return 2;
    if (rating < 1000) return 3;
    return 4;
  }

  async getBestMove(fen: string, playerRating: number): Promise<string | null> {
    if (!this.ready) throw new Error("Engine not initialized");

    const chess = new Chess(fen);
    const depth = this.ratingToDepth(playerRating);
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return null;

    // At depth 1, add randomness for easier play
    if (depth === 1) {
      // 40% chance of random move for very easy opponents
      if (Math.random() < 0.4) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        return randomMove.from + randomMove.to + (randomMove.promotion ?? "");
      }
    }

    let bestMove = moves[0];
    let bestScore = -Infinity;

    for (const move of moves) {
      chess.move(move);
      const score = -minimax(chess, depth - 1, -Infinity, Infinity, false);
      chess.undo();

      // Add slight randomness to make play less robotic
      const jitter = Math.random() * 20 - 10;
      if (score + jitter > bestScore) {
        bestScore = score + jitter;
        bestMove = move;
      }
    }

    return bestMove.from + bestMove.to + (bestMove.promotion ?? "");
  }

  async getHintMove(fen: string): Promise<string | null> {
    if (!this.ready) throw new Error("Engine not initialized");

    const chess = new Chess(fen);
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return null;

    let bestMove = moves[0];
    let bestScore = -Infinity;

    // Use higher depth for hints
    for (const move of moves) {
      chess.move(move);
      const score = -minimax(chess, 3, -Infinity, Infinity, false);
      chess.undo();

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove.from + bestMove.to + (bestMove.promotion ?? "");
  }

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

  getComputerRating(playerRating: number): number {
    return playerRating + Math.floor(Math.random() * 100) - 50;
  }

  dispose(): void {
    this.ready = false;
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
