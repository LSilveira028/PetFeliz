import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfildwproprietario',
  templateUrl: './perfildwproprietario.page.html',
  styleUrls: ['./perfildwproprietario.page.scss'],
})
export class PerfildwproprietarioPage implements OnInit {

  constructor(private nav: NavController, private modal: ModalController) { }

  ngOnInit() {
  }

  abrirAlterarPerfil()
  {
    this.nav.navigateForward('alterarperfil');
  }

}
