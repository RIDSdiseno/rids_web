import React, {
    useEffect,
} from "react";

import {
    Link,
} from "react-router-dom";

import "./PrivacyPolicy.css";

export default function LegalNotice() {
    useEffect(() => {
        window.scrollTo(
            0,
            0
        );
    }, []);

    return (
        <main className="privacy-page">
            <div className="privacy-container">

                <header className="privacy-header">
                    <span className="privacy-badge">
                        Información legal
                    </span>

                    <h1>
                        Aviso Legal
                    </h1>

                    <p className="privacy-updated">
                        Última actualización: octubre de 2026
                        <br />
                        Versión: 1.0
                    </p>

                    <p className="privacy-intro">
                        El presente Aviso Legal regula el
                        acceso y utilización del sitio web
                        de RIDS.
                    </p>
                </header>

                <section className="privacy-section">
                    <h2>
                        1. Titular del sitio
                    </h2>

                    <div className="privacy-box">
                        <p>
                            <strong>
                                Asesorías RIDS Limitada
                            </strong>
                        </p>

                        <p>
                            RUT 77.825.186-8
                        </p>

                        <p>
                            La Concepción 65,
                            Oficina 1003,
                            Providencia,
                            Región Metropolitana,
                            Chile.
                        </p>

                        <p>
                            Sitio web: www.rids.cl
                        </p>

                        <p>
                            Correo de contacto:{" "}
                            <a href="mailto:soporte@rids.cl">
                                soporte@rids.cl
                            </a>
                        </p>
                    </div>
                </section>

                <section className="privacy-section">
                    <h2>
                        2. Objeto del sitio
                    </h2>

                    <p>
                        El sitio web de RIDS tiene por
                        finalidad proporcionar información
                        sobre la empresa, sus servicios,
                        soluciones tecnológicas y canales
                        de contacto.
                    </p>

                    <p>
                        También puede ofrecer herramientas
                        destinadas a facilitar la interacción
                        de los usuarios con RIDS, incluyendo
                        formularios de contacto y asistentes
                        virtuales.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        3. Uso del sitio
                    </h2>

                    <p>
                        El usuario se compromete a utilizar
                        el sitio web de forma lícita y de
                        acuerdo con la legislación aplicable.
                    </p>

                    <p>
                        No está permitido utilizar las
                        funcionalidades del sitio para
                        afectar su disponibilidad, seguridad
                        o funcionamiento, ni para realizar
                        actividades ilícitas.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        4. Información publicada
                    </h2>

                    <p>
                        RIDS procura mantener actualizada y
                        correcta la información publicada
                        en este sitio.
                    </p>

                    <p>
                        Sin embargo, determinados contenidos
                        pueden ser modificados, actualizados
                        o retirados cuando existan cambios
                        comerciales, técnicos u
                        operacionales.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        5. Propiedad intelectual
                    </h2>

                    <p>
                        Los contenidos, diseños, elementos
                        gráficos, marcas, logotipos,
                        fotografías, textos y demás
                        elementos del sitio pertenecen a
                        RIDS o son utilizados conforme a
                        las autorizaciones correspondientes.
                    </p>

                    <p>
                        No podrán ser reproducidos,
                        distribuidos o utilizados fuera de
                        los casos permitidos por la
                        legislación aplicable sin la
                        autorización correspondiente.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        6. Servicios y enlaces externos
                    </h2>

                    <p>
                        El sitio puede contener enlaces o
                        integraciones con plataformas
                        externas como Google Maps, WhatsApp,
                        LinkedIn, Instagram u otros
                        servicios.
                    </p>

                    <p>
                        Estos servicios son administrados
                        por terceros y pueden encontrarse
                        sujetos a sus propias condiciones
                        de uso y políticas.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        7. Protección de datos
                    </h2>

                    <p>
                        El tratamiento de datos personales
                        realizado mediante este sitio se
                        encuentra descrito en nuestra{" "}
                        <Link to="/politica-privacidad">
                            Política de Privacidad
                        </Link>.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        8. Cambios al Aviso Legal
                    </h2>

                    <p>
                        RIDS podrá modificar este Aviso
                        Legal cuando existan cambios
                        normativos, técnicos, comerciales
                        u operacionales.
                    </p>

                    <p>
                        La versión y fecha de actualización
                        estarán disponibles en esta página.
                    </p>
                </section>

                <div className="privacy-actions">
                    <Link
                        to="/"
                        className="privacy-back"
                    >
                        Volver al inicio
                    </Link>
                </div>

            </div>
        </main>
    );
}