import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Curso, CursoService } from 'src/app/services/curso/curso.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { AvaliacoesPage } from '../avaliacoes/avaliacoes.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public dogW: Usuario[] = [];

  cursos: Curso[]

  constructor(public toastSalvarCtrl: ToastController, private storage: StorageService,
              private usuarioService: UsuarioService, private nav: NavController,
              private modal: ModalController, private usuario: UsuarioService,
              private modal_: ModalController, private cursoService: CursoService) { }

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

        this.avaliacaoEstrelas();

        //listar os cursos do dog walker
        this.listarCursos(this.dogWalker.id);

      }
      if (infoUsu.tipoConta == 2) {
        this.idUsuarioLogado = 2;

        if (infoUsu.servicoDogWalker == null) {
          this.nav.navigateRoot('alterarperfil');
        }

        console.log(this.dogW[0])
        //Atribui a avaliação média a propriedade avaliaçãoMedia desta classe
        this.avaliacaoMedia = this.dogW[0].servicoDogWalker.avaliacaoMedia;
        console.log(this.avaliacaoMedia);

        this.storage.buscarToken().then(token => {

          var header = new HttpHeaders ({
            'Authorization': 'Bearer ' + token
          })

          this.usuario.informacoesUsuario(header).subscribe(dogwLogado => {

            this.storage.gravarInformacoesUsuario(dogwLogado).then(() => {

              this.dogW[0] = dogwLogado;

              this.avaliacaoEstrelas();

              // this.dogW[0].servicoDogWalker.avaliacaoMedia = this.avaliacaoEstrelas();
            })

          });
        
        })

        this.listarCursos(this.idUsuarioLogado);

      }
    })

    

  }

  criarHeader(token)
  {
    var header = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    })

    return header;
  }

  listarCursos(idDogW: number)
  {
    this.storage.buscarToken().then(token => {

      var header = this.criarHeader(token);

      this.cursoService.listarCursos(idDogW,header).subscribe(cursos => {

        this.cursos = cursos;

      })

    })
  }

  ionViewWillEnter()
  {
    // this.storage.buscarInformacoesUsuario().then(infoUsu => {

    //   if (infoUsu.tipoConta == 1) {
        
    //   }

    // })

    // this.listarCursos(this.dogWalker.id);
  }

  //Quando a página carregar
  ionViewDidEnter()
  {
    // this.verificarAvaliacaoMedia();

  }

  fecharModalPerfil()
  {
    this.modal.dismiss();
  }

  irParaListarCursos()
  {
    this.nav.navigateForward('listar-cursos');
  }

  abrirAlterarPerfil()
  {
    this.nav.navigateForward('alterarperfil');
  }

  avaliacaoEstrelas()
  {
  

    this.dogW.forEach(dogWalker => {      

      //Verificação das avaliações em estrelas
      var valorDecimal = dogWalker.servicoDogWalker.avaliacaoMedia % 1;
      var valorInteiro = dogWalker.servicoDogWalker.avaliacaoMedia - valorDecimal;
      
      console.log("valor decimal");
      console.log(valorDecimal);
     
      console.log("valor inteiro");
      console.log(valorInteiro);
      

      console.log(valorInteiro);

      if (valorDecimal >= 0.2999999999999998 && valorDecimal < 0.7999999999999998 ) {
        valorDecimal = 0.5;
        dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro + valorDecimal;
      }
      else
      {
        if (valorDecimal >= 0.7999999999999998) {
          valorInteiro = valorInteiro + 1;
          dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro + 1;
          valorDecimal = 0.0;
        }
    
        if (valorDecimal < 0.2999999999999998) {
          dogWalker.servicoDogWalker.avaliacaoMedia = valorInteiro;
          valorDecimal = 0.0;
        }
      }

      console.log("valor decimal");
      console.log(valorDecimal);
     
      console.log("valor inteiro");
      console.log(valorInteiro);

    });
  }

  async navegarParaAvaliacoes()
  {
    const modalAvaliacoes = await this.modal_.create({
      component: AvaliacoesPage,
      componentProps: {
        'dogWalker': this.dogWalker,
      }
    })

    return await modalAvaliacoes.present();
  }

  // async metodoToastSalvar() {
  //   const toast = await this.toastSalvarCtrl.create({
  //     message: 'Salvo!',
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

}
