import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliarServicoPage } from './avaliar-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliarServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliarServicoPageRoutingModule {}
