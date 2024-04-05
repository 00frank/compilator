import React from 'react'
import PersonIntro from './objectTypes/PersonIntro'
import CarIntro from './objectTypes/CarIntro'
import TreeIntro from './objectTypes/TreeIntro'
import DrawFunctionIntro from './DrawFunctionIntro'

const ObjectTypesIntro = () => {
  return (
    <>
      <PersonIntro />
      <CarIntro />
      <TreeIntro />
      <hr />
      <DrawFunctionIntro />
      <hr />
      <h3 class="text-xl font-semibold mb-2">Notas finales</h3>
      <ul class="list-disc ml-8 mb-4">
        <li>
          Los tipos de objeto reservados (
          <code class="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>,{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>,{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>) son los únicos tipos de objeto permitidos. No se pueden crear nuevos tipos de objeto.
        </li>
        <li>Para los tipos{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code> y{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>, tanto el <code>(size)</code> como el <code>(color)</code> son opcionales y tienen valores por defecto si no se especifican.
        </li>
        <li>
          Para el tipo{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>, tanto el <code>(type)</code> como el <code>(size)</code> son opcionales, y también tienen valores por defecto si no se especifican. 
        </li>
        <li>La palabra clave{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>,{" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code> o {" "}
          <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>{" "}
          debe usarse tanto al inicio como en la asignación del objeto, dependiendo su caso. Esto es necesario, ya que deben heredar las propiedades por defecto de su tipo. Caso contrario, el compilador mostrará un error.
          </li>
      </ul>
    </>
  )
}

export default ObjectTypesIntro