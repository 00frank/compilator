import type { ASTChildrenNode, GeneratedAST, TokenUnit } from "../types";
import { searchObjectExistanceInAST } from "./parser.ts";

export class DrawerParser {
  constructor(private ast: GeneratedAST) { }
  public parse(drawFunctionToken: TokenUnit, iterator: TokenUnit[]): [ASTChildrenNode, TokenUnit | undefined] {
    const firstArgumentToken = iterator.shift();
    if (!firstArgumentToken)
      throw new Error(`Linea ${drawFunctionToken.line}: La función reservada draw debe recibir por parametro un objeto ya definido "draw(x)"`);

    if (firstArgumentToken?.type === "IDENTIFIER") {
      const expectedDefinedObject = searchObjectExistanceInAST(this.ast, firstArgumentToken.value);

      if (!expectedDefinedObject)
        throw new Error(`Linea ${firstArgumentToken.line}: No se encuentra definido el objeto ${firstArgumentToken.value}`)

      const rightParenthesisToken = iterator.shift();
      if (rightParenthesisToken?.type !== "RPAREN")
        throw new Error(`Linea ${firstArgumentToken.line}: Se esperaba un cierre de función ")"`);

      return [{
        type: "DRAW_OBJECT_EXPRESSION",
        subtype: expectedDefinedObject.type.split("_")[1],
        name: "DRAW_" + (this.ast.body.filter(node => node.type === "DRAW_OBJECT_EXPRESSION").length + 1),
        value: expectedDefinedObject.value
      }, undefined]
    }

    if (firstArgumentToken?.type === "RPAREN")
      throw new Error(`Linea ${firstArgumentToken.line}: Se esperaba por lo menos un argumento del tipo Objeto para la función draw`)

    throw new Error(`Linea ${firstArgumentToken.line}: La función reservada draw debe recibir por parametro un objeto ya definido`);
  }
}