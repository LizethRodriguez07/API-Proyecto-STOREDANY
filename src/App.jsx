import React from 'react'; //Hooks, fragmentos, componentes reutilizables
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //contenido dinámico enlace Menu
import Navbar from './components/Navbar'; //Menu
import Inicio from './components/Inicio'; // Ingreso a la App
import Clientes from './components/Clientes'; // Ingreso de datos Personales
import Productos from './components/Productos'; //Catalogo
import Pedidos from './components/Pedidos'; //Estructura del pedido seleccionado en productos
import HistorialPedidos from './components/HistorialPedidos';
import Pagos from './components/Pagos'; // Detalle de pago
import Footer from './components/Footer'; //Pie de pagina
import { CartProvider } from './Context/Cart'; // Carrito de compras en seleción de productos
import './App.css'; //estilo CSS


function App() {
  return (
    <CartProvider> {/* carrito de compras*/}
      <Router>
        <div className="App">
          <Navbar />
        
        {/* 2. Definimos dónde va a cambiar el contenido dinámico */}
        <div className="container"> 
          <Routes>
            {/* Ruta inicial (Home) */}
            <Route path="/" element={<Inicio/>} /> 
            
            {/* Ruta del formulario */}
            <Route path="/clientes" element={<Clientes/>} />
           
            {/* Componentes */}
            <Route path="/productos" element={<Productos />} />
            <Route path="/pagos" element={<Pagos/>} />
            <Route path="/pedidos" element={<Pedidos/>} />
            <Route path='/historial' element={<HistorialPedidos/>} />
          </Routes>
        </div>
      <Footer /> 

      </div>
    </Router>
    </CartProvider> /* <-- Cierre del Provider */
    );
}

export default App;
