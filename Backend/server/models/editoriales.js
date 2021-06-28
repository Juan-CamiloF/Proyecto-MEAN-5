//Modulo interno - Base de datos
const mongoose = require("mongoose");
//Esquema
const esquemaEditoriales = mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  maximoDeLibros: { type: Number, required: true },
});
const modeloEditoriales = mongoose.model("editoriale", esquemaEditoriales);
module.exports.Editoriales = modeloEditoriales;
