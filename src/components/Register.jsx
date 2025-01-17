import React from "react";
import { FaTiktok, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import LOGO from "../../public/logoOfix.png"

const Register = () => {
  // Array de planes
  const plans = [
    {
      title: "Plan Gratis - 1 Mes",
      description:
        "Regístrate de forma gratuita y comienza a generar ganancias durante 1 mes. Sin compromisos.",
      price: "Gratis",
      link: "https://forms.gle/r2gMuZmbA2jq4RgA9", // Enlace al formulario de Google o página de suscripción
    },
    {
      title: "Plan Semestral",
      description:
        "Accede a beneficios exclusivos y genera ingresos con un registro de 6 meses.",
      price: "$40.000",
      link: "/semestre", // Enlace al proceso de suscripción o pago
    },
    {
      title: "Plan Anual",
      description:
        "Suscríbete por un año y recibe un descuento especial. Genera ingresos todo el año.",
      price: "$60.000",
      link: "/anual", // Enlace al proceso de suscripción o pago
    },
  ];

  return (
    <section
      id="register"
      className="bg-gradient-to-b from-orange-500 to-orange-600 min-h-screen flex flex-col items-center justify-center py-16"
    >
      {/* Logo */}
      <div className="mb-6">
        <img
          src={LOGO}// Asegúrate de agregar tu logo en la carpeta pública
          alt="Logo"
          className="w-32 h-auto mx-auto"
        />
      </div>

      {/* Contenido de la Página */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-4 md:mx-8 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-4">
          ¡Regístrate con Nosotros!
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
        ¡Únete a nuestra plataforma y comienza a generar ingresos de inmediato! Completa el formulario y empieza hoy mismo.
        </p>

        

        {/* Planes de Suscripción */}
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold text-center text-orange-600 mb-4">
            Planes de Registro
          </h3>

          {/* Renderización de los planes dinámicamente */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6"
            >
              <h4 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {plan.title}
              </h4>
              <p className="text-center text-gray-600 mb-4">{plan.description}</p>
              <p className="text-center text-xl font-bold text-gray-800 mb-4">
                {plan.price}
              </p>

              <div className="text-center">
                <a
                  href={plan.link}
                  className="bg-orange-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105"
                >
                  ¡Suscríbete Ahora!
                </a>
              </div>


            </div>
          ))}
        </div>

        {/* Mensaje de Información adicional */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Recuerda que después de completar el formulario, tu perfil será
          revisado, y podrás comenzar a ofrecer tus servicios y generar ingresos
          tras la validación.
        </p>

        {/* Iconos de redes sociales */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FaWhatsapp size={24} />
          </a>

          <a
  href="https://www.tiktok.com"
  target="_blank"
  rel="noopener noreferrer"
  class="text-gray-600 hover:text-gray-800 transition-all"
>
  <FaTiktok size={24} />
</a>
        </div>
      </div>
    </section>
  );
};

export default Register;
