import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { SolicitarservicodwPage } from 'src/app/solicitarservicodw/solicitarservicodw.page';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { PerfilPage } from '../perfil/perfil.page';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.page.html',
  styleUrls: ['./procurar.page.scss'],
})
export class ProcurarPage implements OnInit, OnDestroy {

  @Output() tela: string = "procurar";
  //Usuario logado
  @Output() UsuarioL: string;

  dogWalkerInformacao: any;

  Usuario: Usuario;
  
  dogWalkers: Usuario[] = new Array<Usuario>();

  constructor(private service: UsuarioService, private geolocation: Geolocation,
              private modalController: ModalController, private storageService: StorageService,
              private menuCtrl: MenuController, private nav: NavController) { }
  
  latitudeUsuario;
  longitudeUsuario;
  
  latitudeDogWalker;
  longitudeDogWalker;

  distancia;

  opcaoCartao;
  opcaoDisponivel;

  whatsapp: string;

  ngOnInit() {


    // this.storageService.gravarReload(true);


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

    // for (let loop = 0; loop < 2; loop++) {
    //   location.reload();
    // }

    this.storageService.buscarInformacoesUsuario().then(usuInfo => {
      if (usuInfo.tipoConta == 2) {
        this.UsuarioL = "dogWalker"
        this.nav.navigateRoot('solicitacoesdw');
      }
      else
        this.UsuarioL = "proprietario"

      
    })

      parseFloat(this.longitudeDogWalker)
  
      this.storageService.buscarToken().then(tokenStorage => {

        let token = tokenStorage;

        console.log(tokenStorage);

        const header = new HttpHeaders ({
          'Authorization': 'Bearer ' + token
        });

        //Pega a longitude e latitude do usuário
        this.geolocation.getCurrentPosition().then((resp) => {
        
          this.latitudeUsuario =  resp.coords.latitude
          this.longitudeUsuario = resp.coords.longitude
          // parseFloat(this.latitudeUsuario);
          
          console.log(this.latitudeUsuario);
          console.log(this.longitudeUsuario);

          this.service.procurarDogWalkers(header).subscribe(response => {
            this.dogWalkers = response;

            this.dogWalkers.forEach(element => {
              //pega a localização do dog walker
              this.latitudeDogWalker = element.latitude;
              this.longitudeDogWalker = element.longitude;   
              
              this.whatsapp = element.whatsApp;
              console.log("whats: " + this.whatsapp)

              //armazena a distancia entre o proprietário e o dog walker
              this.distancia = calcularDistancia
              (this.latitudeUsuario, this.longitudeUsuario, this.latitudeDogWalker, this.longitudeDogWalker)

              element.distancia = (this.distancia).toFixed(0);

              console.log("distancia: " + this.distancia)
    
              //Verificação das avaliações em estrelas
                var valorDecimal = element.servicoDogWalker.avaliacaoMedia % 1;
                var valorInteiro = element.servicoDogWalker.avaliacaoMedia - valorDecimal;
                
                console.log(valorInteiro);

                if (valorDecimal > 0.3 && valorDecimal < 0.8 ) {
                  valorDecimal = 0.5;
                  element.servicoDogWalker.avaliacaoMedia = valorInteiro + valorDecimal;
                }
                else
                {
                  if (valorDecimal > 0.8) {
                    valorInteiro = valorInteiro + 1;
                    element.servicoDogWalker.avaliacaoMedia = valorInteiro + 1;
                    valorDecimal = 0.0;
                  }
              
                  if (valorDecimal < 0.3) {
                    element.servicoDogWalker.avaliacaoMedia = valorInteiro;
                    valorDecimal = 0.0;
                  }
                }



              });
              
          })

        }).catch((error) => {
          console.log('Error getting location', error);
        });

        })


    

    //Função que faz o cálculo de dois pontos geográficos
    function calcularDistancia(lat1,lon1,lat2,lon2)
    {
      var R = 6371; //Raio da Terra em km
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lon2-lon1);
      var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distancia em km
      

      return d;
    }
    function deg2rad(deg)
    {
      return deg * (Math.PI/180);
    }
  }
  
   //Quando a página carregar
   ionViewWillEnter()
   {
    //  this.verificarAvaliacaoMedia();
   }

   ionViewDidEnter()
   {
    // this.verificarAvaliacaoMedia();
   }

  ngOnDestroy()
  {
    // this.menuCtrl.enable(true)
  }

  // Habilita o sidemenu
  // ionViewDidEnter() {
  //   this.menuCtrl.enable(true);
  // }
  // ionViewDidLeave() {
  //   this.menuCtrl.enable(true);
  // }
  // ionViewWillEnter() {
  //   this.menuCtrl.enable(true);
  // }

  enviarMensagem(i: any)
  {
    this.dogWalkerInformacao = this.dogWalkers[i];
    window.open("https://api.whatsapp.com/send?phone=55" + this.dogWalkerInformacao.whatsApp)
  }
 
  definirMargem(d: Usuario)
  {
    if(d.servicoDogWalker.aceitaCartao == false)
      return '20px'
    else
      return '50px'
  }

  async modalSolicitar(dogWalker: Usuario, distancia: number)
  {
    const modal = await this.modalController.create({
      component: SolicitarservicodwPage,
      componentProps: {
        dogWalker: dogWalker,
        distancia: distancia 
      },
      swipeToClose: true,
    });

    return await modal.present()
  }

  irParaSolicitar(indexServico: number)
  {
    let dogwalker: Usuario = this.dogWalkers[indexServico];
    console.log(dogwalker)
    this.modalSolicitar(dogwalker, (this.distancia).toFixed(0));
  }

  async modalPerfilDogWalker(i: number)
  {
    var dogWalker = this.dogWalkers[i];

    const modalPerfilDogWalker = await this.modalController.create({
      component: PerfilPage,
      componentProps: {
        dogWalker: dogWalker
      }
    });

    return await modalPerfilDogWalker.present();
  }

  

}
