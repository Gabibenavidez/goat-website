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
        En CABRA, creemos en el poder de las ideas que mueven al mundo. Somos una casa creativa, un espacio donde la innovación y la pasión se encuentran para dar vida a proyectos únicos. Cada detalle importa, cada historia cuenta. Somos una comunidad de soñadores, diseñadores, creadores y realizadores que colaboramos para transformar visiones en realidades. <br /><br />
        Nos inspira lo que somos, lo que hacemos y lo que aún podemos imaginar. Porque sabemos que las mejores ideas no nacen solas: surgen del encuentro, del riesgo y de la determinación de hacer algo que deje huella.
      </p>
    </motion.div>
  );
}

export default About;
