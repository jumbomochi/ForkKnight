import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DIFFICULTY_LEVELS } from "@/config/difficulty";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";

interface DifficultyPickerProps {
  selectedLevel: number;
  onSelect: (level: number) => void;
}

export function DifficultyPicker({ selectedLevel, onSelect }: DifficultyPickerProps) {
  return (
    <View style={styles.container}>
      {DIFFICULTY_LEVELS.map((diff) => {
        const isSelected = diff.level === selectedLevel;
        return (
          <TouchableOpacity
            key={diff.level}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelect(diff.level)}
            activeOpacity={0.7}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${diff.label}, rating ${diff.rating}`}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {diff.label}
              </Text>
              <Text style={[styles.rating, isSelected && styles.ratingSelected]}>
                {diff.rating}
              </Text>
            </View>
            <Text style={[styles.description, isSelected && styles.descriptionSelected]}>
              {diff.description}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: "#EBF3FB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  labelSelected: {
    color: colors.primary,
  },
  rating: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textLight,
  },
  ratingSelected: {
    color: colors.primary,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  descriptionSelected: {
    color: colors.text,
  },
});
