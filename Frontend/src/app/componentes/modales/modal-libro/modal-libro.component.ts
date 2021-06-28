import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { autores, editoriales, libros } from 'src/app/modelos/interfaces';
import { AutoresService } from 'src/app/servicios/autores/autores.service';
import { EditorialesService } from 'src/app/servicios/editoriales/editoriales.service';
import { LibrosService } from 'src/app/servicios/libros/libros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-libro',
  templateUrl: './modal-libro.component.html',
  styleUrls: ['./modal-libro.component.css'],
})
export class ModalLibroComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  //Listas
  listaAutores: autores[] = [];
  listaEditoriales: editoriales[] = [];
  //Filtros
  filtroEditoriales!: Observable<editoriales[]>;
  filtroAutores!: Observable<autores[]>;
  constructor(
    private formBuilder: FormBuilder,
    private libros: LibrosService,
    private editoriales: EditorialesService,
    private autores: AutoresService,
    public dialogRef: MatDialogRef<ModalLibroComponent>,
    @Inject(MAT_DIALOG_DATA)
    public informacion: { libro: libros; lista: libros[] }
  ) {}

  ngOnInit(): void {
    //Campos formulario
    this.formulario = this.formBuilder.group({
      _id: [this.informacion.libro._id, Validators.required],
      titulo: [this.informacion.libro.titulo, Validators.required],
      anio: [
        this.informacion.libro.anio,
        [
          Validators.required,
          Validators.min(1500),
          Validators.max(2022),
          Validators.pattern('[0-9]{4}'),
        ],
      ],
      genero: [this.informacion.libro.genero, Validators.required],
      numeroPaginas: [
        this.informacion.libro.numeroPaginas,
        [
          Validators.required,
          Validators.min(25),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
      editorial: [this.informacion.libro.editorial, Validators.required],
      autor: [this.informacion.libro.autor, Validators.required],
    });
    //Lista de autores
    this.autores.listarAutores().subscribe(
      (res) => {
        this.listaAutores = res;
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
    //Filtro para autores
    let autoresCampo = this.formulario.get('autor') as FormArray;
    this.filtroAutores = autoresCampo.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filtroAutores(value))
    );
    //Lista editoriales
    this.editoriales.listarEditorial().subscribe(
      (res) => {
        this.listaEditoriales = res;
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
    //Filtro para editoriales
    let editorialesCampo = this.formulario.get('editorial') as FormArray;
    this.filtroEditoriales = editorialesCampo.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filtroEditoriales(value))
    );
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función de filtro para autores
  private _filtroAutores(value: string): autores[] {
    const filterValue = value.toLowerCase();
    return this.listaAutores.filter((option) =>
      option.nombreCompleto.toLowerCase().includes(filterValue)
    );
  }
  //Función de filtro para editoriales
  private _filtroEditoriales(value: string): editoriales[] {
    const filterValue = value.toLowerCase();
    return this.listaEditoriales.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }
  //Función para atualizar libros
  actualizar() {
    if (this.formulario.invalid) return;
    this.libros.actualizarLibro(this.formulario.value).subscribe(
      (res) => {
        const indice = this.informacion.lista.indexOf(this.informacion.libro);
        if (indice !== -1) {
          this.informacion.lista[indice] = res;
          Swal.fire(
            'Datos actualizados',
            'Datos del libro acutalizados',
            'success'
          );
          this.dialogRef.close();
        } else {
          Swal.fire(
            'Hubo un problema',
            'El libro no está en el sistema',
            'error'
          );
        }
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
  }
}
