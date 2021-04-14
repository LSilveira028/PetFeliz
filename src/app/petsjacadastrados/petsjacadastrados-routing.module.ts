import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsjacadastradosPage } from './petsjacadastrados.page';

const routes: Routes = [
  {
    path: '',
    component: PetsjacadastradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsjacadastradosPageRoutingModule {}
