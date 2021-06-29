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

  favoritos: Usuario[];

  ngOnInit() {

    this.storageService.buscarFavoritos().then(favoritos => {

      this.favoritos = favoritos;
      
      console.log(this.favoritos);
    })

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

    this.buscarDogWalkers();

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


  tornarFavorito(indexUsuario: number)
  {
    let usuarios: Usuario[] = [];

    let usuario = this.dogWalkers[indexUsuario];

    this.storageService.adicionarFavorito(usuarios).then(r => {
      console.log(r);
    });


    this.storageService.buscarFavoritos().then(favoritos => {

      usuarios = favoritos;

      usuarios.unshift(usuario);

      this.dogWalkers[indexUsuario].favorito = true;

      this.storageService.adicionarFavorito(usuarios);

    });
  }

  removerFavorito(index: number)
  {
    // let usuarios: Usuario[] = [];

    let usuario = this.dogWalkers[index];

    this.storageService.buscarFavoritos().then(favoritos => {

      this.favoritos = favoritos;

      //busca o index em que o dog walker está no array de favoritos
      let indexDwRemover = this.favoritos.findIndex((e) => e.id == usuario.id);

      //remove esse dog walker do array
      this.favoritos.splice(indexDwRemover, 1);

      //atualiza a lista para mostrar que o dog walker não é mais favorito
      this.dogWalkers[index].favorito = false;

      //atualiza o storage
      this.storageService.adicionarFavorito(this.favoritos);

      console.log(this.favoritos);

      // delete usuarios[indexDwRemover];
      // this.storageService.adicionarFavorito(usuarios);

    });

  }

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

  criarHeader(token)
  {
    const header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    });
    return header;
  }

  buscarDogWalkers()
  {
    this.storageService.buscarToken().then(token => {

      console.log(token)

      var header = this.criarHeader(token);

      this.geolocation.getCurrentPosition().then( resp => {

        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);

        this.latitudeUsuario =  resp.coords.latitude
        this.longitudeUsuario = resp.coords.longitude

        this.service.procurarDogWalkers(resp.coords.latitude, resp.coords.longitude,header).subscribe(response => {
          this.dogWalkers = response;

          this.dogWalkers.forEach(element => {
            //pega a localização do dog walker
            this.latitudeDogWalker = element.latitude;
            this.longitudeDogWalker = element.longitude;   
            
            this.whatsapp = element.whatsApp;
            console.log("whats: " + this.whatsapp)
    
            //1. armazena a distancia entre o proprietário e o dog walker
            this.distancia = calcularDistancia
            (this.latitudeUsuario, this.longitudeUsuario, this.latitudeDogWalker, this.longitudeDogWalker)
    
            element.distancia = (this.distancia).toFixed(0);
    
            console.log("distancia: " + this.distancia)
    
            //2. Verificação das avaliações em estrelas
              var valorDecimal = element.servicoDogWalker.avaliacaoMedia % 1;
              var valorInteiro = element.servicoDogWalker.avaliacaoMedia - valorDecimal;
              
              console.log(element.servicoDogWalker.avaliacaoMedia % 1);
              console.log(valorInteiro);

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
    
              //3. verifica se é favorito
              this.storageService.buscarFavoritos().then(favoritos => {
                
                this.favoritos = favoritos;
                
                if (this.favoritos.find(dw => dw.id == element.id)) {
                  
                  element.favorito = true;

                }
                else
                {
                  element.favorito = false;
                }

              })
              
            });
            
        })

      })

      

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

  atualizarPagina(event)
  {
    setTimeout(() => {
      event.target.complete();
    }, 2000)

    this.buscarDogWalkers();
  }


}
