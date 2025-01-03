import { useState } from 'react';
import { BookOpen, Code, Lightbulb, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { Button } from '../ui/button';

interface InstructionsPanelProps {
    description: string;
    challenge: string;
    hints?: string[];
    onRun: () => void;
}

type Section = 'description' | 'challenge' | 'hints';

export default function InstructionsPanel({ description, challenge, hints, onRun }: InstructionsPanelProps) {
    const [activeSections, setActiveSections] = useState<Set<Section>>(new Set(['description']));

    const toggleSection = (section: Section) => {
        setActiveSections(prev => {
            const newSections = new Set(prev);
            if (newSections.has(section)) {
                newSections.delete(section);
            } else {
                newSections.add(section);
            }
            return newSections;
        });
    };

    const sections = {
        description: {
            icon: BookOpen,
            title: 'Description',
            content: description,
            color: 'text-blue-600',
        },
        challenge: {
            icon: Code,
            title: 'Challenge',
            content: challenge,
            color: 'text-purple-600',
        },
        hints: {
            icon: Lightbulb,
            title: 'Hints',
            content: hints,
            color: 'text-amber-600',
        },
    };

    return (
        <div>
            <div className="bg-white border rounded-lg shadow-sm">
                {Object.entries(sections).map(([key, section]) => {
                    const Icon = section.icon;
                    const isActive = activeSections.has(key as Section);
                    const shouldShow = key !== 'hints' || (hints && hints.length > 0);

                    if (!shouldShow) return null;

                    return (
                        <div key={key} className="border-b last:border-b-0">
                            <button
                                onClick={() => toggleSection(key as Section)}
                                className={`w-full px-4 py-3 flex items-center justify-between ${section.color} hover:bg-gray-50 transition-colors`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium text-sm">{section.title}</span>
                                </div>
                                {isActive ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>


                            {isActive && (
                                <div className="px-4 py-3 bg-gray-50">
                                    {key === 'hints' ? (
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            {hints?.map((hint, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="font-medium mr-2">{index + 1}.</span>
                                                    <span>{hint}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-600">{section.content}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

            </div>
            <Button
                onClick={onRun}
                className="flex items-center px-4 py-2 my-6 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
                <Play className="w-4 h-4 mr-2" />
                Run Code
            </Button>
        </div>

    );
}