import { Component, Input, OnInit } from '@angular/core';
import { UsuariosServico } from 'src/app/services/servico.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() tela: string;
  @Input() teste: string;

  constructor(private nav: NavController) { }

  ngOnInit() {
    console.log(this.tela)
    console.log(this.teste)
  }

  irParaProcurar()
  {
    this.nav.navigateForward('procurar');
  }

  irParaHistorico()
  {
    this.nav.navigateForward('historicoservicos');
  }

}
