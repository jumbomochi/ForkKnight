import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface AchievementProps {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

function Achievement({ name, description, icon, unlocked }: AchievementProps) {
  return (
    <View style={[styles.achievement, !unlocked && styles.achievementLocked]}>
      <Text style={styles.achievementIcon}>{icon}</Text>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementName}>{name}</Text>
        <Text style={styles.achievementDesc}>{description}</Text>
      </View>
      {unlocked && <Text style={styles.checkmark}>✓</Text>}
    </View>
  );
}

export default function ProgressScreen() {
  const progress = useUserStore((state) => state.progress);

  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const lessonsCompleted = progress?.completedLessons.length ?? 0;
  const puzzlesSolved = progress?.completedPuzzles.length ?? 0;
  const currentStreak = progress?.currentStreak ?? 0;
  const longestStreak = progress?.longestStreak ?? 0;
  const puzzleRating = progress?.puzzleRating ?? 600;

  const xpInCurrentLevel = xp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  const getLevelTitle = (lvl: number): string => {
    if (lvl < 3) return "Chess Beginner";
    if (lvl < 5) return "Chess Learner";
    if (lvl < 10) return "Chess Student";
    if (lvl < 15) return "Chess Player";
    if (lvl < 25) return "Chess Enthusiast";
    return "Chess Master";
  };

  const achievements: AchievementProps[] = [
    {
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: lessonsCompleted >= 1,
    },
    {
      name: "Puzzle Solver",
      description: "Solve 10 puzzles",
      icon: "🧩",
      unlocked: puzzlesSolved >= 10,
    },
    {
      name: "Getting Started",
      description: "Solve 5 puzzles",
      icon: "✨",
      unlocked: puzzlesSolved >= 5,
    },
    {
      name: "On Fire!",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: longestStreak >= 7,
    },
    {
      name: "Dedicated Learner",
      description: "Complete 5 lessons",
      icon: "📖",
      unlocked: lessonsCompleted >= 5,
    },
    {
      name: "Tactician",
      description: "Solve 25 tactics puzzles",
      icon: "⚔️",
      unlocked: puzzlesSolved >= 25,
    },
    {
      name: "Rising Star",
      description: "Reach puzzle rating 800",
      icon: "⭐",
      unlocked: puzzleRating >= 800,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.levelSection}>
          <View style={styles.levelCircle}>
            <Text style={styles.levelNumber}>{level}</Text>
          </View>
          <Text style={styles.levelTitle}>{getLevelTitle(level)}</Text>
          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${xpInCurrentLevel}%` }]} />
          </View>
          <Text style={styles.xpText}>
            {xpInCurrentLevel} / 100 XP ({xpToNextLevel} to Level {level + 1})
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Lessons" value={lessonsCompleted} icon="📚" />
          <StatCard label="Puzzles" value={puzzlesSolved} icon="🧩" />
          <StatCard label="Streak" value={currentStreak} icon="🔥" />
          <StatCard label="Rating" value={puzzleRating} icon="⭐" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Achievements ({achievements.filter((a) => a.unlocked).length}/
            {achievements.length})
          </Text>
          {achievements.map((achievement, index) => (
            <Achievement key={index} {...achievement} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          <View style={styles.statsDetails}>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Total XP earned</Text>
              <Text style={styles.statRowValue}>{xp}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Longest streak</Text>
              <Text style={styles.statRowValue}>{longestStreak} days</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Current streak</Text>
              <Text style={styles.statRowValue}>{currentStreak} days</Text>
            </View>
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
  },
  levelSection: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  levelCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  levelNumber: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  levelTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  xpBar: {
    width: "100%",
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: spacing.sm,
  },
  xpFill: {
    height: "100%",
    backgroundColor: colors.success,
  },
  xpText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  achievementDesc: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  checkmark: {
    fontSize: 20,
    color: colors.success,
    fontWeight: fontWeight.bold,
  },
  statsDetails: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statRowLabel: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },
  statRowValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
});
