import { useState } from "react";
import { sendChatToIA } from "../services/ai.service";

// 1. Definimos la estructura del objeto (Contrato de Ingeniería)
interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useAI = (sessionId: string) => {
  // 2. Le decimos a useState que manejará un ARRAY de Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const ask = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    
    // Ahora 'prev' sabe que es de tipo Message[] y no dará error
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await sendChatToIA(text, sessionId);
      if (data.success) {
        const aiMsg: Message = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Error en useAI:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, ask, loading };
};