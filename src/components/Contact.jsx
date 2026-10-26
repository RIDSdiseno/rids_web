// src/components/Contact.jsx

import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Contact.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const INITIAL_FORM_DATA = {
  nombre: "",
  email: "",
  categoria: "",
  mensaje: "",
  privacyRead: false,
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [showMap, setShowMap] = useState(false);

  const [status, setStatus] = useState({
    type: null,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));

    if (status.type !== null) {
      setStatus({
        type: null,
        message: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: null,
      message: "",
    });

    // ========================================
    // PRIVACIDAD
    // ========================================

    if (!formData.privacyRead) {
      setStatus({
        type: "error",
        message:
          "Debes confirmar que has leído la Política de Privacidad antes de enviar el mensaje.",
      });

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setStatus({
          type: "success",

          message: data?.message || "¡Mensaje enviado con éxito!",
        });

        setFormData(INITIAL_FORM_DATA);
      } else {
        setStatus({
          type: "error",

          message: data?.error || "No fue posible enviar el mensaje.",
        });
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);

      setStatus({
        type: "error",

        message: "No fue posible conectar con el servidor. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        {/* ========================================
            FORMULARIO PRINCIPAL
        ======================================== */}

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contáctanos</h2>

          {/* NOMBRE */}

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>

            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              minLength={2}
              maxLength={120}
              autoComplete="name"
              required
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="tuemail@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              maxLength={254}
              autoComplete="email"
              required
            />
          </div>

          {/* CATEGORÍA */}

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

              <option value="Cableado estructurado">
                Cableado estructurado
              </option>

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

          {/* MENSAJE */}

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>

            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.mensaje}
              onChange={handleChange}
              minLength={5}
              maxLength={5000}
              required
            />
          </div>

          {/* ========================================
              AVISO DE PRIVACIDAD
          ======================================== */}

          <div className="contact-privacy-notice">
            <p>
              Los datos proporcionados serán utilizados por RIDS para gestionar
              y responder tu solicitud. Puedes conocer cómo tratamos tu
              información y cómo ejercer tus derechos en nuestra{" "}
              <Link to="/politica-privacidad">Política de Privacidad</Link>.
            </p>
          </div>

          {/* ========================================
              CONFIRMACIÓN DE LECTURA
          ======================================== */}

          <div className="contact-privacy-check">
            <label htmlFor="privacyRead" className="contact-privacy-label">
              <input
                id="privacyRead"
                type="checkbox"
                name="privacyRead"
                checked={formData.privacyRead}
                onChange={handleChange}
                required
              />

              <span>
                He leído la{" "}
                <Link
                  to="/politica-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad
                </Link>
                .
              </span>
            </label>
          </div>

          {/* ========================================
              ESTADO DEL ENVÍO
          ======================================== */}

          {status.message && (
            <div
              className={
                status.type === "success"
                  ? "contact-status contact-status-success"
                  : "contact-status contact-status-error"
              }
              role={status.type === "error" ? "alert" : "status"}
            >
              {status.message}
            </div>
          )}

          {/* BOTÓN */}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {/* ========================================
            PANEL DE INFORMACIÓN
        ======================================== */}

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
              <a href="tel:+56973713869">+56 9 7371 3869</a>

              <br />

              <a href="tel:+56988076593">+56 9 8807 6593</a>
            </span>
          </div>

          <div className="info-item">
            <strong>Correos:</strong>

            <span>
              <a href="mailto:soporte@rids.cl">soporte@rids.cl</a>

              <br />

              <a href="mailto:carenas@rids.cl">carenas@rids.cl</a>
            </span>
          </div>

          {/* MAPA */}

          <div className="info-item info-map">
            <strong>Mapa:</strong>

            <div className="map-container">
              {!showMap ? (
                <div className="map-privacy-placeholder">
                  <div className="map-privacy-icon">📍</div>

                  <h4>Ubicación de RIDS</h4>

                  <p>
                    El mapa es proporcionado por Google Maps. Al mostrarlo se
                    establecerá una conexión con servicios de Google.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="map-show-btn"
                  >
                    Mostrar mapa
                  </button>
                </div>
              ) : (
                <iframe
                  title="Ubicación RIDS"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.014552870874!2d-70.61518872451903!3d-33.42280589778254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf640dc37b43%3A0xf7b5d4def64fe908!2sLa%20Concepci%C3%B3n%2065%2C%20Oficina%201003%2C%20Providencia%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1730740814456!5m2!1ses!2scl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
