import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="../../public/logoOfix.png"
            alt="Logo"
            className="w-16 h-16" // Aumenté el tamaño del logo
          />
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">

          <li><a href="/" className="hover:underline">Inicio</a></li>
          <li><a href="/professionals" className="hover:underline">Profesionales</a></li>
          <li><a href="/about" className="hover:underline">Nosotros</a></li>
          <li><a href="/register" className="hover:underline">Registrarme</a></li>

          </ul>
        </nav>

        {/* Hamburger Menu */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-orange-500 shadow-lg z-10">
            <ul className="flex flex-col space-y-2 p-4">

            <li>
                <a
                  href="/"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/professionals"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profesionales
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </a>
              </li>


              <li>
                <a
                  href="/register"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarme
                </a>
              </li>
              



            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
