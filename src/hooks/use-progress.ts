import { ILessonContent } from '@/types/lesson';
import { useMemo } from 'react';

import {
  getCourseProgress,
  getNextLesson,
  getPreviousLesson,
} from '@/lib/progress';

export function useProgress(lesson: ILessonContent) {
  const currentProgress = useMemo(
    () => getCourseProgress(lesson.courseId),
    [lesson.courseId]
  );

  const nextLesson = useMemo(
    () => getNextLesson(lesson.courseId, lesson.id),
    [lesson.courseId, lesson.id]
  );

  const previousLesson = useMemo(
    () => getPreviousLesson(lesson.courseId, lesson.id),
    [lesson.courseId, lesson.id]
  );

  return {
    currentProgress,
    nextLesson,
    previousLesson,
  };
}
