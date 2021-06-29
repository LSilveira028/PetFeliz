import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarperfilPageRoutingModule } from './alterarperfil-routing.module';

import { AlterarperfilPage } from './alterarperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarperfilPageRoutingModule
  ],
  declarations: [AlterarperfilPage]
})
export class AlterarperfilPageModule {}
