import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfildwproprietarioPageRoutingModule } from './perfildwproprietario-routing.module';

import { PerfildwproprietarioPage } from './perfildwproprietario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfildwproprietarioPageRoutingModule
  ],
  declarations: [PerfildwproprietarioPage]
})
export class PerfildwproprietarioPageModule {}
