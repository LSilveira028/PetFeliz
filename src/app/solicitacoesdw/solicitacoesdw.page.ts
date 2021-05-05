import { Component, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CaoS ,CaesServico, ServicoService, UsuariosServico } from '../services/servico.service';
import { CaesservicopagePage } from '../componentes/caesservicopage/caesservicopage.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-solicitacoesdw',
  templateUrl: './solicitacoesdw.page.html',
  styleUrls: ['./solicitacoesdw.page.scss'],
})
export class SolicitacoesdwPage implements OnInit {

  @Output() Usuario: string = "DogWalker"
  @Output() tela: string = "solicitacoes";

  constructor(private service: ServicoService, public modalController: ModalController,
     private geolocation: Geolocation, private toast: ToastController) { }

  caesServico: CaesServico[];
  nomeProprietario: string;

  servicosSolicitados: UsuariosServico[];

  caoServico: any;

  servicoS: UsuariosServico;

  idServico: any;

  ngOnInit() {

    this.listarServicosSolicitados();
  }

  async mostrarCaes(indexServico: number)
  {
    this.idServico = this.servicosSolicitados[indexServico].servico.id;
    this.nomeProprietario = this.servicosSolicitados[indexServico].servico.usuarios[0].usuario.nome;

    console.log("MOSTRAR ID SERVIÇO")
    
    this.service.listarCaesServico(this.idServico).subscribe(caes => {
      this.caesServico = caes;
      console.log(this.caesServico)
      this.modalCaes();
    });

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

  abrirMapa(indexServico: number)
  {
    let latitudeDogW;
    let longintudeDogW;

    this.servicoS = this.servicosSolicitados[indexServico];

    let latitudeProp = this.servicoS.servico.latitudeProp;
    let longitudeProp = this.servicoS.servico.longitudeProp;

    this.geolocation.getCurrentPosition().then((resp) => {
      latitudeDogW = resp.coords.latitude
      longintudeDogW = resp.coords.longitude

      window.open("https://www.google.com/maps/dir/" + latitudeDogW +',' + longintudeDogW + '/' + latitudeProp + ',' + longitudeProp)


     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
  }

  chamarWhatsApp(indexServico: number)
  {
    let whatsappProprietario = this.servicosSolicitados[indexServico].servico.usuarios[0].usuario.whatsApp;
    window.open("https://api.whatsapp.com/send?phone=55" + whatsappProprietario);
  }

  aceitarServico(indexServico: number)
  {
    let idServico = this.servicosSolicitados[indexServico].servico.id;

    this.service.aceitarServico(idServico).subscribe(aceitarS => {

      //logo após aceitar o serviço, buscará novamente os serviços solicitados
      this.listarServicosSolicitados();
    });

    this.alertaToast("Serviço aceito");
  }

  recusarServico(indexServico: number)
  {
    let idServico = this.servicosSolicitados[indexServico].servico.id;

    this.service.recusarServico(idServico).subscribe(recusarS => {

      //logo após aceitar o serviço, buscará novamente os serviços solicitados
      this.listarServicosSolicitados();
    })
    this.alertaToast("Serviço recusado");
  }

  listarServicosSolicitados()
  {
    this.service.listarServicosSolicitados().subscribe(servicosS => {
      this.servicosSolicitados = servicosS;
      console.log("listar Serviços");
      console.log(this.servicosSolicitados);
    });
  }

  doRefresh(event)
  {
    //Define o tempo de carregamento
    setTimeout(() => {
      event.target.complete();
    }, 2000);

    //busca os serviços gerais
    this.listarServicosSolicitados();

  }

  async alertaToast(mensagem: string)
  {
    const toast = await this.toast.create({
      message: mensagem,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
