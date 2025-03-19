// ProductList.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ productos, agregarAlCarrito }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8; // Productos por página en móvil
  const productosPorPaginaDesktop = 12; // Productos por página en desktop

  const productosPorMostrar = window.innerWidth <= 768 ? productosPorPagina : productosPorPaginaDesktop;

  const totalPaginas = Math.ceil(productos.length / productosPorMostrar);

  const indiceUltimoProducto = paginaActual * productosPorMostrar;
  const indicePrimerProducto = indiceUltimoProducto - productosPorMostrar;
  const productosAmostrar = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  const cambiarPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-x-auto">
        {productosAmostrar.map((producto) => (
          <div
            key={producto.name}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito} />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded-l-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-black">{`Página ${paginaActual} de ${totalPaginas}`}</span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-gray-300 text-black rounded-r-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductList;
