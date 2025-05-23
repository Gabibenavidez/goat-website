import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    id: 1,
    slug: "proyecto-1",
    title: "Proyecto 1",
    preview: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1600&q=80",
    vimeoUrl: "https://player.vimeo.com/video/76979871",
    orientation: "horizontal"
  },
  {
    id: 2,
    slug: "proyecto-2",
    title: "Proyecto 2",
    preview: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1600&q=80",
    vimeoUrl: "https://player.vimeo.com/video/357274789",
    orientation: "horizontal"
  },
  {
    id: 3,
    slug: "proyecto-3",
    title: "Proyecto 3",
    preview: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80",
    vimeoUrl: "https://player.vimeo.com/video/1084537",
    orientation: "horizontal"
  },
  {
    id: 4,
    slug: "proyecto-4",
    title: "Proyecto 4 (Vertical)",
    preview: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    vimeoUrl: "https://player.vimeo.com/video/59844634",
    orientation: "vertical"
  },
  {
    id: 5,
    slug: "proyecto-5",
    title: "Proyecto 5 (Vertical)",
    preview: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    vimeoUrl: "https://player.vimeo.com/video/90509568",
    orientation: "vertical"
  }
];

function Projects() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSlug = queryParams.get("project");

  const [activeVideo, setActiveVideo] = useState(null);
  const [selected, setSelected] = useState(initialSlug || "all");

  const filteredProjects = selected === "all"
    ? projects
    : projects.filter((proj) => proj.slug === selected);

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="projects-list">
        {filteredProjects.map((proj, i) => (
          <motion.div
            key={proj.id}
            className="project-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={`video-wrapper ${proj.orientation}`}>
              {activeVideo === proj.id ? (
                <motion.div
                  className="iframe-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    src={`${proj.vimeoUrl}?autoplay=1&title=0&byline=0&portrait=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={proj.title}
                  ></iframe>
                </motion.div>
              ) : (
                <div
                  className="preview-container"
                  onClick={() => setActiveVideo(proj.id)}
                >
                  <img src={proj.preview} alt={proj.title} className={proj.orientation} />
                  <div className="preview-overlay" />
                  <button className="play-button">▶ Ver video</button>
                </div>
              )}
            </div>
            <p>{proj.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;