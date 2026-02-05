// src/services/ai.service.ts

// Usamos la URL de Railway para producción y localhost solo como respaldo para desarrollo
const API_URL = "https://ridsweb-backend-production.up.railway.app/api/ia";

export const sendChatToIA = async (text: string, sessionId: string) => {
  try {
    const response = await fetch(`${API_URL}/chat`, { // ✅ Sin puertos raros
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    return await response.json(); 
    
  } catch (error) {
    console.error("Error en sendChatToIA:", error);
    return { ok: false, error: "No se pudo conectar con el servidor de RIDS." };
  }
};