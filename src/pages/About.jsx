import { motion } from "framer-motion";
import "./About.css";

function About() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="about-title">CABRA</h1>
      <p className="about-text">
        Somos una agencia creativa que combina estrategia, innovación y producción de alto nivel para que tu marca sea única. Creamos videos, contenidos y campañas que conectan, inspiran y generan impacto. Cada&nbsp;detalle importa, cada&nbsp;historia&nbsp;cuenta. <br /><br />
        Somos una comunidad de soñadores, diseñadores, creadores y realizadores que colaboramos para transformar visiones&nbsp;en&nbsp;realidades. <br /><br />
        Nos inspira lo que somos, lo que hacemos y lo que aún podemos imaginar. Porque sabemos que las mejores ideas no nacen solas: surgen del encuentro, del riesgo y de la determinación de hacer algo que&nbsp;deje&nbsp;huella. <br /><br />
        Nuestro equipo reúne profesionales con amplia trayectoria en publicidad, marketing, storytelling y producción audiovisual. Cada uno aporta su mirada, su experiencia y su pasión para que el resultado final sea único. <br /><br />
        En cada proyecto nos sumergimos en el universo de&nbsp;la&nbsp;marca, entendemos su esencia y diseñamos propuestas que&nbsp;la&nbsp;potencian desde&nbsp;adentro&nbsp;hacia&nbsp;afuera. <br /><br />
        En Cabra no solo producimos contenido: construimos identidad y generamos impacto
      </p>
    </motion.div>
  );
}

export default About;
