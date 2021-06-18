import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Cao, CaoService } from '../../services/cao.service';
import { StorageService } from '../../services/local-storage/storage.service';
import { AlterarCaoPage } from '../alterar-cao/alterar-cao.page';

@Component({
  selector: 'app-petsjacadastrados',
  templateUrl: './petsjacadastrados.page.html',
  styleUrls: ['./petsjacadastrados.page.scss'],
})
export class PetsjacadastradosPage implements OnInit {

  caes: Cao[];

  constructor(private nav: NavController, private cao: CaoService, private storage: StorageService,
              private modal: ModalController, private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.listarCaes();
  }

  listarCaes()
  {
    //busca o token no storage
    this.storage.buscarToken().then(token => {
      //faz a criação de um header com base no token
      var header = this.criarHeader(token)
      //chama a requisição para buscar os cães
      this.cao.listarCaesProprietario(header).subscribe(caes => {

        this.caes = caes;

      });

    })
  }

  removerCao(idCao: number)
  {

    this.storage.buscarToken().then(token => {

      var header = this.criarHeader(token);

      this.cao.removerCao(idCao, header).subscribe(() =>{

        this.toast("Cão removido!");
        this.listarCaes();

      })

    })

  }

  async abrirAlterarCao(indexCao: number)
  {

    var cao: Cao = this.caes[indexCao]

    const modal = await this.modal.create({
      component: AlterarCaoPage,
      cssClass: 'modal-alterar-cao',
      componentProps: {
        'cao': cao
      }
    });
    
    //ao fechar o modal, ele listará os cães. Mostrará o toast, caso houver uma alteração
    modal.onDidDismiss().then(resp => {

      this.listarCaes();

      if (resp.data == true) {
        this.toast("Cão alterado!");
      }
      
    })

    return await modal.present();
  }

  criarHeader(token)
  {
    var header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token 
    })

    return header;
  }

  irParaCadastrarCao()
  {
    this.nav.navigateForward('meuscaes');
  }

  async toast(mensagem: string)
  {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }


  async alertRemoverCao(indexCao: number)
  {

    var cao: Cao = this.caes[indexCao];

    var alert = await this.alertCtrl.create({
      'header': 'Tem certeza?',
      'message': 'Deseja remover o cão ' + cao.nome + "?",
      cssClass: 'alerta-remover-cao',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          cssClass: 'botao-alert-danger',
          text: 'Sim',
          handler: () => {

            this.removerCao(cao.id)

          }
        }

      ]
    })

    await alert.present();
  }

  //Funções de retorno no HTML
    verificarIdade(idade)
    {
      if (idade > 1) {
        return idade + " anos"
      }
      else
      {
        return idade + "ano";
      }
    }

    converterPorte(porte: number)
    {
      if (porte == 1) {
        return "Pequeno";
      }
      else
      {
        if (porte == 2) {
          return "Médio"
        }
        else
        {
          return "Grande";
        }
      }
    }
}
