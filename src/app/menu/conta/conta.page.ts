import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AlterarDadosPessoaisPage } from 'src/app/componentes/conta/alterar-dados-pessoais/alterar-dados-pessoais.page';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

  constructor(private storage: StorageService,
              private modal: ModalController,
              private alert: AlertController,
              private toast: ToastController,
              private loading: LoadingController,
              private usuarioService: UsuarioService,
              ) { }

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

  alterarSenha(senhaAtual, senhaNova)
  {

    this.storage.buscarToken().then(token => {

      const header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      });

      this.usuarioService.alterarSenha(senhaAtual, senhaNova, header).subscribe( resp => {

        //fecha o loading de carregamento
        this.loading.dismiss().then(() => {
          //Emite o alerta de que a senha foi alterada
          this.alertMudancaSenha("Senha alterada.", "Sua senha foi alterada com sucesso!")
        })


        console.log("Senha alterada!");

      }, (error: HttpErrorResponse) => {
         
        //possiveis resultados de erro:
          //caso a senha atual seja igual a nova
          var senhaIgual = "Sua nova senha não pode ser igual a antiga.";
          //caso a senha seja incorreta
          var senhaIncorreta = "Senha incorreta."

        //Se o retorno for o 400, então quer dizer que a senha está incorreta.
        if (error.status == 400) {
          
          if (error.error == senhaIncorreta) {
             //fecha o loading de carregamento
            this.loading.dismiss().then( () => {
              //exibirá uma mensagem informando que a senha atual está incorreta.
              this.alertMudancaSenha("Senha incorreta","Senha atual incorreta.");
            })
          }
          
          if (error.error == senhaIgual) {
            //fecha o loading de carregamento
            this.loading.dismiss().then( () => {
              //exibirá uma mensagem informando que a senha atual está incorreta.
              this.alertMudancaSenha("Ops!","Sua senha atual não pode ser igual a antiga.");
            })
          }

       

          

        }
        console.log("Senha incorreta!")

      })

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

  async componenteAlterarSenha() {
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
          placeholder: 'Nova senha'
        },
        {
          name: 'confirmarSenhaNova',
          type: 'password',
          placeholder: 'Confirme sua nova senha'
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

            //Se a nova senha, digitada duas vezes, estiverem diferentes, aparecerá um aviso.
            if (alertInputs.senhaNova != alertInputs.confirmarSenhaNova) 
            {
                //chamará o alerta com a mensagem abaixo
                this.alertMudancaSenha("Senha incorreta",
                                        "Sua nova senha não corresponde à confirmada.") 
            }
            else
            {
              this.loadingAlterarSenha();

              this.alterarSenha(alertInputs.senhaAtual, alertInputs.senhaNova);
            }
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

  async alertMudancaSenha(subHeader: string, mensagem: string)
  {
    const alert = await this.alert.create({
      subHeader: subHeader,
      message: mensagem,
      cssClass: "alert-alterar-senha",
      buttons: ['Ok']
    })

    return await alert.present();
  }

  async loadingAlterarSenha()
  {
    const loading = await this.loading.create({
      message: "Alterando..."
    })

    await loading.present();
  }

}
