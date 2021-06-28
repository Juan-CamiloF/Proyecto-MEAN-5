import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { autores, mensaje } from 'src/app/modelos/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  //Endpoints
  private agregarUrl = 'http://localhost:3000/api/autores/agregar';
  private listarUrl = 'http://localhost:3000/api/autores/listar';
  private actualizarUrl = 'http://localhost:3000/api/autores/actualizar';
  private eliminarUrl = 'http://localhost:3000/api/autores/eliminar';
  constructor(private http: HttpClient) {}
  //Funciones para consumir el backend
  agregarAutores(autor: autores) {
    return this.http.post<autores>(this.agregarUrl, autor);
  }
  listarAutores() {
    return this.http.get<autores[]>(this.listarUrl);
  }
  actualizarAutores(autor:autores){
    const _id = autor._id;  
    const url = `${this.actualizarUrl}/${_id}`;
    return this.http.put<autores>(url,autor);
  }
  eliminarAutores(autor:autores){
    const _id = autor._id;
    const url = `${this.eliminarUrl}/${_id}`;
    return this.http.delete<mensaje>(url);
  }
}
