//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados - Controladores
const Autores = require("../controllers/autores");
//Rutas
router.post("/agregar", Autores.crearAutores);
router.get("/listar",Autores.listarAutores);
router.put("/actualizar/:_id",Autores.actualizarAutores)
router.delete("/eliminar/:_id",Autores.eliminarAutores);
//Exportar rutas
module.exports = router;