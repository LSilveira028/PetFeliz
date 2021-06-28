import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './local-storage/storage.service';
import { DecimalPipe } from '@angular/common';

export class UsuarioLogin
{
  email: string;
  passwordString: string;
}

export class Usuario
{
    id?: number;
    tipoConta?: number;
    nome?: string;
    DataNascimento?: Date;
    dataCadastro?: Date;
    fotoPerfil?: string; //Para verificação
    email?: string;
    whatsApp?: string;
    PasswordString?: string;
    disponivel?: number;
    servicoDogWalker?: {
      avaliacaoMedia: number;
      sobre: string;
      preferencias: string;
      valorServico: number;
      aceitaCartao: boolean;
    }
    latitude?: number;
    longitude?: number;
    
    //nao mapeado
    distancia?: number;
    favorito?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjIwNDE4Mjc3LCJleHAiOjE2MjE2Mjc4NzcsImlhdCI6MTYyMDQxODI3N30.la3FOEgLmv8g1U-pKp6F0TCxeAK6QyTtfWtL6mhBbt-72jwX33km_gJ9S0bApYJ8zGUvI2apkIdB7xCJwxRfjg"
  tokenLucas = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwibmFtZSI6Ikx1Y2FzIiwibmJmIjoxNjIwNDE4MTY0LCJleHAiOjE2MjE2Mjc3NjQsImlhdCI6MTYyMDQxODE2NH0.Cd91j0_M_t0mVVGc-q1pWn_ifhMM_HgEtAnApNTZThfaVyXFVyW2atqIxsgpkAVJc4AnG9QmyOJEdw8WXAMAhA"

  
  private api_url = 'http://pet-feliz.somee.com/PetFeliz/Usuario/'
  
  // private api_url = "http://localhost:5000/Usuario/"
  
  private proprietario = 1;
  private dogWalker = 2;
  
  constructor(private http: HttpClient, public storage: StorageService) { }

  token: string 

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.storage.buscarToken()
  })
  



  informacoesUsuario(header: HttpHeaders)
  {
    return this.http.get<Usuario>(this.api_url, { headers: header});
  }

  //Este método vai receber as informações do usuario e o tipo de conta
  cadastrarUsuario(usuario: Usuario, tipoU: number)
  {
    //O tipo da conta do usuário vai ser de acordo com o que foi passado
    usuario.tipoConta = tipoU;

    //Faz a requisição para cadastrar o usuário
    return this.http.post(this.api_url + 'Cadastrar', usuario, {responseType: 'text'});
  }

  procurarDogWalkers(latitude, longitude,header: HttpHeaders)
  {
    return this.http.get<Usuario[]>(this.api_url + 'DogWalkers/' + latitude + "/" + longitude, { headers: header})
  }

  logarUsuario(usuario: Usuario): Observable<HttpResponse<any>>
  {
    return this.http.post(this.api_url + "Autenticar", usuario, { observe: 'response', responseType: 'text'});
  }

  atualizarLocalizacao(header: HttpHeaders, geolocalizacao: Usuario)
  {
    return this.http.put(this.api_url + "AtualizarLocalizacao", geolocalizacao, { headers: header })
  }

  atualizarAvaliacaoMedia(idDogW: number, header: HttpHeaders)
  {
    return this.http.put(this.api_url + "AtualizarAvaliacaoMedia/" + idDogW, Usuario, {headers: header})
  }

  atualizarDisponibilidade(idDisponibilidade: number, header: HttpHeaders)
  {
    return this.http.put(this.api_url + "AlterarDisponibilidade/" + idDisponibilidade, Usuario, {headers: header, responseType: 'text'})
  }

  atualizarUsuario(usuario: Usuario, header: HttpHeaders)
  {
    return this.http.patch(`${this.api_url}AtualizarUsuario`, usuario, { headers: header})
  }

  alterarSenha(senhaAtual, senhaNova, header: HttpHeaders)
  {
    return this.http.patch(`${this.api_url}AtualizarSenha/${senhaAtual}/${senhaNova}`, Usuario, { headers: header, responseType: 'text' })
  }
}
