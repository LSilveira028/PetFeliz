import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public dogW: Usuario[] = [];

  constructor(public toastSalvarCtrl: ToastController, private storage: StorageService,
              private usuarioService: UsuarioService, private nav: NavController,
              private modal: ModalController) { }

  idUsuarioLogado: number;
  @Input() dogWalker: Usuario;


  //informacoes Dog Walker
  nome: string;
  dataCadastro: string;
  sobre: string;
  valorServico: number;
  aceitaCartao: string;
  preferencias: string;
  avaliacaoMedia: number;

  ngOnInit() {

    //Busca as informações do usuário logado
    this.storage.buscarInformacoesUsuario().then(infoUsu => {
      this.dogW[0] = infoUsu;

      // console.log(infoUsu)
      // console.log(this.dogW);

      //Se o usuário logado for um proprietário
      if (infoUsu.tipoConta == 1) {
        this.idUsuarioLogado = 1;

        //então a página receberá as informações do input
        this.dogW[0] = this.dogWalker;
        console.log(this.dogW);

        //Atribui a avaliação média a propriedade avaliaçãoMedia desta classe
        this.avaliacaoMedia = this.dogWalker.servicoDogWalker.avaliacaoMedia;

      }
      if (infoUsu.tipoConta == 2) {
        this.idUsuarioLogado = 2;
      }

    })

  }

  //Quando a página carregar
  ionViewDidEnter()
  {
    this.verificarAvaliacaoMedia();
  }

  fecharModalPerfil()
  {
    this.modal.dismiss();
  }


  verificarAvaliacaoMedia()
  {
    //Pega os elementos que representam as estrelas

    var star1 = document.getElementById('star1');
    var star2 = document.getElementById('star2');
    var star3 = document.getElementById('star3');
    var star4 = document.getElementById('star4');
    var star5 = document.getElementById('star5');


    var valorDecimal = this.avaliacaoMedia % 1;
    var valorInteiro = this.avaliacaoMedia - valorDecimal;
    
    // console.log(valorInteiro);
    // console.log(star1);

    if (valorDecimal > 0.3 && valorDecimal < 0.7 ) {
      valorDecimal = 0.5;
    }
    else
    {
      if (valorDecimal > 0.7) {
        valorInteiro = valorInteiro + 1;
        valorDecimal = 0.0;
      }
  
      if (valorDecimal < 0.3) {
        valorDecimal = 0.0;
      }
    }


    if (valorInteiro == 0) {
      star1.setAttribute("src", "/assets/star1.png");

      star2.setAttribute("src", "/assets/star1.png");

      star3.setAttribute("src", "/assets/star1.png");

      star4.setAttribute("src", "/assets/star1.png")

      star5.setAttribute("src", "/assets/star1.png")
    }
    else
    {
      if (valorInteiro == 1) {
        star1.setAttribute("src", "/assets/star2.png");
  
        if (valorDecimal == 0.5)
          star2.setAttribute("src", "/assets/star3.png");
        else
          star2.setAttribute("src", "/assets/star1.png");
  
  
        star3.setAttribute("src", "/assets/star1.png");
  
        star4.setAttribute("src", "/assets/star1.png")
  
        star5.setAttribute("src", "/assets/star1.png")
      }
      else
      {
        if (valorInteiro == 2) {
          star1.setAttribute("src", "/assets/star2.png");
  
          star2.setAttribute("src", "/assets/star2.png");
          
          if (valorDecimal == 0.5) {
            star3.setAttribute("src", "/assets/star3.png");
          }
          else
            star3.setAttribute("src", "/assets/star1.png");
    
          star4.setAttribute("src", "/assets/star1.png")
    
          star5.setAttribute("src", "/assets/star1.png")
        }
        else
        {
          if (valorInteiro == 3) {
            star1.setAttribute("src", "/assets/star2.png");
  
            star2.setAttribute("src", "/assets/star2.png");
      
            star3.setAttribute("src", "/assets/star2.png");
      
            if (valorDecimal == 0.5) {
              star4.setAttribute("src", "/assets/star3.png")
            }
            else
              star4.setAttribute("src", "/assets/star1.png")
      
            star5.setAttribute("src", "/assets/star1.png")
          }
          else
          {
            if (valorInteiro == 4) {
              star1.setAttribute("src", "/assets/star2.png");
  
              star2.setAttribute("src", "/assets/star2.png");
        
              star3.setAttribute("src", "/assets/star2.png");
        
              star4.setAttribute("src", "/assets/star2.png")
        
              if (valorDecimal == 0.5) {
                star5.setAttribute("src", "/assets/star3.png")
              }
              else
                star5.setAttribute("src", "/assets/star1.png")
            }
            else
            {
              star1.setAttribute("src", "/assets/star2.png");
  
              star2.setAttribute("src", "/assets/star2.png");
        
              star3.setAttribute("src", "/assets/star2.png");
        
              star4.setAttribute("src", "/assets/star2.png")
        
              star5.setAttribute("src", "/assets/star2.png")
            }
          }
        }
      }
    }

    

  }

  // async metodoToastSalvar() {
  //   const toast = await this.toastSalvarCtrl.create({
  //     message: 'Salvo!',
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

}
