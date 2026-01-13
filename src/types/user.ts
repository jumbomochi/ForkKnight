export interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  puzzleRating: number;
  completedLessons: string[];
  completedPuzzles: string[];
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  lastActiveAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export type AchievementType =
  | "first_lesson"
  | "first_puzzle"
  | "streak_7"
  | "streak_30"
  | "puzzles_100"
  | "lessons_complete_basics"
  | "rating_milestone";

export interface DailyChallenge {
  date: string; // YYYY-MM-DD
  puzzleId: string;
  completed: boolean;
  xpReward: number;
}
