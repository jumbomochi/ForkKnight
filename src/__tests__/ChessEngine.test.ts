import { ChessEngine, createChessEngine } from "../services/chess";

describe("ChessEngine", () => {
  let engine: ChessEngine;

  beforeEach(() => {
    engine = createChessEngine();
  });

  describe("initialization", () => {
    it("should create engine with starting position", () => {
      const fen = engine.getFen();
      expect(fen).toBe("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    });

    it("should create engine with custom FEN", () => {
      const customFen = "8/8/8/4k3/8/8/8/4K3 w - - 0 1";
      const customEngine = createChessEngine(customFen);
      expect(customEngine.getFen()).toBe(customFen);
    });
  });

  describe("getBoard", () => {
    it("should return all 32 pieces in starting position", () => {
      const positions = engine.getBoard();
      expect(positions).toHaveLength(32);
    });

    it("should have correct piece positions", () => {
      const positions = engine.getBoard();

      // Check white king on e1
      const whiteKing = positions.find(p => p.square === "e1");
      expect(whiteKing).toBeDefined();
      expect(whiteKing?.type).toBe("k");
      expect(whiteKing?.color).toBe("w");

      // Check black queen on d8
      const blackQueen = positions.find(p => p.square === "d8");
      expect(blackQueen).toBeDefined();
      expect(blackQueen?.type).toBe("q");
      expect(blackQueen?.color).toBe("b");
    });
  });

  describe("makeMove", () => {
    it("should make valid move e2-e4", () => {
      const move = engine.makeMove({ from: "e2", to: "e4" });
      expect(move).not.toBeNull();
      expect(move?.from).toBe("e2");
      expect(move?.to).toBe("e4");
    });

    it("should reject invalid move", () => {
      const move = engine.makeMove({ from: "e2", to: "e5" });
      expect(move).toBeNull();
    });

    it("should update turn after move", () => {
      expect(engine.turn()).toBe("w");
      engine.makeMove({ from: "e2", to: "e4" });
      expect(engine.turn()).toBe("b");
    });

    it("should accept string notation", () => {
      const move = engine.makeMove("e4");
      expect(move).not.toBeNull();
      expect(move?.to).toBe("e4");
    });
  });

  describe("undoMove", () => {
    it("should undo last move", () => {
      engine.makeMove({ from: "e2", to: "e4" });
      const undone = engine.undoMove();
      expect(undone).not.toBeNull();
      expect(engine.turn()).toBe("w");
    });

    it("should return null when no moves to undo", () => {
      const undone = engine.undoMove();
      expect(undone).toBeNull();
    });
  });

  describe("isValidMove", () => {
    it("should return true for valid pawn move", () => {
      expect(engine.isValidMove("e2", "e4")).toBe(true);
    });

    it("should return false for invalid move", () => {
      expect(engine.isValidMove("e2", "e5")).toBe(false);
    });
  });

  describe("getLegalMoves", () => {
    it("should return legal moves for a piece", () => {
      const moves = engine.getLegalMoves("e2");
      expect(moves.length).toBeGreaterThan(0);
      expect(moves.some(m => m.to === "e4")).toBe(true);
      expect(moves.some(m => m.to === "e3")).toBe(true);
    });

    it("should return all legal moves when no square specified", () => {
      const moves = engine.getLegalMoves();
      expect(moves.length).toBe(20); // 20 legal moves in starting position
    });
  });

  describe("game state", () => {
    it("should detect check", () => {
      // Fool's mate setup
      engine.loadFen("rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3");
      expect(engine.isCheck()).toBe(true);
    });

    it("should detect checkmate", () => {
      // Fool's mate position
      engine.loadFen("rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3");
      expect(engine.isCheckmate()).toBe(true);
      expect(engine.isGameOver()).toBe(true);
    });

    it("should not be game over at start", () => {
      expect(engine.isGameOver()).toBe(false);
      expect(engine.isCheckmate()).toBe(false);
      expect(engine.isStalemate()).toBe(false);
    });
  });

  describe("loadFen", () => {
    it("should load valid FEN", () => {
      const fen = "8/8/8/4k3/8/8/8/4K3 w - - 0 1";
      const result = engine.loadFen(fen);
      expect(result).toBe(true);
      expect(engine.getFen()).toBe(fen);
    });

    it("should reject invalid FEN", () => {
      const result = engine.loadFen("invalid fen string");
      expect(result).toBe(false);
    });
  });

  describe("reset", () => {
    it("should reset to starting position", () => {
      engine.makeMove({ from: "e2", to: "e4" });
      engine.reset();
      expect(engine.getFen()).toBe("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    });
  });
});
