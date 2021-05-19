import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/local-storage/storage.service';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit, OnDestroy {

  constructor(private storage: StorageService, private nav: NavController, private menuCtrl: MenuController) { }

  ngOnInit() {  

    //Apagao token
    this.storage.apagarToken().then(resp => {
      //Avia ao aplicativo que o usuário não está logado
      this.storage.gravarLogin(false).then(resp => {
        
          //Vai para a tela principal
          this.nav.navigateRoot('entraroucadastrar');
      })
    })

  }

  ngOnDestroy()
  {
  }

}
