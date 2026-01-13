import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChessBoard } from "@/components/board";
import { Button } from "@/components/common";
import { createChessEngine } from "@/services/chess";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Square } from "@/types";

// Sample puzzle: White to move, fork the King and Rook with Knight
const SAMPLE_PUZZLE = {
  id: "sample-1",
  fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
  solution: ["h5f7"], // Qxf7# (Scholar's Mate)
  rating: 400,
  theme: "checkmate",
};

export default function PuzzlesScreen() {
  const [engine] = useState(() => createChessEngine(SAMPLE_PUZZLE.fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("White to move - Find the best move!");
  const [positions, setPositions] = useState(engine.getBoard());
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  const handleSquarePress = useCallback(
    (square: Square) => {
      if (solved) return;

      const piece = positions.find((p) => p.square === square);

      if (selectedSquare) {
        // Try to make a move
        const move = engine.makeMove({ from: selectedSquare, to: square });

        if (move) {
          setPositions(engine.getBoard());
          setLastMove({ from: selectedSquare, to: square });

          // Check if this is the correct solution
          const moveUci = `${move.from}${move.to}`;
          if (SAMPLE_PUZZLE.solution.includes(moveUci)) {
            setSolved(true);
            setMessage("Correct! Great job finding the checkmate!");
          } else {
            // Wrong move - undo and show message
            engine.undoMove();
            setPositions(engine.getBoard());
            setLastMove(null);
            setMessage("Not quite - try again!");
          }
        }
        setSelectedSquare(null);
      } else if (piece && piece.color === engine.turn()) {
        // Select the piece
        setSelectedSquare(square);
      }
    },
    [selectedSquare, positions, engine, solved]
  );

  const getHighlightedSquares = useCallback((): Square[] => {
    if (!selectedSquare) return [];
    return engine
      .getLegalMoves(selectedSquare)
      .map((move) => move.to as Square);
  }, [selectedSquare, engine]);

  const handleReset = () => {
    engine.loadFen(SAMPLE_PUZZLE.fen);
    setPositions(engine.getBoard());
    setSelectedSquare(null);
    setLastMove(null);
    setSolved(false);
    setMessage("White to move - Find the best move!");
  };

  const handleHint = () => {
    setMessage("Look for a move that attacks the King directly...");
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Puzzle</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>Rating: {SAMPLE_PUZZLE.rating}</Text>
          </View>
        </View>

        <View style={styles.boardContainer}>
          <ChessBoard
            positions={positions}
            selectedSquare={selectedSquare}
            highlightedSquares={getHighlightedSquares()}
            lastMove={lastMove}
            onSquarePress={handleSquarePress}
            interactive={!solved}
          />
        </View>

        <View style={[styles.messageBox, solved && styles.successBox]}>
          <Text style={[styles.messageText, solved && styles.successText]}>
            {message}
          </Text>
        </View>

        <View style={styles.actions}>
          {!solved ? (
            <>
              <Button
                title="Hint"
                onPress={handleHint}
                variant="outline"
                style={styles.actionButton}
              />
              <Button
                title="Reset"
                onPress={handleReset}
                variant="ghost"
                style={styles.actionButton}
              />
            </>
          ) : (
            <Button
              title="Next Puzzle"
              onPress={handleReset}
              fullWidth
            />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
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
    marginBottom: spacing.lg,
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
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    textAlign: "center",
  },
  successText: {
    color: colors.textInverse,
    fontWeight: fontWeight.semibold,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  actionButton: {
    marginHorizontal: spacing.sm,
    minWidth: 100,
  },
});
