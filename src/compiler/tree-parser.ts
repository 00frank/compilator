import { TreeParams } from "../classes.ts";
import type { ASTChildrenNode, GeneratedAST, TokenUnit } from "../types";
import { searchExistanceInAST } from "./parser.ts";

export class TreeParser {
  constructor(private ast: GeneratedAST) { }
  private MAX_TREE_SIZE = 64;
  private MAX_TREE_TYPE = 2;
  private DEFAULT_TREE_TYPE = 1;
  private DEFAULT_TREE_SIZE = 48;

  public parse(identifierToken: TokenUnit, iterator: TokenUnit[]): [ASTChildrenNode, TokenUnit | undefined] {
    let type: number = this.DEFAULT_TREE_TYPE;
    let size: number = this.DEFAULT_TREE_SIZE;

    const firstCommaToken = iterator.shift();
    if (firstCommaToken?.type !== "COMMA" && firstCommaToken?.line !== identifierToken.line) {
      let defaultTreeNode: ASTChildrenNode = {
        type: "OBJECT_TREE_EXPRESSION",
        name: identifierToken.value,
        value: { type, size } as TreeParams
      }
      return [defaultTreeNode, firstCommaToken];
    }

    const treeTypeToken = iterator.shift();
    if (treeTypeToken?.type === "INT_VALUE" && !!firstCommaToken) {
      type = Math.min(Number(treeTypeToken.value), this.MAX_TREE_TYPE);;
    } else if (treeTypeToken?.type === "IDENTIFIER") {
      const expectedDefinedVariable = treeTypeToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      type = Math.min(Number(assignedVariableValueToken), this.MAX_TREE_TYPE);
    } else {
      throw new Error(`Linea ${firstCommaToken?.line}: los valores validos son 1 o 2 como segundo argumento`);
    }

    const secondCommaToken = iterator.shift();
    if (secondCommaToken?.type !== "COMMA" && secondCommaToken?.line !== identifierToken.line) {
      return [{
        type: "OBJECT_TREE_EXPRESSION",
        name: identifierToken.value,
        value: { size, type } as TreeParams
      }, secondCommaToken];
    }

    const treeSizeToken = iterator.shift();
    if (treeSizeToken?.type === "INT_VALUE" && !!secondCommaToken) {
      size = Math.min(Number(treeSizeToken.value), this.MAX_TREE_SIZE);;
    } else if (treeSizeToken?.type === "IDENTIFIER" && !!secondCommaToken) {
      const expectedDefinedVariable = treeSizeToken;
      let assignedVariableValueToken = searchExistanceInAST(this.ast, expectedDefinedVariable.value);
      if (!assignedVariableValueToken)
        throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

      size = Math.min(Number(assignedVariableValueToken), this.MAX_TREE_SIZE);
    } else {
      throw new Error(`Linea ${firstCommaToken?.line}: el valor del tercer argumento debe ser 1, 2 o una variable numerica`);
    }

    return [{
      type: "OBJECT_TREE_EXPRESSION",
      name: identifierToken.value,
      value: { size, type } as TreeParams
    }, undefined]
  }
}