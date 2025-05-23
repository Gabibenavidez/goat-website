import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Gallery.css";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1600&q=80", alt: "Cámara y claqueta en set" },
  { id: 5, src: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80", alt: "Cámara sobre dolly" },
  { id: 3, src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80", alt: "Set con luces" },
  { id: 4, src: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1600&q=80", alt: "Fondo blanco para producto" },
  { id: 2, src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1600&q=80", alt: "Making of de spot comercial" },
  { id: 8, src: "https://images.pexels.com/photos/7564319/pexels-photo-7564319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080", alt: "Storyboard y dirección" },
  { id: 13, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80", alt: "Cámara profesional frontal" },
  { id: 14, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80", alt: "Equipo planificando escena" }
];

function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIndex(null);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.div
      className="gallery-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="masonry-gallery">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            className="masonry-item"
            onClick={() => openModal(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={img.src} alt={img.alt} />
          </motion.div>
        ))}
      </div>

      {modalOpen && (
        <motion.div
          className="modal-overlay"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className="nav-button prev" onClick={showPrev}>←</button>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              loading="eager"
            />
            <button className="nav-button next" onClick={showNext}>→</button>
            <div className="modal-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Gallery;