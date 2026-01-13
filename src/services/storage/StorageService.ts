import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserProgress } from "@/types";

const STORAGE_KEYS = {
  USER_PROGRESS: "@forkknight/user_progress",
  COMPLETED_PUZZLES: "@forkknight/completed_puzzles",
  SETTINGS: "@forkknight/settings",
} as const;

export interface AppSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  boardTheme: "classic" | "wood" | "blue";
  pieceSet: "standard" | "neo" | "alpha";
}

const DEFAULT_PROGRESS: UserProgress = {
  userId: "local-user",
  xp: 0,
  level: 1,
  puzzleRating: 600,
  completedLessons: [],
  completedPuzzles: [],
  achievements: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveAt: new Date(),
};

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  boardTheme: "classic",
  pieceSet: "standard",
};

export class StorageService {
  async getUserProgress(): Promise<UserProgress> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...parsed,
          lastActiveAt: new Date(parsed.lastActiveAt),
          achievements: parsed.achievements.map((a: { unlockedAt: string }) => ({
            ...a,
            unlockedAt: new Date(a.unlockedAt),
          })),
        };
      }
      return DEFAULT_PROGRESS;
    } catch (error) {
      console.error("Error loading user progress:", error);
      return DEFAULT_PROGRESS;
    }
  }

  async saveUserProgress(progress: UserProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_PROGRESS,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error("Error saving user progress:", error);
    }
  }

  async getCompletedPuzzles(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_PUZZLES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading completed puzzles:", error);
      return [];
    }
  }

  async addCompletedPuzzle(puzzleId: string): Promise<void> {
    try {
      const completed = await this.getCompletedPuzzles();
      if (!completed.includes(puzzleId)) {
        completed.push(puzzleId);
        await AsyncStorage.setItem(
          STORAGE_KEYS.COMPLETED_PUZZLES,
          JSON.stringify(completed)
        );
      }
    } catch (error) {
      console.error("Error saving completed puzzle:", error);
    }
  }

  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Error loading settings:", error);
      return DEFAULT_SETTINGS;
    }
  }

  async saveSettings(settings: Partial<AppSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...settings };
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(newSettings)
      );
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_PROGRESS,
        STORAGE_KEYS.COMPLETED_PUZZLES,
        STORAGE_KEYS.SETTINGS,
      ]);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  }
}

// Singleton instance
let storageServiceInstance: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!storageServiceInstance) {
    storageServiceInstance = new StorageService();
  }
  return storageServiceInstance;
}
