// src/components/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    categoria: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (success !== null) setSuccess(null); // limpiar mensaje al seguir escribiendo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // { nombre, email, categoria, mensaje }
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nombre: "", email: "", categoria: "", mensaje: "" });
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        {/* FORMULARIO PRINCIPAL */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contáctanos</h2>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              name="email" // 👈 ahora se llama email (coincide con la API)
              placeholder="tuemail@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría de consulta</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría...</option>
              <option value="Atención de Emergencias. SOS Soporte.cl">
                Atención de Emergencias. SOS Soporte.cl
              </option>
              <option value="Instalación y revisión de equipos">
                Instalación y revisión de equipos
              </option>
              <option value="Mantención de red y equipos computacionales">
                Mantención de red y equipos computacionales
              </option>
              <option value="Asesoría TI Storage y respaldos">
                Asesoría TI Storage y respaldos
              </option>
              <option value="Manutenciones Lógicas y Físicas">
                Manutenciones Lógicas y Físicas
              </option>
              <option value="Cableado estructurado">Cableado estructurado</option>
              <option value="Asesoría TI Servidores Web">
                Asesoría TI Servidores Web
              </option>
              <option value="Configuración de Servidores y correos">
                Configuración de Servidores y correos
              </option>
              <option value="Configuración de Impresoras de red">
                Configuración de Impresoras de red
              </option>
              <option value="Diseño Web a medida">Diseño Web a medida</option>
              <option value="Plataformas de sistemas web">
                Plataformas de sistemas web
              </option>
              <option value="Migración de correos">Migración de correos</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {success === true && (
            <p className="success-msg">¡Mensaje enviado con éxito!</p>
          )}
          {success === false && (
            <p className="error-msg">
              Error al enviar el mensaje. Intenta nuevamente.
            </p>
          )}
        </form>

        {/* PANEL DE INFORMACIÓN */}
        <div className="contact-info">
          <h3>Información de contacto</h3>

          <div className="info-item">
            <strong>Ubicación:</strong>
            <span>
              La Concepción 65, Oficina 1003, Providencia, Santiago, Chile
            </span>
          </div>

          <div className="info-item">
            <strong>Teléfonos:</strong>
            <span>
              <a href="tel:+56973713869">+56 9 7371 3869</a> <br />
              <a href="tel:+56988076593">+56 9 8807 6593</a>
            </span>
          </div>

          <div className="info-item">
            <strong>Correos:</strong>
            <span>
              <a href="mailto:soporte@rids.cl">soporte@rids.cl</a> <br />
              <a href="mailto:carenas@rids.cl">carenas@rids.cl</a> <br />
              <a href="mailto:informaciones@rids.cl">informaciones@rids.cl</a>
            </span>
          </div>

          <div className="info-item info-map">
            <strong>Mapa:</strong>
            <div className="map-container">
              <iframe
                title="Ubicación RIDS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.014552870874!2d-70.61518872451903!3d-33.42280589778254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf640dc37b43%3A0xf7b5d4def64fe908!2sLa%20Concepci%C3%B3n%2065%2C%20Oficina%201003%2C%20Providencia%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1730740814456!5m2!1ses!2scl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
