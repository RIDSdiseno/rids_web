// src/hooks/useAI.ts
import {
  useState,
} from "react";

import {
  sendChatToIA,
} from "../services/ai.service";

interface Message {
  role:
  | "user"
  | "assistant";

  content: string;
}

export const useAI = (
  sessionId: string
) => {
  const [
    messages,
    setMessages,
  ] = useState<Message[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* =====================================================
     ENVIAR MENSAJE
  ===================================================== */

  const ask = async (
    text: string
  ) => {
    const cleanText =
      text.trim();

    if (!cleanText) {
      return null;
    }

    const userMsg: Message = {
      role: "user",
      content: cleanText,
    };

    setMessages(
      (prev) => [
        ...prev,
        userMsg,
      ]
    );

    setLoading(true);

    try {
      const data =
        await sendChatToIA(
          cleanText,
          sessionId
        );

      if (data?.ok) {
        const aiMsg: Message = {
          role: "assistant",
          content:
            data.reply ||
            "No pude generar una respuesta.",
        };

        setMessages(
          (prev) => [
            ...prev,
            aiMsg,
          ]
        );

        return data;
      }

      const errorMsg: Message = {
        role: "assistant",

        content:
          data?.error ||
          "No pude procesar tu consulta en este momento.",
      };

      setMessages(
        (prev) => [
          ...prev,
          errorMsg,
        ]
      );

      return null;
    } catch {
      setMessages(
        (prev) => [
          ...prev,

          {
            role: "assistant",

            content:
              "No pude conectarme con el servicio en este momento. Intenta nuevamente más tarde.",
          },
        ]
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LIMPIAR MENSAJES LOCALES
  ===================================================== */

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    ask,
    loading,
    clearMessages,
  };
};