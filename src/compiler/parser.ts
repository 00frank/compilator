import type { ASTChildrenNode, GeneratedAST, TokenUnit } from "../types.d.ts";
import { CarParams, TreeParams, PersonParams } from "../classes.ts";
import { PersonParser } from "./person-parser.ts";
import { CarParser } from "./car-parser.ts";
import { DrawerParser } from "./drawer-parser.ts";
import { TreeParser } from "./tree-parser.ts";

export const searchExistanceInAST = (AST: GeneratedAST, identifierId: string): string | number | null => {
  const searchedNode = AST.body.find(node => node.type === "ASSIGN_EXPRESSION" &&
    node.name === identifierId);

  if (!searchedNode)
    return null

  if (searchedNode.value instanceof PersonParams)
    return null;

  if (searchedNode.value instanceof CarParams)
    return null;

  if (searchedNode.value instanceof TreeParams)
    return null;

  return searchedNode.value;
}

export const searchObjectExistanceInAST = (AST: GeneratedAST, identifierId: string): ASTChildrenNode | null => {
  const searchedNode = AST.body.find(node => node.type !== "ASSIGN_EXPRESSION" &&
    node.type !== "DRAW_OBJECT_EXPRESSION" && node.name === identifierId)

  if (!searchedNode)
    return null;

  return searchedNode;
}

const safeMathOperation = (a: number, b: number, operator: "+" | "-" | "/" | "*"): number => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "*":
      return a * b;
  }
}

