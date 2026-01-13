import { puzzles } from "@/data/puzzles/puzzles";
import type { Puzzle } from "@/types";

export class PuzzleService {
  private puzzles: Puzzle[];
  private completedPuzzleIds: Set<string>;

  constructor() {
    this.puzzles = puzzles;
    this.completedPuzzleIds = new Set();
  }

  getAllPuzzles(): Puzzle[] {
    return this.puzzles;
  }

  getPuzzleById(id: string): Puzzle | undefined {
    return this.puzzles.find((p) => p.id === id);
  }

  getPuzzlesByRating(minRating: number, maxRating: number): Puzzle[] {
    return this.puzzles.filter(
      (p) => p.rating >= minRating && p.rating <= maxRating
    );
  }

  getPuzzlesByTheme(theme: string): Puzzle[] {
    return this.puzzles.filter((p) => p.themes.includes(theme));
  }

  getRandomPuzzle(maxRating?: number): Puzzle | undefined {
    let available = this.puzzles;

    if (maxRating) {
      available = available.filter((p) => p.rating <= maxRating);
    }

    if (available.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  getNextPuzzle(currentRating: number): Puzzle | undefined {
    // Find puzzles within ±100 rating of the player
    const targetMin = Math.max(400, currentRating - 100);
    const targetMax = currentRating + 100;

    const suitable = this.puzzles.filter(
      (p) =>
        p.rating >= targetMin &&
        p.rating <= targetMax &&
        !this.completedPuzzleIds.has(p.id)
    );

    if (suitable.length === 0) {
      // If no uncompleted puzzles in range, get any uncompleted puzzle
      const uncompleted = this.puzzles.filter(
        (p) => !this.completedPuzzleIds.has(p.id)
      );
      if (uncompleted.length === 0) return this.getRandomPuzzle();
      return uncompleted[Math.floor(Math.random() * uncompleted.length)];
    }

    return suitable[Math.floor(Math.random() * suitable.length)];
  }

  getDailyPuzzle(): Puzzle {
    // Use the current date to deterministically select a puzzle
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const hash = this.simpleHash(dateString);
    const index = hash % this.puzzles.length;
    return this.puzzles[index] as Puzzle;
  }

  markPuzzleCompleted(puzzleId: string): void {
    this.completedPuzzleIds.add(puzzleId);
  }

  isPuzzleCompleted(puzzleId: string): boolean {
    return this.completedPuzzleIds.has(puzzleId);
  }

  getCompletedCount(): number {
    return this.completedPuzzleIds.size;
  }

  getTotalCount(): number {
    return this.puzzles.length;
  }

  getPuzzleThemes(): string[] {
    const themes = new Set<string>();
    this.puzzles.forEach((p) => p.themes.forEach((t) => themes.add(t)));
    return Array.from(themes).sort();
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Calculate new rating based on puzzle attempt
  calculateNewRating(
    playerRating: number,
    puzzleRating: number,
    solved: boolean
  ): number {
    const K = 32; // Rating change factor
    const expectedScore =
      1 / (1 + Math.pow(10, (puzzleRating - playerRating) / 400));
    const actualScore = solved ? 1 : 0;
    const newRating = Math.round(
      playerRating + K * (actualScore - expectedScore)
    );
    return Math.max(100, newRating); // Minimum rating of 100
  }
}

// Singleton instance
let puzzleServiceInstance: PuzzleService | null = null;

export function getPuzzleService(): PuzzleService {
  if (!puzzleServiceInstance) {
    puzzleServiceInstance = new PuzzleService();
  }
  return puzzleServiceInstance;
}
