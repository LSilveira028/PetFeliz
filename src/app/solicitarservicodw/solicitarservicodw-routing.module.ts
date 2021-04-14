import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarservicodwPage } from './solicitarservicodw.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarservicodwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarservicodwPageRoutingModule {}
