import { Chess, type Move } from "chess.js";
import type { ChessMove, Square, Position } from "@/types";

export class ChessEngine {
  private game: Chess;

  constructor(fen?: string) {
    this.game = new Chess(fen);
  }

  getFen(): string {
    return this.game.fen();
  }

  loadFen(fen: string): boolean {
    try {
      this.game.load(fen);
      return true;
    } catch {
      return false;
    }
  }

  reset(): void {
    this.game.reset();
  }

  makeMove(move: ChessMove | string): Move | null {
    try {
      return this.game.move(move);
    } catch {
      return null;
    }
  }

  undoMove(): Move | null {
    return this.game.undo();
  }

  isValidMove(from: Square, to: Square): boolean {
    const moves = this.game.moves({ square: from, verbose: true });
    return moves.some((m) => m.to === to);
  }

  getLegalMoves(square?: Square): Move[] {
    return this.game.moves({ square, verbose: true });
  }

  isCheck(): boolean {
    return this.game.isCheck();
  }

  isCheckmate(): boolean {
    return this.game.isCheckmate();
  }

  isStalemate(): boolean {
    return this.game.isStalemate();
  }

  isDraw(): boolean {
    return this.game.isDraw();
  }

  isGameOver(): boolean {
    return this.game.isGameOver();
  }

  turn(): "w" | "b" {
    return this.game.turn();
  }

  getBoard(): Position[] {
    const positions: Position[] = [];
    const board = this.game.board();

    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank]?.[file];
        if (piece) {
          const files = "abcdefgh";
          const square = `${files[file]}${8 - rank}` as Square;
          positions.push({
            square,
            type: piece.type,
            color: piece.color,
          });
        }
      }
    }

    return positions;
  }

  getMoveHistory(): Move[] {
    return this.game.history({ verbose: true });
  }

  getPgn(): string {
    return this.game.pgn();
  }

  loadPgn(pgn: string): boolean {
    try {
      this.game.loadPgn(pgn);
      return true;
    } catch {
      return false;
    }
  }
}

export const createChessEngine = (fen?: string): ChessEngine => {
  return new ChessEngine(fen);
};
