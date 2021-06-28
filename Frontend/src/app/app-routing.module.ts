import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './componentes/libros/libros.component';
import { AutoresComponent } from './componentes/autores/autores.component';
import { EditorialesComponent } from './componentes/editoriales/editoriales.component';
const routes: Routes = [
  {path:'',component:LibrosComponent,pathMatch:'full'},
  {path:'libros',component:LibrosComponent},
  {path:'autores',component:AutoresComponent},
  {path:'editoriales',component:EditorialesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
