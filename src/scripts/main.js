// web scraping script
const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
const title = document.title.trim();
const description = title;

const galleryImages = Array.from(
  document.querySelectorAll('.grid__item-image.js-grid__item-image.grid__item-image-lazy.js-lazy.image-loaded')
).map(img => img.getAttribute('data-src') || img.src).filter(Boolean);

const preview = galleryImages[0] || "";

const projectData = {
  slug,
  title,
  preview,
  heroVideo: {
    src: "",
    orientation: "horizontal"
  },
  description,
  gallery: galleryImages
};

console.log(projectData);