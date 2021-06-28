export interface autores {
  _id: String;
  nombreCompleto: String;
  fechaDeNacimiento: Date;
  ciudadDeProcedencia: String;
  correoElectronico: String;
}
export interface mensaje {
  message: String;
}
export interface editoriales {
  _id: String;
  nombre: String;
  direccion: String;
  telefono: String;
  correoElectronico: String;
  maximoDeLibros: 2;
}
export interface libros {
  _id: String;
  titulo: String;
  anio: Number;
  genero: String;
  numeroPaginas: Number;
  editorial: String;
  autor: String;
}
