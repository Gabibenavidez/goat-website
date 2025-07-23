import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "./Gallery";
import "./ProjectDetail.css";
import { useEffect, useState } from "react";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [videoIndex, setVideoIndex] = useState(0);
  const [direction, setDirection] = useState(0); // para saber si vamos adelante o atrás

  useEffect(() => {
    setVideoIndex(0);
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  const heroVideosArray = Array.isArray(project.heroVideos) ? project.heroVideos : [];
  const currentVideo = heroVideosArray[videoIndex];
  const isVertical = currentVideo?.orientation === "vertical";
  const hasSideImage = isVertical && currentVideo.sideImage;

  // autoplay para el proyecto toyota-yaris-GR
  useEffect(() => {
    if (slug === "toyota-yaris-GR" && heroVideosArray.length > 1) {
      const interval = setInterval(() => {
        setDirection(1);
        setVideoIndex((prev) => (prev + 1) % heroVideosArray.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [slug, heroVideosArray.length]);

  const nextVideo = () => {
    setDirection(1);
    setVideoIndex((prev) => (prev + 1) % heroVideosArray.length);
  };

  const prevVideo = () => {
    setDirection(-1);
    setVideoIndex((prev) => (prev - 1 + heroVideosArray.length) % heroVideosArray.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
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
              <AnimatePresence custom={direction} mode="wait">
                <motion.iframe
                  key={videoIndex}
                  src={`${currentVideo.src}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                  frameBorder="0"
                  allow="autoplay; fullscreen;"
                  allowFullScreen
                  title={`Video ${videoIndex + 1}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>

            {hasSideImage && (
              <div className="hero-side-image">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={videoIndex}
                    src={currentVideo.sideImage}
                    alt="Complementario"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1.3 }}
                  />
                </AnimatePresence>
              </div>
              )}
          </div>

          {heroVideosArray.length > 1 && (
            <>
              <div>{videoIndex + 1} / {heroVideosArray.length}</div>
              <div>&nbsp;</div>
              <div style={{fontSize: "12px"}}>Siguiente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anterior</div>
              <div>&nbsp;</div>
              <div className="video-controls">
                <button onClick={prevVideo}>←</button>
                <button onClick={nextVideo}>→</button>
              </div>
            </>
          )}
        </>
      )}

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
