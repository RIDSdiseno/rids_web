import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { useAI } from "../hooks/useAI";
import { useNavigate } from "react-router-dom"; // ✅ Para mover al usuario físicamente

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  // Usamos el hook que ya tienes, pasando el sessionId
  const { messages, ask, loading } = useAI("rids-session-1");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Mapeo de targets del prompt a rutas reales de tu web
  const handleRedirect = (target) => {
    const routes = {
      'PLANES': '/planes',
      'SERVICIOS': '/servicios',
      'SOBRE_NOSOTROS': '/nosotros',
      'FOOTER': '#footer'
    };

    if (routes[target]) {
      console.log(`🎯 RIDSI redirigiendo a ${target}...`);
      if (routes[target].startsWith('#')) {
        window.location.href = routes[target];
      } else {
        navigate(routes[target]);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const text = inputValue;
    setInputValue("");

    // 1. Llamamos a la IA a través del hook
    // OJO: Tu hook 'ask' debe retornar la data del backend (result)
    const data = await ask(text);

    // 2. 🚀 MAGIA PROACTIVA (Regla 5 y 7)
    // Si la IA dice que hay que mover al usuario, lo movemos
    if (data?.action?.type === 'redirect' && data?.action?.target) {
      handleRedirect(data.action.target);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-float-btn" onClick={toggleChat}>
        {isOpen ? "✖" : "🤖"}
      </button>

      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-title">Asistente RIDS</span>
              <span className="chatbot-subtitle">En línea</span>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat}>✖</button>
          </div>

          <div className="chatbot-messages" ref={chatContainerRef}>
            {messages.length === 0 && (
              <div className="message assistant">
                <div className="message-text">
                  Hola 👋, soy el asistente virtual de RIDS. ¿En qué te puedo ayudar hoy?
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
                <div className="message-text">{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <form className="chatbot-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !inputValue.trim()}>
              {loading ? "..." : "➤"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;