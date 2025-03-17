import { motion } from "framer-motion";
import { FaBoxOpen, FaBullhorn, FaStore, FaHeadset, FaShippingFast, FaUserPlus } from "react-icons/fa";

const DigitalMarketVendors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Digital Market - Vendedores</h1>
        <p className="text-lg text-gray-600 mt-2">
          Publica tus productos en nuestra plataforma y llega a más clientes.
        </p>
      </header>

      {/* Registration Card */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaUserPlus className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Regístrate Ahora</h2>
          <p className="text-gray-600 mt-2">
            Únete a nuestra comunidad de vendedores y empieza a vender hoy mismo.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://forms.gle/QDkiESFTPd6ftRpM7" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Registrarse
          </motion.a>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-5xl mx-auto text-center mt-8">
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaBoxOpen className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Publica Tus Productos</h2>
          <p className="text-gray-600 mt-2">
            Súmate sin costo y publica tus productos. Exclusivo para supermercados y almacenes. Solo se pueden agregar productos que tengan disponibilidad por al menos 6 meses. No se aceptan productos repetidos, a menos que sean superiores en calidad o precio.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://forms.gle/tPx7z6JuRQcqJpms5" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Publicar Ahora
          </motion.a>
        </div>
        
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaShippingFast className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Sistema de entregas</h2>
          <p className="text-gray-600 mt-2">
            Recibirás por WhatsApp los productos que tus clientes necesitan, con opciones de retiro en tu local o envío a domicilio. Digital Market tiene una comunidad de riders para facilitar las entregas.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Hola%2C%20quiero%20más%20información%20sobre%20el%20sistema%20de%20riders%20para%20supermercados." className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Más Información
          </motion.a>
        </div>

        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaBullhorn className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Publicidad en Tu Zona</h2>
          <p className="text-gray-600 mt-2">
            A medida que más productos se publiquen en tu área, verás inversiones en publicidad gráfica para mejorar la visibilidad de tus productos.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Hola%2C%20quiero%20más%20información%20sobre%20la%20publicidad%20en%20mi%20zona." className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Más Información
          </motion.a>
        </div>

        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaStore className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Gestión de Productos</h2>
          <p className="text-gray-600 mt-2">
            Gestiona tus productos fácilmente: agrégalos, visualízalos y edítalos cuando lo necesites. 
            No es necesario contar con delivery propio, ya que la plataforma cuenta con Riders para realizar las entregas.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Hola%2C%20quiero%20modificar%20los%20precios%20de%20mis%20productos%20publicados." className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Administrar Productos
          </motion.a>
        </div>

        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
          <FaHeadset className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-semibold mt-4">Contacto y Soporte</h2>
          <p className="text-gray-600 mt-2">
            ¿Tienes dudas o necesitas ayuda? Nuestro equipo de soporte está disponible para asistirte en cualquier momento.
          </p>
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Hola%2C%20necesito%20soporte%20para%20vendedores.%20Mi%20inconveniente%20es%3A%20______" className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Contactar Soporte
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketVendors;