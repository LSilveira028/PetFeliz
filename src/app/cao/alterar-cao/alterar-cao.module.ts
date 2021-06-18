import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarCaoPageRoutingModule } from './alterar-cao-routing.module';

import { AlterarCaoPage } from './alterar-cao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarCaoPageRoutingModule
  ],
  declarations: [AlterarCaoPage]
})
export class AlterarCaoPageModule {}
