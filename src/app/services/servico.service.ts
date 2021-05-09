import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface CaoS
{
    nome: string;
    raca: string;
    idade: string;
    porte: string;
}

export interface Servico
{
  valorTotal: number;
  latitudeProp: number;
  longitudeProp: number;
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
  usuarioId: number;
  servico?: {
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
  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjIwNDE4Mjc3LCJleHAiOjE2MjE2Mjc4NzcsImlhdCI6MTYyMDQxODI3N30.la3FOEgLmv8g1U-pKp6F0TCxeAK6QyTtfWtL6mhBbt-72jwX33km_gJ9S0bApYJ8zGUvI2apkIdB7xCJwxRfjg"
  //Dog Walker
  tokenLucas = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwibmFtZSI6Ikx1Y2FzIiwibmJmIjoxNjIwNDE4MTY0LCJleHAiOjE2MjE2Mjc3NjQsImlhdCI6MTYyMDQxODE2NH0.Cd91j0_M_t0mVVGc-q1pWn_ifhMM_HgEtAnApNTZThfaVyXFVyW2atqIxsgpkAVJc4AnG9QmyOJEdw8WXAMAhA";

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

  private api_url_usuariosServico = "http://localhost:5000/UsuariosServico/"
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

   //Fazer solicitação do servico - 4 procedimentos
   // 1 - Faz a solicitação do serviço
   solicitarServico(servico: Servico)
   {
     return this.http.post(this.api_url + "Solicitar", servico, { headers: this.header })
   }
   // 2 - Associa o properitario ao serviço   
   associarProprietarioServico()
   {
     return this.http.post(this.api_url_usuariosServico + "AssociarProprietario", UsuariosServico, { headers: this.header})
   }
   // 3 - Associa o dog walker ao serviço solicitado
   associarDogWalkerServico(idDogWalker: number)
   {
     return this.http.post(this.api_url_usuariosServico + "AssociarDogWalker/" + idDogWalker, UsuariosServico, { headers: this.header })
   }

}
