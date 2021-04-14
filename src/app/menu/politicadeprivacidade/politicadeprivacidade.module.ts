import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticadeprivacidadePageRoutingModule } from './politicadeprivacidade-routing.module';

import { PoliticadeprivacidadePage } from './politicadeprivacidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticadeprivacidadePageRoutingModule
  ],
  declarations: [PoliticadeprivacidadePage]
})
export class PoliticadeprivacidadePageModule {}
