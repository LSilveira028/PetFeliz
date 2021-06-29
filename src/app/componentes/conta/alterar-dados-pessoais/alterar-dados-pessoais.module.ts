import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarDadosPessoaisPageRoutingModule } from './alterar-dados-pessoais-routing.module';

import { AlterarDadosPessoaisPage } from './alterar-dados-pessoais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarDadosPessoaisPageRoutingModule
  ],
  declarations: [AlterarDadosPessoaisPage]
})
export class AlterarDadosPessoaisPageModule {}
