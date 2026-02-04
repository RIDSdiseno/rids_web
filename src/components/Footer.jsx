import footerLogo from "../assets/LOGO_RIDS_blanco.png";
import {
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#073956] to-[#09272C] text-[#E6EEF1] py-12 font-[Poppins]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {/* 🩵 Columna 1: Nosotros */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Nosotros</h3>
          <div className="flex items-center mb-2">
            <img
              src={footerLogo}
              alt="RIDS"
              className="w-32 h-auto mr-3 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            Somos una empresa que brinda servicios tecnológicos para pequeñas y medianas empresas.
          </p>
        </div>

        {/* 📞 Columna 2: Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>

          <p className="flex items-start gap-2 text-sm opacity-90">
            <FaMapMarkerAlt className="mt-1" />
            La Concepción 65, oficina 1003, Providencia, Región Metropolitana
          </p>

          <p className="flex items-center gap-2 text-sm opacity-90 mt-2">
            <FaPhone />
            <a
              href="tel:+56988076593"
              className="hover:text-[#00AEEF] transition-colors"
            >
              +56 9 8807 6593
            </a>
          </p>

          <p className="flex items-center gap-2 text-sm opacity-90 mt-1">
            <FaPhone />
            <a
              href="tel:+56973713869"
              className="hover:text-[#00AEEF] transition-colors"
            >
              +56 9 7371 3869
            </a>
          </p>

          <p className="flex items-center gap-2 text-sm opacity-90 mt-2">
            <FaEnvelope />
            <a
              href="mailto:soporte@rids.cl"
              className="hover:text-[#00AEEF] transition-colors"
            >
              soporte@rids.cl
            </a>
          </p>

          <p className="flex items-center gap-2 text-sm opacity-90 mt-1">
            <FaEnvelope />
            <a
              href="mailto:carenas@rids.cl"
              className="hover:text-[#00AEEF] transition-colors"
            >
              carenas@rids.cl
            </a>
          </p>

          <p className="flex items-center gap-2 text-sm opacity-90 mt-1">
            <FaEnvelope />
            <a
              href="mailto:informacion@rids.cl"
              className="hover:text-[#00AEEF] transition-colors"
            >
              informacion@rids.cl
            </a>
          </p>
        </div>

        {/* 💼 Columna 3: Trabaja con nosotros */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Trabaja con nosotros</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Si deseas trabajar con nosotros, contáctanos al{" "}
            <a
              href="tel:+56988076593"
              className="text-[#00AEEF] hover:underline"
            >
              +56 9 8807 6593
            </a>{" "}{" "}
            <a
              href="#contacto"
              className="text-[#00AEEF] hover:underline"
            >
            </a>.
          </p>

          {/* 🌐 Íconos redes */}
          <div className="flex gap-5 mt-5">
            <a
              href="https://www.linkedin.com/in/asesor%C3%ADas-rids-ltda-348522107/?originalSubdomain=cl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#08394b] transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/rids.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#08394b] transition-all duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://econnet.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#08394b] transition-all duration-300 hover:scale-110"
            >
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Línea separadora */}
      <div className="w-4/5 mx-auto my-8 border-t border-white/30"></div>

      {/* 📜 Texto inferior */}
      <div className="text-center text-sm opacity-80">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">RIDS</span> — Soluciones Integrales de Tecnología
      </div>
    </footer>
  );
}
