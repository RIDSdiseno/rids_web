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