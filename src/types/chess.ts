import type { Square, PieceSymbol, Color } from "chess.js";

export type { Square, PieceSymbol, Color };

export interface Position {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

export interface ChessMove {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
}

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[]; // UCI format moves
  rating: number;
  themes: string[];
  gameUrl?: string;
}

export interface PuzzleAttempt {
  puzzleId: string;
  solved: boolean;
  hintsUsed: number;
  timeSpent: number; // milliseconds
  attemptedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  steps: LessonStep[];
  prerequisites?: string[];
}

export type LessonCategory =
  | "basics"
  | "tactics"
  | "openings"
  | "endgames"
  | "strategy"
  | "famous-games";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface LessonStep {
  id: string;
  type: "explanation" | "demonstration" | "exercise" | "quiz";
  title?: string;
  content: string;
  fen?: string;
  moves?: string[];
  correctAnswer?: string;
  options?: QuizOption[];
  hints?: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
