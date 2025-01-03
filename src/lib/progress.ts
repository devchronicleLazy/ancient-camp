import { getCourseById } from "./courses";
import { ILessonContent } from "../types/lesson";
import { getLessonById } from "./lessons";

export function getCourseProgress(courseId: string): number {
  // TODO: Implement actual progress tracking with Supabase
  return 35; // Placeholder progress
}

export function getNextLesson(
  courseId: string,
  currentLessonId: string
): ILessonContent | null {
  const course = getCourseById(courseId);
  if (!course) return null;

  let foundCurrent = false;
  for (const module of course.modules) {
    for (let i = 0; i < module.lessons.length; i++) {
      if (foundCurrent) {
        const nextLesson = getLessonById(courseId, module.lessons[i].id);
        return nextLesson || null;
      }
      if (module.lessons[i].id === currentLessonId) {
        foundCurrent = true;
        if (i < module.lessons.length - 1) {
          const nextLesson = getLessonById(courseId, module.lessons[i + 1].id);
          return nextLesson || null;
        }
      }
    }
  }
  return null;
}

export function getPreviousLesson(
  courseId: string,
  currentLessonId: string
): ILessonContent | null {
  const course = getCourseById(courseId);
  if (!course) return null;

  for (const module of course.modules) {
    const lessonIndex = module.lessons.findIndex(
      (lesson) => lesson.id === currentLessonId
    );
    if (lessonIndex > 0) {
      const prevLesson = getLessonById(
        courseId,
        module.lessons[lessonIndex - 1].id
      );
      return prevLesson || null;
    }
  }
  return null;
}
