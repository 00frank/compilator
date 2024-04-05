import { PersonParams, CarParams, TreeParams } from "./classes";

export type TokenUnitType =
  "INT" |
  "STRING" |
  "PERSON" |
  "CAR" |
  "TREE" |

  "IDENTIFIER" |
  "ASSIGN" |
  "INT_VALUE" |
  "STRING_VALUE" |

  "DRAW" |
  "LPAREN" |
  "RPAREN" |

  "COMMA" |
  "WHITESPACE" |

  "PLUS" |
  "MINUS" |
  "MULTIPLY" |
  "DIVIDE";

export type ASTChildrenNodeType = "ASSIGN_EXPRESSION" | "OBJECT_PERSON_EXPRESSION" | "OBJECT_CAR_EXPRESSION" | "OBJECT_TREE_EXPRESSION" | "DRAW_OBJECT_EXPRESSION"
export type ASTChildrenNode = { type: ASTChildrenNodeType, subtype?: string, name: string, value: string | number | PersonParams | CarParams | TreeParams }

export type TokenUnit = {
  type: TokenUnitType,
  value: string;
  line: number;
}

export type TokenSpecification = Pick<TokenUnit, "type"> & { regex: RegExp }

export type GeneratedAST = {
  type: "MAIN",
  body: ASTChildrenNode[]
}