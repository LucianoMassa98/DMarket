import React from 'react';
import { FaStore, FaTruck } from 'react-icons/fa'; // Importamos los iconos

const Services = () => {
  return (
    <div className="py-6 px-6 bg-gray-100">
      <div className="max-w-7xl  grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Compras y Retiro Local */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center space-x-4">
          <FaStore className="text-green-500" style={{ width: '50px', height: '50px' }} /> {/* Icono grande */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compra y Retira</h3>
            <p className="text-gray-600 text-sm">
            Compra en línea y retira de manera rápida en nuestros locales adheridos.            </p>
          </div>
        </div>

        {/* Card 2: Envíos */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center space-x-4">
          <FaTruck className="text-green-500" style={{ width: '50px', height: '50px' }} /> {/* Icono grande */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Envíos a Domicilio</h3>
            <p className="text-gray-600 text-sm">
            Recibe tu pedido en la comodidad de tu hogar y realiza el pago al recibirlo de nuestros repartidores.                        </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
