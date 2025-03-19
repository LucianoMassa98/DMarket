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

  
      {/* Main Section */}
      <section className="max-w-5xl mx-auto text-center mt-8">
      <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center">
  <FaBoxOpen className="text-green-500 text-6xl" />
  <h2 className="text-2xl font-semibold mt-4">Publica Tus Productos</h2>
  <p className="text-gray-600 mt-2 text-center">
    Súmate sin costo y publica tus productos. Exclusivo para supermercados y almacenes. Solo se pueden agregar productos que tengan disponibilidad por al menos 6 meses. No se aceptan productos repetidos, a menos que sean superiores en calidad o precio.  
    <br />
    <strong>
      <a href="/users" className="text-green-700 hover:underline">
        Debes estar registrado como usuario
      </a>
    </strong>.
  </p>
  <motion.a 
    whileHover={{ scale: 1.05 }} 
    href="https://forms.gle/tPx7z6JuRQcqJpms5" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
  >
    Publicar Ahora
  </motion.a>
</div>

        
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
          <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/5492643183732?text=Hola%2C%20quiero%20administrar%20mis%20productos%20cargados%20en%20Digital%20Market" className="mt-4 px-6 py-3 text-lg bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
            Administrar Productos
          </motion.a>
        </div>

      </section>
    </div>
  );
};

export default DigitalMarketVendors;