import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class UsuariosServico
{
  servico: {
    id: number;
    proprietarioId: number;
    estado: number;
    dataSolicitacao: string;
    horaSolicitacao: string;
    horaInicio: string;
    horaTermino: string;
    valorTotal: number;
    usuarios: [{
      usuario: {
        nome: string;
        servicoDogWalker: {
          valorServico: number;
        }
      }
    }]
    latitudeProp: number;
    longitudeProp: number;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjE5MjA1NjQyLCJleHAiOjE2MjA0MTUyNDIsImlhdCI6MTYxOTIwNTY0Mn0.vxze4DpFdTwHjOEGZ4tsjTIRL8JoV5PA-yTLEv9-GCbYiyXEm_PSipjOQloJsEli2OiIVgez0TSY5q-NOioRVw"

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenAnderson,
    'Content-Type' : 'application/json'
  })

  private api_url = 'http://pet-feliz.somee.com/Servico/'

  //private api_url = "http://localhost:5000/Servico/"

  constructor(private http: HttpClient) { }

   listarServicosGerais()
   {
     return this.http.get<UsuariosServico[]>(this.api_url + 'ListarServicosGerais', { headers: this.header});
   }

   listarServicosFinalizados()
   {
     return this.http.get<UsuariosServico[]>(this.api_url + 'ListarServicosFinalizados', { headers: this.header})
   }

   cancelarServico(id: number)
   {
     return this.http.put(this.api_url + "Cancelar/" + id, JSON.stringify(id), { headers: this.header });
   }

   iniciarServico(id:number)
   {
     return this.http.put(this.api_url + "Iniciar/" + id, JSON.stringify(id), { headers: this.header })
   }

   finalizarServico(id: number)
   {
     return this.http.put(this.api_url + "Finalizar/" + id, JSON.stringify(id), { headers: this.header })
   }
}
