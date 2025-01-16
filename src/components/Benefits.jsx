import React from "react";
import { FaMoneyBillAlt, FaHandshake, FaUsers, FaBullhorn } from "react-icons/fa";

const Benefits = () => {
  return (
    <section className="bg-white py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-orange-600 mb-12">Beneficios para Todos</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Beneficio Profesional */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaMoneyBillAlt className="text-orange-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Gana Desde Casa</h3>
          <p className="text-gray-700">Los profesionales pueden ganar dinero ofreciendo sus servicios y trabajando a su propio ritmo.</p>
        </div>

        {/* Beneficio Profesional */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaUsers className="text-orange-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Amplía Tu Red</h3>
          <p className="text-gray-700">Conecta con clientes de diferentes sectores y crea una red de contactos profesionales.</p>
        </div>

        {/* Beneficio Cliente */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaHandshake className="text-orange-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Contrata con Confianza</h3>
          <p className="text-gray-700">Accede a una lista de profesionales verificados para realizar trabajos de calidad.</p>
        </div>

        {/* Beneficio Cliente */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaBullhorn className="text-orange-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Visibilidad y Alcance</h3>
          <p className="text-gray-700">Los clientes pueden acceder a una plataforma que les permite contratar los mejores profesionales rápidamente.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
