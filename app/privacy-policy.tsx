import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, fontWeight } from "@/utils/theme";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: March 23, 2026</Text>

        <Text style={styles.heading}>ForkKnight Privacy Policy</Text>

        <Text style={styles.paragraph}>
          {"ForkKnight (\"we,\" \"our,\" or \"the app\") is a chess learning application designed for children ages 5-12. We are committed to protecting the privacy of our users, especially children, and comply with the Children's Online Privacy Protection Act (COPPA)."}
        </Text>

        <Text style={styles.sectionTitle}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          ForkKnight does not collect, store, or transmit any personal
          information. All app data — including progress, puzzle ratings, and
          achievements — is stored locally on your device and is never sent to
          external servers.
        </Text>
        <Text style={styles.paragraph}>
          We do not collect names, email addresses, photos, location data, or
          any other personally identifiable information.
        </Text>

        <Text style={styles.sectionTitle}>Data Storage</Text>
        <Text style={styles.paragraph}>
          All user data is stored exclusively on your device using local storage.
          This data includes:
        </Text>
        <Text style={styles.bullet}>
          - Lesson and puzzle completion progress
        </Text>
        <Text style={styles.bullet}>- Experience points and level</Text>
        <Text style={styles.bullet}>- Puzzle and game ratings</Text>
        <Text style={styles.bullet}>- Achievement progress</Text>
        <Text style={styles.bullet}>- Daily streak information</Text>
        <Text style={styles.paragraph}>
          This data never leaves your device and can be cleared at any time by
          uninstalling the app.
        </Text>

        <Text style={styles.sectionTitle}>Third-Party Services</Text>
        <Text style={styles.paragraph}>
          ForkKnight does not use any third-party analytics, advertising, or
          tracking services. We do not display ads of any kind.
        </Text>

        <Text style={styles.sectionTitle}>Communication Features</Text>
        <Text style={styles.paragraph}>
          ForkKnight does not include any communication features. There is no
          chat, messaging, social features, or any way for users to communicate
          with each other.
        </Text>

        <Text style={styles.sectionTitle}>In-App Purchases</Text>
        <Text style={styles.paragraph}>
          ForkKnight does not include in-app purchases.
        </Text>

        <Text style={styles.sectionTitle}>Parental Controls</Text>
        <Text style={styles.paragraph}>
          A parental gate is presented when the app is first opened for users
          under 13. Parents or guardians must complete a verification step to
          allow their child to use the app.
        </Text>

        <Text style={styles.sectionTitle}>COPPA Compliance</Text>
        <Text style={styles.paragraph}>
          {"We comply with the Children's Online Privacy Protection Act (COPPA). Since we do not collect any personal information from children (or any users), no parental consent for data collection is required. The parental gate at onboarding is provided as an additional safeguard."}
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          {"We may update this privacy policy from time to time. Any changes will be reflected in the \"Last Updated\" date above and will be available within the app."}
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions or concerns about this privacy policy, please
          contact us at privacy@forkknight.com.
        </Text>
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
    paddingBottom: spacing.xxl,
  },
  lastUpdated: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  bullet: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: 24,
    paddingLeft: spacing.md,
  },
});
