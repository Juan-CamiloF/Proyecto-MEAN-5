import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editoriales } from 'src/app/modelos/interfaces';
import { EditorialesService } from 'src/app/servicios/editoriales/editoriales.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-editorial',
  templateUrl: './modal-editorial.component.html',
  styleUrls: ['./modal-editorial.component.css'],
})
export class ModalEditorialComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private editoriales: EditorialesService,
    public dialogRef: MatDialogRef<ModalEditorialComponent>,
    @Inject(MAT_DIALOG_DATA)
    public informacion: { editorial: editoriales; lista: editoriales[] }
  ) {}

  ngOnInit(): void {
    //Campos formulario
    this.formulario = this.formBuilder.group({
      _id: [this.informacion.editorial._id, Validators.required],
      nombre: [this.informacion.editorial.nombre, Validators.required],
      direccion: [this.informacion.editorial.direccion, Validators.required],
      telefono: [
        this.informacion.editorial.telefono,
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      correoElectronico: [
        this.informacion.editorial.correoElectronico,
        [Validators.required, Validators.email],
      ],
      maximoDeLibros: [
        this.informacion.editorial.maximoDeLibros,
        [Validators.required, Validators.pattern('^[-1-9]*$')],
      ],
    });
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función actualizar
  actualizar() {
    if (this.formulario.invalid) return;
    this.editoriales.actualizarEditorial(this.formulario.value).subscribe(
      (res) => {
        const indice = this.informacion.lista.indexOf(
          this.informacion.editorial
        );
        if (indice !== -1) {
          this.informacion.lista[indice] = res;
          Swal.fire(
            'Datos actualizados',
            'Datos de la editorial actualizados',
            'success'
          );
          this.dialogRef.close();
        } else {
          Swal.fire(
            'Hubo un problema',
            `La editorial no está en el sistema`,
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
