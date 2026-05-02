# 🛒 my-STOREDANY - API de Gestión de Clientes

Este proyecto contiene el diseño, codificación y documentación de los servicios web (API)
para la gestión de clientes de la tienda **my-STOREDANY**.

## 🛠️ Tecnologías y Herramientas
*   **Backend:** Node.js con Framework Express.
*   **Frontend de prueba:** React + Vite.
*   **Documentación:** Postman (archivo JSON incluido en el repositorio).
*   **Control de Versiones:** Git y GitHub.

## 🚀 Cómo ejecutar el servidor
1. Descargar o clonar este repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar el comando `node index.js`.
4. El servidor estará activo en: `http://localhost:3000`.

## 📑 Servicios Web (Endpoints)
La API permite las siguientes operaciones sobre el recurso **Clientes**:

1. **Obtener Estado/Lista (GET):** 
   - URL: `http://localhost:3000/api/clientes`
   - Retorna los datos del administrador y confirma la conexión.

2. **Registrar Cliente (POST):** 
   - URL: `http://localhost:3000/api/clientes`
   - Recibe los datos del formulario (nombre, apellido, cédula, email, etc.) y los guarda en la lista temporal del servidor.

## 📁 Contenido del Repositorio
*   `index.js`: Código principal del servidor API.
*   `my-StoreDany - API.postman_collection.json`: Archivo para importar en Postman y probar los servicios.
*   `README.md`: Documentación técnica del proyecto.
