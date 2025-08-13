import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import "./Home.css"

export default function Home() {
  const [soundOn, setSoundOn] = useState(false);
  const iframeRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 1500); // 1.5 segundos

    return () => clearTimeout(timer);
  }, []);

  // Enviar mensaje al player de Vimeo para activar/desactivar sonido
  const postMessageToPlayer = (command) => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(JSON.stringify(command), "*");
  };

  const toggleSound = () => {
    if (soundOn) {
      // Silenciar video
      postMessageToPlayer({ method: "setVolume", value: 0 });
      setSoundOn(false);
    } else {
      // Activar sonido
      postMessageToPlayer({ method: "setVolume", value: 1 });
      postMessageToPlayer({ method: "play" });
      setSoundOn(true);
    }
  };

  useEffect(() => {
    // Al montar, dejamos el video muteado para autoplay
    postMessageToPlayer({ method: "setVolume", value: 0 });
  }, []);

  return (
    <div className="home-page">
      <div className="video-background">
        <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1109515295?h=37a53c681e&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&background=1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className=""
        title="Video de fondo"
      ></iframe>
      </div>
      <div className="video-overlay">
        <AnimatePresence>
          {showTitle && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                CABRA
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              >
                Creative house
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>
      <div
        onClick={toggleSound}
        className="icon-container"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleSound();
        }}
        style={{
          position: "fixed",
          zIndex: "9999",
          top: "5rem",
          left: "2rem",
          fontSize: "2.2rem",
          color: soundOn ? "#ccc" : "#555",
          userSelect: "none",
          outline: "none",
        }}
        // onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        // onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        aria-label={soundOn ? "Silenciar video" : "Activar sonido del video"}
        title={soundOn ? "Silenciar" : "Activar sonido"}
      >
        {soundOn ? <MdVolumeUp /> : <MdVolumeOff />}
      </div>
    </div>
  );
}
