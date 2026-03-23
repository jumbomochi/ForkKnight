import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";

type Step = "welcome" | "age" | "parent-consent" | "ready";

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>("welcome");
  const [age, setAge] = useState("");
  const [parentCode, setParentCode] = useState("");
  const [error, setError] = useState("");

  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  const handleAgeSubmit = () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 99) {
      setError("Please enter a valid age");
      return;
    }
    setError("");
    if (ageNum < 13) {
      setStep("parent-consent");
    } else {
      setStep("ready");
    }
  };

  const handleParentConsent = () => {
    // Simple math problem as a basic parental gate
    // (Apple recommends a parental gate for Kids apps)
    if (parentCode !== "17") {
      setError("That's not quite right. Ask a parent or guardian for help!");
      return;
    }
    setError("");
    setStep("ready");
  };

  const handleComplete = async () => {
    await completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {step === "welcome" && (
            <View style={styles.stepContainer}>
              <Text style={styles.knight}>♞</Text>
              <Text style={styles.title}>Welcome to ForkKnight!</Text>
              <Text style={styles.subtitle}>
                Learn chess, solve puzzles, and become a chess champion!
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setStep("age")}
                accessibilityRole="button"
                accessibilityLabel="Get started"
              >
                <Text style={styles.primaryButtonText}>{"Let's Go!"}</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === "age" && (
            <View style={styles.stepContainer}>
              <Text style={styles.emoji}>🎂</Text>
              <Text style={styles.title}>How old are you?</Text>
              <Text style={styles.subtitle}>
                We need this to give you the best experience
              </Text>
              <TextInput
                style={styles.ageInput}
                keyboardType="number-pad"
                maxLength={2}
                value={age}
                onChangeText={(text) => {
                  setAge(text);
                  setError("");
                }}
                placeholder="Your age"
                placeholderTextColor={colors.textLight}
                accessibilityLabel="Enter your age"
                autoFocus
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity
                style={[styles.primaryButton, !age && styles.buttonDisabled]}
                onPress={handleAgeSubmit}
                disabled={!age}
                accessibilityRole="button"
                accessibilityLabel="Continue"
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === "parent-consent" && (
            <View style={styles.stepContainer}>
              <Text style={styles.emoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.title}>Parent or Guardian</Text>
              <Text style={styles.subtitle}>
                Please ask a parent or guardian to help with this step.
              </Text>
              <View style={styles.parentBox}>
                <Text style={styles.parentTitle}>For Parents</Text>
                <Text style={styles.parentText}>
                  ForkKnight is a chess learning app for children. We do not
                  collect personal information, require no account creation, and
                  all data is stored locally on this device.
                </Text>
                <Text style={styles.parentText}>
                  By continuing, you consent to your child using this app in
                  accordance with our privacy policy.
                </Text>
                <Text style={styles.mathPrompt}>
                  To confirm, please solve: 9 + 8 = ?
                </Text>
                <TextInput
                  style={styles.ageInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  value={parentCode}
                  onChangeText={(text) => {
                    setParentCode(text);
                    setError("");
                  }}
                  placeholder="Answer"
                  placeholderTextColor={colors.textLight}
                  accessibilityLabel="Enter the answer to the math problem"
                />
              </View>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  !parentCode && styles.buttonDisabled,
                ]}
                onPress={handleParentConsent}
                disabled={!parentCode}
                accessibilityRole="button"
                accessibilityLabel="Confirm parental consent"
              >
                <Text style={styles.primaryButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === "ready" && (
            <View style={styles.stepContainer}>
              <Text style={styles.knight}>♞</Text>
              <Text style={styles.title}>{"You're all set!"}</Text>
              <Text style={styles.subtitle}>
                Time to start your chess adventure. Complete lessons, solve
                puzzles, and earn achievements!
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleComplete}
                accessibilityRole="button"
                accessibilityLabel="Start playing"
              >
                <Text style={styles.primaryButtonText}>Start Playing!</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.xl,
  },
  stepContainer: {
    alignItems: "center",
  },
  knight: {
    fontSize: 80,
    marginBottom: spacing.lg,
    color: colors.primary,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 26,
    paddingHorizontal: spacing.md,
  },
  ageInput: {
    width: 160,
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.xl,
    minWidth: 200,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.textInverse,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  error: {
    color: colors.error,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  parentBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  parentTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  parentText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  mathPrompt: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
});
