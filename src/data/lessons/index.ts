import { beginnerLessons } from "./beginner";
import { tacticsLessons } from "./tactics";
import { openingsLessons } from "./openings";
import { strategyLessons } from "./strategy";
import { endgameLessons } from "./endgames";
import { famousGamesLessons } from "./famous-games";
import type { Lesson, LessonCategory } from "@/types";

export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...tacticsLessons,
  ...openingsLessons,
  ...strategyLessons,
  ...endgameLessons,
  ...famousGamesLessons,
];

export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find((lesson) => lesson.id === id);
};

export const getLessonsByCategory = (category: LessonCategory): Lesson[] => {
  return allLessons.filter((lesson) => lesson.category === category);
};

export const getBeginnerLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.difficulty === "beginner");
};

export const getTacticsLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.category === "tactics");
};

export {
  beginnerLessons,
  tacticsLessons,
  openingsLessons,
  strategyLessons,
  endgameLessons,
  famousGamesLessons,
};
