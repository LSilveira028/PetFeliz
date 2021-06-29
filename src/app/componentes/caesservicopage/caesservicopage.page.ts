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

    //Pega a data atual
    var dataAtual = new Date();

    //Atribuiráa idade para cada cão
    this.caes.forEach(cao => {

      //define a data de nascimentod e cada cão
      var dataNasc = new Date(cao.cao.dataNascimento);

          //Diferença em meses
          var difMeses = dataAtual.getMonth() - dataNasc.getMonth();

          //faz a diferença em anos
          cao.cao.idade = dataAtual.getFullYear() - dataNasc.getFullYear();

          //Acerta a diferença em anos, caso a o aniversário seja no mesmo ano,
          // mas, pelo menos, um mês a frente
          if (difMeses < 0)
          {
              cao.cao.idade =  dataAtual.getFullYear() - dataNasc.getFullYear() - 1;
          }

    })

    console.log(this.caes)
  }

  fecharModal()
  {
    this.modal.dismiss();
  }

  //Funções de retorno no HTML
  verificarIdade(idade)
    {
      if (idade > 1) {
        return idade + " anos"
      }
      else
      {
        return idade + "ano";
      }
    }

    converterPorte(porte: number)
    {
      if (porte == 1) {
        return "Pequeno";
      }
      else
      {
        if (porte == 2) {
          return "Médio"
        }
        else
        {
          return "Grande";
        }
      }
    }
}
