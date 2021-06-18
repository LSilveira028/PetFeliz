import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarCaoPage } from './alterar-cao.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarCaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarCaoPageRoutingModule {}
