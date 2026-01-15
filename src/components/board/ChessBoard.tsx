import React, { useCallback, useMemo, memo } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { colors } from "@/utils/theme";
import type { Square, Position } from "@/types";
import { ChessPiece } from "./ChessPiece";

interface ChessBoardProps {
  positions: Position[];
  flipped?: boolean;
  selectedSquare?: Square | null;
  highlightedSquares?: Square[];
  lastMove?: { from: Square; to: Square } | null;
  onSquarePress?: (square: Square) => void;
  onPieceDrop?: (from: Square, to: Square) => void;
  interactive?: boolean;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

interface DraggablePieceProps {
  piece: Position;
  squareSize: number;
  _boardSize: number;
  files: string[];
  ranks: string[];
  onDragStart: (square: Square) => void;
  onDragEnd: (from: Square, to: Square) => void;
  onTap: (square: Square) => void;
  interactive: boolean;
  _isSelected: boolean;
}

const DraggablePiece = memo(function DraggablePiece({
  piece,
  squareSize,
  _boardSize,
  files,
  ranks,
  onDragStart,
  onDragEnd,
  onTap,
  interactive,
  _isSelected,
}: DraggablePieceProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const isDragging = useSharedValue(false);

  const getSquareFromPosition = (x: number, y: number): Square => {
    const fileIndex = Math.floor(x / squareSize);
    const rankIndex = Math.floor(y / squareSize);
    const clampedFileIndex = Math.max(0, Math.min(7, fileIndex));
    const clampedRankIndex = Math.max(0, Math.min(7, rankIndex));
    const file = files[clampedFileIndex];
    const rank = ranks[clampedRankIndex];
    return `${file}${rank}` as Square;
  };

  const handleDragStart = () => {
    onDragStart(piece.square);
  };

  const handleDragEnd = (toSquare: Square) => {
    onDragEnd(piece.square, toSquare);
  };

  const handleTap = () => {
    onTap(piece.square);
  };

  const panGesture = Gesture.Pan()
    .enabled(interactive)
    .onStart(() => {
      isDragging.value = true;
      scale.value = withSpring(1.2);
      zIndex.value = 100;
      runOnJS(handleDragStart)();
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // Calculate the current position of the piece center
      const fileIndex = files.indexOf(piece.square[0]!);
      const rankIndex = ranks.indexOf(piece.square[1]!);
      const currentX = fileIndex * squareSize + squareSize / 2 + event.translationX;
      const currentY = rankIndex * squareSize + squareSize / 2 + event.translationY;

      const toSquare = getSquareFromPosition(currentX, currentY);

      // Reset position with animation
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      zIndex.value = 1;
      isDragging.value = false;

      runOnJS(handleDragEnd)(toSquare);
    });

  const tapGesture = Gesture.Tap()
    .enabled(interactive)
    .onEnd(() => {
      runOnJS(handleTap)();
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
  }));

  // Calculate piece position on the board
  const fileIndex = files.indexOf(piece.square[0]!);
  const rankIndex = ranks.indexOf(piece.square[1]!);
  const left = fileIndex * squareSize;
  const top = rankIndex * squareSize;

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.pieceContainer,
          {
            width: squareSize,
            height: squareSize,
            left,
            top,
          },
          animatedStyle,
        ]}
      >
        <ChessPiece
          type={piece.type}
          color={piece.color}
          size={squareSize * 0.85}
        />
      </Animated.View>
    </GestureDetector>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memoization - only re-render when necessary
  return (
    prevProps.piece.square === nextProps.piece.square &&
    prevProps.piece.type === nextProps.piece.type &&
    prevProps.piece.color === nextProps.piece.color &&
    prevProps.squareSize === nextProps.squareSize &&
    prevProps.interactive === nextProps.interactive &&
    prevProps._isSelected === nextProps._isSelected
  );
});

