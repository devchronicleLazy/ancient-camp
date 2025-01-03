import { useState } from 'react';

import { validateCode } from '@/services/codeValidation';
import { ILessonContent, TestResult } from '@/types/lesson';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAccount } from 'wagmi';
import CodeMirrorEditor from './code-editor/code-mirror-editor';
import { MintCertificateButton } from './mint-certificate-button';
import TestResults from './results/test-results';

interface LearningInterfaceProps {
  lesson: ILessonContent;
}

export default function LearningInterface({ lesson }: LearningInterfaceProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(lesson.steps[0].initialCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { address } = useAccount();

  const currentStep = lesson.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResults([]);
    console.log(code);

    try {
      const { isValid, testResults: results } = await validateCode(
        code,
        currentStep
      );
      setTestResults(results);

      if (isValid) {
        setCompletedSteps((prev) => new Set([...prev, currentStep.id]));
      }
    } catch (error) {
      setTestResults([
        {
          passed: false,
          description: 'Execution Error',
          error: error instanceof Error ? error.message : 'Failed to run code',
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    if (!isLastStep && completedSteps.has(currentStep.id)) {
      setCurrentStepIndex((prev) => prev + 1);
      setCode(lesson.steps[currentStepIndex + 1].initialCode);
      setTestResults([]);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
      setCode(lesson.steps[currentStepIndex - 1].initialCode);
      setTestResults([]);
    }
  };

  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Step Progress */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStepIndex + 1} of {lesson.steps.length}
              </span>
              <div className="flex space-x-1">
                {lesson.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`h-1.5 w-6 rounded transition-colors ${
                      index === currentStepIndex
                        ? 'bg-blue-500'
                        : completedSteps.has(step.id)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                disabled={isFirstStep}
                className={`p-2 rounded-lg transition-colors ${
                  isFirstStep
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={isLastStep || !completedSteps.has(currentStep.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isLastStep || !completedSteps.has(currentStep.id)
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              {isLastStep && completedSteps.has(currentStep.id) && (
                <div className="p-4">
                  <MintCertificateButton
                    student={address}
                    courseId={new Date().getMilliseconds()}
                    courseName={lesson.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <CodeMirrorEditor
            value={code}
            onChange={setCode}
            language={lesson.language}
            lesson={{
              description: currentStep.description,
              challenge: currentStep.challenge,
              hints: currentStep.hints,
            }}
            onRun={handleRunCode}
          />
        </div>
      </div>

      {/* Test Results Panel */}
      <div className="w-[40%] border-l flex flex-col bg-white">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Test Results</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <TestResults results={testResults} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}
