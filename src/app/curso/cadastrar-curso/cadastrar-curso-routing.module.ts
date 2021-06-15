import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarCursoPage } from './cadastrar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarCursoPageRoutingModule {}
