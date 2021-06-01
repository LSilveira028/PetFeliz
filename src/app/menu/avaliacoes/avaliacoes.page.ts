import { HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvaliacaoService, UsuarioAvaliacao } from 'src/app/services/avaliacao/avaliacao.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.page.html',
  styleUrls: ['./avaliacoes.page.scss'],
})
export class AvaliacoesPage implements OnInit {

  idUsuarioLogado: number;
  @Input() dogWalker: Usuario;

  dogW: Usuario[] = [];

  avaliacoes: UsuarioAvaliacao[]

  //aviso que aparecerá, caso não houver solicitações a ver
  avisoProprietario: boolean = false;
  //aviso que aparecerá, caso não houver solicitações a ver
  avisoDogWalker: boolean = false;

  constructor(private storage: StorageService, private modal: ModalController,
              private avaliacao: AvaliacaoService) { }

  ngOnInit() {

    //Busca as informações do usuário logado
    this.storage.buscarInformacoesUsuario().then(infoUsu => {
      console.log(infoUsu);
      //busca o token
      this.storage.buscarToken().then(token => {

        console.log(token)

        if (infoUsu.tipoConta == 1)
          var idDogWalker: number = this.dogWalker.id;
        else
          idDogWalker = infoUsu.id;

        var header = this.criarHeader(token);

        this.avaliacao.verificarAvaliacao(idDogWalker, header).subscribe(resp => {
          console.log(resp)
          //Se não houver avaliações, então mostratá o aviso de acorod com o usuário logado
          if (resp) {
            //Se for um proprietário logado, então mostratá um aviso especifico ao proprietario
            if (infoUsu.tipoConta == 1) {
              this.avisoProprietario = true;
            }
            //Se for um dog walker logado, então mostratá um aviso especifico ao dog walker
            if (infoUsu.tipoConta == 2) {
              this.avisoDogWalker = true;
            }
          }
          else
          {

            this.avaliacao.listarAvaliacoesDogWalker(idDogWalker, header).subscribe(aval => {

              this.avaliacoes = aval;
              console.log(this.avaliacoes);

            })

          }
        })

      })


      //Se o usuário logado for um proprietário
      if (infoUsu.tipoConta == 1) {
        this.idUsuarioLogado = 1;


      }
      if (infoUsu.tipoConta == 2) {
        this.idUsuarioLogado = 2;


      }

      


    })

  }


  fecharModalAvaliacoes()
  {
    this.modal.dismiss();
  }

  criarHeader(token)
  {
    var header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    })

    return header;
  }

}
