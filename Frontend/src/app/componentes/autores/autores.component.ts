import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AutoresService } from 'src/app/servicios/autores/autores.service';
import { autores } from 'src/app/modelos/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModalAutorComponent } from '../modales/modal-autor/modal-autor.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  //Lista de autores
  listaAutores: autores[] = [];
  //Validaciones para la fecha
  maxDate = new Date(2004,0,0);
  minDate = new Date(1500,0,0)
  constructor(
    private formBuilder: FormBuilder,
    private autor: AutoresService,
    public dialog: MatDialog
  ) {}
  //Filtro de busqueda
  filtro!: string;
  ngOnInit(): void {
    //Campos del formulario
    this.formulario = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      ciudadDeProcedencia: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
    //Lista de autores
    this.autor.listarAutores().subscribe((res) => {
      this.listaAutores = res;
    });
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función agregar usuario
  agregar(formulario:any,formDirective:FormGroupDirective) {
    if (this.formulario.invalid) return;
    this.autor.agregarAutores(this.formulario.value).subscribe(
      (res) => {
        formDirective.resetForm();
        this.formulario.reset();
        Swal.fire('Autor agregado!', 'Autor agregado al sistema', 'success');
        this.listaAutores.push(res);
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
  }
  //Función actualizar usuario
  actualizar(autor: autores) {
    const dialofRef = this.dialog.open(ModalAutorComponent, {
      width: '500px',
      data: { autor: autor, lista: this.listaAutores },
    });
  }
  //Función eliminar usuario
  eliminar(autor: autores) {
    Swal.fire({
      title: 'Eliminar el autor',
      text: 'Si se elimina el autor los libros no se verán afectados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.autor.eliminarAutores(autor).subscribe(
          (res) => {
            const indice = this.listaAutores.indexOf(autor);
            if (indice !== -1) {
              this.listaAutores.splice(indice, 1);
              Swal.fire('Eliminado', `${res.message}`, 'success');
            }
          },
          (err) => {
            Swal.fire('Hubo un problema', `${err.error}`, 'error');
          }
        );
      } else {
        Swal.fire(
          'No se eliminó',
          'El autor no se elimino del sistema',
          'info'
        );
      }
    });
  }
}
