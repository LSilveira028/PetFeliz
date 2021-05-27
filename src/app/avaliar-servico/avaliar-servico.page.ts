import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliar-servico',
  templateUrl: './avaliar-servico.page.html',
  styleUrls: ['./avaliar-servico.page.scss'],
})
export class AvaliarServicoPage implements OnInit {

  @Input() nomeDogWalker: string;
  @Input() idDogWalker: number;

  nota: number;
  //esta variável dirá ao HTML se há uma nota escolhida, ao enviar a avaliação;
  aviso: boolean = false;

  constructor() { }

  ngOnInit() {

    console.log(this.nomeDogWalker)
    console.log(this.idDogWalker)

  }

  avaliar(nota: number)
  {
    var star1 = document.getElementById('star1');
    var star2 = document.getElementById('star2');
    var star3 = document.getElementById('star3');
    var star4 = document.getElementById('star4');
    var star5 = document.getElementById('star5');

    this.nota = nota;

    if(nota == 1)
    {
      star1.setAttribute("src", "/assets/star2.png");

      star2.setAttribute("src", "/assets/star1.png");

      star3.setAttribute("src", "/assets/star1.png");

      star4.setAttribute("src", "/assets/star1.png")

      star5.setAttribute("src", "/assets/star1.png")

    }
    else
    {
      if (nota == 2) {
        star1.setAttribute("src", "/assets/star2.png");

        star2.setAttribute("src", "/assets/star2.png");
  
        star3.setAttribute("src", "/assets/star1.png");
  
        star4.setAttribute("src", "/assets/star1.png")
  
        star5.setAttribute("src", "/assets/star1.png")
      }
      else
      {
        if (nota == 3) {
          star1.setAttribute("src", "/assets/star2.png");

          star2.setAttribute("src", "/assets/star2.png");
    
          star3.setAttribute("src", "/assets/star2.png");
    
          star4.setAttribute("src", "/assets/star1.png")
    
          star5.setAttribute("src", "/assets/star1.png")
        }
        else
        {
          if (nota == 4) {
            star1.setAttribute("src", "/assets/star2.png");

            star2.setAttribute("src", "/assets/star2.png");
      
            star3.setAttribute("src", "/assets/star2.png");
      
            star4.setAttribute("src", "/assets/star2.png")
      
            star5.setAttribute("src", "/assets/star1.png")
          }
          else
          {
            star1.setAttribute("src", "/assets/star2.png");

            star2.setAttribute("src", "/assets/star2.png");
      
            star3.setAttribute("src", "/assets/star2.png");
      
            star4.setAttribute("src", "/assets/star2.png")
      
            star5.setAttribute("src", "/assets/star2.png")
          }
        }
      }
    }
  }

  enviarAvaliacao()
  {
    if (this.nota == null) {
      this.aviso = true;
      console.log("SELECIONE UM VALOR")
    }
  }


}
