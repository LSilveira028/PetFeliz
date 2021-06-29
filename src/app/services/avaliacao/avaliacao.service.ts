import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosServico } from '../servico.service';

export interface Avaliacao
{
  id?: number;
  nota: number;
  comentario: string;
  dataAvaliacao: Date;
}

export class UsuarioAvaliacao
{
  avaliacao: {
    id: number;
    nota: number;
    comentario: string;
    dataAvaliacao: Date;
    usuarioAvaliacao: [{
      nome: string;
      fotoPerfil: string;
    }]
  }
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private api_url = "http://pet-feliz.somee.com/PetFeliz/Avaliacao/";
  private api_url_usuarioAvaliacao = "http://pet-feliz.somee.com/PetFeliz/UsuarioAvaliacao/";

  // private api_url = "http://localhost:5000/Avaliacao/";
  // private api_url_usuarioAvaliacao = "http://localhost:5000/UsuarioAvaliacao/";

  constructor(private http: HttpClient) { }

  enviarAvaliacao(avaliacao: Avaliacao, header: HttpHeaders)
  {
    return this.http.post(this.api_url + "AvaliarServico", avaliacao, { headers: header });
  }

  associarProprietario(header: HttpHeaders)
  {
    return this.http.post(this.api_url_usuarioAvaliacao + "AssociarProprietario", UsuarioAvaliacao ,{ headers: header})
  }

  associarDogWalker(idDogW: number, header: HttpHeaders)
  {
    return this.http.post(this.api_url_usuarioAvaliacao + "AssociarDogWalker/" + idDogW, UsuarioAvaliacao ,{ headers: header })
  }

  verificarAvaliacao(idDogW: number, header: HttpHeaders)
  {
    return this.http.get(this.api_url_usuarioAvaliacao + "VerificarAvaliacao/" + idDogW, { headers: header })
  }

  listarAvaliacoesDogWalker(idDogW: number, header: HttpHeaders)
  {
    return this.http.get<UsuarioAvaliacao[]>(this.api_url + "ListarAvaliacoes/" + idDogW, { headers: header })
  }

}
