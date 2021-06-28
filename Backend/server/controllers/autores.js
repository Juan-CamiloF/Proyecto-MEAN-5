//Modulos creados - Modelos
const { Autores } = require("../models/autores");
//Controlador
const AutoresControlador = {};
//-----Funciones-----
//Crear autores
AutoresControlador.crearAutores = async (req, res) => {
  //Si ya está registrado el nombre del autor
  const existeElAutor = await Autores.findOne({
    nombreCompleto: req.body.nombreCompleto,
  });
  if (existeElAutor) return res.status(400).send("El autor ya está registrado");
  //Si no lo está se crea
  const autor = new Autores({
    nombreCompleto: req.body.nombreCompleto,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    ciudadDeProcedencia: req.body.ciudadDeProcedencia,
    correoElectronico: req.body.correoElectronico,
  });
  const save = autor.save();
  res.status(200).send(autor);
};
//Lista de autores
AutoresControlador.listarAutores = async (req, res) => {
  //Lista de autores
  const lista = await Autores.find();
  res.status(200).send(lista);
};
//Actualizar autores
AutoresControlador.actualizarAutores = async (req, res) => {
  //Si no cambia el nombre del autor
  const idAutor = await Autores.findById(req.params._id);
  if (idAutor.nombreCompleto === req.body.nombreCompleto) {
    const autor = await Autores.findByIdAndUpdate(
      req.params._id,
      {
        nombreCompleto: idAutor.nombreCompleto,
        fechaDeNacimiento: req.body.fechaDeNacimiento,
        ciudadDeProcedencia: req.body.ciudadDeProcedencia,
        correoElectronico: req.body.correoElectronico,
      },
      { new: true }
    );
    if (!autor) return res.status(400).send("El autor no está registrado");
    res.status(200).send(autor);
  }
  //Si cambia el nombre del autor
  if (idAutor.nombreCompleto !== req.body.nombreCompleto) {
    const existeElAutor = await Autores.findOne({
      nombreCompleto: req.body.nombreCompleto,
    });
    if (existeElAutor)
      return res.status(400).send("El autor ya está registrado");
    const autor = await Autores.findByIdAndUpdate(
      req.params._id,
      {
        nombreCompleto: req.body.nombreCompleto,
        fechaDeNacimiento: req.body.fechaDeNacimiento,
        ciudadDeProcedencia: req.body.ciudadDeProcedencia,
        correoElectronico: req.body.correoElectronico,
      },
      { new: true }
    );
    if (!autor) return res.status(400).send("El autor no está registrado");
    res.status(200).send(autor);
  }
};
//Eliminar autores
AutoresControlador.eliminarAutores = async (req, res) => {
  //Se busca el autor y se elimina
  const eliminar = await Autores.findByIdAndDelete(req.params._id);
  if (!eliminar) return res.status(400).send("El autor nor está registrado");
  res.status(200).send({ message: "Autor eliminado" });
};

module.exports = AutoresControlador;
