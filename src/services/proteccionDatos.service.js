const API_URL =
    process.env.REACT_APP_CRM_API_URL ||
    "http://localhost:4000/api";

async function parseResponse(response) {
    let data = null;

    try {
        data =
            await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.error ||
            data?.message ||
            "No se pudo completar la solicitud."
        );
    }

    /*
     * Soporta tanto:
     *
     * { ok: true, data: {...} }
     *
     * como respuesta directa.
     */
    return data?.data ?? data;
}

export async function obtenerConsentimientoPublico(
    token
) {
    const response =
        await fetch(
            `${API_URL}/proteccion-datos/publico/${encodeURIComponent(
                token
            )}`,
            {
                method:
                    "GET",

                headers: {
                    Accept:
                        "application/json",
                },
            }
        );

    return parseResponse(
        response
    );
}

export async function responderConsentimientoPublico(
    token,
    payload
) {
    const response =
        await fetch(
            `${API_URL}/proteccion-datos/publico/${encodeURIComponent(
                token
            )}/responder`,
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Accept:
                        "application/json",
                },

                body:
                    JSON.stringify(
                        payload
                    ),
            }
        );

    return parseResponse(
        response
    );
}

export async function revocarConsentimientoPublico(
    token,
    motivo = null
) {
    const response =
        await fetch(
            `${API_URL}/proteccion-datos/publico/${encodeURIComponent(
                token
            )}/revocar`,
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Accept:
                        "application/json",
                },

                body:
                    JSON.stringify({
                        motivo,
                    }),
            }
        );

    return parseResponse(
        response
    );
}