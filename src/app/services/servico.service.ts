import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface CaoS
{
    nome: string;
    raca: string;
    idade: string;
    porte: string;
}

export interface CaesServico
{
  cao: {
    nome: string;
    raca: string;
    idade: string;
    porte: string;
  }
}

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
        whatsApp: string;
        servicoDogWalker: {
          valorServico: number;
        }
      }
    }]
    caes: [{
      cao: {
        nome: string;
      raca: string;
      idade: number;
      porte: string;
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
  //Proprietário
  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjE5MjA1NjQyLCJleHAiOjE2MjA0MTUyNDIsImlhdCI6MTYxOTIwNTY0Mn0.vxze4DpFdTwHjOEGZ4tsjTIRL8JoV5PA-yTLEv9-GCbYiyXEm_PSipjOQloJsEli2OiIVgez0TSY5q-NOioRVw"
  //Dog Walker
  tokenLucas = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwibmFtZSI6Ikx1Y2FzIiwibmJmIjoxNjE5NTU5NTExLCJleHAiOjE2MjA3NjkxMTEsImlhdCI6MTYxOTU1OTUxMX0.-sdM6L5ehiu25hOfWfZhGFCEYpiFu9ZT4alXHtA0nfWsepcFKrucMyQOA7Jw7vrnhxlggjkiQdI4FDmlkWgsWg";

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenAnderson,
    'Content-Type' : 'application/json'
  })

  headerD = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenLucas,
    'Content-Type' : 'application/json'
  })

  // private api_url = 'http://pet-feliz.somee.com/PetFeliz/Usuario/'
  // private api_url = 'http://pet-feliz.somee.com/PetFeliz/CaesServico'

  private api_url_caesServico = "http://localhost:5000/CaoServico/"
  private api_url = "http://localhost:5000/Servico/"

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

   listarServicosSolicitados()
   {
      return this.http.get<UsuariosServico[]>(this.api_url + "ListarServicosSolicitados", { headers: this.headerD })
   }

   listarCaesServico(idServico: number)
   {
     return this.http.get<CaesServico[]>(this.api_url_caesServico + idServico, { headers: this.headerD });
   }

   aceitarServico(idServico: number)
   {
     return this.http.put(this.api_url + "Aceitar/" + idServico, JSON.stringify(idServico) ,{ headers: this.headerD });
   }  

   recusarServico(idServico: number)
   {
    return this.http.put(this.api_url + "Recusar/" + idServico, JSON.stringify(idServico), { headers: this.headerD });
   }
}
