import { motion } from "framer-motion";
import { FaMotorcycle, FaStore, FaShoppingBag, FaHeadset, FaUserPlus } from "react-icons/fa";
import FormGoogleModal from "../components/FormGoogleModal"; // Importa el modal
import React, { useState } from "react";

const UsersDigitalMarkets = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Digital Market</h1>
        <p className="text-lg text-gray-600 mt-2">
  es una plataforma para comprar, vender y entregar productos a través de <strong>WhatsApp</strong> en negocios de Rawson, San Juan. Los usuarios pueden acceder a catálogos de supermercados, realizar pedidos, ser repartidores o vender productos, gestionando todas las transacciones en WhatsApp, <strong>sin costos</strong> adicionales.
</p>
      </header>

      {/* Main Content Section */}
      <section className="grid gap-8 max-w-3xl mx-auto">

        {/* Registration Card */}
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaUserPlus className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Regístrate Ahora</h2>
          <p className="text-gray-600 mt-2 text-center">Regístrate como usuario y accede a todos los beneficios que tenemos para ofrecerte.</p>

          <button
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200 mt-4"
            onClick={handleOpenModal}
          >
            Registrarme
          </button>

          <FormGoogleModal
            isOpen={modalOpen}
            closeModal={handleCloseModal}
            googleFormUrl="https://docs.google.com/forms/d/e/1FAIpQLSeFFFvfnzYo8ywoD3NHCNkkSBgXmdLMmMOO6dfw1QxsrrhP_g/viewform?embedded=true"
          />
        </div>

        {/* Buyer Section */}
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaShoppingBag className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Compra Productos Cerca de Ti</h2>
          <p className="text-gray-600 mt-2 text-center">
            Solo necesitas WhatsApp para acceder al catálogo de productos y comprar directamente con el dueño del negocio, con opción de envío o retiro en el local.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/"
            className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
          >
            Comprar Ahora
          </motion.a>
        </div>
{/* Vendor Section */}
<div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaStore className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">También puedes ser Vendedor</h2>
          <p className="text-gray-600 mt-2 text-center">
            Accede a más oportunidades de negocio: publica tus productos y colabora con los repartidores verificados por Digital Market para que gestionen las entregas por ti.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/vendors"
            className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
          >
            Vendedores
          </motion.a>
        </div>
        {/* Rider Section */}
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaMotorcycle className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">También puedes ser Repartidor</h2>
          <p className="text-gray-600 mt-2 text-center">
            Usa el vehículo que elijas sin ningún costo adicional y recibe pagos inmediatos después de cada entrega de los negocios asociados a Digital Market.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/riders"
            className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
          >
            Repartidores
          </motion.a>
        </div>

        

        {/* Support Section */}
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaHeadset className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Contacto y Soporte</h2>
          <p className="text-gray-600 mt-2 text-center">
            ¿Tienes dudas o necesitas ayuda? Nuestro equipo de soporte está disponible para asistirte en cualquier momento.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://wa.me/5492643183732?text=Hola%2C%20necesito%20soporte%20para%20riders.%20Mi%20inconveniente%20es%3A%20______"
            className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
          >
            Contactar Soporte
          </motion.a>
        </div>

      </section>
    </div>
  );
};

export default UsersDigitalMarkets;
