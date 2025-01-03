import { TestCase, TestResult } from '../types/lesson';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  testResults: TestResult[];
}

export async function validateSolution(
  code: string,
  tests: TestCase[],
  solution: string
): Promise<ValidationResult> {
  try {
    // First check for syntax errors
    validateSyntax(code);

    // Run the code in a safe environment
    const sandbox = createSandbox(code);
    const testResults = await runTests(code, tests, solution);

    return {
      isValid: testResults.every((test) => test.passed),
      testResults,
    };
  } catch (error) {
    return {
      isValid: false,
      testResults: [
        {
          passed: false,
          description: 'Code Execution Error',
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
}

function validateSyntax(code: string): void {
  // Kiểm tra cú pháp Solidity
  const syntaxErrors: string[] = [];

  // Kiểm tra pragma
  if (!code.includes('pragma solidity')) {
    syntaxErrors.push('Missing pragma solidity version');
  }

  // Kiểm tra contract declaration
  if (!code.match(/contract\s+\w+\s*{/)) {
    syntaxErrors.push('Invalid or missing contract declaration');
  }

  // Nếu có lỗi cú pháp, ném ra ngoại lệ
  if (syntaxErrors.length > 0) {
    throw new Error(syntaxErrors.join('; '));
  }
}

function createSandbox(code: string): any {
  // Tạo sandbox để phân tích code Solidity
  try {
    // Phân tích cấu trúc contract
    const contractNameMatch = code.match(/contract\s+(\w+)\s*{/);
    const contractName = contractNameMatch
      ? contractNameMatch[1]
      : 'UnknownContract';

    // Phân tích các phần tử trong contract
    const stateVariables = analyzeStateVariables(code);
    const functions = analyzeFunctions(code);

    return {
      contractName,
      stateVariables,
      functions,
    };
  } catch (error) {
    throw new Error(
      `Code Initialization Error: ${
        error instanceof Error ? error.message : 'Failed to initialize code'
      }`
    );
  }
}

// Hàm phân tích các state variables
function analyzeStateVariables(
  code: string
): Array<{ name: string; type: string; visibility: string }> {
  const variableMatches = code.matchAll(/(\w+)\s+(\w+)\s+(\w+)\s*;/g);
  const variables: Array<{ name: string; type: string; visibility: string }> =
    [];

  for (const match of variableMatches) {
    variables.push({
      visibility: match[1],
      type: match[2],
      name: match[3],
    });
  }

  return variables;
}

// Hàm phân tích các function
function analyzeFunctions(
  code: string
): Array<{ name: string; visibility: string; returnType?: string }> {
  const functionMatches = code.matchAll(
    /function\s+(\w+)\s*\([^)]*\)\s+(public|private|internal|external)(\s+view)?(\s+returns\s*\([^)]*\))?/g
  );
  const functions: Array<{
    name: string;
    visibility: string;
    returnType?: string;
  }> = [];

  for (const match of functionMatches) {
    functions.push({
      name: match[1],
      visibility: match[2],
      returnType: match[4] ? match[4].trim() : undefined,
    });
  }

  return functions;
}

async function runTests(
  code: string,
  tests: TestCase[],
  solution: string
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  // Loại bỏ khoảng trắng thừa, xuống dòng và chuyển về chữ thường
  const normalizeCode = (code: string) =>
    code.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

  // Lấy solution
  const solutionCode = normalizeCode(solution);

  // Lấy code của người dùng
  const userCode = normalizeCode(code);

  // So sánh trực tiếp
  const passed = userCode === solutionCode;

  console.log('userCode:', userCode);
  console.log('solutionCode:', solutionCode);

  results.push({
    passed,
    description: 'Solution Validation',
    ...(passed
      ? {}
      : {
          error: 'Solution does not match',
          expected: solution,
          actual: code, // Giữ nguyên code gốc để dễ debug
        }),
  });

  return results;
}
