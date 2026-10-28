// src/components/CookieConsent.jsx

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./CookieConsent.css";

const STORAGE_KEY = "rids-cookie-consent";

const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      setPreferences({
        necessary: true,

        analytics: Boolean(parsed?.analytics),

        marketing: Boolean(parsed?.marketing),
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      setVisible(true);
    }
  }, []);

  const savePreferences = (nextPreferences) => {
    const data = {
      necessary: true,

      analytics: Boolean(nextPreferences.analytics),

      marketing: Boolean(nextPreferences.marketing),

      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    setPreferences(data);

    setVisible(false);
    setShowSettings(false);

    window.dispatchEvent(
      new CustomEvent("rids-cookie-consent-changed", {
        detail: data,
      }),
    );
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="cookie-consent-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-card">
        <div className="cookie-consent-content">
          <h2 id="cookie-consent-title">Tú decides sobre las cookies</h2>

          <p>
            Usamos cookies necesarias para que el sitio funcione. Con tu
            permiso, también podremos utilizar cookies de analítica y marketing
            para entender cómo se usa el sitio y medir nuestras campañas.
          </p>

          <p>
            Puedes cambiar tu decisión cuando quieras.{" "}
            <Link to="/cookies">Más información</Link>
          </p>
        </div>

        {showSettings && (
          <div className="cookie-settings">
            <div className="cookie-setting-item">
              <div>
                <strong>Cookies necesarias</strong>

                <p>
                  Son necesarias para el funcionamiento básico del sitio y no
                  pueden desactivarse.
                </p>
              </div>

              <input
                type="checkbox"
                checked
                disabled
                aria-label="Cookies necesarias activadas"
              />
            </div>

            <div className="cookie-setting-item">
              <div>
                <strong>Cookies de analítica</strong>

                <p>
                  Permiten obtener información estadística sobre el uso del
                  sitio.
                </p>
              </div>

              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,

                    analytics: e.target.checked,
                  }))
                }
                aria-label="Cookies de analítica"
              />
            </div>

            <div className="cookie-setting-item">
              <div>
                <strong>Cookies de marketing</strong>

                <p>
                  Permiten medir campañas o personalizar comunicaciones
                  publicitarias cuando estas tecnologías sean utilizadas.
                </p>
              </div>

              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,

                    marketing: e.target.checked,
                  }))
                }
                aria-label="Cookies de marketing"
              />
            </div>
          </div>
        )}

        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-secondary"
            onClick={handleRejectAll}
          >
            Rechazar
          </button>

          <button
            type="button"
            className="cookie-btn cookie-btn-outline"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            {showSettings ? "Ocultar configuración" : "Configurar"}
          </button>

          {showSettings ? (
            <button
              type="button"
              className="cookie-btn cookie-btn-primary"
              onClick={handleSaveSettings}
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              type="button"
              className="cookie-btn cookie-btn-primary"
              onClick={handleAcceptAll}
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
