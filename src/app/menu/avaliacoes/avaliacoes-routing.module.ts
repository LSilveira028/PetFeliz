import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacoesPage } from './avaliacoes.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacoesPageRoutingModule {}
