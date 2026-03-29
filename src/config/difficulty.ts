export interface DifficultyLevel {
  level: number;
  label: string;
  rating: number;
  description: string;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  { level: 1, label: "Beginner", rating: 800, description: "Just learned how pieces move" },
  { level: 2, label: "Novice", rating: 1000, description: "Knows basic tactics" },
  { level: 3, label: "Club Player", rating: 1200, description: "Plays in chess club" },
  { level: 4, label: "Tournament Player", rating: 1500, description: "Competes in tournaments" },
  { level: 5, label: "Advanced", rating: 1900, description: "Strong junior player" },
];

export const DEFAULT_DIFFICULTY_LEVEL = 1;

export const getDifficultyByLevel = (level: number): DifficultyLevel => {
  return DIFFICULTY_LEVELS.find((d) => d.level === level) ?? DIFFICULTY_LEVELS[0]!;
};
