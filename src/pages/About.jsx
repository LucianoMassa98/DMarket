import React from "react";
import { motion } from "framer-motion";
import LOGO from "../../public/perfil.webp";

const About = () => {
  const people = [
    {
      nombre: "Luciano",
      apellido: "Massa",
      imagen: "https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/466015148_1331352034527820_4310938951466844413_n.jpg?ccb=11-4&oh=01_Q5AaIfr4tToKVK3-gp8JBevfREstWlSdvwpW9nIByU1w9vr_&oe=67F59EFC&_nc_sid=5e03e0&_nc_cat=103",
      rol: "Cofundador y CTO",
      mensaje: "Mi misión en Digital Market es conectar al consumidor final con el comercio local de bienes de consumo esenciales, ofreciendo productos de calidad y a los mejores precios. Creo que la tecnología tiene el poder de democratizar el acceso a bienes y servicios, haciendo que cada hogar pueda beneficiarse de la oferta más cercana y accesible. A través de nuestra plataforma, buscamos crear un puente entre los consumidores y los comercios, garantizando un servicio eficiente, justo y transparente para todos."
    }
,    
    {
      nombre: "Vos",
      apellido: "",
      imagen: LOGO,
      rol: "Socio Comercial",
      mensaje: "Estamos en busca de alianzas estratégicas que identifiquen una oportunidad de inversión y contribuyan al crecimiento de Digital Market, incluyendo la venta de productos de consumo para el hogar.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Sección de descripción */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sobre Digital Market
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 text-center leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
Digital Market es una plataforma innovadora que conecta a propietarios de supermercados, repartidores y consumidores, promoviendo la inclusión laboral, la transparencia y el crecimiento económico local. Facilitamos a los consumidores el acceso a una amplia gama de productos y servicios para el hogar, todo desde un solo lugar. Nuestra plataforma es completamente gratuita para los usuarios y se sustenta mediante la publicidad de anunciantes y vendedores, creando así un ecosistema sostenible y beneficioso para todos los involucrados.        </motion.p>

        {/* Objetivos y características */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Objetivos</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Facilitar la incorporación al mercado laboral formal.</li>
              <li>Mejorar la visibilidad de servicios profesionales y productos para el hogar.</li>
              <li>Reducir la informalidad laboral.</li>
              <li>Fomentar relaciones laborales justas y transparentes.</li>
              <li>Impulsar el desarrollo económico local.</li>
              <li>Ofrecer acceso a productos de consumo para el hogar y servicios profesionales de calidad al consumidor final.</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Características Fundamentales</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Registro y perfil personalizado para profesionales, consumidores y vendedores de productos de consumo.</li>
              <li>Bolsa de trabajo segmentada para servicios profesionales.</li>
              <li>Geolocalización integrada para conectar con proveedores locales.</li>
              <li>Calificaciones y comentarios de usuarios para mayor transparencia.</li>
              <li>Opciones de pago seguro para todas las transacciones.</li>
              <li>Modelo de negocio sostenible basado en publicidad de anunciantes y vendedores.</li>
              <li>Enfoque inicial en San Juan, con planes de expansión regional.</li>
            </ul>
          </motion.div>
        </div>

        {/* Sección de personas */}
        <div className="mt-16 space-y-12">
          {people.map((person, index) => (
            <motion.div
              key={index}
              className={`flex flex-col sm:flex-row items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <img
                src={person.imagen}
                alt={`${person.nombre} ${person.apellido}`}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg mb-6 sm:mb-0 sm:mx-6"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  {person.nombre} {person.apellido}
                </h3>
                <p className="text-gray-500">{person.rol}</p>
                <p className="mt-2 text-gray-700">{person.mensaje}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
