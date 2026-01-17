# Play vs Computer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Play vs Computer" game mode with adaptive difficulty using Stockfish.js

**Architecture:** Stockfish.js (lite single-threaded) runs in a web worker, wrapped by StockfishService. The game screen reuses ChessBoard/ChessEngine patterns from puzzles.tsx. User progress tracks computer game stats separately from puzzle rating.

**Tech Stack:** stockfish npm package, React Native, Zustand, chess.js

---

## Task 1: Install Stockfish Package

**Files:**
- Modify: `package.json`

**Step 1: Install the stockfish npm package**

Run:
```bash
npm install stockfish
```

**Step 2: Verify installation**

Run:
```bash
npm ls stockfish
```
Expected: `stockfish@17.x.x` in output

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add stockfish chess engine dependency"
```

---

## Task 2: Add Computer Game Fields to Types

**Files:**
- Modify: `src/types/user.ts:8-19`

**Step 1: Update UserProgress interface**

Add four new fields to the UserProgress interface after `puzzleRating`:

```typescript
export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  puzzleRating: number;
  computerRating: number;        // Add this
  gamesPlayed: number;           // Add this
  gamesWon: number;              // Add this
  lastPlayedColor: "w" | "b";    // Add this
  completedLessons: string[];
  completedPuzzles: string[];
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  lastActiveAt: Date;
}
```

**Step 2: Commit**

```bash
git add src/types/user.ts
git commit -m "feat: add computer game tracking fields to UserProgress"
```

---

## Task 3: Update StorageService Default Progress

**Files:**
- Modify: `src/services/storage/StorageService.ts:17-28`

**Step 1: Add default values for new fields**

Update DEFAULT_PROGRESS to include the new fields:

```typescript
const DEFAULT_PROGRESS: UserProgress = {
  userId: "local-user",
  xp: 0,
  level: 1,
  puzzleRating: 600,
  computerRating: 400,           // Add this - beginner level
  gamesPlayed: 0,                // Add this
  gamesWon: 0,                   // Add this
  lastPlayedColor: "b",          // Add this - so first game is white
  completedLessons: [],
  completedPuzzles: [],
  achievements: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveAt: new Date(),
};
```

**Step 2: Commit**

```bash
git add src/services/storage/StorageService.ts
git commit -m "feat: add default values for computer game progress"
```

---

## Task 4: Add Store Methods for Computer Games

**Files:**
- Modify: `src/stores/useUserStore.ts`

**Step 1: Add interface methods**

Add to UserState interface (around line 17):

```typescript
interface UserState {
  // ... existing fields ...
  updateComputerRating: (newRating: number) => void;
  recordGameResult: (won: boolean, draw: boolean) => void;
  getNextPlayerColor: () => "w" | "b";
}
```

**Step 2: Implement updateComputerRating**

Add after `updatePuzzleRating` method (around line 112):

```typescript
updateComputerRating: (newRating) => {
  const state = get();
  if (!state.progress) return;

  // Floor at 200 to prevent discouragement
  const clampedRating = Math.max(200, newRating);

  const newProgress = {
    ...state.progress,
    computerRating: clampedRating,
  };

  set({ progress: newProgress });
  saveProgress(newProgress);
},
```

**Step 3: Implement recordGameResult**

Add after `updateComputerRating`:

```typescript
recordGameResult: (won, draw) => {
  const state = get();
  if (!state.progress) return;

  const newProgress = {
    ...state.progress,
    gamesPlayed: state.progress.gamesPlayed + 1,
    gamesWon: won ? state.progress.gamesWon + 1 : state.progress.gamesWon,
    lastPlayedColor: state.progress.lastPlayedColor === "w" ? "b" : "w",
  };

  set({ progress: newProgress });
  saveProgress(newProgress);
},
```

**Step 4: Implement getNextPlayerColor**

Add after `recordGameResult`:

```typescript
getNextPlayerColor: () => {
  const state = get();
  // Alternate: if last was black, next is white
  return state.progress?.lastPlayedColor === "b" ? "w" : "b";
},
```

**Step 5: Commit**

```bash
git add src/stores/useUserStore.ts
git commit -m "feat: add store methods for computer game tracking"
```

---

## Task 5: Create StockfishService

**Files:**
- Create: `src/services/computer/StockfishService.ts`
- Create: `src/services/computer/index.ts`

**Step 1: Create the service directory and index**

Create `src/services/computer/index.ts`:

```typescript
export * from "./StockfishService";
```

**Step 2: Create StockfishService**

Create `src/services/computer/StockfishService.ts`:

```typescript
type StockfishMessageHandler = (message: string) => void;

