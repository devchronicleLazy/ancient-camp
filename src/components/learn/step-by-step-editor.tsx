import { useEffect, useState } from 'react';
import { Step, TestResult } from '@/types/lesson';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { validateSolution } from '@/lib/validation';
import CodeMirrorEditor from './code-editor/code-mirror-editor';
import TestResults from './results/test-results';

interface StepByStepEditorProps {
  steps: Step[];
  language: string;
  onStepComplete: (stepId: string) => void;
  completedSteps: Set<string>;
}

export default function StepByStepEditor({
  steps,
  language,
  onStepComplete,
  completedSteps,
}: StepByStepEditorProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(steps[0].initialCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
      setCode(steps[currentStepIndex + 1].initialCode);
      setTestResults([]);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
      setCode(steps[currentStepIndex - 1].initialCode);
      setTestResults([]);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const result = await validateSolution(code, currentStep.tests, code);
      setTestResults(result.testResults || []);

      if (result.isValid) {
        onStepComplete(currentStep.id);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setTestResults([
        {
          passed: false,
          description: 'Code execution error',
          error:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Step Progress */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <div className="flex space-x-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-1.5 w-6 rounded ${
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
            className={`p-1 rounded ${
              isFirstStep ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={isLastStep || !completedSteps.has(currentStep.id)}
            className={`p-1 rounded ${
              isLastStep || !completedSteps.has(currentStep.id)
                ? 'text-gray-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <CodeMirrorEditor
          value={code}
          onChange={setCode}
          language={language}
          lesson={{
            description: currentStep.description,
            challenge: currentStep.challenge,
            hints: currentStep.hints,
          }}
          onRun={handleRunCode}
        />
      </div>

      {/* Test Results */}
      <div className="border-t bg-white">
        <TestResults results={testResults} isRunning={isRunning} />
      </div>
    </div>
  );
}
