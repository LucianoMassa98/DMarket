import { motion } from "framer-motion";
import { FaMotorcycle, FaStore, FaShoppingBag, FaShippingFast } from "react-icons/fa";

const DigitalMarketRiders = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Digital Market - Riders</h1>
        <p className="text-lg text-gray-600 mt-2">
          Trabaja como Rider de tu propio negocio o de alguien más, sin costo. Te pondremos en contacto con un negocio en especial y podrás solicitar el cambio de negocio cuando quieras.
        </p>
      </header>

      {/* Main Section */}
      <section className="max-w-5xl mx-auto text-center">
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
  <FaShippingFast className="text-green-500 text-6xl" />
  <h2 className="text-2xl font-semibold mt-4">Sistema de Entregas para Repartidores</h2>
  <p className="text-gray-600 mt-2">
    Únete a nuestro grupo de WhatsApp y empieza a realizar entregas para los negocios registrados en Digital Market. Los repartidores son verificados por nuestra plataforma, lo que garantiza un servicio seguro y eficiente.
  </p>
  <motion.a 
    whileHover={{ scale: 1.05 }} 
    href="https://chat.whatsapp.com/FApFjxE2qRy5VlcK4NJvY5" 
    className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
  >
    Únete al Grupo de Repartidores
  </motion.a>
</div>

        
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaShoppingBag className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Equipamiento Oficial</h2>
          <p className="text-gray-600 mt-2">
            Adquiere nuestra mochila de transporte, camperas o remeras con la marca oficial para mejorar tu experiencia como Rider.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Quiero%20conocer%20más%20información%20sobre%20el%20equipamiento%20de%20riders%20en%20Digital%20Market" className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Ver Productos
          </motion.a>
        </div>

      </section>
    </div>
  );
};

export default DigitalMarketRiders;