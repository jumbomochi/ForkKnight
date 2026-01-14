import { Chess } from "chess.js";
import { puzzles } from "../data/puzzles/puzzles";
import { allLessons } from "../data/lessons";

describe("Debug FEN and Moves", () => {
  it("find invalid puzzle FENs and moves", () => {
    const issues: string[] = [];

    puzzles.forEach((puzzle) => {
      const chess = new Chess();
      try {
        chess.load(puzzle.fen);
        const move = puzzle.moves[0]!;
        const from = move.slice(0, 2);
        const to = move.slice(2, 4);
        const legalMoves = chess.moves({ square: from as "a1", verbose: true });
        const isValid = legalMoves.some((m) => m.to === to);
        if (!isValid) {
          issues.push(
            `PUZZLE ${puzzle.id}: move ${move} not valid from ${from}. Legal: ${legalMoves.map((m) => m.to).join(", ")}`
          );
        }
      } catch (e) {
        issues.push(`PUZZLE ${puzzle.id}: FEN error - ${e}`);
      }
    });

    if (issues.length > 0) {
      console.log("\n=== PUZZLE ISSUES ===");
      issues.forEach((i) => console.log(i));
    }

    // This test just logs, doesn't fail
    expect(true).toBe(true);
  });

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
