// src/components/ChatBotWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChatBotWidget.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ridsweb-backend-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hola 👋, soy el asistente virtual de RIDS. ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 🧠 Mantener sesión del bot (también en localStorage para que sobreviva recargas)
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("rids_ia_session_id");
  });

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Auto scroll al final cuando llegan nuevos mensajes o está escribiendo
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const scrollToElement = (id) => {
    if (typeof document === "undefined") return;

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // pequeño retry por si el DOM aún no está listo
      setTimeout(() => {
        const retry = document.getElementById(id);
        if (retry) {
          retry.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  // Navega al home y luego hace scroll a un id
  const goHomeAndScroll = (id) => {
    navigate("/");
    setTimeout(() => {
      scrollToElement(id);
    }, 200);
  };

  const handleRedirect = (redirectTo) => {
    if (!redirectTo) return;

    switch (redirectTo) {
      case "planes":
        // Página interna de planes (ruta dedicada)
        navigate("/planes");
        break;

      case "servicios":
        // Página interna de servicios
        navigate("/servicios1");
        break;

      case "sobreNosotros":
        // Página interna sobre nosotros
        navigate("/sobrenosotros");
        break;

      case "footer":
        // Footer está presente en todas las páginas (envuelto en div id="footer")
        scrollToElement("footer");
        break;

      // 👇 Estos los dejo listos por si luego agregas códigos CONTACTO / FAQ
      case "contacto":
        goHomeAndScroll("contacto");
        break;

      case "faq":
        goHomeAndScroll("faq-rids");
        break;

      case "inicio":
      case "home":
        goHomeAndScroll("hero");
        break;

      default:
        break;
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    addMessage({ from: "user", text });
    setInput("");
    setIsTyping(true);

    try {
      const body = {
        text,
        channel: "web",
      };

      // Solo mandamos sessionId si ya existe
      if (sessionId) {
        body.sessionId = sessionId;
      }

      const { data } = await api.post("/api/ia/chat", body);

      if (!data.ok) {
        addMessage({
          from: "bot",
          text:
            data?.error ===
            "Demasiadas solicitudes seguidas, intenta nuevamente en unos segundos."
              ? "Estás enviando mensajes muy seguido. Intentémoslo de nuevo en unos segundos. ⏳"
              : "Hubo un problema al procesar tu mensaje. Intenta nuevamente en un momento. 😓",
        });
      } else {
        // Guardar/actualizar sessionId (en estado y localStorage)
        if (data.sessionId && data.sessionId !== sessionId) {
          setSessionId(data.sessionId);
          if (typeof window !== "undefined") {
            localStorage.setItem("rids_ia_session_id", data.sessionId);
          }
        }

        addMessage({
          from: "bot",
          text: data.reply || "No pude generar una respuesta en este momento.",
        });

        // 👇 Si el backend indicó una redirección, la manejamos
        if (data.redirectTo) {
          handleRedirect(data.redirectTo);
        }
      }
    } catch (err) {
      console.error("[CHATBOT] Error conectando al backend de IA:", err);

      addMessage({
        from: "bot",
        text:
          "No pude conectar con el servidor en este momento 😵. Revisa tu conexión o intenta otra vez más tarde.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              {/* 👇 Imagen grande y clara del bot */}
              <img
                src="/bot-2.png"
                alt="Bot RIDS"
                className="chatbot-avatar-header"
              />
              <div>
                <div className="chatbot-title">Asistente RIDS</div>
                <div className="chatbot-subtitle">
                  Soporte y ventas • En línea
                </div>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={toggleOpen}
              aria-label="Cerrar chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${
                  msg.from === "user" ? "from-user" : "from-bot"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message from-bot chatbot-typing">
                Escribiendo…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Enviar">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante con la imagen bien visible */}
      <button
        className="chatbot-float-btn"
        onClick={toggleOpen}
        aria-label="Abrir chat del bot"
      >
        <img
          src="/bot-2.png"
          alt="Bot RIDS"
          className="chatbot-avatar-float"
        />
      </button>
    </>
  );
}
