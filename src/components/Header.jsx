import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const projectOptions = [
    { slug: "Gatorade", title: "Gatorade" },
    { slug: "Lollapalooza", title: "Lollapalooza" },
    { slug: "Citroën", title: "Citroën" },
  ];

  const handleProjectSelect = (slug) => {
    navigate(`/projects?project=${slug}`);
    setMenuOpen(false);
    setProjectDropdownOpen(false);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Galería" },
    { to: "/about", label: "Sobre Nosotros" },
    { to: "/contact", label: "Contacto" }
  ];

  return (
    <header className="site-header">
      <div className="logo">
        <NavLink to="/">CABRA</NavLink>
      </div>

      <nav className="desktop-nav">
        <div
          className="projects-wrapper"
          onMouseEnter={() => setProjectDropdownOpen(true)}
          onMouseLeave={() => setProjectDropdownOpen(false)}
        >
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Proyectos
          </NavLink>

          <div className={`dropdown-menu ${projectDropdownOpen ? "visible" : ""}`}>
            {projectOptions.map((p) => (
              <div
                key={p.slug}
                className="dropdown-item"
                onClick={() => handleProjectSelect(p.slug)}
              >
                {p.title}
              </div>
            ))}
          </div>
        </div>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Proyectos
            </NavLink>

            <div className="mobile-dropdown">
              {projectOptions.map((p) => (
                <button
                  key={p.slug}
                  className="dropdown-item"
                  onClick={() => handleProjectSelect(p.slug)}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
