import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-meuscaes',
  templateUrl: './meuscaes.page.html',
  styleUrls: ['./meuscaes.page.scss'],
})
export class MeuscaesPage implements OnInit {

  constructor(public toastCtrl: ToastController,
    public ffcsca: ActionSheetController,
    public nav: NavController,
    ) { }

  ngOnInit() {
  }

  abrirPagina(){
    this.nav.navigateForward('petsjacadastrados');
    
   }
  
  async metodoToast() {
    const toast = await this.toastCtrl.create({
      message: 'Você cadastrou seu Pet!',
      duration: 2000,
    });
    toast.present();
  }
 

  /*async funcoesFabCadastreSeusCaesAqui() {
    const actionSheet = await this.ffcsca.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Ver Pets já cadastrados',
        role: 'destructive',
        icon: 'list',
        handler: () => {
          console.log('Clicou em "Ver Pets já cadastrados" ');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Clicou em "Cancelar"');
        }
      }]
    });
    await actionSheet.present();
  }*/


}
