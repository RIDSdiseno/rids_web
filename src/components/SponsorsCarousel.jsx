import React from "react";
import "./SponsorCarousel.css"; // lo crearemos a continuación
import barra1 from "../assets/barra1.png";
import barra2 from "../assets/barra2.png";
import barra3 from "../assets/barra3.png";
import barra4 from "../assets/barra4.png";
import barra5 from "../assets/barra5.png";
import barra6 from "../assets/barra6.png";
import barra7 from "../assets/barra7.png";
import barra8 from "../assets/barra8.png";
import barra9 from "../assets/barra9.png";
import barra10 from "../assets/barra10.png";
import barra11 from "../assets/barra11.png";

export default function SponsorCarousel() {
  return (
    <section className="sponsor-section">
      <div className="carousel">
        <div className="carousel-track">
          <img src={barra1} alt="Logo 1" />
          <img src={barra2} alt="Logo 2" />
          <img src={barra3} alt="Logo 3" />
          <img src={barra4} alt="Logo 4" />
          <img src={barra5} alt="Logo 5" />
          <img src={barra6} alt="Logo 6" />
          <img src={barra7} alt="Logo 7" />
          <img src={barra8} alt="Logo 8" />
          <img src={barra9} alt="Logo 9" />
          <img src={barra10} alt="Logo 10" />
          <img src={barra11} alt="Logo 11" />
          {/* Duplicamos para que el loop sea perfecto */}
          <img src={barra1} alt="Logo 1" />
          <img src={barra2} alt="Logo 2" />
          <img src={barra3} alt="Logo 3" />
          <img src={barra4} alt="Logo 4" />
          <img src={barra5} alt="Logo 5" />
          <img src={barra6} alt="Logo 6" />
          <img src={barra7} alt="Logo 7" />
          <img src={barra8} alt="Logo 8" />
          <img src={barra9} alt="Logo 9" />
          <img src={barra10} alt="Logo 10" />
          <img src={barra11} alt="Logo 11" />
        </div>
      </div>
    </section>
  );
}
