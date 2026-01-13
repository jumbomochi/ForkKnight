import { create } from "zustand";
import type { User, UserProgress } from "@/types";

interface UserState {
  user: User | null;
  progress: UserProgress | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completePuzzle: (puzzleId: string) => void;
  updateStreak: () => void;
}

const XP_PER_LEVEL = 100;

export const useUserStore = create<UserState>((set) => ({
  user: null,
  progress: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  setProgress: (progress) => set({ progress }),

  addXp: (amount) =>
    set((state) => {
      if (!state.progress) return state;

      const newXp = state.progress.xp + amount;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

      return {
        progress: {
          ...state.progress,
          xp: newXp,
          level: newLevel,
        },
      };
    }),

  completeLesson: (lessonId) =>
    set((state) => {
      if (!state.progress) return state;
      if (state.progress.completedLessons.includes(lessonId)) return state;

      return {
        progress: {
          ...state.progress,
          completedLessons: [...state.progress.completedLessons, lessonId],
        },
      };
    }),

  completePuzzle: (puzzleId) =>
    set((state) => {
      if (!state.progress) return state;
      if (state.progress.completedPuzzles.includes(puzzleId)) return state;

      return {
        progress: {
          ...state.progress,
          completedPuzzles: [...state.progress.completedPuzzles, puzzleId],
        },
      };
    }),

  updateStreak: () =>
    set((state) => {
      if (!state.progress) return state;

      const now = new Date();
      const lastActive = new Date(state.progress.lastActiveAt);
      const diffDays = Math.floor(
        (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      let newStreak = state.progress.currentStreak;

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      return {
        progress: {
          ...state.progress,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.progress.longestStreak),
          lastActiveAt: now,
        },
      };
    }),
}));
