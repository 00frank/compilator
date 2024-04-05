import React from 'react'

const DrawFunctionIntro = () => {
  return (
    <div className="p-2">
      <h3 class="text-xl font-semibold mb-2">Función <code class="bg-gray-100 text-gray-800 p-1 rounded">draw()</code></h3>

      <p class="mb-4">La función <code class="bg-gray-100 text-gray-800 p-1 rounded">draw()</code> se utiliza para dibujar en pantalla uno de los tres tipos de objetos reservados: <code class="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>, <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code> o <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>. Esta función toma un solo parámetro, que es una referencia a uno de estos objetos.</p>

      <h4 class="text-lg font-semibold mb-2">Uso de <code class="bg-gray-100 text-gray-800 p-1 rounded">draw()</code></h4>

      <p class="mb-2">Para utilizar la función <code class="bg-gray-100 text-gray-800 p-1 rounded">draw()</code>, sigue estos pasos:</p>

      <ol class="list-decimal ml-8 mb-4">
        <li>Utiliza la palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">DRAW</code>.</li>
        <li>Entre paréntesis, coloca el nombre del objeto que deseas dibujar.</li>
      </ol>

      <p class="mb-2 font-medium">Ejemplo:</p>
      <pre class="bg-gray-100 text-gray-800 p-3 rounded mb-4 max-w-[500px]">
        <code>
          DRAW(johnDoe)
          <br />
          DRAW(myCar)
          <br />
          DRAW(oakTree)
        </code>
      </pre>

      <h3 class="text-xl font-semibold mb-2">Notas Importantes</h3>

      <ul class="list-disc ml-8 mb-4">
        <li>La función <code class="bg-gray-100 text-gray-800 p-1 rounded">draw()</code> solo puede usarse con los objetos <code class="bg-gray-100 text-gray-800 p-1 rounded">PERSON</code>, <code class="bg-gray-100 text-gray-800 p-1 rounded">CAR</code>, y <code class="bg-gray-100 text-gray-800 p-1 rounded">TREE</code>.</li>
        <li>Es importante que el objeto pasado como parámetro haya sido definido previamente.</li>
        <li>La palabra clave <code class="bg-gray-100 text-gray-800 p-1 rounded">draw</code> debe usarse seguida de paréntesis que contienen el nombre del objeto a dibujar.</li>
      </ul>
    </div>
  )
}

export default DrawFunctionIntro