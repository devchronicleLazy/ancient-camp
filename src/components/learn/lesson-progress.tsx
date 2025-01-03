'use client';

import { useProgress } from '@/hooks/use-progress';
import { ILessonContent } from '@/types/lesson';
import { useRouter } from 'next/navigation';
import NavigationButtons from './progress/navigation-buttons';
import ProgressBar from './progress/progress-bar';


interface LessonProgressProps {
    lesson: ILessonContent;
    isCompleted: boolean;
}

export default function LessonProgress({ lesson, isCompleted }: LessonProgressProps) {
    const router = useRouter();
    const { currentProgress, nextLesson, previousLesson } = useProgress(lesson);

    const handleNavigation = (lessonId: string) => {
        if (isCompleted || previousLesson) {
            router.push(`/learn/${lesson.courseId}/${lessonId}`);
        }
    };

    return (
        <div className="flex items-center justify-between space-x-4">
            <ProgressBar progress={currentProgress} />
            <NavigationButtons
                onPrevious={() => previousLesson && handleNavigation(previousLesson.id)}
                onNext={() => nextLesson && handleNavigation(nextLesson.id)}
                hasPrevious={!!previousLesson}
                hasNext={!!nextLesson}
                isNextEnabled={isCompleted}
            />
        </div>
    );
}