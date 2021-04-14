import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private service: UsuarioService) { }

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
    if(this.escolha == 'EscolhaProprietarioCadastro')
    {
      // console.log(form.value);
      const usuario = form.value;  //inf. usuario //tipo da conta
      this.service.cadastrarUsuario(usuario,      this.proprietario).subscribe(response => {
      console.log(usuario);
      });
    }
    else
    {
      const usuario = form.value;  //inf. usuario //tipo da conta
      this.service.cadastrarUsuario(usuario,      this.dogWalker).subscribe(response => {
      console.log(usuario);
      });
    }

    
  }
}