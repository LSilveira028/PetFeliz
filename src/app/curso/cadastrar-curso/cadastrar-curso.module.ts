import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarCursoPageRoutingModule } from './cadastrar-curso-routing.module';

import { CadastrarCursoPage } from './cadastrar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarCursoPageRoutingModule
  ],
  declarations: [CadastrarCursoPage]
})
export class CadastrarCursoPageModule {}
