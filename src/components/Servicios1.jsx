import Slider from "react-slick"; // 🌀 Carrusel
import "./Servicios1.css";
import React, { useState } from "react";

// 🖼️ Carrusel principal
import img1 from "../assets/hero1.png";
import img2 from "../assets/foto2.jpg";
import img3 from "../assets/foto1.jpg";
import img4 from "../assets/hero4.png";

// 🧠 Imágenes de servicios
import contratoImg from "../assets/contrato.png";
import soporteInfraImg from "../assets/soporte1.png";
import soporteRemotoImg from "../assets/soporte2.png";
import soporteTerrenoImg from "../assets/terreno.png";
import proyectosImg from "../assets/proyectos.png";

export default function Servicios1() {
  const [activeCard, setActiveCard] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const servicios = [
  {
    icon: contratoImg,
    titulo: "Contrato Asesoría y Soporte Computacional",
    descripcion:
      "Ofrecemos asistencia técnica integral para mantener y optimizar el rendimiento de tus equipos y sistemas. Incluye diagnóstico.",
  },
  {
    icon: soporteInfraImg,
    titulo: "Contrato de Soporte en Infraestructura de Servidores",
    descripcion:
      "Administramos y supervisamos tus servidores físicos o en la nube, asegurando disponibilidad, rendimiento y seguridad continua para la operación de tu empresa.",
  },
  {
    icon: soporteRemotoImg,
    titulo: "Soporte Remoto",
    descripcion:
      "Atendemos incidencias técnicas de forma inmediata y segura mediante conexión remota. Ideal para resolver problemas sin afectar la productividad de tu equipo.",
  },
  {
    icon: soporteTerrenoImg,
    titulo: "Soporte en Terreno",
    descripcion:
      "Nuestros técnicos se desplazan a tus instalaciones para brindar asistencia personalizada, instalación de equipos o resolución de fallas críticas en sitio.",
  },
  {
    icon: proyectosImg,
    titulo: "Proyectos TI",
    descripcion:
      "Planificamos, desarrollamos e implementamos soluciones tecnológicas a medida, desde infraestructura y redes hasta software y automatización.",
  },
];


  return (
    <section className="servicios-section" id="servicios">
      {/* 🖼️ Carrusel superior */}
      <div className="servicios-carousel">
        <Slider {...settings}>
          {[img1, img2, img3, img4].map((img, i) => (
            <div key={i} className="servicios-slide">
              <img src={img} alt={`Slide ${i}`} className="servicios-img" />
            </div>
          ))}
        </Slider>

        {/* 🌟 Texto sobre el carrusel */}
        <div className="servicios-overlay">
          <h1 className="servicios-title">Nuestros Servicios</h1>
          <p className="servicios-sub">
            Innovación, tecnología y seguridad al servicio de tu empresa
          </p>
        </div>
      </div>

      {/* 🧩 Sección de cards */}
      <div className="servicios-container">
        <h2 className="servicios-heading">Soluciones Tecnológicas</h2>
        <p className="servicios-text">
          Adaptamos nuestras soluciones a las necesidades reales de tu negocio.
        </p>

        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <div
              key={i}
              className={`servicios-card ${activeCard === i ? "active" : ""}`}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
            >
              <div className="servicios-icon">
                <img
                  src={s.icon}
                  alt={s.titulo}
                  className="servicios-icon-img"
                />
              </div>
              <h3 className="servicios-card-title">{s.titulo}</h3>
              <p className="servicios-card-desc">{s.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
