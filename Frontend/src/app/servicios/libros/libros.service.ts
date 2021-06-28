import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { libros, mensaje } from 'src/app/modelos/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  //Endpoints
  private agregarUrl = 'http://localhost:3000/api/libros/agregar';
  private listarUrl = 'http://localhost:3000/api/libros/listar';
  private actualizarUrl = 'http://localhost:3000/api/libros/actualizar';
  private eliminarUrl = 'http://localhost:3000/api/libros/eliminar';
  constructor(private http: HttpClient) {}
  agregarLibro(libro: libros) {
    return this.http.post<libros>(this.agregarUrl, libro);
  }
  listarLibros() {
    return this.http.get<libros[]>(this.listarUrl);
  }
  actualizarLibro(libro: libros) {
    const _id = libro._id;
    const url = `${this.actualizarUrl}/${_id}`;
    return this.http.put<libros>(url, libro);
  }
  eliminarLibro(libro: libros) {
    const _id = libro._id;
    const url = `${this.eliminarUrl}/${_id}`;
    return this.http.delete<mensaje>(url);
  }
}
