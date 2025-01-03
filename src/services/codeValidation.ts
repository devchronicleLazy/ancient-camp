import { validateSolution } from '@/lib/validation';
import { Step, TestResult } from '@/types/lesson';

export async function validateCode(
  code: string,
  step: Step
): Promise<{
  isValid: boolean;
  testResults: TestResult[];
}> {
  try {
    const result = await validateSolution(code, step.tests, step.solution);
    return {
      isValid: result.isValid,
      testResults: result.testResults,
    };
  } catch (error) {
    return {
      isValid: false,
      testResults: [
        {
          passed: false,
          description: 'Code execution error',
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
}
