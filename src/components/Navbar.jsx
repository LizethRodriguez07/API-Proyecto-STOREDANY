import React from 'react';
import './Navbar.css';
import logotipo from "../assets/logotipo.png"; 
import { NavLink } from 'react-router-dom';
import { useCart } from '../Context/Cart'; // Importamos el hook del carrito

const Navbar = () => { 
  const { cantidadTotal } = useCart(); // Obtenemos la cantidad total

  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={logotipo} alt="Logo STORE DANY" className="logo-img" />
        <div className="logo-text">
          Gestion de Ventas Online<br />
          <strong>STORE DANY</strong>
        </div>
      </div>

      <ul className="navLinks">
        <li><NavLink to="/" className={({isActive}) => isActive ? "link-btn active" : "link-btn"}>Inicio</NavLink></li>
        <li><NavLink to="/Clientes" className={({ isActive }) => isActive ? "link-btn active" : "link-btn"}>Ingreso Datos</NavLink></li>
        <li><NavLink to="/Productos" className={({ isActive }) => isActive ? "link-btn active" : "link-btn"}>Productos</NavLink></li>
        <li><NavLink to="/pagos" className={({ isActive }) => isActive ? "link-btn active" : "link-btn"}>Detalle Pago</NavLink></li>
        <li><NavLink to="/historial" className={({isActive}) => isActive ? "link-btn active" : "link-btn"}>Mis Compras</NavLink></li>
        
        {/* 3. Modificamos Pedidos para que tenga el contador */}
        <li className="carrito-container">
          <NavLink to="/pedidos" className={({ isActive }) => isActive ? "link-btn active" : "link-btn"}>
            🛒 Pedidos
            {cantidadTotal > 0 && (
              <span className="badge-cantidad">{cantidadTotal}</span> 
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
