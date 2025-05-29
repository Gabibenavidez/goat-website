
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={`hero-section ${project.heroVideo.orientation}`}>
        <div className="hero-video">
          <iframe
            src={`${project.heroVideo.src}?autoplay=1&muted=1&loop=1&background=1`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        {project.heroVideo.orientation === "vertical" && project.heroVideo.sideImage && (
          <div className="hero-side-image">
            <img src={project.heroVideo.sideImage} alt="Complementario" />
          </div>
        )}
      </div>

      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div className="project-gallery">
        {project.gallery.map((src, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={src} alt={`${project.title} ${i + 1}`} />
          </motion.div>
        ))}
      </div>

      <button onClick={() => navigate(-1)}>Volver</button>
    </motion.div>
  );
}

export default ProjectDetail;
