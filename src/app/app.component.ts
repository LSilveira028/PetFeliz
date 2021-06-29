import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { StorageService } from './services/local-storage/storage.service';
import { Usuario, UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [];

  //public labels = ['Termos de Uso', 'Política de Privacidade'];
  constructor(private storage: StorageService, private usuarioService:  UsuarioService,
             private menuCtrl: MenuController, private alert: AlertController) {

  }

  usuario: Usuario;

  ngOnInit()
  {
    this.usuario = null;
    this.storage.buscarInformacoesUsuario().then(infoUsu => {
      this.usuario = infoUsu

      if (this.usuario.tipoConta == 1) {
        this.appPages = [
          { title: 'Procurar', url: '/procurar', icon: 'location' },
          { title: 'Meus cães', url: '/petsjacadastrados', icon: 'paw' },
          { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
          { title: 'Conta', url: '/conta', icon: 'cog' },
          { title: 'Sair', url: '/sair', icon: 'log-out' },
          { title: 'Termos de Uso', url: '/termosdeuso', icon: 'book' },
          { title: 'Política de Privacidade', url: '/politicadeprivacidade', icon: 'lock-closed' },
        ];
      }
      else
      {
        this.appPages = [
          { title: 'Perfil', url: '/perfil', icon: 'person' },
          { title: 'Solicitações', url: '/solicitacoesdw', icon: 'notifications' },
          { title: 'Avaliações', url: '/avaliacoes', icon: 'star' },
          { title: 'Conta', url: '/conta', icon: 'cog' },
          { title: 'Sair', url: '/sair', icon: 'log-out' },
          { title: 'Termos de Uso', url: '/termosdeuso', icon: 'book' },
          { title: 'Política de Privacidade', url: '/politicadeprivacidade', icon: 'lock-closed' },
        ]
      }
    })

  }


  converterTipoConta(idTipoConta)
  {
    if(idTipoConta == 1)
    {
      return "Proprietário"
    }
    else
      return "Dog Walker"
  }

  atualizarDisponibilidade(idDisponibilidade: number)
  { 
    //busca o token no storage
    this.storage.buscarToken().then(token => {

      //cria um header basedo no token
      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      })

      //atualiza a disponibilidade
      this.usuarioService.atualizarDisponibilidade(idDisponibilidade, header).subscribe(resp => {

        //condição if para alterar o botão que apareçerá 
        if (idDisponibilidade == 0) {
          this.usuario.disponivel = 0;
        }
        else
        {
          this.usuario.disponivel = 1;
        }

        //busca as novas informações do usuário
        this.usuarioService.informacoesUsuario(header).subscribe(infoUsu => {

          //grava no storage
          this.storage.gravarInformacoesUsuario(infoUsu);

        })
      })

    })
  }

  async alertDisponibilidade(status: boolean)
  {

    if (status) {
      const alert = await this.alert.create({
        subHeader: 'Sua status',
        message: 'Ao deixar seu status como disponível, você poderá receber solicitações de serviço.',
        buttons: ['Ok']
      });
  
      await alert.present();
    }
    else
    {
      const alert = await this.alert.create({
        subHeader: 'Seu status',
        message: 'Ao deixar seu status como indisponível, você não receberá solicitações de serviço.',
        buttons: ['Ok']
      });

      await alert.present();
    }

    
  }
  
}
