import React from "react";
import { Text, StyleSheet } from "react-native";
import type { PieceSymbol, Color } from "@/types";

interface ChessPieceProps {
  type: PieceSymbol;
  color: Color;
  size: number;
}

const PIECE_SYMBOLS: Record<Color, Record<PieceSymbol, string>> = {
  w: {
    k: "\u2654", // White King
    q: "\u2655", // White Queen
    r: "\u2656", // White Rook
    b: "\u2657", // White Bishop
    n: "\u2658", // White Knight
    p: "\u2659", // White Pawn
  },
  b: {
    k: "\u265A", // Black King
    q: "\u265B", // Black Queen
    r: "\u265C", // Black Rook
    b: "\u265D", // Black Bishop
    n: "\u265E", // Black Knight
    p: "\u265F", // Black Pawn
  },
};

export function ChessPiece({ type, color, size }: ChessPieceProps) {
  const symbol = PIECE_SYMBOLS[color][type];

  return (
    <Text style={[styles.piece, { fontSize: size }]} allowFontScaling={false}>
      {symbol}
    </Text>
  );
}

const styles = StyleSheet.create({
  piece: {
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
