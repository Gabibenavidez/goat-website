import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import "./Projects.css";

function Projects() {
  const navigate = useNavigate();

  const orderedProjects = [...projects].sort((a, b) => {
  const posA = Number(a.position ?? Infinity); // si no tiene position, lo manda al final
  const posB = Number(b.position ?? Infinity);
  return posA - posB;
});

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="projects-list">
        {orderedProjects.map((proj, i) => (
          <motion.div
            key={proj.slug}
            // className={`project-item ${proj.isLarge ? "large" : ""}`}
            className="project-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          >
            <div className="project-preview-container">
              <img src={proj.preview} alt={proj.title} className="project-preview" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;
