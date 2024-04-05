import { TokenSpecification, TokenUnit } from "../types";

export class TokenizeError {
  constructor(public error: string, public line: number) {
    this.error = error;
    this.line = line;
  }
}

export const lexer = (code: string): { tokens?: TokenUnit[], error?: TokenizeError } => {
  try {
    const tokens = tokenize(code);
    if (tokens instanceof TokenizeError) {
      return { error: tokens };
    }
    return { tokens };
  } catch (err: any) {
    console.log('err: ', err);
    return { error: err.message };
  }
}

function tokenize(code: string): TokenUnit[] | TokenizeError {
  let remainingCodeLines = code.split(/\r?\n/);
  const tokens: TokenUnit[] = [];
  const tokenSpecification: TokenSpecification[] = [
    { type: "INT" as const, regex: /\bINT\b/ },
    { type: "STRING" as const, regex: /\bSTRING\b/ },
    { type: "PERSON" as const, regex: /\bPERSON\b/ },
    { type: "CAR" as const, regex: /\bCAR\b/ },
    { type: "TREE" as const, regex: /\bTREE\b/ },

    { type: "DRAW" as const, regex: /\bdraw\b/ },
    { type: "LPAREN" as const, regex: /\(/ },
    { type: "RPAREN" as const, regex: /\)/ },

    { type: "IDENTIFIER" as const, regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/ },
    { type: "ASSIGN" as const, regex: /=/ },
    { type: "INT_VALUE" as const, regex: /\b\d+\b/ },
    { type: "STRING_VALUE" as const, regex: /"(.*?)"/ },

    { type: "COMMA" as const, regex: /,/ },
    { type: "WHITESPACE" as const, regex: /\s+/ },
    
    { type: "PLUS" as const, regex: /\+/},
    { type: "MINUS" as const, regex: /-/},
    { type: "MULTIPLY" as const, regex: /\*/},
    { type: "DIVIDE" as const, regex: /\//},
  ];

  while (remainingCodeLines.length > 0) {
    let currentCodeLine = remainingCodeLines.shift();
    let line = code.split(/\r?\n/).length - remainingCodeLines.length;
    let matchFound = false;

    if (!currentCodeLine) break; // no more lines found

    while (currentCodeLine.length > 0) { // iterate new line
      for (const { type, regex } of tokenSpecification) {
        regex.lastIndex = 0; // go to the beginning of the regex for every code line
        const match = regex.exec(currentCodeLine);

        if (match && match.index === 0) { // match at the beginning of the string
          const value = match[0];
          tokens.push({ type, value, line });

          currentCodeLine = currentCodeLine.slice(value.length); // remove the token from the remaining code line
          matchFound = true;
          break;
        }
      }

      if (!matchFound) { // no match found in code line - return error
        return new TokenizeError(`Carácter ${currentCodeLine} en la linea ${line}`, line);
      }
      matchFound = false; // reset matchFound for every iteration in the line
    }
  }

  return tokens.filter(token => token.type !== "WHITESPACE");
}