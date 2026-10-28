import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  obtenerConsentimientoPublico,
  responderConsentimientoPublico,
  revocarConsentimientoPublico,
} from "../services/proteccionDatos.service";

import logoRids from "../assets/logo-rids.png";

import "./ProteccionDatosPublicPage.css";

/* =========================================================
   TOKEN DESDE URL
   ========================================================= */

function obtenerTokenDesdeUrl() {
  const partes = window.location.pathname.split("/").filter(Boolean);

  /*
   * /proteccion-datos/responder/:token
   */

  if (
    partes.length !== 3 ||
    partes[0] !== "proteccion-datos" ||
    partes[1] !== "responder"
  ) {
    return null;
  }

  return decodeURIComponent(partes[2]);
}

/* =========================================================
   FORMATEAR FECHA
   ========================================================= */

function formatearFecha(value) {
  if (!value) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat("es-CL", {
      dateStyle: "long",

      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

/* =========================================================
   CAMPO DINÁMICO
   ========================================================= */

function CampoFormulario({ campo, value, disabled, onChange }) {
  /* =====================================================
     TEXT
     ===================================================== */

  if (campo.tipo === "TEXT") {
    return (
      <input
        type="text"
        className="pd-dynamic-input"
        value={typeof value === "string" ? value : ""}
        placeholder={campo.placeholder ?? ""}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    );
  }

  /* =====================================================
     CHECKBOX
     ===================================================== */

  if (campo.tipo === "CHECKBOX") {
    return (
      <div className="pd-checkbox-field">
        {/* =================================================
          DOCUMENTOS ASOCIADOS
          ================================================= */}

        {Array.isArray(campo.documentos) && campo.documentos.length > 0 && (
          <div className="pd-field-documents">
            <div className="pd-field-documents-header">
              <div>
                <span className="pd-field-documents-eyebrow">
                  Documentación relacionada
                </span>

                <p>
                  Revisa la documentación antes de confirmar esta declaración.
                </p>
              </div>
            </div>

            <div className="pd-field-documents-list">
              {campo.documentos.map((documento, index) => {
                const size =
                  typeof documento.size === "number" ? documento.size : 0;

                const sizeLabel =
                  size > 0
                    ? size >= 1024 * 1024
                      ? `${(size / 1024 / 1024).toFixed(2)} MB`
                      : `${(size / 1024).toFixed(1)} KB`
                    : null;

                return (
                  <a
                    key={`${campo.key}-${documento.sha256 ?? index}`}
                    href={documento.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-field-document-link"
                  >
                    <div className="pd-field-document-icon">PDF</div>

                    <div className="pd-field-document-info">
                      <strong>
                        {documento.titulo || documento.nombre || "Documento"}
                      </strong>

                      <div className="pd-field-document-meta">
                        {sizeLabel && <span>{sizeLabel}</span>}

                        {documento.nombre &&
                          documento.titulo !== documento.nombre && (
                            <span>{documento.nombre}</span>
                          )}
                      </div>
                    </div>

                    <span className="pd-field-document-open">Abrir PDF</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================
          DECLARACIÓN
          ================================================= */}

        <label className="pd-check-card">
          <input
            type="checkbox"
            checked={value === true}
            disabled={disabled}
            onChange={(event) => {
              onChange(event.target.checked);
            }}
          />

          <span>{campo.descripcion || campo.label}</span>
        </label>
      </div>
    );
  }

  /* =====================================================
     RADIO
     ===================================================== */

  if (campo.tipo === "RADIO") {
    return (
      <div className="pd-radio-grid">
        {(campo.opciones ?? []).map((opcion) => {
          const selected = value === opcion.value;

          return (
            <label
              key={opcion.value}
              className={["pd-radio-option", selected ? "is-selected" : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                name={campo.key}
                value={opcion.value}
                checked={selected}
                disabled={disabled}
                onChange={() => {
                  onChange(opcion.value);
                }}
              />

              <span>{opcion.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return null;
}

/* =========================================================
   PÁGINA
   ========================================================= */

export default function ProteccionDatosPublicPage() {
  const token = useMemo(() => obtenerTokenDesdeUrl(), []);

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  /*
   * Nuevo esquema dinámico:
   *
   * {
   *   area_cargo: "Informática",
   *   lectura_politica: true,
   *   uso_imagen: "NO"
   * }
   */

  const [respuestas, setRespuestas] = useState({});

  /* =====================================================
     CARGAR CONSENTIMIENTO
     ===================================================== */

  const cargar = useCallback(async () => {
    if (!token) {
      setError("El enlace de consentimiento no es válido.");

      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await obtenerConsentimientoPublico(token);

      setData(response);

      setRespuestas(response?.respuesta?.respuestas ?? {});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo cargar la información.",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  /* =====================================================
     ACTUALIZAR RESPUESTA
     ===================================================== */

  function actualizarRespuesta(key, value) {
    setRespuestas((current) => ({
      ...current,

      [key]: value,
    }));

    /*
     * Si el usuario corrige algo,
     * quitamos el error anterior.
     */

    if (error) {
      setError("");
    }
  }

  /* =====================================================
     VALIDACIÓN CLIENTE
     ===================================================== */

  function validarFormulario() {
    const campos = data?.configuracion?.campos ?? [];

    for (const campo of campos) {
      const valor = respuestas[campo.key];

      /* =================================================
         TEXT
         ================================================= */

      if (campo.tipo === "TEXT" && campo.obligatorio) {
        if (typeof valor !== "string" || !valor.trim()) {
          return `"${campo.label}" es obligatorio.`;
        }
      }

      /* =================================================
         CHECKBOX
         ================================================= */

      if (campo.tipo === "CHECKBOX" && campo.obligatorio && valor !== true) {
        return `Debes confirmar "${campo.label}".`;
      }

      /* =================================================
         RADIO
         ================================================= */

      if (campo.tipo === "RADIO" && campo.obligatorio) {
        if (typeof valor !== "string" || !valor.trim()) {
          return `Debes responder "${campo.label}".`;
        }
      }
    }

    return null;
  }

  /* =====================================================
     RESPONDER
     ===================================================== */

  async function responder() {
    if (!data || !token) {
      return;
    }

    const validationError = validarFormulario();

    if (validationError) {
      setError(validationError);

      return;
    }

    try {
      setSaving(true);

      setError("");

      setSuccessMessage("");

      /*
       * "aceptado: true" representa que el
       * formulario fue firmado/confirmado.
       *
       * Las autorizaciones individuales
       * pueden perfectamente ser "NO".
       */

      const response = await responderConsentimientoPublico(token, {
        aceptado: true,

        respuestas,
      });

      setData(response);

      setRespuestas(response?.respuesta?.respuestas ?? respuestas);

      setSuccessMessage("Tu respuesta fue registrada correctamente.");

      /*
       * Recuperamos estado final del backend.
       */

      await cargar();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo registrar tu respuesta.",
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     REVOCAR
     ===================================================== */

  async function revocar() {
    if (!token) {
      return;
    }

    const confirmado = window.confirm(
      "¿Confirmas que deseas revocar este consentimiento?",
    );

    if (!confirmado) {
      return;
    }

    try {
      setSaving(true);

      setError("");

      setSuccessMessage("");

      await revocarConsentimientoPublico(token);

      setSuccessMessage("Tu consentimiento fue revocado correctamente.");

      await cargar();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo revocar el consentimiento.",
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <div className="pd-public-page">
        <div className="pd-public-loading">
          <div className="pd-spinner" />

          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  /* =====================================================
     ERROR SIN DATOS
     ===================================================== */

  if (error && !data) {
    return (
      <div className="pd-public-page">
        <div className="pd-public-state-card">
          <img src={logoRids} alt="RIDS" className="pd-state-logo" />

          <div className="pd-state-icon pd-state-icon-error">!</div>

          <h1>Enlace no disponible</h1>

          <p>{error}</p>

          <a href="/" className="pd-link-home">
            Ir a RIDS
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  /* =====================================================
     DATOS DERIVADOS
     ===================================================== */

  const config = data.configuracion;

  const campos = config?.campos ?? [];

  const estadoAceptado = data.estado === "ACEPTADO";

  const estadoRechazado = data.estado === "RECHAZADO";

  const estadoRevocado = data.estado === "REVOCADO";

  const yaRespondido =
    data.respondido || estadoAceptado || estadoRechazado || estadoRevocado;

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <main className="pd-public-page">
      <div className="pd-public-shell">
        {/* =================================================
            HEADER
            ================================================= */}

        <header className="pd-public-header">
          <a href="/" className="pd-public-logo-link">
            <img src={logoRids} alt="RIDS" className="pd-public-logo" />
          </a>

          <div className="pd-public-security">Documento seguro</div>
        </header>

        {/* =================================================
            CARD PRINCIPAL
            ================================================= */}

        <section className="pd-public-card">
          {/* =================================================
              TÍTULO
              ================================================= */}

          <div className="pd-public-title">
            <span className="pd-eyebrow">Protección de datos</span>

            <h1>
              {config?.tituloFormulario ??
                data.documento?.titulo ??
                "Tratamiento de datos personales"}
            </h1>

            <p>
              {config?.descripcionFormulario ??
                "Revisa la información antes de registrar tu decisión."}
            </p>
          </div>

          {/* =================================================
              DESTINATARIO
              ================================================= */}

          <div className="pd-person-card">
            <div>
              <span>Destinatario</span>

              <strong>{data.nombre || "Sin nombre"}</strong>
            </div>

            <div>
              <span>Correo</span>

              <strong>{data.email}</strong>
            </div>

            <div>
              <span>Empresa</span>

              <strong>{data.empresaNombre || "—"}</strong>
            </div>

            <div>
              <span>Versión</span>

              <strong>{data.documento?.version ?? "—"}</strong>
            </div>
          </div>

          {/* =================================================
              MENSAJES
              ================================================= */}

          {error && <div className="pd-alert pd-alert-error">{error}</div>}

          {successMessage && (
            <div className="pd-alert pd-alert-success">{successMessage}</div>
          )}

          {/* =================================================
              RESPUESTA REGISTRADA
              ================================================= */}

          {yaRespondido && (
            <div className="pd-response-summary">
              <span>Respuesta registrada</span>

              <h2>
                {estadoAceptado
                  ? "Formulario registrado"
                  : estadoRechazado
                    ? "Consentimiento rechazado"
                    : estadoRevocado
                      ? "Consentimiento revocado"
                      : "Respuesta registrada"}
              </h2>

              {data.fechaRespuesta && (
                <p>Registrado el {formatearFecha(data.fechaRespuesta)}</p>
              )}

              {data.fechaRevocacion && (
                <p>Revocado el {formatearFecha(data.fechaRevocacion)}</p>
              )}
            </div>
          )}

          {/* =================================================
              DOCUMENTO LEGAL
              ================================================= */}

          <section className="pd-section">
            <div className="pd-section-heading">
              <span>01</span>

              <div>
                <h2>Información del documento</h2>

                <p>Versión {data.documento?.version}</p>
              </div>
            </div>

            <div
              className="pd-document"
              dangerouslySetInnerHTML={{
                __html: data.documento?.html ?? "",
              }}
            />
          </section>

          {/* =================================================
              FORMULARIO DINÁMICO
              ================================================= */}

          {!yaRespondido && (
            <>
              {campos.map((campo, index) => {
                /*
                 * 01 ya corresponde al documento.
                 */

                const numero = String(index + 2).padStart(2, "0");

                return (
                  <section key={campo.key} className="pd-section">
                    <div className="pd-section-heading">
                      <span>{numero}</span>

                      <div>
                        <h2>
                          {campo.label}

                          {campo.obligatorio && (
                            <span className="pd-field-required">{" *"}</span>
                          )}
                        </h2>

                        {campo.descripcion && campo.tipo !== "CHECKBOX" && (
                          <p>{campo.descripcion}</p>
                        )}
                      </div>
                    </div>

                    <CampoFormulario
                      campo={campo}
                      value={respuestas[campo.key]}
                      disabled={saving}
                      onChange={(value) => {
                        actualizarRespuesta(campo.key, value);
                      }}
                    />
                  </section>
                );
              })}

              {/* =================================================
                  ACCIONES
                  ================================================= */}

              <div className="pd-actions">
                <button
                  type="button"
                  className="pd-btn pd-btn-primary"
                  disabled={saving}
                  onClick={responder}
                >
                  {saving
                    ? "Guardando..."
                    : (config?.textoBoton ?? "Enviar respuesta")}
                </button>
              </div>
            </>
          )}

          {/* =================================================
              REVOCACIÓN
              ================================================= */}

          {estadoAceptado && (
            <div className="pd-revoke">
              <p>Puedes revocar posteriormente el consentimiento registrado.</p>

              <button type="button" disabled={saving} onClick={revocar}>
                Revocar consentimiento
              </button>
            </div>
          )}
        </section>

        {/* =================================================
            FOOTER
            ================================================= */}

        <footer className="pd-public-footer">
          <span>© 2026 RIDS Soluciones Integrales de Tecnología</span>

          <a href="/politica-privacidad">Política de privacidad</a>
        </footer>
      </div>
    </main>
  );
}
