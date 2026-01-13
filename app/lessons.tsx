import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { LessonCategory, Difficulty } from "@/types";

interface LessonCardProps {
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  progress: number;
  onPress: () => void;
}

function LessonCard({
  title,
  description,
  difficulty,
  progress,
  onPress,
}: LessonCardProps) {
  const difficultyColor = {
    beginner: colors.success,
    intermediate: colors.secondary,
    advanced: colors.error,
  }[difficulty];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
          <Text style={styles.difficultyText}>{difficulty}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </TouchableOpacity>
  );
}

const SAMPLE_LESSONS: LessonCardProps[] = [
  {
    title: "How the Pieces Move",
    description: "Learn how each chess piece moves across the board",
    category: "basics",
    difficulty: "beginner",
    progress: 0,
    onPress: () => {},
  },
  {
    title: "Setting Up the Board",
    description: "Place all pieces in their starting positions correctly",
    category: "basics",
    difficulty: "beginner",
    progress: 0,
    onPress: () => {},
  },
  {
    title: "Check and Checkmate",
    description: "Understanding the goal of chess - trapping the King!",
    category: "basics",
    difficulty: "beginner",
    progress: 0,
    onPress: () => {},
  },
  {
    title: "The Knight Fork",
    description: "Attack two pieces at once with your Knight",
    category: "tactics",
    difficulty: "intermediate",
    progress: 0,
    onPress: () => {},
  },
  {
    title: "Pins and Skewers",
    description: "Powerful tactics using piece alignment",
    category: "tactics",
    difficulty: "intermediate",
    progress: 0,
    onPress: () => {},
  },
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chess Lessons</Text>
          <Text style={styles.headerSubtitle}>
            Master chess step by step with fun, interactive lessons
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beginner</Text>
          {SAMPLE_LESSONS.filter((l) => l.difficulty === "beginner").map(
            (lesson, index) => (
              <LessonCard key={index} {...lesson} />
            )
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tactics</Text>
          {SAMPLE_LESSONS.filter((l) => l.category === "tactics").map(
            (lesson, index) => (
              <LessonCard key={index} {...lesson} />
            )
          )}
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
  header: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    fontWeight: fontWeight.medium,
    textTransform: "capitalize",
  },
  cardDescription: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    width: 35,
    textAlign: "right",
  },
});
