import type { ASTChildrenNode, GeneratedAST, TokenUnit } from "../types";
import { searchExistanceInAST } from "./parser.ts";

export class CarParser {
  constructor(private ast: GeneratedAST) { }
  private MAX_CAR_SIZE = 64;
  private DEFAULT_CAR_SIZE = 32;
  private DEFAULT_CAR_COLOR = "grey";

  public parse(identifierToken: TokenUnit, iterator: TokenUnit[]): [ASTChildrenNode, TokenUnit | undefined] {
    let size: number = this.DEFAULT_CAR_SIZE;
    let color: string = this.DEFAULT_CAR_COLOR;

    const firstCommaToken = iterator.shift();
    if (firstCommaToken?.type !== "COMMA" && firstCommaToken?.line !== identifierToken.line) {
      let defaultCarNode: ASTChildrenNode = {
        type: "OBJECT_CAR_EXPRESSION",
        name: identifierToken.value,
        value: { size, color }
      }
      return [defaultCarNode, firstCommaToken];
    }

    const carSizeToken = iterator.shift();
    if (carSizeToken?.type === "INT_VALUE" && !!firstCommaToken) {
      size = Math.min(Number(carSizeToken.value), this.MAX_CAR_SIZE);;
    } else if (carSizeToken?.type === "IDENTIFIER") {
      const expectedDefinedVariable = carSizeToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      size = Math.min(Number(assignedVariableValueToken), this.MAX_CAR_SIZE);
    } else {
      throw new Error(`Linea ${firstCommaToken?.line}: un valor númerico o variable númerica era esperado en el segundo argumento`);
    }

    const secondCommaToken = iterator.shift();
    if (secondCommaToken?.type !== "COMMA" && secondCommaToken?.line !== identifierToken.line) {
      return [{
        type: "OBJECT_CAR_EXPRESSION",
        name: identifierToken.value,
        value: { size, color }
      }, secondCommaToken];
    }

    const carColorToken = iterator.shift();
    if (carColorToken?.type === "STRING_VALUE") {
      color = carColorToken.value.split('"').join("");
    } else if (carColorToken?.type === "IDENTIFIER") {
      const expectedDefinedVariable = carColorToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      color = String(assignedVariableValueToken);
    } else {
      if (!!carColorToken && carColorToken?.line !== identifierToken.line) {
        return [{
          type: "OBJECT_CAR_EXPRESSION",
          name: identifierToken.value,
          value: { size, color }
        }, carColorToken]
      } else {
        throw new Error(`Linea ${identifierToken.line}: Se esperaba un valor entre comillas dobles (") o variable de texto en el tercer argumento`)
      }
    }

    return [{
      type: "OBJECT_CAR_EXPRESSION",
      name: identifierToken.value,
      value: { size, color }
    }, undefined]
  }
}