import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PUBLICIDAD1 from "../../public/publicidad1.webp"
import PUBLICIDAD2 from "../../public/publicidad2.webp"




const ServiceCategories = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const categories = [
    {
      title: "Reparación y Mantenimiento",
      content: [
        "Plomería: Reparaciones de fugas, instalación de sanitarios, calentadores de agua, etc.",
        "Electricidad: Reparación de cortocircuitos, instalación de lámparas, paneles solares, y mantenimiento eléctrico.",
        "Carpintería: Reparación de muebles, armarios empotrados, puertas y ventanas.",
        "Albañilería: Pequeñas remodelaciones, reparaciones estructurales o trabajos de mantenimiento en paredes y pisos.",
      ],
    },
    {
      title: "Limpieza",
      content: [
        "Limpieza profunda del hogar: Especialmente después de eventos o cambios de temporada.",
        "Limpieza de alfombras y tapicería: Uso de técnicas especializadas.",
        "Limpieza de ventanas y fachadas: Servicios externos y a gran altura.",
        "Desinfección: Muy demandados después de la pandemia.",
      ],
    },
    {
      title: "Instalación y Tecnología",
      content: [
        "Instalación de equipos electrónicos: Televisores, sistemas de sonido, routers Wi-Fi.",
        "Domótica: Instalación de sistemas inteligentes como cerraduras, cámaras y termostatos.",
        "Reparación de electrodomésticos: Refrigeradores, lavadoras, aire acondicionado.",
      ],
    },
    {
      title: "Jardinería y Paisajismo",
      content: [
        "Diseño de jardines y áreas verdes.",
        "Mantenimiento periódico: Cortado de césped, poda, limpieza de hojas.",
        "Sistemas de riego automático.",
      ],
    },
    {
      title: "Seguridad del Hogar",
      content: [
        "Instalación de cámaras de seguridad y alarmas.",
        "Cerraduras inteligentes y refuerzo de puertas.",
        "Asesoramiento en seguridad doméstica.",
      ],
    },
    {
      title: "Pintura y Decoración",
      content: [
        "Pintura de interiores y exteriores.",
        "Aplicación de acabados decorativos como vinilos, papel tapiz o texturas.",
        "Decoración personalizada para eventos o remodelaciones.",
      ],
    },
    {
      title: "Servicios de Mudanza",
      content: [
        "Transporte de muebles y electrodomésticos.",
        "Empaque y desembalaje profesional.",
        "Almacenamiento temporal.",
      ],
    },
    {
      title: "Cuidado y Mantenimiento de Mascotas",
      content: [
        "Paseo de perros y cuidado a domicilio.",
        "Baño y grooming.",
        "Entrenamiento básico de comportamiento.",
      ],
    },
    {
      title: "Reparación y Mantenimiento de Vehículos",
      content: [
        "Mantenimiento preventivo de autos en el hogar.",
        "Lavado de autos a domicilio.",
        "Servicios de mecánica ligera.",
      ],
    },
    {
      title: "Cocina y Catering",
      content: [
        "Chef a domicilio para eventos.",
        "Preparación de comidas semanales según necesidades dietéticas.",
        "Catering para reuniones o celebraciones.",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <motion.h1
        className="text-4xl font-extrabold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Servicios Para Tu Hogar
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Sección de imágenes y botones en escritorio */}
        <div className="hidden lg:flex justify-between mb-8">
  <div className="w-full lg:w-1/3 p-4 bg-gray-200 shadow-lg rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-all">
    <a href="/destination">
      <img
        src={PUBLICIDAD2}
        alt="Imagen 1"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-blue-600 font-semibold">Publicidad para tu negocio</p>
    </a>
  </div>
  <div className="w-full lg:w-1/3 p-4 bg-gray-200 shadow-lg rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-all">
    <a href="/destination">
      <img
        src={PUBLICIDAD2}
        alt="Imagen 2"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-blue-600 font-semibold">Publicidad para tu negocio</p>
    </a>
  </div>
  <div className="w-full lg:w-1/3 p-4 bg-gray-200 shadow-lg rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-all">
    <a href="/destination">
      <img
        src={PUBLICIDAD2}
        alt="Imagen 2"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-blue-600 font-semibold">Redirigir a otro lugar</p>
    </a>
  </div>
        </div>


        {/* Contenido de categorías */}
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-lg transition-colors"
            >
              {category.title}
              {activeSection === index ? (
                <FaChevronUp className="ml-2 text-gray-600" />
              ) : (
                <FaChevronDown className="ml-2 text-gray-600" />
              )}
            </button>
            {activeSection === index && (
              <motion.div
                className="px-6 py-4 bg-white text-gray-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <ul className="list-disc list-inside space-y-2">
                  {category.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

        {/* Versión móvil de imágenes y botones */}
        <div className="lg:hidden space-y-6 mt-8">
          <div className="bg-gray-200 shadow-lg rounded-lg text-center p-4">
            <img
              src={PUBLICIDAD1}
              alt="Imagen móvil 1"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <a href="/destination" className="text-blue-600 font-semibold">
             Publicidad para tu negocio
            </a>
          </div>
          <div className="bg-gray-200 shadow-lg rounded-lg text-center p-4">
            <img
              src={PUBLICIDAD1}
              alt="Imagen móvil 2"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <a href="/destination" className="text-blue-600 font-semibold">
             Publicidad para tu negocio
            </a>
          </div>
        </div>
    </section>
  );
};

export default ServiceCategories;
