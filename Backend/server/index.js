//Modulos internos
const express = require("express");
const cors = require("cors");
//Modulos creados
const Autores = require("./routes/autores");
const Editoriales = require("./routes/editoriales");
const Libros = require("./routes/libros");
//Aplicación
const app = express();
//Configuraciones
app.use(express.json());
app.use(cors());
//Puerto
app.set("port", process.env.PORT || 3000);
//Base de datos
const { mongosee } = require("./database");
//Rutas
app.use("/api/autores", Autores);
app.use("/api/editoriales", Editoriales);
app.use("/api/libros", Libros);
//Inicio de la aplicación
app.listen(app.get("port"), () => {
  console.log("Servidor funcionando en puerto:", app.get("port"));
});
