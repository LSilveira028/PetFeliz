import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacoesdwPageRoutingModule } from './solicitacoesdw-routing.module';

import { SolicitacoesdwPage } from './solicitacoesdw.page';
import { TabsComponent } from '../componentes/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacoesdwPageRoutingModule
  ],
  declarations: [SolicitacoesdwPage, TabsComponent]
})
export class SolicitacoesdwPageModule {}
