import React from "react";
import { motion } from "framer-motion";
import LOGO from "../../public/perfil.webp"

const About = () => {
  const people = [
    {
      nombre: "Tania Fernandez",
      apellido: "González",
      imagen: "https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/473399736_565627269779463_5440106871922415124_n.jpg?ccb=11-4&oh=01_Q5AaIPebi2pdRmrGPo4MZEBhA1Mx2XksAvzmqCkc0qaEKwoY&oe=679D092D&_nc_sid=5e03e0&_nc_cat=100",
      rol: "Fundador y CEO",
      mensaje: "Mi misión es conectar talentos con oportunidades laborales de calidad.",
    },
    {
      nombre: "Luciano",
      apellido: "Massa",
      imagen: "https://backend-media-production.up.railway.app/api/v1/imagenes/JLC1gFYCp7.jpg",
      rol: "CTO",
      mensaje: "Creo en la tecnología como una herramienta para transformar vidas.",
    },
    {
      nombre: "Carlos Gómez",
      apellido: "Sánchez",
      imagen: LOGO,
      rol: "CMO",
      mensaje: "Ayudamos a los trabajadores independientes a destacarse en el mercado.",
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
          Sobre OFIX
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 text-center leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Una plataforma innovadora que conecta empleadores y trabajadores independientes, promoviendo la inclusión laboral, la transparencia y el desarrollo económico local.
        </motion.p>

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
              <li>Mejorar la visibilidad de servicios profesionales.</li>
              <li>Reducir la informalidad laboral.</li>
              <li>Fomentar relaciones laborales justas y transparentes.</li>
              <li>Impulsar el desarrollo económico local.</li>
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
              <li>Registro y perfil personalizado.</li>
              <li>Bolsa de trabajo segmentada.</li>
              <li>Geolocalización integrada.</li>
              <li>Calificaciones y comentarios de usuarios.</li>
              <li>Opciones de pago seguro.</li>
              <li>Modelo de negocio sostenible.</li>
              <li>Enfoque inicial en San Juan.</li>
            </ul>
          </motion.div>
        </div>

        {/* Sección de personas */}
        <div className="mt-16 space-y-12">
          {people.map((person, index) => (
            <motion.div
              key={index}
              className={`flex flex-col sm:flex-row items-center ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
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
