export interface Step {
  id: string;
  title: string;
  description: string;
  challenge: string;
  hints?: string[];
  initialCode: string;
  solution: string;
  tests: TestCase[];
}

export interface ILessonContent {
  id: string;
  courseId: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  description: string;
  challenge: string;
  hints?: string[];
  objectives?: string[];
  steps: Step[];
  finalChallenge?: {
    description: string;
    challenge: string;
    hints?: string[];
    initialCode: string;
    solution: string;
    tests: TestCase[];
  };
  language: string;
}

export interface TestCase {
  input: any;
  expected: any;
  description: string;
}

export interface TestResult {
  passed: boolean;
  description: string;
  error?: string;
  expected?: any;
  actual?: any;
}
