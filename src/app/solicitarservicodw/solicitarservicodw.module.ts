import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarservicodwPageRoutingModule } from './solicitarservicodw-routing.module';

import { SolicitarservicodwPage } from './solicitarservicodw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarservicodwPageRoutingModule
  ],
  declarations: [SolicitarservicodwPage]
})
export class SolicitarservicodwPageModule {}
