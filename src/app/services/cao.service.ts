import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Cao
{
  id?: number;
  nome: number;
  raca: string;
  porte: number;
  dataNascimento: Date;
  pesoId: number;
  peso?: {
    id: number;
    descricao: string;
  }

  //não mapeado
  idade: number;
}

export class CaoServico
{
  caoId: number;
  servicoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CaoService {

  constructor(private http: HttpClient) { }

  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjIwNDE4Mjc3LCJleHAiOjE2MjE2Mjc4NzcsImlhdCI6MTYyMDQxODI3N30.la3FOEgLmv8g1U-pKp6F0TCxeAK6QyTtfWtL6mhBbt-72jwX33km_gJ9S0bApYJ8zGUvI2apkIdB7xCJwxRfjg"

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenAnderson
  })

  private api_url = 'http://pet-feliz.somee.com/PetFeliz/Cao/'
  private api_url_caoServico = 'http://pet-feliz.somee.com/PetFeliz/CaoServico/'
  

  // private api_url = "http://localhost:5000/Cao/"
  // private api_url_caoServico = "http://localhost:5000/CaoServico/"


  listarCaesProprietario(header: HttpHeaders)
  {
    return this.http.get<Cao[]>(this.api_url + "ListarCaesProprietario", { headers: header })
  }

  alterarCao(idCao: number, header: HttpHeaders, cao: Cao)
  {
    return this.http.put(this.api_url + "AlterarCao/" + idCao, cao, { headers: header })
  }

  cadastrarCao(cao: Cao, header: HttpHeaders)
  {
    return this.http.post(this.api_url + "CadastrarCao", cao, { headers: header, responseType: 'text' });
  }

  removerCao(idCao: number, header: HttpHeaders)
  {
    return this.http.delete(this.api_url + "DeletarCao/" + idCao, {headers: header});
  }

  associarCaoServico(idCao: number, header: HttpHeaders)
  {
    return this.http.post(this.api_url_caoServico + "AssociarCaoServico/" + idCao, CaoServico,{headers: header})
  }
}
