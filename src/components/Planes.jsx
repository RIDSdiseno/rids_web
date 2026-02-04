import React from "react";
import { motion } from "framer-motion";
import "./Planes.css";

export default function Planes() {
  const planes = [
    {
      nombre: "Esencial",
      subtitulo: "“Tu primer paso hacia un soporte confiable.”",
      precio: "CLP $49.990",
      oferta: "CLP $24.995 / mes",
      descripcion:
        "PLAN SUSCRIPCIÓN MENSUAL. Asesoría remota para solicitudes básicas. Pensado para usuarios individuales o emprendedores con un equipo.",
      puntos: [
        "1 usuario / 1 equipo",
        "Configuración y software esencial",
        "Preventivo mensual: antivirus y actualizaciones",
        "Respaldo local básico",
      ],
      boton: "Contratar",
      link: "https://app.reveniu.com/checkout-custom-link/ZjPI1JBKALQhhmIycGKyj6UVlzUdIVNl",
    },
    {
      nombre: "Avanza",
      subtitulo: "“El impulso que tu negocio necesita para crecer seguro.”",
      precio: "CLP $99.990",
      oferta: "CLP $49.995 / mes",
      descripcion:
        "PLAN SUSCRIPCIÓN MENSUAL. Asesoría completamente remota para solicitudes básicas y avanzadas. Pensado para pequeñas empresas con hasta 3 usuarios.",
      puntos: [
        "Hasta 3 usuarios / equipos",
        "Soporte remoto esencial",
        "Continuidad operativa diaria",
        "Asesoría remota en configuración y mantenimiento",
      ],
      boton: "Contratar",
      destacado: true,
      link: "https://app.reveniu.com/checkout-custom-link/v5oX9p7FN2dsbLiABP6bEJClWBmid9oT",
    },
    {
      nombre: "Premium",
      subtitulo:
        "“Soporte integral con presencia en tu oficina cuando lo requieras.”",
      precio: "CLP $499.900",
      oferta: "CLP $229.950 / mes",
      descripcion:
        "PLAN SUSCRIPCIÓN MENSUAL PREMIUM. Dirigido a empresas medianas que requieren mayor cobertura con soporte presencial.",
      puntos: [
        "Soporte remoto ilimitado",
        "Mantenimiento correctivo",
        "1 visita presencial mensual incluida",
        "Gestión de licencias corporativas",
      ],
      boton: "Empezar ahora",
      link: "https://app.reveniu.com/checkout-custom-link/DoaO5SkMPRKxv2tocnp4EXndD8YYUpgd",
    },
    {
      nombre: "Infinity",
      subtitulo: "“Un plan sin límites, 100% a medida.”",
      precio: "Cotización / según alcance",
      descripcion:
        "PLAN SUSCRIPCIÓN INFINITY. Flexible, escalable y con servicios avanzados a medida de tu empresa.",
      puntos: [
        "Cobertura ajustada al tamaño de la empresa",
        "Soporte remoto y presencial a convenir",
        "Opcional: Técnico Residente dedicado",
        "Servicios extra: licencias, monitoreo, ciberseguridad, web, consultoría TI",
      ],
      boton: "WhatsApp / Llamar",
      link: "https://api.whatsapp.com/send/?phone=56988076593&text=Hola+RIDS%2C+quiero+informaci%C3%B3n+del+Plan+Infinity&type=phone_number&app_absent=0",
    },
  ];

  const comparativa = [
    [
      "Dirigido a",
      "Usuarios individuales / emprendedores",
      "Pequeñas empresas",
      "Empresas que requieren visita mensual",
      "Servicio 100% a medida",
    ],
    [
      "Usuarios / equipos",
      "1 usuario – 1 equipo",
      "Hasta 5 usuarios/equipos",
      "Hasta 10 usuarios/equipos",
      "Sin límites fijos",
    ],
    [
      "Dispositivos por usuario",
      "1 Notebook o PC",
      "1 Notebook / 1 PC / 1 móvil",
      "1 Notebook/PC + 1 adicional",
      "Según requerimiento",
    ],
    [
      "Incidencias incluidas",
      "Config., software y soporte básico",
      "Config., software y soporte básico",
      "Remoto ilimitado + 1 visita/mes",
      "Remoto/presencial según contrato",
    ],
    [
      "Mantenimiento",
      "Preventivo mensual (antivirus/updates)",
      "Preventivo (redes y equipos)",
      "Preventivo + correctivo",
      "A definir",
    ],
    [
      "Gestión",
      "—",
      "—",
      "Licencias y cuentas corporativas",
      "Técnico Residente opcional",
    ],
    [
      "Respaldo en la nube",
      "No incluye",
      "No incluye",
      "OneDrive/SharePoint",
      "A medida",
    ],
    [
      "Valor mensual (sin IVA)",
      "UF 1 / UF 0.5",
      "UF 3 / UF 1.5",
      "UF 12 / UF 6",
      "Cotización",
    ],
  ];

  return (
    <section className="planes-section">
      {/* 🟦 Encabezado limpio */}
      <div className="planes-hero">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="planes-title"
        >
          Nuestros Planes de Suscripción
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="planes-sub"
        >
          Descubre el plan que mejor se adapta a tu empresa. Diseñados para
          brindar continuidad operativa, soporte TI confiable y ciberseguridad
          de primer nivel.
        </motion.p>
      </div>

      {/* 🟩 Tarjetas de planes */}
      <div className="planes-grid">
        {planes.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`plan-card ${plan.destacado ? "plan-card--highlight" : ""}`}
          >
            <div className="plan-offer">50% OFF</div>
            <h3 className="plan-name">{plan.nombre}</h3>
            <p className="plan-subtitle">{plan.subtitulo}</p>
            <p className="plan-desc">{plan.descripcion}</p>
            <div className="plan-prices">
              <p className="plan-price">{plan.precio}</p>
              {plan.oferta && <p className="plan-discount">{plan.oferta}</p>}
            </div>
            <ul className="plan-list">
              {plan.puntos.map((p, j) => (
                <li key={j}>
                  <span>✔</span> {p}
                </li>
              ))}
            </ul>

            {/* 🔗 Botón con link */}
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="plan-btn"
            >
              {plan.boton}
            </a>
          </motion.div>
        ))}
      </div>

      {/* 🟦 Tabla comparativa */}
      <div className="planes-table-container">
        <h2 className="planes-table-title">Comparativa de Planes</h2>
        <div className="table-wrapper">
          <table className="planes-table">
            <thead>
              <tr>
                <th>Ítem</th>
                <th>Esencial</th>
                <th>Avanza</th>
                <th>Premium</th>
                <th>Infinity</th>
              </tr>
            </thead>
            <tbody>
              {comparativa.map((fila, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {fila.map((col, j) => (
                    <td key={j} className={j === 0 ? "col-titulo" : ""}>
                      {col}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
