import React from "react";
import "./Services.css";
import { FaServer, FaTools, FaNetworkWired, FaEnvelope, FaLaptopCode, FaCloud } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaServer />,
      title: "Soporte de Emergencia 24/7",
      description:
        "Servicio SOS Soportecial disponible las 24 horas para resolver incidencias críticas y mantener tu negocio operativo sin interrupciones.",
    },
    {
      icon: <FaTools />,
      title: "Mantenimiento de Equipos",
      description:
        "Instalación, revisión y mantenimiento preventivo y correctivo de equipos nuevos y antiguos, redes y computadores empresariales.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Cableado Estructurado",
      description:
        "Implementación de cableado estructurado con estándares de calidad internacional para garantizar conectividad óptima y estable.",
    },
    {
      icon: <FaEnvelope />,
      title: "Servidores de Correo",
      description:
        "Configuración y migración de servidores de correo electrónico, clientes de correo y consultoría especializada en comunicaciones empresariales.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Diseño Web Personalizado",
      description:
        "Desarrollo de sitios web personalizados y plataformas adaptadas a las necesidades específicas de tu empresa.",
    },
    {
      icon: <FaCloud />,
      title: "Respaldos y Almacenamiento",
      description:
        "Revisión de sistemas de respaldo, consultoría de almacenamiento TI y configuración de impresoras de red para optimizar tu infraestructura.",
    },
  ];

  return (
    <section className="services-section" id="servicios">
      <div className="container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">
          Soluciones tecnológicas integrales para empresas que buscan excelencia y confiabilidad
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
