import { Link } from "react-router-dom";
import FONDO from "../../public/fondo.jpg"; // Asegúrate de que la ruta sea válida

const Hero = () => {
  return (
    <div className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src={FONDO}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido principal */}
      <div className="relative z-10 text-white px-4">
        <h2 className="text-4xl font-bold mb-4">
          Bienvenidos a <strong className="text-orange-600">OFIX</strong>
        </h2>
        <p className="text-lg mb-8">
          Encuentra expertos confiables para tu hogar de forma segura, rápida y sencilla.
        </p>
        <div className="space-x-4">
          <button className="bg-orange-500 py-2 px-6 rounded-full hover:bg-orange-600">
            <Link to="/professionals" className="text-white">
              Contratar
            </Link>
          </button>

          <button className="bg-orange-500 py-2 px-6 rounded-full hover:bg-orange-600">
            <Link to="/register" className="text-white">
              Soy Profesional
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
