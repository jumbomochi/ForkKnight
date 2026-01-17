import { getDatabaseService, DatabaseService } from "@/services/database";
import type { Puzzle } from "@/types";

export class PuzzleService {
  private db: DatabaseService;

  constructor() {
    this.db = getDatabaseService();
  }

  async getPuzzleById(id: string): Promise<Puzzle | null> {
    return this.db.getPuzzleById(id);
  }

  async getPuzzlesByRating(minRating: number, maxRating: number): Promise<Puzzle[]> {
    return this.db.getPuzzlesByRating(minRating, maxRating);
  }

  async getNextPuzzle(
    currentRating: number,
    completedPuzzleIds: string[] = []
  ): Promise<Puzzle | null> {
    // Find puzzles within ±100 rating of the player
    const targetMin = Math.max(400, currentRating - 100);
    const targetMax = currentRating + 100;

    // Try to get puzzle in rating range
    let puzzle = await this.db.getRandomPuzzle(targetMin, targetMax, completedPuzzleIds);

    if (!puzzle) {
      // Fallback: get any uncompleted puzzle
      puzzle = await this.db.getRandomPuzzle(0, 9999, completedPuzzleIds);
    }

    if (!puzzle) {
      // All completed: get any random puzzle
      puzzle = await this.db.getRandomPuzzle(0, 9999, []);
    }

    return puzzle;
  }

  async getDailyPuzzle(): Promise<Puzzle | null> {
    // Use the current date to deterministically select a puzzle
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]!;
    const hash = this.simpleHash(dateString);
    const totalCount = await this.db.getTotalCount();
    const index = hash % totalCount;
    return this.db.getPuzzleByIndex(index);
  }

  async getTotalCount(): Promise<number> {
    return this.db.getTotalCount();
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

  // Calculate new rating based on puzzle attempt (pure function - unchanged)
  calculateNewRating(
    playerRating: number,
    puzzleRating: number,
    solved: boolean
  ): number {
    const K = 32;
    const expectedScore =
      1 / (1 + Math.pow(10, (puzzleRating - playerRating) / 400));
    const actualScore = solved ? 1 : 0;
    const newRating = Math.round(
      playerRating + K * (actualScore - expectedScore)
    );
    return Math.max(100, newRating);
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
