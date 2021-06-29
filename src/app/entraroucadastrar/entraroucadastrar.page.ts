import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-entraroucadastrar',
  templateUrl: './entraroucadastrar.page.html',
  styleUrls: ['./entraroucadastrar.page.scss'],
})
export class EntraroucadastrarPage implements OnInit, OnDestroy {

  constructor(private storageService: StorageService, private nav: NavController,
              private service: UsuarioService, private menuCtrl: MenuController) { }

  ngOnInit() {

    this.storageService.gravarReload(true);

    // this.storageService.gravarNome("Anderson")
    this.storageService.mostrarNome();

    //Verifica se o usuário está logado
    this.storageService.verificarLogin().then(v => {
      
      //Se estiver logado
      if (v == true) {

        //Busca o token
        this.storageService.buscarToken().then(tokenStorage => {

          const header = new HttpHeaders ({
            'Authorization': 'Bearer '+ tokenStorage
          })

          //Realiza a busca das informações do usuário de forma que se possa
          //verificar se o token ainda está válido.
          this.service.informacoesUsuario(header).subscribe(resp => {

            //Se o login for de um proprietário, entrará na tela de procurar
            if (resp.tipoConta == 1) {
              this.nav.navigateRoot('procurar')
            }
            //caso contrário, se for Dog Walker, entrará na tela de solicitações
            else
              this.nav.navigateRoot('solicitacoesdw')
            
            console.log("Token ainda válido!")

          },(error: HttpErrorResponse) => {
            //Se a requisição for igual a não autorizado:
            if (error.status == 401) {
              console.log("Token inválido")
            }
          });

        })

        this.nav.navigateRoot('procurar')
      }
      else
      {
        this.storageService.apagarInformacoesUsuario().then(() => {
        })
      }
      console.log(v)
    })

  }

  ngOnDestroy()
  {
    // this.menuCtrl.enable(true);
    console.log("Ativado entraoucadastrar")
  }

  // ionViewWillEnter()
  // {
  //   this.menuCtrl.enable(false);
  // }

  //Desabilita o sidemenu
  // ionViewDidEnter() {
  //   this.menuCtrl.enable(false);
  // }
  // ionViewWillLeave()
  // {
  //   this.menuCtrl.enable(true);
  // }

  abrirPaginaEntrar()
  {
    this.nav.navigateForward('login')
  }

  abrirPaginaCadastrar()
  {
    this.nav.navigateForward('cadastro')
  }

}
