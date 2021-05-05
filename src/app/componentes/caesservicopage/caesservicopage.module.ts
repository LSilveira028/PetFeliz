import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaesservicopagePageRoutingModule } from './caesservicopage-routing.module';

import { CaesservicopagePage } from './caesservicopage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaesservicopagePageRoutingModule
  ],
  declarations: [CaesservicopagePage]
})
export class CaesservicopagePageModule {}
