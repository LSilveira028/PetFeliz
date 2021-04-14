import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermosdeusoPageRoutingModule } from './termosdeuso-routing.module';

import { TermosdeusoPage } from './termosdeuso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermosdeusoPageRoutingModule
  ],
  declarations: [TermosdeusoPage]
})
export class TermosdeusoPageModule {}
