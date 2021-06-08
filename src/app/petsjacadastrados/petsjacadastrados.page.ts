import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cao, CaoService } from '../services/cao.service';
import { StorageService } from '../services/local-storage/storage.service';

@Component({
  selector: 'app-petsjacadastrados',
  templateUrl: './petsjacadastrados.page.html',
  styleUrls: ['./petsjacadastrados.page.scss'],
})
export class PetsjacadastradosPage implements OnInit {

  caes: Cao[];

  constructor(private nav: NavController, private cao: CaoService, private storage: StorageService) { }

  ngOnInit() {

    // this.listarCaes();

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
      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      })
      //chama a requisição para buscar os cães
      this.cao.listarCaesProprietario(header).subscribe(caes => {

        console.log(caes);
        this.caes = caes;

      });

    })
  }

  irParaCadastrarCao()
  {
    this.nav.navigateForward('meuscaes');
  }

}
