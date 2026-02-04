// Header.jsx
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaInstagram,
  FaLinkedin,
  FaQuestionCircle,
} from "react-icons/fa";
import "./Header.css";

import LogoRids from "../assets/LOGO_RIDS_blanco.png";
// ✅ bot-2.png está en /public, NO se importa

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      {/* 🟦 Logo */}
      <div className="logo-container">
        <RouterLink to="/" onClick={closeMenu}>
          <img
            src={LogoRids}
            alt="Logo RIDS"
            className="logo-img"
            style={{ height: "55px", width: "auto" }}
          />
        </RouterLink>
      </div>

      {/* 🧭 Navegación Desktop */}
      <nav className="nav-links">
        {location.pathname === "/" ? (
          <>
            <ScrollLink to="hero" smooth duration={700} offset={-70}>
              Inicio
            </ScrollLink>
            <RouterLink to="/sobrenosotros">Sobre Nosotros</RouterLink>
            <RouterLink to="/servicios1">Servicios</RouterLink>
            <RouterLink to="/planes">Planes</RouterLink>

            <ScrollLink
              to="faq-rids"
              smooth
              duration={700}
              offset={-70}
              className="faq-link"
            >
              <FaQuestionCircle className="faq-icon" />
              <span>FAQ</span>
            </ScrollLink>

            <ScrollLink
              to="contacto"
              smooth
              duration={700}
              offset={-70}
              className="contact-link"
            >
              Contáctanos
            </ScrollLink>
          </>
        ) : (
          <>
            <RouterLink to="/">Inicio</RouterLink>
            <RouterLink to="/sobrenosotros">Sobre Nosotros</RouterLink>
            <RouterLink to="/servicios1">Servicios</RouterLink>
            <RouterLink to="/planes">Planes</RouterLink>

            <RouterLink to="/#faq-rids" className="faq-link">
              <FaQuestionCircle className="faq-icon" />
              <span>FAQ</span>
            </RouterLink>

            <RouterLink to="/#contacto" className="contact-link">
              Contáctanos
            </RouterLink>
          </>
        )}
      </nav>

      {/* 🔗 Redes + Econnet + Bot (Desktop) */}
      <div className="social-links">
        <a
          href="https://www.instagram.com/rids.cl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram RIDS"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.linkedin.com/in/asesor%C3%ADas-rids-ltda-348522107/?originalSubdomain=cl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn RIDS"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://econnet.cl/"
          target="_blank"
          rel="noopener noreferrer"
          className="sister-link"
          aria-label="Página hermana Econnet"
        >
          Econnet.cl
        </a>

        {/* 🤖 Bot (desde /public/bot-2.png) */}
        <a
          href="https://rids-intranet.netlify.app/home"
          target="_blank"
          rel="noopener noreferrer"
          className="bot-link"
          aria-label="Acceso Intranet RIDS"
          title="Acceso Intranet RIDS"
        >
          <img
            src="/bot-2.png"
            alt="Bot Intranet RIDS"
            className="bot-icon"
          />
        </a>
      </div>

      {/* 🍔 Botón Hamburguesa */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* 📱 Menú móvil desplegable */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {location.pathname === "/" ? (
          <>
            <ScrollLink
              to="hero"
              smooth
              duration={700}
              offset={-70}
              onClick={closeMenu}
            >
              Inicio
            </ScrollLink>

            <RouterLink to="/sobrenosotros" onClick={closeMenu}>
              Sobre Nosotros
            </RouterLink>

            <RouterLink to="/servicios1" onClick={closeMenu}>
              Servicios
            </RouterLink>

            <RouterLink to="/planes" onClick={closeMenu}>
              Planes
            </RouterLink>

            <ScrollLink
              to="faq-rids"
              smooth
              duration={700}
              offset={-70}
              onClick={closeMenu}
              className="faq-link"
            >
              <FaQuestionCircle className="faq-icon" />
              <span>FAQ</span>
            </ScrollLink>

            <ScrollLink
              to="contacto"
              smooth
              duration={700}
              offset={-70}
              onClick={closeMenu}
              className="contact-link"
            >
              Contáctanos
            </ScrollLink>
          </>
        ) : (
          <>
            <RouterLink to="/" onClick={closeMenu}>
              Inicio
            </RouterLink>

            <RouterLink to="/sobrenosotros" onClick={closeMenu}>
              Sobre Nosotros
            </RouterLink>

            <RouterLink to="/servicios1" onClick={closeMenu}>
              Servicios
            </RouterLink>

            <RouterLink to="/planes" onClick={closeMenu}>
              Planes
            </RouterLink>

            <RouterLink to="/#faq-rids" onClick={closeMenu} className="faq-link">
              <FaQuestionCircle className="faq-icon" />
              <span>FAQ</span>
            </RouterLink>

            <RouterLink
              to="/#contacto"
              onClick={closeMenu}
              className="contact-link"
            >
              Contáctanos
            </RouterLink>
          </>
        )}

        {/* 🔗 Redes + Econnet + Bot (Mobile) */}
        <div className="mobile-social-links">
          <a
            href="https://www.instagram.com/rids.cl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram RIDS"
            className="mobile-instagram-link"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/in/asesor%C3%ADas-rids-ltda-348522107/?originalSubdomain=cl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn RIDS"
            className="mobile-linkedin-link"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://econnet.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-sister-link"
            aria-label="Página hermana Econnet"
          >
            Econnet.cl
          </a>

          {/* 🤖 Bot Mobile (desde /public/bot-2.png) */}
          <a
            href="https://rids-intranet.netlify.app/home"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bot-link"
            aria-label="Acceso Intranet RIDS"
            title="Acceso Intranet RIDS"
          >
            <img
              src="/bot-2.png"
              alt="Bot Intranet RIDS"
              className="mobile-bot-icon"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
