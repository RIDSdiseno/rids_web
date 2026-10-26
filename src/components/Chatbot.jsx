// src/components/Chatbox.jsx
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./Chatbot.css";

import {
  useAI,
} from "../hooks/useAI";

import {
  clearChatSession,
} from "../services/ai.service";

import {
  useNavigate,
} from "react-router-dom";

/* =====================================================
   GENERAR SESIÓN
===================================================== */

function createSessionId() {
  return crypto.randomUUID();
}

const Chatbot = () => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    inputValue,
    setInputValue,
  ] = useState("");

  const [
    clearing,
    setClearing,
  ] = useState(false);

  const chatContainerRef =
    useRef(null);

  const navigate =
    useNavigate();

  /* =====================================================
     SESIÓN ÚNICA POR PESTAÑA
  ===================================================== */

  const [
    sessionId,
    setSessionId,
  ] = useState(() => {
    const existing =
      sessionStorage.getItem(
        "rids-ai-session"
      );

    if (existing) {
      return existing;
    }

    const newSessionId =
      createSessionId();

    sessionStorage.setItem(
      "rids-ai-session",
      newSessionId
    );

    return newSessionId;
  });

  const {
    messages,
    ask,
    loading,
    clearMessages,
  } = useAI(sessionId);

  /* =====================================================
     AUTO SCROLL
  ===================================================== */

  useEffect(() => {
    if (
      chatContainerRef.current
    ) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [
    messages,
    loading,
  ]);

  /* =====================================================
     ABRIR / CERRAR
  ===================================================== */

  const toggleChat = () => {
    setIsOpen(
      (prev) => !prev
    );
  };

  /* =====================================================
     REDIRECCIONES RIDSI
  ===================================================== */

  const handleRedirect = (
    target
  ) => {
    const routes = {
      PLANES:
        "/planes",

      SERVICIOS:
        "/servicios1",

      SOBRE_NOSOTROS:
        "/sobrenosotros",

      FOOTER:
        "#footer",
    };

    const route =
      routes[target];

    if (!route) {
      return;
    }

    if (
      route.startsWith("#")
    ) {
      const element =
        document.querySelector(
          route
        );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }

      return;
    }

    navigate(route);
  };

  /* =====================================================
     ENVIAR MENSAJE
  ===================================================== */

  const handleSendMessage =
    async (e) => {
      e.preventDefault();

      const text =
        inputValue.trim();

      if (
        !text ||
        loading
      ) {
        return;
      }

      setInputValue("");

      const data =
        await ask(text);

      if (
        data?.action?.type ===
        "redirect" &&
        data?.action?.target
      ) {
        handleRedirect(
          data.action.target
        );
      }
    };

  /* =====================================================
     NUEVA CONVERSACIÓN
  ===================================================== */

  const handleNewConversation =
    async () => {
      if (
        loading ||
        clearing
      ) {
        return;
      }

      setClearing(true);

      try {
        await clearChatSession(
          sessionId
        );
      } finally {
        const newSessionId =
          createSessionId();

        sessionStorage.setItem(
          "rids-ai-session",
          newSessionId
        );

        setSessionId(
          newSessionId
        );

        clearMessages();

        setInputValue("");

        setClearing(false);
      }
    };

  return (
    <div className="chatbot-wrapper">

      {/* BOTÓN FLOTANTE */}
      <button
        type="button"
        className="chatbot-float-btn"
        onClick={toggleChat}
        aria-label={
          isOpen
            ? "Cerrar asistente RIDS"
            : "Abrir asistente RIDS"
        }
      >
        {isOpen ? (
          "✖"
        ) : (
          <img
            src="/bot-2.png"
            alt="Asistente RIDS"
            className="chatbot-avatar-float"
          />
        )}
      </button>

      {isOpen && (
        <div
          className="chatbot-modal"
          role="dialog"
          aria-label="Asistente virtual RIDS"
        >

          {/* HEADER */}
          <div className="chatbot-header">

            <div className="chatbot-header-info">
              <span className="chatbot-title">
                Asistente RIDS
              </span>

              <span className="chatbot-subtitle">
                En línea
              </span>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-new-btn"
                onClick={
                  handleNewConversation
                }
                disabled={
                  loading ||
                  clearing
                }
                title="Iniciar nueva conversación"
              >
                {clearing
                  ? "..."
                  : "Nueva"}
              </button>

              <button
                type="button"
                className="chatbot-close-btn"
                onClick={toggleChat}
                aria-label="Cerrar asistente"
              >
                ✖
              </button>
            </div>
          </div>

          {/* MENSAJES */}
          <div
            className="chatbot-messages"
            ref={
              chatContainerRef
            }
          >
            {messages.length ===
              0 && (
                <>
                  <div className="message assistant">
                    <div className="message-text">
                      Hola 👋, soy el
                      asistente virtual de
                      RIDS. ¿En qué te puedo
                      ayudar hoy?
                    </div>
                  </div>

                  <div className="chatbot-privacy-notice">
                    <span
                      className="chatbot-privacy-icon"
                      aria-hidden="true"
                    >
                      🔒
                    </span>

                    <div>
                      <strong>
                        Privacidad
                      </strong>

                      <p>
                        Tus consultas pueden
                        ser procesadas
                        mediante servicios de
                        inteligencia
                        artificial. Evita
                        compartir contraseñas,
                        datos bancarios,
                        información médica u
                        otros datos sensibles.
                      </p>

                      <a
                        href="/politica-privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Más información
                      </a>
                    </div>
                  </div>
                </>
              )}

            {messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  className={`message ${msg.role ===
                    "user"
                    ? "user"
                    : "assistant"
                    }`}
                >
                  <div className="message-text">
                    {msg.content}
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="message assistant">
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <form
            className="chatbot-input-area"
            onSubmit={
              handleSendMessage
            }
          >
            <input
              type="text"
              maxLength={2000}
              placeholder="Escribe tu consulta..."
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  e.target.value
                )
              }
              disabled={
                loading ||
                clearing
              }
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={
                loading ||
                clearing ||
                !inputValue.trim()
              }
              aria-label="Enviar mensaje"
            >
              {loading
                ? "..."
                : "➤"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;