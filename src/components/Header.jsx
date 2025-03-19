import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Menú hamburguesa (mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={40} className="text-black" />
          ) : (
            <Menu size={40} className="text-black" />
          )}
        </button>
        
        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <img
            src="/logo.webp"
            alt="Logo"
            className="h-16 rounded-xl"
          />
        </div>
        
        {/* Navegación */}
        <nav
          className={`absolute md:static top-20 left-0 w-full bg-green-500 bg-opacity-80 md:flex md:w-auto md:space-x-6 md:items-center p-4 md:p-0 transition-all duration-300 ${isOpen ? "block w-full h-screen left-0 top-0" : "hidden"}`}
        >
          {/* Menú de texto centrado y con mayor tamaño */}
          <div className="flex flex-col items-center justify-center h-full w-full space-y-6 md:space-y-0 md:flex-row md:space-x-6">
          <a
              href="/users"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              Usuario
            </a>
          <a
              href="/"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              Comprar
            </a>

            <a
              href="/vendors"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              Vender
            </a>
            <a
              href="/riders"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              Repartir
            </a>

            <a
              href="/about"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              Nosotros
            </a>
            
            <a
              href="/app"
              className="text-black text-3xl md:text-lg py-2 px-4 hover:bg-green-700 rounded transition duration-200"
            >
              App
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
