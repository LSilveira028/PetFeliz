import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliacoesPageRoutingModule } from './avaliacoes-routing.module';

import { AvaliacoesPage } from './avaliacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliacoesPageRoutingModule
  ],
  declarations: [AvaliacoesPage]
})
export class AvaliacoesPageModule {}
