import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 30000); // 30 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      <div className="video-background">
        <iframe
          src="https://player.vimeo.com/video/1099680698?h=4594439228&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479?autoplay=1&background=1&#t=15s"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
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
    </div>
  );
}

export default Home;