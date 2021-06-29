import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarperfilPage } from './alterarperfil.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarperfilPageRoutingModule {}
