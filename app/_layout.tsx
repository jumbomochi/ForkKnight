import { Stack } from "expo-router";
import { colors } from "@/utils/theme";
import { ErrorBoundary } from "@/components/common";

export default function RootLayout() {
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
      </Stack>
    </ErrorBoundary>
  );
}
