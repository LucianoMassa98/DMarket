import React, { useState } from "react";
import { FaAndroid, FaApple } from "react-icons/fa"; // Para los íconos de Android e iPhone

const AddToHome = () => {
  // Estado para controlar la visibilidad de las secciones
  const [isAndroidOpen, setIsAndroidOpen] = useState(false);
  const [isIphoneOpen, setIsIphoneOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-10">
      <div className="relative bg-gradient-to-r from-green-600 to-black p-8 rounded-lg shadow-2xl max-w-3xl w-full">
        
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">Instala Digital Market en tu móvil</h1>

        {/* Descripción general */}
        <p className="text-lg text-gray-200 text-center mb-8">Sigue estos pasos fáciles para agregar nuestra app a tu pantalla de inicio en tu dispositivo Android o iPhone.</p>

        {/* Sección para Android */}
        <div className="bg-white p-6 rounded-lg mb-6 shadow-lg">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsAndroidOpen(!isAndroidOpen)}
          >
            <div className="flex items-center">
              <FaAndroid className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-semibold text-green-600">Instrucciones para Android</h2>
            </div>
            <span className={`text-2xl ${isAndroidOpen ? 'text-red-600' : 'text-gray-600'}`}>
              {isAndroidOpen ? '−' : '+'}
            </span>
          </div>
          
          {/* Desplegable */}
          {isAndroidOpen && (
            <div className="text-gray-800 text-lg mt-4">
              <ol className="list-decimal pl-6 space-y-3">
                <li>Toca el icono de tres puntos en la esquina superior derecha.</li>
                <li>En el menú, selecciona "Agregar a pantalla de inicio".</li>
                <li>Escribe un nombre para el acceso directo y toca "Agregar".</li>
              </ol>
              <p className="mt-4 text-green-600">¡Listo! Ahora puedes acceder a nuestra app desde tu pantalla de inicio.</p>
            </div>
          )}
        </div>

        {/* Sección para iPhone */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsIphoneOpen(!isIphoneOpen)}
          >
            <div className="flex items-center">
              <FaApple className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-semibold text-green-600">Instrucciones para iPhone</h2>
            </div>
            <span className={`text-2xl ${isIphoneOpen ? 'text-red-600' : 'text-gray-600'}`}>
              {isIphoneOpen ? '−' : '+'}
            </span>
          </div>

          {/* Desplegable */}
          {isIphoneOpen && (
            <div className="text-gray-800 text-lg mt-4">
              <ol className="list-decimal pl-6 space-y-3">
                
                <li>Toca el icono de compartir en la parte inferior (el cuadrado con la flecha hacia arriba).</li>
                <li>En el menú, selecciona "Agregar a pantalla de inicio".</li>
                <li>Escribe un nombre para el acceso directo y toca "Agregar".</li>
              </ol>
              <p className="mt-4 text-green-600">¡Listo! Ahora puedes acceder a nuestra app desde tu pantalla de inicio.</p>
            </div>
          )}
        </div>

        {/* Conclusión */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">¡Gracias por usar nuestra app!</h2>
          <p className="text-lg text-gray-200">
            Si tienes alguna duda, no dudes en contactarnos. ¡Disfruta de la experiencia de la app!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToHome;
 