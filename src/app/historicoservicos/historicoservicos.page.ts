import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';
import { ServicoService, UsuariosServico } from '../services/servico.service';

@Component({
  selector: 'app-historicoservicos',
  templateUrl: './historicoservicos.page.html',
  styleUrls: ['./historicoservicos.page.scss'],
})
export class HistoricoservicosPage implements OnInit {

  @Output() tela: string = "historico";
  @Output() teste: string = "aaa"

  constructor(private service: ServicoService, private toast: ToastController,
              private nav: NavController, private storageService: StorageService) { }
  
  servicosGerais: UsuariosServico[];
  servicosFinalizados: UsuariosServico[];

  escolha;

  verificarServico;

  ngOnInit() {

    this.escolha = "escolhaGeral"

    this.storageService.buscarToken().then(tokenStorage => {
      //chama a função que busca os servicos gerais
      this.buscarServicosGerais();

      let header = this.headerRequisicao(tokenStorage);

      this.service.listarServicosFinalizados(header).subscribe(servicoF => {
        this.servicosFinalizados = servicoF;

        console.log(this.servicosFinalizados);
      });
    })   
  }

  //Header que será enviado na requisição
  headerRequisicao(token: any)
  {
    let header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    })

    return header;
  }

  segmentHistorico(evento: any)
  {
    this.escolha = evento.detail.value;
  }

  cancelarServico(indexServico: number)
  {
    this.storageService.buscarToken().then(tokenStorage => {

      let header = this.headerRequisicao(tokenStorage);

      //pega o id do servico que será cancelado
      var idServico = this.servicosGerais[indexServico].servico.id;
      console.log(idServico);

      //chamada o método que cancelará o serviço
      this.service.cancelarServico(idServico, header).subscribe(servicosGe => {
        //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
        this.buscarServicosGerais();
      });

      //exibe um toast de alerta
      this.alertaServicoCancelado();
    })   
  }

  iniciarServico(indexServico: number)
  {
    this.storageService.buscarToken().then(tokenStorage => {

      let header = this.headerRequisicao(tokenStorage);
      
      //grava o serviço selecionado
      var idServico = this.servicosGerais[indexServico].servico.id;

      this.service.iniciarServico(idServico, header).subscribe(servicosGe => {
        //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
        this.buscarServicosGerais();
      })
    })

      
  }

  finalizarServico(indexServico: number)
  {
    this.storageService.buscarToken().then(tokenStorage => {

      let header = this.headerRequisicao(tokenStorage);

      //id so serviço selecionado e que será finalizado
      var idServico = this.servicosGerais[indexServico].servico.id;

      this.service.finalizarServico(idServico, header).subscribe(servicoGe => {
        //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
        this.buscarServicosGerais();
      })
    })     
  }

  async alertaServicoCancelado()
  {
    const toast = await this.toast.create({
      message: 'Serviço cancelado com sucesso.',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }


  //Função chamada ao atualizar a página
  doRefresh(event)
  {
    //Define o tempo de carregamento
    setTimeout(() => {
      event.target.complete();
    }, 2000);

    //busca os serviços gerais
    this.buscarServicosGerais();

  }

  buscarServicosGerais()
  {
    //Faz a busca do token gravado no storage
    this.storageService.buscarToken().then(tokenStorage => {
      let token = tokenStorage;

      let header = this.headerRequisicao(tokenStorage);

      this.service.listarServicosGerais(header).subscribe(servicoG => {
        this.servicosGerais = servicoG;

        console.log(this.servicosGerais);
      });
    })
  }

}
