import React, { useState, useEffect } from "react"; 
import { useCart } from '../Context/Cart';
import './Productos.css'; 

// Importa tus imágenes (puedes usar la misma para todos si aún no tienes más)
import imagen1 from "../assets/niked.jpg";
import imagen2 from "../assets/Nike negro.jpg";
import imagen3 from "../assets/Nikex.jpg";
import imagen4 from "../assets/nike.jpg";
import imagen5 from "../assets/Adidas 1.jpg";
import imagen6 from "../assets/Adidas 2.jpg";
import imagen7 from "../assets/Adidas3.jpg";
import imagen8 from "../assets/Adidas4.jpg";
import imagen9 from "../assets/Puma1.jpg";
import imagen10 from "../assets/Puma2.jpg";
import imagen11 from "../assets/Puma3.jpg";
import imagen12 from "../assets/Puma4.jpg";
import imagen13 from "../assets/New1.png";
import imagen14 from "../assets/New2.jpg";
import imagen15 from "../assets/New3.jpg";
import imagen16 from "../assets/New4.jpg";
import imagen17 from "../assets/Reebook1.jpg";
import imagen18 from "../assets/Reebook2.jpg";
import imagen19 from "../assets/Reebook3.jpg";
import imagen20 from "../assets/Reebook4.jpg";
import { data } from "react-router-dom";

const TarjetaProducto = ({ item, agregarAlCarrito }) => {
  const [talla, setTalla] = useState("");

   return (
    <div className="card">
      <div className="card-image">
        <img src={item.imagen} alt={item.nombre} />
      </div>
      <div className="card-info">
        <h4>{item.nombre}</h4>
        <p className="color-texto">Color: {item.color}</p>
        <span className="tallas-titulo">Talla:</span>
        <div className="tallas-container">
          {["37", "38", "39", "40", "41", "42"].map((t) => (
            <button
              key={t}
              type="button"
              className={talla === t ? "talla-btn seleccionada" : "talla-btn"}
              onClick={() => setTalla(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="precio">${item.precio.toLocaleString()}</p>
        <button 
          className="btn-agregar" 
          onClick={() => {
            if (!talla) {
              alert("Por favor, selecciona una talla antes de agregar.");
              return;
            }
            agregarAlCarrito({ ...item, talla });
            setTalla(""); 
          }}
        >
          Añadir a la compra
        </button>
      </div>
    </div>
    );
};

//----
function Productos() {
  const { agregarAlCarrito } = useCart();

  // Guardar los productos que contiene de la API
  const [productosApi, setProductosApi] = useState([]);
  const [filtro, setFiltro] = useState('Todas');

  //Conexión a la API abjuntando los productos al servidor
  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
    .then(res => res.json())
    .then(data => {

      //Map para asignar las imagenes locales segun su ID
      const mapeoImagenes = {
      1: imagen1, 2: imagen2, 3: imagen3, 4: imagen4,
      5: imagen5, 6: imagen6, 7: imagen7, 8: imagen8,
      9: imagen9, 10: imagen10, 11: imagen11, 12: imagen12,
      13: imagen13, 14: imagen14, 15: imagen15, 16: imagen16,
      17: imagen17, 18: imagen18, 19: imagen19, 20: imagen20
    };
  
    const productosConImagen = data.map(p => ({
          ...p,
          imagen: mapeoImagenes[p.id] || imagen1
        }));
        setProductosApi(productosConImagen);
      })
      .catch(err => console.error("Error API:", err));
  }, []);

  //Uso de filtro 'productosApi'
  const productosFiltrados = filtro === 'Todas' 
    ? productosApi 
    : productosApi.filter(p => p.marca === filtro);

  return (
    <div className="productos-container">
      <h2 className="titulo-sección">Nuestros Productos</h2>

      {/*Indicador visual del estado de la API*/}
      <p style={{textAlign: "center", color: '#28a745', fontSize: '12px'}}>
        ● Servidor de datos API Conectado
      </p>
    
      {/* 5. BOTONES DE FILTRO */}
      <div className="filtros-container">
        <button className={filtro === 'Todas' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('Todas')}>Todas</button>
        <button className={filtro === 'Nike' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('Nike')}>Nike</button>
        <button className={filtro === 'Adidas' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('Adidas')}>Adidas</button>
        <button className={filtro === 'Puma' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('Puma')}>Puma</button>
        <button className={filtro === 'New Balance' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('New Balance')}>New Balance</button>
        <button className={filtro === 'Reebok' ? 'btn-f activo' : 'btn-f'} onClick={() => setFiltro('Reebok')}>Reebok</button>
      </div>
      
       {/* Grilla de Productos */}
      <div className="productos-grid">
        {productosFiltrados.map((item) => (
          /* Aquí llamas a la función que tiene las tallas y todo el diseño */
          <TarjetaProducto 
            key={item.id} 
            item={item} 
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;