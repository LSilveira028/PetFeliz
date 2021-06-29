import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarCursoPageRoutingModule } from './alterar-curso-routing.module';

import { AlterarCursoPage } from './alterar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarCursoPageRoutingModule
  ],
  declarations: [AlterarCursoPage]
})
export class AlterarCursoPageModule {}