export class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private messageHandler: StockfishMessageHandler | null = null;
  private pendingResolve: ((move: string | null) => void) | null = null;

  async initialize(): Promise<void> {
    if (this.worker) return;

    return new Promise((resolve, reject) => {
      try {
        // Dynamic import for the stockfish worker
        // Note: In React Native, we'll use a different approach
        const stockfish = require("stockfish");
        this.worker = new stockfish();

        this.worker.onmessage = (event: MessageEvent) => {
          const message = typeof event === "string" ? event : event.data;
          this.handleMessage(message);
        };

        // Initialize UCI protocol
        this.worker.postMessage("uci");

        // Wait for uciok
        const timeout = setTimeout(() => {
          reject(new Error("Stockfish initialization timeout"));
        }, 5000);

        this.messageHandler = (msg: string) => {
          if (msg === "uciok") {
            clearTimeout(timeout);
            this.isReady = true;
            this.worker?.postMessage("isready");
          } else if (msg === "readyok") {
            resolve();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: string): void {
    if (this.messageHandler) {
      this.messageHandler(message);
    }

    // Parse best move response
    if (message.startsWith("bestmove")) {
      const parts = message.split(" ");
      const move = parts[1] || null;
      if (this.pendingResolve) {
        this.pendingResolve(move);
        this.pendingResolve = null;
      }
    }
  }

  /**
   * Convert player rating to Stockfish search depth
   * Lower rating = easier opponent (lower depth)
   */
  private ratingToDepth(rating: number): number {
    if (rating < 500) return 1;
    if (rating < 700) return 2;
    if (rating < 900) return 3;
    if (rating < 1100) return 4;
    if (rating < 1300) return 5;
    if (rating < 1500) return 6;
    if (rating < 1700) return 8;
    return 10;
  }

  /**
   * Get best move for the given position
   * @param fen Current board position in FEN notation
   * @param playerRating Player's current rating (determines difficulty)
   * @returns UCI move string (e.g., "e2e4") or null if no move found
   */
  async getBestMove(fen: string, playerRating: number): Promise<string | null> {
    if (!this.worker || !this.isReady) {
      throw new Error("Stockfish not initialized");
    }

    const depth = this.ratingToDepth(playerRating);

    return new Promise((resolve) => {
      this.pendingResolve = resolve;

      // Set position and search
      this.worker!.postMessage(`position fen ${fen}`);
      this.worker!.postMessage(`go depth ${depth}`);

      // Timeout fallback
      setTimeout(() => {
        if (this.pendingResolve === resolve) {
          this.pendingResolve = null;
          resolve(null);
        }
      }, 10000);
    });
  }

  /**
   * Get a hint move for the player
   * Uses higher depth for better suggestions
   */
  async getHintMove(fen: string): Promise<string | null> {
    if (!this.worker || !this.isReady) {
      throw new Error("Stockfish not initialized");
    }

    return new Promise((resolve) => {
      this.pendingResolve = resolve;

      this.worker!.postMessage(`position fen ${fen}`);
      this.worker!.postMessage("go depth 12");

      setTimeout(() => {
        if (this.pendingResolve === resolve) {
          this.pendingResolve = null;
          resolve(null);
        }
      }, 10000);
    });
  }

  /**
   * Calculate new rating using ELO formula
   */
  calculateNewRating(
    playerRating: number,
    opponentRating: number,
    won: boolean,
    draw: boolean
  ): number {
    const K = 32;
    const expectedScore =
      1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = won ? 1 : draw ? 0.5 : 0;
    return Math.round(playerRating + K * (actualScore - expectedScore));
  }

  /**
   * Get approximate rating for computer at given depth
   */
  getComputerRating(playerRating: number): number {
    // Computer plays at roughly the player's level
    // Add some variance for interest
    return playerRating + Math.floor(Math.random() * 100) - 50;
  }

  dispose(): void {
    if (this.worker) {
      this.worker.postMessage("quit");
      this.worker.terminate();
      this.worker = null;
      this.isReady = false;
    }
  }
}

// Singleton instance
let stockfishInstance: StockfishService | null = null;

export function getStockfishService(): StockfishService {
  if (!stockfishInstance) {
    stockfishInstance = new StockfishService();
  }
  return stockfishInstance;
}
```

**Step 3: Commit**

```bash
git add src/services/computer/
git commit -m "feat: add StockfishService for computer opponent"
```

---

## Task 6: Create GameResultModal Component

**Files:**
- Create: `src/components/game/GameResultModal.tsx`
- Create: `src/components/game/index.ts`

**Step 1: Create index file**

Create `src/components/game/index.ts`:

```typescript
export * from "./GameResultModal";
```

**Step 2: Create GameResultModal component**

Create `src/components/game/GameResultModal.tsx`:

```typescript
import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";

export type GameResult = "win" | "loss" | "draw";

interface GameResultModalProps {
  visible: boolean;
  result: GameResult;
  xpEarned: number;
  ratingChange: number;
  onPlayAgain: () => void;
  onDone: () => void;
}

const RESULT_CONFIG = {
  win: {
    title: "You Won!",
    emoji: "🎉",
    color: colors.success,
    messages: [
      "Checkmate! Amazing job!",
      "The computer resigned. You were too good!",
      "Victory! Your chess skills are growing!",
    ],
  },
  loss: {
    title: "Game Over",
    emoji: "💪",
    color: colors.primary,
    messages: [
      "The computer won this time. Keep practicing - you're getting better!",
      "Don't give up! Every game teaches you something new.",
      "Good effort! Try again and show that computer who's boss!",
    ],
  },
  draw: {
    title: "It's a Draw!",
    emoji: "🤝",
    color: colors.secondary,
    messages: [
      "A hard-fought battle! Neither side could win.",
      "Draw! You held your ground against the computer.",
      "Stalemate! That was a close game.",
    ],
  },
};

export function GameResultModal({
  visible,
  result,
  xpEarned,
  ratingChange,
  onPlayAgain,
  onDone,
}: GameResultModalProps) {
  const config = RESULT_CONFIG[result];
  const message = config.messages[Math.floor(Math.random() * config.messages.length)];
  const ratingText = ratingChange >= 0 ? `+${ratingChange}` : `${ratingChange}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDone}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: config.color }]}>{config.title}</Text>
          <Text style={styles.emoji}>{config.emoji}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.statsRow}>
            {xpEarned > 0 && (
              <View style={[styles.statBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.statText}>+{xpEarned} XP</Text>
              </View>
            )}
            <View style={[styles.statBadge, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statText, { color: ratingChange >= 0 ? colors.success : colors.error }]}>
                {ratingText} Rating
              </Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, { backgroundColor: config.color }]}
              onPress={onPlayAgain}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              onPress={onDone}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSize.md,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  statText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  buttons: {
    width: "100%",
    gap: spacing.sm,
  },
  button: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    width: "100%",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
    textAlign: "center",
  },
});
```

**Step 3: Commit**

```bash
git add src/components/game/
git commit -m "feat: add GameResultModal component"
```

---

## Task 7: Create Game Screen

**Files:**
- Create: `app/game.tsx`

**Step 1: Create the game screen**

Create `app/game.tsx`:

```typescript
import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChessBoard } from "@/components/board";
import { Button } from "@/components/common";
import { GameResultModal, GameResult } from "@/components/game";
import { createChessEngine, ChessEngine } from "@/services/chess";
import { getStockfishService, StockfishService } from "@/services/computer";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Square, PieceSymbol } from "@/types";

export default function GameScreen() {
  const router = useRouter();
  const {
    progress,
    addXp,
    updateComputerRating,
    recordGameResult,
    getNextPlayerColor,
    updateStreak,
  } = useUserStore();

  const [engine, setEngine] = useState<ChessEngine | null>(null);
  const [stockfish, setStockfish] = useState<StockfishService | null>(null);
  const [positions, setPositions] = useState<ReturnType<ChessEngine["getBoard"]>>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>("draw");
  const [showResultModal, setShowResultModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [ratingChange, setRatingChange] = useState(0);
  const [message, setMessage] = useState("Your turn");

  const isPlayerTurn = useCallback(() => {
    return engine?.turn() === playerColor;
  }, [engine, playerColor]);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      const newEngine = createChessEngine();
      setEngine(newEngine);
      setPositions(newEngine.getBoard());

      const color = getNextPlayerColor();
      setPlayerColor(color);

      const sf = getStockfishService();
      try {
        await sf.initialize();
        setStockfish(sf);

        // If computer plays first (player is black), make computer move
        if (color === "b") {
          setIsComputerThinking(true);
          setMessage("Computer thinking...");
          setTimeout(() => makeComputerMove(newEngine, sf), 500);
        } else {
          setMessage("Your turn - White to move");
        }
      } catch (error) {
        console.error("Failed to initialize Stockfish:", error);
        Alert.alert("Error", "Failed to start computer opponent. Please try again.");
        router.back();
      }
    };

    initGame();

    return () => {
      // Cleanup handled by singleton
    };
  }, []);

  const makeComputerMove = useCallback(
    async (eng: ChessEngine, sf: StockfishService) => {
      if (!eng || !sf) return;

      const rating = progress?.computerRating ?? 400;
      const move = await sf.getBestMove(eng.getFen(), rating);

      if (move && move.length >= 4) {
        const from = move.slice(0, 2) as Square;
        const to = move.slice(2, 4) as Square;
        const promotion = move.length > 4 ? (move[4] as PieceSymbol) : undefined;

        const result = eng.makeMove({ from, to, promotion });
        if (result) {
          setPositions(eng.getBoard());
          setLastMove({ from, to });
        }
      }

      setIsComputerThinking(false);

      // Check for game over after computer move
      if (eng.isGameOver()) {
        handleGameOver(eng);
      } else {
        setMessage("Your turn");
      }
    },
    [progress?.computerRating]
  );

  const handleGameOver = useCallback(
    (eng: ChessEngine) => {
      setGameOver(true);

      let result: GameResult;
      let won: boolean;
      let draw: boolean;

      if (eng.isCheckmate()) {
        // Whoever's turn it is lost (they're in checkmate)
        won = eng.turn() !== playerColor;
        draw = false;
        result = won ? "win" : "loss";
      } else {
        // Draw (stalemate, repetition, etc.)
        won = false;
        draw = true;
        result = "draw";
      }

      setGameResult(result);

      // Calculate rewards
      let xp = 0;
      if (won) {
        xp = hintsUsed === 0 ? 20 : hintsUsed <= 2 ? 15 : 10;
      } else if (draw) {
        xp = 5;
      }
      setXpEarned(xp);
      if (xp > 0) addXp(xp);

      // Update rating
      const playerRating = progress?.computerRating ?? 400;
      const computerRating = stockfish?.getComputerRating(playerRating) ?? playerRating;
      const newRating = stockfish?.calculateNewRating(playerRating, computerRating, won, draw) ?? playerRating;
      const change = newRating - playerRating;
      setRatingChange(change);
      updateComputerRating(newRating);

      // Record game result
      recordGameResult(won, draw);
      updateStreak();

      // Show modal
      setTimeout(() => setShowResultModal(true), 300);
    },
    [playerColor, hintsUsed, progress?.computerRating, stockfish, addXp, updateComputerRating, recordGameResult, updateStreak]
  );

  const tryMove = useCallback(
    (from: Square, to: Square) => {
      if (!engine || !stockfish || gameOver || isComputerThinking) return false;
      if (!isPlayerTurn()) return false;

      const move = engine.makeMove({ from, to });

      if (move) {
        setPositions(engine.getBoard());
        setLastMove({ from, to });

        // Check for game over after player move
        if (engine.isGameOver()) {
          handleGameOver(engine);
        } else {
          // Computer's turn
          setIsComputerThinking(true);
          setMessage("Computer thinking...");
          setTimeout(() => makeComputerMove(engine, stockfish), 500 + Math.random() * 500);
        }
        return true;
      }
      return false;
    },
    [engine, stockfish, gameOver, isComputerThinking, isPlayerTurn, handleGameOver, makeComputerMove]
  );

  const handleSquarePress = useCallback(
    (square: Square) => {
      if (!engine || gameOver || isComputerThinking || !isPlayerTurn()) return;

      const piece = positions.find((p) => p.square === square);

      if (selectedSquare) {
        tryMove(selectedSquare, square);
        setSelectedSquare(null);
      } else if (piece && piece.color === playerColor) {
        setSelectedSquare(square);
      }
    },
    [selectedSquare, positions, engine, gameOver, isComputerThinking, isPlayerTurn, playerColor, tryMove]
  );

  const handlePieceDrop = useCallback(
    (from: Square, to: Square) => {
      if (!engine || gameOver || isComputerThinking || !isPlayerTurn()) return;

      const piece = positions.find((p) => p.square === from);
      if (!piece || piece.color !== playerColor) return;

      tryMove(from, to);
      setSelectedSquare(null);
    },
    [engine, positions, gameOver, isComputerThinking, isPlayerTurn, playerColor, tryMove]
  );

  const getHighlightedSquares = useCallback((): Square[] => {
    if (!selectedSquare || !engine) return [];
    return engine.getLegalMoves(selectedSquare).map((move) => move.to as Square);
  }, [selectedSquare, engine]);

  const handleUndo = useCallback(() => {
    if (!engine || gameOver || isComputerThinking) return;

    // Undo player's move and computer's response
    engine.undoMove(); // Undo computer move
    engine.undoMove(); // Undo player move
    setPositions(engine.getBoard());
    setLastMove(null);
    setSelectedSquare(null);
    setMessage("Your turn");
  }, [engine, gameOver, isComputerThinking]);

  const handleHint = useCallback(async () => {
    if (!engine || !stockfish || gameOver || isComputerThinking || !isPlayerTurn()) return;

    const hintMove = await stockfish.getHintMove(engine.getFen());
    if (hintMove && hintMove.length >= 4) {
      const from = hintMove.slice(0, 2) as Square;
      const to = hintMove.slice(2, 4) as Square;
      setSelectedSquare(from);
      setMessage(`Try moving to ${to}`);
      setHintsUsed((prev) => prev + 1);
    }
  }, [engine, stockfish, gameOver, isComputerThinking, isPlayerTurn]);

  const handleResign = useCallback(() => {
    Alert.alert("Resign?", "Are you sure you want to resign?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Resign",
        style: "destructive",
        onPress: () => {
          setGameOver(true);
          setGameResult("loss");
          setXpEarned(0);

          const playerRating = progress?.computerRating ?? 400;
          const computerRating = stockfish?.getComputerRating(playerRating) ?? playerRating;
          const newRating = stockfish?.calculateNewRating(playerRating, computerRating, false, false) ?? playerRating;
          setRatingChange(newRating - playerRating);
          updateComputerRating(newRating);
          recordGameResult(false, false);

          setTimeout(() => setShowResultModal(true), 300);
        },
      },
    ]);
  }, [progress?.computerRating, stockfish, updateComputerRating, recordGameResult]);

  const handlePlayAgain = useCallback(() => {
    setShowResultModal(false);

    // Reset state
    const newEngine = createChessEngine();
    setEngine(newEngine);
    setPositions(newEngine.getBoard());
    setSelectedSquare(null);
    setLastMove(null);
    setGameOver(false);
    setHintsUsed(0);

    const color = getNextPlayerColor();
    setPlayerColor(color);

    if (color === "b" && stockfish) {
      setIsComputerThinking(true);
      setMessage("Computer thinking...");
      setTimeout(() => makeComputerMove(newEngine, stockfish), 500);
    } else {
      setMessage("Your turn - White to move");
    }
  }, [stockfish, getNextPlayerColor, makeComputerMove]);

  const handleDone = useCallback(() => {
    setShowResultModal(false);
    router.back();
  }, [router]);

  const handleBack = useCallback(() => {
    if (!gameOver) {
      Alert.alert("Quit Game?", "Your progress will be lost.", [
        { text: "Cancel", style: "cancel" },
        { text: "Quit", style: "destructive", onPress: () => router.back() },
      ]);
    } else {
      router.back();
    }
  }, [gameOver, router]);

  if (!engine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Starting game...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const canUndo = engine.getMoveHistory().length >= 2 && !gameOver && !isComputerThinking;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Button title="← Back" variant="ghost" onPress={handleBack} />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>
              Rating: {progress?.computerRating ?? 400}
            </Text>
          </View>
        </View>

        <View style={styles.boardContainer}>
          <ChessBoard
            positions={positions}
            selectedSquare={selectedSquare}
            highlightedSquares={getHighlightedSquares()}
            lastMove={lastMove}
            onSquarePress={handleSquarePress}
            onPieceDrop={handlePieceDrop}
            interactive={!gameOver && !isComputerThinking && isPlayerTurn()}
            flipped={playerColor === "b"}
          />
        </View>

        <View
          style={[
            styles.messageBox,
            isComputerThinking && styles.thinkingBox,
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Undo"
            onPress={handleUndo}
            variant="outline"
            style={styles.actionButton}
            disabled={!canUndo}
          />
          <Button
            title={`Hint${hintsUsed > 0 ? ` (${hintsUsed})` : ""}`}
            onPress={handleHint}
            variant="outline"
            style={styles.actionButton}
            disabled={gameOver || isComputerThinking || !isPlayerTurn()}
          />
          <Button
            title="Resign"
            onPress={handleResign}
            variant="ghost"
            style={styles.actionButton}
            disabled={gameOver}
          />
        </View>

        <GameResultModal
          visible={showResultModal}
          result={gameResult}
          xpEarned={xpEarned}
          ratingChange={ratingChange}
          onPlayAgain={handlePlayAgain}
          onDone={handleDone}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: fontSize.lg,
    color: colors.textLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.lg,
  },
  ratingBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  ratingText: {
    color: colors.textInverse,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
  },
  boardContainer: {
    marginBottom: spacing.md,
  },
  messageBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    width: "100%",
    marginBottom: spacing.lg,
  },
  thinkingBox: {
    backgroundColor: colors.secondary,
  },
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  actionButton: {
    marginHorizontal: spacing.xs,
    minWidth: 80,
  },
});
```

**Step 2: Commit**

```bash
git add app/game.tsx
git commit -m "feat: add Play vs Computer game screen"
```

---

## Task 8: Add Play Button to Home Screen

**Files:**
- Modify: `app/(tabs)/index.tsx`

**Step 1: Add Play vs Computer button**

In the `actions` View (around line 66-81), add a new button between "Start Learning" and "Daily Puzzle":

```typescript
<View style={styles.actions}>
  <Button
    title="Start Learning"
    onPress={() => router.push("/lessons")}
    size="large"
    fullWidth
  />
  <View style={styles.spacer} />
  <Button
    title="Play vs Computer"
    onPress={() => router.push("/game")}
    variant="outline"
    size="large"
    fullWidth
  />
  <View style={styles.spacer} />
  <Button
    title="Daily Puzzle"
    onPress={() => router.push("/puzzles")}
    variant="secondary"
    size="large"
    fullWidth
  />
</View>
```

**Step 2: Add Games Won to quick stats**

Update the quickStats section (around line 83-96) to include games won:

```typescript
const gamesWon = progress?.gamesWon ?? 0;
```

Add this line after `currentStreak` definition, then update the quickStats View:

```typescript
<View style={styles.quickStats}>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{lessonsCompleted}</Text>
    <Text style={styles.statLabel}>Lessons</Text>
  </View>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{puzzlesSolved}</Text>
    <Text style={styles.statLabel}>Puzzles</Text>
  </View>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{gamesWon}</Text>
    <Text style={styles.statLabel}>Games Won</Text>
  </View>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{currentStreak}</Text>
    <Text style={styles.statLabel}>Day Streak</Text>
  </View>
</View>
```

**Step 3: Update statCard style for 4 columns**

The current statCard uses `flex: 1` which will work, but update it to handle 4 cards nicely:

```typescript
statCard: {
  flex: 1,
  backgroundColor: colors.surface,
  padding: spacing.sm,  // Changed from spacing.md for tighter fit
  borderRadius: 12,
  alignItems: "center",
  marginHorizontal: 2,  // Changed from spacing.xs for tighter fit
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
```

**Step 4: Commit**

```bash
git add app/\(tabs\)/index.tsx
git commit -m "feat: add Play vs Computer button and Games Won stat to home screen"
```

---

## Task 9: Test the Feature

**Step 1: Start the development server**

Run:
```bash
npm start
```

**Step 2: Manual testing checklist**

- [ ] Home screen shows "Play vs Computer" button
- [ ] Home screen shows "Games Won" stat
- [ ] Tapping "Play vs Computer" opens game screen
- [ ] Player starts as white on first game
- [ ] Making a move triggers computer response
- [ ] Undo removes both player and computer moves
- [ ] Hint highlights a suggested move
- [ ] Resign shows confirmation and ends game
- [ ] Checkmate shows result modal
- [ ] XP is awarded on win
- [ ] Rating changes after game
- [ ] "Play Again" starts new game with opposite color
- [ ] "Done" returns to home screen

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Play vs Computer feature implementation"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Install stockfish package |
| 2 | Add UserProgress fields |
| 3 | Update StorageService defaults |
| 4 | Add store methods |
| 5 | Create StockfishService |
| 6 | Create GameResultModal |
| 7 | Create game screen |
| 8 | Add Home screen button |
| 9 | Manual testing |
