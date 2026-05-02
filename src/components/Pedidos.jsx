import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import './Pedidos.css';

function Pedidos() {
  //Selección metodo de pago
  const { carrito, eliminarDelCarrito, totalPagar, vaciarCarrito, datosCliente, metodoSeleccionado, setMetodoSeleccionado } = useCart();
  const navigate = useNavigate();

  //Enviar la compra a la API
  const enviarPedidoApi = async () => {
    if (carrito.length === 0) {
      alert("El Carrito está Vacío");
      return;
    }

    //Estuctura de base de datos al servidor
    const objetoPedido = {
      cliente: {
        nombre: datosCliente?.nombre || "Invitado",
        apellido: datosCliente?.apellido || "",
        email: datosCliente?.email || "N/A",
        direccion: datosCliente?.direccion || "N/A",
        municipio: datosCliente?.municipio || "", 
        departamento: datosCliente?.departamento || "",
        celular: datosCliente?.celular || "N/A" 
      },
      productos: carrito.map(item => ({
        nombre: item.nombre,
        talla: item.talla,
        precio: item.precio,
        cantidad: item.cantidad,
        imagen: item.imagen,
        color: item.color || item.Color || "N/A"
      })),
      total: totalPagar,
      metodoPago: metodoSeleccionado
    };

    try {
      const respuesta = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objetoPedido)
      });

      if (respuesta.ok) {
        console.log("✅ Pedido guardado en el servidor");
        navigate("/pagos");
      }
    } catch (error) {
      console.error("❌ Error conectando a la API:", error);
      alert("Error al conectar con el servidor.");
      navigate("/pagos");
    }
  };

  return (
    <div className="pedidos-container">
      {/* DISEÑO DE LA CABECERA */}
      <div className="cabecera-pedido">
        <h2>Mi Resumen de Compra</h2>
        
        <div className="cliente-card-moderna">
          <div className="cliente-header">
            <div className="avatar-circulo">
              {/* Extraemos iniciales de nombre y apellido */}
              {datosCliente?.nombre?.charAt(0)}{datosCliente?.apellido?.charAt(0) || ""}
            </div>
            <div className="cliente-principal">
              <h3>{datosCliente?.nombre || "Invitado"} {datosCliente?.apellido || ""}</h3>
              <span className="badge-estado">Información de Envío</span>
            </div>
          </div>

          <div className="cliente-detalles-grid">
            <div className="detalle-item">
              <span className="icon">📞</span>
              <div>
                <label>Contacto</label>
                <p>{datosCliente?.celular || "No registrado"}</p>
              </div>
            </div>
            <div className="detalle-item">
              <span className="icon">📍</span>
              <div>
                <label>Dirección de entrega</label>
                <p>{datosCliente?.direccion || "Pendiente"} — {datosCliente?.municipio || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío. ¡Ve a la sección de productos!</p>
        </div>
      ) : (
        <div className="pedidos-contenido">
          <div className="lista-pedidos">
            {carrito.map((item, index) => (
              <div key={item.id + item.talla + index} className="item-pedido">
                <img src={item.imagen} alt={item.nombre} />
                <div className="item-info">
                  <h4>{item.nombre}</h4>
                  <p>Color: {item.color || item.Color || "N/A"}</p>
                  <p><strong>Talla: {item.talla}</strong></p>
                  <p>Precio: ${item.precio.toLocaleString()}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <p><strong>Subtotal: ${(item.precio * item.cantidad).toLocaleString()}</strong></p>
                </div>
                <button 
                  className="btn-eliminar" onClick={() => eliminarDelCarrito(item.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="resumen-total">
            <h3>Total: ${totalPagar.toLocaleString()}</h3>

            {/*Opcional de Metodo de pago*/}
            <div className="metodo-pago-selector">
              <label>Selecciona tu Metodo de Pago:</label>
              <div className="opciones-pago-flex">
            {/* Botón Nequi */}
              <div 
                className={`opcion-pago ${metodoSeleccionado === "Nequi" ? "activa nequi" : ""}`}
                onClick={() => setMetodoSeleccionado("Nequi")}
                >
                <div className="check-radio"></div>
                <span>Nequi</span>
              </div>

               {/* Botón Daviplata */}
                 <div 
                  className={`opcion-pago ${metodoSeleccionado === "Daviplata" ? "activa daviplata" : ""}`}
                  onClick={() => setMetodoSeleccionado("Daviplata")}
                  >
                  <div className="check-radio"></div>
                    <span>Daviplata</span>
                  </div>
                </div>
              </div>

            {/* Boton en interfax de coneción a las API */}
              <button className='btn-pagar' onClick={enviarPedidoApi}>
                  Proceder al Pago
              </button>
            
            <button className="btn-vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;