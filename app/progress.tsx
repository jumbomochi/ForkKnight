import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    </View>
  );
}

const ACHIEVEMENTS: AchievementProps[] = [
  {
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    unlocked: false,
  },
  {
    name: "Puzzle Solver",
    description: "Solve 10 puzzles",
    icon: "🧩",
    unlocked: false,
  },
  {
    name: "On Fire!",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlocked: false,
  },
  {
    name: "Knight Master",
    description: "Complete all Knight lessons",
    icon: "♞",
    unlocked: false,
  },
  {
    name: "Tactician",
    description: "Solve 100 tactics puzzles",
    icon: "⚔️",
    unlocked: false,
  },
];

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.levelSection}>
          <View style={styles.levelCircle}>
            <Text style={styles.levelNumber}>1</Text>
          </View>
          <Text style={styles.levelTitle}>Chess Beginner</Text>
          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: "0%" }]} />
          </View>
          <Text style={styles.xpText}>0 / 100 XP to Level 2</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Lessons" value={0} icon="📚" />
          <StatCard label="Puzzles" value={0} icon="🧩" />
          <StatCard label="Streak" value={0} icon="🔥" />
          <StatCard label="Rating" value={400} icon="⭐" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {ACHIEVEMENTS.map((achievement, index) => (
            <Achievement key={index} {...achievement} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.weekGrid}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[styles.dayBox, styles.dayInactive]} />
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
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
  weekGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  dayColumn: {
    alignItems: "center",
  },
  dayBox: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  dayActive: {
    backgroundColor: colors.success,
  },
  dayInactive: {
    backgroundColor: colors.border,
  },
  dayLabel: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
});
