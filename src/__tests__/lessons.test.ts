import {
  allLessons,
  getLessonById,
  getLessonsByCategory,
  getBeginnerLessons,
  getTacticsLessons,
  beginnerLessons,
  tacticsLessons,
} from "../data/lessons";
import { createChessEngine } from "../services/chess";

describe("Lessons Data", () => {
  describe("allLessons", () => {
    it("should contain all lessons", () => {
      expect(allLessons.length).toBe(beginnerLessons.length + tacticsLessons.length);
    });

    it("should have unique IDs", () => {
      const ids = allLessons.map((l) => l.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have required fields for each lesson", () => {
      allLessons.forEach((lesson) => {
        expect(lesson.id).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(lesson.description).toBeDefined();
        expect(lesson.category).toBeDefined();
        expect(lesson.difficulty).toBeDefined();
        expect(lesson.steps).toBeDefined();
        expect(lesson.steps.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getLessonById", () => {
    it("should return lesson by id", () => {
      const lesson = getLessonById("piece-movement-pawn");
      expect(lesson).toBeDefined();
      expect(lesson?.id).toBe("piece-movement-pawn");
      expect(lesson?.title).toBe("The Pawn");
    });

    it("should return undefined for non-existent id", () => {
      const lesson = getLessonById("non-existent");
      expect(lesson).toBeUndefined();
    });
  });

  describe("getLessonsByCategory", () => {
    it("should return basics lessons", () => {
      const lessons = getLessonsByCategory("basics");
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((l) => expect(l.category).toBe("basics"));
    });

    it("should return tactics lessons", () => {
      const lessons = getLessonsByCategory("tactics");
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((l) => expect(l.category).toBe("tactics"));
    });
  });

  describe("getBeginnerLessons", () => {
    it("should return only beginner difficulty lessons", () => {
      const lessons = getBeginnerLessons();
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((l) => expect(l.difficulty).toBe("beginner"));
    });
  });

  describe("getTacticsLessons", () => {
    it("should return tactics category lessons", () => {
      const lessons = getTacticsLessons();
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((l) => expect(l.category).toBe("tactics"));
    });
  });

  describe("lesson step validation", () => {
    it("should have valid step types", () => {
      const validTypes = ["explanation", "demonstration", "exercise", "quiz"];
      allLessons.forEach((lesson) => {
        lesson.steps.forEach((step) => {
          expect(validTypes).toContain(step.type);
        });
      });
    });

    it("should have unique step IDs within each lesson", () => {
      allLessons.forEach((lesson) => {
        const stepIds = lesson.steps.map((s) => s.id);
        const uniqueIds = new Set(stepIds);
        expect(uniqueIds.size).toBe(stepIds.length);
      });
    });

    it("should have content for each step", () => {
      allLessons.forEach((lesson) => {
        lesson.steps.forEach((step) => {
          expect(step.content).toBeDefined();
          expect(step.content.length).toBeGreaterThan(0);
        });
      });
    });

    it("exercise steps should have correctAnswer", () => {
      allLessons.forEach((lesson) => {
        lesson.steps
          .filter((s) => s.type === "exercise")
          .forEach((step) => {
            expect(step.correctAnswer).toBeDefined();
          });
      });
    });

    it("quiz steps should have options", () => {
      allLessons.forEach((lesson) => {
        lesson.steps
          .filter((s) => s.type === "quiz")
          .forEach((step) => {
            expect(step.options).toBeDefined();
            expect(step.options!.length).toBeGreaterThanOrEqual(2);
            // Should have exactly one correct answer
            const correctOptions = step.options!.filter((o) => o.isCorrect);
            expect(correctOptions.length).toBe(1);
          });
      });
    });
  });

  describe("FEN validation", () => {
    it("should have valid FEN strings for steps with FEN", () => {
      const engine = createChessEngine();

      allLessons.forEach((lesson) => {
        lesson.steps
          .filter((s) => s.fen)
          .forEach((step) => {
            const result = engine.loadFen(step.fen!);
            expect(result).toBe(true);
          });
      });
    });
  });

  describe("beginner lessons content", () => {
    it("should cover all piece types", () => {
      const pieceNames = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"];
      pieceNames.forEach((pieceName) => {
        const hasLesson = beginnerLessons.some(
          (l) => l.title.includes(pieceName) || l.id.includes(pieceName.toLowerCase())
        );
        expect(hasLesson).toBe(true);
      });
    });

    it("should have check and checkmate lesson", () => {
      const hasCheckLesson = beginnerLessons.some(
        (l) => l.title.toLowerCase().includes("check")
      );
      expect(hasCheckLesson).toBe(true);
    });
  });

  describe("tactics lessons content", () => {
    it("should cover basic tactics", () => {
      const tactics = ["Fork", "Pin", "Skewer"];
      tactics.forEach((tactic) => {
        const hasLesson = tacticsLessons.some((l) =>
          l.title.toLowerCase().includes(tactic.toLowerCase())
        );
        expect(hasLesson).toBe(true);
      });
    });
  });
});
