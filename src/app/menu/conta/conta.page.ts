import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlterarDadosPessoaisPage } from 'src/app/componentes/conta/alterar-dados-pessoais/alterar-dados-pessoais.page';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

  constructor(private storage: StorageService,
              private modal: ModalController,
              private alert: AlertController) { }

  usuarioLogado: Usuario[] = [];

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storage.buscarInformacoesUsuario().then(infoUsu => {

      console.log(infoUsu)

      // this.usuarioLogado[0] = infoUsu;

      this.usuarioLogado.push(infoUsu);
    })
  }

  async alterarDadosPessoais(dataNascimento: any)
  {

    // console.log(this.usuarioLogado[0].DataNascimento)
    // console.log(this.usuarioLogado[0].whatsApp)


    var modal = await this.modal.create({
      component: AlterarDadosPessoaisPage,
      cssClass: "modal-alterar-dados-pessoais",
      componentProps: {
        dataNascimento: dataNascimento,
        whatsApp: this.usuarioLogado[0].whatsApp
      }
    })

    return await modal.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alterar senha',
      inputs: [
        {
          name: 'senhaAtual',
          type: 'text',
          placeholder: 'Senha atual'
        },  
        {
          name: 'senhaNova',
          type: 'text',
          // id: 'name2-id',
          placeholder: 'Senha nova'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
