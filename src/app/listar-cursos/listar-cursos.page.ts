import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Curso, CursoService } from '../services/curso/curso.service';
import { StorageService } from '../services/local-storage/storage.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.page.html',
  styleUrls: ['./listar-cursos.page.scss'],
})
export class ListarCursosPage implements OnInit {

  cursos: Curso[];

  aviso: boolean = false;

  constructor(private nav: NavController, private cursoService: CursoService,
             private storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storage.buscarToken().then(token => {

      var header = this.criarHeader(token);

    this.cursoService.listarCursos(header).subscribe(cursos => {
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
  
  criarHeader(token)  
  {

    var header = new HttpHeaders ({
      'Authorization': 'Bearer '+token
    })

    return header;
  }

  irParaCadastrarCurso()
  {
    this.nav.navigateForward('cadastrar-curso');
  }

}
