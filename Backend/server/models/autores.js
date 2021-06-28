//Modulo interno base de datos
const mongoose = require("mongoose");
//Esquema
const esquemaAutores = mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  fechaDeNacimiento: { type: Date, required: true },
  ciudadDeProcedencia: { type: String, required: true },
  correoElectronico: { type: String, required: true },
});
const modeloAutores = mongoose.model('autore',esquemaAutores);
module.exports.Autores = modeloAutores;
