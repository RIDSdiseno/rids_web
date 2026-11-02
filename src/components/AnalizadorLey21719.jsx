// AnalizadorLey21719.jsx — página "Analizador Ley 21.719" de rids.cl
// Ruta: /analizador-ley-21719. Usa el Header y el Footer del sitio (se agregan en App.js).
// La API vive en ridsweb-backend (/api/analizador). Su dirección se define en
// VITE_ANALIZADOR_API (archivo .env del front) al momento de hacer "npm run build".
import { useEffect, useRef, useState } from "react";
import "./AnalizadorLey21719.css";

const API_BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:4000/api"
        : "https://ridsweb-backend-production.up.railway.app/api";

const API_ANALIZADOR = `${API_BASE_URL}/analizador`;


const ESTADOS = {
    ok: { txt: "Cumple", cls: "ok" },
    parcial: { txt: "Por mejorar", cls: "parcial" },
    falla: { txt: "No cumple", cls: "falla" },
    revisar: { txt: "Revisar", cls: "parcial" },
    na: { txt: "No aplica", cls: "na" },
};
const PASOS = [
    "Conectando con el sitio",
    "Revisando seguridad y certificado",
    "Cargando el sitio como un visitante (sin aceptar cookies)",
    "Leyendo la política de privacidad",
    "Preparando su informe",
];
const AREAS = [
    ["Art. 14 ter", "Transparencia", "Política de privacidad publicada y con los 14 contenidos mínimos del art. 14 ter."],
    ["Arts. 5 a 9", "Derechos", "Acceso, rectificación, supresión, oposición, bloqueo y portabilidad."],
    ["Art. 12", "Cookies", "Aviso de consentimiento y cookies de analítica o publicidad instaladas antes de aceptar."],
    ["Arts. 12 y 14 ter", "Formularios", "Aviso de finalidad, casillas sin marcar y envío cifrado de los datos."],
    ["Art. 14 quinquies", "Seguridad", "Certificado SSL, HTTPS, cabeceras de seguridad y versiones expuestas."],
    ["Art. 14 quinquies", "Correo", "Registros SPF y DMARC que evitan la suplantación del dominio."],
];

