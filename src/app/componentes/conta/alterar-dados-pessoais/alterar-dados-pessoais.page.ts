import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alterar-dados-pessoais',
  templateUrl: './alterar-dados-pessoais.page.html',
  styleUrls: ['./alterar-dados-pessoais.page.scss'],
})
export class AlterarDadosPessoaisPage implements OnInit {

  constructor(private service: UsuarioService,
              private storage: StorageService,
              private modal: ModalController) { }

  @Input() dataNascimento : Date;
  @Input() whatsApp : string;

  usuarioLogado: Usuario = {};

  ngOnInit() {
  }

  alterarDadosPessoais(dataNasc: Date, whatsApp: string)
  {
    
    this.usuarioLogado.DataNascimento = dataNasc;
    this.usuarioLogado.whatsApp = whatsApp;
    //busca o token armazenado
    this.storage.buscarToken().then(token => {
      
      //cria o header com base no token
      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      });

      //chama o endpoint para atualizar as informações do usuário
      this.service.atualizarUsuario(this.usuarioLogado, header).subscribe(infoUsu => {
          //atualiza as informações no local storage
          this.storage.gravarInformacoesUsuario(infoUsu).then(() => {

            var alterado: boolean = true;

            this.modal.dismiss(alterado);

          })



      })

    })

    // this.service.atualizarUsuario

  }

}
