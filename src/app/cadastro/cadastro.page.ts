import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';
import { UsuarioService, Usuario } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
escolha = 'EscolhaProprietarioCadastro';

tipoConta;
proprietario = 1;
dogWalker = 2;

  tipoUsuario: number

  usuario: Usuario;

  constructor(private service: UsuarioService, private storage: StorageService,
              private nav: NavController) { }

  ngOnInit() {
  }

  alterarVoceECadastro(evento: any){
    console.log(evento.detail.value)
    this.escolha = evento.detail.value;
  }

  cadastrarUsuario(form: NgForm)
  {

    /*Se o Segment escolhido for o de proprietário, então ele vai mandar as informações
      do usuário e o tipo de conta, para o método de cadastrarUsuario do service. O cadastrarUsuario
      do service é quem fará a inserção do usuário do sistema, mas para isso ele precisa das informações 
      do usuario(nome, dtNascimento, whatsapp, ...) e do tipo da conta
    */

    if (this.escolha == 'EscolhaProprietarioCadastro') {
      this.tipoUsuario = 1;
    }
    else
    {
      this.tipoUsuario = 2;
    }

    //declara a data do cadastro
    var data = new Date();

    // console.log(form.value);
    const usuario = form.value;  //inf. usuario //tipo da conta

    this.usuario = form.value;
    this.usuario.dataCadastro = data;

    this.service.cadastrarUsuario(this.usuario,      this.tipoUsuario).subscribe(response => {
        
      //gravará o token da resposta
      this.storage.gravarToken(response);

      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + response
      })

      //buscará as informações deste usuário cadastrado
      this.service.informacoesUsuario(header).subscribe(infoUsu => {

        console.log(infoUsu);

        //gravará essas informações no storage
        this.storage.gravarInformacoesUsuario(infoUsu);

        //diz para o app que o usuário está logado
        this.storage.gravarLogin(true);
          
        //se o usuário cadastrado for um proprietário, então irá para a página de procurar
        if (infoUsu.tipoConta == 1) {
          this.nav.navigateRoot('procurar');
        }
        //se o usuário cadastrado for um dog walker, então irá para a página de solicitações
        else
        {
          this.nav.navigateRoot('solicitacoesdw');
        }

      })
      
    }, 
    (error: HttpErrorResponse) => {
      
    });
  

    
  }
}