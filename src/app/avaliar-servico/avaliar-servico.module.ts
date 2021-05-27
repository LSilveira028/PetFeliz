import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarServicoPageRoutingModule } from './avaliar-servico-routing.module';

import { AvaliarServicoPage } from './avaliar-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarServicoPageRoutingModule
  ],
  declarations: [AvaliarServicoPage]
})
export class AvaliarServicoPageModule {}
