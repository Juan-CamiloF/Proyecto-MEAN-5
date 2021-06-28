import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { editoriales } from 'src/app/modelos/interfaces';
import { EditorialesService } from 'src/app/servicios/editoriales/editoriales.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditorialComponent } from '../modales/modal-editorial/modal-editorial.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css'],
})
export class EditorialesComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  //Lista de editoriales
  listaEditoriales: editoriales[] = [];
  filtro!: string;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private editorial: EditorialesService
  ) {}
  ngOnInit(): void {
    //Campos formulario
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      maximoDeLibros: [
        '',
        [Validators.required, Validators.pattern('^[-1-9]*$')],
      ],
    });
    //Lista de editoriales
    this.editorial.listarEditorial().subscribe(
      (res) => {
        this.listaEditoriales = res;
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función agregar editorial
  agregar(formulario:any,formDirective:FormGroupDirective) {
    if (this.formulario.invalid) return;
    this.editorial.agregarEditorial(this.formulario.value).subscribe(
      (res) => {
        this.listaEditoriales.push(res);
        this.formulario.reset();
        formDirective.resetForm();
        Swal.fire(
          'Editorial agregada!',
          'Editorial agregada al sistema',
          'success'
        );
      },
      (err) => {
        Swal.fire('Hubo un problema', `${err.error}`, 'error');
      }
    );
  }
  //Función actualizar editorial
  actualizar(editorial: editoriales) {
    const dialogRef = this.dialog.open(ModalEditorialComponent, {
      width: '500px',
      data: { editorial: editorial, lista: this.listaEditoriales },
    });
  }
  //Función eliminar editorial
  eliminar(editorial: editoriales) {
    Swal.fire({
      title: 'Eliminar la editorial',
      text: 'Si se elimina la editorial los libros no se verán afectados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.editorial.eliminarEditorial(editorial).subscribe(
          (res) => {
            const indice = this.listaEditoriales.indexOf(editorial);
            if (indice !== -1) {
              this.listaEditoriales.splice(indice, 1);
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
          'El libro no se elimino del sistema',
          'info'
        );
      }
    });
  }
}
