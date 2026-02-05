const API_URL = "http://localhost:4000/api/ia"; // Asegúrate de que este sea tu puerto

export const sendChatToIA = async (text: string, sessionId: string) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, sessionId }),
  });
  return response.json();
};