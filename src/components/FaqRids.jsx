import React, { useState } from "react";
import "./FAQRids.css";

export default function FaqRids() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "¿Qué tipo de empresas atiende RIDS?",
      answer:
        "Trabajamos principalmente con pymes y empresas en crecimiento que necesitan ordenar, profesionalizar y escalar su infraestructura tecnológica, soporte TI y procesos digitales.",
    },
    {
      question: "¿Qué servicios de soporte TI ofrecen?",
      answer:
        "Ofrecemos soporte TI para usuarios finales, gestión de infraestructura, monitoreo, automatización de procesos, servicios cloud, respaldo y continuidad operativa, siempre con enfoque en la realidad de tu negocio.",
    },
    {
      question: "¿Pueden integrarse con las herramientas que ya usamos?",
      answer:
        "Sí. Nos integramos con plataformas como Microsoft 365, Google Workspace, sistemas de ticketing, CRM y otras soluciones que tu empresa ya utilice, evitando fricciones en la adopción.",
    },
    {
      question: "¿Cómo es el proceso para comenzar a trabajar con RIDS?",
      answer:
        "Partimos con un diagnóstico inicial donde revisamos tu situación actual, identificamos riesgos y oportunidades, y luego proponemos un plan de soporte TI y transformación digital alineado a tus prioridades.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq-rids"
      className="faqrids-section"
      aria-label="Preguntas frecuentes sobre soporte TI y servicios RIDS"
    >
      <div className="faqrids-card">
        <h2 className="faqrids-title">Preguntas frecuentes</h2>
        <p className="faqrids-sub">
          Resolvemos las dudas más comunes sobre nuestros{" "}
          <strong>
            servicios de soporte TI, outsourcing y transformación digital
          </strong>
          .
        </p>

        <div className="faqrids-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className={`faqrids-item ${
                  isOpen ? "faqrids-item--open" : ""
                }`}
              >
                <button
                  type="button"
                  className="faqrids-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faqrids-icon">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="faqrids-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
