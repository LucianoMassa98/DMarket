import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const ProductCard = ({ producto, agregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1); // Asegura que siempre hay un valor numérico

  const handleCantidadChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === "" || (Number.isInteger(parsedValue) && parsedValue > 0)) {
      setCantidad(value === "" ? "" : parsedValue); // Permitir vacío temporalmente
    }
  };

  const handleBlur = () => {
    // Si el usuario deja el input vacío, se vuelve a establecer en 1
    if (cantidad === "" || cantidad < 1) {
      setCantidad(1);
    }
  };

  const handleAgregarAlCarrito = () => {

    const cantidadFinal = cantidad === "" ? 1 : cantidad;
    agregarAlCarrito({...producto, cantidad:cantidadFinal });
  };

  return (
    <div className="bg-white p-0 rounded-lg">
      <img
        src={producto.img}
        alt={producto.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{producto.name}</h3>
        <p className="text-gray-300 text-sm">
          {producto.category} - {producto.subcategory}
        </p>
        <p className="text-gray-500 text-sm">
          {producto.tags || "Descripción no disponible"}
        </p>
        <p className="text-xl font-bold mt-2">${producto.price}</p>

        <div className="mt-4 flex items-center justify-between">
          {/* Selector de cantidad */}
          <input
            type="number"
            value={cantidad}
            onChange={handleCantidadChange}
            onBlur={handleBlur}
            className="w-16 p-2 border border-gray-300 rounded-md text-center"
            min="1"
          />

          {/* Botón de agregar al carrito */}
          <button
            onClick={handleAgregarAlCarrito}
            className="bg-green-800 text-white py-2 px-4 rounded-md mt-0 ml-4"
          >
            🛒 Agregar
          </button>
        </div>

        {/* Flecha para ir a la página de detalles del producto 
        <div
          className="mt-4 flex items-center text-blue-600 cursor-pointer"
          onClick={() => (window.location.href = `/detalles/${producto.id}`)}
        >
          <FaArrowRight className="w-5 h-5" />
          <span className="ml-2">Ver más detalles</span>
        </div>
        
        */}
        
      </div>
    </div>
  );
};

export default ProductCard;
