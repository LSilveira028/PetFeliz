import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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
              private alert: AlertController,
              private toast: ToastController) { }

  usuarioLogado: Usuario[] = [];

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.buscarUsuarioLogado();
  }

  buscarUsuarioLogado()
  {
    this.storage.buscarInformacoesUsuario().then(infoUsu => {

      console.log(infoUsu)

      this.usuarioLogado[0] = infoUsu;

      // this.usuarioLogado.push(infoUsu);
    })
  }

  

  async alterarDadosPessoais(dataNascimento: any)
  {

    var modal = await this.modal.create({
      component: AlterarDadosPessoaisPage,
      cssClass: "modal-alterar-dados-pessoais",
      componentProps: {
        dataNascimento: dataNascimento,
        whatsApp: this.usuarioLogado[0].whatsApp
      }
    })

    modal.onDidDismiss().then(resp => {

      if (resp.data == true) {
        //mostra a mensagem em um toast
        this.toastUsuarioAtualizado();
        //atualiza as informações do usuário na página
        this.buscarUsuarioLogado();
      }

    })

    return await modal.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alert.create({
      header: 'Alterar senha',
      inputs: [
        {
          name: 'senhaAtual',
          type: 'password',
          placeholder: 'Senha atual'
        },  
        {
          name: 'senhaNova',
          type: 'password',
          id: 'name2-id',
          placeholder: 'Senha nova'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (alertInputs) => {

            console.log(alertInputs.senhaAtual);

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async toastUsuarioAtualizado()
  {
    var toast = await this.toast.create({
      message: "Usuário atualizado com sucesso!",
      duration: 2000
    })

    return await toast.present();
  }

}
