import React from "react";
import "./Hero.css";

// Imágenes de fondo (ajusta según tus assets)
import img1 from "../assets/hero1.png";
import img2 from "../assets/hero2.png";
import img3 from "../assets/hero3.png";
import img4 from "../assets/hero4.png";

export default function Hero() {
  const panels = [
    { id: 1, title: "Redes", image: img1 },
    { id: 2, title: "Informática", image: img2 },
    { id: 3, title: "Desarrollo web", image: img3 },
    { id: 4, title: "Soporte", image: img4 },
  ];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className="hero-panel"
            style={{
              backgroundImage: `url(${panel.image})`,
              animationDelay: `${index * 0.15}s`,
            }}
          >
            <div className="overlay"></div>
            <h2>{panel.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
