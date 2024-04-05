import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';

import { generateAST, lexer, TokenizeError } from '../../compiler';
import CodeInfo from './CodeInfo';
import CodeResult from './CodeResult';
import { TokenUnit } from '../../types';

const CodeEditor = () => {
  const [codeContent, setCodeContent] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorHighliting, setErrorHighliting] = useState<TokenizeError | null>(null);
  const [error, setError] = useState<TokenizeError | null>(null);
  const [tokens, setTokens] = useState<TokenUnit[] | null>(null);
  const [AST, setAST] = useState<any>(null);

  const compile = () => {
    const { error, tokens } = lexer(codeContent);
    setTokens(!!tokens?.length ? tokens : []);
    setError(!!error ? error : null);

    if (!error && !!tokens) {
      try {
        const newAST = generateAST(tokens)
        setAST(newAST)
      } catch (error) {
        setError({ error: error.message, line: 0 });
        setShowError(true);
      }
    }
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!!errorHighliting) {
      interval = setInterval(() => {
        setShowError(true);
      }, 800);
    }
    if (!errorHighliting) setShowError(false);
    return () => clearInterval(interval);
  }, [errorHighliting])

  const handleInputChange = (content: string) => {
    setCodeContent(content);
    const { error } = lexer(content);
    if (!!error) {
      setErrorHighliting(error);
    } else {
      setError(null)
      setErrorHighliting(null);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center p-4">
      <CodeMirror
        value={codeContent}
        onChange={handleInputChange}
        placeholder='INT height = 50&#10;STRING color = "red"&#10;PERSON p1 = PERSON, height, color&#10;draw(p1)'
        height="256px"
        theme={basicDark}
        className="block w-full lg:w-2/3 h-64 border text-xl rounded-xl overflow-hidden border-none resize-none"
      />
      <p className="min-h-6 text-red-700 text-center">
        {((!!error || !!errorHighliting) && showError) && (
          <span>{error?.error || errorHighliting?.error}</span>
        )}
      </p>
      <button
        onClick={compile}
        disabled={(!!error || !!errorHighliting) && showError}
        className="bg-cyan-200 mt-2 disabled:bg-cyan-200/65 text-black px-4 py-2 rounded-xl">
        Compilar
      </button>

      <CodeResult ast={AST} />
      <CodeInfo tokens={tokens} ast={AST} />
    </div>
  )
}

export default CodeEditor