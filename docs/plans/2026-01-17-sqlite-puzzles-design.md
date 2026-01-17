# SQLite Puzzle Storage Design

## Overview

Replace the hardcoded TypeScript puzzle array with SQLite for scalability. Puzzles are bundled as a JSON file and seeded into SQLite on first app launch.

## Goals

- Scale to 5000+ puzzles (Polgar book)
- Keep flat structure with themes/rating filtering
- Work fully offline
- Minimal impact on existing puzzle screen

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS puzzles (
  id TEXT PRIMARY KEY,
  fen TEXT NOT NULL,
  moves TEXT NOT NULL,        -- JSON array: ["e2e4", "e7e5"]
  rating INTEGER NOT NULL,
  themes TEXT NOT NULL,       -- JSON array: ["mate", "mateIn1"]
  source TEXT,                -- Optional: "polgar", "lichess", etc.
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_puzzles_rating ON puzzles(rating);
```

## File Structure

```
assets/
  puzzles.json                -- All puzzles (seeded on first launch)
src/services/database/
  DatabaseService.ts          -- SQLite wrapper, initialization
  index.ts
src/services/puzzles/
  PuzzleService.ts            -- Updated to query SQLite (async)
```

## DatabaseService

```typescript
class DatabaseService {
  private db: SQLiteDatabase | null = null;

  async initialize(): Promise<void>       // Open DB, create tables, seed if empty
  async isPuzzlesSeeded(): Promise<boolean>
  async seedPuzzles(): Promise<void>      // Load JSON, batch insert
  async query<T>(sql: string, params?: any[]): Promise<T[]>
  async run(sql: string, params?: any[]): Promise<void>
}
```

### Initialization Flow

1. Open database: `forkknight.db`
2. Create `puzzles` table if not exists
3. Check if table is empty
4. If empty, load `assets/puzzles.json` and batch insert (chunks of 500)

## Updated PuzzleService

Methods become async to support SQLite queries:

```typescript
class PuzzleService {
  async getPuzzleById(id: string): Promise<Puzzle | null>
  async getNextPuzzle(playerRating: number, completedIds: string[]): Promise<Puzzle | null>
  async getDailyPuzzle(): Promise<Puzzle>
  async getTotalCount(): Promise<number>
  calculateNewRating(...): number  // Unchanged - pure function
}
```

### Key Query

```typescript
async getNextPuzzle(playerRating: number, completedIds: string[]) {
  const sql = `
    SELECT * FROM puzzles
    WHERE rating BETWEEN ? AND ?
    AND id NOT IN (${placeholders})
    ORDER BY RANDOM()
    LIMIT 1
  `;
  return (await this.db.query(sql, params))[0] ?? null;
}
```

## JSON Format

```json
[
  {
    "id": "puzzle-001",
    "fen": "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
    "moves": ["a1a8"],
    "rating": 400,
    "themes": ["backRankMate", "mate", "mateIn1"]
  }
]
```

## Migration Path

1. Export existing 36 puzzles to `assets/puzzles.json`
2. Create DatabaseService
3. Update PuzzleService to use SQLite
4. Update puzzle screen for async methods
5. Update app initialization to init database first
6. Delete `src/data/puzzles/` directory

## Adding New Puzzles

1. Edit `assets/puzzles.json` (add new entries)
2. App detects new puzzles on launch (compare count)
3. Inserts only new puzzles

## Dependencies

- `expo-sqlite` - SQLite database
- `expo-asset` - Load bundled JSON
- `expo-file-system` - Read JSON content
