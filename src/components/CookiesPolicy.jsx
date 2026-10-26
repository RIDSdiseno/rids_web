import React, {
    useEffect,
} from "react";

import {
    Link,
} from "react-router-dom";

import "./PrivacyPolicy.css";

export default function CookiesPolicy() {
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
                        Información sobre cookies
                    </span>

                    <h1>
                        Política de Cookies
                    </h1>

                    <p className="privacy-updated">
                        Última actualización: octubre de 2026
                        <br />
                        Versión: 1.0
                    </p>

                    <p className="privacy-intro">
                        Esta Política de Cookies explica
                        el uso de cookies y tecnologías
                        similares en el sitio web de RIDS.
                    </p>
                </header>

                <section className="privacy-section">
                    <h2>
                        1. ¿Qué son las cookies?
                    </h2>

                    <p>
                        Las cookies son pequeños archivos
                        o identificadores que pueden
                        almacenarse en el dispositivo del
                        usuario cuando visita un sitio web.
                    </p>

                    <p>
                        Estas tecnologías pueden utilizarse
                        para permitir determinadas
                        funcionalidades, recordar
                        preferencias o facilitar la
                        prestación de servicios externos.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        2. Uso de cookies y almacenamiento local
                    </h2>

                    <p>
                        RIDS procura limitar el uso de cookies y
                        tecnologías similares a aquellas necesarias
                        para el funcionamiento y prestación de las
                        funcionalidades del sitio.
                    </p>

                    <p>
                        Actualmente, el sitio puede utilizar
                        almacenamiento técnico del navegador para
                        mantener temporalmente determinadas
                        funcionalidades, como la identificación de
                        la sesión del asistente virtual.
                    </p>

                    <p>
                        Este almacenamiento técnico no se utiliza
                        con fines publicitarios ni para crear
                        perfiles de navegación.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        3. Contenido de terceros
                    </h2>

                    <p>
                        La sección de contacto permite visualizar
                        un mapa proporcionado por Google Maps.
                    </p>

                    <p>
                        El contenido de Google Maps no se carga
                        automáticamente al acceder al sitio. La
                        conexión con dicho servicio se realiza
                        únicamente cuando el usuario selecciona
                        voluntariamente la opción para mostrar el
                        mapa.
                    </p>

                    <div className="privacy-warning">
                        Al mostrar contenido proporcionado por
                        terceros, el navegador puede establecer
                        conexiones con los sistemas de dichos
                        proveedores, quienes pueden aplicar sus
                        propias tecnologías y políticas.
                    </div>
                </section>

                <section className="privacy-section">
                    <h2>
                        4. Almacenamiento técnico del sitio
                    </h2>

                    <p>
                        Algunas funcionalidades pueden
                        utilizar mecanismos de almacenamiento
                        del navegador necesarios para
                        mantener temporalmente preferencias
                        o información técnica.
                    </p>

                    <p>
                        El asistente virtual, por ejemplo,
                        utiliza un identificador técnico
                        temporal asociado a la pestaña del
                        navegador para mantener separadas
                        las conversaciones.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        5. Gestión desde el navegador
                    </h2>

                    <p>
                        Los navegadores permiten controlar,
                        eliminar o bloquear cookies y otros
                        mecanismos de almacenamiento.
                    </p>

                    <p>
                        La eliminación o bloqueo de
                        determinados elementos técnicos
                        puede afectar algunas funcionalidades
                        del sitio.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>
                        6. Cambios a esta política
                    </h2>

                    <p>
                        RIDS podrá actualizar esta Política
                        de Cookies cuando cambien las
                        tecnologías utilizadas en el sitio,
                        los servicios de terceros o la
                        normativa aplicable.
                    </p>

                    <p>
                        La fecha y versión vigente estarán
                        disponibles permanentemente en esta
                        página.
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