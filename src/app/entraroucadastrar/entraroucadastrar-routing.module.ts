import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntraroucadastrarPage } from './entraroucadastrar.page';

const routes: Routes = [
  {
    path: '',
    component: EntraroucadastrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntraroucadastrarPageRoutingModule {}
