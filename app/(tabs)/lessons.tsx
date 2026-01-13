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
import { allLessons } from "@/data/lessons";
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

export default function LessonsScreen() {
  const router = useRouter();
  const progress = useUserStore((state) => state.progress);

  const beginnerLessons = allLessons.filter((l) => l.difficulty === "beginner");
  const tacticsLessons = allLessons.filter((l) => l.category === "tactics");

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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Beginner</Text>
            <Text style={styles.sectionSubtitle}>Learn how each piece moves</Text>
          </View>
          {beginnerLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={isLessonCompleted(lesson.id)}
              onPress={() => handleLessonPress(lesson.id)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tactics</Text>
            <Text style={styles.sectionSubtitle}>Winning combinations and tricks</Text>
          </View>
          {tacticsLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={isLessonCompleted(lesson.id)}
              onPress={() => handleLessonPress(lesson.id)}
            />
          ))}
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
