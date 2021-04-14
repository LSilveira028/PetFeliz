import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuscaesPageRoutingModule } from './meuscaes-routing.module';

import { MeuscaesPage } from './meuscaes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuscaesPageRoutingModule
  ],
  declarations: [MeuscaesPage]
})
export class MeuscaesPageModule {}