export const generateAST = (tokens: TokenUnit[]) => {
  const iterationTokens = [...tokens];
  const AST: GeneratedAST = {
    type: "MAIN",
    body: []
  }
  const personParser: PersonParser = new PersonParser(AST);
  const carParser: CarParser = new CarParser(AST);
  const treeParser: TreeParser = new TreeParser(AST);
  const drawerParser: DrawerParser = new DrawerParser(AST);

  while (iterationTokens.length > 0) {
    const currentToken = iterationTokens.shift()
    // variable assignation perfect flow
    let identifierToken: TokenUnit | undefined;
    if (!!currentToken && ["INT", "STRING", "CAR", "PERSON", "TREE"].includes(currentToken?.type)) {
      identifierToken = iterationTokens.shift();
      if (identifierToken?.type !== "IDENTIFIER")
        throw new Error(`Linea ${identifierToken?.line}: El lado izquierdo de una expresión de asignación debe ser el nombre de la variable: ${currentToken.value} ${identifierToken?.value || "?"}`)

      const assignToken = iterationTokens.shift();
      if (assignToken?.type !== "ASSIGN")
        throw new Error(`Linea ${identifierToken?.line}: Se esperaba una asignación a la variable ${currentToken.value} ${identifierToken.value}`)
    }

    if (currentToken?.type === "INT" && !!identifierToken) {
      const newIntValueToken = iterationTokens.shift();
      if (newIntValueToken?.type === "INT_VALUE") {
        const operatorToken = iterationTokens.shift();
        if (!!operatorToken && operatorToken.line === currentToken.line) {
          const rightOperantToken = iterationTokens.shift();
          let leftOperantValue: number = Number(newIntValueToken.value);
          let rightOperantValue: number;

          if (rightOperantToken?.type === "INT_VALUE") {
            rightOperantValue = Number(rightOperantToken.value);

            AST.body.push({
              type: "ASSIGN_EXPRESSION",
              name: identifierToken.value,
              value: safeMathOperation(leftOperantValue, rightOperantValue, operatorToken.value as "+" | "-" | "*" | "/")
            })
          } else if (rightOperantToken?.type === "IDENTIFIER") {
            const expectedDefinedVariable = rightOperantToken;
            let assignedRightOperantValue = searchExistanceInAST(AST, expectedDefinedVariable.value)

            if (!assignedRightOperantValue)
              throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)

            assignedRightOperantValue = Number(assignedRightOperantValue);
            AST.body.push({
              type: "ASSIGN_EXPRESSION",
              name: identifierToken.value,
              value: safeMathOperation(leftOperantValue, assignedRightOperantValue, operatorToken.value as "+" | "-" | "*" | "/")
            })
          } else {
            throw new Error(`Linea ${operatorToken?.line}: el operador derecho debe ser un número o una variable numerica`);
          }

        } else {
          AST.body.push({
            type: "ASSIGN_EXPRESSION",
            name: identifierToken.value,
            value: Number(newIntValueToken.value)
          })

          if (!!operatorToken && operatorToken.line !== currentToken.line)
            iterationTokens.unshift(operatorToken)
        }
      } else if (newIntValueToken?.type === "IDENTIFIER") {
        const expectedDefinedVariable = newIntValueToken;
        let assignedVariableValueToken = searchExistanceInAST(AST, expectedDefinedVariable.value);
        if (!assignedVariableValueToken)
          throw new Error(`Linea ${expectedDefinedVariable.line}: No se encuentra definida la variable ${expectedDefinedVariable.value}`)
        assignedVariableValueToken = Number(assignedVariableValueToken);

        const operatorToken = iterationTokens.shift();
        if (!operatorToken || !["PLUS", "MINUS", "MULTIPLY", "DIVIDE"].includes(operatorToken.type))
          throw new Error(`Linea ${operatorToken?.line}: Se esperaba una operación matematica para la asignación INT ${identifierToken?.value} = ${expectedDefinedVariable.value} ?`)

        const rightOperantToken = iterationTokens.shift();
        let rightOperantValue: number;
        if (rightOperantToken?.type === "IDENTIFIER") {
          const expectedRightOperantValue = searchExistanceInAST(AST, rightOperantToken.value);
          if (!expectedRightOperantValue)
            throw new Error(`Linea ${rightOperantToken.line}: No se encuentra definida la variable ${rightOperantToken.value}`)

          rightOperantValue = expectedRightOperantValue as number;
        } else if (rightOperantToken?.type === "INT_VALUE") {
          rightOperantValue = Number(rightOperantToken.value);
        } else {
          throw new Error(`Linea ${newIntValueToken?.line}: Se esperaba un valor numerico en la asignación a la variable INT ${identifierToken?.value} = ${newIntValueToken?.value}`)
        }

        if (!!rightOperantValue) {
          AST.body.push({
            type: "ASSIGN_EXPRESSION",
            name: identifierToken.value,
            value: safeMathOperation(assignedVariableValueToken, rightOperantValue, operatorToken.value as "+" | "-" | "*" | "/")
          })
        }
      } else {
        throw new Error(`Linea ${newIntValueToken?.line}: Se esperaba un valor numerico o variable ya creada en la asignación a la variable INT ${identifierToken?.value} = ${newIntValueToken?.value}`)
      }
    }

    if (currentToken?.type === "STRING" && !!identifierToken) {
      const newStringValueToken = iterationTokens.shift();
      if (newStringValueToken?.type !== "STRING_VALUE")
        throw new Error(`Linea ${newStringValueToken?.line}: Se esperaba un valor entre comillas dobles (") en la asignación a la variable STRING ${identifierToken.value} = ${newStringValueToken?.value}`)

      AST.body.push({
        type: "ASSIGN_EXPRESSION",
        name: identifierToken.value,
        value: newStringValueToken.value.split('"').join("")
      })
    }

    // object types validation inheration
    if (!!currentToken && ["PERSON", "CAR", "TREE"].includes(currentToken?.type) && !!identifierToken) {
      const inheritedObjectToken = iterationTokens.shift();
      if (inheritedObjectToken?.type !== currentToken?.type)
        throw new Error(`Linea ${inheritedObjectToken?.line}: El tipo ${currentToken.value} debe heredar propiedades del tipo ${currentToken.value}`)
    }

    if (currentToken?.type === "PERSON" && !!identifierToken) {
      const [personObjectAssignation, nextToken] = personParser.parse(identifierToken, iterationTokens);

      AST.body.push(personObjectAssignation);
      if (!!nextToken)
        iterationTokens.unshift(nextToken);
    }

    if (currentToken?.type === "CAR" && !!identifierToken) {
      const [carObjectAssignation, nextToken] = carParser.parse(identifierToken, iterationTokens);

      AST.body.push(carObjectAssignation);
      if (!!nextToken)
        iterationTokens.unshift(nextToken);
    }

    if (currentToken?.type === "TREE" && !!identifierToken) {
      const [treeObjectAssignation, nextToken] = treeParser.parse(identifierToken, iterationTokens);

      AST.body.push(treeObjectAssignation);
      if (!!nextToken)
        iterationTokens.unshift(nextToken)
    }

    if (currentToken?.type === "DRAW") {
      const leftParethesisToken = iterationTokens.shift();
      if (leftParethesisToken?.type !== "LPAREN")
        throw new Error(`Linea ${currentToken.line}: la función reservada draw debe contener los parametros dentro de parentesis "()"`);

      const [drawObjectExpression, nextToken] = drawerParser.parse(currentToken, iterationTokens);

      AST.body.push(drawObjectExpression);
      if (!!nextToken)
        iterationTokens.unshift(nextToken);
    }

    if (!!currentToken && !["INT", "STRING", "CAR", "PERSON", "TREE", "DRAW"].includes(currentToken?.type))
      throw new Error(`Linea ${currentToken?.line}: token desconocido ${currentToken?.value}`)
  }
  return AST;
}