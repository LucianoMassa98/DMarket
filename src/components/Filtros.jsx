import React, { useState } from 'react';

const Filtros = ({ filtro, setFiltro, productos }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [customFilter, setCustomFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros adicionales

  // Obtener las opciones únicas de marcas, categorías y subcategorías de los productos
  const brands = [...new Set(productos.map(producto => producto.brand))];
  const categories = [...new Set(productos.map(producto => producto.category))];
  const subcategories = [...new Set(productos.map(producto => producto.subcategory))];

  // Manejar los cambios en los filtros de marca, categoría y subcategoría
  const handleFilterChange = () => {
    let filtroAplicado = '';
    if (selectedBrand) filtroAplicado += selectedBrand;
    if (selectedCategory) filtroAplicado += selectedCategory;
    if (selectedSubcategory) filtroAplicado += selectedSubcategory;
    if (customFilter) filtroAplicado += `${customFilter} `;
    setFiltro(filtroAplicado.trim());
  };

  // Manejar la selección de marca
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    handleFilterChange(); // Actualizar el filtro inmediatamente
  };

  // Manejar la selección de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    handleFilterChange(); // Actualizar el filtro inmediatamente
  };

  // Manejar la selección de subcategoría
  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    handleFilterChange(); // Actualizar el filtro inmediatamente
  };

  return (
    <div className="p-4 bg-green-500 rounded-lg shadow-md">
      {/* Filtro de texto */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="p-2 w-full rounded-md text-black mb-4"
      />

      {/* Botón para mostrar/ocultar filtros con iconos */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-black text-white p-2 rounded-md mb-4 w-full flex justify-between items-center"
      >
        <span>{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}</span>
        <span className="ml-2">
          {showFilters ? '▲' : '▼'} {/* Flechas hacia arriba y abajo */}
        </span>
      </button>

      {/* Filtros desplegables */}
      {showFilters && (
        <div>
          {/* Filtro por categoría */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-white mb-2">Categoría</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 w-full rounded-md"
            >
              <option value="">Seleccionar Categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Filtro por subcategoría */}
          <div className="mb-4">
            <label htmlFor="subcategory" className="block text-white mb-2">Subcategoría</label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="p-2 w-full rounded-md"
            >
              <option value="">Seleccionar Subcategoría</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>

          {/* Filtro por marca */}
          <div className="mb-4">
            <label htmlFor="brand" className="block text-white mb-2">Marca</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="p-2 w-full rounded-md"
            >
              <option value="">Seleccionar Marca</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtros;
