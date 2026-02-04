// src/components/SobreNosotros.jsx
import React, { useMemo, useState, useCallback } from "react";
import "./SobreNosotros.css";

// IMPORTA LAS IMÁGENES
import compromisoIcon from "../assets/compromiso.png";
import excelenciaIcon from "../assets/excelencia.png";
import innovacionIcon from "../assets/innovacion.png";
import misionIcon from "../assets/mision.png";
import visionIcon from "../assets/vision.png";
import bannerSobreNosotros from "../assets/sobrenosotros.png"; // 👈 BANNER

export default function SobreNosotros() {
  /* ========= SEO JSON-LD ========= */
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "RIDS",
      url: "https://rids.cl",
      description:
        "RIDS es una empresa de tecnología en Chile especializada en soporte TI para empresas, outsourcing de servicios informáticos, automatización de procesos y transformación digital.",
      sameAs: [
        "https://www.linkedin.com/company/rids", // si no existe, bórralo o cámbialo
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "CL",
        addressLocality: "Santiago",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contacto@rids.cl",
        availableLanguage: ["es-CL"],
      },
    }),
    []
  );

  /* ========= Scroll a FAQ ========= */
  const handleScrollToFaq = useCallback(() => {
    const section = document.getElementById("faq-rids");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  /* ========= Datos FAQ ========= */
  const faqs = [
    {
      question: "¿Qué tipo de empresas pueden trabajar con RIDS?",
      answer:
        "Trabajamos principalmente con pymes y empresas en crecimiento que necesitan un partner tecnológico para soporte TI, automatización de procesos, servicios cloud y ciberseguridad.",
    },
    {
      question: "¿Cómo funciona el soporte TI de RIDS?",
      answer:
        "Definimos canales de contacto (correo, WhatsApp y portal de soporte), clasificamos los casos por prioridad y realizamos atención remota o en terreno según la necesidad. Todo queda documentado para hacer seguimiento.",
    },
    {
      question: "¿Ofrecen planes mensuales o servicios por proyecto?",
      answer:
        "Sí, contamos con planes mensuales de soporte TI y también trabajamos de forma puntual por proyecto: migraciones de correo, implementación de servidores, cableado estructurado, plataformas web y más.",
    },
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario general es de lunes a viernes de 9:00 a 18:00 hrs. Para clientes con contrato de soporte, se pueden definir horarios extendidos y atención de emergencias.",
    },
    {
      question: "¿Cómo puedo partir trabajando con ustedes?",
      answer:
        "El primer paso es una reunión de diagnóstico sin costo, donde revisamos tu situación actual, prioridades y definimos un plan de acción con etapas claras.",
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <>
      <section
        id="sobre-nosotros"
        className="sobrenos-section"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="RIDS" />
        <meta
          itemProp="description"
          content="Empresa de tecnología en Chile enfocada en soporte TI para empresas, outsourcing de servicios informáticos, automatización de procesos y transformación digital."
        />

        {/* 🖼 BANNER SUPERIOR SOBRE NOSOTROS */}
        <div className="sobrenos-banner" onClick={handleScrollToFaq}>
          <img
            src={bannerSobreNosotros}
            alt="Equipo RIDS, soporte TI y transformación digital"
          />
          <div className="sobrenos-banner-overlay">
            <span className="sobrenos-banner-kicker">
              Innovación · Soporte TI · Automatización
            </span>

            <h2 className="sobrenos-banner-title">Conoce más sobre RIDS</h2>

            <p className="sobrenos-banner-text">
              Somos tu equipo tecnológico aliado para mantener tu infraestructura
              segura, disponible y preparada para crecer junto a tu negocio.
            </p>

            <button
              type="button"
              className="sobrenos-banner-cta"
              onClick={(e) => {
                e.stopPropagation(); // para que no dispare dos veces el click
                handleScrollToFaq();
              }}
            >
              Ver cómo trabajamos
              <span className="sobrenos-banner-cta-icon">›</span>
            </button>
          </div>
        </div>

        {/* HERO PRINCIPAL */}
        <div className="sobrenos-hero">
          <div className="sobrenos-hero-top">
            <span className="sobrenos-badge">
              Soporte TI · Automatización · Cloud
            </span>

            {/* Botón que lleva a la sección de FAQ */}
            <button
              type="button"
              className="sobrenos-faq-header-btn"
              onClick={handleScrollToFaq}
            >
              ¿Tienes dudas? <span>Ver preguntas frecuentes</span>
            </button>
          </div>

          <h1 className="sobrenos-title">
            Tu aliado en soporte TI y transformación digital
          </h1>
          <p className="sobrenos-sub">
            En <strong itemProp="name">RIDS</strong> impulsamos el crecimiento
            tecnológico y digital de las organizaciones con soluciones
            innovadoras, sostenibles y personalizadas, orientadas a{" "}
            <strong>pymes y empresas en Chile</strong>.
          </p>

          <div className="sobrenos-pill-row">
            <span className="sobrenos-pill">Soporte TI para empresas</span>
            <span className="sobrenos-pill">Outsourcing TI</span>
            <span className="sobrenos-pill">Automatización de procesos</span>
            <span className="sobrenos-pill">
              Servicios cloud y ciberseguridad
            </span>
          </div>
        </div>

        {/* TARJETAS SUPERIORES */}
        <div className="sobrenos-row sobrenos-row--top">
          <article
            className="sobrenos-card"
            itemProp="department"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="card-icon-wrap">
              <img
                src={misionIcon}
                alt="Icono misión RIDS soporte TI y consultoría tecnológica"
                className="card-icon"
              />
            </div>
            <h2 className="sobrenos-card-title" itemProp="name">
              Nuestra Misión
            </h2>
            <p className="sobrenos-card-text" itemProp="description">
              Brindar soluciones tecnológicas de vanguardia que optimicen los
              procesos y potencien el crecimiento digital de nuestros clientes,
              con compromiso y excelencia, a través de{" "}
              <strong>
                servicios de soporte TI y consultoría tecnológica
              </strong>
              .
            </p>
          </article>

          <article className="sobrenos-card">
            <div className="card-icon-wrap">
              <img
                src={visionIcon}
                alt="Icono visión RIDS transformación digital sostenible"
                className="card-icon"
              />
            </div>
            <h2 className="sobrenos-card-title">Nuestra Visión</h2>
            <p className="sobrenos-card-text">
              Ser reconocidos como el aliado tecnológico líder en innovación,
              calidad y confianza, contribuyendo activamente al desarrollo de un{" "}
              <strong>futuro digital sostenible</strong> para las empresas que
              confían en nosotros.
            </p>
          </article>
        </div>

        {/* TARJETAS INFERIORES */}
        <div className="sobrenos-row sobrenos-row--bottom">
          <article className="sobrenos-card">
            <div className="card-icon-wrap">
              <img
                src={innovacionIcon}
                alt="Icono innovación tecnológica RIDS"
                className="card-icon"
              />
            </div>
            <h2 className="sobrenos-card-title">Innovación</h2>
            <p className="sobrenos-card-text">
              Buscamos constantemente nuevas ideas y tecnologías para ofrecer
              soluciones únicas y eficientes que transformen el entorno digital,
              desde <strong>automatización de procesos</strong> hasta{" "}
              <strong>servicios cloud y ciberseguridad</strong>.
            </p>
          </article>

          <article className="sobrenos-card">
            <div className="card-icon-wrap">
              <img
                src={compromisoIcon}
                alt="Icono compromiso RIDS con los clientes"
                className="card-icon"
              />
            </div>
            <h2 className="sobrenos-card-title">Compromiso</h2>
            <p className="sobrenos-card-text">
              Entregar servicios de calidad a un precio justo, mejorar la
              productividad y consolidar relaciones a largo plazo, actuando como
              un <strong>equipo TI externo</strong> que se integra a tu empresa.
            </p>
          </article>

          <article className="sobrenos-card">
            <div className="card-icon-wrap">
              <img
                src={excelenciaIcon}
                alt="Icono excelencia en soporte TI RIDS"
                className="card-icon"
              />
            </div>
            <h2 className="sobrenos-card-title">Excelencia</h2>
            <p className="sobrenos-card-text">
              Nos esforzamos por ofrecer la más alta calidad en cada proyecto,
              superando las expectativas mediante{" "}
              <strong>buenas prácticas, seguimiento continuo</strong> y una{" "}
              <strong>atención cercana</strong> a cada cliente.
            </p>
          </article>
        </div>

        {/* === FAQ / PREGUNTAS FRECUENTES === */}
        <section id="faq-rids" className="sobrenos-faq">
          <h2 className="sobrenos-faq-title">Preguntas frecuentes</h2>
          <p className="sobrenos-faq-intro">
            Resolvemos las dudas más comunes sobre cómo trabajamos, nuestros
            servicios de soporte TI y la forma en que acompañamos a tu empresa.
          </p>

          <div className="sobrenos-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = index === openFaqIndex;
              return (
                <div
                  key={faq.question}
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">{isOpen ? "›" : "›"}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA de Sobre Nosotros */}
        <div className="sobrenos-cta">
          <h2 className="sobrenos-cta-title">
            ¿Quieres que RIDS sea tu aliado tecnológico?
          </h2>
          <p className="sobrenos-cta-text">
            Agenda una conversación para revisar el estado de tu{" "}
            <strong>soporte TI, infraestructura y procesos digitales</strong>, y
            definamos juntos un plan claro para tu empresa.
          </p>

          <ul className="sobrenos-cta-bullets">
            <li>Diagnóstico inicial sin costo.</li>
            <li>Plan de acción adaptado a tu realidad.</li>
            <li>Acompañamiento cercano del equipo RIDS.</li>
          </ul>

          <div className="sobrenos-cta-buttons">
            <a
              href="https://api.whatsapp.com/send/?phone=56988076593&text=Hola+RIDS%2C+quiero+conversar+sobre+servicios+de+soporte+TI+y+transformaci%C3%B3n+digital&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="sobrenos-btn sobrenos-btn--primary"
            >
              Hablar por WhatsApp
            </a>
            <a
              href="mailto:contacto@rids.cl?subject=Consulta%20sobre%20servicios%20RIDS"
              className="sobrenos-btn sobrenos-btn--secondary"
            >
              Escríbenos un correo
            </a>
          </div>
        </div>

        {/* Texto SEO adicional */}
        <p className="sobrenos-seo-text">
          En <strong>RIDS</strong> ofrecemos{" "}
          <strong>
            soporte TI para empresas, outsourcing de servicios informáticos,
            automatización de procesos y consultoría tecnológica en Chile
          </strong>
          . Acompañamos a pymes y organizaciones en su{" "}
          <strong>transformación digital</strong>, mejorando la continuidad
          operativa, la seguridad y la eficiencia de sus sistemas.
        </p>
      </section>

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
