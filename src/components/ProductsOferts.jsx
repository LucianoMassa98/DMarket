import React from 'react';
import useFeaturedProducts from "../hooks/useFeaturedProducts";

const ProductOferts = ({ agregarAlCarrito }) => {
    // Uso del hook personalizado para obtener los datos de productos destacados
    const { productOfertsData, loading: loadingProducts, error } = useFeaturedProducts();

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loadingProducts) return <p>Cargando productos...</p>;
    // Muestra un mensaje de error si ocurre un problema al cargar los datos
    if (error) return <p>Error al cargar productos</p>;

    return (
        // Renderiza una cuadrícula de productos
        <div className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {productOfertsData.map((producto) => (
                <div key={producto.id} className="border p-4 rounded-lg shadow-md">
                    {/* Imagen del producto */}
                    <img src={producto.img} alt={producto.name} className="w-full h-40 object-cover mb-2 rounded" />
                    {/* Nombre del producto */}
                    <h3 className="text-lg font-semibold">{producto.name}</h3>
                    {/* Descripción del producto */}
                    <p className="text-gray-600">{producto.descripcion}</p>
                    {/* Precio del producto */}
                    <p className="text-green-600 font-bold">${producto.price}</p>
                    {/* Botón para agregar al carrito */}
                    <button 
                        onClick={() => agregarAlCarrito(producto)} 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductOferts;
