import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cao, CaoService } from 'src/app/services/cao.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';

@Component({
  selector: 'app-alterar-cao',
  templateUrl: './alterar-cao.page.html',
  styleUrls: ['./alterar-cao.page.scss'],
})
export class AlterarCaoPage implements OnInit {

  @Input() cao: Cao;

  constructor(private storage: StorageService, private caoService: CaoService,
              private modal: ModalController) { }

  ngOnInit() {

  }

  alterarCao(caoForm: NgForm)
  {

    var cao: Cao = caoForm.value;

    //faz a busca do token
    this.storage.buscarToken().then(token => {

      //cria um header com o token buscado
      var header = new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      });

      //faz a requisção, passando o id do cao e o header com o token
      this.caoService.alterarCao(this.cao.id, header, cao).subscribe(resp => {

        var alterado: boolean = true;

        this.modal.dismiss(alterado);

      })

    })

  }

}