export function ChessBoard({
  positions,
  flipped = false,
  selectedSquare,
  highlightedSquares = [],
  lastMove,
  onSquarePress,
  onPieceDrop,
  interactive = true,
}: ChessBoardProps) {
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - 32, 400);
  const squareSize = boardSize / 8;

  // Memoize flipped arrays to prevent unnecessary re-renders
  const files = useMemo(
    () => (flipped ? [...FILES].reverse() : FILES),
    [flipped]
  );
  const ranks = useMemo(
    () => (flipped ? [...RANKS].reverse() : RANKS),
    [flipped]
  );

  // Create piece lookup map for O(1) access instead of O(n) array find
  const pieceMap = useMemo(() => {
    const map = new Map<Square, Position>();
    positions.forEach((piece) => map.set(piece.square, piece));
    return map;
  }, [positions]);

  const isLightSquare = (fileIndex: number, rankIndex: number): boolean => {
    return (fileIndex + rankIndex) % 2 === 0;
  };

  const isHighlighted = (square: Square): boolean => {
    return highlightedSquares.includes(square);
  };

  const isLastMove = (square: Square): boolean => {
    return lastMove?.from === square || lastMove?.to === square;
  };

  const handleSquarePress = useCallback((square: Square) => {
    if (interactive && onSquarePress) {
      onSquarePress(square);
    }
  }, [interactive, onSquarePress]);

  const handleDragStart = useCallback((square: Square) => {
    if (interactive && onSquarePress) {
      onSquarePress(square);
    }
  }, [interactive, onSquarePress]);

  const handleDragEnd = useCallback((from: Square, to: Square) => {
    if (!interactive) return;

    if (from !== to) {
      if (onPieceDrop) {
        onPieceDrop(from, to);
      } else if (onSquarePress) {
        // Fallback: simulate click on destination square
        onSquarePress(to);
      }
    }
  }, [interactive, onPieceDrop, onSquarePress]);

  const handlePieceTap = useCallback((square: Square) => {
    if (interactive && onSquarePress) {
      onSquarePress(square);
    }
  }, [interactive, onSquarePress]);

  const getPieceAt = (square: Square): Position | undefined => {
    return pieceMap.get(square);
  };

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {/* Render squares */}
        {ranks.map((rank, rankIndex) => (
          <View key={rank} style={styles.row}>
            {files.map((file, fileIndex) => {
              const square = `${file}${rank}` as Square;
              const isLight = isLightSquare(fileIndex, rankIndex);
              const isSelected = selectedSquare === square;
              const highlighted = isHighlighted(square);
              const isPartOfLastMove = isLastMove(square);
              const piece = getPieceAt(square);

              return (
                <Pressable
                  key={square}
                  style={[
                    styles.square,
                    { width: squareSize, height: squareSize },
                    isLight ? styles.lightSquare : styles.darkSquare,
                    isSelected && styles.selectedSquare,
                    highlighted && styles.highlightedSquare,
                    isPartOfLastMove && styles.lastMoveSquare,
                  ]}
                  onPress={() => handleSquarePress(square)}
                  disabled={!interactive}
                >
                  {highlighted && !piece && (
                    <View style={styles.moveIndicator} />
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}

        {/* Render draggable pieces on top */}
        {positions.map((piece) => (
          <DraggablePiece
            key={`${piece.square}-${piece.color}-${piece.type}`}
            piece={piece}
            squareSize={squareSize}
            _boardSize={boardSize}
            files={files}
            ranks={ranks}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTap={handlePieceTap}
            interactive={interactive}
            _isSelected={selectedSquare === piece.square}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 0,
  },
  board: {
    borderRadius: 4,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    alignItems: "center",
    justifyContent: "center",
  },
  lightSquare: {
    backgroundColor: colors.boardLight,
  },
  darkSquare: {
    backgroundColor: colors.boardDark,
  },
  selectedSquare: {
    backgroundColor: colors.highlight,
  },
  highlightedSquare: {
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  lastMoveSquare: {
    backgroundColor: colors.lastMove,
  },
  moveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
  },
  pieceContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
