import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ productos, agregarAlCarrito }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorMostrar, setProductosPorMostrar] = useState(12); // Por defecto, versión desktop

  useEffect(() => {
    // Detectar si el usuario está en móvil o desktop para ajustar la cantidad de productos por página
    const actualizarProductosPorPagina = () => {
      setProductosPorMostrar(window.innerWidth <= 768 ? 8 : 12);
    };

    actualizarProductosPorPagina();
    window.addEventListener('resize', actualizarProductosPorPagina);

    return () => window.removeEventListener('resize', actualizarProductosPorPagina);
  }, []);

  const totalPaginas = Math.ceil(productos.length / productosPorMostrar);

  // Asegurar que la página actual no esté fuera del rango cuando cambia la cantidad de productos
  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas || 1);
    }
  }, [productos, totalPaginas]);

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
      {productos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-4">No hay productos encontrados.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {productosAmostrar.map((producto) => (
              <div
                key={producto.id}
                className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito} />
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
