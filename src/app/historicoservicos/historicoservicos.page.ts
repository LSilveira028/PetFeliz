import { Component, OnInit, Output } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
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
              private nav: NavController) { }
  
  servicosGerais: UsuariosServico[];
  servicosFinalizados: UsuariosServico[];

  escolha;

  verificarServico;

  ngOnInit() {

    this.escolha = "escolhaGeral"

    //chama a função que busca os servicos gerais
    this.buscarServicosGerais();

    this.service.listarServicosFinalizados().subscribe(servicoF => {
      this.servicosFinalizados = servicoF;

      console.log(this.servicosFinalizados);
    });
    
  }


  segmentHistorico(evento: any)
  {
    this.escolha = evento.detail.value;
  }

  cancelarServico(indexServico: number)
  {

    //pega o id do servico que será cancelado
    var idServico = this.servicosGerais[indexServico].servico.id;
    console.log(idServico);

    //chamada o método que cancelará o serviço
    this.service.cancelarServico(idServico).subscribe(servicosGe => {
      //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
      this.buscarServicosGerais();
    });

    //exibe um toast de alerta
    this.alertaServicoCancelado();
  }

  iniciarServico(indexServico: number)
  {
    var idServico = this.servicosGerais[indexServico].servico.id;

    this.service.iniciarServico(idServico).subscribe(servicosGe => {
      //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
      this.buscarServicosGerais();
    })
  }

  finalizarServico(indexServico: number)
  {
    var idServico = this.servicosGerais[indexServico].servico.id;

    this.service.finalizarServico(idServico).subscribe(servicoGe => {
      //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
      this.buscarServicosGerais();
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
    this.service.listarServicosGerais().subscribe(servicoG => {
      this.servicosGerais = servicoG;

      console.log(this.servicosGerais);
    });
  }

}
