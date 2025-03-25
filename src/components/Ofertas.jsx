import React, { useState, useEffect } from 'react';

const Ofertas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Configuración de las ofertas
  const slides = [
    {
      image: './envio.webp',
      text: 'Envios Gratis desde los $5.000',
      cta: null
    },
    {
      image: './super.webp',
      text: 'Tu supermercado en linea',
      cta: null,
    },
    {
      image: './pared.webp',
      text: "Desarrollado por Destored", // Sin texto ni CTA
      cta: { label: 'Sitio Web', link: 'https://www.destored.org' },
      icon: 'https://www.destored.org/Logo%20Destored.svg', // Nuevo campo para el ícono
    },
  ];

  // Mover al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Mover al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
    return () => clearInterval(interval); // Limpiar intervalos al desmontar
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="relative overflow-hidden h-[250px] sm:h-[350px] md:h-[450px] lg:h-[400px] xl:h-[400px] lg:max-w-[90%] xl:max-w-[85%] mx-auto">
        {/* Slider */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Texto, ícono y CTA opcionales */}
              {slide.text && (
                <div
                  className={`absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center ${
                    slide.icon || slide.cta ? 'justify-start pt-12 sm:pt-16 md:pt-20 lg:pt-24' : 'justify-center'
                  } text-center p-6 sm:p-8 md:p-10 lg:p-12`}
                >
                  {slide.icon && (
                    <div className="mb-4">
                      <img
                        src={slide.icon}
                        alt="Ícono"
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                      />
                    </div>
                  )}
                  <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                    {slide.text}
                  </p>
                  {slide.cta && (
                    <a
                      href={slide.cta.link}
                      className="bg-black text-white px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 rounded-lg hover:bg-primary-dark transition"
                    >
                      {slide.cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 p-2 sm:p-3 bg-gray-800 text-white rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 p-2 sm:p-3 bg-gray-800 text-white rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Ofertas;
