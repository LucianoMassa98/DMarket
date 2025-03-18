import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import Ofertas from "./components/Ofertas";
import ProductList from "./components/ProductList";
import Services from "./components/Services";
import Footer from "./components/Footer";
import About from "./pages/About";
import Cart from './components/Cart';

import DigitalMarketVendors from "./pages/DigitalMarketVendors";
import DigitalMarketRiders from "./pages/DigitalMarketRiders";

import useProductsData from "../src/hooks/useProductsData";
import useVendorsData from "../src/hooks/useVendorsData";




const App = () => {


  const { productsData} = useProductsData();
  const { vendorsData} = useVendorsData();

  const productos = productsData;
 
const [carrito, setCarrito] = useState([]);

// Función para agregar productos al carrito
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

// Función para eliminar productos del carrito
const eliminarDelCarrito = (productoId) => {
  setCarrito(carrito.filter(producto => producto.id !== productoId));
};

// Filtrar productos según el nombre (por ejemplo)
const [filtro, setFiltro] = useState('');

const filtrarProductos = () => {
  const filtroNormalizado = filtro.trim().toLowerCase();
  if (!filtroNormalizado) return productos; // Si el filtro está vacío, devuelve todos los productos

  return productos.filter(producto => {
    const valores = [
      producto.name,
      producto.brand,
      producto.category,
      producto.subcategory,
      producto.id.toString(),
      producto.descripcion
    ].map(valor => valor?.toString().trim().toLowerCase()); // Normaliza valores

    return valores.some(valor => valor.includes(filtroNormalizado)); // Compara con el filtro
  });
};



  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="bg-secondary min-h-screen">
              <Services />
              <Ofertas />
              <div className="p-6">
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ProductList productos={filtrarProductos()} agregarAlCarrito={agregarAlCarrito} />
              <Cart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} vendors={vendorsData}/>
            </div>
            </main>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/vendors" element={<DigitalMarketVendors />} />
        <Route path="/riders" element={<DigitalMarketRiders />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
