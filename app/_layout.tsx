import { Stack } from "expo-router";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "@/utils/theme";
import { ErrorBoundary } from "@/components/common";
import { useAppInitialization } from "@/hooks/useAppInitialization";
import { useUserStore } from "@/stores/useUserStore";

export default function RootLayout() {
  const { isInitialized } = useAppInitialization();
  const hasCompletedOnboarding = useUserStore((s) => s.hasCompletedOnboarding);

  if (!isInitialized) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return (
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" />
        </Stack>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.textInverse,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            title: "Privacy Policy",
          }}
        />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} redirect />
      </Stack>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
