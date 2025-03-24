import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'; // Importar íconos

const Filtros = ({
  filtro,
  setFiltro,
  categorias,
  filtroCategoria,
  setFiltroCategoria,
  subcategorias,
  filtroSubcategoria,
  setFiltroSubcategoria,
  resetFiltros,
  totalResultados // Nuevo prop para el número de resultados
}) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const handleCategoriaChange = (e) => {
    setFiltroCategoria(e.target.value);
    setFiltroSubcategoria(''); // Reiniciar subcategoría al cambiar categoría
  };

  const handleSubcategoriaChange = (e) => {
    setFiltroSubcategoria(e.target.value);
    setFiltroCategoria(''); // Reiniciar categoría al cambiar subcategoría
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">{totalResultados} Productos</p> {/* Mostrar número de resultados */}
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="mt-4 flex items-center justify-center w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors duration-200"
      >
        <FaFilter className="mr-2" />
        {mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}
      </button>
      {mostrarFiltros && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categorías</label>
            <select
              value={filtroCategoria}
              onChange={handleCategoriaChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategorías</label>
            <select
              value={filtroSubcategoria}
              onChange={handleSubcategoriaChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas las subcategorías</option>
              {subcategorias.map((subcategoria, index) => (
                <option key={index} value={subcategoria}>
                  {subcategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={resetFiltros}
              className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-200"
            >
              <FaTimes className="mr-2" />
              Borrar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtros;
