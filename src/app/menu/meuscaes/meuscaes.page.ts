import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import {NgForm } from '@angular/forms';
import { Cao, CaoService } from 'src/app/services/cao.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-meuscaes',
  templateUrl: './meuscaes.page.html',
  styleUrls: ['./meuscaes.page.scss'],
})
export class MeuscaesPage implements OnInit {

  cao: Cao;

  constructor(public toastCtrl: ToastController,
    public ffcsca: ActionSheetController,
    public nav: NavController, private storage: StorageService, private caoService: CaoService
    ) { }

  ngOnInit() {
  }

  abrirPagina(){
    this.nav.navigateForward('petsjacadastrados');
   }
  
  cadastarCao(form: NgForm)
  {
    this.cao = form.value;

    console.log(this.cao);

    this.storage.buscarToken().then(token => {

      var header = new HttpHeaders ({
        'Authorization': 'Bearer '+ token
      });

      this.caoService.cadastrarCao(this.cao, header).subscribe(resp => {
        
        this.toastCaoCadastrado();

      });

    })

  }

  async toastCaoCadastrado() {
    const toast = await this.toastCtrl.create({
      message: 'Cão cadastrado!',
      duration: 2000,
    });

    this.abrirPagina();

    toast.present();    
  }
 
  criarHeader(token)
  {
    var header = new HttpHeaders ({
      'Authorization': 'Bearer '+ token
    });
    return header;
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
