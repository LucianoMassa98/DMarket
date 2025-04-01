import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Support = () => {
  const faqs = {
    comprador: [
      { 
        question: "¿Necesito estar registrado para comprar?", 
        answer: "No, puedes comprar como invitado, pero te recomendamos registrarte para disfrutar de todas las ventajas.", 
        link: { url: "/users", title: "Ir a Registro" } 
      },
      { 
        question: "¿Cómo puedo realizar una compra?", 
        answer: "Busca tus productos, añádelos al carrito y finaliza el pedido enviándolo por WhatsApp.", 
      },
    ],
    vendedor: [
      { 
        question: "¿Cómo puedo publicar un producto?", 
        answer: "Puedes publicar productos desde la primera opción del panel de vendedor.", 
        link: { url: "/vendors", title: "Ir al Panel de Vendedor" } 
      },
      { 
        question: "¿Debo pagar por usar la aplicación?", 
        answer: "No, puedes cargar y vender tus productos sin costo alguno. DMarket genera ingresos por publicidad.", 
        link: { url: "/vendors", title: "Ir al Panel de Vendedor" } 
      },
      { 
        question: "¿Cómo contrato repartidores?", 
        answer: "Los acuerdos son exclusivamente entre comerciantes y repartidores. Descarga una metodología de trabajo basada en WhatsApp, hojas de cálculo y formularios de Google.", 
        link: { url: "https://wa.me/542643183732?text=Solicito%20repartidores%20para%20mi%20negocio", title: "Solicitar Repartidor" } 
      },
    ],
    repartidor: [
      { 
        question: "¿Qué necesito para ser repartidor?", 
        answer: "Puedes registrarte como repartidor completando el formulario de registro en la aplicación.", 
        link: { url: "/users", title: "Ir a Registro" } 
      },
      { 
        question: "¿Cómo funciona el sistema de entregas?", 
        answer: "Te conectamos con comerciantes que necesitan repartidores. Puedes aceptar o rechazar trabajar con los comercios según tu disponibilidad.", 
      },
    ],
  };

  const [openSections, setOpenSections] = useState({
    comprador: false,
    vendedor: false,
    repartidor: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Soporte</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
        {Object.keys(faqs).map((userType) => (
          <div key={userType} className="mb-4">
            <button
              onClick={() => toggleSection(userType)}
              className="w-full flex justify-between items-center bg-black text-white py-2 px-4 rounded hover:bg-grey transition duration-200"
            >
              <span>{userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
              {openSections[userType] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openSections[userType] && (
              <ul className="space-y-4 mt-2">
                {faqs[userType].map((faq, index) => (
                  <li key={index} className="bg-white p-4 rounded shadow">
                    <h3 className="font-bold">{faq.question}</h3>
                    <p>{faq.answer}</p>
                    {faq.link && (
                      <a 
                        href={faq.link.url} 
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {faq.link.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Necesitas más ayuda?</h2>
        <a
          href="https://wa.me/542643183732?text=Hola,%20quiero%20contactar%20al%20soporte.%20Por%20favor,%20voy%20a%20especificar%20mi%20duda%3A"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
        >
          Contactar por WhatsApp
        </a>
      </section>
    </div>
  );
};

export default Support;
