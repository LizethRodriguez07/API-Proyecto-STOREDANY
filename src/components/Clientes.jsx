import { useState, useEffect } from "react"; // Hooks para manejar el estado local y el ciclo de vida del componente
import { useCart } from "../Context/Cart"; // Acceso al contexto global para gestionar los datos del carrito
import './Clientes.css';
import { data } from "react-router-dom"; // Herramienta para manejo de navegación y datos de rutas

const Clientes = () => {
    // actualizar los datos del cliente
    const { setDatosCliente } = useCart();

    // ESTADO PARA LA API: Guarda el mensaje que viene del servidor
    const [infoApi, setInfoApi] = useState("");

    // CONEXIÓN CON LA API (GET) cargar el componente
    useEffect(() => {
        fetch("http://localhost:3000/api/clientes")
            .then(res => res.json())
            .then(data => {
                // Como la API devuelve un array, tomamos el mensaje del primer objeto
                setInfoApi(data[0]?.estado || "Conectado al Servidor");
            })
            .catch(err => {
                console.log("Error al conectar con la API:", err);
                setInfoApi("Servidor Desconectado");
            });
    }, []);

    // campos del formulario
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        celular: '',
        email: '',
        departamento: '',
        municipio: '',
        direccion: '',
    });

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    // envio de datos
    const handleSubmit = async (e) => { // Agregamos async para la petición
        e.preventDefault();
        if (!usuario.nombre || !usuario.apellido || !usuario.direccion || !usuario.celular) {
            alert("Por favor completa los datos de contacto y dirección");
            return;
        }

         // ENVÍO DE DATOS A LA API (POST)
        try {
            const respuesta = await fetch("http://localhost:3000/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });

            if (respuesta.ok) {
                console.log("Datos enviados al servidor con éxito");
            }
        } catch (error) {
            console.error("Error al enviar a la API:", error);
        }

    //Guardar el nombre completo del cliente
        setDatosCliente(usuario);
        
        // guardar en localStorage para que no se borre al actualizar la pagina
        localStorage.setItem('datosCliente', JSON.stringify(usuario));
        // mensiona si los datos fueron registrados correctamente
        alert(`Datos de ${usuario.nombre} guardados correctamente.`);
    };

    return (
        //Formulario de Registro
        <div className="cliente-container">
            {/* Indicador visual del estado de la API */}
            <span className="servidor-status" style={{ color: infoApi.includes("Desconectado") ? 'red' : '#28a745', display: 'block', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>
                ● {infoApi}
            </span>

            <h2>Ingreso de Datos Personales</h2>
            <form className="form-grid" onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required/>
                </div>
                <div className="input-group">
                    <label>Apellido</label>
                    <input type="text" name="apellido" value={usuario.apellido} onChange={handleChange} required/>
                </div>
                <div className="input-group">
                    <label>Cedula</label>
                    <input type="text" name="cedula" value={usuario.cedula} onChange={handleChange} required/>
                </div>
                <div className="input-group">
                    <label>Celular</label>
                    <input type="text" name="celular" value={usuario.celular} onChange={handleChange} required/>
                </div>
                <div className="input-group full-width">
                    <label>Email</label>
                    <input type="email" name="email" value={usuario.email} onChange={handleChange} required/>
                </div>
                <div className="input-group">
                    <label>Departamento</label>
                    <input type="text" name="departamento" value={usuario.departamento} onChange={handleChange}required/>
                </div>
                <div className="input-group">
                    <label>Municipio</label>
                    <input type="text" name="municipio" value={usuario.municipio} onChange={handleChange} required/>
                </div>
                <div className="input-group full-width">
                    <label>Dirección</label>
                    <input type="text" name="direccion" value={usuario.direccion} onChange={handleChange} required/>
                </div>
        {/*Boton de guardar los Datos ingresados*/}
        <button type="submit" className="btn-enviar">Guardar Base de Datos</button>

            </form>
        </div>
    );
};

export default Clientes