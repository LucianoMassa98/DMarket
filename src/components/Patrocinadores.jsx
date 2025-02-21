import { useState } from "react";
import { motion } from "framer-motion";
import usePatrocinadoresData from "../hooks/usePatrocinadoresData"; // Simulación del hook

export default function Patrocinadores() {
  const { membersData, loading, error } = usePatrocinadoresData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSponsor = () => {
    setCurrentIndex((prevIndex) =>
      membersData ? (prevIndex + 1) % membersData.length : 0
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando patrocinadores...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error al cargar patrocinadores.</p>;
  }

  if (!membersData || membersData.length === 0) {
    return <p className="text-center text-gray-500">No hay patrocinadores disponibles.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-[400px] w-full max-w-md mx-auto rounded-2xl shadow-lg">
      <motion.div
        key={membersData[currentIndex].id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <img
          src={membersData[currentIndex].image}
          alt={membersData[currentIndex].title}
          className="w-40 h-40 object-cover rounded-full mb-4"
        />
        <h3 className="text-xl font-bold text-gray-900">
          {membersData[currentIndex].title}
        </h3>
        <p className="text-gray-700 text-sm mt-2">{membersData[currentIndex].message}</p>
        <a
  href={membersData[currentIndex].urlCta}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full 
             hover:bg-blue-700 hover:scale-105 hover:shadow-lg 
             focus:ring-2 focus:ring-blue-500 active:scale-95 active:shadow-inner 
             transition-all"
  tabIndex="0"
>
  {membersData[currentIndex].cta}
  Click
</a>

      </motion.div>

      <button
        onClick={nextSponsor}
        className="mt-6 px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition focus:ring-2 focus:ring-gray-500"
      >
        Siguiente
      </button>
    </div>
  );
}
