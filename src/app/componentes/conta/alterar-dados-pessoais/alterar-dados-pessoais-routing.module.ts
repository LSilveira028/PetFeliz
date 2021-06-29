import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarDadosPessoaisPage } from './alterar-dados-pessoais.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarDadosPessoaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarDadosPessoaisPageRoutingModule {}
