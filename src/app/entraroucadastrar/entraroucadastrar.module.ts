import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntraroucadastrarPageRoutingModule } from './entraroucadastrar-routing.module';

import { EntraroucadastrarPage } from './entraroucadastrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntraroucadastrarPageRoutingModule
  ],
  declarations: [EntraroucadastrarPage]
})
export class EntraroucadastrarPageModule {}
