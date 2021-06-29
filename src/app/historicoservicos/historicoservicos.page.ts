import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { StorageService } from '../services/local-storage/storage.service';
import { CaesServico, ServicoService, UsuariosServico } from '../services/servico.service';
import { Usuario } from '../services/usuario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CaesservicopagePage } from '../componentes/caesservicopage/caesservicopage.page';
import { AvaliarServicoPage } from '../avaliar-servico/avaliar-servico.page';
import { AvaliacaoService } from '../services/avaliacao/avaliacao.service';

@Component({
  selector: 'app-historicoservicos',
  templateUrl: './historicoservicos.page.html',
  styleUrls: ['./historicoservicos.page.scss'],
})
export class HistoricoservicosPage implements OnInit {

  @Output() tela: string = "historico";
  @Output() UsuarioL: string;

  constructor(private service: ServicoService, private toast: ToastController,
              private nav: NavController, private storageService: StorageService,
              private geolocation: Geolocation, private modalController: ModalController,
              private avaliacao: AvaliacaoService) { }
  
  servicosGerais: UsuariosServico[];
  servicosFinalizados: UsuariosServico[];
  usuario: Usuario;

  caesServico: CaesServico[];
  nomeProprietario: string;

  escolha;

  verificarServico;

  ngOnInit() {


    this.storageService.buscarInformacoesUsuario().then(usuInfo => {
      if (usuInfo.tipoConta == 2) {
        this.UsuarioL = "dogWalker"
      }
      else
        this.UsuarioL = "proprietario"
    })

    this.escolha = "escolhaGeral"

    this.storageService.gravarLogin(false)

    this.storageService.buscarToken().then(tokenStorage => {
      console.log("TOKEN");
      console.log(tokenStorage);
      //chama a função que busca os servicos gerais
      this.buscarServicosGerais();

      let header = this.headerRequisicao(tokenStorage);

      this.buscarServicosFinalizados();
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

      let dogW = this.servicosGerais[indexServico].servico.usuarios[0].usuario;

      let nomeDogW = this.servicosGerais[indexServico].servico.usuarios[0].usuario.nome;
      let idDogW = this.servicosGerais[indexServico].servico.usuarios[0].usuario.id;

      
      this.service.finalizarServico(idServico, header).subscribe(servicoGe => {
        
        //verifica se o dog walker pode ser avaliado, ou seja, se o proprietário nunca
        //o avaliou
        this.avaliacao.verificarAvaliacao(idDogW, header).subscribe(resp => {
          
          //Se o proprietário nunca o avaliou, então abriráo modal para fazer a avaliação
          if (resp == true) {
            //ao finalizar o serviço, aparecerá o modal para avaliar o serviços
            this.modalAvaliarServico(nomeDogW, idDogW);
          }

        })


        
        //logo que fizer a requisição, atualizará a página trazendo a lista atualizada
        this.buscarServicosGerais();
      })

      this.buscarServicosFinalizados();
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
    //busca os serviços finalizados
    this.buscarServicosFinalizados();
  }

  buscarServicosFinalizados()
  {
    this.storageService.buscarToken().then(token => {
      
      var header = this.headerRequisicao(token);

      this.service.listarServicosFinalizados(header).subscribe(servF => {
        this.servicosFinalizados = servF;
      })
    })
  }

  buscarServicosGerais()
  {
    //Faz a busca do token gravado no storage
    this.storageService.buscarToken().then(tokenStorage => {
      let token = tokenStorage;

      //Busca as informações do usuário logado
      this.storageService.buscarInformacoesUsuario().then(usuarioStorage => {
        this.usuario = usuarioStorage;

        console.log("Usuario logado")
        console.log(this.usuario)

        let header = this.headerRequisicao(tokenStorage);

        //Busca os serviços gerais
        this.service.listarServicosGerais(header).subscribe(servicoG => {
        this.servicosGerais = servicoG;

        console.log(this.servicosGerais);
      });
      })

      
    })
  }

  abrirMapa(indexServico: number)
  {

    //Latitude e longitude do Dog Walker
    let latitudeDogW;
    let longintudeDogW;

    let servico = this.servicosGerais[indexServico];

    //Latitude e longitude do proprietário
    let latitudeProp = servico.servico.latitudeProp;
    let longitudeProp = servico.servico.longitudeProp;

    //Pega a geolocalização do Dog Walker
    this.geolocation.getCurrentPosition().then((resp) => {
      latitudeDogW = resp.coords.latitude;
      longintudeDogW = resp.coords.longitude;

      //Abre uma aba no navegador informando a distancia entre o Dog Walker e o Poprietário
      window.open("https://www.google.com/maps/dir/" + latitudeDogW +',' + longintudeDogW + '/' + latitudeProp + ',' + longitudeProp)

    })
  }

  chamarWhatsApp(indexServico: number)
  {
    let numero = this.servicosGerais[indexServico].servico.usuarios[0].usuario.whatsApp;
    window.open("https://api.whatsapp.com/send?phone=55" + numero);
  }

  async mostrarCaes(indexServico: number)
  {
    //Pega o id do serviço
    let idServico = this.servicosGerais[indexServico].servico.id;
    this.nomeProprietario = this.servicosGerais[indexServico].servico.usuarios[0].usuario.nome;

    this.storageService.buscarToken().then(tokenStorage => {

      const header = new HttpHeaders ({
        'Authorization': 'Bearer ' + tokenStorage
      })

      this.service.listarCaesServico(idServico, header).subscribe(caes => {
        this.caesServico = caes;
        this.modalCaes();
      })
    })

     

  }

  async modalCaes()
  {
    const modal = await this.modalController.create({
      component: CaesservicopagePage,
      cssClass:'modal-caes',
      componentProps: {
        caes: this.caesServico,
        nomePropri: this.nomeProprietario
      },
    });

    return await modal.present();
  }

  async modalAvaliarServico(nomeDogW: string, idDogW: number)
  {
    const modalAvaliar = await this.modalController.create({
      component: AvaliarServicoPage,
      cssClass: 'modal-avaliar',
      componentProps: {
        nomeDogWalker: nomeDogW,
        idDogWalker: idDogW, 
      }
    })

    return await modalAvaliar.present();
  }


}
