//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados - Controladores
const Editoriales = require("../controllers/editoriales");
//Rutas
router.post("/agregar", Editoriales.crearEditoriales);
router.get("/listar", Editoriales.listarEditoriales);
router.put("/actualizar/:_id", Editoriales.actualizarEditoriales);
router.delete("/eliminar/:_id", Editoriales.eliminarEditorial);
//Exportar rutas
module.exports = router;
