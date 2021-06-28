//Modulos creados - Modelos
const { Libros } = require("../models/libros");
const { Autores } = require("../models/autores");
const { Editoriales } = require("../models/editoriales");
//Controlador
const LibrosControlador = {};
//-----Funciones-----
//Crear libros
LibrosControlador.crearLibros = async (req, res) => {
  //Buscar el nombre del autor
  const autor = await Autores.findOne({ nombreCompleto: req.body.autor });
  //Si no existe el autor
  if (!autor) return res.status(400).send("El autor no está registrado");
  //Buscar el nombre de la editorial
  const editorial = await Editoriales.findOne({ nombre: req.body.editorial });
  //Si no existe la editorial
  if (!editorial)
    return res.status(400).send("La editorial no está registrada");
  //Buscar la cantidad maxima de libros de la editorial
  const maximoDeLibros = editorial.maximoDeLibros;
  //Buscar los libros registrados en la editorial
  const cantidadDeLibros = await Libros.find({ editorial: editorial.nombre });
  //Si supera la cantidad de libros de la editorial NO lo guarda
  if (cantidadDeLibros.length > maximoDeLibros - 1 && maximoDeLibros !== -1)
    return res
      .status(400)
      .send("No es posible registrar el libro, se alcanzó el máximo permitido");
  //Si el titulo del libro esta repetido
  const titulo = await Libros.findOne({ titulo: req.body.titulo });
  if (titulo) return res.status(400).send("El libro ya esta registrado");
  //Si no supera la cantidad de libros de la editorial lo guarda
  const libro = new Libros({
    titulo: req.body.titulo,
    anio: req.body.anio,
    genero: req.body.genero,
    numeroPaginas: req.body.numeroPaginas,
    editorial: editorial.nombre,
    autor: autor.nombreCompleto,
  });
  const save = libro.save();
  res.status(200).send(libro);
};
//Listar los libros
LibrosControlador.listarLibros = async (req, res) => {
  const lista = await Libros.find();
  res.status(200).send(lista);
};
//Actualizar libros
LibrosControlador.actualizarLibros = async (req, res) => {
  //Buscar el nombre del autor
  const autor = await Autores.findOne({ nombreCompleto: req.body.autor });
  //Si no existe el autor
  if (!autor) return res.status(400).send("El autor no está registrado");
  //Buscar el nombre de la editorial
  const editorial = await Editoriales.findOne({ nombre: req.body.editorial });
  //Si no existe la editorial
  if (!editorial)
    return res.status(400).send("La editorial no está registrada");
  const idLibro = await Libros.findById(req.params._id);
  //Si el titulo del libro NO cambia
  if (idLibro.titulo === req.body.titulo) {
    const libro = await Libros.findByIdAndUpdate(
      req.params._id,
      {
        titulo: idLibro.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        numeroPaginas: req.body.numeroPaginas,
        editorial: editorial.nombre,
        autor: autor.nombreCompleto,
      },
      { new: true }
    );
    if (!libro) return res.status(400).send("El libro no está registado");
    res.status(200).send(libro);
  }
  //Si el titulo del libro cambia
  if (idLibro.titulo !== req.body.titulo) {
    //SI ya existe el libro
    const existeElTitulo = await Libros.findOne({ titulo: req.body.titulo });
    if (existeElTitulo)
      return res.status(400).send("El libro ya está registrado");
    const libro = await Libros.findByIdAndUpdate(
      req.params._id,
      {
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        numeroPaginas: req.body.numeroPaginas,
        editorial: editorial.nombre,
        autor: autor.nombreCompleto,
      },
      { new: true }
    );
    if (!libro) return res.status(400).send("El libro no está registado");
    res.status(200).send(libro);
  }
};
//Eliminar libros
LibrosControlador.eliminarLibros = async (req, res) => {
  const eliminar = await Libros.findByIdAndDelete(req.params._id);
  if (!eliminar) return res.status(400).send("El libro no está registrado");
  res.status(200).send({ message: "El libro fue eliminado" });
};
module.exports = LibrosControlador;
