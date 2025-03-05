
import DEFAULT_IMAGE from "../../public/perfil.webp" // Imagen predeterminada
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importamos el icono de WhatsApp desde react-icons

import DepartamentoMapa from "../components/DepartamentoMapa";


const MemberProfile = ({ member, onBack, commentsData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memberComments = commentsData.filter(
    (comment) => comment["emailProfesional"] === member.correo
  );

  const handleWhatsAppClick = () => {
    const message = `Hola, me gustaría contactar contigo. Mi nombre es [Tu Nombre]. Vi tu número en OFIX.`;
    const phoneNumber = member.whatsapp; // Suponiendo que el miembro tiene un número de WhatsApp en la propiedad `whatsapp`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
   
    window.open(url, "_blank");
  };

  const [copyMessage, setCopyMessage] = useState(""); // Estado para el mensaje

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(member.correo).then(() => {
      setCopyMessage("Email copiado"); // Mostrar el mensaje
      setTimeout(() => setCopyMessage(""), 2000); // Ocultar el mensaje después de 2 segundos
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderStars = (rating) => {
    // Asegúrate de que la calificación sea un número válido
    const validRating = typeof rating === 'number' && !isNaN(rating) ? Math.floor(rating) : 0;
  
    const fullStars = validRating;
    const emptyStars = 5 - fullStars;
  
    return (
      <div>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400">★</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };

  // Función para manejar clics fuera del modal
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
   <section className="container mx-auto py-16 px-4 sm:px-8">
  <button className="mb-4 text-blue-500 underline" onClick={onBack}>
    Volver
  </button>
  <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">
    Perfil de {member.nombre} {member.apellido}
  </h2>
  <img
    src={member.image || DEFAULT_IMAGE}
    alt={`${member.nombre} ${member.apellido}`}
    className="w-40 h-40 mx-auto rounded-full mb-6"
  />
  <div className="text-center sm:text-left">
    <p className="text-gray-700">Departamento: {member.departamento}</p>
    <p className="text-gray-700">Servicio: {member.servicio}</p>
  </div>

<button
  onClick={handleWhatsAppClick}
  className="mt-4 py-2 px-4 bg-green-500 text-white rounded flex items-center justify-center space-x-2 mx-auto sm:mx-0"
>
  <FaWhatsapp className="w-5 h-5" /> {/* Usa directamente el icono como componente */}
  <span>Contactar</span>
</button>


  <h3 className="text-2xl font-bold mt-8 text-center sm:text-left">Comentarios</h3>
  <ul className="mt-4">
    {memberComments.map((comment, index) => (
      <li key={index} className="border-b py-2">
        <p>{comment.comentarios}</p>
        <p className="text-sm text-gray-600">Calificación: {renderStars(comment.calificacion)}</p>
      </li>
    ))}
  </ul>

  <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
 <button
      onClick={handleCopyEmail}
      className="py-2 px-4 bg-gray-300 text-black rounded mb-4"
    >
      Copiar Email Profesional
    </button>
  {copyMessage && (
        <div className="mt-2 text-sm text-green-500">
          {copyMessage}
        </div>
      )}
    <button
      onClick={openModal}
      className="py-2 px-4 bg-blue-500 text-white rounded mb-2 sm:mb-0"
    >
      Agregar Comentario
    </button>

  
  </div>

  {/* Modal para el formulario de Google */}
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
          src="https://docs.google.com/forms/d/e/1FAIpQLSc4C2WyFyQhvemeXBd6TBl5c2380OEtKXGcEDnlKx9rQIediA/viewform?embedded=true"
          className="w-full h-[70vh]"
          frameBorder="0"
        >
          Cargando…
        </iframe>
      </div>
    </div>
  )}

<DepartamentoMapa departamento={member.departamento}/>

</section>

  );
};

export default MemberProfile;
