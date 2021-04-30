import { Component, OnInit, Output } from '@angular/core';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.page.html',
  styleUrls: ['./procurar.page.scss'],
})
export class ProcurarPage implements OnInit {

  @Output() tela: string = "procurar";

  dogWalkerInformacao: any;

  Usuario: Usuario;
  
  dogWalkers: Usuario[] = new Array<Usuario>();

  constructor(private service: UsuarioService, private geolocation: Geolocation) { }
  
  latitudeUsuario;
  longitudeUsuario;
  
  latitudeDogWalker;
  longitudeDogWalker;

  distancia;

  opcaoCartao;
  opcaoDisponivel;

  whatsapp: string;

  ngOnInit() {

      parseFloat(this.longitudeDogWalker)
      //Pega a longitude e latitude do usuário
      this.geolocation.getCurrentPosition().then((resp) => {
      
        this.latitudeUsuario =  resp.coords.latitude
        this.longitudeUsuario = resp.coords.longitude
        // parseFloat(this.latitudeUsuario);
        
        console.log(this.latitudeUsuario);
        console.log(this.longitudeUsuario);

        this.service.procurarDogWalkers().subscribe(response => {
          this.dogWalkers = response;

          this.dogWalkers.forEach(element => {
            //pega a localização do dog walker
            this.latitudeDogWalker = element.latitude;
            this.longitudeDogWalker = element.longitude;

            //Verifica se o Dog Walker aceita cartão
            this.opcaoCartao = element.servicoDogWalker.aceitaCartao
            if(this.opcaoCartao == false)
            {
              element.textoCartao = "Não aceito cartão"
            }
            else
              element.textoCartao = "Aceito cartão"
            
            this.whatsapp = element.whatsApp;
            console.log("whats: " + this.whatsapp)

            //Verifica se o Dog Walker está disponível
            this.opcaoDisponivel = element.disponivel;
            if(this.opcaoDisponivel == false)
              element.textoDisponivel = "Indisponível";
            else
              element.textoDisponivel = "Disponível";

            //armazena a distancia entre o proprietário e o dog walker
            this.distancia = calcularDistancia
            (this.latitudeUsuario, this.longitudeUsuario, this.latitudeDogWalker, this.longitudeDogWalker)

            element.distancia = (this.distancia).toFixed(0);

            console.log("distancia: " + this.distancia)
  
            });
            
        })

      }).catch((error) => {
        console.log('Error getting location', error);
      });

    

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
  
  enviarMensagem(i: any)
  {
    this.dogWalkerInformacao = this.dogWalkers[i];
    window.open("https://api.whatsapp.com/send?phone=55" + this.dogWalkerInformacao.whatsApp)
  }
 
  definirMargem(d: Usuario)
  {
    if(d.textoCartao == "Não aceito cartão")
      return '20px'
    else
      return '50px'
  }

}
