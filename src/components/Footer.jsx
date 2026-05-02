import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección de Marca */}
        <div className="footer-section">
          <h3>STORE <span>DANY</span></h3>
          <p>Tu estilo, tu paso.</p>
          <p>Los mejores tenis originales con envíos a todo el país. Calidad garantizada en cada pisada.</p>
        </div>

        {/* Sección de Contacto */}
        <div className="footer-section">
          <h4>Atención al Cliente</h4>
          <p>📍 San Vicente de Chucurí, Santander</p>
          <p>📞 +57 300 123 4567</p>
          <p>✉️ contacto@storedany.com</p>
          <p>⏰ Lun - Sáb: 8:00 AM - 7:00 PM</p>
        </div>

        {/* Sección de Redes */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <strong>STORE DANY</strong> — Diseñado con pasión por el estilo.</p>
      </div>
    </footer>
  );
};

export default Footer;