export default function AnalizadorLey21719({
    api = API_ANALIZADOR,               // ← solo cambia esto
    urlPrivacidad = "/politica-privacidad",
    urlContacto = "/#contacto",
}) {
    const [f, setF] = useState({ sitio: "", nombre: "", email: "", empresa: "", telefono: "", acepta: false, novedades: false, web: "" });
    const [fase, setFase] = useState("form"); // form | analizando | listo
    const [paso, setPaso] = useState(PASOS[0]);
    const [error, setError] = useState("");
    const [res, setRes] = useState(null);
    const [correo, setCorreo] = useState(null);
    const vivo = useRef(true);
    const arriba = useRef(null);
    useEffect(() => {
        // StrictMode (desarrollo) monta, desmonta y vuelve a montar: se reactiva aquí
        vivo.current = true;
        const anterior = document.title;
        document.title = "Analizador gratuito Ley 21.719 | RIDS";
        return () => { vivo.current = false; document.title = anterior; };
    }, []);

    const cambiar = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

    async function enviar(e) {
        e.preventDefault();
        setError("");
        if (!f.acepta) return setError("Para enviarle el informe necesitamos que acepte el tratamiento de sus datos.");
        setFase("analizando");
        setPaso(PASOS[0]);
        arriba.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
            const r = await fetch(`${api}/analisis`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
            const j = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(j.error || "No pudimos iniciar el análisis.");
            const inicio = Date.now();
            while (vivo.current) {
                await new Promise((ok) => setTimeout(ok, 1500));
                const q = await fetch(`${api}/analisis/${j.id}`);
                const s = await q.json().catch(() => ({}));
                if (!q.ok) throw new Error(s.error || "Se perdió la conexión con el análisis.");
                if (s.paso) setPaso(s.paso);
                if (s.estado === "error") throw new Error(s.error);
                if (s.estado === "listo") {
                    setRes(s.resultado);
                    setCorreo(s.correo);
                    setFase("listo");
                    // El correo se envía justo después: se consulta un par de veces más para mostrar si salió
                    for (let i = 0; i < 6 && vivo.current && s.correo === "enviando"; i++) {
                        await new Promise((ok) => setTimeout(ok, 2000));
                        const z = await (await fetch(`${api}/analisis/${j.id}`)).json().catch(() => ({}));
                        if (z.correo && z.correo !== "enviando") { setCorreo(z.correo); break; }
                    }
                    return;
                }
                if (Date.now() - inicio > 150000) throw new Error("El sitio tardó demasiado en responder. Intente de nuevo.");
            }
        } catch (err) {
            if (!vivo.current) return;
            setError(err.message || "Ocurrió un error.");
            setFase("form");
        }
    }

    return (
        <div className="al-raiz al-en-rids" ref={arriba}>
            <header className="al-hero">
                <div className="al-contenedor al-hero-grid">
                    <div className="al-hero-texto">
                        <span className="al-etiqueta">Herramienta gratuita · Ley 21.719</span>
                        <h1>¿Su sitio web cumple con la <span>nueva ley de protección de datos</span>?</h1>
                        <p className="al-bajada">
                            Desde el <strong>1 de diciembre de 2026</strong> las empresas deben informar cómo tratan los datos personales,
                            pedir consentimiento para las cookies y proteger la información que reciben. Revise su sitio en un minuto y
                            reciba el informe detallado en su correo.
                        </p>
                        <ul className="al-ventajas">
                            <li>Revisión de 6 áreas y más de 15 controles</li>
                            <li>Informe en PDF con lo que debe corregir primero</li>
                            <li>Sin costo y sin instalar nada</li>
                        </ul>
                    </div>

                    <div className="al-tarjeta">
                        {fase === "form" && (
                            <form onSubmit={enviar} noValidate={false}>
                                <h2>Analizar mi sitio</h2>
                                <label className="al-campo">
                                    <span>Sitio web</span>
                                    <input required inputMode="url" autoComplete="url" placeholder="miempresa.cl" value={f.sitio} onChange={cambiar("sitio")} />
                                </label>
                                <div className="al-fila">
                                    <label className="al-campo">
                                        <span>Nombre</span>
                                        <input required autoComplete="name" value={f.nombre} onChange={cambiar("nombre")} />
                                    </label>
                                    <label className="al-campo">
                                        <span>Empresa <em>(opcional)</em></span>
                                        <input autoComplete="organization" value={f.empresa} onChange={cambiar("empresa")} />
                                    </label>
                                </div>
                                <div className="al-fila">
                                    <label className="al-campo">
                                        <span>Correo para recibir el informe</span>
                                        <input required type="email" autoComplete="email" placeholder="nombre@empresa.cl" value={f.email} onChange={cambiar("email")} />
                                    </label>
                                    <label className="al-campo">
                                        <span>Teléfono <em>(opcional)</em></span>
                                        <input type="tel" autoComplete="tel" placeholder="+56 9" value={f.telefono} onChange={cambiar("telefono")} />
                                    </label>
                                </div>
                                {/* Campo trampa para bots: oculto a las personas */}
                                <input className="al-oculto" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.web} onChange={cambiar("web")} name="web" />
                                <label className="al-check">
                                    <input type="checkbox" checked={f.acepta} onChange={cambiar("acepta")} required />
                                    <span>
                                        Acepto que RIDS trate mis datos para enviarme este informe y contactarme sobre su resultado, según su{" "}
                                        <a href={urlPrivacidad} target="_blank" rel="noopener">política de privacidad</a>.
                                    </span>
                                </label>
                                <label className="al-check">
                                    <input type="checkbox" checked={f.novedades} onChange={cambiar("novedades")} />
                                    <span>Quiero recibir novedades sobre protección de datos y ciberseguridad (opcional).</span>
                                </label>
                                {error && <p className="al-error" role="alert">{error}</p>}
                                <button className="al-boton" type="submit">Analizar gratis</button>
                                <p className="al-nota">Revisamos solo información pública del sitio. Puede retirar su consentimiento cuando quiera escribiendo a RIDS.</p>
                            </form>
                        )}

                        {fase === "analizando" && (
                            <div className="al-progreso" aria-live="polite">
                                <h2>Analizando {f.sitio.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}</h2>
                                <ol>
                                    {PASOS.map((p, i) => {
                                        const actual = Math.max(0, PASOS.indexOf(paso));
                                        return (
                                            <li key={p} className={i < actual ? "hecho" : i === actual ? "activo" : ""}>
                                                <span className="al-punto" />{p}
                                            </li>
                                        );
                                    })}
                                </ol>
                                <p className="al-nota">Toma entre 20 y 60 segundos.</p>
                            </div>
                        )}

                        {fase === "listo" && res && <Resultado res={res} correo={correo} email={f.email} urlContacto={urlContacto}
                            otra={() => { setFase("form"); setRes(null); setF((x) => ({ ...x, sitio: "" })); }} />}
                    </div>
                </div>
            </header>

            <section className="al-seccion">
                <div className="al-contenedor">
                    <h2 className="al-titulo-seccion">Qué revisamos</h2>
                    <p className="al-subtitulo">Seis áreas de la Ley 21.719 que cualquier visitante, y la Agencia de Protección de Datos, puede ver en su sitio.</p>
                    <div className="al-areas">
                        {AREAS.map(([art, t, d]) => (
                            <article key={t} className="al-area">
                                <span className="al-num">{art}</span>
                                <h3>{t}</h3>
                                <p>{d}</p>
                            </article>
                        ))}
                    </div>
                    <p className="al-alcance">
                        El análisis es automático y revisa lo que cualquier visitante ve del sitio. No reemplaza la revisión de sistemas internos,
                        contratos con proveedores ni los demás deberes de la Ley 21.719, y no constituye asesoría legal.
                    </p>
                </div>
            </section>
        </div>
    );
}

