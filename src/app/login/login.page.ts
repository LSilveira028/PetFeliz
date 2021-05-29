import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';
import { Usuario, UsuarioLogin, UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  nome: string = "Anderson";

  //Se o login não for bem sucedido, então o valor abaixo
  // se igualará a 1 e em seguida aparecerá uma mensagem
  //avisando ao usuário que os dados são inválidos
  resultado: number = 0;

  constructor(private service: UsuarioService, private storageService: StorageService,
             private nav: NavController, private menuCtrl: MenuController) { }

  ngOnInit() {

    this.storageService.gravarReload(true);

    this.storageService.gravarLogin(false);

    //Verifica se o usuário está logado
    this.storageService.verificarLogin().then(v => {
      
      if (v == true) {
        this.nav.navigateRoot('procurar')
      }
      console.log(v)
    })
  }
  
  ngOnDestroy()
  {
    console.log("Ativado login")
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave() {
  //   this.menuCtrl.enable(true);
  // }

  // ionViewWillEnter() {
  //   this.menuCtrl.enable(false);
  // }

  logarUsuario(form: NgForm)
  {
    
    const usuario = form.value;

    const loginInfo: Usuario = form.value;
    console.log(loginInfo);

    //Chama o método para logar o usuário
    this.service.logarUsuario(loginInfo).subscribe(resp => {
      
      //Se o login for bem sucedido, o app grava o token de sessão.
      this.storageService.gravarToken(resp.body)

      //Cria um header com o token da sessão
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + resp.body
      })

      //Busca as informações do usuário logado
      this.service.informacoesUsuario(header).subscribe(infoUsu => {
  
        //Faz a gravação das informações do usuário
        this.storageService.gravarInformacoesUsuario(infoUsu);
        
        //Diz ao app que o usuário está logado
        this.storageService.gravarLogin(true);

        //Busca novamente as informações do usuário
        this.storageService.buscarInformacoesUsuario().then(infoUSu => {

          //Se o usuário for proprietário, então irá automaticamente
          //para a tela de Procurar Dog Walkers
          if (infoUsu.tipoConta == 1) {
            this.nav.navigateRoot('procurar')
          }
          else
          //Se for um Dog Walker, irá para a tela de solicitações
          {
            this.nav.navigateRoot('solicitacoesdw')
          }
        })
      })


    },
    //se der erro ao enviar a requisição
    (error: HttpErrorResponse) => {

      if (error.status == 400) {
        this.resultado = 1;
      }
    });
  }

}
