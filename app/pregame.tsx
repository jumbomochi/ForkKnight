import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DifficultyPicker } from "@/components/game";
import { Button } from "@/components/common";
import { useUserStore } from "@/stores/useUserStore";
import { getDifficultyByLevel } from "@/config/difficulty";
import { colors, spacing, fontSize, fontWeight } from "@/utils/theme";

export default function PreGameScreen() {
  const router = useRouter();
  const { progress, setDifficultyLevel } = useUserStore();
  const currentLevel = progress?.difficultyLevel ?? 1;
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);

  const handleStartGame = () => {
    if (selectedLevel !== currentLevel) {
      setDifficultyLevel(selectedLevel);
    }
    router.replace("/game");
  };

  const selectedDifficulty = getDifficultyByLevel(selectedLevel);
  const isLevelChanged = selectedLevel !== currentLevel;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Play vs Computer</Text>
        <Text style={styles.subtitle}>Choose your level</Text>

        <DifficultyPicker
          selectedLevel={selectedLevel}
          onSelect={setSelectedLevel}
        />

        {isLevelChanged && (
          <Text style={styles.warning}>
            Changing level will reset your computer rating to {selectedDifficulty.rating}
          </Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back"
          onPress={() => router.back()}
          variant="outline"
          style={styles.footerButton}
        />
        <Button
          title="Start Game"
          onPress={handleStartGame}
          style={styles.footerButton}
        />
      </View>
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
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  warning: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: "row",
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
});
