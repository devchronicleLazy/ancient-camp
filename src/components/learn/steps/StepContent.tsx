import { Step } from '@/types/lesson';
import { BookOpen, Code, Lightbulb, CheckCircle } from 'lucide-react';

interface StepContentProps {
    step: Step;
    isCompleted: boolean;
}

export default function StepContent({ step, isCompleted }: StepContentProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{step.title}</h2>
                {isCompleted && (
                    <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Completed</span>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="mb-6">
                <div className="flex items-center text-blue-600 mb-2">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">Description</h3>
                </div>
                <p className="text-gray-700">{step.description}</p>
            </div>

            {/* Challenge */}
            <div className="mb-6">
                <div className="flex items-center text-purple-600 mb-2">
                    <Code className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">Challenge</h3>
                </div>
                <p className="text-gray-700">{step.challenge}</p>
            </div>

            {/* Hints */}
            {step.hints && step.hints.length > 0 && (
                <div>
                    <div className="flex items-center text-amber-600 mb-2">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        <h3 className="font-medium">Hints</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                        {step.hints.map((hint, index) => (
                            <li key={index} className="text-gray-700">{hint}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}