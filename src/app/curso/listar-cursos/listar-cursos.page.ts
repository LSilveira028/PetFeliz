import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Curso, CursoService } from '../../services/curso/curso.service';
import { StorageService } from '../../services/local-storage/storage.service';
import { AlterarCursoPage } from '../alterar-curso/alterar-curso.page';
import { CadastrarCursoPage } from '../cadastrar-curso/cadastrar-curso.page';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.page.html',
  styleUrls: ['./listar-cursos.page.scss'],
})
export class ListarCursosPage implements OnInit {

  cursos: Curso[];

  aviso: boolean = false;

  constructor(private nav: NavController, private cursoService: CursoService,
             private storage: StorageService, private modal: ModalController,
             private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionModalDidDismiss()
  {
    console.log("AAA")
  }

  ionViewWillEnter()
  {
    this.listarCursos();
  }
  
  listarCursos()
  {
    this.storage.buscarToken().then(token => {

      var header = this.criarHeader(token);

    this.cursoService.listarCursos(0,header).subscribe(cursos => {
      this.cursos = cursos;

      if (this.cursos.length == 0) {
        this.aviso = true;
      }
      else
      {
        this.aviso = false;
      }

      console.log(this.cursos);
    })

    })
  }

  removerCurso(idCurso: number)
  {

    this.storage.buscarToken().then( token => {

      var header = this.criarHeader(token);

      this.cursoService.removerCurso(idCurso, header).subscribe(() => {

        this.listarCursos();

      })

    } )

  }

  criarHeader(token)  
  {

    var header = new HttpHeaders ({
      'Authorization': 'Bearer '+token
    })

    return header;
  }

  async irParaCadastrarCurso()
  {

    const modal = await this.modal.create({
      component: CadastrarCursoPage,
      cssClass: 'modal-cadastrar-curso'
    })

    modal.onDidDismiss().then(r => {

      if (r.data == true) {
        this.listarCursos();
      }

    })

    return await modal.present();

  }

  async irParaAlterarCurso(index: number)
  {
    //busca o curso que será alterado
    var curso: Curso = this.cursos[index];

    const modal = await this.modal.create({
      component: AlterarCursoPage,
      cssClass: 'modal-alterar-curso',
      componentProps: {
        'curso': curso
      }
    })

    //quando o modal for fechado, será listado novamente os cursos
    modal.onDidDismiss().then(() => {
      this.listarCursos();
    });

    return await modal.present();
  }

  async alertRemoverCurso(indexCurso: number)
  {

    var curso: Curso = this.cursos[indexCurso];

    var alert = await this.alertCtrl.create({
      'header': 'Tem certeza?',
      'message': 'Deseja remover o curso?',
      cssClass: 'alerta-remover-curso',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          cssClass: 'botao-alert-danger',
          text: 'Sim',
          handler: () => {

            this.removerCurso(curso.id)

          }
        }

      ]
    })

    await alert.present();
  }

}
