import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public dogW: Usuario[] = [];

  constructor(public toastSalvarCtrl: ToastController, private storage: StorageService,
              private usuarioService: UsuarioService, private nav: NavController,
              private modal: ModalController) { }

  idUsuarioLogado: number;
  @Input() dogWalker: Usuario;


  //informacoes Dog Walker
  nome: string;
  dataCadastro: string;
  sobre: string;
  valorServico: number;
  aceitaCartao: string;
  preferencias: string;

  pessoas: any[] = [{
    'nome': 'Fi de gato',
    'idade': '80'
  },
  {
    'nome': 'Fi de papamé',
    'idade': '81'
  }
  ]

  pessoa: any = {'nome':'Anderson Tester', 'idade': '17'}

  ngOnInit() {
    
    //Busca as informações do usuário logado
    this.storage.buscarInformacoesUsuario().then(infoUsu => {
      this.dogW[0] = infoUsu;

      console.log(infoUsu)
      console.log(this.dogW);

      //Se o usuário logado for um proprietário
      if (infoUsu.tipoConta == 1) {
        this.idUsuarioLogado = 1;

        //então a página receberá as informações do input
        this.dogW[0] = this.dogWalker;
        console.log(this.dogW);
        
      }
      if (infoUsu.tipoConta == 2) {
        this.idUsuarioLogado = 2;
      }

    })

  }

  fecharModalPerfil()
  {
    this.modal.dismiss();
  }

  // async metodoToastSalvar() {
  //   const toast = await this.toastSalvarCtrl.create({
  //     message: 'Salvo!',
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

}
