import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaesServico } from 'src/app/services/servico.service';

@Component({
  selector: 'app-caesservicopage',
  templateUrl: './caesservicopage.page.html',
  styleUrls: ['./caesservicopage.page.scss'],
})
export class CaesservicopagePage implements OnInit {

  @Input() caes: CaesServico[]
  @Input() nomePropri: string;

  constructor(private modal: ModalController) { }

  ngOnInit() {
    console.log(this.caes)
  }

  fecharModal()
  {
    this.modal.dismiss();
  }

}
