import { useState } from "react";
import { sendChatToIA } from "../services/ai.service";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useAI = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const ask = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // 1. Llamamos al servicio (que ya debería traer reply, intent y action)
      const data = await sendChatToIA(text, sessionId);
      
      if (data.ok || data.success) {
        const aiMsg: Message = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMsg]);
        
        // 2. VITAL: Retornamos la data completa al componente Chatbot.jsx
        // para que pueda leer data.action y ejecutar la redirección.
        return data; 
      }
    } catch (error) {
      console.error("Error en useAI:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { messages, ask, loading };
};