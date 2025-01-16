import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProfessionalPage from "./pages/ProfessionalPage";
import About from "./pages/About";
import PreLaunchPage from "./pages/PreLaunchPage";

import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      {/* Encabezado del sitio */}
      <Header />
      
      {/* Rutas principales */}
      <Routes>
        {/* Página de pre-lanzamiento */}
        <Route path="/pre-lanzamiento" element={<PreLaunchPage />} />

        {/* Página principal */}
        <Route
          path="/"
          element={
            <main className="bg-secondary min-h-screen">
              <Hero />
              <Services />
              <Benefits />
              <Register />
            </main>
          }
        />

        {/* Otras páginas */}
        <Route path="/professionals" element={<ProfessionalPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Componentes comunes */}
      <Footer />
      <WhatsAppButton />
    </Router>
  );
};

export default App;
