import { Chess } from "chess.js";
import { allLessons } from "../data/lessons";

describe("Debug FEN and Moves", () => {
  it("find invalid lesson FENs", () => {
    const issues: string[] = [];

    allLessons.forEach((lesson) => {
      lesson.steps
        .filter((s) => s.fen)
        .forEach((step) => {
          const chess = new Chess();
          try {
            chess.load(step.fen!);
          } catch (e) {
            issues.push(`LESSON ${lesson.id}/${step.id}: ${step.fen} - ${e}`);
          }
        });
    });

    if (issues.length > 0) {
      console.log("\n=== LESSON FEN ISSUES ===");
      issues.forEach((i) => console.log(i));
    }

    expect(true).toBe(true);
  });
});
