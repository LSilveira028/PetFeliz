import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alterar-dados-pessoais',
  templateUrl: './alterar-dados-pessoais.page.html',
  styleUrls: ['./alterar-dados-pessoais.page.scss'],
})
export class AlterarDadosPessoaisPage implements OnInit {

  constructor() { }

  @Input() dataNascimento : Date;
  @Input() whatsApp : string;

  ngOnInit() {
  }

}
