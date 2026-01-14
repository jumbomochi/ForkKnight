import React from "react";
import { Image, StyleSheet, View } from "react-native";
import type { PieceSymbol, Color } from "@/types";

interface ChessPieceProps {
  type: PieceSymbol;
  color: Color;
  size: number;
}

// Using chess.com's Neo piece set (PNG format for cross-platform compatibility)
// Size 150px provides good quality when scaled
const getPieceUrl = (color: Color, type: PieceSymbol): string => {
  const colorCode = color === "w" ? "w" : "b";
  const pieceCode = type.toLowerCase();
  return `https://www.chess.com/chess-themes/pieces/neo/150/${colorCode}${pieceCode}.png`;
};

export function ChessPiece({ type, color, size }: ChessPieceProps) {
  const imageUrl = getPieceUrl(color, type);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.piece, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  piece: {
    // Shadow for depth effect
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
