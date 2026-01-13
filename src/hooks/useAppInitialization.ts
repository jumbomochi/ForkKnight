import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export function useAppInitialization() {
  const { initialize, isInitialized, isLoading, updateStreak } = useUserStore();

  useEffect(() => {
    const initApp = async () => {
      await initialize();
      // Update streak on app open
      updateStreak();
    };

    initApp();
  }, [initialize, updateStreak]);

  return { isInitialized, isLoading };
}
