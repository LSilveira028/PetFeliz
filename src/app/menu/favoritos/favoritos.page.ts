import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario } from 'src/app/services/usuario.service';
import { SolicitarservicodwPage } from 'src/app/solicitarservicodw/solicitarservicodw.page';
import { PerfilPage } from '../perfil/perfil.page';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: Usuario[];

  aviso: boolean = false;

  constructor(private storage: StorageService, private modal: ModalController) { }

  ngOnInit() {

    this.storage.buscarFavoritos().then(favoritos => {

      this.favoritos = favoritos;

      if (this.favoritos.length == 0) {
        this.aviso = true
      }
      else
      {
        this.aviso = false
      }

      console.log(this.favoritos);

    })

  }

  removerFavorito(index: number)
  {
    let usuario: Usuario = this.favoritos[index];

    let indexDWFav = this.favoritos.findIndex((e) => e.id == usuario.id);

    this.favoritos.splice(indexDWFav, 1);

    if (this.favoritos.length == 0) {
      this.aviso = true
    }

    this.storage.adicionarFavorito(this.favoritos)
  }

  async modalSolicitar(dogWalker: Usuario)
  {
    const modal = await this.modal.create({
      component: SolicitarservicodwPage,
      componentProps: {
        dogWalker: dogWalker,
      },
      swipeToClose: true,
    });

    return await modal.present()
  }

  irParaSolicitar(indexServico: number)
  {
    let dogwalker: Usuario = this.favoritos[indexServico];
    console.log(dogwalker)
    this.modalSolicitar(dogwalker);
  }

  async modalPerfilDogWalker(i: number)
  {
    var dogWalker = this.favoritos[i];

    const modalPerfilDogWalker = await this.modal.create({
      component: PerfilPage,
      componentProps: {
        dogWalker: dogWalker
      }
    });

    return await modalPerfilDogWalker.present();
  }


}
