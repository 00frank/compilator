import React, { useState } from 'react'
import IconCaretDown from '../../../assets/IconCaretDown'

const TreeIntro = () => {
  const [showIntro, setShowIntro] = useState(false)
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 class="text-xl font-semibold mb-2">Tipo de Objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code></h3>
          <p class="mb-4">El tipo de objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code> se utiliza para representar un árbol. Este objeto permite seleccionar el tipo de árbol (<code>type</code>) y su tamaño (<code>size</code>).</p>
        </div>
        <div className="flex justify-center items-center">
          <IconCaretDown
            className="bg-green-500/20 hover:bg-green-500/50"
            handleClick={() => setShowIntro(!showIntro)}
            active={showIntro} />
        </div>
      </div>
      <div className={`transition-all bg-green-500/10 ${showIntro ? "scale-100 block" : "scale-0 absolute"}`}>
        <h4 class="text-lg font-semibold mb-2">Creación de un Objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code></h4>

        <p class="mb-2">Para crear un objeto de tipo <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>, seguí estos pasos:</p>

        <ol class="list-decimal ml-8 mb-4">
          <li>Comenzá con la palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>.</li>
          <li>Escribí el nombre del objeto.</li>
          <li>Utiliza el signo de asignación (<code>=</code>).</li>
          <li>Proporciona la palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>.</li>
          <li>Elegí el tipo de árbol (<code>type</code>), que debe ser un valor numérico o una variable. Los valores posibles son 1 o 2. Cualquier valor diferente de 1 se considerará como 2. Si no se especifica, el tipo por defecto es 1.</li>
          <li>Opcionalmente, especifica el tamaño (<code>size</code>), que puede ser un valor numérico o una variable. El tamaño máximo permitido es 64. Si no se especifica, el tamaño por defecto es 48.</li>
        </ol>

        <p class="mb-2 font-medium">Ejemplo:</p>
        <pre class="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-[500px]">
          <code>
            TREE oakTree = TREE, 2, 50
            <br />
            TREE pineTree = TREE, typeVar
            <br />
            TREE defaultTree = TREE
          </code>
        </pre>
      </div>
    </div>
  )
}

export default TreeIntro