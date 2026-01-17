import React, { useState, useCallback, useEffect } from "react";
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
    [progress?.computerRating, handleGameOver]
  );

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
