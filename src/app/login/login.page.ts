import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private service: UsuarioService) { }

  ngOnInit() {
  }

  logarUsuario(form: NgForm)
  {
    const usuario = form.value;

    // this.service.logarUsuario(usuario).subscribe(resp => {
      
    // })
  }

}
