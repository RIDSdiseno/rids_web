import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=56988076593&text=%C2%A1Hola%21+Me+interesa+este+servicio%2C+%C2%BFme+pueden+orientar+con+precios%3F&type=phone_number&app_absent=0"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      title="¿Necesitas ayuda?"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
