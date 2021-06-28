import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { autores } from 'src/app/modelos/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from 'src/app/servicios/autores/autores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-autor',
  templateUrl: './modal-autor.component.html',
  styleUrls: ['./modal-autor.component.css'],
})
export class ModalAutorComponent implements OnInit {
  //Formulario
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private autores: AutoresService,
    public dialogRef: MatDialogRef<ModalAutorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public informacion: { autor: autores; lista: autores[] }
  ) {}

  ngOnInit(): void {
    //Campos del formulario
    this.formulario = this.formBuilder.group({
      _id: [this.informacion.autor._id, Validators.required],
      nombreCompleto: [
        this.informacion.autor.nombreCompleto,
        Validators.required,
      ],
      fechaDeNacimiento: [
        this.informacion.autor.fechaDeNacimiento,
        Validators.required,
      ],
      ciudadDeProcedencia: [
        this.informacion.autor.ciudadDeProcedencia,
        Validators.required,
      ],
      correoElectronico: [
        this.informacion.autor.correoElectronico,
        [Validators.required, Validators.email],
      ],
    });
  }
  //Metodo para acceder a los campos
  get f() {
    return this.formulario.controls;
  }
  //Función para actualizar autores
  actualizar() {
    if (this.formulario.invalid) return;
    this.autores.actualizarAutores(this.formulario.value).subscribe((res) => {
      const indice = this.informacion.lista.indexOf(this.informacion.autor);
      this.informacion.lista[indice] = res;
      Swal.fire(
        'Datos actualizados',
        'Datos del autor actualizados',
        'success'
      );
      this.dialogRef.close();
    });
  }
}
