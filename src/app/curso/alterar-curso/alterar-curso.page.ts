import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Curso, CursoService } from 'src/app/services/curso/curso.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';

@Component({
  selector: 'app-alterar-curso',
  templateUrl: './alterar-curso.page.html',
  styleUrls: ['./alterar-curso.page.scss'],
})
export class AlterarCursoPage implements OnInit {

  constructor(private storage: StorageService, private cursoService: CursoService,
              private modal: ModalController) { }

  @Input() curso: Curso;

  //infor curso
  nome: string;
  anoConclusao: Date;
  

  ngOnInit() {
    console.log(this.curso);

    this.nome = this.curso.nome;
    this.anoConclusao = this.curso.anoConclusao;

  }

  ionViewWillEnter()
  {


  }

  atualizarCurso(cursoForm: NgForm)
  {

    var curso = cursoForm.value;

    this.storage.buscarToken().then(token => {

      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      })

      this.cursoService.alterarCurso(this.curso.id, curso, header).subscribe(() => {
        //fecha o modal
        this.modal.dismiss();
      })

    })
  }

}
