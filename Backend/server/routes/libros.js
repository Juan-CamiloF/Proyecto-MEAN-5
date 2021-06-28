//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados - Controladores
const Libros = require('../controllers/libros');
//Rutas
router.post("/agregar",Libros.crearLibros);
router.get("/listar",Libros.listarLibros);
router.put("/actualizar/:_id",Libros.actualizarLibros);
router.delete("/eliminar/:_id",Libros.eliminarLibros);
//Exportar rutas
module.exports = router;