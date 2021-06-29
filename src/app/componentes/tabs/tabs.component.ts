import { Component, Input, OnInit } from '@angular/core';
import { UsuariosServico } from 'src/app/services/servico.service';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/local-storage/storage.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() tela: string;
  @Input() Usuario: string;
  UsuarioL: Usuario;

  constructor(private nav: NavController, private storeService: StorageService) { }

  ngOnInit() {

    this.storeService.buscarInformacoesUsuario().then(infoUsu => {
      this.UsuarioL = infoUsu;
      console.log("AA")
      console.log(infoUsu)
    })

    console.log(this.tela)
    // console.log(this.Usuario)
  }

  irParaProcurar()
  {
    this.nav.navigateBack('procurar');
  }

  irParaSolicitacoes()
  {
    this.nav.navigateBack('solicitacoesdw');
  }

  irParaHistorico()
  {
    this.nav.navigateForward('historicoservicos');
  }

  segundaVerificacaoProprietario()
  {
    if(this.Usuario == 'proprietario' && this.tela == 'procurar')
      return true;
  }

}
