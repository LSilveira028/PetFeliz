import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Usuario
{
    id: Int16Array;
    tipoConta: 1;
    nome: string;
    dataNascimento: Date;
    email: string;
    telefone: string;
    senha: string;

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api_url = 'http://pet-feliz.somee.com/PetFeliz/Usuario/'

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: Usuario)
  {
    return this.http.post(this.api_url + 'cadastrar', usuario);
  }

}
