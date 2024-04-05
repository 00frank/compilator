import React, { useState } from 'react'

const Introduction = () => {
  const [showIntro, setShowIntro] = useState(false)
  return (
    <div className="w-full md:w-72 lg:w-[42rem] lg:mr-6 lg:pt-4">
      <h2 className="text-2xl font-bold mb-4">Compilador</h2>

      <p className="mb-4">Este compilador permite la creación de objetos de tipo persona (<code className="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>) , auto (<code className="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>) y arbol (<code className="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>) mediante un mini-lenguaje creado para este fin, para luego ser mostradas por pantalla. Primero una pequeña instrucción a los tipos primitivos, (<code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>) y (<code className="bg-gray-100 text-gray-800 p-1 rounded">STRING</code>) que luego seran utilizados para personalizar los distintos tipos de objetos.</p>

      <h3 className="text-xl font-semibold mb-2">Creación de Variables de tipo primitivo</h3>
      <p className="mb-4">
        A continuación, se describen los pasos para trabajar con estas variables.
      </p>
      <h4 className="text-lg font-semibold mb-2">Tipo Entero (<code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>)</h4>

      <p className="mb-2">Para crear una variable de tipo entero, sigue estos pasos:</p>

      <ol className="list-decimal ml-8 mb-4">
        <li>Comienza con la palabra clave <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>.</li>
        <li>Escribe el nombre de la variable.</li>
        <li>Utiliza el signo de asignación (<code className="bg-gray-100 text-gray-800 p-1 rounded">=</code>).</li>
        <li>Proporciona un valor entero o una expresión matemática que devuelva un entero.</li>
      </ol>

      <p className="mb-2 font-medium">Ejemplo:</p>
      <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4">
        <code>
          INT miNumero = 10
          <br />
          INT otroNumero = 5 + 3
        </code>
      </pre>

      <h3 className="text-xl font-semibold mb-2">Operaciones Matemáticas con Variables de Tipo <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code></h3>

      <p className="mb-2">Puedes realizar operaciones matemáticas básicas (suma, resta, multiplicación, división) con variables de tipo <code className="bg-gray-100 text-gray-800 p-1 rounded">INT</code>. Utiliza los operadores <code className="bg-gray-100 text-gray-800 p-1 rounded">+</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">-</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">*</code>, <code className="bg-gray-100 text-gray-800 p-1 rounded">/</code> para estas operaciones.</p>

      <p className="mb-2 font-medium">Ejemplo:</p>
      <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4"><code>
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
      <pre className="bg-gray-100 text-gray-800 p-3 rounded mb-4">
        <code>
          STRING miCadena = "Hola Mundo"
          <br />
          STRING saludo = "Buenos días"
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
  )
}

export default Introduction