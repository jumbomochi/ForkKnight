import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { getDatabaseService } from "@/services/database";

export function useAppInitialization() {
  const { initialize, isInitialized: userInitialized, isLoading, updateStreak } = useUserStore();
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // 1. Initialize database first (creates tables, seeds puzzles)
      await getDatabaseService().initialize();
      setDbInitialized(true);

      // 2. Initialize user store
      await initialize();

      // 3. Update streak on app open
      updateStreak();
    };

    initApp();
  }, [initialize, updateStreak]);

  const isInitialized = dbInitialized && userInitialized;

  return { isInitialized, isLoading };
}
