import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoservicosPage } from './historicoservicos.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoservicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoservicosPageRoutingModule {}
