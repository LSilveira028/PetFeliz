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
    dataNascimento: Date;
    idade: number;
    porte: string;
    peso: {
      descricao: string;
    }
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
        id: number;
        nome: string;
        fotoPerfil: string;
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

  private api_url_usuariosServico = "http://pet-feliz.somee.com/PetFeliz/UsuariosServico/"
  private api_url_caesServico = "http://pet-feliz.somee.com/PetFeliz/CaoServico/"
  private api_url = "http://pet-feliz.somee.com/PetFeliz/Servico/"

  // private api_url_usuariosServico = "http://localhost:5000/UsuariosServico/"
  // private api_url_caesServico = "http://localhost:5000/CaoServico/"
  // private api_url = "http://localhost:5000/Servico/"

  constructor(private http: HttpClient) { }

   listarServicosGerais(header: HttpHeaders)
   {
     return this.http.get<UsuariosServico[]>(this.api_url + 'ListarServicosGerais', { headers: header});
   }

   listarServicosFinalizados(header: HttpHeaders)
   {
     return this.http.get<UsuariosServico[]>(this.api_url + 'ListarServicosFinalizados', { headers: header})
   }

   cancelarServico(id: number, header: HttpHeaders)
   {
     return this.http.put(this.api_url + "Cancelar/" + id, JSON.stringify(id), { headers: header });
   }

   iniciarServico(id:number, header: HttpHeaders)
   {
     return this.http.put(this.api_url + "Iniciar/" + id, JSON.stringify(id), { headers: header })
   }

   finalizarServico(id: number, header: HttpHeaders)
   {
     return this.http.put(this.api_url + "Finalizar/" + id, JSON.stringify(id), { headers: header })
   }

   listarServicosSolicitados(header: HttpHeaders)
   {
      return this.http.get<UsuariosServico[]>(this.api_url + "ListarServicosSolicitados", { headers: header })
   }

   listarCaesServico(idServico: number, header: HttpHeaders)
   {
     return this.http.get<CaesServico[]>(this.api_url_caesServico + idServico, { headers: header });
   }

   aceitarServico(idServico: number, header: HttpHeaders)
   {
     return this.http.put(this.api_url + "Aceitar/" + idServico, JSON.stringify(idServico) ,{ headers: header });
   }  

   recusarServico(idServico: number, header: HttpHeaders)
   {
    return this.http.put(this.api_url + "Recusar/" + idServico, JSON.stringify(idServico), { headers: header });
   }

   //Fazer solicitação do servico - 4 procedimentos - O 4° está no service do cão
   // 1 - Faz a solicitação do serviço
   solicitarServico(servico: Servico, header: HttpHeaders)
   {
     return this.http.post(this.api_url + "Solicitar", servico, { headers: header })
   }
   // 2 - Associa o properitario ao serviço   
   associarProprietarioServico(header: HttpHeaders)
   {
     return this.http.post(this.api_url_usuariosServico + "AssociarProprietario", UsuariosServico, { headers: header})
   }
   // 3 - Associa o dog walker ao serviço solicitado
   associarDogWalkerServico(idDogWalker: number, header: HttpHeaders)
   {
     return this.http.post(this.api_url_usuariosServico + "AssociarDogWalker/" + idDogWalker, UsuariosServico, { headers: header })
   }

}
