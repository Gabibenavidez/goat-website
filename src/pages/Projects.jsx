import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import "./Projects.css";

function Projects() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="projects-list">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.slug}
            className="project-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          >
            <div className="project-preview-container">
              <img src={proj.preview} alt={proj.title} className="project-preview" />
              <div className="project-title-overlay">{proj.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;
