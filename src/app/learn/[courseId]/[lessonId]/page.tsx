'use client';

import { useParams } from 'next/navigation';
import { getLessonById } from '@/lib/lessons';
import LearningInterface from '@/components/learn/learning-interface';

export default function LearningPage() {
  const params = useParams();
  const lesson = getLessonById(
    params.courseId as string,
    params.lessonId as string
  );

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Lesson not found</p>
      </div>
    );
  }

  return (
    <>
      <LearningInterface lesson={lesson} />
    </>
  );
}
