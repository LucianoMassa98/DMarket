// React y dependencias principales
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Componentes generales
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"; // Componente de carga

// Componentes específicos de la página principal
import Filtros from "./components/Filtros";
import Ofertas from "./components/Ofertas";
import ProductList from "./components/ProductList";
import Services from "./components/Services";
import Cart from './components/Cart';

// Páginas
import About from "./pages/About";
import DigitalMarketVendors from "./pages/DigitalMarketVendors";
import DigitalMarketRiders from "./pages/DigitalMarketRiders";
import UsersDigitalMarkets from "./pages/UsersDigitalMarkets";
import AddToHome from "./pages/AddToHome";

// Hooks personalizados
import useProductsData from "../src/hooks/useProductsData";
import useVendorsData from "../src/hooks/useVendorsData";
import useProductFilters from './hooks/useProductFilters';

const App = () => {
  const { productsData, loading: loadingProducts, error } = useProductsData();
  const { vendorsData, loading: loadingVendors } = useVendorsData(); // Añadimos loading para vendors

  // Aseguramos que useProductFilters se llame siempre, incluso si los datos aún no están cargados
  const {
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
  } = useProductFilters(productsData || []); // Pasamos un array vacío si los datos no están listos

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + producto.cantidad } : item
        );
      } else {
        return [...prevCarrito, producto];
      }
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(producto => producto.id !== productoId));
  };

  if (loadingProducts || loadingVendors) { // Verificamos si cualquiera de los datos está cargando
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error al cargar los productos: {error.message}</div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="bg-secondary min-h-screen">
              {/* <Services /> */} {/* Componente comentado */}
              <Ofertas />
              <div className="p-6">
                <Filtros
                  filtro={filtro}
                  setFiltro={setFiltro}
                  categorias={categorias}
                  filtroCategoria={filtroCategoria}
                  setFiltroCategoria={setFiltroCategoria}
                  subcategorias={subcategorias}
                  filtroSubcategoria={filtroSubcategoria}
                  setFiltroSubcategoria={setFiltroSubcategoria}
                  resetFiltros={resetFiltros}
                  totalResultados={productosFiltrados.length} // Pasar el número de resultados
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg" // Mejora de estilos
                />
                <ProductList productos={productosFiltrados} agregarAlCarrito={agregarAlCarrito} />
                <Cart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} vendors={vendorsData} />
              </div>
            </main>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UsersDigitalMarkets />} />
        <Route path="/vendors" element={<DigitalMarketVendors />} />
        <Route path="/riders" element={<DigitalMarketRiders />} />
        <Route path="/app" element={<AddToHome />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
