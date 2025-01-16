import React, { useState } from "react";
import { FaGoogle, FaHandshake, FaCogs, FaBullhorn } from "react-icons/fa";

const PreLaunchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Función para cerrar el modal si el clic es fuera del mismo
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center justify-center py-16 text-white">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4">OFIX está llegando a San Juan</h1>
        <p className="text-xl">¡Prepárate para una nueva forma de contratar y ofrecer servicios para el hogar!</p>
      </div>

      {/* Call to action */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mx-4 md:mx-8 transform transition-all hover:scale-105 mb-8">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-4">
          ¡Sé el primero en enterarte!
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Regístrate para recibir actualizaciones exclusivas sobre el lanzamiento de Ofix y ser parte de nuestra comunidad.
        </p>

        {/* Botón Google - Abre Modal */}
        <div className="flex justify-center mb-8">
          <button
            onClick={openModal} // Corregido: ahora pasa la función como callback
            className="flex items-center bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            <FaGoogle className="mr-2" size={20} />
            Completa el formulario
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">
              X
            </button>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScS35GwBPJmuQEsMnSIbzwOCjiWwZe2eK06_li05u_r9jfO4A/viewform?embedded=true"
              className="w-full h-[70vh]"
              frameBorder="0"
            >
              Cargando…
            </iframe>
          </div>
        </div>
      )}

      {/* Sección de interés */}
<div className="text-center mb-12">
  <h2 className="text-3xl font-bold text-white mb-6">¿Quiénes deberían registrarse?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Para ofrecer servicios */}
    <div className="bg-white text-orange-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <FaCogs size={40} className="text-orange-500 mb-2" />
      <h3 className="text-lg font-semibold mb-2 text-center">Si eres proveedor</h3>
      <p className="text-sm text-center">
        Ofrece tus servicios a miles de personas que buscan ayuda profesional para el hogar. ¡Comienza a generar ingresos ahora!
      </p>
    </div>

    {/* Para contratar servicios */}
    <div className="bg-white text-orange-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <FaHandshake size={40} className="text-orange-500 mb-2" />
      <h3 className="text-lg font-semibold mb-2 text-center">Si eres cliente</h3>
      <p className="text-sm text-center">
        Accede a una amplia gama de servicios para tu hogar, todo en un solo lugar. ¡Comodidad y calidad garantizada!
      </p>
    </div>

    {/* Para partners de publicidad */}
    <div className="bg-white text-orange-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <FaBullhorn size={40} className="text-orange-500 mb-2" />
      <h3 className="text-lg font-semibold mb-2 text-center">Si eres un partner</h3>
      <p className="text-sm text-center">
        Colabora con nosotros para expandir tu alcance y llegar a una audiencia interesada en los servicios del hogar. ¡Hablemos de oportunidades!
      </p>
    </div>
  </div>
</div>

    </section>
  );
};

export default PreLaunchPage;
