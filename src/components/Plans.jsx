import React from "react";
import "./Plans.css";

const plans = [
  {
    name: "Esencial",
    price: "CLP $49.990",
    subprice: "CLP $24.995 / mes",
    description: "Tu primer paso hacia un soporte confiable.",
    features: [
      "1 usuario / 1 equipo",
      "Configuración y software esencial",
      "Preventivo mensual: antivirus y actualizaciones",
      "Respaldo local básico",
    ],
    highlight: false,
    link: "https://app.reveniu.com/checkout-custom-link/ZjPI1JBKALQhhmIycGKyj6UVlzUdIVNl",
  },
  {
    name: "Avanza",
    price: "CLP $99.990",
    subprice: "CLP $49.995 / mes",
    description: "El impulso que tu negocio necesita para crecer seguro.",
    features: [
      "Hasta 3 usuarios / equipos",
      "Soporte remoto esencial",
      "Continuidad operativa y mantenimiento",
      "Asesoría remota en configuración",
    ],
    highlight: false,
    link: "https://app.reveniu.com/checkout-custom-link/v5oX9p7FN2dsbLiABP6bEJClWBmid9oT",
  },
  {
    name: "Premium",
    price: "CLP $499.900",
    subprice: "CLP $229.950 / mes",
    description:
      "Soporte integral con presencia en terreno cuando lo requieras.",
    features: [
      "Soporte remoto ilimitado",
      "Mantenimiento correctivo",
      "1 visita presencial mensual incluida",
      "Gestión de licencias corporativas",
    ],
    highlight: true,
    link: "https://app.reveniu.com/checkout-custom-link/DoaO5SkMPRKxv2tocnp4EXndD8YYUpgd",
  },
  {
    name: "Infinity",
    price: "Cotización / según alcance",
    description: "Un plan sin límites, 100% a medida.",
    features: [
      "Cobertura ajustada al tamaño de la empresa",
      "Soporte remoto y presencial a convenir",
      "Técnico residente opcional",
      "Servicios extra: licencias, monitoreo, ciberseguridad, web, consultoría TI",
    ],
    highlight: false,
    link: "https://api.whatsapp.com/send/?phone=56988076593&text=Hola+RIDS%2C+quiero+informaci%C3%B3n+del+Plan+Infinity&type=phone_number&app_absent=0",
  },
];

export default function Plans() {
  return (
    <section
      id="planes"
      className="plans-section"
      aria-labelledby="planes-heading"
    >
      {/* 🔹 CTA superior para decisión rápida */}
      <div className="plans-cta-bar">
        <p>
          ¿No sabes qué plan de <strong>soporte TI</strong> elegir para tu
          empresa?
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=56988076593&text=Hola+RIDS%2C+necesito+ayuda+para+elegir+el+plan+de+soporte+TI+m%C3%A1s+adecuado+para+mi+empresa.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="plans-cta-button"
        >
          Habla con un asesor
        </a>
      </div>

      {/* 🔹 Encabezado SEO */}
      <div className="plans-header">
        <h2 id="planes-heading">Planes de soporte TI para pymes y empresas</h2>
        <p>
          Escoge el plan que mejor se adapta a tu empresa en Chile. Mantén tus
          equipos y usuarios protegidos con{" "}
          <strong>soporte TI profesional, mantención preventiva</strong> y{" "}
          <strong>continuidad operativa</strong> pensada para pymes y negocios
          en crecimiento.
        </p>
      </div>

      {/* 🔹 Cards */}
      <div className="plans-container">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`plan-card ${plan.highlight ? "highlight" : ""}`}
            aria-label={`Plan ${plan.name}`}
          >
            <header className="plan-header">
              <h3>{plan.name}</h3>
              <p className="description">“{plan.description}”</p>
            </header>

            <div className="price-block">
              <p className="price">{plan.price}</p>
              {plan.subprice && <p className="subprice">{plan.subprice}</p>}
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="plan-button"
            >
              {plan.name === "Infinity"
                ? "Solicitar propuesta personalizada"
                : plan.highlight
                ? "Quiero este plan"
                : "Contratar este plan"}
            </a>

            {/* Micro-copy bajo el botón */}
            {plan.name !== "Infinity" && (
              <p className="plan-footnote">
                Confirma el pago en línea y nuestro equipo se pondrá en contacto
                contigo para activar el servicio.
              </p>
            )}
            {plan.name === "Infinity" && (
              <p className="plan-footnote">
                Ideal para empresas con varios usuarios, varias sedes o
                requerimientos TI avanzados.
              </p>
            )}
          </article>
        ))}
      </div>

      {/* 🔹 Texto SEO extra (parte baja) */}
      <p className="plans-seo-text">
        En RIDS diseñamos planes de soporte TI para pymes, oficinas y empresas
        que necesitan un aliado tecnológico de largo plazo. Nuestros servicios
        incluyen mantención de equipos, soporte remoto y presencial, gestión de
        licencias y acompañamiento en tu transformación digital, para que tu
        negocio siga funcionando aunque la tecnología falle.
      </p>
    </section>
  );
}
