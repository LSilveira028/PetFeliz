import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletarcontaPageRoutingModule } from './deletarconta-routing.module';

import { DeletarcontaPage } from './deletarconta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletarcontaPageRoutingModule
  ],
  declarations: [DeletarcontaPage]
})
export class DeletarcontaPageModule {}
