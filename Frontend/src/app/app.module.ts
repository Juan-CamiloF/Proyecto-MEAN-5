import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Componentes
import { LibrosComponent } from './componentes/libros/libros.component';
import { AutoresComponent } from './componentes/autores/autores.component';
import { EditorialesComponent } from './componentes/editoriales/editoriales.component';
import { MenuComponent } from './menu/menu.component';
//Formulario y Material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//Buscador
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//Http
import { HttpClientModule } from '@angular/common/http';
//Modales
import { ModalAutorComponent } from './componentes/modales/modal-autor/modal-autor.component';
import { ModalEditorialComponent } from './componentes/modales/modal-editorial/modal-editorial.component';
import { ModalLibroComponent } from './componentes/modales/modal-libro/modal-libro.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    AutoresComponent,
    EditorialesComponent,
    MenuComponent,
    ModalAutorComponent,
    ModalEditorialComponent,
    ModalLibroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    HttpClientModule,
  ],
  entryComponents: [ModalAutorComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
