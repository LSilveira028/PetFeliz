import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public toastSalvarCtrl: ToastController) { }

  ngOnInit() {
  }

  async metodoToastSalvar() {
    const toast = await this.toastSalvarCtrl.create({
      message: 'Salvo!',
      duration: 2000,
    });
    toast.present();
  }

}
