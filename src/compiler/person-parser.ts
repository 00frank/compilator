import type { ASTChildrenNode, GeneratedAST, TokenUnit } from "../types";
import { searchExistanceInAST } from "./parser.ts";

export class PersonParser {
  constructor(private ast: GeneratedAST) { }
  private MAX_PERSON_SIZE = 64;
  private DEFAULT_PERSON_SIZE = 32;
  private DEFAULT_PERSON_COLOR = "black";

  public parse(identifierToken: TokenUnit, iterator: TokenUnit[]): [ASTChildrenNode, TokenUnit | undefined] {
    let size: number = this.DEFAULT_PERSON_SIZE;
    let color: string = this.DEFAULT_PERSON_COLOR;

    const firstCommaToken = iterator.shift();
    if (firstCommaToken?.type !== "COMMA" && firstCommaToken?.line !== identifierToken.line) {
      let defaultPersonNode: ASTChildrenNode = {
        type: "OBJECT_PERSON_EXPRESSION",
        name: identifierToken.value,
        value: { size, color }
      }
      return [defaultPersonNode, firstCommaToken];
    }

    const personSizeToken = iterator.shift();
    if (personSizeToken?.type === "INT_VALUE" && !!firstCommaToken) {
      size = Math.min(Number(personSizeToken.value), this.MAX_PERSON_SIZE);;
    } else if (personSizeToken?.type === "IDENTIFIER") {
      const expectedDefinedVariable = personSizeToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      size = Math.min(Number(assignedVariableValueToken), this.MAX_PERSON_SIZE);
    } else {
      throw new Error(`Linea ${firstCommaToken?.line}: un valor númerico o variable númerica era esperado en el segundo argumento`);
    }

    const secondCommaToken = iterator.shift();
    if (secondCommaToken?.type !== "COMMA" && secondCommaToken?.line !== identifierToken.line) {
      return [{
        type: "OBJECT_PERSON_EXPRESSION",
        name: identifierToken.value,
        value: { size, color }
      }, secondCommaToken];
    }

    const personColorToken = iterator.shift();
    if (personColorToken?.type === "STRING_VALUE") {
      color = personColorToken.value.split('"').join("");
    } else if (personColorToken?.type === "IDENTIFIER") {
      const expectedDefinedVariable = personColorToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      color = String(assignedVariableValueToken);
    } else {
      if (personColorToken?.line !== identifierToken.line) {
        return [{
          type: "OBJECT_PERSON_EXPRESSION",
          name: identifierToken.value,
          value: { size, color }
        }, personColorToken]
      } else {
        throw new Error(`Linea ${identifierToken.line}: `)
      }
    }

    return [{
      type: "OBJECT_PERSON_EXPRESSION",
      name: identifierToken.value,
      value: { size, color }
    }, undefined]
  }
}