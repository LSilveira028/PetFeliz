import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarCursoPage } from './alterar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarCursoPageRoutingModule {}
