import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChessBoard } from "@/components/board";
import { Button } from "@/components/common";
import { createChessEngine, ChessEngine } from "@/services/chess";
import { getPuzzleService } from "@/services/puzzles";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Square, Puzzle } from "@/types";

export default function PuzzlesScreen() {
  const puzzleService = getPuzzleService();
  const { progress, addXp, completePuzzle } = useUserStore();

  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [engine, setEngine] = useState<ChessEngine | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [positions, setPositions] = useState<ReturnType<ChessEngine["getBoard"]>>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);

  const loadPuzzle = useCallback((puzzle: Puzzle, existingEngine: ChessEngine | null) => {
    let activeEngine: ChessEngine;

    if (existingEngine) {
      // Reuse existing engine instance
      existingEngine.loadFen(puzzle.fen);
      activeEngine = existingEngine;
    } else {
      // Create new engine only if none exists
      activeEngine = createChessEngine(puzzle.fen);
      setEngine(activeEngine);
    }

    setCurrentPuzzle(puzzle);
    setPositions(activeEngine.getBoard());
    setSelectedSquare(null);
    setLastMove(null);
    setSolved(false);
    setFailed(false);
    setHintsUsed(0);

    const turnText = activeEngine.turn() === "w" ? "White" : "Black";
    setMessage(`${turnText} to move - Find the best move!`);
  }, []);

  useEffect(() => {
    // Load daily puzzle on mount
    const dailyPuzzle = puzzleService.getDailyPuzzle();
    loadPuzzle(dailyPuzzle, null);
  }, [loadPuzzle, puzzleService]);

  const tryMove = useCallback(
    (from: Square, to: Square) => {
      if (!engine || !currentPuzzle || solved || failed) return false;

      const move = engine.makeMove({ from, to });

      if (move) {
        setPositions(engine.getBoard());
        setLastMove({ from, to });

        const moveUci = `${move.from}${move.to}`;
        if (currentPuzzle.moves.includes(moveUci)) {
          setSolved(true);
          setMessage("Correct! Well done!");
          setPuzzlesSolved((prev) => prev + 1);

          // Award XP based on hints used
          const xpReward = hintsUsed === 0 ? 15 : hintsUsed === 1 ? 10 : 5;
          addXp(xpReward);
          completePuzzle(currentPuzzle.id);
        } else {
          engine.undoMove();
          setPositions(engine.getBoard());
          setLastMove(null);
          setMessage("Not quite right - try again!");
        }
        return true;
      }
      return false;
    },
    [engine, currentPuzzle, solved, failed, hintsUsed, addXp, completePuzzle, puzzleService]
  );

  const handleSquarePress = useCallback(
    (square: Square) => {
      if (!engine || !currentPuzzle || solved || failed) return;

      const piece = positions.find((p) => p.square === square);

      if (selectedSquare) {
        tryMove(selectedSquare, square);
        setSelectedSquare(null);
      } else if (piece && piece.color === engine.turn()) {
        setSelectedSquare(square);
      }
    },
    [selectedSquare, positions, engine, currentPuzzle, solved, failed, tryMove]
  );

  const handlePieceDrop = useCallback(
    (from: Square, to: Square) => {
      if (!engine || solved || failed) return;

      // Verify the piece being moved is the correct color
      const piece = positions.find((p) => p.square === from);
      if (!piece || piece.color !== engine.turn()) return;

      tryMove(from, to);
      setSelectedSquare(null);
    },
    [engine, positions, solved, failed, tryMove]
  );

  const getHighlightedSquares = useCallback((): Square[] => {
    if (!selectedSquare || !engine) return [];
    return engine.getLegalMoves(selectedSquare).map((move) => move.to as Square);
  }, [selectedSquare, engine]);

  const handleHint = () => {
    if (!currentPuzzle) return;

    const hints = [
      "Look at all the pieces your opponent has undefended...",
      "Consider moves that create multiple threats at once...",
      `The solution starts with moving to ${currentPuzzle.moves[0]?.slice(2, 4)}`,
    ];

    const hintText = hints[Math.min(hintsUsed, hints.length - 1)];
    setMessage(hintText ?? "Think about the tactics you've learned!");
    setHintsUsed((prev) => prev + 1);
  };

  const handleReset = () => {
    if (!currentPuzzle || !engine) return;
    engine.loadFen(currentPuzzle.fen);
    setPositions(engine.getBoard());
    setSelectedSquare(null);
    setLastMove(null);
    setSolved(false);
    setFailed(false);

    const turnText = engine.turn() === "w" ? "White" : "Black";
    setMessage(`${turnText} to move - Find the best move!`);
  };

  const handleNextPuzzle = () => {
    const playerRating = progress?.puzzleRating ?? 600;
    const completedPuzzles = progress?.completedPuzzles ?? [];
    const nextPuzzle = puzzleService.getNextPuzzle(playerRating, completedPuzzles);
    if (nextPuzzle) {
      loadPuzzle(nextPuzzle, engine);
    }
  };

  const handleSkip = () => {
    handleNextPuzzle();
  };

  if (!currentPuzzle || !engine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading puzzle...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Puzzle Training</Text>
            <Text style={styles.subtitle}>
              Solved today: {puzzlesSolved} | Total:{" "}
              {progress?.completedPuzzles?.length ?? 0}/{puzzleService.getTotalCount()}
            </Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>Rating: {currentPuzzle.rating}</Text>
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
            interactive={!solved && !failed}
            flipped={engine.turn() === "b"}
          />
        </View>

        <View style={styles.themeContainer}>
          <Text style={styles.themeLabel}>Theme: </Text>
          {currentPuzzle.themes.slice(0, 3).map((theme, index) => (
            <View key={theme} style={styles.themeBadge}>
              <Text style={styles.themeText}>
                {theme.replace(/([A-Z])/g, " $1").trim()}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.messageBox,
            solved && styles.successBox,
            failed && styles.errorBox,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              (solved || failed) && styles.messageTextInverse,
            ]}
          >
            {message}
          </Text>
        </View>

        <View style={styles.actions}>
          {solved ? (
            <Button title="Next Puzzle" onPress={handleNextPuzzle} fullWidth />
          ) : (
            <>
              <Button
                title={`Hint${hintsUsed > 0 ? ` (${hintsUsed})` : ""}`}
                onPress={handleHint}
                variant="outline"
                style={styles.actionButton}
                disabled={hintsUsed >= 3}
              />
              <Button
                title="Reset"
                onPress={handleReset}
                variant="ghost"
                style={styles.actionButton}
              />
              <Button
                title="Skip"
                onPress={handleSkip}
                variant="ghost"
                style={styles.actionButton}
              />
            </>
          )}
        </View>
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
    alignItems: "flex-start",
    width: "100%",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
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
  themeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  themeLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  themeBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
    marginBottom: spacing.xs,
  },
  themeText: {
    fontSize: fontSize.xs,
    color: colors.text,
    textTransform: "capitalize",
  },
  messageBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    width: "100%",
    marginBottom: spacing.lg,
  },
  successBox: {
    backgroundColor: colors.success,
  },
  errorBox: {
    backgroundColor: colors.error,
  },
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    textAlign: "center",
  },
  messageTextInverse: {
    color: colors.textInverse,
    fontWeight: fontWeight.semibold,
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
