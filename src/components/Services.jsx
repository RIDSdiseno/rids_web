import React from "react";
import "./Services.css";
import { FaCode, FaRobot, FaCloud, FaShieldAlt } from "react-icons/fa";

export default function Services() {
  return (
    <div className="services-page">
      <div className="services-overlay"></div>

      <header className="services-header">
        <h1 className="fade-in">Nuestros Servicios</h1>
        <p className="fade-in-delayed">
          Soluciones tecnológicas que impulsan tu crecimiento digital.
        </p>
      </header>

      <section className="services-grid">
        <div className="service-card slide-up">
          <FaCode className="service-icon" />
          <h3>Desarrollo Web</h3>
          <p>
            Creamos sitios y aplicaciones web modernos, optimizados y seguros
            que reflejan la identidad y objetivos de tu empresa.
          </p>
        </div>

        <div className="service-card slide-up" style={{ animationDelay: "0.15s" }}>
          <FaRobot className="service-icon" />
          <h3>Inteligencia Artificial</h3>
          <p>
            Implementamos soluciones basadas en IA para automatizar procesos y
            mejorar la toma de decisiones.
          </p>
        </div>

        <div className="service-card slide-up" style={{ animationDelay: "0.3s" }}>
          <FaCloud className="service-icon" />
          <h3>Transformación Digital</h3>
          <p>
            Acompañamos a tu organización en su evolución hacia el entorno
            digital con estrategias personalizadas.
          </p>
        </div>

        <div className="service-card slide-up" style={{ animationDelay: "0.45s" }}>
          <FaShieldAlt className="service-icon" />
          <h3>Ciberseguridad</h3>
          <p>
            Protegemos tus sistemas y datos con soluciones robustas de seguridad
            adaptadas a tus necesidades.
          </p>
        </div>
      </section>
    </div>
  );
}
