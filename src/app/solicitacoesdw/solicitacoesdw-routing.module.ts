import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacoesdwPage } from './solicitacoesdw.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacoesdwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacoesdwPageRoutingModule {}
