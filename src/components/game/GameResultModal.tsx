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
