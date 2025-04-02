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
import Cart from './components/Cart';

// Páginas
import About from "./pages/About";
import DigitalMarketVendors from "./pages/DigitalMarketVendors";
import DigitalMarketRiders from "./pages/DigitalMarketRiders";
import UsersDigitalMarkets from "./pages/UsersDigitalMarkets";
import AddToHome from "./pages/AddToHome";
import Support from "./pages/Support"; // Importar la nueva página de soporte
import Note from "./pages/Note"; // Importar la nueva página Note

// Hooks personalizados
import useProductsData from "../src/hooks/useProductsData";
import useVendorsData from "../src/hooks/useVendorsData";
import useProductFilters from './hooks/useProductFilters';

const App = () => {
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

  const renderHomePage = () => {
    const { productsData, loading: loadingProducts, error } = useProductsData();
    const { vendorsData, loading: loadingVendors } = useVendorsData();

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
    } = useProductFilters(productsData || []);

    if (loadingProducts || loadingVendors) {
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
      <main className="bg-secondary min-h-screen">
        <Ofertas />
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
          totalResultados={productosFiltrados.length}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg"
        />
        <ProductList productos={productosFiltrados} agregarAlCarrito={agregarAlCarrito} />
        <Cart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} vendors={vendorsData} />
      </main>
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UsersDigitalMarkets />} />
        <Route path="/vendors" element={<DigitalMarketVendors />} />
        <Route path="/riders" element={<DigitalMarketRiders />} />
        <Route path="/app" element={<AddToHome />} />
        <Route path="/support" element={<Support />} /> {/* Nueva ruta para soporte */}
        <Route path="/note/:tokenId" element={<Note />} /> {/* Nueva ruta para Note */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
