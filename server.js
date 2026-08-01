// Importamos los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuración de CORS
// Tip: Si te da problemas desde el navegador o Thunder Client, puedes usar origin: "*" temporalmente
var corsOptions = {
  origin: "*" 
};

app.use(cors(corsOptions));

// Middlewares para parsear el cuerpo de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos los modelos
const db = require("./app/models");

// Ruta de prueba inicial
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// Importamos y registramos las rutas de la aplicación
require("./app/routes/cliente.route")(app);
require("./app/routes/producto.route")(app);

// Definición del puerto
const PORT = process.env.PORT || 8081;

// Sincronizamos la base de datos Y LUEGO levantamos el servidor
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas correctamente con NeonDB.");
    
    // El servidor se enciende ÚNICAMENTE cuando la BD esté lista
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar y sincronizar con NeonDB:", err.message);
  });