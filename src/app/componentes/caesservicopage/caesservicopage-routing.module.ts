import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaesservicopagePage } from './caesservicopage.page';

const routes: Routes = [
  {
    path: '',
    component: CaesservicopagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaesservicopagePageRoutingModule {}
