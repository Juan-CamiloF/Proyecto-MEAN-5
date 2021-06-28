import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { AutoresService } from 'src/app/servicios/autores/autores.service';
import { EditorialesService } from 'src/app/servicios/editoriales/editoriales.service';
import { LibrosService } from 'src/app/servicios/libros/libros.service';
import { autores, editoriales, libros } from 'src/app/modelos/interfaces';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ModalLibroComponent } from '../modales/modal-libro/modal-libro.component';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  //Listas y filtros
  listaLibros: libros[] = [];
  listaEditoriales: editoriales[] = [];
  filtroEditoriales!: Observable<editoriales[]>;
  listaAutores: autores[] = [];
  filtroAutores!: Observable<autores[]>;
  //Filtro de busqueda
  filtro!: string;
  //Booleanos
  hayActores = false;
  hayEditoriales = false;
  constructor(
    private formBuild: FormBuilder,
    private libro: LibrosService,
    private editorial: EditorialesService,
    private autor: AutoresService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Campos fomulario
    this.formulario = this.formBuild.group({
      titulo: ['', Validators.required],
      anio: [
        '',
        [
          Validators.required,
          Validators.min(1500),
          Validators.max(2021),
          Validators.pattern('[0-9]{4}'),
        ],
      ],
      genero: ['', Validators.required],
      numeroPaginas: [
        '',
        [
          Validators.required,
          Validators.min(25),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
      editorial: ['', Validators.required],
      autor: ['', Validators.required],
    });
    //Lista de libros
    this.libro.listarLibros().subscribe(
      (res) => {
        this.listaLibros = res;
        if(this.listaAutores.length < 0){
          let desactivar  = this.formulario.get('autor');
          desactivar?.disable();
        }
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
    //Lista de editoriales
    this.editorial.listarEditorial().subscribe(
      (res) => {
        this.listaEditoriales = res;
        if(this.listaEditoriales.length < 0){
          let desactivar  = this.formulario.get('editorial');
          desactivar?.disable();
        }
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
    //Filtro para editoriales
    let editorialesCampo = this.formulario.get('editorial') as FormArray;
    this.filtroEditoriales = editorialesCampo.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterEditoriales(value))
    );
    //Lista de autores
    this.autor.listarAutores().subscribe(
      (res) => {
        this.listaAutores = res;
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
    //Filtro de autores
    let autoresCampo = this.formulario.get('autor') as FormArray;
    this.filtroAutores = autoresCampo.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterAutores(value))
    );
  }
  //Función de filtro para autores
  private _filterAutores(value: string): autores[] {
    const filterValue = value.toLowerCase();
    return this.listaAutores.filter((option) =>
      option.nombreCompleto.toLowerCase().includes(filterValue)
    );
  }
  //Función de filtro para editoriales
  private _filterEditoriales(value: string): editoriales[] {
    const filterValue = value.toLowerCase();
    return this.listaEditoriales.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función agregar editoriales
  agregar(formulario: any, formDirective: FormGroupDirective) {
    if (this.formulario.invalid) return;
    console.log(this.formulario.value);
    this.libro.agregarLibro(this.formulario.value).subscribe(
      (res) => {
        this.listaLibros.push(res);
        formDirective.resetForm();
        this.formulario.reset();
        Swal.fire('Libro agregado!', 'Libro agregado al sistema', 'success');
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
  }
  //Función para actualizar editoriales
  actualizar(libro: libros) {
    const dialogRed = this.dialog.open(ModalLibroComponent, {
      width: '500px',
      data: { libro: libro, lista: this.listaLibros },
    });
  }
  //Función para eliminar editoriales
  eliminar(libro: libros) {
    Swal.fire({
      title: 'Eliminar el libro',
      text: '¿Está seguro de eliminar el libro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.libro.eliminarLibro(libro).subscribe(
          (res) => {
            const indice = this.listaLibros.indexOf(libro);
            if (indice !== -1) {
              this.listaLibros.splice(indice, 1);
              Swal.fire('Eliminada', `${res.message}`, 'success');
            }
          },
          (err) => {
            Swal.fire('Hubo un problema', `${err.error}`, 'error');
          }
        );
      } else {
        Swal.fire(
          'No se eliminó',
          'La editorial no se elimino del sistema',
          'info'
        );
      }
    });
  }
}
