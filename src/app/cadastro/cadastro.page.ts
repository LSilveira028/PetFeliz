import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService, Usuario } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
escolha = "EscolhaDogWalkerCadastro";
  constructor(private service: ApiService) { }

  ngOnInit() {
  }

  alterarVoceECadastro(evento: any){
    console.log(evento.detail.value)
    this.escolha = evento.detail.value;
  }

  enviar(form: NgForm)
  {
    // console.log(form.value);
    const usuario = form.value;
    this.service.cadastrarUsuario(usuario).subscribe(response => {
      console.log(usuario);
    });
  }
}
