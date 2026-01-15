import { create } from "zustand";
import { getStorageService } from "@/services/storage";
import type { User, UserProgress } from "@/types";

interface UserState {
  user: User | null;
  progress: UserProgress | null;
  isLoading: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completePuzzle: (puzzleId: string) => void;
  updateStreak: () => void;
  updatePuzzleRating: (newRating: number) => void;
}

const XP_PER_LEVEL = 100;

const saveProgress = async (progress: UserProgress | null) => {
  if (progress) {
    const storage = getStorageService();
    await storage.saveUserProgress(progress);
  }
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  progress: null,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true });
    try {
      const storage = getStorageService();
      const progress = await storage.getUserProgress();
      set({ progress, isInitialized: true, isLoading: false });
    } catch (error) {
      console.error("Failed to initialize user store:", error);
      set({ isLoading: false });
    }
  },

  setUser: (user) => set({ user }),

  setProgress: (progress) => {
    set({ progress });
    saveProgress(progress);
  },

  addXp: (amount) => {
    const state = get();
    if (!state.progress) return;

    const newXp = state.progress.xp + amount;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

    const newProgress = {
      ...state.progress,
      xp: newXp,
      level: newLevel,
    };

    set({ progress: newProgress });
    saveProgress(newProgress);
  },

  completeLesson: (lessonId) => {
    const state = get();
    if (!state.progress) return;
    if (state.progress.completedLessons.includes(lessonId)) return;

    const newProgress = {
      ...state.progress,
      completedLessons: [...state.progress.completedLessons, lessonId],
    };

    set({ progress: newProgress });
    saveProgress(newProgress);
  },

  completePuzzle: (puzzleId) => {
    const state = get();
    if (!state.progress) return;
    if (state.progress.completedPuzzles.includes(puzzleId)) return;

    const newProgress = {
      ...state.progress,
      completedPuzzles: [...state.progress.completedPuzzles, puzzleId],
    };

    set({ progress: newProgress });
    saveProgress(newProgress);
  },

  updatePuzzleRating: (newRating) => {
    const state = get();
    if (!state.progress) return;

    const newProgress = {
      ...state.progress,
      puzzleRating: newRating,
    };

    set({ progress: newProgress });
    saveProgress(newProgress);
  },

  updateStreak: () => {
    const state = get();
    if (!state.progress) return;

    const now = new Date();
    const lastActive = new Date(state.progress.lastActiveAt);

    // Use calendar day comparison instead of time-based
    // This ensures streak increments correctly even if < 24 hours apart
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDate = new Date(
      lastActive.getFullYear(),
      lastActive.getMonth(),
      lastActive.getDate()
    );
    const diffDays = Math.round(
      (nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = state.progress.currentStreak;

    if (diffDays === 0) {
      // Same calendar day - no change to streak
    } else if (diffDays === 1) {
      // Consecutive calendar day - increment streak
      newStreak += 1;
    } else {
      // Missed a day - reset streak to 1
      newStreak = 1;
    }

    const newProgress = {
      ...state.progress,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, state.progress.longestStreak),
      lastActiveAt: now,
    };

    set({ progress: newProgress });
    saveProgress(newProgress);
  },
}));
