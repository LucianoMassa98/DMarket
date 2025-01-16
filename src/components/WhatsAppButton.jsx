import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importamos el icono de WhatsApp desde react-icons

const WhatsAppButton = () => {
  const phoneNumber = "+549XXXXXXXXX"; // Reemplaza con tu número de soporte en WhatsApp
  const message = "¡Hola! Necesito soporte.";

  // Enlace de WhatsApp con un mensaje predefinido
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
      aria-label="Contactar con soporte por WhatsApp"
    >
      <FaWhatsapp className="w-12 h-12" />
    </a>
  );
};

export default WhatsAppButton;
