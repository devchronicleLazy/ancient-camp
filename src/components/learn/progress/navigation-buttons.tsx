import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
    onPrevious: () => void;
    onNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    isNextEnabled: boolean;
}

export default function NavigationButtons({
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
    isNextEnabled,
}: NavigationButtonsProps) {
    return (
        <div className="flex space-x-2">
            <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${hasPrevious
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
            </button>
            <button
                onClick={onNext}
                disabled={!hasNext || !isNextEnabled}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${hasNext && isNextEnabled
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-100 text-blue-400 cursor-not-allowed'}`}
                title={!isNextEnabled ? "Complete the current lesson to proceed" : ""}
            >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
}