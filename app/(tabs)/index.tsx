import React from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/common";
import { ChessBoard } from "@/components/board";
import { createChessEngine } from "@/services/chess";
import { useUserStore } from "@/stores/useUserStore";
import { useAppInitialization } from "@/hooks";
import { colors, spacing, fontSize, fontWeight } from "@/utils/theme";

export default function HomeScreen() {
  const router = useRouter();
  const engine = createChessEngine();
  const positions = engine.getBoard();

  const { isInitialized, isLoading } = useAppInitialization();
  const progress = useUserStore((state) => state.progress);

  if (isLoading || !isInitialized) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const lessonsCompleted = progress?.completedLessons.length ?? 0;
  const puzzlesSolved = progress?.completedPuzzles.length ?? 0;
  const currentStreak = progress?.currentStreak ?? 0;
  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  // Calculate XP remaining to next level (always 1-100, never negative)
  const xpToNextLevel = 100 - (xp % 100) || 100;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome to ForkKnight!</Text>
          <Text style={styles.subtitle}>
            Learn chess the fun way with interactive lessons and puzzles
          </Text>
        </View>

        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {level}</Text>
          <View style={styles.xpBar}>
            <View
              style={[
                styles.xpFill,
                { width: `${Math.min(100, ((xp % 100) / 100) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.xpText}>{xpToNextLevel} XP to next level</Text>
        </View>

        <View style={styles.boardPreview}>
          <ChessBoard positions={positions} interactive={false} />
        </View>

        <View style={styles.actions}>
          <Button
            title="Start Learning"
            onPress={() => router.push("/lessons")}
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
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textLight,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  levelBadge: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    width: "100%",
    marginBottom: spacing.lg,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  xpBar: {
    width: "100%",
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    backgroundColor: colors.success,
  },
  xpText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
  boardPreview: {
    marginBottom: spacing.xl,
  },
  actions: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  spacer: {
    height: spacing.md,
  },
  quickStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
});
