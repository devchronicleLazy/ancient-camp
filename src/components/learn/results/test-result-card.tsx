import { TestResult } from '@/types/lesson';
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TestResultCardProps {
    result: TestResult;
}

export default function TestResultCard({ result }: TestResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`rounded-lg p-4 ${result.passed ? 'bg-green-50' : 'bg-red-50'
                }`}
        >
            <div
                className="flex items-start cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-shrink-0 mt-1">
                    {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                    )}
                </div>
                <div className="ml-3 flex-1">
                    <p className={`font-medium ${result.passed ? 'text-green-700' : 'text-red-700'
                        }`}>
                        {result.description}
                    </p>
                    {result.error && !isExpanded && (
                        <p className="mt-1 text-red-600 text-sm">{result.error}</p>
                    )}
                </div>
                <div className="ml-2">
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>

            {isExpanded && (result.error || result.expected || result.actual) && (
                <div className="mt-4 space-y-3">
                    {result.error && (
                        <div>
                            <p className="text-red-700 font-medium mb-1">Error:</p>
                            <pre className="bg-red-100 p-3 rounded text-red-600 text-sm overflow-x-auto">
                                {result.error}
                            </pre>
                        </div>
                    )}
                    {result.expected && (
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Expected:</p>
                            <pre className="bg-gray-100 p-3 rounded text-gray-800 text-sm overflow-x-auto">
                                {JSON.stringify(result.expected, null, 2)}
                            </pre>
                        </div>
                    )}
                    {result.actual && (
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Actual:</p>
                            <pre className="bg-gray-100 p-3 rounded text-gray-800 text-sm overflow-x-auto">
                                {JSON.stringify(result.actual, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}