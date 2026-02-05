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
      const data = await sendChatToIA(text, sessionId);
      
      // Verificamos data.success o data.ok según lo que envíe tu backend
      if (data.success || data.ok) {
        const aiMsg: Message = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMsg]);

        // ✅ VITAL: Retornamos la data completa para que Chatbot.jsx 
        // pueda leer data.action y ejecutar la redirección.
        return data; 
      }
    } catch (error) {
      console.error("Error en useAI:", error);
      return null; // Retornamos algo para evitar errores de undefined
    } finally {
      setLoading(false);
    }
  };

  return { messages, ask, loading };
};