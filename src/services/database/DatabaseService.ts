import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import type { Puzzle } from "@/types";

export class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.db = await SQLite.openDatabaseAsync("forkknight.db");

    // Create puzzles table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS puzzles (
        id TEXT PRIMARY KEY,
        fen TEXT NOT NULL,
        moves TEXT NOT NULL,
        rating INTEGER NOT NULL,
        themes TEXT NOT NULL,
        source TEXT,
        created_at INTEGER DEFAULT (unixepoch())
      );
      CREATE INDEX IF NOT EXISTS idx_puzzles_rating ON puzzles(rating);
    `);

    // Seed if empty
    const count = await this.getPuzzleCount();
    if (count === 0) {
      await this.seedPuzzles();
    }

    this.initialized = true;
  }

  private async getPuzzleCount(): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");
    const result = await this.db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM puzzles"
    );
    return result?.count ?? 0;
  }

  private async seedPuzzles(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    // Load JSON from assets
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const asset = Asset.fromModule(require("../../../assets/puzzles.json"));
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("Failed to load puzzles.json");
    }

    const jsonString = await FileSystem.readAsStringAsync(asset.localUri);
    const puzzles: Puzzle[] = JSON.parse(jsonString);

    // Batch insert in chunks of 500
    const chunkSize = 500;
    for (let i = 0; i < puzzles.length; i += chunkSize) {
      const chunk = puzzles.slice(i, i + chunkSize);
      await this.insertPuzzles(chunk);
    }

    console.log(`Seeded ${puzzles.length} puzzles`);
  }

  private async insertPuzzles(puzzles: Puzzle[]): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    for (const puzzle of puzzles) {
      await this.db.runAsync(
        "INSERT OR IGNORE INTO puzzles (id, fen, moves, rating, themes) VALUES (?, ?, ?, ?, ?)",
        puzzle.id,
        puzzle.fen,
        JSON.stringify(puzzle.moves),
        puzzle.rating,
        JSON.stringify(puzzle.themes)
      );
    }
  }

  async getAllPuzzles(): Promise<Puzzle[]> {
    if (!this.db) throw new Error("Database not initialized");
    const rows = await this.db.getAllAsync<PuzzleRow>("SELECT * FROM puzzles");
    return rows.map(this.rowToPuzzle);
  }

  async getPuzzleById(id: string): Promise<Puzzle | null> {
    if (!this.db) throw new Error("Database not initialized");
    const row = await this.db.getFirstAsync<PuzzleRow>(
      "SELECT * FROM puzzles WHERE id = ?",
      [id]
    );
    return row ? this.rowToPuzzle(row) : null;
  }

  async getPuzzlesByRating(min: number, max: number): Promise<Puzzle[]> {
    if (!this.db) throw new Error("Database not initialized");
    const rows = await this.db.getAllAsync<PuzzleRow>(
      "SELECT * FROM puzzles WHERE rating BETWEEN ? AND ?",
      [min, max]
    );
    return rows.map(this.rowToPuzzle);
  }

  async getRandomPuzzle(
    minRating: number,
    maxRating: number,
    excludeIds: string[] = []
  ): Promise<Puzzle | null> {
    if (!this.db) throw new Error("Database not initialized");

    let sql = "SELECT * FROM puzzles WHERE rating BETWEEN ? AND ?";
    const params: (string | number)[] = [minRating, maxRating];

    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => "?").join(",");
      sql += ` AND id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }

    sql += " ORDER BY RANDOM() LIMIT 1";

    const row = await this.db.getFirstAsync<PuzzleRow>(sql, params);
    return row ? this.rowToPuzzle(row) : null;
  }

  async getPuzzleByIndex(index: number): Promise<Puzzle | null> {
    if (!this.db) throw new Error("Database not initialized");
    const row = await this.db.getFirstAsync<PuzzleRow>(
      "SELECT * FROM puzzles ORDER BY id LIMIT 1 OFFSET ?",
      [index]
    );
    return row ? this.rowToPuzzle(row) : null;
  }

  async getTotalCount(): Promise<number> {
    return this.getPuzzleCount();
  }

  private rowToPuzzle(row: PuzzleRow): Puzzle {
    return {
      id: row.id,
      fen: row.fen,
      moves: JSON.parse(row.moves),
      rating: row.rating,
      themes: JSON.parse(row.themes),
    };
  }
}

interface PuzzleRow {
  id: string;
  fen: string;
  moves: string;
  rating: number;
  themes: string;
  source: string | null;
  created_at: number;
}

// Singleton
let dbInstance: DatabaseService | null = null;

export function getDatabaseService(): DatabaseService {
  if (!dbInstance) {
    dbInstance = new DatabaseService();
  }
  return dbInstance;
}
