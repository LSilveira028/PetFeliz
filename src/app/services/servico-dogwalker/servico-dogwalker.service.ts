import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ServicoDogWalker{
  avaliacaoMedia: number;
  sobre: string;
  preferencias: string;
  aceitaCartao: boolean;
  valorServico: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoDogwalkerService {

  private api_url = 'http://pet-feliz.somee.com/PetFeliz/ServicoDogWalker/'
  
  // private api_url = "http://localhost:5000/ServicoDogWalker/"

  constructor(private http: HttpClient) { }


  inserirServicoDogWalker(servDogWalker: ServicoDogWalker, header)
  {
    return this.http.post(this.api_url, servDogWalker, { headers: header, responseType: 'text' });
  }

  atualizarServicoDogWalker(servDogWalker: ServicoDogWalker ,header: HttpHeaders)
  {
    return this.http.put(this.api_url + "AtualizarServicoDogWalker", servDogWalker, { headers: header, responseType: 'text' })
  }

}
