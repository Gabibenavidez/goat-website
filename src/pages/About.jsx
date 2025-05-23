import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      About Page
    </motion.div>
  );
}

export default About;
