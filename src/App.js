// src/App.js

import React, {
  useEffect,
} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header
  from "./components/Header";

import Hero
  from "./components/Hero";

import ServicesCarousel
  from "./components/ServicesCarousel";

import Plans
  from "./components/Plans";

import SponsorsCarousel
  from "./components/SponsorsCarousel";

import Contact
  from "./components/Contact";

import Footer
  from "./components/Footer";

import Servicios1
  from "./components/Servicios1";

import Planes
  from "./components/Planes";

import SobreNosotros
  from "./components/SobreNosotros";

import WhatsAppButton
  from "./components/WhatsAppButton";

import Chatbot
  from "./components/Chatbot";

import CookiesPolicy
  from "./components/CookiesPolicy";

import LegalNotice
  from "./components/LegalNotice";

import PrivacyPolicy
  from "./components/PrivacyPolicy";

import CookieConsent
  from "./components/CookieConsent";

import ProteccionDatosPublicPage
  from "./components/ProteccionDatosPublicPage";

// Logo
import logoRids
  from "./assets/logo-rids.png";

import AnalizadorLey21719 from "./components/AnalizadorLey21719";

/* =========================================================
   SCROLL A SECCIÓN (/#contacto, /#faq-rids)
   ========================================================= */

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    let intentos = 0;

    // Reintenta hasta que la sección exista (el home se dibuja después de navegar)
    const timer = setInterval(() => {
      const el =
        document.getElementById(id) ||
        document.querySelector(`[name="${id}"]`); // por si usa <Element name="..."> de react-scroll

      if (el) {
        clearInterval(timer);
        const y = el.getBoundingClientRect().top + window.scrollY - 75; // alto del header fijo
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (++intentos > 40) {
        clearInterval(timer); // se rinde a los 4 segundos
      }
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}

/* =========================================================
   LAYOUT GENERAL
   ========================================================= */

function AppContent() {

  const location =
    useLocation();

  /*
   * Esta ruta no debe mostrar:
   *
   * Header
   * Footer
   * WhatsApp
   * Chatbot
   *
   * porque funciona como formulario público
   * independiente.
   */
  const isProteccionDatos =
    location.pathname.startsWith(
      "/proteccion-datos/responder/"
    );

  return (
    <>
      {!isProteccionDatos && (
        <Header />
      )}

      <ScrollToHash />

      <Routes>

        {/* =================================================
            HOME
            ================================================= */}

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

        {/* =================================================
            SITIO
            ================================================= */}

        <Route
          path="/sobrenosotros"
          element={
            <SobreNosotros />
          }
        />

        <Route
          path="/servicios1"
          element={
            <Servicios1 />
          }
        />

        <Route
          path="/planes"
          element={
            <Planes />
          }
        />

        {/* =================================================
            LEGALES
            ================================================= */}

        <Route
          path="/politica-privacidad"
          element={
            <PrivacyPolicy />
          }
        />

        <Route
          path="/cookies"
          element={
            <CookiesPolicy />
          }
        />

        <Route
          path="/aviso-legal"
          element={
            <LegalNotice />
          }
        />

        {/* =================================================
            HERRAMIENTAS
            ================================================= */}

        <Route
          path="/analizador-ley-21719"
          element={
            <AnalizadorLey21719 />
          }
        />

        {/* =================================================
            PROTECCIÓN DE DATOS
            RUTA PÚBLICA
            ================================================= */}

        <Route
          path="/proteccion-datos/responder/:token"
          element={
            <ProteccionDatosPublicPage />
          }
        />

      </Routes>

      <CookieConsent />

      {!isProteccionDatos && (
        <>
          <Footer />

          <WhatsAppButton />

          <Chatbot />
        </>
      )}
    </>
  );
}


/* =========================================================
   APP
   ========================================================= */

function App() {

  useEffect(
    () => {

      /* ===================================================
         FAVICON
         =================================================== */

      const favicon =
        document.createElement(
          "link"
        );

      favicon.rel =
        "icon";

      favicon.type =
        "image/png";

      favicon.href =
        logoRids;

      const existingFavicon =
        document.querySelector(
          "link[rel='icon']"
        );

      if (
        existingFavicon
      ) {
        document.head.removeChild(
          existingFavicon
        );
      }

      document.head.appendChild(
        favicon
      );

    },
    [],
  );

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;