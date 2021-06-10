import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from '../services/local-storage/storage.service';
import { ServicoDogWalker, ServicoDogwalkerService } from '../services/servico-dogwalker/servico-dogwalker.service';
import { Usuario, UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-alterarperfil',
  templateUrl: './alterarperfil.page.html',
  styleUrls: ['./alterarperfil.page.scss'],
})
export class AlterarperfilPage implements OnInit {

  dogWalker: Usuario = {}

  //informações dog walker
  nome: string;
  sobre: string;
  valorServico: number;
  fotoPerfil;
  aceitaCar: boolean;
  preferencias: string;

  opcoesCartao: any = [
    'Sim', 'Não'
  ]

  aceitaCartao: boolean;

  constructor(private storage: StorageService, private servicoDogWalker: ServicoDogwalkerService,
              private usuario: UsuarioService) { }


  ngOnInit() {

    this.storage.buscarInformacoesUsuario().then(infoUsu => {

      this.nome = infoUsu.nome;

      if (infoUsu.servicoDogWalker != null) {

        console.log(infoUsu)

        this.sobre = infoUsu.servicoDogWalker.sobre;
        this.valorServico = infoUsu.servicoDogWalker.valorServico;
        this.aceitaCar = infoUsu.servicoDogWalker.aceitaCartao;
        this.preferencias = infoUsu.servicoDogWalker.preferencias;
        this.fotoPerfil = infoUsu.fotoPerfil;

        if (this.aceitaCar == true) {
          this.aceitaCartao = true;
        }
        else
          this.aceitaCartao = false;

      }
    });

  }

  pegarResultadoCartao($event)
  {
    this.aceitaCartao = $event.detail.value
  }

  salvar(form: NgForm)
  {
    var servicoDogWalker: ServicoDogWalker = form.value;

    //busca o dog walker logado
    this.storage.buscarInformacoesUsuario().then(infoUsu => {
      //busca o token
      this.storage.buscarToken().then(token => {
        //cria um header com o token
        var header = new HttpHeaders ({
          'Authorization': 'Bearer ' + token
        })

        //se o dog walker não tiver informações sobre seu serviço, então fará uma adiação.
        if(infoUsu.servicoDogWalker == null)
        {
          this.servicoDogWalker.inserirServicoDogWalker(servicoDogWalker, header).subscribe(resp => {
            //Busca as informações do usuário atualizadas
            this.usuario.informacoesUsuario(header).subscribe(infoUsu => {
              //grava as novas informações do usuário no storage
              this.storage.gravarInformacoesUsuario(infoUsu).then(() => {
                //atualiza a página
                location.reload();
              })
            })
          })
        }
        //caso contrário, irá apenas atualizar.
        else
        {
          //Atualiza as informações no BD
          this.servicoDogWalker.atualizarServicoDogWalker(servicoDogWalker ,header).subscribe(resp => {
            //Busca as informações do usuário atualizadas
            this.usuario.informacoesUsuario(header).subscribe(infoUsu => {
              //grava as novas informações do usuário no storage
              this.storage.gravarInformacoesUsuario(infoUsu).then(() => {
                //atualiza a página
                location.reload();
              })

            })
          });
        }

      })

      

    })

    console.log(servicoDogWalker);
  }

}
