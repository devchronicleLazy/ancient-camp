import { ILessonContent } from "@/types/lesson";



interface LessonContentProps {
    lesson: ILessonContent;
}

export default function LessonContent({ lesson }: LessonContentProps) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose max-w-none">
                <p className="mb-6">{lesson.description}</p>
                <div className="my-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">Challenge:</h3>
                    <p>{lesson.challenge}</p>
                </div>
                {lesson.hints && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Hints:</h3>
                        <ul className="list-disc pl-5">
                            {lesson.hints.map((hint, index) => (
                                <li key={index}>{hint}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}