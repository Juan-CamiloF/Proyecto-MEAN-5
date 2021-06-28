//Modulos internos
const mongoose = require("mongoose");
//Esquema
const esquemaLibro = mongoose.Schema({
  titulo: { type: String, required: true },
  anio: { type: Number, required: true },
  genero: { type: String, required: true },
  numeroPaginas: { type: String, required: true },
  editorial: { type: String, required: true },
  autor: { type: String, required: true },
});
const modeloLibros = mongoose.model('libro',esquemaLibro);
module.exports.Libros = modeloLibros;
