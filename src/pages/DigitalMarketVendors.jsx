import { motion } from "framer-motion";
import { FaBoxOpen, FaBullhorn, FaStore, FaHeadset, FaShippingFast, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import FormGoogleModal from "../components/FormGoogleModal";

const DigitalMarketVendors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState("");

  const openModal = (url) => {
    setGoogleFormUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGoogleFormUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Vendedores</h1>
        <p className="text-lg text-gray-600 mt-2">
          Publica tus productos en nuestra plataforma y llega a más clientes. 
        </p>
      </header>

      {/* Main Section */}
      <section className="max-w-5xl mx-auto text-center mt-2">
    
        {/* Publicar Producto */}
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaBoxOpen className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Publicar Producto</h2>
          <p className="text-gray-600 mt-2 text-center">
            Publicar producto sin costo, solo debes estar registrado como usuario.
            <br />
            <strong>
              <a href="/users" className="text-green-700 hover:underline">
                Volver a Registrarte
              </a>
            </strong>.
          </p>
          <button
          onClick={() => openModal("https://forms.gle/tPx7z6JuRQcqJpms5")}
          className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
        >
          Publicar
        </button>
        </div>

        {/* Modal */}
        <FormGoogleModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          googleFormUrl={googleFormUrl}
        />
      </section>

      {/* Publicidad en Tu Zona */}
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
        <FaBullhorn className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold mt-4">Publicidad en Tu Zona</h2>
        <p className="text-gray-600 mt-2">
          Panfletos gratuitos en su zona sin costos iniciales. Regístrate y nosotros renovamos los panfletos y optimizamos los puntos estratégicos para los QR.
        </p>
      </div>

      {/* Posicionamiento de Productos */}
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
        <FaBullhorn className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold mt-4">Posicionamiento de Productos</h2>
        <p className="text-gray-600 mt-2">
          Aumenta la visibilidad de tus productos en nuestra plataforma. Solicita ubicarlos entre las primeras 16 posiciones con un precio preferencial.
        </p>
        <button
          onClick={() => openModal("https://forms.gle/tPx7z6JuRQcqJpms5")}
          className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
        >
          Solicitar Posicionamiento
        </button>
      </div>

      {/* Publicidad Pagada en Meta */}
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
        <FaBullhorn className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold mt-4">Publicidad Pagada en Meta</h2>
        <p className="text-gray-600 mt-2">
        Con presupuestos flexibles. Cobramos solo el 15% por la gestión, mostrando la factura original de Meta Business.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          href="https://wa.me/5492643183732?text=Hola%2C%20quiero%20más%20información%20sobre%20la%20publicidad%20en%20Meta." 
          className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
        >
          Más Información
        </motion.a>
      </div>

      {/* Sistema de Entregas */}
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
        <FaShippingFast className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold mt-4">Sistema de Entregas</h2>
        <p className="text-gray-600 mt-2">
          Tendrás a tu disposición un grupo de WhatsApp con repartidores verificados por Digital Market para facilitar las entregas de tus productos.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          href="https://chat.whatsapp.com/FApFjxE2qRy5VlcK4NJvY5" 
          className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
        >
          Busca Repartidores
        </motion.a>
      </div>

      {/* Gestión de Productos */}
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
        <FaStore className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold mt-4">Gestión de Productos</h2>
        <p className="text-gray-600 mt-2">
Edita tus productos cuando lo necesites dejando un comentario en la hoja de cálculo. Un operador verificará y aprobará los cambios como usuario vendedor.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          href="https://docs.google.com/spreadsheets/d/1oxRTbNzsy7ff8pVewThlLwiRGubZVBsu-WaF17sS5hI/edit?usp=sharing" 
          className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
        >
          Editar Productos
        </motion.a>
      </div>
    </div>
  );
};

export default DigitalMarketVendors;