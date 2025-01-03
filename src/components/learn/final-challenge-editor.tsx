import { ILessonContent } from '@/types/lesson';
import { Trophy } from 'lucide-react';
import { useState } from 'react';
import CodeEditor from './code-editor/code-mirror-editor';

interface FinalChallengeEditorProps {
  lesson: ILessonContent;
  onComplete: () => void;
}

export default function FinalChallengeEditor({
  lesson,
}: FinalChallengeEditorProps) {
  const [code, setCode] = useState(lesson.finalChallenge?.initialCode || '');

  if (!lesson.finalChallenge) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-white" />
          <h3 className="text-white font-medium">Final Challenge</h3>
        </div>
      </div>

      <div className="flex-1">
        <CodeEditor
          onRun={() => {
            'a';
          }}
          value={code}
          onChange={setCode}
          language={lesson.language}
          lesson={{
            description: lesson.finalChallenge.description,
            challenge: lesson.finalChallenge.challenge,
            hints: lesson.finalChallenge.hints,
          }}
        />
      </div>
    </div>
  );
}
