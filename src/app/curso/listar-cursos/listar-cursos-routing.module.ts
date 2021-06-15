import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarCursosPage } from './listar-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarCursosPageRoutingModule {}
