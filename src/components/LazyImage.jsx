import { useRef, useEffect, useState } from "react";

function LazyImage({ src, alt, onClick }) {
//   const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

// lazy loading onScroll

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(ref.current);
//         }
//       },
//       {
//         rootMargin: "200px",
//       }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

  return (
    <div ref={ref} className="masonry-item" onClick={onClick}>
      {/* {isVisible && <img src={src} alt={alt} loading="lazy" />} */}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export default LazyImage;