import { beginnerLessons } from "./beginner";
import { tacticsLessons } from "./tactics";
import type { Lesson, LessonCategory } from "@/types";

export const allLessons: Lesson[] = [...beginnerLessons, ...tacticsLessons];

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

export { beginnerLessons, tacticsLessons };
