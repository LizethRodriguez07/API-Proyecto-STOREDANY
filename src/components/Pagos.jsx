import React from 'react';
import { useCart } from '../Context/Cart';
import './Pagos.css';

function Pagos() {
  const { carrito, totalPagar, datosCliente, vaciarCarrito, guardarPedido, metodoSeleccionado } = useCart();

  // Fecha 
  const fechaPedido = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const medioPago = metodoSeleccionado || "Nequi";

  //Conectada a la api
  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }
    
    // Creamos el objeto del pedido para el historial
    const nuevoPedido = {
      id: Date.now(),
      cliente: {
        nombre: datosCliente.nombre,
        apellido: datosCliente.apellido,
        celular: datosCliente.celular,
        direccion: datosCliente.direccion,
        municipio: datosCliente.municipio,
        departamento: datosCliente.departamento
      },
      fecha: fechaPedido,
      productos: [...carrito], 
      metodoPago: medioPago,
      total: totalPagar
    };

    // Enviar a la API
    try {
      const respuesta = await fetch("http://localhost:3000/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(nuevoPedido)
      });
      if (respuesta.ok) {
        console.log("✅ Pago registrado en el servidor");
      }
    } catch (error) {
      console.error("❌ Error enviando pago a la API:", error);
    }
     
    // Guardamos en el historial global
    guardarPedido(nuevoPedido);

    // Mensaje de éxito
    alert(`¡Gracias ${datosCliente.nombre}! Tu pedido por $${totalPagar.toLocaleString()} ha sido procesado con éxito.`);
    
    vaciarCarrito();
    window.location.href = "/historial"; 
  };

  return (
    <div className="pagos-container">
      <h2>Finalizar Compra</h2>
      <div className="resumen-pago">

        {/* Sección de datos del cliente */}
        <section className="info-envio">
          <h3>Información del Pedido</h3>
          <p><strong>Cliente:</strong> {datosCliente.nombre} {datosCliente.apellido}</p>
          <p><strong>Teléfono:</strong> {datosCliente.celular}</p>
          <p><strong>Dirección:</strong> {datosCliente.direccion}, {datosCliente.municipio}</p>
          <p><strong>Fecha:</strong> {fechaPedido}</p>
          <p><strong>Medio de Pago:</strong> {" "} <span className={`tag-pago ${medioPago.toLowerCase()}`}>{medioPago}</span></p>
        </section>

        {/* Listado de productos con validación de color */}
        <section className="detalle-productos">
          <h3>Productos en tu Orden</h3>
          {carrito.map((item, index) => (
            <div key={item.id + item.talla + index} className="pago-item">
              <div className="producto-info-principal">
                {item.imagen && (
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', marginRight: '12px' }} 
                  />
                )}
                <div>
                  <strong>{item.nombre}</strong>
                  <small>Talla: {item.talla} | Color: {item.color || "N/A"}</small>
                </div>
              </div>
              
              <div className="producto-precio-cantidad">
                <div className="cantidad-txt">x{item.cantidad}</div>
                <div className="subtotal-txt">
                  <strong>${(item.precio * item.cantidad).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
          
          <hr />
          
          <div className="total-final">
            <strong>Total Pagado:</strong>
            <span className="precio-total">${totalPagar.toLocaleString()}</span>
          </div>
        </section>

        <button className="btn-confirmar" onClick={finalizarCompra}>
          Confirmar y Pagar
        </button>
      </div>
    </div>
  );
}

export default Pagos;

