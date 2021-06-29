import { Component, OnInit, Output } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { CaoS ,CaesServico, ServicoService, UsuariosServico } from '../services/servico.service';
import { CaesservicopagePage } from '../componentes/caesservicopage/caesservicopage.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UsuarioService, Usuario } from '../services/usuario.service';
import { StorageService } from '../services/local-storage/storage.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-solicitacoesdw',
  templateUrl: './solicitacoesdw.page.html',
  styleUrls: ['./solicitacoesdw.page.scss'],
})
export class SolicitacoesdwPage implements OnInit {

  @Output() tela: string = "solicitacoes";
  @Output() UsuarioL: string;

  constructor(private service: ServicoService, public modalController: ModalController,
     private geolocation: Geolocation, private toast: ToastController,
     private menuCtrl: MenuController, private serviceUsuario: UsuarioService,
     private storageService: StorageService) { }

  caesServico: CaesServico[];
  nomeProprietario: string;

  servicosSolicitados: UsuariosServico[];

  caoServico: any;

  servicoS: UsuariosServico;

  idServico: any;

  ngOnInit() {

    //Verifica se pode atualizar a página
    this.storageService.verificarReload().then(resp => {
      
      //Se puder, atualiza
      if (resp == true) {

        //Diz que a página não pode ser mais atualizada.
        //Isso foi feito para não dar loop, carregar a página inifinitamente
        this.storageService.gravarReload(false).then(() => {

          //Atualiza a página
          location.reload();

        });
      }
    })

    this.listarServicosSolicitados();

    this.storageService.buscarInformacoesUsuario().then(usuInfo => {
      if (usuInfo.tipoConta == 2) {
        this.UsuarioL = "dogWalker"
      }
      else
        this.UsuarioL = "proprietario"
    })

    this.storageService.buscarToken().then(tokenStorage => {
      let token = tokenStorage;

      let header = this.headerRequisicao(token);

      this.geolocation.getCurrentPosition().then(resp => {

        let latitude = resp.coords.latitude;
        let longitude = resp.coords.longitude;

        console.log("LATITUDE")
        console.log(latitude)
        console.log("LONGITUDE")
        console.log(longitude)

        const geolocalizacao: Usuario = ({
          'latitude': latitude,
          'longitude': longitude
        })      
  
        this.serviceUsuario.atualizarLocalizacao(header, geolocalizacao).subscribe(resp => {
        })
      })

    })

    // this.serviceUsuario.atualizarLocalizacao()
  }

  //Header que será enviado na requisição
  headerRequisicao(token: any)
  {
    let header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    })

    return header;
  }

  //Habilita o sidemenu
  // ionViewDidEnter() {
  //   this.menuCtrl.enable(true);
  // }
  // ionViewDidLeave() {
  //   this.menuCtrl.enable(true);
  // }

  async mostrarCaes(indexServico: number)
  {
    this.idServico = this.servicosSolicitados[indexServico].servico.id;
    this.nomeProprietario = this.servicosSolicitados[indexServico].servico.usuarios[0].usuario.nome;

    console.log("MOSTRAR ID SERVIÇO")
    
    this.storageService.buscarToken().then(tokenStorage => {

      const header = this.headerRequisicao(tokenStorage)

      this.service.listarCaesServico(this.idServico, header).subscribe(caes => {
        this.caesServico = caes;
        console.log(this.caesServico)
        this.modalCaes();
      });

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

    this.storageService.buscarToken().then(tokenStorage => {

      const header = this.headerRequisicao(tokenStorage);

      this.service.aceitarServico(idServico,header).subscribe(aceitarS => {

        //logo após aceitar o serviço, buscará novamente os serviços solicitados
        this.listarServicosSolicitados();
      });
    })

      

    this.alertaToast("Serviço aceito");
  }

  recusarServico(indexServico: number)
  {
    let idServico = this.servicosSolicitados[indexServico].servico.id;

    this.storageService.buscarToken().then(tokenStorage => {

      const header = this.headerRequisicao(tokenStorage);

      this.service.recusarServico(idServico, header).subscribe(recusarS => {

        //logo após aceitar o serviço, buscará novamente os serviços solicitados
        this.listarServicosSolicitados();
      })

    })

    
    this.alertaToast("Serviço recusado");
  }

  listarServicosSolicitados()
  {

    this.storageService.buscarToken().then(tokenStorage => {

      const header = this.headerRequisicao(tokenStorage)

      this.service.listarServicosSolicitados(header).subscribe(servicosS => {
        this.servicosSolicitados = servicosS;
        console.log("listar Serviços");
        console.log(this.servicosSolicitados);
      });
    })

    
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
