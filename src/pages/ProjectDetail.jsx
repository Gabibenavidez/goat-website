import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import Gallery from "./Gallery";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  const hasVideo = project.heroVideo && project.heroVideo.src;
  const isVertical = hasVideo && project.heroVideo.orientation === "vertical";
  const hasSideImage = isVertical && project.heroVideo.sideImage;

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {hasVideo || hasSideImage ? (
        <div className={`hero-section ${project.heroVideo.orientation}`}>
          {hasVideo && (
            <div className="hero-video">
              <iframe
                src={`${project.heroVideo.src}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen;"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {hasSideImage && (
            <div className="hero-side-image">
              <img src={project.heroVideo.sideImage} alt="Complementario" />
            </div>
          )}
        </div>
      ) : null}

      <p>{project.description}</p>

      <Gallery
        images={project.gallery.map((src, i) => ({
          id: i,
          src,
          alt: `${project.title} ${i + 1}`,
        }))}
      />

      <button onClick={() => navigate(-1)}>Volver</button>
    </motion.div>
  );
}

export default ProjectDetail;
