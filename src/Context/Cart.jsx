import { createContext, useState, useContext, useEffect } from 'react';

const Cart = createContext();

export const CartProvider = ({ children }) => {
  // 1. Estado del Carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  // 2. Estado del Cliente (Objeto completo)
  const [datosCliente, setDatosCliente] = useState(() => {
    const guardado = localStorage.getItem("datosCliente");
    return guardado ? JSON.parse(guardado) : { 
        nombre: '', apellido: '', cedula: '', celular: '', 
        email: '', departamento: '', municipio: '', direccion: '' 
    };
  });

  const[metodoSeleccionado, setMetodoSeleccionado] = useState("Nequi");

  const[historialPedidos, setHistorialPedidos] = useState([]);

  //Concepción API
  useEffect(() => {
    fetch("http://localhost:3000/api/pedidos")
      .then(res => res.json())
      .then(data => setHistorialPedidos(data))
      .catch(err => console.log("Error al traer historial:", err));
  }, []);
    
  // Efecto para carrito y datos de cliente
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('datosCliente', JSON.stringify(datosCliente));
  }, [carrito, datosCliente]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const itemExistente = prev.find(item => item.id === producto.id && item.talla === producto.talla);
      if (itemExistente) {
        return prev.map(item => (item.id === producto.id && item.talla === producto.talla) ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id));
  const vaciarCarrito = () => setCarrito([]);
  const guardarPedido = (nuevoPedido) => {
    setHistorialPedidos((prev) => [...prev, nuevoPedido]);
  };

  //limpiar hitorial 
  const limpiarHistorial = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/pedidos", {
        method: "DELETE", // Avisa al servidor que vacíe el JSON
      });

      if (respuesta.ok) {
        setHistorialPedidos([]); // Borra de la pantalla
        localStorage.removeItem('historialPedidos'); // Borra respaldo local
        console.log("✅ Historial eliminado permanentemente");
      }
    } catch (err) {
      console.error("❌ Error al conectar con la API para borrar:", err);
    }
  };

  const totalPagar = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <Cart.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      eliminarDelCarrito, 
      vaciarCarrito,
      totalPagar, 
      cantidadTotal,
      datosCliente,
      setDatosCliente,
      historialPedidos,
      guardarPedido,
      limpiarHistorial,
      metodoSeleccionado,
      setMetodoSeleccionado
    }}>
      {children}
    </Cart.Provider>
  );
};

export const useCart = () => useContext(Cart);

