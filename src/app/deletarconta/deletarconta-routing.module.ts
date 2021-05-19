import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletarcontaPage } from './deletarconta.page';

const routes: Routes = [
  {
    path: '',
    component: DeletarcontaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletarcontaPageRoutingModule {}
