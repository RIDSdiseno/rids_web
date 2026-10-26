// src/components/PrivacyPolicy.jsx

import React, {
    useEffect,
} from "react";

import {
    Link,
    useLocation,
} from "react-router-dom";

import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.replace("#", "");

            const element = document.getElementById(sectionId);

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);

                return;
            }
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    }, [location.hash]);

    return (
        <main className="privacy-page">
            <div className="privacy-container">

                {/* ==========================================
            HEADER
        ========================================== */}

                <header className="privacy-header">
                    <span className="privacy-badge">
                        Protección de datos personales
                    </span>

                    <h1>
                        Política de Privacidad
                    </h1>

                    <p className="privacy-updated">
                        Última actualización: octubre de 2026
                        <br />
                        Versión: 1.0
                    </p>

                    <p className="privacy-intro">
                        En RIDS nos comprometemos con la
                        protección de la información y de
                        los datos personales tratados a
                        través de nuestros servicios y
                        canales digitales, de conformidad
                        con la Ley N° 19.628 sobre
                        Protección de los Datos Personales,
                        según las modificaciones introducidas
                        por la Ley N° 21.719, vigente a
                        contar del 1 de diciembre de 2026.
                    </p>
                </header>

                {/* ==========================================
            1. RESPONSABLE
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        1. Responsable del tratamiento
                    </h2>

                    <p>
                        RIDS es responsable del tratamiento
                        de los datos personales recopilados
                        a través del sitio web www.rids.cl
                        y de sus canales digitales
                        asociados.
                    </p>

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
                            Contacto:{" "}
                            <a href="mailto:soporte@rids.cl">
                                soporte@rids.cl
                            </a>
                        </p>
                    </div>
                </section>

                {/* ==========================================
            2. DATOS TRATADOS
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        2. Datos que podemos tratar
                    </h2>

                    <p>
                        Dependiendo de tu interacción con
                        nuestro sitio, podemos tratar
                        información como:
                    </p>

                    <ul>
                        <li>
                            Nombre completo.
                        </li>

                        <li>
                            Correo electrónico.
                        </li>

                        <li>
                            RUT, cuando corresponda al proceso
                            de contratación.
                        </li>

                        <li>
                            Categoría o motivo de una consulta.
                        </li>

                        <li>
                            Información proporcionada
                            voluntariamente mediante
                            formularios.
                        </li>

                        <li>
                            Información necesaria para la
                            contratación de planes o servicios.
                        </li>

                        <li>
                            Contenido enviado al asistente
                            virtual.
                        </li>

                        <li>
                            Identificadores técnicos temporales
                            de sesión.
                        </li>
                    </ul>
                </section>

                {/* ==========================================
            3. FORMULARIO
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        3. Formulario de contacto
                    </h2>

                    <p>
                        Cuando utilizas nuestro formulario
                        tratamos tu nombre, correo
                        electrónico, categoría de consulta
                        y mensaje con la finalidad de
                        recibir, gestionar y responder tu
                        solicitud.
                    </p>

                    <p>
                        Actualmente, los mensajes del
                        formulario no son incorporados por
                        el sitio web a una base de datos
                        propia de contactos.
                    </p>

                    <p>
                        La información es transmitida
                        mediante nuestros sistemas de correo
                        electrónico y puede permanecer en
                        dichos sistemas conforme al período
                        de conservación definido en esta
                        Política.
                    </p>
                </section>

                {/* ==========================================
            4. REVENIU
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        4. Contratación de planes y pagos mediante Reveniu
                    </h2>

                    <p>
                        RIDS puede ofrecer la contratación
                        de planes o servicios pagados a
                        través de la plataforma Reveniu,
                        operada por Mecenas SpA.
                    </p>

                    <p>
                        Durante el proceso de contratación
                        podrán solicitarse datos necesarios
                        para identificar al cliente,
                        gestionar la contratación y mantener
                        la relación comercial.
                    </p>

                    <p>
                        Los datos solicitados dependerán del
                        formulario configurado para cada
                        plan y podrán incluir, cuando
                        corresponda, nombre, correo
                        electrónico, RUT y otros antecedentes
                        necesarios para la contratación.
                    </p>

                    <p>
                        El procesamiento del pago es
                        realizado mediante Reveniu y su
                        proveedor de pagos Transbank.
                        Los datos de tarjetas bancarias son
                        ingresados directamente en los
                        sistemas de Transbank y no son
                        almacenados por RIDS.
                    </p>

                    <p>
                        Reveniu actúa como proveedor
                        tecnológico para la gestión de
                        suscripciones, cobros y transacciones
                        asociadas a los planes contratados.
                    </p>
                </section>

                {/* ==========================================
            5. ASISTENTE IA
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        5. Asistente virtual con inteligencia artificial
                    </h2>

                    <p>
                        RIDS dispone de un asistente virtual
                        destinado a responder consultas
                        generales, orientar sobre nuestros
                        servicios y facilitar la navegación
                        del sitio.
                    </p>

                    <p>
                        Cuando utilizas este asistente, el
                        contenido de tus mensajes es enviado
                        a los sistemas de RIDS y puede ser
                        procesado mediante servicios
                        tecnológicos proporcionados por
                        terceros.
                    </p>

                    <p>
                        El asistente utiliza un identificador
                        técnico de sesión para mantener
                        temporalmente el contexto de la
                        conversación.
                    </p>

                    <p>
                        La memoria utilizada por los sistemas
                        propios de RIDS para mantener dicho
                        contexto es temporal y se elimina
                        después de 30 minutos de inactividad.
                    </p>

                    <p>
                        El asistente virtual tiene una
                        finalidad exclusivamente informativa
                        y de orientación.
                    </p>

                    <p>
                        No adopta decisiones automatizadas
                        que produzcan efectos jurídicos sobre
                        los usuarios ni decisiones que les
                        afecten de forma significativamente
                        similar.
                    </p>

                    <p>
                        Las consultas son procesadas mediante
                        la plataforma API de OpenAI.
                        De acuerdo con las condiciones
                        aplicables al uso de la API, el
                        contenido enviado mediante este
                        servicio no se utiliza para entrenar
                        los modelos de OpenAI, salvo que el
                        cliente haya optado expresamente por
                        compartir dichos datos para esa
                        finalidad.
                    </p>

                    <p>
                        OpenAI puede conservar determinados
                        registros técnicos y de prevención
                        de abuso durante los períodos
                        establecidos en sus políticas y
                        configuraciones aplicables.
                    </p>

                    <div className="privacy-warning">
                        No proporciones mediante el asistente
                        contraseñas, credenciales,
                        información bancaria, datos médicos
                        u otros datos sensibles que no sean
                        necesarios para tu consulta.
                    </div>
                </section>

                {/* ==========================================
            6. FINALIDADES, BASES Y CONSERVACIÓN
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        6. Finalidades, fundamento y conservación
                    </h2>

                    <p>
                        El tratamiento de datos personales
                        realizado por RIDS se efectuará
                        conforme a la Ley N° 19.628 sobre
                        Protección de los Datos Personales,
                        modificada por la Ley N° 21.719,
                        y demás normativa aplicable.
                    </p>

                    <div className="privacy-treatment-list">

                        {/* FORMULARIO */}

                        <div className="privacy-treatment-item">
                            <h3>
                                Formulario de contacto
                            </h3>

                            <p>
                                <strong>
                                    Datos:
                                </strong>{" "}
                                nombre, correo electrónico,
                                categoría de consulta y mensaje.
                            </p>

                            <p>
                                <strong>
                                    Finalidad:
                                </strong>{" "}
                                recibir, gestionar y responder
                                consultas comerciales o de
                                soporte.
                            </p>

                            <p>
                                <strong>
                                    Fundamento:
                                </strong>{" "}
                                adopción de medidas
                                precontractuales solicitadas por
                                el titular y, cuando corresponda,
                                interés legítimo de RIDS en
                                atender consultas relacionadas
                                con sus servicios.
                            </p>

                            <p>
                                <strong>
                                    Conservación:
                                </strong>{" "}
                                hasta 12 meses desde la última
                                interacción, salvo que la
                                consulta derive en una relación
                                contractual o exista una
                                obligación legal que justifique
                                un plazo diferente.
                            </p>
                        </div>

                        {/* PLANES */}

                        <div className="privacy-treatment-item">
                            <h3>
                                Contratación de planes
                            </h3>

                            <p>
                                <strong>
                                    Datos:
                                </strong>{" "}
                                datos identificatorios y de
                                contacto solicitados durante
                                la contratación.
                            </p>

                            <p>
                                <strong>
                                    Finalidad:
                                </strong>{" "}
                                gestionar la contratación,
                                suscripción, facturación, cobro
                                y prestación de los servicios
                                contratados.
                            </p>

                            <p>
                                <strong>
                                    Fundamento:
                                </strong>{" "}
                                ejecución de la relación
                                contractual y cumplimiento de
                                obligaciones legales,
                                tributarias y contables
                                aplicables.
                            </p>

                            <p>
                                <strong>
                                    Conservación:
                                </strong>{" "}
                                durante la vigencia de la
                                relación contractual y,
                                posteriormente, durante los
                                períodos exigidos por las
                                obligaciones legales,
                                tributarias o contables
                                aplicables.
                            </p>
                        </div>

                        {/* ASISTENTE */}

                        <div className="privacy-treatment-item">
                            <h3>
                                Asistente virtual
                            </h3>

                            <p>
                                <strong>
                                    Datos:
                                </strong>{" "}
                                contenido de la consulta e
                                identificador técnico temporal
                                de sesión.
                            </p>

                            <p>
                                <strong>
                                    Finalidad:
                                </strong>{" "}
                                responder consultas generales,
                                orientar sobre los servicios de
                                RIDS y mantener temporalmente el
                                contexto de la conversación.
                            </p>

                            <p>
                                <strong>
                                    Fundamento:
                                </strong>{" "}
                                prestación del servicio
                                solicitado por el usuario e
                                interés legítimo de RIDS en
                                ofrecer asistencia digital.
                            </p>

                            <p>
                                <strong>
                                    Conservación en sistemas propios:
                                </strong>{" "}
                                la memoria temporal del
                                asistente se elimina después de
                                30 minutos de inactividad.
                            </p>
                        </div>

                    </div>
                </section>

                {/* ==========================================
            7. PROVEEDORES
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        7. Proveedores tecnológicos y transferencias internacionales
                    </h2>

                    <p>
                        Para prestar y operar sus servicios,
                        RIDS utiliza proveedores tecnológicos
                        que pueden tratar datos personales
                        por cuenta de RIDS o como parte de
                        la prestación de sus propios
                        servicios.
                    </p>

                    <ul>
                        <li>
                            <strong>
                                Railway Corporation:
                            </strong>{" "}
                            proveedor de infraestructura y
                            alojamiento tecnológico.
                            Sus operaciones principales de
                            procesamiento se realizan en
                            Estados Unidos, aunque puede
                            ofrecer otras regiones de
                            alojamiento según el servicio
                            contratado.
                        </li>

                        <li>
                            <strong>
                                OpenAI:
                            </strong>{" "}
                            proveedor tecnológico utilizado
                            para el procesamiento de consultas
                            del asistente virtual mediante su
                            plataforma API. El proveedor opera
                            principalmente desde Estados Unidos
                            y puede utilizar infraestructura y
                            subencargados en otras
                            jurisdicciones conforme a sus
                            términos y acuerdos de tratamiento
                            de datos.
                        </li>

                        <li>
                            <strong>
                                Microsoft 365 / Exchange Online:
                            </strong>{" "}
                            proveedor utilizado para el
                            procesamiento y almacenamiento
                            de correo electrónico. La ubicación
                            efectiva de los datos depende de
                            la configuración y región asignada
                            al tenant de Microsoft 365 de RIDS.
                        </li>

                        <li>
                            <strong>
                                Reveniu / Mecenas SpA:
                            </strong>{" "}
                            proveedor utilizado para la
                            gestión de suscripciones y cobros.
                            Reveniu es una empresa domiciliada
                            en Chile y puede utilizar
                            infraestructura o servicios
                            tecnológicos ubicados en otras
                            jurisdicciones conforme a sus
                            condiciones aplicables.
                        </li>
                    </ul>

                    <p>
                        Cuando corresponda una transferencia
                        internacional de datos personales,
                        RIDS adoptará las medidas y garantías
                        exigidas por la legislación
                        aplicable.
                    </p>
                </section>

                {/* ==========================================
            8. SERVICIOS EXTERNOS
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        8. Servicios externos
                    </h2>

                    <p>
                        Nuestro sitio contiene enlaces o
                        integraciones con servicios externos
                        como Google Maps, WhatsApp, LinkedIn
                        e Instagram.
                    </p>

                    <p>
                        Cuando decides utilizar estos
                        servicios, el tratamiento realizado
                        por dichos terceros puede encontrarse
                        sujeto a sus propias políticas de
                        privacidad.
                    </p>

                    <p>
                        En el caso de Google Maps, el
                        contenido externo no se carga
                        automáticamente al acceder al sitio.
                        La conexión con Google se realiza
                        cuando el usuario decide mostrar el
                        mapa mediante la opción correspondiente.
                    </p>
                </section>

                {/* ==========================================
            9. CONSERVACIÓN GENERAL
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        9. Criterios generales de conservación
                    </h2>

                    <p>
                        Los plazos específicos de
                        conservación aplicables a cada
                        tratamiento se indican en esta
                        Política.
                    </p>

                    <p>
                        Una vez cumplida la finalidad del
                        tratamiento y vencidos los plazos
                        legales, contractuales, tributarios
                        o contables aplicables, los datos
                        serán eliminados, anonimizados o
                        bloqueados cuando corresponda.
                    </p>

                    <p>
                        Las conversaciones mantenidas por la
                        memoria propia del asistente virtual
                        son temporales y no se almacenan
                        actualmente en una base de datos
                        permanente del sitio.
                    </p>
                </section>

                {/* ==========================================
            10. SEGURIDAD
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        10. Seguridad
                    </h2>

                    <p>
                        RIDS implementa medidas técnicas y
                        organizativas razonables destinadas
                        a proteger la información frente a
                        accesos no autorizados, pérdida,
                        alteración, divulgación o
                        destrucción.
                    </p>

                    <p>
                        Estas medidas incluyen controles
                        destinados a proteger los sistemas,
                        limitar solicitudes automatizadas,
                        validar la información recibida y
                        reducir la exposición innecesaria
                        de datos personales.
                    </p>
                </section>

                {/* ==========================================
            11. DERECHOS
        ========================================== */}

                <section
                    className="privacy-section"
                    id="derechos"
                >
                    <h2>
                        11. Derechos de los titulares
                    </h2>

                    <p>
                        Puedes ejercer los derechos
                        reconocidos por la legislación
                        vigente respecto del tratamiento
                        de tus datos personales, incluyendo,
                        cuando corresponda:
                    </p>

                    <ul>
                        <li>
                            Acceso.
                        </li>

                        <li>
                            Rectificación.
                        </li>

                        <li>
                            Supresión.
                        </li>

                        <li>
                            Oposición.
                        </li>

                        <li>
                            Portabilidad.
                        </li>

                        <li>
                            Bloqueo.
                        </li>
                    </ul>

                    <p>
                        Las solicitudes relativas al
                        ejercicio de estos derechos serán
                        recibidas y gestionadas por RIDS
                        conforme al procedimiento establecido
                        en la normativa aplicable.
                    </p>

                    <p>
                        RIDS deberá pronunciarse sobre la
                        solicitud a más tardar dentro de los
                        30 días corridos siguientes a la
                        fecha de ingreso.
                    </p>

                    <p>
                        Este plazo podrá ser prorrogado, por
                        una sola vez, hasta por otros
                        30 días corridos cuando corresponda.
                    </p>

                    <p>
                        Si una solicitud es rechazada total
                        o parcialmente, o si RIDS no entrega
                        respuesta dentro del plazo legal, el
                        titular podrá presentar una
                        reclamación ante la Agencia de
                        Protección de Datos Personales
                        conforme a la Ley N° 21.719.
                    </p>

                    <p>
                        En caso de una respuesta negativa,
                        el titular dispone de 30 días
                        hábiles para formular la reclamación
                        ante la Agencia.
                    </p>

                    <div className="privacy-box">
                        <h3>
                            Ejercer tus derechos
                        </h3>

                        <p>
                            Para solicitar acceso, rectificación,
                            supresión, oposición, portabilidad,
                            bloqueo u otra gestión relacionada con
                            tus datos personales, puedes comunicarte
                            directamente con RIDS.
                        </p>

                        <a
                            href="mailto:soporte@rids.cl?subject=Ejercicio de derechos sobre datos personales"
                        >
                            soporte@rids.cl
                        </a>
                    </div>
                </section>

                {/* ==========================================
            12. MENORES
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        12. Menores de edad
                    </h2>

                    <p>
                        Los servicios y contenidos
                        disponibles en rids.cl están
                        dirigidos principalmente a empresas,
                        profesionales y personas mayores de
                        edad, y no están diseñados ni
                        dirigidos específicamente a niños,
                        niñas o adolescentes.
                    </p>

                    <p>
                        RIDS no busca recopilar
                        deliberadamente datos personales de
                        menores de edad a través de este
                        sitio.
                    </p>

                    <p>
                        Si tomamos conocimiento de que se
                        han proporcionado datos de un menor
                        sin contar con la autorización que
                        corresponda, adoptaremos las medidas
                        razonables para gestionar o eliminar
                        dicha información conforme a la
                        legislación aplicable.
                    </p>
                </section>

                {/* ==========================================
            13. CAMBIOS
        ========================================== */}

                <section className="privacy-section">
                    <h2>
                        13. Cambios a esta política
                    </h2>

                    <p>
                        RIDS podrá actualizar esta política
                        cuando existan cambios normativos,
                        tecnológicos, operacionales o en
                        nuestros servicios.
                    </p>

                    <p>
                        La fecha y versión vigente estarán
                        disponibles permanentemente en esta
                        página.
                    </p>
                </section>

                {/* ==========================================
            VOLVER
        ========================================== */}

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