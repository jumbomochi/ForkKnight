import { Chess } from "chess.js";
import { EngineOpts, UciEngine } from "./types";

const PIECE_VALUES: Record<string, number> = {
  p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000,
};

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

const PST: Record<string, number[]> = { p: PAWN_TABLE, n: KNIGHT_TABLE, b: BISHOP_TABLE };

function getPositionBonus(piece: string, color: string, index: number): number {
  const table = PST[piece];
  if (!table) return 0;
  const i = color === "w" ? index : 63 - index;
  return table[i]!;
}

function evaluate(chess: Chess): number {
  let score = 0;
  const board = chess.board();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = board[row]![col];
      if (!sq) continue;
      const index = row * 8 + col;
      const value = PIECE_VALUES[sq.type]! + getPositionBonus(sq.type, sq.color, index);
      score += sq.color === "w" ? value : -value;
    }
  }
  return chess.turn() === "w" ? score : -score;
}

function minimax(chess: Chess, depth: number, alpha: number, beta: number): number {
  if (chess.isGameOver()) {
    if (chess.isCheckmate()) return -99999; // current player is mated
    return 0; // draw
  }
  if (depth === 0) return evaluate(chess);
  const moves = chess.moves();
  let best = -Infinity;
  for (const move of moves) {
    chess.move(move);
    const v = -minimax(chess, depth - 1, -beta, -alpha);
    chess.undo();
    best = Math.max(best, v);
    alpha = Math.max(alpha, v);
    if (alpha >= beta) break;
  }
  return best;
}

function optsToDepth(opts: EngineOpts): number {
  // Map either uciElo or skill to a search depth. The minimax tops out near
  // 1200-1400 strength regardless of input; this just picks a sensible depth.
  const elo = opts.uciElo ?? (opts.skill !== undefined ? 800 + opts.skill * 70 : 1200);
  if (elo < 900) return 1;
  if (elo < 1100) return 2;
  if (elo < 1400) return 3;
  return 4;
}

export class MinimaxEngine implements UciEngine {
  async initialize(): Promise<void> {
    // no-op
  }

  async bestMove(fen: string, opts: EngineOpts): Promise<string> {
    const chess = new Chess(fen);
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) throw new Error("MinimaxEngine: no legal moves");
    const depth = optsToDepth(opts);

    let bestMove = moves[0]!;
    let bestScore = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const score = -minimax(chess, depth - 1, -Infinity, Infinity);
      chess.undo();
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove.from + bestMove.to + (bestMove.promotion ?? "");
  }

  async dispose(): Promise<void> {
    // no-op
  }
}
