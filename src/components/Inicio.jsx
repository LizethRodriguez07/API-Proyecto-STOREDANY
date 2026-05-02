import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';
import bannerImg from "../assets/zapatos.jpg";

function Inicio() {
  return (
    <div className="inicio-container">
  {/* SECCIÓN HERO */}
  <section className="hero">
    <div className="hero-content">
      <h1>PASIÓN POR EL CALZADO URBANO</h1>
      <p>
        Antes de explorar nuestra colección, te invitamos a conocer nuestros estándares de seguridad y confianza.
      </p>

        <div className="hero-actions">
        <Link to="/clientes" className="btn-comprar-ya">Acepto Términos y Condiciones</Link>
        <div className="nota-seguridad">
        <span className="badge-item">🛡️ Pagos Verificados</span>
        <span className='badge-item'>✨ Tus compra protegidas</span>
        <span className="badge-item">🚚 Entregas 100% Seguras</span>
        <span className="badge-item">✅ Calidad Original</span>
      </div>
    </div>
  </div> {/* Cierre de hero-content */}

    <div className="hero-image">
      <img src={bannerImg} alt="Calzado de temporada Store Dany" />
    </div>
  </section>

      {/* SECCIÓN SOBRE NOSOTROS (Tu información) */}
      <section className="about-home">
        <div className="about-text">
          <span className='firma-katherine'>Mucho gusto, soy Katherine Rodriguez</span>
          <h2>Bienvenidos a STORE DANY</h2>
          <p>
            Como propietaria, es un orgullo invitarte a conocer nuestra <strong>Gestión de Ventas Online</strong>. 
            Nuestra misión es brindarte asesoría personalizada en calzado masculino, seleccionando estilos que 
            innovan y satisfacen las tendencias actuales.
          </p>
          <p>
            Nos caracterizamos por el <strong>desempeño, la empatía y el cumplimiento</strong>. 
            Para nosotros, tu confianza es la base de todo compromiso comercial; por ello, validamos 
            cada proceso de pago para garantizar entregas legales, seguras y libres de fraudes.
          </p>
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="features">
        <div className="feature-card">
          <div className="icon-circle">🚚</div>
          <h3>Envíos Seguros</h3>
          <p>Logística eficiente para que tu pedido llegue en tiempo récord.</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle">✅</div>
          <h3>Garantía de Confianza</h3>
          <p>Validamos cada transacción para proteger tu dinero y nuestra marca.</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle">🤝</div>
          <h3>Asesoría Humana</h3>
          <p>Empatía y flexibilidad en cada etapa de tu compra.</p>
        </div>
      </section>
    </div>
  );
}

export default Inicio;