function Resultado({ res, correo, email, urlContacto, otra }) {
    const nivel = res.puntaje >= 80 ? "ok" : res.puntaje >= 55 ? "parcial" : "falla";
    const C = 2 * Math.PI * 52;
    return (
        <div className="al-resultado" aria-live="polite">
            <div className="al-puntaje">
                <svg viewBox="0 0 120 120" className={`al-anillo ${nivel}`} role="img" aria-label={`Puntaje ${res.puntaje} de 100`}>
                    <circle cx="60" cy="60" r="52" className="al-anillo-fondo" />
                    <circle cx="60" cy="60" r="52" className="al-anillo-valor" strokeDasharray={`${(C * res.puntaje) / 100} ${C}`} transform="rotate(-90 60 60)" />
                    <text x="60" y="64" textAnchor="middle">{res.puntaje}</text>
                    <text x="60" y="82" textAnchor="middle" className="al-de">de 100</text>
                </svg>
                <div>
                    <p className="al-dominio">{res.dominio}</p>
                    <p className={`al-nivel ${nivel}`}>Nivel {String(res.nivel || "").toLowerCase()}</p>
                    <p className="al-nota">{res.totalHallazgos} punto(s) por corregir</p>
                </div>
            </div>

            <ul className="al-categorias">
                {(res.categorias || []).map((c) => {
                    const e = ESTADOS[c.estado] ?? ESTADOS.na;
                    return (
                        <li key={c.nombre}>
                            <span>{c.nombre}</span>
                            <span className={`al-chip ${e.cls}`}>{e.txt}</span>
                        </li>
                    );
                })}
            </ul>

            {res.hallazgos?.length > 0 && (
                <div className="al-hallazgos">
                    <h3>Principales hallazgos</h3>
                    {res.hallazgos.map((h) => (
                        <p key={h.titulo}><strong>{h.titulo}.</strong> {h.detalle}</p>
                    ))}
                </div>
            )}

            <div className={`al-aviso-correo ${correo === "error" ? "falla" : ""}`}>
                {correo === "error"
                    ? <>No pudimos enviar el informe a <strong>{email}</strong>. Escríbanos y se lo hacemos llegar.</>
                    : correo === "enviado"
                        ? <>Enviamos el informe completo en PDF a <strong>{email}</strong>.</>
                        : <>Estamos enviando el informe completo a <strong>{email}</strong>…</>}
            </div>

            <div className="al-acciones">
                <a className="al-boton" href={urlContacto}>Hablar con RIDS</a>
                <button type="button" className="al-boton al-secundario" onClick={otra}>Analizar otro sitio</button>
            </div>
        </div>
    );
}
