import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermosdeusoPage } from './termosdeuso.page';

const routes: Routes = [
  {
    path: '',
    component: TermosdeusoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermosdeusoPageRoutingModule {}
