// src/services/ai.service.ts

// Usamos la URL de Railway para producción y localhost solo como respaldo para desarrollo
//const API_URL = "https://ridsweb-backend-production.up.railway.app/api/ia";
const API_URL = "http://localhost:4000";

/* =====================================================
   ENVIAR MENSAJE A RIDSI
===================================================== */

export const sendChatToIA = async (
  text: string,
  sessionId: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/ia/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text,
          sessionId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error:
          data?.error ||
          "No fue posible procesar la consulta.",
      };
    }

    return data;
  } catch (error) {
    console.error(
      "[AI] Error de conexión:",
      error instanceof Error
        ? error.message
        : "Error desconocido"
    );

    return {
      ok: false,
      error:
        "No se pudo conectar con el servidor de RIDS.",
    };
  }
};

/* =====================================================
   ELIMINAR MEMORIA DE UNA SESIÓN
===================================================== */

export const clearChatSession = async (
  sessionId: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/ia/clear`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          sessionId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error:
          data?.error ||
          "No fue posible eliminar la conversación.",
      };
    }

    return data;
  } catch (error) {
    console.error(
      "[AI] Error eliminando sesión:",
      error instanceof Error
        ? error.message
        : "Error desconocido"
    );

    return {
      ok: false,
      error:
        "No se pudo eliminar la conversación.",
    };
  }
};