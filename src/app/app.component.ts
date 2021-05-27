import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/local-storage/storage.service';
import { Usuario, UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    // { title: 'Perfil', url: '/perfildwproprietario', icon: 'person' },
    // { title: 'Procurar', url: '/procurar', icon: 'location' },
    // { title: 'Meus cães', url: '/meuscaes', icon: 'paw' },
    // { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
    // { title: 'Avaliações', url: '/avaliacoes', icon: 'star' },
    // { title: 'Conta', url: '/conta', icon: 'cog' },
    // { title: 'Sair', url: '/sair', icon: 'log-out' },
    // { title: 'Termos de Uso', url: '/termosdeuso', icon: 'book' },
    // { title: 'Política de Privacidade', url: '/politicadeprivacidade', icon: 'lock-closed' },
  ];

  //public labels = ['Termos de Uso', 'Política de Privacidade'];
  constructor(private storage: StorageService, private service: UsuarioService,
             private menuCtrl: MenuController) {

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
          { title: 'Meus cães', url: '/meuscaes', icon: 'paw' },
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


    

  
}
