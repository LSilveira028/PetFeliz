import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Curso, CursoService } from '../../services/curso/curso.service';
import { StorageService } from '../../services/local-storage/storage.service';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.page.html',
  styleUrls: ['./cadastrar-curso.page.scss'],
})
export class CadastrarCursoPage implements OnInit {

  curso: Curso;

  constructor(private cursoService: CursoService, private storage: StorageService,
              private toast: ToastController, private nav: NavController,
              private modal: ModalController) { }


  ngOnInit() {
  }

  cadastarCurso(form: NgForm)
  {
    this.curso = form.value;


    this.storage.buscarToken().then(token => {

      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      });
      
      this.cursoService.adicionarCurso(this.curso, header).subscribe(resp => {
        console.log(resp);

        //emite alerta de que o curso foi adicionado
        // this.alertaCursoAdicionado();
        //vai para a tela de listar cursos
        // this.nav.navigateBack('listar-cursos');

        var cadastrado: Boolean = true;

        this.modal.dismiss(cadastrado);
        

      })

    })


    
  }

  async alertaCursoAdicionado()
  {
    const toast = await this.toast.create({
      message: 'Curso adicionado com sucesso',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

}
