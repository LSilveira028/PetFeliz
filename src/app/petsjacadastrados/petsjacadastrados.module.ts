import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsjacadastradosPageRoutingModule } from './petsjacadastrados-routing.module';

import { PetsjacadastradosPage } from './petsjacadastrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsjacadastradosPageRoutingModule
  ],
  declarations: [PetsjacadastradosPage]
})
export class PetsjacadastradosPageModule {}
