import { PuzzleService, getPuzzleService } from "../services/puzzles";

describe("PuzzleService", () => {
  let service: PuzzleService;

  beforeEach(() => {
    service = new PuzzleService();
  });

  describe("getAllPuzzles", () => {
    it("should return all puzzles", () => {
      const puzzles = service.getAllPuzzles();
      expect(puzzles.length).toBeGreaterThan(0);
    });

    it("should return puzzles with required fields", () => {
      const puzzles = service.getAllPuzzles();
      puzzles.forEach((puzzle) => {
        expect(puzzle.id).toBeDefined();
        expect(puzzle.fen).toBeDefined();
        expect(puzzle.moves).toBeDefined();
        expect(puzzle.rating).toBeDefined();
        expect(puzzle.themes).toBeDefined();
        expect(Array.isArray(puzzle.moves)).toBe(true);
        expect(Array.isArray(puzzle.themes)).toBe(true);
      });
    });
  });

  describe("getPuzzleById", () => {
    it("should return puzzle by id", () => {
      const puzzle = service.getPuzzleById("puzzle-001");
      expect(puzzle).toBeDefined();
      expect(puzzle?.id).toBe("puzzle-001");
    });

    it("should return undefined for non-existent id", () => {
      const puzzle = service.getPuzzleById("non-existent");
      expect(puzzle).toBeUndefined();
    });
  });

  describe("getPuzzlesByRating", () => {
    it("should filter puzzles by rating range", () => {
      const puzzles = service.getPuzzlesByRating(400, 500);
      puzzles.forEach((puzzle) => {
        expect(puzzle.rating).toBeGreaterThanOrEqual(400);
        expect(puzzle.rating).toBeLessThanOrEqual(500);
      });
    });

    it("should return empty array for impossible range", () => {
      const puzzles = service.getPuzzlesByRating(10000, 20000);
      expect(puzzles).toHaveLength(0);
    });
  });

  describe("getPuzzlesByTheme", () => {
    it("should filter puzzles by theme", () => {
      const puzzles = service.getPuzzlesByTheme("fork");
      expect(puzzles.length).toBeGreaterThan(0);
      puzzles.forEach((puzzle) => {
        expect(puzzle.themes).toContain("fork");
      });
    });

    it("should return empty array for non-existent theme", () => {
      const puzzles = service.getPuzzlesByTheme("nonExistentTheme");
      expect(puzzles).toHaveLength(0);
    });
  });

  describe("getRandomPuzzle", () => {
    it("should return a puzzle", () => {
      const puzzle = service.getRandomPuzzle();
      expect(puzzle).toBeDefined();
    });

    it("should respect max rating parameter", () => {
      const puzzle = service.getRandomPuzzle(500);
      if (puzzle) {
        expect(puzzle.rating).toBeLessThanOrEqual(500);
      }
    });
  });

  describe("getDailyPuzzle", () => {
    it("should return same puzzle for same day", () => {
      const puzzle1 = service.getDailyPuzzle();
      const puzzle2 = service.getDailyPuzzle();
      expect(puzzle1.id).toBe(puzzle2.id);
    });

    it("should return a valid puzzle", () => {
      const puzzle = service.getDailyPuzzle();
      expect(puzzle.id).toBeDefined();
      expect(puzzle.fen).toBeDefined();
      expect(puzzle.moves.length).toBeGreaterThan(0);
    });
  });

  describe("getCompletedCount", () => {
    it("should return count from provided array", () => {
      expect(service.getCompletedCount([])).toBe(0);
      expect(service.getCompletedCount(["puzzle-001", "puzzle-002"])).toBe(2);
    });

    it("should default to 0 with no argument", () => {
      expect(service.getCompletedCount()).toBe(0);
    });
  });

  describe("getTotalCount", () => {
    it("should return total puzzle count", () => {
      const total = service.getTotalCount();
      expect(total).toBeGreaterThan(0);
      expect(total).toBe(service.getAllPuzzles().length);
    });
  });

  describe("getPuzzleThemes", () => {
    it("should return list of unique themes", () => {
      const themes = service.getPuzzleThemes();
      expect(themes.length).toBeGreaterThan(0);
      // Check uniqueness
      const uniqueThemes = new Set(themes);
      expect(uniqueThemes.size).toBe(themes.length);
    });

    it("should return sorted themes", () => {
      const themes = service.getPuzzleThemes();
      const sortedThemes = [...themes].sort();
      expect(themes).toEqual(sortedThemes);
    });
  });

  describe("calculateNewRating", () => {
    it("should increase rating on correct answer against higher rated puzzle", () => {
      const newRating = service.calculateNewRating(600, 700, true);
      expect(newRating).toBeGreaterThan(600);
    });

    it("should decrease rating on wrong answer", () => {
      const newRating = service.calculateNewRating(600, 500, false);
      expect(newRating).toBeLessThan(600);
    });

    it("should not go below minimum rating", () => {
      const newRating = service.calculateNewRating(100, 1000, false);
      expect(newRating).toBeGreaterThanOrEqual(100);
    });
  });

  describe("getNextPuzzle", () => {
    it("should return puzzle near player rating", () => {
      const puzzle = service.getNextPuzzle(600);
      expect(puzzle).toBeDefined();
    });

    it("should return puzzle near player rating with empty completed list", () => {
      const puzzle = service.getNextPuzzle(600, []);
      expect(puzzle).toBeDefined();
    });

    it("should not return completed puzzles", () => {
      const allPuzzles = service.getAllPuzzles();
      // Mark all but one as completed
      const completedIds = allPuzzles.slice(0, -1).map((p) => p.id);
      const lastPuzzle = allPuzzles[allPuzzles.length - 1];

      const puzzle = service.getNextPuzzle(600, completedIds);
      expect(puzzle).toBeDefined();
      expect(puzzle!.id).toBe(lastPuzzle!.id);
    });
  });

  describe("singleton", () => {
    it("should return same instance", () => {
      const instance1 = getPuzzleService();
      const instance2 = getPuzzleService();
      expect(instance1).toBe(instance2);
    });
  });
});
