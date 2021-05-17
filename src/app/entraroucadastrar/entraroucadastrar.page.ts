import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';

@Component({
  selector: 'app-entraroucadastrar',
  templateUrl: './entraroucadastrar.page.html',
  styleUrls: ['./entraroucadastrar.page.scss'],
})
export class EntraroucadastrarPage implements OnInit {

  constructor(private storageService: StorageService, private nav: NavController) { }

  ngOnInit() {
    // this.storageService.gravarNome("Anderson")
    this.storageService.mostrarNome();
  }

  abrirPaginaEntrar()
  {
    this.nav.navigateForward('login')
  }

  abrirPaginaCadastrar()
  {
    this.nav.navigateForward('cadastro')
  }

}
