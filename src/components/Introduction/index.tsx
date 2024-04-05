import React from 'react'
import PrimitiveTypesIntro from './PrimitiveTypesIntro';
import ObjectTypesIntro from './ObjectTypesIntro';

const Introduction = () => {
  return (
    <div className="w-full transition-all md:w-1/2 lg:mr-6 lg:pt-4">
      <h2 className="text-2xl font-bold mb-4">Compilador</h2>

      <p className="mb-4">Este compilador permite la creación de objetos de tipo persona (<code className="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>) , auto (<code className="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>) y arbol (<code className="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>) mediante un mini-lenguaje creado para este fin, para luego ser mostrados por pantalla. </p>

      <PrimitiveTypesIntro />
      <ObjectTypesIntro />
    </div>
  )
}

export default Introduction