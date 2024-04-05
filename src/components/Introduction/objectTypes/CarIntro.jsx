import React, { useState } from 'react'
import IconCaretDown from '../../../assets/IconCaretDown'

const CarIntro = () => {
  const [showIntro, setShowIntro] = useState(false)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 class="text-xl font-semibold mb-2">Tipo de Objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code></h3>
          <p class="mb-4">El tipo de objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code> se utiliza para representar un automóvil. Este objeto también tiene propiedades personalizables como el tamaño (<code>size</code>) y el color (<code>color</code>).</p>
        </div>
        <div className="flex justify-center items-center">
          <IconCaretDown
            className="bg-blue-500/20 hover:bg-blue-500/50"
            handleClick={() => setShowIntro(!showIntro)}
            active={showIntro} />
        </div>
      </div>
      <div className={`transition-all bg-blue-500/10 ${showIntro ? "scale-100 block" : "scale-0 absolute"}`}>
        <h4 class="text-lg font-semibold mb-2">Creación de un Objeto <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code></h4>

        <p class="mb-2">Para crear un objeto de tipo <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>, sigue estos pasos:</p>

        <ol class="list-decimal ml-8 mb-4">
          <li>Comienza con la palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>.</li>
          <li>Escribe el nombre del objeto.</li>
          <li>Utiliza el signo de asignación (<code>=</code>).</li>
          <li>Proporciona la palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>.</li>
          <li>Especifica el tamaño (<code>size</code>), que puede ser un valor numérico o una variable. La altura máxima permitida es 64. Si no se especifica, el tamaño por defecto es 32.</li>
          <li>Define el color (<code>color</code>) en formato string y en inglés. Puede ser un valor directo o una variable. Si no se especifica, el color por defecto es "black".</li>
        </ol>

        <p class="mb-2 font-medium">Ejemplo:</p>
        <pre class="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-[500px]">
          <code>
            CAR myCar = CAR, 40, "red"
            <br />
            CAR anotherCar = CAR, sizeVar, colorVar
            <br />
            CAR defaultCar = CAR
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CarIntro