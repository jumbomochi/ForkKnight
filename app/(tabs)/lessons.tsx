import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  beginnerLessons,
  tacticsLessons,
  openingsLessons,
  strategyLessons,
  endgameLessons,
  famousGamesLessons,
} from "@/data/lessons";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Lesson, Difficulty } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  completed: boolean;
  onPress: () => void;
}

function LessonCard({ lesson, completed, onPress }: LessonCardProps) {
  const difficultyColor: Record<Difficulty, string> = {
    beginner: colors.success,
    intermediate: colors.secondary,
    advanced: colors.error,
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{lesson.title}</Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColor[lesson.difficulty] },
          ]}
        >
          <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{lesson.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.stepCount}>{lesson.steps.length} steps</Text>
        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const sections = [
  {
    title: "Beginner",
    subtitle: "Learn how each piece moves",
    lessons: beginnerLessons,
  },
  {
    title: "Tactics",
    subtitle: "Winning combinations and tricks",
    lessons: tacticsLessons,
  },
  {
    title: "Openings",
    subtitle: "Start your games with confidence",
    lessons: openingsLessons,
  },
  {
    title: "Strategy",
    subtitle: "Think like a chess player",
    lessons: strategyLessons,
  },
  {
    title: "Endgames",
    subtitle: "Finish the game like a pro",
    lessons: endgameLessons,
  },
  {
    title: "Famous Games",
    subtitle: "Learn from the greatest games ever played",
    lessons: famousGamesLessons,
  },
];

export default function LessonsScreen() {
  const router = useRouter();
  const progress = useUserStore((state) => state.progress);

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress?.completedLessons.includes(lessonId) ?? false;
  };

  const handleLessonPress = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chess Lessons</Text>
          <Text style={styles.headerSubtitle}>
            Master chess step by step with fun, interactive lessons
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            {section.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={isLessonCompleted(lesson.id)}
                onPress={() => handleLessonPress(lesson.id)}
              />
            ))}
          </View>
        ))}
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
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
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
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepCount: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  completedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    fontWeight: fontWeight.medium,
  },
});
