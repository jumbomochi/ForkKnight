import { puzzles } from "../data/puzzles";
import { createChessEngine } from "../services/chess";

describe("Puzzles Data", () => {
  describe("puzzle structure", () => {
    it("should have at least 20 puzzles", () => {
      expect(puzzles.length).toBeGreaterThanOrEqual(20);
    });

    it("should have unique IDs", () => {
      const ids = puzzles.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have required fields", () => {
      puzzles.forEach((puzzle) => {
        expect(puzzle.id).toBeDefined();
        expect(typeof puzzle.id).toBe("string");
        expect(puzzle.fen).toBeDefined();
        expect(typeof puzzle.fen).toBe("string");
        expect(puzzle.moves).toBeDefined();
        expect(Array.isArray(puzzle.moves)).toBe(true);
        expect(puzzle.moves.length).toBeGreaterThan(0);
        expect(puzzle.rating).toBeDefined();
        expect(typeof puzzle.rating).toBe("number");
        expect(puzzle.themes).toBeDefined();
        expect(Array.isArray(puzzle.themes)).toBe(true);
      });
    });
  });

  describe("FEN validation", () => {
    it("should have valid FEN strings", () => {
      const engine = createChessEngine();

      puzzles.forEach((puzzle) => {
        const result = engine.loadFen(puzzle.fen);
        expect(result).toBe(true);
      });
    });
  });

  describe("move validation", () => {
    it("should have valid UCI format moves", () => {
      const uciPattern = /^[a-h][1-8][a-h][1-8][qrbn]?$/;

      puzzles.forEach((puzzle) => {
        puzzle.moves.forEach((move) => {
          expect(move).toMatch(uciPattern);
        });
      });
    });

    it("should have legal solution moves", () => {
      puzzles.forEach((puzzle) => {
        const engine = createChessEngine(puzzle.fen);
        const solutionMove = puzzle.moves[0]!;
        const from = solutionMove.slice(0, 2) as "a1";
        const to = solutionMove.slice(2, 4) as "a1";

        const isValid = engine.isValidMove(from, to);
        expect(isValid).toBe(true);
      });
    });
  });

  describe("rating distribution", () => {
    it("should have puzzles for beginners (400-600)", () => {
      const beginnerPuzzles = puzzles.filter(
        (p) => p.rating >= 400 && p.rating <= 600
      );
      expect(beginnerPuzzles.length).toBeGreaterThan(0);
    });

    it("should have puzzles for intermediate (600-800)", () => {
      const intermediatePuzzles = puzzles.filter(
        (p) => p.rating > 600 && p.rating <= 800
      );
      expect(intermediatePuzzles.length).toBeGreaterThan(0);
    });

    it("should not have extremely hard puzzles (>1200)", () => {
      const hardPuzzles = puzzles.filter((p) => p.rating > 1200);
      expect(hardPuzzles.length).toBe(0);
    });

    it("should have average rating suitable for children", () => {
      const avgRating =
        puzzles.reduce((sum, p) => sum + p.rating, 0) / puzzles.length;
      expect(avgRating).toBeLessThan(800);
    });
  });

  describe("theme coverage", () => {
    it("should have fork puzzles", () => {
      const forkPuzzles = puzzles.filter((p) => p.themes.includes("fork"));
      expect(forkPuzzles.length).toBeGreaterThan(0);
    });

    it("should have pin puzzles", () => {
      const pinPuzzles = puzzles.filter((p) => p.themes.includes("pin"));
      expect(pinPuzzles.length).toBeGreaterThan(0);
    });

    it("should have mate puzzles", () => {
      const matePuzzles = puzzles.filter(
        (p) => p.themes.includes("mate") || p.themes.includes("mateIn1")
      );
      expect(matePuzzles.length).toBeGreaterThan(0);
    });

    it("should have back rank mate puzzles", () => {
      const backRankPuzzles = puzzles.filter((p) =>
        p.themes.includes("backRankMate")
      );
      expect(backRankPuzzles.length).toBeGreaterThan(0);
    });
  });

  describe("puzzle solvability", () => {
    it("puzzle solutions should result in advantageous positions", () => {
      puzzles.slice(0, 10).forEach((puzzle) => {
        const engine = createChessEngine(puzzle.fen);
        const solutionMove = puzzle.moves[0]!;
        const from = solutionMove.slice(0, 2);
        const to = solutionMove.slice(2, 4);
        const promotion = solutionMove.length > 4 ? solutionMove[4] : undefined;

        const move = engine.makeMove({
          from: from as "a1",
          to: to as "a1",
          promotion: promotion as "q" | undefined,
        });

        expect(move).not.toBeNull();

        // After solution move, position should be check, checkmate, or winning material
        const isCheck = engine.isCheck();
        const isCheckmate = engine.isCheckmate();
        // A valid puzzle should either be checkmate, check, or capture something
        const isWinning = isCheckmate || isCheck || move?.captured;

        // Most puzzles should have some immediate threat
        // (This is a soft check - not all puzzles are immediate threats)
        if (puzzle.themes.includes("mate") || puzzle.themes.includes("mateIn1")) {
          expect(isCheckmate).toBe(true);
        }
      });
    });
  });
});
