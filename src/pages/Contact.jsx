import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Contact.css";

function Contact() {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="contact-text">Podés comunicarte con nosotros por los siguientes medios:</p>

      <div className="contact-links">
        <a href="mailto:tuemail@dominio.com" target="_blank">
          <FaEnvelope /> somos-cabra@dominio.com
        </a>
        <a href="https://www.instagram.com/usuario" target="_blank">
          <FaInstagram /> @cabra
        </a>
        <a href="https://wa.me/5491123456789" target="_blank">
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default Contact;