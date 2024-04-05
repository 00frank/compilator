import React, { useState } from 'react'
import IconCaretDown from "../../assets/IconCaretDown";

const PrimitiveTypesIntro = () => {
  const [showIntro, setShowIntro] = useState(false)

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">Creación de Variables de tipo primitivo</h3>
          <p className="mb-4">
            Primero una pequeña instrucción a los tipos primitivos, (<code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>) y (<code className="bg-gray-100 text-gray-800 p-1 rounded">STRING</code>) que posiblemente los utilices para personalizar los distintos tipos de objetos.
            A continuación, se describen los pasos para trabajar con estas variables.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <IconCaretDown
            className="bg-slate-100/10 hover:bg-slate-100/50"
            handleClick={() => setShowIntro(!showIntro)}
            active={showIntro} />
        </div>
      </div>
      <div className={`transition-all bg-slate-100/10 ${showIntro ? "scale-100 block" : "scale-0 absolute"}`}>
        <h4 className="text-lg font-semibold mb-2">Tipo Numérico (<code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>)</h4>

        <p className="mb-2">Para crear una variable de tipo numérico, sigue estos pasos:</p>

        <ol className="list-decimal ml-8 mb-4">
          <li>Comienza con la palabra clave <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>.</li>
          <li>Escribe el nombre de la variable.</li>
          <li>Utiliza el signo de asignación (<code className="bg-gray-100 text-gray-800 p-1 rounded">=</code>).</li>
          <li>Proporciona un valor entero o una expresión matemática de un solo operador que devuelva un número.</li>
        </ol>

        <p className="mb-2 font-medium">Ejemplo:</p>
        <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-96">
          <code>
            INT miNumero = 10
            <br />
            INT alturaProfesor = 15 + 3
          </code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Operaciones Matemáticas con Variables de Tipo <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code></h3>

        <p className="mb-2">Puedes realizar operaciones matemáticas básicas (suma, resta, multiplicación, división) con variables de tipo <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>. Utiliza los operadores <code className="bg-gray-100 text-gray-800 p-1 rounded">+</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">-</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">*</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">/</code> para estas operaciones.</p>

        <p className="mb-2 font-medium">Ejemplo:</p>
        <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-96"><code>
          INT a = 5
          <br />
          INT b = 10
          <br />
          INT resultadoSuma = a + b
          <br />
          INT resultadoResta = a - b
        </code></pre>

        <h4 className="text-lg font-semibold mb-2">Tipo Cadena de Texto (<code className="bg-gray-100 text-gray-800 p-1 rounded">STRING</code>)</h4>

        <p className="mb-2">Para crear una variable de tipo cadena de texto, sigue estos pasos:</p>

        <ol className="list-decimal ml-8 mb-4">
          <li>Comienza con la palabra clave <code className="bg-gray-100 text-gray-800 p-1 rounded">STRING</code>.</li>
          <li>Escribe el nombre de la variable.</li>
          <li>Utiliza el signo de asignación (<code className="bg-gray-100 text-gray-800 p-1 rounded">=</code>).</li>
          <li>Proporciona un valor de cadena entre comillas dobles (<code className="bg-gray-100 text-gray-800 p-1 rounded">"</code>).</li>
        </ol>

        <p className="mb-2 font-medium">Ejemplo:</p>
        <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-96">
          <code>
            STRING miCadena = "Hola Mundo"
            <br />
            STRING colorAuto = "grey"
          </code>
        </pre>

        <hr />
        <h3 className="text-xl font-semibold mb-2">Notas Importantes</h3>

        <ul className="list-disc ml-8 mb-4">
          <li>Asegúrate de seguir la sintaxis correcta al definir variables. Cualquier error de sintaxis puede resultar en un error de compilación.</li>
          <li>Este lenguaje distingue entre mayúsculas y minúsculas, así que <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code> y <code className="bg-gray-100 text-gray-800 p-1 rounded">int</code> serían considerados diferentes.</li>
          <li>Las operaciones matemáticas sólo se aplican a variables de tipo <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>.</li>
        </ul>
      </div>
    </>
  )
}

export default PrimitiveTypesIntro