//Modulos creados - Modelos
const { Editoriales } = require("../models/editoriales");
const { Libros } = require("../models/libros");
//Controlador
const EditorialesControlador = {};
//-----Funciones-----
//Crear editoriales
EditorialesControlador.crearEditoriales = async (req, res) => {
  const existeLaEditorial = await Editoriales.findOne({
    nombre: req.body.nombre,
  });
  if (existeLaEditorial)
    return res.status(400).send("La editorial ya está registrada");
  if (req.body.maximoDeLibros === 0)
    return res.status(400).send("La editorial no puede tener 0 libros");
  const editorial = new Editoriales({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correoElectronico: req.body.correoElectronico,
    maximoDeLibros: req.body.maximoDeLibros,
  });
  const save = editorial.save();
  res.status(200).send(editorial);
};
//Listar editoriales
EditorialesControlador.listarEditoriales = async (req, res) => {
  const lista = await Editoriales.find();
  res.status(200).send(lista);
};
//Actualizar editoriales
EditorialesControlador.actualizarEditoriales = async (req, res) => {
  const idEditorial = await Editoriales.findById(req.params._id);
  //Si cambia la cantidad de libros
  const cantidadDeLibros = await Libros.find({ editorial: idEditorial.nombre });
  if (
    req.body.maximoDeLibros < cantidadDeLibros.length &&
    req.body.maximoDeLibros !== -1
  )
    return res
      .status(400)
      .send(
        "La cantidad máxima no es permitida ya que hay más libros registrados"
      );
  //Si el nombre de la editorial no cambia
  if (idEditorial.nombre === req.body.nombre) {
    const editorial = await Editoriales.findByIdAndUpdate(
      req.params._id,
      {
        nombre: idEditorial.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correoElectronico: req.body.correoElectronico,
        maximoDeLibros: req.body.maximoDeLibros,
      },
      { new: true }
    );
    if (!editorial)
      return res.status(400).send("La editorial no está registrada");
    res.status(200).send(editorial);
  }
  //Si el nombre de la editorial cambia
  if (idEditorial.nombre !== req.body.nombre) {
    //Si ya existe la editorial
    const existe = await Editoriales.findOne({ nombre: req.body.nombre });
    if (existe) return res.status(400).send("La editorial ya está registrada");
    const editorial = await Editoriales.findByIdAndUpdate(
      req.params._id,
      {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correoElectronico: req.body.correoElectronico,
        maximoDeLibros: req.body.maximoDeLibros,
      },
      { new: true }
    );
    if (!editorial)
      return res.status(400).send("La editorial no está registrada");
    res.status(200).send(editorial);
  }
};
//Eliminar editoriales
EditorialesControlador.eliminarEditorial = async (req, res) => {
  const editorial = await Editoriales.findByIdAndDelete(req.params._id);
  if (!editorial)
    return res.status(400).send("La editorial no está registrada");
  res.status(200).send({ message: "Editorial eliminada" });
};
module.exports = EditorialesControlador;
