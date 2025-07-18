import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import Gallery from "./Gallery";
import "./ProjectDetail.css";
import { useEffect, useState } from "react";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    setVideoIndex(0);
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  // hero videos array check
  const heroVideosArray = Array.isArray(project.heroVideos)
    ? project.heroVideos
    : [];
  
  const currentVideo = heroVideosArray[videoIndex];
  const isVertical = currentVideo?.orientation === "vertical";
  const hasSideImage = isVertical && currentVideo.sideImage;

  const nextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % heroVideosArray.length);
  };

  const prevVideo = () => {
    setVideoIndex((prev) =>
      prev === 0 ? heroVideosArray.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {currentVideo && (
        <>
          <div className={`hero-section ${currentVideo.orientation}`}>
            <div className="hero-video">
              <iframe
                src={`${currentVideo.src}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen;"
                allowFullScreen
                title={`Video ${videoIndex + 1}`}
                key={videoIndex}
              ></iframe>
            </div>

          {hasSideImage && (
            <div className="hero-side-image">
              <img src={currentVideo.sideImage} alt="Complementario" />
            </div>
          )}
        </div>
        {heroVideosArray.length > 1 && (
          <>
            <div>{videoIndex + 1} / {heroVideosArray.length}</div>
            <div>&nbsp;</div>
            <div class="video-controls">
              <button onClick={prevVideo}>←</button>
              <button onClick={nextVideo}>→</button>
            </div>
          </>

        )}
        </>
      )}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
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
