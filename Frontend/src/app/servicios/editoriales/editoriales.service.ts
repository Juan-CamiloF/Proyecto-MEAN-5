import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { editoriales, mensaje } from 'src/app/modelos/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EditorialesService {
  //Endpoints
  private agregarUrl = 'http://localhost:3000/api/editoriales/agregar';
  private listarUrl = 'http://localhost:3000/api/editoriales/listar';
  private actualizarUrl = 'http://localhost:3000/api/editoriales/actualizar';
  private eliminarUrl = 'http://localhost:3000/api/editoriales/eliminar';
  constructor(private http: HttpClient) {}
  //Funciones para consumir el backend
  agregarEditorial(editorial: editoriales) {
    return this.http.post<editoriales>(this.agregarUrl, editorial);
  }
  listarEditorial() {
    return this.http.get<editoriales[]>(this.listarUrl);
  }
  actualizarEditorial(editorial: editoriales) {
    const _id = editorial._id;
    const url = `${this.actualizarUrl}/${_id}`;
    return this.http.put<editoriales>(url, editorial);
  }
  eliminarEditorial(editorial: editoriales) {
    const _id = editorial._id;
    const url = `${this.eliminarUrl}/${_id}`;
    return this.http.delete<mensaje>(url);
  }
}
