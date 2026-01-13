import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/common";
import { ChessBoard } from "@/components/board";
import { createChessEngine } from "@/services/chess";
import { colors, spacing, fontSize, fontWeight } from "@/utils/theme";

export default function HomeScreen() {
  const router = useRouter();
  const engine = createChessEngine();
  const positions = engine.getBoard();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome to ForkKnight!</Text>
          <Text style={styles.subtitle}>
            Learn chess the fun way with interactive lessons and puzzles
          </Text>
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
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Puzzles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
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
  content: {
    padding: spacing.lg,
    alignItems: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: spacing.xl,
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
