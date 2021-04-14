import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeuscaesPage } from './meuscaes.page';

const routes: Routes = [
  {
    path: '',
    component: MeuscaesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeuscaesPageRoutingModule {}
