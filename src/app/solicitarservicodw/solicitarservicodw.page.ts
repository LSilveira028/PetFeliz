import { Component, Input, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Cao, CaoService } from '../services/cao.service';
import { Servico, ServicoService, UsuariosServico } from '../services/servico.service';
import { Usuario, UsuarioService } from '../services/usuario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { isNull } from '@angular/compiler/src/output/output_ast';

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
              private modal: ModalController, private geolocation: Geolocation,
              private serviceServico: ServicoService, private alertController: AlertController,
              ) { }

  //Estilização do select de cães
  selectOptionCaes: any = {
    subHeader: 'Selecione seus cães',
    cssClass: 'select-option-caes' 
  }

  ngOnInit() {

    this.serviceUsuario.informacoesUsuario().subscribe(infoUsu => {

      let usuario: Usuario;
      usuario = infoUsu;
      let idUsuario = usuario.id

      this.serviceCao.listarCaesProprietario(idUsuario).subscribe(caes => {
        this.caes = caes;
        
      })

    });
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

    if(this.caesSelecionados == null)
    {
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
              // this.solicitarServico();
              this.teste()
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

  teste()
  {
    
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

      //Faz a solicitação do serviço
      this.serviceServico.solicitarServico(servico).subscribe(servico => {
        console.log("Serviço solicitado")
        console.log(servico)

        //Associa o proprietário ao serviço
        this.serviceServico.associarProprietarioServico().subscribe(proprietarioServico => {
          console.log("Proprietário associado")
          console.log(proprietarioServico);

          // Associa o Dog Walker ao serviço
          this.serviceServico.associarDogWalkerServico(this.dogWalker.id).subscribe(dogWalkerServico => {
            console.log("Dog Walker Serviço");
            console.log(dogWalkerServico);
          })
        })
      })

    });

    

    //  this.servico[0].valorTotal = this.valorTotal;
  }
  
}
