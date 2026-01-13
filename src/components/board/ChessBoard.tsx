import React, { useState, useCallback } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
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
  interactive?: boolean;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export function ChessBoard({
  positions,
  flipped = false,
  selectedSquare,
  highlightedSquares = [],
  lastMove,
  onSquarePress,
  interactive = true,
}: ChessBoardProps) {
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - 32, 400);
  const squareSize = boardSize / 8;

  const files = flipped ? [...FILES].reverse() : FILES;
  const ranks = flipped ? [...RANKS].reverse() : RANKS;

  const getPieceAt = useCallback(
    (square: Square): Position | undefined => {
      return positions.find((p) => p.square === square);
    },
    [positions]
  );

  const isLightSquare = (fileIndex: number, rankIndex: number): boolean => {
    return (fileIndex + rankIndex) % 2 === 0;
  };

  const isHighlighted = (square: Square): boolean => {
    return highlightedSquares.includes(square);
  };

  const isLastMove = (square: Square): boolean => {
    return lastMove?.from === square || lastMove?.to === square;
  };

  const handleSquarePress = (square: Square) => {
    if (interactive && onSquarePress) {
      onSquarePress(square);
    }
  };

  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      {ranks.map((rank, rankIndex) => (
        <View key={rank} style={styles.row}>
          {files.map((file, fileIndex) => {
            const square = `${file}${rank}` as Square;
            const piece = getPieceAt(square);
            const isLight = isLightSquare(fileIndex, rankIndex);
            const isSelected = selectedSquare === square;
            const highlighted = isHighlighted(square);
            const isPartOfLastMove = isLastMove(square);

            return (
              <View
                key={square}
                style={[
                  styles.square,
                  { width: squareSize, height: squareSize },
                  isLight ? styles.lightSquare : styles.darkSquare,
                  isSelected && styles.selectedSquare,
                  highlighted && styles.highlightedSquare,
                  isPartOfLastMove && styles.lastMoveSquare,
                ]}
                onTouchEnd={() => handleSquarePress(square)}
              >
                {piece && (
                  <ChessPiece
                    type={piece.type}
                    color={piece.color}
                    size={squareSize * 0.85}
                  />
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderRadius: 4,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    backgroundColor: "rgba(0, 255, 0, 0.4)",
  },
  lastMoveSquare: {
    backgroundColor: colors.lastMove,
  },
});
