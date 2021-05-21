import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Cao
{
  id: number;
  nome: number;
  raca: string;
  idade: number;
  porte: number;
  peso: {
    id: number;
    descricao: string;
  }
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


  listarCaesProprietario(idProp: number, header: HttpHeaders)
  {
    return this.http.get<Cao[]>(this.api_url + idProp, { headers: header })
  }

  associarCaoServico(idCao: number, header: HttpHeaders)
  {
    return this.http.post(this.api_url_caoServico + "AssociarCaoServico/" + idCao, CaoServico,{headers: header})
  }
}
