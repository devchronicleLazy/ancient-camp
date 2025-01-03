import CodeMirror from 'codemirror';
import { useEffect, useRef } from 'react';

import 'codemirror-solidity';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/eclipse.css';
import Instructions from '../learning-instrument';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  lesson: {
    description: string;
    challenge: string;
    hints?: string[];
  };
  onRun: () => void;
}

export default function CodeMirrorEditor({
  value,
  onChange,
  language,
  lesson,
  onRun,
}: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const cmInstanceRef = useRef<CodeMirror.EditorFromTextArea | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current && !cmInstanceRef.current) {
      // Create textarea element
      if (!textareaRef.current) {
        textareaRef.current = document.createElement('textarea');
        textareaRef.current.value = value;
        editorRef.current.appendChild(textareaRef.current);
      }

      // Initialize CodeMirror with light theme
      cmInstanceRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        mode: language === 'solidity' ? 'text/x-solidity' : 'javascript',
        theme: 'eclipse',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        extraKeys: {
          'Ctrl-/': 'toggleComment',
          'Cmd-/': 'toggleComment',
          'Ctrl-Space': 'autocomplete',
          'Ctrl-Enter': onRun,
          'Cmd-Enter': onRun,
        },
        indentUnit: 2,
        tabSize: 2,
        smartIndent: true,
        electricChars: true,
      });

      cmInstanceRef.current.on('change', (instance) => {
        onChange(instance.getValue());
      });
    }

    return () => {
      if (cmInstanceRef.current) {
        cmInstanceRef.current.toTextArea();
        cmInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (cmInstanceRef.current && value !== cmInstanceRef.current.getValue()) {
      cmInstanceRef.current.setValue(value);
    }
  }, [value]);

  return (
    <div className="h-full w-full bg-white p-4">
      <Instructions
        description={lesson.description}
        challenge={lesson.challenge}
        hints={lesson.hints}
        onRun={onRun}
      />
      <div ref={editorRef} className="border rounded-lg overflow-hidden" />
    </div>
  );
}
