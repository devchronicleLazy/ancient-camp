import { TestResult } from '@/types/lesson';
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TestResultsProps {
    results: TestResult[];
    isRunning: boolean;
}

export default function TestResults({ results, isRunning }: TestResultsProps) {
    const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());

    const toggleExpand = (index: number) => {
        setExpandedResults(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    if (isRunning) {
        return (
            <div className="h-16 flex items-center justify-center bg-gray-100 border-t">
                <div className="flex items-center space-x-3 text-blue-600">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="font-semibold">Running tests...</span>
                </div>
            </div>
        );
    }

    if (!results?.length) return null;

    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    const allPassed = passedTests === totalTests;

    return (
        <div className="border-t">
            {/* Summary Header */}
            <div className={`px-6 py-4 ${allPassed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {allPassed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        )}
                        <span className={`font-semibold ${allPassed ? 'text-green-700' : 'text-yellow-700'}`}>
                            {passedTests} of {totalTests} tests passed
                        </span>
                    </div>
                    {!allPassed && (
                        <span className="text-sm text-gray-600">
                            Review failed tests below
                        </span>
                    )}
                </div>
            </div>

            {/* Test Results */}
            <div className="divide-y">
                {results.map((result, index) => {
                    const isExpanded = expandedResults.has(index);

                    return (
                        <div key={index} className="group">
                            <button
                                onClick={() => toggleExpand(index)}
                                className={`w-full px-6 py-4 flex items-start justify-between hover:bg-gray-100 transition-colors
                  ${!result.passed && (result.error || result.expected) ? 'cursor-pointer' : 'cursor-default'}`}
                                aria-expanded={isExpanded}
                                aria-controls={`result-details-${index}`}
                            >
                                <div className="flex items-start space-x-3">
                                    {result.passed ? (
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                    )}
                                    <div>
                                        <p className={`font-semibold ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                                            {result.description}
                                        </p>
                                        {result.error && !isExpanded && (
                                            <p className="mt-1 text-sm text-red-600">{result.error}</p>
                                        )}
                                    </div>
                                </div>
                                {(result.error || result.expected) && (
                                    <div className="ml-4 text-gray-500">
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>)}
                            </button>

                            {/* Expanded Details */}
                            {isExpanded && (result.error || result.expected || result.actual) && (
                                <div id={`result-details-${index}`} className="px-6 pb-4 space-y-4">
                                    {result.error && (
                                        <div>
                                            <p className="text-sm font-semibold text-red-600 mb-2">Error Details</p>
                                            <pre className="p-3 bg-red-50 rounded-lg text-sm text-red-700 overflow-x-auto">
                                                {result.error}
                                            </pre>
                                        </div>
                                    )}
                                    {result.expected && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-2">Expected Result</p>
                                            <pre className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 overflow-x-auto">
                                                {JSON.stringify(result.expected, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                    {result.actual && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-2">Your Result</p>
                                            <pre className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 overflow-x-auto">
                                                {JSON.stringify(result.actual, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}