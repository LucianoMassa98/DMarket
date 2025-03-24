import { useState, useMemo, useCallback } from 'react';

const useProductFilters = (productos) => {
  const [filtro, setFiltro] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('');

  const categorias = useMemo(() => {
    const categoriasUnicas = new Set(productos.map(p => p.category).filter(Boolean));
    if (filtroSubcategoria) {
      return [...categoriasUnicas].filter(categoria =>
        productos.some(p => p.category === categoria && p.subcategory === filtroSubcategoria)
      );
    }
    return [...categoriasUnicas].sort((a, b) => a.localeCompare(b));
  }, [productos, filtroSubcategoria]);

  const subcategorias = useMemo(() => {
    const subcategoriasUnicas = new Set(productos.map(p => p.subcategory).filter(Boolean));
    if (filtroCategoria) {
      return [...subcategoriasUnicas].filter(subcategoria =>
        productos.some(p => p.subcategory === subcategoria && p.category === filtroCategoria)
      );
    }
    return [...subcategoriasUnicas].sort((a, b) => a.localeCompare(b));
  }, [productos, filtroCategoria]);

  const productosFiltrados = useMemo(() => {
    const filtroNormalizado = filtro.trim().toLowerCase();
    const productosBase = filtroNormalizado
      ? productos.filter(producto => {
          const valores = [
            producto.name,
            producto.category,
            producto.subcategory,
            producto.descripcion,
            producto.brand,
            producto.email
          ].map(valor => valor?.toString().trim().toLowerCase());
          return valores.some(valor => valor.includes(filtroNormalizado));
        })
      : productos;

    return productosBase
      .filter(producto => {
        const coincideCategoria = !filtroCategoria || producto.category === filtroCategoria;
        const coincideSubcategoria = !filtroSubcategoria || producto.subcategory === filtroSubcategoria;

        return coincideCategoria && coincideSubcategoria;
      })
      .sort((a, b) => a.originalOrder - b.originalOrder); // Ordenar por el orden original
  }, [productos, filtro, filtroCategoria, filtroSubcategoria]);

  const resetFiltros = useCallback(() => {
    setFiltro('');
    setFiltroCategoria('');
    setFiltroSubcategoria('');
  }, []);

  return {
    filtro,
    setFiltro,
    filtroCategoria,
    setFiltroCategoria,
    filtroSubcategoria,
    setFiltroSubcategoria,
    categorias,
    subcategorias,
    productosFiltrados,
    resetFiltros
  };
};

export default useProductFilters;
