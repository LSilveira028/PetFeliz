import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoservicosPageRoutingModule } from './historicoservicos-routing.module';

import { HistoricoservicosPage } from './historicoservicos.page';
import { TabsComponent } from '../componentes/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoservicosPageRoutingModule
  ],
  declarations: [HistoricoservicosPage, TabsComponent]
})
export class HistoricoservicosPageModule {}
