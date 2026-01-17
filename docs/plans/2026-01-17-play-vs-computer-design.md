# Play vs Computer Feature Design

## Overview

Add a "Play vs Computer" game mode accessible from the Home screen, allowing children to play full games against an adaptive AI opponent.

## User Flow

1. Child taps "Play vs Computer" button on Home screen
2. Game screen opens with board set up (color alternates each game)
3. Child makes moves; computer responds after brief delay
4. During play: undo, hint, and resign buttons available
5. Game ends via checkmate, stalemate, or resignation
6. Result modal shows outcome with encouraging message + XP reward
7. "Play Again" returns to step 2 (color flips), "Done" returns to Home

## Adaptive Difficulty

- New players start at rating ~400 (beginner level)
- Computer strength matches player rating via Stockfish search depth (1-10)
- Win → rating increases → computer gets harder
- Lose → rating decreases → computer gets easier
- Same ELO calculation used for puzzles (K-factor 32)
- Rating floor at 200 to prevent discouragement

## Technical Architecture

### New Files

```
src/services/computer/
  StockfishService.ts    - Wrapper for Stockfish.js engine

app/
  game.tsx               - Play vs Computer screen

src/components/game/
  GameResultModal.tsx    - Win/loss/draw modal with XP
```

### StockfishService

- Uses Stockfish.js lite single-threaded version (~7MB)
- Converts rating to search depth:
  - Rating 400 → depth 1
  - Rating 800 → depth 3
  - Rating 1200 → depth 5
  - Rating 1600 → depth 8
- Accepts FEN position, returns best move in UCI format
- Adds slight randomness at low depths for beatable play
- Handles cleanup on unmount

### game.tsx Screen

- Reuses existing ChessBoard component
- Reuses existing ChessEngine service for move validation
- Similar structure to puzzles.tsx
- Calls StockfishService for computer moves after player moves

### GameResultModal

- Similar to puzzle success modal
- Shows: result, rating change, XP earned, encouraging message
- Buttons: "Play Again", "Done"

### UserStore Additions

New fields in progress object:
- `computerRating: number` (starts at 400)
- `gamesPlayed: number`
- `gamesWon: number`
- `lastPlayedColor: 'w' | 'b'`

New method:
- `recordGameResult(won: boolean, draw: boolean)`

## Game Screen UI

```
┌─────────────────────────────┐
│  ← Back          Rating: 450│
├─────────────────────────────┤
│                             │
│      [Computer's pieces]    │
│                             │
│   ┌───────────────────┐     │
│   │                   │     │
│   │    Chess Board    │     │
│   │                   │     │
│   └───────────────────┘     │
│                             │
│      [Player's pieces]      │
│                             │
├─────────────────────────────┤
│  [Undo]   [Hint]   [Resign] │
└─────────────────────────────┘
```

### Controls

- **Undo** - Undoes player's last move AND computer's response. Disabled if no moves made.
- **Hint** - Asks Stockfish for a good move, highlights suggested piece and destination. Uses hint counter (3 hints, then unlimited but reduced XP).
- **Resign** - Shows confirmation, then ends game as loss.

### Feedback

- 500-1000ms delay before computer moves
- Turn indicator: "Your turn" or "Computer thinking..."
- Optional pulsing animation during computer's turn

## Rewards

### XP Awards

| Result | XP |
|--------|-----|
| Win (no hints) | 20 |
| Win (1-2 hints) | 15 |
| Win (3+ hints) | 10 |
| Draw | 5 |
| Loss | 0 |

### Result Messages

| Result | Message |
|--------|---------|
| Win (checkmate) | "Checkmate! You won! Amazing job!" |
| Win (resignation) | "The computer resigned. You were too good!" |
| Draw (stalemate) | "It's a draw! A hard-fought battle!" |
| Draw (repetition) | "Draw by repetition. Neither side could win!" |
| Loss | "The computer won this time. Keep practicing - you're getting better!" |

### Streak Integration

- Wins count toward daily activity
- Playing any game counts for streak maintenance

## Dependencies

- `stockfish` npm package (lite single-threaded version)
