import { useState } from "react";
import "./Footer.css";

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const openModal = () => {
    setModalOpen(true);
    setSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const closeModal = (e) => {
    if (
      e.target.classList.contains("modal-overlay") ||
      e.target.classList.contains("close-btn")
    ) {
      setModalOpen(false);
      setSubmitted(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    data.append("_captcha", "false");

    try {
      const response = await fetch("https://formsubmit.co/ajax/gabriel.m.benavidez@gmail.com", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-bottom">
        <span>© CABRA 2025 – Todos los derechos reservados</span>
        <span
          className="contact-span"
          onClick={openModal}
          title="Contact Us"
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openModal();
          }}
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
        >
          © BG studio – Desarrollo Web
        </span>
      </div>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={closeModal}
              aria-label="Cerrar formulario"
            >
              &times;
            </button>

            {!submitted ? (
              <>
                <h2 id="modalTitle">Formulario contacto <bold>BG studio</bold></h2>

                <form onSubmit={handleSubmit} className="modal-form" noValidate>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input 
                    type="tel"
                    name="phone"
                    placeholder="Telefono (Opcional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button type="submit">Enviar</button>
                </form>
              </>
            ) : (
              <div className="thank-you-message">
                <h2>Gracias por contactarse</h2>
                <p>El equipo se comunicará a la brevedad.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;

