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
import FaqRids from "./components/FaqRids"; // 🟦 FAQ reutilizado
import WhatsAppButton from "./components/WhatsAppButton";
import BotFloatButton from "./components/ChatBotWidget"; // 🤖 Bot flotante

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// 🟦 Importa tu logo desde assets
import logoRids from "./assets/logo-rids.png";

/* 🔝 Maneja scroll al cambiar de ruta y hash */
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    // Hash para contacto
    if (location.hash === "#contacto") {
      const el = document.getElementById("contacto");

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // por si el DOM aún no está listo
        setTimeout(() => {
          const elRetry = document.getElementById("contacto");
          if (elRetry) {
            elRetry.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      return;
    }

    // Hash para FAQ (soportamos #faq o #faq-rids)
    if (location.hash === "#faq" || location.hash === "#faq-rids") {
      const el = document.getElementById("faq-rids");

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(() => {
          const elRetry = document.getElementById("faq-rids");
          if (elRetry) {
            elRetry.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      return;
    }

    // Para cualquier otra ruta/hash, sube al inicio
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return null;
}

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
      {/* Control de scroll global */}
      <ScrollHandler />

      {/* 🧭 Navbar / Encabezado principal */}
      <Header />

      {/* 🌍 Rutas principales */}
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <main>
              {/* Hero / Inicio */}
              <section id="hero">
                <Hero />
              </section>

              {/* Carrusel de servicios en home */}
              <section id="servicios-home">
                <ServicesCarousel />
              </section>

              {/* Planes resumidos en home */}
              <section id="planes-home">
                <Plans />
              </section>

              {/* Clientes / sponsors */}
              <section id="sponsors">
                <SponsorsCarousel />
              </section>

              {/* Contacto (IMPORTANTE: id="contacto") */}
              <section id="contacto">
                <Contact />
              </section>

              {/* FAQ principal (IMPORTANTE: id="faq-rids") */}
              <section id="faq-rids">
                <FaqRids />
              </section>
            </main>
          }
        />

        {/* Páginas internas */}
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/servicios1" element={<Servicios1 />} />
        <Route path="/planes" element={<Planes />} />
      </Routes>

      {/* ✅ Footer global visible en todas las páginas, con id para el bot */}
      <div id="footer">
        <Footer />
      </div>

      {/* 💬 Botón de WhatsApp */}
      <WhatsAppButton />

      {/* 🤖 Botón flotante para hablar con el bot */}
      <BotFloatButton />
    </Router>
  );
}

export default App;
