import React from 'react';
import type { GeneratedAST } from '../types';
import { CarParams, PersonParams, TreeParams } from "../classes.ts";
import Person from '../assets/person';
import Car from '../assets/car';
import Tree from '../assets/tree';

export const Drawer = ({ ast }: { ast: GeneratedAST }) => {
  if (!ast)
    return <></>

  return (
    <>
      {ast.body.filter(node => node.type === "DRAW_OBJECT_EXPRESSION").map(element => {
        if (element.subtype === "PERSON")
          return <Person key={element.name} {...element.value as PersonParams} />

          if (element.subtype === "CAR")
          return <Car key={element.name} {...element.value as CarParams} />

          if (element.subtype === "TREE")
          return <Tree key={element.name} {...element.value as TreeParams} />
      })}
    </>
  )
}