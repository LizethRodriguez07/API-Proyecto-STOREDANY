import React from 'react';
import { useCart } from '../Context/Cart';
import './HistorialPedidos.css';

function HistorialPedidos() {
  const{historialPedidos, limpiarHistorial} = useCart();

  const manejarLimpiar = async () => {
  if (window.confirm("¿Deseas limpiar la vista del historial de tu Pedido?")) {
    try {
      await limpiarHistorial(); // servidor borre el JSON
      alert("Historial eliminado correctamente");
    } catch (error) {
      alert("Hubo un error al borrar el historial en el servidor");
    }
  }
};

  return (
    <div className="historial-container">
      <h2>Mis Pedidos Realizados</h2>

      <div className='admin-actions'>
        <button className='btn-limpiar' onClick={manejarLimpiar}>
            🗑️ Limpiar Historial de Pedidos
        </button>
      </div>
      
      {/* Verificación de historial vacío */}
      {!historialPedidos || historialPedidos.length === 0 ? (
        <div className="historial-vacio">
          <p>Aún no tienes pedidos registrados.</p>
        </div>
      ) : (
        historialPedidos.map((pedido, index) => (
          <div key={pedido.id || index} className="pedido-card">
            <div className="pedido-header">
              <span className="fecha-pedido">📅 {pedido.fecha}</span>
              <span className="badge-pago">{pedido.metodoPago}</span>
            </div>
            
            <div className="info-cliente-historial">
              <p><strong>Destinatario:</strong> {pedido.cliente?.nombre} {pedido.cliente?.apellido || ""}</p>
              <p className="dato-secundario"><strong>Celular:</strong> {pedido.cliente?.celular || "N/A"}</p>
              <p className="dato-secundario">
                <strong>Dirección:</strong> {
                  [
                    pedido.direccion || pedido.cliente?.direccion,
                    pedido.municipio || pedido.cliente?.municipio,
                    pedido.departamento || pedido.cliente?.departamento
                  ]
                  .filter(Boolean)
                  .join(", ") || "N/A"
                }
              </p>
            </div>
            
            <div className="productos-list">
              {pedido.productos.map((prod, pIndex) => (
                <div key={pIndex} className="producto-item-historial">
                  <img src={prod.imagen} alt={prod.nombre} className="img-historial" />
                  <div className="detalles-prod">
                    <p className="prod-nombre">{prod.nombre}</p>
                    <p className="prod-meta">
                        Talla: <strong>{prod.talla}</strong>
                        Color: <strong>{prod.color || "N/A"}</strong>
                        Cant. <strong> {prod.cantidad}</strong>
                    </p>
                  </div>
                  <span className="prod-subtotal">${(prod.precio * prod.cantidad).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pedido-footer">
              <span className="total-label">Total Pagado:</span>
              <span className="total-monto">${pedido.total.toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialPedidos;
