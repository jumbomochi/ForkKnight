import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonViewer } from "@/components/lessons";
import { getLessonById } from "@/data/lessons";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize } from "@/utils/theme";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeLesson, addXp } = useUserStore();

  const lesson = id ? getLessonById(id) : undefined;

  const handleComplete = () => {
    if (id) {
      completeLesson(id);
      addXp(25); // Award XP for completing lesson
    }
    router.back();
  };

  const handleExit = () => {
    router.back();
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <LessonViewer lesson={lesson} onComplete={handleComplete} onExit={handleExit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.textLight,
  },
});
