import React, { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesCarousel from "./components/ServicesCarousel";
import Plans from "./components/Plans";
import SponsorsCarousel from "./components/SponsorsCarousel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Servicios1 from "./components/Servicios1";
import Planes from "./components/Planes";
import SobreNosotros from "./components/SobreNosotros";
import WhatsAppButton from "./components/WhatsAppButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";

// 🟦 Importa tu logo desde assets
import logoRids from "./assets/logo-rids.png";

function App() {
  useEffect(() => {
    // 🟨 Crear favicon dinámicamente
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = logoRids;

    // Eliminar cualquier favicon anterior y agregar este
    const existingFavicon = document.querySelector("link[rel='icon']");
    if (existingFavicon) {
      document.head.removeChild(existingFavicon);
    }
    document.head.appendChild(favicon);
  }, []);

  return (
    <Router>
      {/* 🧭 Navbar / Encabezado principal */}
      <Header />

      {/* 🌍 Rutas principales */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ServicesCarousel />
              <Plans />
              <SponsorsCarousel />
              <Contact />
            </>
          }
        />

        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/servicios1" element={<Servicios1 />} />
        <Route path="/planes" element={<Planes />} />
      </Routes>

      {/* ✅ Footer global visible en todas las páginas */}
      <Footer />

      {/* 💬 Botón de WhatsApp */}
      <WhatsAppButton />
      
      {/* 🤖 Tu nuevo asistente con IA 2.0 */}
      <Chatbot />
    </Router>
  );
}

export default App;
