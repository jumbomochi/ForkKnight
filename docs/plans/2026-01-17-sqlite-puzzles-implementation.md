# SQLite Puzzle Storage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate puzzles from hardcoded TypeScript array to SQLite database seeded from JSON.

**Architecture:** DatabaseService wraps expo-sqlite, initializes on app launch, seeds puzzles from bundled JSON if empty. PuzzleService becomes async and queries SQLite instead of in-memory array.

**Tech Stack:** expo-sqlite, expo-asset, expo-file-system

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install expo-sqlite**

Run:
```bash
npx expo install expo-sqlite
```

**Step 2: Verify installation**

Run:
```bash
npm ls expo-sqlite
```
Expected: `expo-sqlite@x.x.x` in output

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add expo-sqlite dependency"
```

---

## Task 2: Export Puzzles to JSON

**Files:**
- Create: `assets/puzzles.json`

**Step 1: Create the JSON file**

Create `assets/puzzles.json` with all 36 existing puzzles:

```json
[
  {
    "id": "puzzle-001",
    "fen": "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
    "moves": ["a1a8"],
    "rating": 400,
    "themes": ["backRankMate", "mate", "mateIn1", "short"]
  },
  ... (all puzzles from puzzles.ts)
]
```

Note: Use a script or manually convert the TypeScript array to JSON format. The `moves` and `themes` fields are already arrays.

**Step 2: Verify JSON is valid**

Run:
```bash
node -e "require('./assets/puzzles.json')"
```
Expected: No error

**Step 3: Commit**

```bash
git add assets/puzzles.json
git commit -m "feat: add puzzles.json for SQLite seeding"
```

---

## Task 3: Create DatabaseService

**Files:**
- Create: `src/services/database/DatabaseService.ts`
- Create: `src/services/database/index.ts`

**Step 1: Create index.ts**

Create `src/services/database/index.ts`:

```typescript
export * from "./DatabaseService";
```

**Step 2: Create DatabaseService.ts**

Create `src/services/database/DatabaseService.ts`:

```typescript
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
    const asset = Asset.fromModule(require("@/../assets/puzzles.json"));
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

    const statement = await this.db.prepareAsync(
      "INSERT OR IGNORE INTO puzzles (id, fen, moves, rating, themes) VALUES (?, ?, ?, ?, ?)"
    );

    try {
      for (const puzzle of puzzles) {
        await statement.executeAsync([
          puzzle.id,
          puzzle.fen,
          JSON.stringify(puzzle.moves),
          puzzle.rating,
          JSON.stringify(puzzle.themes),
        ]);
      }
    } finally {
      await statement.finalizeAsync();
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
```

**Step 3: Commit**

```bash
git add src/services/database/
git commit -m "feat: add DatabaseService for SQLite puzzle storage"
```

---

## Task 4: Update PuzzleService to Use SQLite

**Files:**
- Modify: `src/services/puzzles/PuzzleService.ts`

**Step 1: Rewrite PuzzleService**

Replace the entire contents of `src/services/puzzles/PuzzleService.ts`:

```typescript
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
```

**Step 2: Commit**

```bash
git add src/services/puzzles/PuzzleService.ts
git commit -m "feat: update PuzzleService to use SQLite"
```

---

## Task 5: Update App Initialization

**Files:**
- Modify: `src/hooks/useAppInitialization.ts`

**Step 1: Add database initialization**

Replace the contents of `src/hooks/useAppInitialization.ts`:

```typescript
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { getDatabaseService } from "@/services/database";

export function useAppInitialization() {
  const { initialize, isInitialized: userInitialized, isLoading, updateStreak } = useUserStore();
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // 1. Initialize database first (creates tables, seeds puzzles)
      await getDatabaseService().initialize();
      setDbInitialized(true);

      // 2. Initialize user store
      await initialize();

      // 3. Update streak on app open
      updateStreak();
    };

    initApp();
  }, [initialize, updateStreak]);

  const isInitialized = dbInitialized && userInitialized;

  return { isInitialized, isLoading };
}
```

**Step 2: Commit**

```bash
git add src/hooks/useAppInitialization.ts
git commit -m "feat: initialize database on app launch"
```

---

## Task 6: Update Puzzle Screen for Async

**Files:**
- Modify: `app/(tabs)/puzzles.tsx`

**Step 1: Update loadPuzzle to handle async**

The puzzle screen uses `puzzleService.getDailyPuzzle()` and `puzzleService.getNextPuzzle()` which are now async.

Find and update the `useEffect` that loads the daily puzzle (around line 58-62):

```typescript
useEffect(() => {
  // Load daily puzzle on mount
  const loadDaily = async () => {
    const dailyPuzzle = await puzzleService.getDailyPuzzle();
    if (dailyPuzzle) {
      loadPuzzle(dailyPuzzle, null);
    }
  };
  loadDaily();
}, [loadPuzzle, puzzleService]);
```

**Step 2: Update handleNextPuzzle**

Find `handleNextPuzzle` (around line 248-255) and make it async:

```typescript
const handleNextPuzzle = useCallback(async () => {
  const playerRating = progress?.puzzleRating ?? 600;
  const completedPuzzles = progress?.completedPuzzles ?? [];
  const nextPuzzle = await puzzleService.getNextPuzzle(playerRating, completedPuzzles);
  if (nextPuzzle) {
    loadPuzzle(nextPuzzle, engine);
  }
}, [progress?.puzzleRating, progress?.completedPuzzles, puzzleService, loadPuzzle, engine]);
```

**Step 3: Update getTotalCount usage**

Find where `puzzleService.getTotalCount()` is used (around line 283) and make it async.

Add state for total count:

```typescript
const [totalPuzzleCount, setTotalPuzzleCount] = useState(0);

useEffect(() => {
  puzzleService.getTotalCount().then(setTotalPuzzleCount);
}, [puzzleService]);
```

Then use `totalPuzzleCount` instead of `puzzleService.getTotalCount()` in the JSX.

**Step 4: Commit**

```bash
git add app/\(tabs\)/puzzles.tsx
git commit -m "feat: update puzzle screen for async SQLite queries"
```

---

## Task 7: Clean Up Old Data Files

**Files:**
- Delete: `src/data/puzzles/puzzles.ts`
- Delete: `src/data/puzzles/index.ts`
- Delete: `src/data/puzzles/` directory

**Step 1: Remove the old puzzle data directory**

Run:
```bash
rm -rf src/data/puzzles
```

**Step 2: Remove the data directory if empty**

Run:
```bash
rmdir src/data 2>/dev/null || true
```

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove hardcoded puzzle data (now in SQLite)"
```

---

## Task 8: Test the Migration

**Step 1: Clear app data (fresh start)**

On simulator/device, uninstall the app or clear its data to test fresh seeding.

**Step 2: Start the development server**

Run:
```bash
npm start
```

**Step 3: Manual testing checklist**

- [ ] App launches without errors
- [ ] First launch seeds puzzles (check console for "Seeded X puzzles")
- [ ] Puzzle screen loads daily puzzle
- [ ] Solving a puzzle works
- [ ] "Next Puzzle" loads another puzzle
- [ ] Skip/Reset work correctly
- [ ] Second app launch doesn't re-seed (fast startup)

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete SQLite puzzle migration"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Install expo-sqlite |
| 2 | Export puzzles to JSON |
| 3 | Create DatabaseService |
| 4 | Update PuzzleService (async) |
| 5 | Update app initialization |
| 6 | Update puzzle screen for async |
| 7 | Delete old puzzle files |
| 8 | Test the migration |
