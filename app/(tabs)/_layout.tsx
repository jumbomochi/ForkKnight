import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors } from "@/utils/theme";

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    index: "🏠",
    lessons: "📚",
    puzzles: "🧩",
    progress: "📊",
  };
  return (
    <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>
      {icons[name] || "•"}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textInverse,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
          headerTitle: "ForkKnight",
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: "Lessons",
          tabBarIcon: ({ focused }) => <TabIcon name="lessons" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="puzzles"
        options={{
          title: "Puzzles",
          tabBarIcon: ({ focused }) => <TabIcon name="puzzles" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => <TabIcon name="progress" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
