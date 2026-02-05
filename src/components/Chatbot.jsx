import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { useAI } from "../hooks/useAI";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const { messages, ask, loading } = useAI("rids-session-1");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const text = inputValue;
    setInputValue("");
    await ask(text);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Botón Flotante - Ajustado a tu CSS .chatbot-float-btn */}
      <button className="chatbot-float-btn" onClick={toggleChat}>
        {isOpen ? "✖" : "🤖"}
      </button>

      {isOpen && (
        /* Ventana - Ajustado a tu CSS .chatbot-modal */
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-title">Asistente RIDS</span>
              <span className="chatbot-subtitle text-xs">En línea</span>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat}>✖</button>
          </div>

          <div className="chatbot-messages" ref={chatContainerRef}>
            {messages.length === 0 && (
              <div className="message assistant">
                Hola, soy el asistente virtual de RIDS. ¿En qué puedo ayudarte hoy?
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
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

          {/* Input Area - Ajustado a tu CSS .chatbot-input-area */}
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