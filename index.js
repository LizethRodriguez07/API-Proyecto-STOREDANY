import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();

// Configuraciones necesarias
app.use(cors()); // Para que React y Postman creen interfaz
app.use(express.json()); // Para que el servidor genere los datos en formato JSON

const PATH_PEDIDOS = './pedidos.json';

// Cargar pedidos del archivo al iniciar
let listaPedidos = []; 

if (fs.existsSync(PATH_PEDIDOS)) {
    const contenido = fs.readFileSync(PATH_PEDIDOS, 'utf8');
    listaPedidos = JSON.parse(contenido);
}

let listaClientes = [
    {
        id: 1, 
        nombre: "Katherine (Admin)", 
        apellido: "Rodriguez", 
        cedula: "000",
        celular: "000",
        email: "admin@storedany.com",
        departamento: "Santander",
        municipio: "Girón",
        direccion: "Sede Principal",
        proyecto: "my-StoreDany", 
        estado: "SERVIDOR DE DATOS API CONECTADO"
    }
];

let listaProductos = [
    { id: 1, nombre: "NIKE AIR TRAINER", precio: 380000, marca: "Nike", color: "(blanco, negro, gris y detalles verde encendido)" },
    { id: 2, nombre: "TENIS AIR MAX 270", precio: 200000, marca: "Nike", color: "(negro)" },
    { id: 3, nombre: "NIKE AIR MAX", precio: 300000, marca: "Nike", color: "(ocre desierto)" },
    { id: 4, nombre: "TENIS NIKE AIR TAVAS", precio: 240000, marca: "Nike", color: "(blancas y negras con detalles verde voltio/lima)" },
    { id: 5, nombre: "ADIDAS AAA", precio: 119000, marca: "Adidas", color: "(negro y blanco)" },
    { id: 6, nombre: "ADIDAS AA", precio: 175000, marca: "Adidas", color: "(negro y blanco)" },
    { id: 7, nombre: "ADIDAS AA", precio: 190000, marca: "Adidas", color: "(negro y blanco)" },
    { id: 8, nombre: "ADIDAS AAA", precio: 240000, marca: "Adidas", color: "(blanco, azul y rojo)" },
    { id: 9, nombre: "PUMA PARK LIFESTYLE", precio: 119000, marca: "Puma", color: "(blanco con detalles negros y grises)" },
    { id: 10, nombre: "PUMA RS-FAST", precio: 175000, marca: "Puma", color: "(negro y rojo)"},
    { id: 11, nombre: "PUMA CAVEN 2.0", precio: 340000, marca: "Puma", color: "(blanco y gris con detalles perforados)" },
    { id: 12, nombre: "PUMA ONE PIECE", precio: 500000, marca: "Puma", color: "(negro)" },
    { id: 13, nombre: "NEW BALANCE", precio: 178000, marca: "New Balance", color: "(negro con detalles blanco y turquesa)" },
    { id: 14, nombre: "NEW BALANCE 574", precio: 594000, marca: "New Balance", color: "(gamuza azul y malla con detalles en naranja)" },
    { id: 15, nombre: "NEW BALANCE RC_1300", precio: 190000, marca: "New Balance", color: "(blanco con detalles en negro y gris)" },
    { id: 16, nombre: "NEW BALANCE 574", precio: 240000, marca: "New Balance", color: "(gris, negro y rojo)" },
    { id: 17, nombre: "REEBOK CLASSIC GL6000", precio: 119000, marca: "Reebok", color: "(gris y azul marino)" },
    { id: 18, nombre: "REEBOK CLASSIC", precio: 175000, marca: "Reebok", color: "(negro y rojo)" },
    { id: 19, nombre: "REEBOK ZIG", precio: 190000, marca: "Reebok", color: "(blanco y azul)" },
    { id: 20, nombre: "REEDOK CLASSIC LEATHER", precio: 240000, marca: "Reebok", color: "(blanco)" }
];

let listaPagos = [];

// Clientes
app.get('/api/clientes', (req, res) => {
    res.json(listaClientes);
             
});

// POST recibe los datos de tu formulario de React
app.post('/api/clientes', (req, res) => {
    const nuevoUsuario = req.body;
    
    // Le genera un ID
    const nuevoRegistro = {
        id: listaClientes.length + 1,
        ...nuevoUsuario
    };

    listaClientes.push(nuevoRegistro); // Lo guardamos en nuestra lista
    console.log("✅ Nuevo cliente recibido:", nuevoRegistro.nombre);
    
    res.status(201).json({ 
        mensaje: "✅ Nuevo cliente recibido correctamente", 
        cliente: nuevoRegistro 
    });
});

// NUEVA RUTA: Para borrar clientes desde Postman
app.delete('/api/clientes', (req, res) => {
    // Restauramos la lista al estado inicial (solo el Admin)
    listaClientes = [
        {
            id: 1, 
            nombre: "Katherine (Admin)", 
            apellido: "Rodriguez", 
            cedula: "000",
            celular: "000",
            email: "admin@storedany.com",
            departamento: "Santander",
            municipio: "Girón",
            direccion: "Sede Principal",
            proyecto: "my-StoreDany", 
            estado: "SERVIDOR DE DATOS API CONECTADO"
            }
    ];
    console.log("🗑️ Lista de clientes reseteada");
    res.json({ mensaje: "Lista de clientes reseteada correctamente" });
});

    // Productos
app.get('/api/productos', (req, res) => {
    res.json(listaProductos);
});

app.post('/api/productos', (req, res) => {
    const nuevoProducto = { id: listaProductos.length + 1, ...req.body };
    listaProductos.push(nuevoProducto);
    console.log("📦 Producto agregado:", nuevoProducto.nombre);
    res.status(201).json({ 
        mensaje: "📦 Producto registrado con éxito en la tienda", 
        producto: nuevoProducto 
    });
});

//Pedidos
app.get('/api/pedidos', (req, res) => res.json(listaPedidos));
app.post('/api/pedidos', (req, res) => {
    const nuevo = { id: listaPedidos.length + 1, fecha: new Date().toLocaleString(), ...req.body };
    listaPedidos.push(nuevo);
    fs.writeFileSync(PATH_PEDIDOS, JSON.stringify(listaPedidos, null, 2));
    //Ver en la terminal el medio de pago
    console.log(`🛒 Pedido #${nuevo.id} recibido - Pago: ${nuevo.metodoPago}`);
    res.status(201).json({ mensaje: "🛒 Pedido procesado", pedido: nuevo });
});

app.delete('/api/pedidos', (req, res) => {
    listaPedidos = []; // Limpia la memoria
    if (fs.existsSync(PATH_PEDIDOS)) {
        fs.writeFileSync(PATH_PEDIDOS, JSON.stringify([], null, 2)); // Limpia el archivo
    }
    console.log("🗑️ Historial borrado en el servidor");
    res.json({ mensaje: "Historial eliminado correctamente" });
});

//Pagos
app.get('/api/pagos', (req, res) => res.json(listaPagos));
app.post('/api/pagos', (req, res) => {
    const nuevo = { id: listaPagos.length + 1, ...req.body };
    listaPagos.push(nuevo);
    console.log("💳 Pago registrado por:", nuevo.metodo);
    res.status(201).json({ mensaje: "💳 Pago registrado con éxito", pago: nuevo });
});

// Definimos el puerto 3000 para no chocar con el 5173 de React
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de datos activo en: http://localhost:${PORT}`);
});
