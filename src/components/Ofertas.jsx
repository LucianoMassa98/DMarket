import React, { useState, useEffect } from 'react';

const Ofertas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Imágenes para cada versión del dispositivo
  const images = {
    desktop: [
      './drink.webp',
      './food.webp',
      './fondo.webp',
    ],
    tablet: [
      './drink.webp',
      './food.webp',
      './fondo.webp',
    ],
    mobile: [
      './drink.webp',
      './food.webp',
      './fondo.webp',
    ],
  };

  // Detectar el tamaño de la pantalla
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  };

  const [deviceType, setDeviceType] = useState(getDeviceType());

  // Cambiar el dispositivo según el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mover al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images[deviceType].length);
  };

  // Mover al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images[deviceType].length) % images[deviceType].length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Cambiar cada 2 segundos
    return () => clearInterval(interval); // Limpiar intervalos al desmontar
  }, [deviceType]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative overflow-hidden">
        {/* Slider */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images[deviceType].map((imgSrc, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={imgSrc} alt={`Oferta ${index + 1}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Ofertas;
