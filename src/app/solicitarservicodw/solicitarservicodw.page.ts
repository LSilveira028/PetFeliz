import { Component, Input, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Cao, CaoService } from '../services/cao.service';
import { Servico, ServicoService, UsuariosServico } from '../services/servico.service';
import { Usuario, UsuarioService } from '../services/usuario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { StorageService } from '../services/local-storage/storage.service';
import { HttpHeaders } from '@angular/common/http';

export interface CaesSelecionados
{
  id: number;
}

@Component({
  selector: 'app-solicitarservicodw',
  templateUrl: './solicitarservicodw.page.html',
  styleUrls: ['./solicitarservicodw.page.scss'],
})
export class SolicitarservicodwPage implements OnInit {

  @Input() dogWalker: Usuario;
  @Input() distancia : number;

  caes: Cao[];

  // servico: Servico[]
  
  caesSelecionados: any[]
  valorTotal: number;

  constructor(private serviceCao: CaoService,private serviceUsuario: UsuarioService,
              private modal: ModalController, private _modal: ModalController,
              private geolocation: Geolocation, private toast: ToastController,
              private serviceServico: ServicoService, private alertController: AlertController,
              private storageService: StorageService, private loading: LoadingController
              ) { }

  //Estilização do select de cães
  selectOptionCaes: any = {
    subHeader: 'Selecione seus cães',
    cssClass: 'select-option-caes' 
  }

  ngOnInit() {

    //Busca o token do usuário logado
    this.storageService.buscarToken().then(tokenStorage => {
      
      let header = this.headerRequisicao(tokenStorage);

      //busca as informações do proprietário de modo que se possa
      //obter seu id, e assim possa buscar seus cães
      this.storageService.buscarInformacoesUsuario().then(infoUsu => {

        let usuario: Usuario = infoUsu;
        let idUsuario = usuario.id

        //busca os cães do proprietário
        this.serviceCao.listarCaesProprietario(header).subscribe(caes => {
          this.caes = caes;
        })
      })
    })


    //Verificação das avaliações em estrelas
    var valorDecimal = this.dogWalker.servicoDogWalker.avaliacaoMedia % 1;
    var valorInteiro = this.dogWalker.servicoDogWalker.avaliacaoMedia - valorDecimal;
    
    console.log(valorInteiro);

    if (valorDecimal > 0.3 && valorDecimal < 0.8 ) {
      valorDecimal = 0.5;
      this.dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro + valorDecimal;
    }
    else
    {
      if (valorDecimal > 0.8) {
        valorInteiro = valorInteiro + 1;
        this.dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro + 1;
        valorDecimal = 0.0;
      }
  
      if (valorDecimal < 0.3) {
        this.dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro;
        valorDecimal = 0.0;
      }
    }
      
  }

  //Header que será enviado na requisição
  headerRequisicao(token: any)
  {
    let header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    })

    return header;
  }

  definirMargem()
  {
    if(this.dogWalker.servicoDogWalker.aceitaCartao == false)
      return '20px'
    else
      return '50px'
  }

  pegarCaes($event)
  {
    this.caesSelecionados = $event.target.value;
    console.log(this.caesSelecionados)
    
    this.valorTotal = this.dogWalker.servicoDogWalker.valorServico * this.caesSelecionados.length;
    console.log(this.valorTotal);

  }

  fecharModalSolicitar()
  {
    this.modal.dismiss();
  }

  async alertaSolicitar()
  {

    //Se não houver nenhuma cão selecionado
    if(this.caesSelecionados == null || this.caesSelecionados.length == 0)
    {
      //chamará o alerta o qual avisará que não há cães selecionados
      this.alertaSemCao();
    }
    else
    {
      const alert = await this.alertController.create({
        cssClass: 'alerta-solicitar',
        header: 'Tem certeza?',
        message: 'Tem certeza que deseja solicitar o serviço?',
        buttons: [
          {
            text: 'Sim',
            role: 'sim',
            cssClass: 'botao-alert-neutro',
            handler: (action) => {
              //Ação que será feita ao clicar em 'Sim'
              this.presentLoading();
              this.solicitarServico();
            }
          },
          {
            text: 'Cancelar',
            role: 'cancelar',
            cssClass: 'botao-alert-danger',
          }
        ]
      })
  
      await alert.present();
    }   
  }

  async alertaSemCao()
  {
    const alert = await this.alertController.create({
      cssClass: 'botao-alert-sem-cao',
      header: 'Ops!',
      message: 'Selecione pelo menos um cão.',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'botao-alert-neutro'
        }
      ]
    })

    await alert.present();
  }

  solicitarServico()
  {
    let latitudeP: number;
    let longitudeP: number;

    //Busca a geolocalização do usuário
    this.geolocation.getCurrentPosition().then((resp) => {
      latitudeP = resp.coords.latitude;
      longitudeP = resp.coords.longitude;

      //Cria um objeto que será utilizado na requisição
      const servico: Servico = {
        valorTotal: this.valorTotal,
        latitudeProp: latitudeP,
        longitudeProp: longitudeP
      }

      this.storageService.buscarToken().then(tokenStorage => {
        
        let header = this.headerRequisicao(tokenStorage);

        //Faz a solicitação do serviço
        this.serviceServico.solicitarServico(servico, header).subscribe(servico => {
          console.log("Serviço solicitado")
          console.log(servico)
          
          //Associa o proprietário ao serviço
          this.serviceServico.associarProprietarioServico(header).subscribe(proprietarioServico => {
            console.log("Proprietário associado")
            console.log(proprietarioServico);
            
            // Associa o Dog Walker ao serviço
            this.serviceServico.associarDogWalkerServico(this.dogWalker.id, header).subscribe(dogWalkerServico => {
              console.log("Dog Walker Serviço");
              console.log(dogWalkerServico);
              
              //Associa os cães ao serviço
              //Quantidade de cães
              let qtdCaes = this.caesSelecionados.length;
              
              for (let c = 0; c < qtdCaes; c++) {
                const idCao = this.caesSelecionados[c];
                
                this.serviceCao.associarCaoServico(idCao, header).subscribe(e => {
                })
                
              }
              //Fecha o modal de loading
              this.loading.dismiss();
              //Fecha o modal de solicitar serviço
              this.modal.dismiss();
              //Emite alerta avisando que o serviço foi solicitado
              this.avisoSolicitado();
              
            })
          })
        })
      })

    });
  }
  
  async presentLoading()
  {
    const loading = await this.loading.create({
      message: 'Solicitando...'
    });

    await loading.present();
  }

  async avisoSolicitado()
  {
    const toast = await this.toast.create({
      message: 'Serviço solicitado com sucesso.',
      duration: 4000
    })
    toast.present();
  }

}
