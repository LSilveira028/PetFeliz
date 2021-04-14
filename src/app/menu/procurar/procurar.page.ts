import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.page.html',
  styleUrls: ['./procurar.page.scss'],
})
export class ProcurarPage implements OnInit {

  dogWalkers: Usuario[];

  constructor(private service: UsuarioService) { }

  ngOnInit() {
    this.service.procurarDogWalkers().subscribe(response => {
      this.dogWalkers = response;
    })
  }


  dogWalker = [
    {
      nome: "Pedro",
      fotoPerfil: "https://www.homemnoespelho.com.br/wp-content/uploads/2016/02/Como-cuidar-da-barba-por-fazer-Homem-No-Espelho-3.jpg",
      valorServico: 45.00,
      disponivel: "Disponível"
    }
  ]

}